/* eslint-disable no-console */
import { faker } from '@faker-js/faker'
import { addMonths, subMonths } from 'date-fns'
import { ds } from '../src'

export async function initSubscriptions(
  users: Awaited<ReturnType<typeof import('./users').initUsers>>,
) {
  console.log('🌱 Seeding subscriptions...')

  const subscriptions = []

  // 为有付费计划的用户创建订阅记录
  for (const user of users) {
    if (user.subscriptionPlan === 'free')
      continue

    const now = new Date()
    const currentPeriodStart = subMonths(now, faker.number.int({ min: 0, max: 2 }))
    const currentPeriodEnd = addMonths(currentPeriodStart, 1)

    const subscription = await ds.subscription.createForPlan({
      userId: user.id,
      plan: user.subscriptionPlan as 'starter' | 'pro' | 'business',
      status: user.subscriptionStatus === 'canceled' ? 'canceled' : 'active',
      currentPeriodStart,
      currentPeriodEnd,
      subscriptionId: `sub_${faker.string.alphanumeric(16)}`,
      cancelAtPeriodEnd: user.subscriptionStatus === 'canceled',
    })

    subscriptions.push(subscription)
  }

  console.log(`✅ Created ${subscriptions.length} subscriptions`)
  return subscriptions
}
