import type { ResAdminLogList, ResPagination } from '@neziva/interfaces'
import type { HonoResponse } from '../../types'
import { vLogsQuery } from '@neziva/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination, validate } from '../../utils'

export const logs = new Hono()
  .basePath('/logs')

  /** 获取系统日志 */
  .get('/', authAd(), pagination(), validate('query', vLogsQuery), async (c): Promise<HonoResponse<{ data: ResAdminLogList[], pagi: ResPagination }>> => {
    const { where } = c.get('page')
    const { level, startDate, endDate, search } = c.req.valid('query')
    let query = db.errorLog

    // 构建基础筛选条件
    const baseConditions: any = {}
    if (level) {
      baseConditions.type = Number(level)
    }
    if (startDate || endDate) {
      const dateFilter: any = {}
      if (startDate)
        dateFilter.gte = new Date(startDate)
      if (endDate)
        dateFilter.lte = new Date(endDate)
      baseConditions.createdAt = dateFilter
    }

    // 如果有搜索条件，使用 orWhere 将基础条件与搜索条件组合
    if (search) {
      query = query.orWhere(
        { ...baseConditions, detail: { contains: search } },
        { ...baseConditions, code: { contains: search } },
      )
    }
    else if (Object.keys(baseConditions).length > 0) {
      // 如果没有搜索条件，但有其他筛选条件，使用 where
      query = query.where(baseConditions)
    }

    const total = await query.count()
    const data = await query
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

    return c.json({
      data,
      pagi: {
        total,
        ...where,
      },
    })
  })
