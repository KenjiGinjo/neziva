import { EnumContactFormSource, EnumContactFormStatus } from '@neziva/enums'
import { vContactSubmit } from '@neziva/validations'
import { endOfDay } from 'date-fns'
import { db, ds } from 'db'
import { Hono } from 'hono'
import { ip } from '../middleware'
import { validate } from '../utils'

export const contactRoute = new Hono()
  .basePath('/contact')

  /** 提交联系表单 */
  .post('/submit', ip(), validate('json', vContactSubmit), async (c) => {
    const dto = c.req.valid('json')
    const ipAddress = c.get('ipAddress')

    // 检查相同IP每天提交次数限制（最多3次）
    if (ipAddress) {
      await ds.cache.checkAndIncrement(
        {
          key: `contact_submit:${ipAddress}`,
          limit: 3,
          expiresAt: endOfDay(new Date()),
          errorMessage: 'You have reached the maximum number of submissions for today. Please try again tomorrow.',
        },
      )
    }

    await db.contactForm.create({
      ...dto,
      status: EnumContactFormStatus.Pending,
      source: EnumContactFormSource.Form,
    })

    // TODO: 发送邮件通知到 hello@neziva.com

    return c.body(null, 204)
  })
