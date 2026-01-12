import type { HonoResponse } from '../../types'
import { EnumContactFormStatus } from '@neziva/enums'
import { Exception } from '@neziva/tools/exception'
import { vContactFormsQuery, vContactFormId, vContactFormStatus, vContactFormNotes } from '@neziva/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination, validate } from '../../utils'

export const contact = new Hono()
  .basePath('/api/admin/contact')

  /** 获取联系表单列表 */
  .get('/forms', authAd(), pagination(), validate('query', vContactFormsQuery), async (c): Promise<HonoResponse<{ data: any[], pagination: any }>> => {
    const { where } = c.get('page')
    const { status, projectType, search } = c.req.valid('query')

    let query = db.contactForm

    if (status) {
      query = query.where({ status: Number(status) as EnumContactFormStatus })
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

  /** 获取联系表单详情 */
  .get('/forms/:id', authAd(), validate('param', vContactFormId), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')

    const form = await db.contactForm.where({ id }).takeOptional()

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    return c.json({
      data: form,
    })
  })

  /** 更新处理状态 */
  .put('/forms/:id/status', authAd(), validate('param', vContactFormId), validate('json', vContactFormStatus), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')
    const { status } = c.req.valid('json')

    const form = await db.contactForm.where({ id }).takeOptional()

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    await db.contactForm.where({ id }).update({ status: Number(status) as EnumContactFormStatus })

    // 重新查询获取更新后的数据
    const updated = await db.contactForm.where({ id }).take()

    return c.json({
      data: updated,
    })
  })

  /** 更新备注 */
  .put('/forms/:id/notes', authAd(), validate('param', vContactFormId), validate('json', vContactFormNotes), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')
    const { notes } = c.req.valid('json')

    const form = await db.contactForm.where({ id }).takeOptional()

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    await db.contactForm.where({ id }).update({ notes })

    // 重新查询获取更新后的数据
    const updated = await db.contactForm.where({ id }).take()

    return c.json({
      data: updated,
    })
  })

  /** 删除联系表单记录 */
  .delete('/forms/:id', authAd(), validate('param', vContactFormId), async (c): Promise<HonoResponse<{ success: boolean }>> => {
    const { id } = c.req.valid('param')

    const form = await db.contactForm.where({ id }).takeOptional()

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    await db.contactForm.where({ id }).delete()

    return c.json({
      success: true,
    })
  })
