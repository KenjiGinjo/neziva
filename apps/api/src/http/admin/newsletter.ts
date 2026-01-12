import type { HonoResponse } from '../../types'
import { EnumNewsletterStatus } from '@neziva/enums'
import { Exception } from '@neziva/tools/exception'
import { vNewsletterSubscribersQuery, vNewsletterSubscriberId, vNewsletterSubscriberStatus } from '@neziva/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination, validate } from '../../utils'

export const newsletter = new Hono()
  .basePath('/api/admin/newsletter')

  /** 获取订阅者列表 */
  .get('/subscribers', authAd(), pagination(), validate('query', vNewsletterSubscribersQuery), async (c): Promise<HonoResponse<{ data: any[], pagination: any }>> => {
    const { where } = c.get('page')
    const { status, source, search } = c.req.valid('query')

    let query = db.newsletter

    if (status) {
      query = query.where({ status: Number(status) as EnumNewsletterStatus })
    }

    if (source) {
      query = query.where({ source })
    }

    if (search) {
      query = query.where({ email: { ilike: `%${search}%` } })
    }

    const total = await query.count()
    const data = await query
      .order({ createdAt: 'DESC' })
      .limit(where.limit)
      .offset(where.offset)

    return c.json({
      data,
      pagination: {
        page: c.get('page').query.page,
        limit: c.get('page').query.pageSize,
        total,
        totalPages: Math.ceil(total / where.limit),
      },
    })
  })

  /** 更新订阅状态 */
  .put('/subscribers/:id/status', authAd(), validate('param', vNewsletterSubscriberId), validate('json', vNewsletterSubscriberStatus), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')
    const { status } = c.req.valid('json')

    const subscriber = await db.newsletter.where({ id }).takeOptional()

    if (!subscriber) {
      throw new Exception.NotFoundException('Newsletter subscriber not found')
    }

    const updateData: any = { status: Number(status) as EnumNewsletterStatus }

    if (Number(status) === EnumNewsletterStatus.Subscribed) {
      updateData.verifiedAt = new Date()
    }

    if (Number(status) === EnumNewsletterStatus.Unsubscribed) {
      updateData.unsubscribedAt = new Date()
    }

    await db.newsletter.where({ id }).update(updateData)

    // 重新查询获取更新后的数据
    const updated = await db.newsletter.where({ id }).take()

    return c.json({
      data: updated,
    })
  })

  /** 删除订阅者 */
  .delete('/subscribers/:id', authAd(), validate('param', vNewsletterSubscriberId), async (c): Promise<HonoResponse<{ success: boolean }>> => {
    const { id } = c.req.valid('param')

    const subscriber = await db.newsletter.where({ id }).takeOptional()

    if (!subscriber) {
      throw new Exception.NotFoundException('Newsletter subscriber not found')
    }

    await db.newsletter.where({ id }).delete()

    return c.json({
      success: true,
    })
  })
