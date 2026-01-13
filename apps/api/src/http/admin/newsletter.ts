import type { HonoResponse } from '../../types'
import { EnumNewsletterStatus } from '@neziva/enums'
import { Exception } from '@neziva/tools/exception'
import { vNewsletterSubscribersQuery, vNewsletterSubscriberId, vNewsletterSubscriberStatus } from '@neziva/validations'
import { ds } from 'db'
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
  .put('/subscribers/:id/status', authAd(), validate('param', vNewsletterSubscriberId), validate('json', vNewsletterSubscriberStatus), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')
    const { status } = c.req.valid('json')

    const subscriber = await ds.newsletter.getById(id)

    if (!subscriber) {
      throw new Exception.NotFoundException('Newsletter subscriber not found')
    }

    const updated = await ds.newsletter.updateStatus(id, Number(status) as EnumNewsletterStatus)

    return c.json({
      data: updated,
    })
  })

  /** 删除订阅者 */
  .delete('/subscribers/:id', authAd(), validate('param', vNewsletterSubscriberId), async (c): Promise<HonoResponse<{ success: boolean }>> => {
    const { id } = c.req.valid('param')

    const subscriber = await ds.newsletter.getById(id)

    if (!subscriber) {
      throw new Exception.NotFoundException('Newsletter subscriber not found')
    }

    await ds.newsletter.delete(id)

    return c.json({
      success: true,
    })
  })
