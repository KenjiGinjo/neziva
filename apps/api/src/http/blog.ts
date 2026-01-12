import type { ResBlogPostList } from '@neziva/interfaces'
import type { HonoResponse } from '../types'
import { EnumBlogPostStatus } from '@neziva/enums'
import { Exception } from '@neziva/tools/exception'
import { vBlogPostId, vBlogPostsQuery, vBlogRelated, vBlogSearch } from '@neziva/validations'
import { db, dr } from 'db'
import { Hono } from 'hono'
import { pagination, validate } from '../utils'

export const blogRoute = new Hono()
  .basePath('/api/blog')

  /** 获取博客文章列表 */
  .get('/posts', pagination(), validate('query', vBlogPostsQuery), async (c): Promise<HonoResponse<{ data: ResBlogPostList[], pagination: any }>> => {
    const { where } = c.get('page')
    const { category, tag, featured } = c.req.valid('query')

    const query = dr.blogPost.selectForList({
      category,
      tag,
      featured: featured !== undefined ? featured === 'true' : undefined,
      status: EnumBlogPostStatus.Published,
    })

    const total = await query.count()
    const data = await query
      .order({ publishedAt: 'DESC', createdAt: 'DESC' })
      .limit(where.limit)
      .offset(where.offset)

    return c.json({
      data,
      pagination: {
        page: c.get('page').query.page,
        limit: c.get('page').query.pageSize,
        total,
        totalPages: Math.ceil(total / where.limit),
      },
    })
  })

  /** 获取博客文章详情 */
  .get('/posts/:id', validate('param', vBlogPostId), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')

    const post = await dr.blogPost.selectForDefault().where({ id, status: EnumBlogPostStatus.Published }).takeOptional()

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
  .get('/search', pagination(), validate('query', vBlogSearch), async (c): Promise<HonoResponse<{ data: ResBlogPostList[], query?: string, pagination: any }>> => {
    const { where } = c.get('page')
    const { keyword } = c.req.valid('query')

    const query = dr.blogPost.searchList({ keyword })

    const total = await query.count()
    const data = await query.order({ publishedAt: 'DESC' })
      .limit(where.limit)
      .offset(where.offset)

    return c.json({
      data,
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
  .get('/related/:id', validate('param', vBlogPostId), validate('query', vBlogRelated), async (c): Promise<HonoResponse<{ data: any[] }>> => {
    const { id } = c.req.valid('param')
    const { limit } = c.req.valid('query')

    const post = await dr.blogPost.selectForDefault().where({ id }).takeOptional()

    if (!post) {
      throw new Exception.NotFoundException('Blog post not found')
    }

    // 构建查询条件
    const orConditions = [
      { category: post.category },
      ...(Array.isArray(post.tags) && post.tags.length > 0
        ? post.tags.map(tag => ({ tags: { jsonSupersetOf: [tag] } }))
        : []),
    ]

    const related = await dr.blogPost.selectForDefault()
      .where({
        status: EnumBlogPostStatus.Published,
        id: { not: id },
      })
      .where(q => q.or(orConditions as any))
      .order({ publishedAt: 'DESC' })
      .limit(limit)
      .all()

    return c.json({
      data: related,
    })
  })
