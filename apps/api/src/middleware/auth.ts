import type { ModelUser } from 'db'
import type { MiddlewareHandler } from 'hono'
import { EnumUserStatus } from '@neziva/enums'
import { Exception } from '@neziva/tools/exception'
import { db } from 'db'
import { ENV } from '../env'
import { isTokenStored, jwtExtractSub, jwtExtractToken } from '../utils'

export interface Auth {
  Variables: {
    user: ModelUser
  }
}

export function auth(): MiddlewareHandler<Auth> {
  return async function (ctx, next) {
    const token = jwtExtractToken(ctx)
    if (!token) {
      throw new Exception.ForbiddenException('Token not found')
    }

    // 检查 token 是否在 cache 中（白名单验证）
    const isStored = await isTokenStored(token)
    if (!isStored) {
      throw new Exception.ForbiddenException('Token not found or expired')
    }

    const userId = await jwtExtractSub({ secret: ENV.JWT_SECRET, ctx })
    if (!userId) {
      throw new Exception.ForbiddenException('User id not found')
    }

    const user = await db.user.findOptional(userId)
    if (!user) {
      throw new Exception.ForbiddenException('User not found')
    }
    if (user.emailVerifiedAt === null) {
      throw new Exception.ForbiddenException('Email not verified')
    }

    if (user.status === EnumUserStatus.Blocked) {
      throw new Exception.ForbiddenException('User is blocked')
    }

    ctx.set('user', user)

    await next()
  }
}
