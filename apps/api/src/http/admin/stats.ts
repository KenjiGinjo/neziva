import type { ResAdminStats } from '@neziva/interfaces'
import type { HonoResponse } from '../../types'
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
      db.contactForm.where({ status: 0 }).count(), // 0: 未处理
      db.blogPost.count(),
      db.blogPost.where({ status: 1 }).count(), // 1: 已发布
      db.newsletter.count(),
      db.newsletter.where({ status: 1 }).count(), // 1: 已订阅
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
