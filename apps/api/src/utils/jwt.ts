import type { Context } from 'hono'
import { createHash } from 'node:crypto'
import { Cache } from 'db'
import { sign, verify } from 'hono/jwt'

const ALG = 'HS256'

export async function jwtSign({ secret, sub, exp }: { secret: string, sub: string, exp: number }): Promise<string> {
  const now = new Date()
  const getTime = (date: Date) => Math.floor(date.getTime() / 1000)
  return await sign(
    { sub, exp: getTime(new Date(now.getTime() + exp * 1000)), nbf: getTime(now), iat: getTime(now) },
    secret,
    ALG,
  )
}

export async function jwtVerify({ secret, token }: { secret: string, token: string }): Promise<any> {
  return await verify(token, secret, ALG)
}

export function jwtResponse({ token }: { token: string }): { token: string, type: string } {
  return {
    token,
    type: 'Bearer',
  }
}

export function jwtExtractToken(ctx: Context): string | null {
  const authorization = ctx.req.header('Authorization') || ''
  const token = authorization.replace(/^Bearer /i, '').trim()
  return token || null
}

export async function jwtExtractSub({ secret, ctx }: { secret: string, ctx: Context }): Promise<false | string> {
  try {
    const token = jwtExtractToken(ctx)
    if (!token) {
      return false
    }

    const payload = await jwtVerify({ secret, token })
    return payload.sub
  }
  catch {
    return false
  }
}

function getTokenCacheKey(token: string, isAdmin = false): string {
  // 使用 token 的 hash 作为 key，避免 key 过长
  const hash = createHash('sha256').update(token).digest('hex')
  const prefix = isAdmin ? 'admin_token' : 'token'
  return `${prefix}:${hash}`
}

export async function isTokenStored(token: string, isAdmin = false): Promise<boolean> {
  const key = getTokenCacheKey(token, isAdmin)
  const cached = await Cache.get({ key })

  // BentoCache 会自动处理过期，如果返回 undefined 说明不存在或已过期
  return cached !== undefined
}

export async function generateToken({ secret, sub, exp, isAdmin = false }: { secret: string, sub: string, exp: number, isAdmin?: boolean }): Promise<string> {
  // 生成 JWT token
  const token = await jwtSign({ secret, sub, exp })

  // 计算 TTL（毫秒）
  const ttl = exp * 1000

  // 存储到 cache
  const key = getTokenCacheKey(token, isAdmin)

  // 使用 BentoCache 存储，值可以是任意值，我们只关心 key 是否存在
  await Cache.set({
    key,
    value: 1,
    ttl,
  })

  return token
}

export async function removeToken(token: string, isAdmin = false): Promise<void> {
  const key = getTokenCacheKey(token, isAdmin)
  await Cache.delete({ key })
}
