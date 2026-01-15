import type { ResAdminLogList } from '@neziva/interfaces'
import type { HonoResponse } from '../../types'
import { vLogsQuery } from '@neziva/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination, validate } from '../../utils'

export const logs = new Hono()
  .basePath('/logs')

  /** 获取系统日志 */
  .get('/', authAd(), pagination(), validate('query', vLogsQuery), async (c): Promise<HonoResponse<{ data: ResAdminLogList }>> => {
    const { where } = c.get('page')
    const { level, startDate, endDate, search } = c.req.valid('query')
    let query = db.errorLog

    // 类型筛选（使用 type 字段，对应 level）
    if (level) {
      query = query.where({ type: Number(level) })
    }

    // 日期范围筛选
    if (startDate || endDate) {
      const dateFilter: any = {}
      if (startDate)
        dateFilter.gte = new Date(startDate)
      if (endDate)
        dateFilter.lte = new Date(endDate)
      query = query.where({ createdAt: dateFilter })
    }

    // 搜索（在 detail 或 code 中搜索）
    if (search) {
      query = query.orWhere(
        { detail: { contains: search } },
        { code: { contains: search } },
      )
    }

    const total = await query.count()
    const items = await query
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
      )
      .take()

    return c.json({
      data: {
        items,
        total,
      },
    })
  })
