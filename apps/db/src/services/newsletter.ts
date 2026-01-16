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
}
