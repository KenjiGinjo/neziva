import type { HonoResponse } from '../../types'
import { Exception } from '@neziva/tools/exception'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination } from '../../utils'

export const newsletter = new Hono()
  .basePath('/api/admin/newsletter')

  /** 获取订阅者列表 */
  .get('/subscribers', authAd(), pagination(), async (c): Promise<HonoResponse<{ data: any[], pagination: any }>> => {
    const { where } = c.get('page')
    const status = c.req.query('status')
    const source = c.req.query('source')
    const search = c.req.query('search')

    let query = db.newsletter

    if (status) {
      query = query.where({ status: Number(status) })
    }

    if (source) {
      query = query.where({ source })
    }

    if (search) {
      query = query.where({ email: { ilike: `%${search}%` } })
    }

    const [items, total] = await Promise.all([
      query
        .order({ createdAt: 'DESC' })
        .limit(where.limit)
        .offset(where.offset),
      query.count(),
    ])

    return c.json({
      data: items,
      pagination: {
        page: c.get('page').query.page,
        limit: c.get('page').query.pageSize,
        total,
        totalPages: Math.ceil(total / where.limit),
      },
    })
  })

  /** 更新订阅状态 */
  .put('/subscribers/:id/status', authAd(), async (c): Promise<HonoResponse<{ data: any }>> => {
    const id = c.req.param('id')
    const { status } = await c.req.json()

    const subscriber = await db.newsletter.where({ id }).takeOptional()

    if (!subscriber) {
      throw new Exception.NotFoundException('Newsletter subscriber not found')
    }

    const updateData: any = { status: Number(status) }

    if (Number(status) === 1) {
      updateData.verifiedAt = new Date()
    }

    if (Number(status) === 2) {
      updateData.unsubscribedAt = new Date()
    }

    const updated = await db.newsletter.where({ id }).update(updateData)

    return c.json({
      data: updated,
    })
  })

  /** 删除订阅者 */
  .delete('/subscribers/:id', authAd(), async (c): Promise<HonoResponse<{ success: boolean }>> => {
    const id = c.req.param('id')

    const subscriber = await db.newsletter.where({ id }).takeOptional()

    if (!subscriber) {
      throw new Exception.NotFoundException('Newsletter subscriber not found')
    }

    await db.newsletter.where({ id }).delete()

    return c.json({
      success: true,
    })
  })
