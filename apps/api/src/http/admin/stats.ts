import type { HonoResponse } from '../../types'
import { EnumBlogPostStatus, EnumContactFormStatus, EnumNewsletterStatus } from '@neziva/enums'
import { endOfDay, startOfDay } from 'date-fns'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'

export const stats = new Hono()
  .basePath('/stats')

  /** 获取系统统计 */
  .get('/', authAd(), async (c): Promise<HonoResponse<{ data: any }>> => {
    const todayStart = startOfDay(new Date())
    const todayEnd = endOfDay(new Date())

    const [
      totalContactForms,
      pendingContactForms,
      totalBlogPosts,
      publishedBlogPosts,
      totalNewsletterSubscribers,
      activeNewsletterSubscribers,
      errorLogsToday,
    ] = await Promise.all([
      db.contactForm.count(),
      db.contactForm.where({ status: EnumContactFormStatus.Pending }).count(),
      db.blogPost.count(),
      db.blogPost.where({ status: EnumBlogPostStatus.Published }).count(),
      db.newsletter.count(),
      db.newsletter.where({ status: EnumNewsletterStatus.Subscribed }).count(),
      db.errorLog
        .where({
          createdAt: {
            gte: todayStart,
            lte: todayEnd,
          },
        })
        .count(),
    ])

    // 系统健康状态（基于错误日志数量）
    let systemHealth: 'healthy' | 'warning' | 'error' = 'healthy'
    if (errorLogsToday > 50) {
      systemHealth = 'error'
    }
    else if (errorLogsToday > 20) {
      systemHealth = 'warning'
    }

    return c.json({
      data: {
        totalContactForms,
        pendingContactForms,
        totalBlogPosts,
        publishedBlogPosts,
        totalNewsletterSubscribers,
        activeNewsletterSubscribers,
        errorLogsToday,
        systemHealth,
      },
    })
  })
