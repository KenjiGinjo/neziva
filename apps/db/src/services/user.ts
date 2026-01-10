import { PLAN_LIMITS } from '@neziva/constants'
import { EnumUserStatus } from '@neziva/enums'
import { hashPassword } from '@neziva/tools/crypto'
import { Exception } from '@neziva/tools/exception'
import { db } from '../tables'

export const user = {
  create: async ({ email, password, firstName, lastName, nickname }: { email: string, password: string, firstName?: string, lastName?: string, nickname?: string }) => {
    const existingEmail = await db.user.where({ email }).takeOptional()

    if (existingEmail) {
      throw new Exception.BadRequestException('Email already registered')
    }

    const hashedPassword = await hashPassword(password)

    // 自动将 firstName 和 lastName 拼接为 nickname（如果没有传入 nickname）
    const finalNickname = nickname || (firstName && lastName ? `${firstName} ${lastName}`.trim() : undefined)

    const user = await db.user.create({
      email,
      password: hashedPassword,
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(finalNickname && { nickname: finalNickname }),
    })

    return user
  },

  createWithGoogle: async ({ email, googleId, avatar, firstName, lastName, nickname }: { email: string, googleId: string, avatar?: string, firstName?: string, lastName?: string, nickname?: string }) => {
    const existingEmail = await db.user.where({ email }).takeOptional()

    if (existingEmail) {
      throw new Exception.BadRequestException('Email already registered')
    }

    // 优先使用传入的 nickname，否则使用 firstName + lastName，最后使用 email 前缀
    const finalNickname = nickname || (firstName && lastName ? `${firstName} ${lastName}`.trim() : email.split('@')[0])

    const user = await db.user.create({
      email,
      googleId,
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      nickname: finalNickname,
      avatarUrl: avatar,
      emailVerifiedAt: new Date(), // Google 登录时邮箱已验证
    })

    return user
  },

  createWithGithub: async ({ email, githubId, avatar, firstName, lastName, nickname }: { email: string, githubId: string, avatar?: string, firstName?: string, lastName?: string, nickname?: string }) => {
    const existingEmail = await db.user.where({ email }).takeOptional()

    if (existingEmail) {
      throw new Exception.BadRequestException('Email already registered')
    }

    // 优先使用传入的 nickname，否则使用 firstName + lastName，最后使用 email 前缀
    const finalNickname = nickname || (firstName && lastName ? `${firstName} ${lastName}`.trim() : email.split('@')[0])

    const user = await db.user.create({
      email,
      githubId,
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      nickname: finalNickname,
      avatarUrl: avatar,
      emailVerifiedAt: new Date(), // GitHub 登录时邮箱已验证
    })

    return user
  },

  findOrCreateWithGoogle: async ({ email, googleId, avatar, firstName, lastName, nickname }: { email: string, googleId: string, avatar?: string, firstName?: string, lastName?: string, nickname?: string }) => {
    // 先查找是否已存在
    const existingUser = await db.user.where({ googleId }).takeOptional()
    if (existingUser) {
      // 更新最后登录时间
      await db.user.where({ id: existingUser.id }).update({
        lastLoginAt: new Date(),
        ...(avatar && { avatarUrl: avatar }),
      })
      return existingUser
    }

    // 如果不存在，创建新用户
    return await user.createWithGoogle({ email, googleId, avatar, firstName, lastName, nickname })
  },

  findOrCreateWithGithub: async ({ email, githubId, avatar, firstName, lastName, nickname }: { email: string, githubId: string, avatar?: string, firstName?: string, lastName?: string, nickname?: string }) => {
    // 先查找是否已存在
    const existingUser = await db.user.where({ githubId }).takeOptional()
    if (existingUser) {
      // 更新最后登录时间
      await db.user.where({ id: existingUser.id }).update({
        lastLoginAt: new Date(),
        ...(avatar && { avatarUrl: avatar }),
      })
      return existingUser
    }

    // 如果不存在，创建新用户
    return await user.createWithGithub({ email, githubId, avatar, firstName, lastName, nickname })
  },

  createTestUser: async ({
    email,
    password = '123456',
    subscriptionPlan = 'free',
    subscriptionStatus = 'active',
    apiCallsUsed = 0,
    nickname,
    avatarUrl,
    emailVerifiedAt,
  }: {
    email: string
    password?: string
    subscriptionPlan?: 'free' | 'starter' | 'pro' | 'business'
    subscriptionStatus?: 'active' | 'canceled' | 'expired'
    apiCallsUsed?: number
    nickname?: string
    avatarUrl?: string
    emailVerifiedAt?: Date
  }) => {
    const limits = PLAN_LIMITS[subscriptionPlan] || PLAN_LIMITS.free

    const user = await db.user.create({
      email,
      password: await hashPassword(password),
      nickname: nickname || email.split('@')[0],
      avatarUrl,
      subscriptionPlan,
      subscriptionStatus,
      apiCallsLimit: limits.apiCallsLimit,
      apiCallsUsed,
      status: EnumUserStatus.Active,
      emailVerifiedAt,
    })

    return user
  },

  updateLastLogin: async (userId: string) => {
    await db.user.where({ id: userId }).update({
      lastLoginAt: new Date(),
    })
  },
}
