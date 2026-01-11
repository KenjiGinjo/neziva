import type { HonoResponse } from '../types'
import { Exception } from '@neziva/tools/exception'
import { db } from 'db'
import { Hono } from 'hono'
import { pagination } from '../utils'

export const blogRoute = new Hono()
  .basePath('/api/blog')

  /** 获取博客文章列表 */
  .get('/posts', pagination(), async (c): Promise<HonoResponse<{ data: any[], pagination: any }>> => {
    const { where } = c.get('page')
    const category = c.req.query('category')
    const tag = c.req.query('tag')
    const featured = c.req.query('featured')
    const status = c.req.query('status') || '1' // 默认只返回已发布的

    let query = db.blogPost.where({ status: Number(status) })

    if (category) {
      query = query.where({ category })
    }

    if (tag) {
      // 查询 JSON 数组中包含指定标签的文章
      query = query.where(q => q.sql`${q.tags}::jsonb @> ${JSON.stringify([tag])}::jsonb`)
    }

    if (featured !== undefined) {
      query = query.where({ featured: featured === 'true' })
    }

    const [items, total] = await Promise.all([
      query
        .order({ publishedAt: 'DESC', createdAt: 'DESC' })
        .limit(where.limit)
        .offset(where.offset),
      query.count(),
    ])

    return c.json({
      data: items,
      pagination: {
        page: c.get('page').query.page,
        limit: c.get('page').query.pageSize,
        total,
        totalPages: Math.ceil(total / where.limit),
      },
    })
  })

  /** 获取博客文章详情 */
  .get('/posts/:id', async (c): Promise<HonoResponse<{ data: any }>> => {
    const id = c.req.param('id')

    const post = await db.blogPost.where({ id }).takeOptional()

    if (!post) {
      throw new Exception.NotFoundException('Blog post not found')
    }

    // 增加浏览量
    await db.blogPost.where({ id }).increment({ views: 1 })

    return c.json({
      data: post,
    })
  })

  /** 搜索博客文章 */
  .get('/search', pagination(), async (c): Promise<HonoResponse<{ data: any[], query: string, pagination: any }>> => {
    const { where } = c.get('page')
    const keyword = c.req.query('q')

    if (!keyword) {
      throw new Exception.BadRequestException('Search keyword is required')
    }

    const query = db.blogPost
      .where({ status: 1 }) // 只搜索已发布的文章
      .where(q => q.or([
        { title: { ilike: `%${keyword}%` } },
        { content: { ilike: `%${keyword}%` } },
        { excerpt: { ilike: `%${keyword}%` } },
      ]))

    const [items, total] = await Promise.all([
      query
        .order({ publishedAt: 'DESC' })
        .limit(where.limit)
        .offset(where.offset),
      query.count(),
    ])

    return c.json({
      data: items,
      query: keyword,
      pagination: {
        page: c.get('page').query.page,
        limit: c.get('page').query.pageSize,
        total,
        totalPages: Math.ceil(total / where.limit),
      },
    })
  })

  /** 获取相关文章 */
  .get('/related/:id', async (c): Promise<HonoResponse<{ data: any[] }>> => {
    const id = c.req.param('id')
    const limit = Number(c.req.query('limit')) || 5

    const post = await db.blogPost.where({ id }).takeOptional()

    if (!post) {
      throw new Exception.NotFoundException('Blog post not found')
    }

    const related = await db.blogPost
      .where({
        status: 1, // 只返回已发布的
        id: { not: id }, // 排除当前文章
      })
      .where(q => q.or([
        { category: post.category },
        q.sql`${q.tags}::jsonb ?| ${JSON.stringify(post.tags)}`, // 有共同标签
      ]))
      .order({ publishedAt: 'DESC' })
      .limit(limit)

    return c.json({
      data: related,
    })
  })
