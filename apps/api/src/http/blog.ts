import type { ResBlogPostList, ResPagination } from '@neziva/interfaces'
import type { HonoResponse } from '../types'
import { Exception } from '@neziva/tools/exception'
import { vBlogPostsQuery, vBlogRelated, vBlogSearch, vIds } from '@neziva/validations'
import { dr, ds } from 'db'
import { Hono } from 'hono'
import { ip } from '../middleware'
import { pagination, validate } from '../utils'

export const blogRoute = new Hono()
  .basePath('/blog')

  /** 获取博客文章列表 */
  .get('/posts', pagination(), validate('query', vBlogPostsQuery), async (c): Promise<HonoResponse<{ data: ResBlogPostList[], pagination: ResPagination }>> => {
    const { where } = c.get('page')
    const { category, tag, featured } = c.req.valid('query')

    const { data, total } = await ds.blogPost.getList({
      category,
      tag,
      featured,
      limit: where.limit,
      offset: where.offset,
    })

    return c.json({
      data,
      pagination: {
        total,
        limit: where.limit,
        offset: where.offset,
      },
    })
  })

  /** 获取博客文章详情 */
  .get('/posts/:id', ip(), validate('param', vIds('id')), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')
    const ipAddress = c.get('ipAddress')

    const post = await ds.blogPost.getById(id)

    if (!post) {
      throw new Exception.NotFoundException('Blog post not found')
    }

    // 记录浏览量（基于 IP 去重）
    await ds.blogPost.recordView(id, ipAddress)

    return c.json({
      data: post,
    })
  })

  /** 搜索博客文章 */
  .get('/search', pagination(), validate('query', vBlogSearch), async (c): Promise<HonoResponse<{ data: ResBlogPostList[], query?: string, pagination: ResPagination }>> => {
    const { where } = c.get('page')
    const { keyword } = c.req.valid('query')

    const query = dr.blogPost.selectForList({ keyword })

    const total = await query.count()
    const data = await query
      .order({ publishedAt: 'DESC' })
      .limit(where.limit)
      .offset(where.offset)

    return c.json({
      data,
      query: keyword,
      pagination: {
        total,
        limit: where.limit,
        offset: where.offset,
      },
    })
  })

  /** 获取相关文章 */
  .get('/related/:id', validate('param', vIds('id')), validate('query', vBlogRelated), async (c): Promise<HonoResponse<{ data: any[] }>> => {
    const { id } = c.req.valid('param')
    const { limit } = c.req.valid('query')

    const post = await dr.blogPost.selectForDefault().where({ id }).take()

    const related = await ds.blogPost.getRelated({
      id,
      category: post.category,
      tags: Array.isArray(post.tags) ? post.tags : [],
      limit,
    })

    return c.json({
      data: related,
    })
  })
