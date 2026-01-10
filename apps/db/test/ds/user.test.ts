import { PLAN_LIMITS } from '@haole/constants'
import { EnumUserStatus } from '@haole/enums'
import { verifyPassword } from '@haole/tools/crypto'
import { Exception } from '@haole/tools/exception'
import { describe, expect, test } from 'bun:test'
import { db, ds } from '../../src'

describe('user', () => {
  test('创建用户：基本功能（带密码）', async () => {
    const email = 'test@example.com'
    const password = 'password123'
    const firstName = 'John'
    const lastName = 'Doe'

    const user = await ds.user.create({
      email,
      password,
      firstName,
      lastName,
    })

    expect(user).not.toBeNull()
    expect(user.email).toBe(email)
    expect(user.firstName).toBe(firstName)
    expect(user.lastName).toBe(lastName)
    expect(user.nickname).toBe(`${firstName} ${lastName}`)
    expect(user.password).not.toBe(password) // 密码应该被哈希
    expect(await verifyPassword(password, user.password!)).toBe(true)
  })

  test('创建用户：使用自定义 nickname', async () => {
    const email = 'test2@example.com'
    const password = 'password123'
    const nickname = 'CustomNickname'

    const user = await ds.user.create({
      email,
      password,
      nickname,
    })

    expect(user.nickname).toBe(nickname)
  })

  test('创建用户：只传入 firstName 和 lastName，自动生成 nickname', async () => {
    const email = 'test3@example.com'
    const password = 'password123'
    const firstName = 'Jane'
    const lastName = 'Smith'

    const user = await ds.user.create({
      email,
      password,
      firstName,
      lastName,
    })

    expect(user.nickname).toBe(`${firstName} ${lastName}`)
  })

  test('创建用户：不传入 firstName 和 lastName，nickname 为 null 或 undefined', async () => {
    const email = 'test4@example.com'
    const password = 'password123'

    const user = await ds.user.create({
      email,
      password,
    })

    // 数据库可能返回 null 而不是 undefined
    expect(user.nickname === null || user.nickname === undefined).toBe(true)
  })

  test('创建用户：重复邮箱应该抛出异常', async () => {
    const email = 'duplicate@example.com'
    const password = 'password123'

    await ds.user.create({
      email,
      password,
    })

    // 尝试使用相同邮箱创建用户
    await expect(
      ds.user.create({
        email,
        password: 'anotherpassword',
      }),
    ).rejects.toThrow(Exception.BadRequestException)
  })

  test('使用 Google 创建用户：基本功能', async () => {
    const email = 'google@example.com'
    const googleId = 'google123'
    const firstName = 'Google'
    const lastName = 'User'
    const avatar = 'https://example.com/avatar.jpg'

    const user = await ds.user.createWithGoogle({
      email,
      googleId,
      avatar,
      firstName,
      lastName,
    })

    expect(user).not.toBeNull()
    expect(user.email).toBe(email)
    expect(user.googleId).toBe(googleId)
    expect(user.firstName).toBe(firstName)
    expect(user.lastName).toBe(lastName)
    expect(user.nickname).toBe(`${firstName} ${lastName}`)
    expect(user.avatarUrl).toBe(avatar)
    expect(user.emailVerifiedAt).not.toBeNull()
  })

  test('使用 Google 创建用户：使用自定义 nickname', async () => {
    const email = 'google2@example.com'
    const googleId = 'google456'
    const nickname = 'GoogleNickname'

    const user = await ds.user.createWithGoogle({
      email,
      googleId,
      nickname,
    })

    expect(user.nickname).toBe(nickname)
  })

  test('使用 Google 创建用户：没有 firstName 和 lastName，使用 email 前缀作为 nickname', async () => {
    const email = 'googleuser@example.com'
    const googleId = 'google789'

    const user = await ds.user.createWithGoogle({
      email,
      googleId,
    })

    expect(user.nickname).toBe('googleuser')
  })

  test('使用 Google 创建用户：重复邮箱应该抛出异常', async () => {
    const email = 'duplicate-google@example.com'
    const googleId1 = 'google111'
    const googleId2 = 'google222'

    await ds.user.createWithGoogle({
      email,
      googleId: googleId1,
    })

    // 尝试使用相同邮箱创建用户
    await expect(
      ds.user.createWithGoogle({
        email,
        googleId: googleId2,
      }),
    ).rejects.toThrow(Exception.BadRequestException)
  })

  test('使用 GitHub 创建用户：基本功能', async () => {
    const email = 'github@example.com'
    const githubId = 'github123'
    const firstName = 'GitHub'
    const lastName = 'User'
    const avatar = 'https://example.com/github-avatar.jpg'

    const user = await ds.user.createWithGithub({
      email,
      githubId,
      avatar,
      firstName,
      lastName,
    })

    expect(user).not.toBeNull()
    expect(user.email).toBe(email)
    expect(user.githubId).toBe(githubId)
    expect(user.firstName).toBe(firstName)
    expect(user.lastName).toBe(lastName)
    expect(user.nickname).toBe(`${firstName} ${lastName}`)
    expect(user.avatarUrl).toBe(avatar)
    expect(user.emailVerifiedAt).not.toBeNull()
  })

  test('使用 GitHub 创建用户：使用自定义 nickname', async () => {
    const email = 'github2@example.com'
    const githubId = 'github456'
    const nickname = 'GitHubNickname'

    const user = await ds.user.createWithGithub({
      email,
      githubId,
      nickname,
    })

    expect(user.nickname).toBe(nickname)
  })

  test('使用 GitHub 创建用户：没有 firstName 和 lastName，使用 email 前缀作为 nickname', async () => {
    const email = 'githubuser@example.com'
    const githubId = 'github789'

    const user = await ds.user.createWithGithub({
      email,
      githubId,
    })

    expect(user.nickname).toBe('githubuser')
  })

  test('使用 GitHub 创建用户：重复邮箱应该抛出异常', async () => {
    const email = 'duplicate-github@example.com'
    const githubId1 = 'github111'
    const githubId2 = 'github222'

    await ds.user.createWithGithub({
      email,
      githubId: githubId1,
    })

    // 尝试使用相同邮箱创建用户
    await expect(
      ds.user.createWithGithub({
        email,
        githubId: githubId2,
      }),
    ).rejects.toThrow(Exception.BadRequestException)
  })

  test('查找或创建 Google 用户：用户不存在时创建新用户', async () => {
    const email = 'find-or-create-google@example.com'
    const googleId = 'find-google123'
    const firstName = 'Find'
    const lastName = 'User'

    const user = await ds.user.findOrCreateWithGoogle({
      email,
      googleId,
      firstName,
      lastName,
    })

    expect(user).not.toBeNull()
    expect(user.email).toBe(email)
    expect(user.googleId).toBe(googleId)
    expect(user.firstName).toBe(firstName)
    expect(user.lastName).toBe(lastName)
  })

  test('查找或创建 Google 用户：用户已存在时返回现有用户并更新登录时间', async () => {
    const email = 'existing-google@example.com'
    const googleId = 'existing-google123'
    const avatar = 'https://example.com/new-avatar.jpg'

    // 先创建用户
    const createdUser = await ds.user.createWithGoogle({
      email,
      googleId,
      firstName: 'Existing',
      lastName: 'User',
    })

    const beforeLastLogin = createdUser.lastLoginAt

    // 等待一小段时间，确保时间戳不同
    await new Promise(resolve => setTimeout(resolve, 10))

    // 查找或创建（应该返回现有用户）
    const foundUser = await ds.user.findOrCreateWithGoogle({
      email,
      googleId,
      avatar,
    })

    expect(foundUser.id).toBe(createdUser.id)
    expect(foundUser.email).toBe(email)

    // 重新查询数据库以验证更新
    const updatedUser = await db.user.find(createdUser.id).select('avatarUrl', 'lastLoginAt')
    expect(updatedUser.avatarUrl).toBe(avatar) // 应该更新头像
    expect(updatedUser.lastLoginAt).not.toBeNull()
    if (beforeLastLogin) {
      expect(updatedUser.lastLoginAt!.getTime()).toBeGreaterThan(beforeLastLogin.getTime())
    }
  })

  test('查找或创建 GitHub 用户：用户不存在时创建新用户', async () => {
    const email = 'find-or-create-github@example.com'
    const githubId = 'find-github123'
    const firstName = 'Find'
    const lastName = 'User'

    const user = await ds.user.findOrCreateWithGithub({
      email,
      githubId,
      firstName,
      lastName,
    })

    expect(user).not.toBeNull()
    expect(user.email).toBe(email)
    expect(user.githubId).toBe(githubId)
    expect(user.firstName).toBe(firstName)
    expect(user.lastName).toBe(lastName)
  })

  test('查找或创建 GitHub 用户：用户已存在时返回现有用户并更新登录时间', async () => {
    const email = 'existing-github@example.com'
    const githubId = 'existing-github123'
    const avatar = 'https://example.com/new-github-avatar.jpg'

    // 先创建用户
    const createdUser = await ds.user.createWithGithub({
      email,
      githubId,
      firstName: 'Existing',
      lastName: 'User',
    })

    const beforeLastLogin = createdUser.lastLoginAt

    // 等待一小段时间，确保时间戳不同
    await new Promise(resolve => setTimeout(resolve, 10))

    // 查找或创建（应该返回现有用户）
    const foundUser = await ds.user.findOrCreateWithGithub({
      email,
      githubId,
      avatar,
    })

    expect(foundUser.id).toBe(createdUser.id)
    expect(foundUser.email).toBe(email)

    // 重新查询数据库以验证更新
    const updatedUser = await db.user.find(createdUser.id).select('avatarUrl', 'lastLoginAt')
    expect(updatedUser.avatarUrl).toBe(avatar) // 应该更新头像
    expect(updatedUser.lastLoginAt).not.toBeNull()
    if (beforeLastLogin) {
      expect(updatedUser.lastLoginAt!.getTime()).toBeGreaterThan(beforeLastLogin.getTime())
    }
  })

  test('创建测试用户：使用默认参数', async () => {
    const email = 'testuser@example.com'

    const user = await ds.user.createTestUser({
      email,
    })

    expect(user).not.toBeNull()
    expect(user.email).toBe(email)
    expect(user.password).not.toBeNull()
    expect(await verifyPassword('123456', user.password!)).toBe(true)
    expect(user.nickname).toBe('testuser')
    expect(user.subscriptionPlan).toBe('free')
    expect(user.subscriptionStatus).toBe('active')
    expect(user.apiCallsUsed).toBe(0)
    expect(user.apiCallsLimit).toBe(PLAN_LIMITS.free.apiCallsLimit)
    expect(user.status).toBe(EnumUserStatus.Active)
  })

  test('创建测试用户：指定所有参数', async () => {
    const email = 'testuser2@example.com'
    const password = 'custompassword'
    const subscriptionPlan = 'pro'
    const subscriptionStatus = 'active'
    const apiCallsUsed = 500
    const nickname = 'TestUser2'
    const avatarUrl = 'https://example.com/avatar.jpg'

    const user = await ds.user.createTestUser({
      email,
      password,
      subscriptionPlan,
      subscriptionStatus,
      apiCallsUsed,
      nickname,
      avatarUrl,
    })

    expect(user.email).toBe(email)
    expect(await verifyPassword(password, user.password!)).toBe(true)
    expect(user.nickname).toBe(nickname)
    expect(user.avatarUrl).toBe(avatarUrl)
    expect(user.subscriptionPlan).toBe(subscriptionPlan)
    expect(user.subscriptionStatus).toBe(subscriptionStatus)
    expect(user.apiCallsUsed).toBe(apiCallsUsed)
    expect(user.apiCallsLimit).toBe(PLAN_LIMITS.pro.apiCallsLimit)
  })

  test('创建测试用户：不同订阅计划的限制', async () => {
    const plans = ['free', 'starter', 'pro', 'business'] as const

    for (const plan of plans) {
      const email = `test-${plan}@example.com`
      const user = await ds.user.createTestUser({
        email,
        subscriptionPlan: plan,
      })

      expect(user.subscriptionPlan).toBe(plan)
      expect(user.apiCallsLimit).toBe(PLAN_LIMITS[plan].apiCallsLimit)
    }
  })

  test('创建测试用户：不同订阅状态', async () => {
    const statuses = ['active', 'canceled', 'expired'] as const

    for (const status of statuses) {
      const email = `test-${status}@example.com`
      const user = await ds.user.createTestUser({
        email,
        subscriptionStatus: status,
      })

      expect(user.subscriptionStatus).toBe(status)
    }
  })

  test('更新最后登录时间：基本功能', async () => {
    // 先创建一个用户
    const user = await ds.user.create({
      email: 'login-test@example.com',
      password: 'password123',
    })

    expect(user.lastLoginAt).toBeNull()

    // 更新登录时间
    await ds.user.updateLastLogin(user.id)

    // 验证登录时间已更新
    const updatedUser = await db.user.find(user.id).select('lastLoginAt')
    expect(updatedUser.lastLoginAt).not.toBeNull()
  })

  test('更新最后登录时间：多次更新应该更新为最新时间', async () => {
    // 先创建一个用户
    const user = await ds.user.create({
      email: 'login-test2@example.com',
      password: 'password123',
    })

    // 第一次更新
    await ds.user.updateLastLogin(user.id)
    const firstUpdate = await db.user.find(user.id).select('lastLoginAt')
    const firstLoginTime = firstUpdate.lastLoginAt

    // 等待一小段时间
    await new Promise(resolve => setTimeout(resolve, 10))

    // 第二次更新
    await ds.user.updateLastLogin(user.id)
    const secondUpdate = await db.user.find(user.id).select('lastLoginAt')
    const secondLoginTime = secondUpdate.lastLoginAt

    expect(secondLoginTime).not.toBeNull()
    if (firstLoginTime) {
      expect(secondLoginTime!.getTime()).toBeGreaterThan(firstLoginTime.getTime())
    }
  })
})
