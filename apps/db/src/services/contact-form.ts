import { EnumContactFormStatus } from '@neziva/enums'
import { db } from '../tables'

export const contactForm = {
  /**
   * 提交联系表单
   */
  submit: async (data: {
    name: string
    company?: string
    email: string
    phone?: string
    projectType: string
    description: string
    budget?: string
  }) => {
    return await db.contactForm.create({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      projectType: data.projectType,
      description: data.description,
      budget: data.budget,
      status: EnumContactFormStatus.Pending,
    })
  },

  /**
   * 获取联系表单列表（管理后台）
   */
  getList: async (options: {
    status?: EnumContactFormStatus
    projectType?: string
    search?: string
    limit: number
    offset: number
  }) => {
    const { status, projectType, search, limit, offset } = options

    let query = db.contactForm

    if (status !== undefined) {
      query = query.where({ status })
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
      .limit(limit)
      .offset(offset)

    return { data, total }
  },

  /**
   * 获取联系表单详情
   */
  getById: async (id: string) => {
    return await db.contactForm.where({ id }).takeOptional()
  },

  /**
   * 更新处理状态
   */
  updateStatus: async (id: string, status: EnumContactFormStatus) => {
    await db.contactForm.where({ id }).update({ status })
    return await db.contactForm.where({ id }).take()
  },

  /**
   * 更新备注
   */
  updateNotes: async (id: string, notes: string) => {
    await db.contactForm.where({ id }).update({ notes })
    return await db.contactForm.where({ id }).take()
  },

  /**
   * 删除联系表单记录
   */
  delete: async (id: string) => {
    await db.contactForm.where({ id }).delete()
  },
}
