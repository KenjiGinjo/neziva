import { EnumNewsletterStatus } from '@neziva/enums'
import { db } from '../tables'

export const newsletter = {
  /**
   * 订阅 Newsletter
   */
  subscribe: async (data: {
    email: string
    source?: string
  }) => {
    const { email, source } = data

    // 检查是否已订阅
    const existing = await db.newsletter.where({ email }).takeOptional()

    if (existing) {
      if (existing.status === EnumNewsletterStatus.Subscribed) {
        throw new Error('Email already subscribed')
      }
      // 如果之前退订过，重新订阅
      if (existing.status === EnumNewsletterStatus.Unsubscribed) {
        await db.newsletter.where({ email }).update({
          status: EnumNewsletterStatus.Pending,
          unsubscribedAt: null,
          source: source || existing.source,
        })
        return { reactivated: true }
      }
      return { alreadyExists: true }
    }

    await db.newsletter.create({
      email,
      status: EnumNewsletterStatus.Pending,
      source,
    })

    return { created: true }
  },

  /**
   * 获取订阅者列表（管理后台）
   */
  getList: async (options: {
    status?: EnumNewsletterStatus
    source?: string
    search?: string
    limit: number
    offset: number
  }) => {
    const { status, source, search, limit, offset } = options

    let query = db.newsletter

    if (status !== undefined) {
      query = query.where({ status })
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
      .limit(limit)
      .offset(offset)

    return { data, total }
  },

  /**
   * 获取订阅者详情
   */
  getById: async (id: string) => {
    return await db.newsletter.where({ id }).takeOptional()
  },

  /**
   * 更新订阅状态
   */
  updateStatus: async (id: string, status: EnumNewsletterStatus) => {
    const updateData: any = { status }

    if (status === EnumNewsletterStatus.Subscribed) {
      updateData.verifiedAt = new Date()
    }

    if (status === EnumNewsletterStatus.Unsubscribed) {
      updateData.unsubscribedAt = new Date()
    }

    await db.newsletter.where({ id }).update(updateData)
    return await db.newsletter.where({ id }).take()
  },

  /**
   * 删除订阅者
   */
  delete: async (id: string) => {
    await db.newsletter.where({ id }).delete()
  },
}
