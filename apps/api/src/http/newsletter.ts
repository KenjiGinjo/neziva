import type { ResNewsletterSubscribe } from '@neziva/interfaces'
import type { HonoResponse } from '../types'
import { vNewsletterSubscribe } from '@neziva/validations'
import { ds } from 'db'
import { Hono } from 'hono'
import { validate } from '../utils'

export const newsletterRoute = new Hono()
  .basePath('/newsletter')

  /** 订阅 Newsletter */
  .post('/subscribe', validate('json', vNewsletterSubscribe), async (c): Promise<HonoResponse<{ data: ResNewsletterSubscribe }>> => {
    const { email, source } = c.req.valid('json')

    const result = await ds.newsletter.subscribe({ email, source })

    // TODO: 发送验证邮件

    if (result.reactivated) {
      return c.json({
        data: {
          success: true,
          message: 'Subscription reactivated. Please check your email to verify.',
        },
      })
    }

    if (result.alreadyExists) {
      return c.json({
        data: {
          success: true,
          message: 'Please check your email to verify your subscription.',
        },
      })
    }

    return c.json({
      data: {
        success: true,
        message: 'Please check your email to verify your subscription.',
      },
    })
  })
