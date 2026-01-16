import { EnumContactFormStatus } from '@neziva/enums'
import { vContactSubmit } from '@neziva/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { validate } from '../utils'

export const contactRoute = new Hono()
  .basePath('/contact')

  /** 提交联系表单 */
  .post('/submit', validate('json', vContactSubmit), async (c) => {
    const dto = c.req.valid('json')

    await db.contactForm.create({
      ...dto,
      status: EnumContactFormStatus.Pending,
    })

    // TODO: 发送邮件通知到 hello@neziva.com

    return c.body(null, 204)
  })
