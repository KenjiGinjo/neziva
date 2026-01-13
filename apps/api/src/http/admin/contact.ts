import type { HonoResponse } from '../../types'
import { EnumContactFormStatus } from '@neziva/enums'
import { Exception } from '@neziva/tools/exception'
import { vContactFormsQuery, vContactFormId, vContactFormStatus, vContactFormNotes } from '@neziva/validations'
import { ds } from 'db'
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
  .get('/forms/:id', authAd(), validate('param', vContactFormId), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')

    const form = await ds.contactForm.getById(id)

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

    const form = await ds.contactForm.getById(id)

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    const updated = await ds.contactForm.updateStatus(id, Number(status) as EnumContactFormStatus)

    return c.json({
      data: updated,
    })
  })

  /** 更新备注 */
  .put('/forms/:id/notes', authAd(), validate('param', vContactFormId), validate('json', vContactFormNotes), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')
    const { notes } = c.req.valid('json')

    const form = await ds.contactForm.getById(id)

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    const updated = await ds.contactForm.updateNotes(id, notes || '')

    return c.json({
      data: updated,
    })
  })

  /** 删除联系表单记录 */
  .delete('/forms/:id', authAd(), validate('param', vContactFormId), async (c): Promise<HonoResponse<{ success: boolean }>> => {
    const { id } = c.req.valid('param')

    const form = await ds.contactForm.getById(id)

    if (!form) {
      throw new Exception.NotFoundException('Contact form not found')
    }

    await ds.contactForm.delete(id)

    return c.json({
      success: true,
    })
  })
