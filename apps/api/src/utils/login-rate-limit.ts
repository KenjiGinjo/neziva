import type { Context } from 'hono'
import { Exception } from '@neziva/tools/exception'
import { getConnInfo } from 'hono/bun'

const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5

const attempts = new Map<string, { count: number, resetAt: number }>()

export function getClientIp(ctx: Context): string {
  const raw = ctx.req.header('x-forwarded-for') || ctx.req.header('x-real-ip') || ''
  const ip = (raw.split(',')[0] ?? '').trim()
  if (ip)
    return ip

  try {
    return getConnInfo(ctx).remote.address || 'unknown'
  }
  catch {
    return 'unknown'
  }
}

function makeKey(ip: string, username: string) {
  return `${ip}:${username.trim().toLowerCase()}`
}

function prune(key: string, now: number) {
  const rec = attempts.get(key)
  if (rec && now > rec.resetAt)
    attempts.delete(key)
}

export function assertLoginAllowed(ip: string, username: string) {
  const key = makeKey(ip, username)
  const now = Date.now()
  prune(key, now)
  const rec = attempts.get(key)
  if (rec && rec.count >= MAX_ATTEMPTS)
    throw new Exception.BadRequestException('尝试次数过多，请稍后再试')
}

export function recordLoginFailure(ip: string, username: string) {
  const key = makeKey(ip, username)
  const now = Date.now()
  prune(key, now)
  const rec = attempts.get(key)
  if (!rec) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return
  }
  rec.count += 1
}

export function clearLoginFailures(ip: string, username: string) {
  attempts.delete(makeKey(ip, username))
}
