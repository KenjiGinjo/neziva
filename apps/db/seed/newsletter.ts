import { EnumNewsletterStatus } from '@neziva/enums'
import { db } from '../src'

export async function initNewsletter() {
  const subscribers = [
    {
      email: 'subscriber1@example.com',
      status: EnumNewsletterStatus.Subscribed,
      source: 'homepage',
      verifiedAt: new Date('2026-01-01'),
    },
    {
      email: 'subscriber2@example.com',
      status: EnumNewsletterStatus.Subscribed,
      source: 'blog',
      verifiedAt: new Date('2026-01-02'),
    },
    {
      email: 'subscriber3@example.com',
      status: EnumNewsletterStatus.Pending,
      source: 'homepage',
    },
    {
      email: 'subscriber4@example.com',
      status: EnumNewsletterStatus.Subscribed,
      source: 'blog',
      verifiedAt: new Date('2026-01-03'),
    },
    {
      email: 'subscriber5@example.com',
      status: EnumNewsletterStatus.Unsubscribed,
      source: 'homepage',
      verifiedAt: new Date('2026-01-01'),
      unsubscribedAt: new Date('2026-01-10'),
    },
  ]

  const createdSubscribers = []
  for (const subscriber of subscribers) {
    try {
      const created = await db.newsletter.create(subscriber)
      createdSubscribers.push(created)
      console.warn(`  ✅ Created newsletter subscriber: ${subscriber.email}`)
    }
    catch (error: unknown) {
      // 如果邮箱已存在，跳过
      if (error instanceof Error && (error.message.includes('unique') || error.message.includes('duplicate'))) {
        console.warn(`  ⚠️  Skipped duplicate email: ${subscriber.email}`)
      }
      else {
        throw error
      }
    }
  }

  return createdSubscribers
}
