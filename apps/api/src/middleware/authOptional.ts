import type { ModelUser } from 'db'
import type { MiddlewareHandler } from 'hono'
import { EnumUserStatus } from '@haole/enums'
import { db } from 'db'
import { ENV } from '../env'
import { isTokenStored, jwtExtractSub, jwtExtractToken } from '../utils'

export interface AuthOptional {
  Variables: {
    user?: ModelUser
  }
}

export function authOptional(): MiddlewareHandler<AuthOptional> {
  return async function (ctx, next) {
    const token = jwtExtractToken(ctx)

    if (token) {
      // 检查 token 是否在 cache 中（白名单验证）
      const isStored = await isTokenStored(token)
      if (isStored) {
        const userId = await jwtExtractSub({ secret: ENV.JWT_SECRET, ctx })

        if (userId) {
          const user = await db.user.findOptional(userId)

          // 如果用户存在、邮箱已验证、且未被封禁，则设置 user
          if (user && user.emailVerifiedAt !== null && user.status !== EnumUserStatus.Blocked) {
            ctx.set('user', user)
          }
        }
      }
    }

    await next()
  }
}
