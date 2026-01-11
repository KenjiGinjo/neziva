import type { HonoResponse } from '../types'
import { Exception } from '@neziva/tools/exception'
import { db } from 'db'
import { Hono } from 'hono'
import { z } from 'zod'
import { validate } from '../utils'

const vNewsletterSubscribe = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional(),
})

export const newsletterRoute = new Hono()
  .basePath('/api/newsletter')

  /** 订阅 Newsletter */
  .post('/subscribe', validate('json', vNewsletterSubscribe), async (c): Promise<HonoResponse<{ success: boolean, message: string }>> => {
    const { email, source } = c.req.valid('json')

    // 检查是否已订阅
    const existing = await db.newsletter.where({ email }).takeOptional()

    if (existing) {
      if (existing.status === 1) {
        throw new Exception.BadRequestException('Email already subscribed')
      }
      // 如果之前退订过，重新订阅
      if (existing.status === 2) {
        await db.newsletter.where({ email }).update({
          status: 0, // 0: 待验证
          unsubscribedAt: null,
          source: source || existing.source,
        })
        return c.json({
          success: true,
          message: 'Subscription reactivated. Please check your email to verify.',
        })
      }
      return c.json({
        success: true,
        message: 'Please check your email to verify your subscription.',
      })
    }

    await db.newsletter.create({
      email,
      status: 0, // 0: 待验证
      source,
    })

    // TODO: 发送验证邮件

    return c.json({
      success: true,
      message: 'Please check your email to verify your subscription.',
    })
  })
