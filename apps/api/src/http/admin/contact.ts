import type { EnumContactFormStatus } from '@neziva/enums'
import type { HonoResponse } from '../../types'
import { Exception } from '@neziva/tools/exception'
import { vContactFormNotes, vContactFormsQuery, vContactFormStatus, vIds } from '@neziva/validations'
import { db, ds } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination, validate } from '../../utils'

export const contact = new Hono()
  .basePath('/api/admin/contact')

  /** 获取联系表单列表 */
  .get('/forms', authAd(), pagination(), validate('query', vContactFormsQuery), async (c): Promise<HonoResponse<{ data: any[], pagination: any }>> => {
    const { where } = c.get('page')
    const { status, projectType, search } = c.req.valid('query')

    const { data, total } = await ds.contactForm.getList({
      status: status ? Number(status) as EnumContactFormStatus : undefined,
      projectType,
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

  /** 获取联系表单详情 */
  .get('/forms/:id', authAd(), validate('param', vIds('id')), async (c): Promise<HonoResponse<{ data: any }>> => {
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
  .put('/forms/:id/status', authAd(), validate('param', vIds('id')), validate('json', vContactFormStatus), async (c) => {
    const { id } = c.req.valid('param')
    const { status } = c.req.valid('json')

    const form = await db.contactForm.where({ id }).takeOptional()

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    await db.contactForm.where({ id }).update({ status: Number(status) as EnumContactFormStatus })

    return c.body(null, 204)
  })

  /** 更新备注 */
  .put('/forms/:id/notes', authAd(), validate('param', vIds('id')), validate('json', vContactFormNotes), async (c) => {
    const { id } = c.req.valid('param')
    const { notes } = c.req.valid('json')

    const form = await db.contactForm.where({ id }).takeOptional()

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    await db.contactForm.where({ id }).update({ notes })

    return c.body(null, 204)
  })

  /** 删除联系表单记录 */
  .delete('/forms/:id', authAd(), validate('param', vIds('id')), async (c) => {
    const { id } = c.req.valid('param')

    const form = await db.contactForm.where({ id }).takeOptional()

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    await db.contactForm.where({ id }).delete()

    return c.body(null, 204)
  })
