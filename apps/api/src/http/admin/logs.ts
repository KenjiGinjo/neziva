import type { ResAdminLogList } from '@neziva/interfaces'
import type { HonoResponse } from '../../types'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination } from '../../utils'

export const logs = new Hono()
  .basePath('/logs')

  /** 获取系统日志 */
  .get('/', authAd(), pagination(), async (c): Promise<HonoResponse<{ data: ResAdminLogList }>> => {
    const { where } = c.get('page')
    const level = c.req.query('level')
    const startDate = c.req.query('startDate')
    const endDate = c.req.query('endDate')
    const search = c.req.query('search')
    const userId = c.req.query('userId')
    const workflowId = c.req.query('workflowId')

    let queryBuilder = db.systemLog

    // 级别筛选
    if (level) {
      queryBuilder = queryBuilder.where({ level })
    }

    // 用户筛选
    if (userId) {
      queryBuilder = queryBuilder.where({ userId })
    }

    // 工作流筛选
    if (workflowId) {
      queryBuilder = queryBuilder.where({ workflowId })
    }

    // 日期范围筛选
    if (startDate || endDate) {
      const dateFilter: any = {}
      if (startDate)
        dateFilter.gte = new Date(startDate)
      if (endDate)
        dateFilter.lte = new Date(endDate)
      queryBuilder = queryBuilder.where({ createdAt: dateFilter })
    }

    // 搜索（在 message 中搜索）
    if (search) {
      queryBuilder = queryBuilder.where({ message: { contains: search } })
    }

    const [items, total] = await Promise.all([
      queryBuilder
        .order({ createdAt: 'DESC' })
        .limit(where.limit)
        .offset(where.offset)
        .select(
          'id',
          'level',
          'message',
          'context',
          'userId',
          'workflowId',
          'createdAt',
        ),
      queryBuilder.count(),
    ])

    return c.json({
      data: {
        items,
        total,
      },
    })
  })
