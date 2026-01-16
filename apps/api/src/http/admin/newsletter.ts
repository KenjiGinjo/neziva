import type { ResAdminNewsletterList, ResPagination } from '@neziva/interfaces'
import type { HonoResponse } from '../../types'
import { EnumNewsletterStatus } from '@neziva/enums'
import { vIds, vNewsletterSubscribersQuery, vNewsletterSubscriberStatus } from '@neziva/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination, validate } from '../../utils'

export const newsletter = new Hono()
  .basePath('/newsletter')

  /** 获取订阅者列表 */
  .get('/subscribers', authAd(), pagination(), validate('query', vNewsletterSubscribersQuery), async (c): Promise<HonoResponse<{ data: ResAdminNewsletterList[], pagi: ResPagination }>> => {
    const { where } = c.get('page')
    const { status, source, search } = c.req.valid('query')
    let query = db.newsletter

    // 构建基础筛选条件
    const baseConditions: any = {}
    if (status) {
      baseConditions.status = Number(status) as EnumNewsletterStatus
    }
    if (source) {
      baseConditions.source = source
    }

    // 如果有搜索条件，使用 orWhere 将基础条件与搜索条件组合
    if (search) {
      query = query.orWhere(
        { ...baseConditions, email: { contains: search } },
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

    return c.json({
      data,
      pagi: {
        total,
        ...where,
      },
    })
  })

  /** 更新订阅状态 */
  .put('/subscribers/:id/status', authAd(), validate('param', vIds('id')), validate('json', vNewsletterSubscriberStatus), async (c) => {
    const { id } = c.req.valid('param')
    const { status } = c.req.valid('json')

    const updateData: any = { status: Number(status) as EnumNewsletterStatus }

    if (Number(status) === EnumNewsletterStatus.Subscribed) {
      updateData.verifiedAt = new Date()
    }

    if (Number(status) === EnumNewsletterStatus.Unsubscribed) {
      updateData.unsubscribedAt = new Date()
    }

    await db.newsletter.where({ id }).update(updateData)

    return c.body(null, 204)
  })

  /** 删除订阅者 */
  .delete('/subscribers/:id', authAd(), validate('param', vIds('id')), async (c) => {
    const { id } = c.req.valid('param')

    await db.newsletter.where({ id }).delete()

    return c.body(null, 204)
  })
