import type { MiddlewareHandler } from 'hono'

/**
 * page: 当前页码
 * pageSize: 每页条数
 * pageSkip: 跳过条数(不是跳过多少页, 而是跳过多少条)
 */
export interface Pagination {
  Variables: {
    page: {
      query: { page: number, pageSize: number, pageSkip: number }
      where: { offset: number, limit: number }
    }
  }
}

interface PaginationOptions {
  page?: {
    default?: number
    min?: number
  }
  pageSize?: {
    default?: number
    min?: number
    max?: number
  }
  pageSkip?: {
    default?: number
  }
}

export function pagination(options?: PaginationOptions): MiddlewareHandler<Pagination> {
  const PAGE_DEFAULT = options?.page?.default || 1 // 页码默认值为1 (可以被query参数覆盖)
  const PAGE_MIN = options?.page?.min || 1 // 页码最小值为1

  const PAGE_SIZE_DEFAULT = options?.pageSize?.default || 10 // 每页条数默认值为10 (可以被query参数覆盖)
  const PAGE_SIZE_MIN = options?.pageSize?.min || 1 // 每页条数最小值为1
  const PAGE_SIZE_MAX = options?.pageSize?.max || 100 // 每页条数最大值为100

  const PAGE_SKIP_DEFAULT = options?.pageSkip?.default || 0 // 跳过条数默认值为0 (可以被query参数覆盖)

  return async function (ctx, next) {
    let page = Number(ctx.req.query('page')) || PAGE_DEFAULT
    if (page < PAGE_MIN) {
      page = PAGE_MIN
    }

    let pageSize = Number(ctx.req.query('pageSize')) || PAGE_SIZE_DEFAULT
    if (pageSize < PAGE_SIZE_MIN) {
      pageSize = PAGE_SIZE_MIN
    }
    else if (pageSize > PAGE_SIZE_MAX) {
      pageSize = PAGE_SIZE_MAX
    }

    const pageSkip = Number(ctx.req.query('pageSkip')) || PAGE_SKIP_DEFAULT
    const offset = pageSkip + (page - 1) * pageSize

    ctx.set('page', {
      query: { page, pageSize, pageSkip },
      where: { offset, limit: pageSize },
    })

    await next()
  }
}
