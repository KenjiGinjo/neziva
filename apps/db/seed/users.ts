/* eslint-disable no-console */
import { faker } from '@faker-js/faker'
import { ds } from '../src'

export async function initUsers() {
  console.log('🌱 Seeding users...')

  // 创建不同订阅计划的测试用户
  const users = await Promise.all([

    ds.user.createTestUser({
      email: 'kenjiginjo@gmail.com',
      nickname: 'Kenji Ginjo',
      avatarUrl: faker.image.avatar(),
      subscriptionPlan: 'business',
      subscriptionStatus: 'active',
      apiCallsUsed: 5000,
      password: '123456',
      emailVerifiedAt: new Date(),
    }),

    // Free 计划用户
    ds.user.createTestUser({
      email: 'free@example.com',
      nickname: 'Free User',
      avatarUrl: faker.image.avatar(),
      subscriptionPlan: 'free',
      subscriptionStatus: 'active',
      apiCallsUsed: 25,
      password: '123456',
      emailVerifiedAt: new Date(),
    }),

    // Starter 计划用户
    ds.user.createTestUser({
      email: 'starter@example.com',
      nickname: 'Starter User',
      avatarUrl: faker.image.avatar(),
      subscriptionPlan: 'starter',
      subscriptionStatus: 'active',
      apiCallsUsed: 150,
      password: '123456',
      emailVerifiedAt: new Date(),
    }),

    // Pro 计划用户
    ds.user.createTestUser({
      email: 'pro@example.com',
      nickname: 'Pro User',
      avatarUrl: faker.image.avatar(),
      subscriptionPlan: 'pro',
      subscriptionStatus: 'active',
      apiCallsUsed: 1200,
      password: '123456',
      emailVerifiedAt: new Date(),
    }),

    // Business 计划用户
    ds.user.createTestUser({
      email: 'business@example.com',
      nickname: 'Business User',
      avatarUrl: faker.image.avatar(),
      subscriptionPlan: 'business',
      subscriptionStatus: 'active',
      apiCallsUsed: 5000,
      password: '123456',
      emailVerifiedAt: new Date(),
    }),

    // 已取消订阅的用户
    ds.user.createTestUser({
      email: 'canceled@example.com',
      nickname: 'Canceled User',
      avatarUrl: faker.image.avatar(),
      subscriptionPlan: 'pro',
      subscriptionStatus: 'canceled',
      apiCallsUsed: 8000,
      password: '123456',
      emailVerifiedAt: new Date(),
    }),
  ])

  console.log(`✅ Created ${users.length} users`)
  return users
}
