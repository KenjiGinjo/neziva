import type { ResAdminStats } from '@neziva/interfaces'
import type { HonoResponse } from '../../types'
import { endOfDay, startOfDay } from 'date-fns'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'

export const stats = new Hono()
  .basePath('/stats')

  /** 获取系统统计 */
  .get('/', authAd(), async (c): Promise<HonoResponse<{ data: ResAdminStats }>> => {
    const todayStart = startOfDay(new Date())
    const todayEnd = endOfDay(new Date())

    const [
      totalUsers,
      activeUsers,
      totalWorkflows,
      executionsToday,
      apiCallsToday,
    ] = await Promise.all([
      db.user.count(),
      db.user.where({ status: 1 }).count(), // EnumUserStatus.Active = 1
      db.workflow.count(),
      db.execution
        .where({
          startedAt: {
            gte: todayStart,
            lte: todayEnd,
          },
        })
        .count(),
      db.apiCall
        .where({
          createdAt: {
            gte: todayStart,
            lte: todayEnd,
          },
        })
        .count(),
    ])

    // 计算今日收入（从发票中统计）
    const invoicesToday = await db.invoice
      .where({
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
        status: 'paid',
      })
      .select('amount', 'currency')

    const revenueToday = invoicesToday.reduce((sum, invoice) => {
      // 假设所有货币都是 USD，实际应该根据 currency 转换
      return sum + Number(invoice.amount || 0)
    }, 0)

    // 计算错误率（今日失败的执行 / 今日总执行）
    const failedExecutionsToday = await db.execution
      .where({
        startedAt: {
          gte: todayStart,
          lte: todayEnd,
        },
        status: 'failed',
      })
      .count()

    const errorRate = executionsToday > 0
      ? (failedExecutionsToday / executionsToday) * 100
      : 0

    // 系统健康状态（简化判断）
    let systemHealth: 'healthy' | 'warning' | 'error' = 'healthy'
    if (errorRate > 10) {
      systemHealth = 'error'
    }
    else if (errorRate > 5) {
      systemHealth = 'warning'
    }

    return c.json({
      data: {
        totalUsers,
        activeUsers,
        totalWorkflows,
        executionsToday,
        revenueToday,
        apiCallsToday,
        errorRate: Math.round(errorRate * 100) / 100, // 保留两位小数
        systemHealth,
      },
    })
  })
