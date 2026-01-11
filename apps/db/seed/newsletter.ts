import { faker } from '@faker-js/faker'
import { db } from '../src'

export async function initNewsletter() {
  const subscribers = [
    {
      email: 'subscriber1@example.com',
      status: 1, // 已订阅
      source: 'homepage',
      verifiedAt: new Date('2026-01-01'),
    },
    {
      email: 'subscriber2@example.com',
      status: 1,
      source: 'blog',
      verifiedAt: new Date('2026-01-02'),
    },
    {
      email: 'subscriber3@example.com',
      status: 0, // 待验证
      source: 'homepage',
    },
    {
      email: 'subscriber4@example.com',
      status: 1,
      source: 'blog',
      verifiedAt: new Date('2026-01-03'),
    },
    {
      email: 'subscriber5@example.com',
      status: 2, // 已退订
      source: 'homepage',
      verifiedAt: new Date('2026-01-01'),
      unsubscribedAt: new Date('2026-01-10'),
    },
  ]

  // 生成一些随机订阅者
  for (let i = 0; i < 10; i++) {
    subscribers.push({
      email: faker.internet.email(),
      status: faker.helpers.arrayElement([0, 1, 2]),
      source: faker.helpers.arrayElement(['homepage', 'blog', 'contact']),
      verifiedAt: faker.helpers.maybe(() => new Date(faker.date.past()), { probability: 0.7 }),
      unsubscribedAt: faker.helpers.maybe(() => new Date(faker.date.past()), { probability: 0.2 }),
    })
  }

  const createdSubscribers = []
  for (const subscriber of subscribers) {
    try {
      const created = await db.newsletter.create(subscriber)
      createdSubscribers.push(created)
      console.log(`  ✅ Created newsletter subscriber: ${subscriber.email}`)
    }
    catch (error: any) {
      // 如果邮箱已存在，跳过
      if (error?.message?.includes('unique') || error?.message?.includes('duplicate')) {
        console.log(`  ⚠️  Skipped duplicate email: ${subscriber.email}`)
      }
      else {
        throw error
      }
    }
  }

  return createdSubscribers
}
