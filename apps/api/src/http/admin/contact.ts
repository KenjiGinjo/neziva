import type { EnumContactFormStatus } from '@neziva/enums'
import type { ResAdminContactFormList, ResPagination } from '@neziva/interfaces'
import type { HonoResponse } from '../../types'
import { vContactFormNotes, vContactFormsQuery, vContactFormStatus, vIds } from '@neziva/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination, validate } from '../../utils'

export const contact = new Hono()
  .basePath('/contact')

  /** 获取联系表单列表 */
  .get('/forms', authAd(), pagination(), validate('query', vContactFormsQuery), async (c): Promise<HonoResponse<{ data: ResAdminContactFormList[], pagi: ResPagination }>> => {
    const { where } = c.get('page')
    const { status, projectType, search } = c.req.valid('query')
    let query = db.contactForm

    const baseConditions: any = {}
    if (status !== undefined) {
      baseConditions.status = status as EnumContactFormStatus
    }
    if (projectType) {
      baseConditions.projectType = projectType
    }

    // 如果有搜索条件，使用 orWhere 将基础条件与搜索条件组合
    if (search) {
      query = query.orWhere(
        { ...baseConditions, name: { contains: search } },
        { ...baseConditions, email: { contains: search } },
        { ...baseConditions, company: { contains: search } },
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

  /** 获取联系表单详情 */
  .get('/forms/:id', authAd(), validate('param', vIds('id')), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')

    const data = await db.contactForm.where({ id }).take()

    return c.json({ data })
  })

  /** 更新处理状态 */
  .put('/forms/:id/status', authAd(), validate('param', vIds('id')), validate('json', vContactFormStatus), async (c) => {
    const { id } = c.req.valid('param')
    const { status } = c.req.valid('json')

    await db.contactForm.where({ id }).update({ status })

    return c.body(null, 204)
  })

  /** 更新备注 */
  .put('/forms/:id/notes', authAd(), validate('param', vIds('id')), validate('json', vContactFormNotes), async (c) => {
    const { id } = c.req.valid('param')
    const { notes } = c.req.valid('json')

    await db.contactForm.where({ id }).update({ notes })

    return c.body(null, 204)
  })

  /** 删除联系表单记录 */
  .delete('/forms/:id', authAd(), validate('param', vIds('id')), async (c) => {
    const { id } = c.req.valid('param')

    await db.contactForm.where({ id }).delete()

    return c.body(null, 204)
  })
