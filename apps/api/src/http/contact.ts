import { EnumContactFormStatus } from '@neziva/enums'
import { Exception } from '@neziva/tools/exception'
import { vContactSubmit } from '@neziva/validations'
import { db } from 'db'
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
      const today = new Date()
      const dateStr = today.toISOString().split('T')[0] // YYYY-MM-DD
      const cacheKey = `contact_submit:${ipAddress}:${dateStr}`

      // 计算今天结束时间（23:59:59）
      const endOfDay = new Date(today)
      endOfDay.setHours(23, 59, 59, 999)

      // 检查缓存中是否已有记录
      const existing = await db.cache.findOptional(cacheKey)

      if (existing) {
        // 已存在记录，检查提交次数
        const count = parseInt(existing.value || '0', 10)
        if (count >= 3) {
          throw new Exception.BadRequestException('You have reached the maximum number of submissions for today. Please try again tomorrow.')
        }

        // 增加提交次数
        await db.cache.where({ key: cacheKey }).update({
          value: (count + 1).toString(),
          expiresAt: endOfDay,
        })
      }
      else {
        // 首次提交，创建新记录
        await db.cache.create({
          key: cacheKey,
          value: '1',
          expiresAt: endOfDay,
        })
      }
    }

    await db.contactForm.create({
      ...dto,
      status: EnumContactFormStatus.Pending,
    })

    // TODO: 发送邮件通知到 hello@neziva.com

    return c.body(null, 204)
  })
