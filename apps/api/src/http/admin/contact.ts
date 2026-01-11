import type { HonoResponse } from '../../types'
import { Exception } from '@neziva/tools/exception'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination } from '../../utils'

export const contact = new Hono()
  .basePath('/api/admin/contact')

  /** 获取联系表单列表 */
  .get('/forms', authAd(), pagination(), async (c): Promise<HonoResponse<{ data: any[], pagination: any }>> => {
    const { where } = c.get('page')
    const status = c.req.query('status')
    const projectType = c.req.query('projectType')
    const search = c.req.query('search')

    let query = db.contactForm

    if (status) {
      query = query.where({ status: Number(status) })
    }

    if (projectType) {
      query = query.where({ projectType })
    }

    if (search) {
      query = query.where(q => q.or([
        { name: { ilike: `%${search}%` } },
        { email: { ilike: `%${search}%` } },
        { company: { ilike: `%${search}%` } },
      ]))
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

  /** 获取联系表单详情 */
  .get('/forms/:id', authAd(), async (c): Promise<HonoResponse<{ data: any }>> => {
    const id = c.req.param('id')

    const form = await db.contactForm.where({ id }).takeOptional()

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    return c.json({
      data: form,
    })
  })

  /** 更新处理状态 */
  .put('/forms/:id/status', authAd(), async (c): Promise<HonoResponse<{ data: any }>> => {
    const id = c.req.param('id')
    const { status } = await c.req.json()

    const form = await db.contactForm.where({ id }).takeOptional()

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    const updated = await db.contactForm.where({ id }).update({ status: Number(status) })

    return c.json({
      data: updated,
    })
  })

  /** 更新备注 */
  .put('/forms/:id/notes', authAd(), async (c): Promise<HonoResponse<{ data: any }>> => {
    const id = c.req.param('id')
    const { notes } = await c.req.json()

    const form = await db.contactForm.where({ id }).takeOptional()

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    const updated = await db.contactForm.where({ id }).update({ notes })

    return c.json({
      data: updated,
    })
  })

  /** 删除联系表单记录 */
  .delete('/forms/:id', authAd(), async (c): Promise<HonoResponse<{ success: boolean }>> => {
    const id = c.req.param('id')

    const form = await db.contactForm.where({ id }).takeOptional()

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    await db.contactForm.where({ id }).delete()

    return c.json({
      success: true,
    })
  })
