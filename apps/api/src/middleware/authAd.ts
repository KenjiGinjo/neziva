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
      throw new Exception.UnauthorizedException('请先登录')
    }

    const isStored = await isTokenStored(token, true)
    if (!isStored) {
      throw new Exception.UnauthorizedException('登录已过期，请重新登录')
    }

    const authId = await jwtExtractSub({ secret: ENV.JWT_SECRET_ADMIN, ctx })
    if (!authId) {
      throw new Exception.UnauthorizedException('登录已过期，请重新登录')
    }

    const user = await db.admin.findOptional(authId)
    if (!user || user.status === EnumAdminStatus.Blocked) {
      throw new Exception.ForbiddenException('账号已被禁用')
    }

    ctx.set('authId', authId)

    await next()
  }
}
