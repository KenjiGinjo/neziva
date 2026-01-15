import type { HonoResponse } from '../../types'
import { EnumNewsletterStatus } from '@neziva/enums'
import { Exception } from '@neziva/tools/exception'
import { vIds, vNewsletterSubscribersQuery, vNewsletterSubscriberStatus } from '@neziva/validations'
import { db, ds } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination, validate } from '../../utils'

export const newsletter = new Hono()
  .basePath('/api/admin/newsletter')

  /** 获取订阅者列表 */
  .get('/subscribers', authAd(), pagination(), validate('query', vNewsletterSubscribersQuery), async (c): Promise<HonoResponse<{ data: any[], pagination: any }>> => {
    const { where } = c.get('page')
    const { status, source, search } = c.req.valid('query')

    const { data, total } = await ds.newsletter.getList({
      status: status ? Number(status) as EnumNewsletterStatus : undefined,
      source,
      search,
      limit: where.limit,
      offset: where.offset,
    })

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
  .put('/subscribers/:id/status', authAd(), validate('param', vIds('id')), validate('json', vNewsletterSubscriberStatus), async (c) => {
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

    return c.body(null, 204)
  })

  /** 删除订阅者 */
  .delete('/subscribers/:id', authAd(), validate('param', vIds('id')), async (c) => {
    const { id } = c.req.valid('param')

    const subscriber = await db.newsletter.where({ id }).takeOptional()

    if (!subscriber) {
      throw new Exception.NotFoundException('Newsletter subscriber not found')
    }

    await db.newsletter.where({ id }).delete()

    return c.body(null, 204)
  })
