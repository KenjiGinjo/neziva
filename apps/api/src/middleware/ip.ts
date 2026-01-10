import type { MiddlewareHandler } from 'hono'
import { vIp } from '@haole/validations'
import { getConnInfo } from 'hono/bun'

export interface Ip {
  Variables: {
    ipAddress?: string
    ipLocation?: string
  }
}

export function ip(): MiddlewareHandler<Ip> {
  return async function ip(ctx, next) {
    const req = ctx.req

    let ip
      = req.header('x-forwarded-for')
        || req.header('x-real-ip')
        || req.header('x-client-ip')
        || req.header('x-cluster-client-ip')
        || req.header('forwarded-for')
        || req.header('forwarded')
        || ''
    ip = ip.split(',')[0] ?? '' // x-forwarded-for可能包含多个ip，第一个是实际的客户端ip

    if (!ip) {
      ip = getConnInfo(ctx).remote.address || ''
    }

    const { success } = vIp.safeParse(ip)
    if (success) {
      ctx.set('ipAddress', ip)
    }

    await next()
  }
}
