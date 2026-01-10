import type { MiddlewareHandler } from 'hono'
import { EnumAdminStatus } from '@neziva/enums'
import { Exception } from '@neziva/tools/exception'
import { db } from 'db'
import { ENV } from '../env'
import { isTokenStored, jwtExtractSub, jwtExtractToken } from '../utils'

export interface AuthAd {
  Variables: {
    authId: string
  }
}

export function authAd(): MiddlewareHandler<AuthAd> {
  return async function (ctx, next) {
    const token = jwtExtractToken(ctx)
    if (!token) {
      throw new Exception.ForbiddenException('Token not found')
    }

    // 检查 token 是否在 cache 中（白名单验证，管理员 token）
    const isStored = await isTokenStored(token, true)
    if (!isStored) {
      throw new Exception.ForbiddenException('Token not found or expired')
    }

    const authId = await jwtExtractSub({ secret: ENV.JWT_SECRET_ADMIN, ctx })
    if (!authId) {
      throw new Exception.ForbiddenException('Unauthorized')
    }

    const user = await db.admin.findOptional(authId)
    if (!user || user.status === EnumAdminStatus.Blocked) {
      throw new Exception.ForbiddenException('Unauthorized')
    }

    ctx.set('authId', authId)

    await next()
  }
}
