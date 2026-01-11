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
    let queryBuilder = db.errorLog

    // 类型筛选（使用 type 字段，对应 level）
    if (level) {
      queryBuilder = queryBuilder.where({ type: Number(level) })
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

    // 搜索（在 detail 或 code 中搜索）
    if (search) {
      queryBuilder = queryBuilder.where(q => q.or([
        { detail: { ilike: `%${search}%` } },
        { code: { ilike: `%${search}%` } },
      ]))
    }

    const [items, total] = await Promise.all([
      queryBuilder
        .order({ createdAt: 'DESC' })
        .limit(where.limit)
        .offset(where.offset)
        .select(
          'id',
          'type',
          'code',
          'detail',
          'path',
          'method',
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
