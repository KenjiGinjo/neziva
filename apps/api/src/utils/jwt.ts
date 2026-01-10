import type { Context } from 'hono'
import { createHash } from 'node:crypto'
import { db } from 'db'
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
  const cache = await db.cache.findOptional(key)

  if (!cache) {
    return false
  }

  // 检查是否过期
  if (cache.expiresAt) {
    // expiresAt 统一转换为 Date 进行比较
    const expiresAtDate = new Date(cache.expiresAt as unknown as string | number | Date)
    if (new Date() > expiresAtDate) {
      // 如果过期，删除记录
      await db.cache.where({ key }).delete()
      return false
    }
  }

  return true
}

export async function generateToken({ secret, sub, exp, isAdmin = false }: { secret: string, sub: string, exp: number, isAdmin?: boolean }): Promise<string> {
  // 生成 JWT token
  const token = await jwtSign({ secret, sub, exp })

  // 计算过期时间（与 token 的过期时间一致）
  const now = new Date()
  const expirationDate = new Date(now.getTime() + exp * 1000)

  // 存储到 cache 表
  const key = getTokenCacheKey(token, isAdmin)

  // 检查是否已存在
  const existing = await db.cache.findOptional(key)
  if (existing) {
    // 如果已存在，更新过期时间
    await db.cache.where({ key }).update({
      value: '1', // 值可以是任意值，我们只关心 key 是否存在
      expiresAt: expirationDate,
    })
  }
  else {
    // 如果不存在，创建新记录
    await db.cache.create({
      key,
      value: '1',
      expiresAt: expirationDate,
    })
  }

  return token
}

export async function removeToken(token: string, isAdmin = false): Promise<void> {
  const key = getTokenCacheKey(token, isAdmin)
  await db.cache.where({ key }).delete()
}
