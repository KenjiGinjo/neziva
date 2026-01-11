import type { HonoResponse } from '../../types'
import { Exception } from '@neziva/tools/exception'
import { db } from 'db'
import { Hono } from 'hono'
import { z } from 'zod'
import { authAd } from '../../middleware/authAd'
import { pagination, validate } from '../../utils'

const vCreateBlogPost = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  author: z.string().min(1),
  readTime: z.number().optional(),
  featured: z.boolean().optional(),
  status: z.number().optional(),
  coverImage: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
})

const vUpdateBlogPost = vCreateBlogPost.partial()

export const blog = new Hono()
  .basePath('/api/admin/blog')

  /** 创建博客文章 */
  .post('/posts', authAd(), validate('json', vCreateBlogPost), async (c): Promise<HonoResponse<{ data: any }>> => {
    const dto = c.req.valid('json')

    // 检查 slug 是否已存在
    const existing = await db.blogPost.where({ slug: dto.slug }).takeOptional()
    if (existing) {
      throw new Exception.BadRequestException('Slug already exists')
    }

    const post = await db.blogPost.create({
      title: dto.title,
      slug: dto.slug,
      content: dto.content,
      excerpt: dto.excerpt,
      category: dto.category,
      tags: dto.tags || [],
      author: dto.author,
      readTime: dto.readTime || 0,
      featured: dto.featured || false,
      status: dto.status || 0, // 0: 草稿
      coverImage: dto.coverImage,
      seoTitle: dto.seoTitle,
      seoDesc: dto.seoDesc,
    })

    return c.json({
      data: post,
    })
  })

  /** 更新博客文章 */
  .put('/posts/:id', authAd(), validate('json', vUpdateBlogPost), async (c): Promise<HonoResponse<{ data: any }>> => {
    const id = c.req.param('id')
    const dto = c.req.valid('json')

    const post = await db.blogPost.where({ id }).takeOptional()

    if (!post) {
      throw new Exception.NotFoundException('Blog post not found')
    }

    // 如果更新 slug，检查是否已存在
    if (dto.slug && dto.slug !== post.slug) {
      const existing = await db.blogPost.where({ slug: dto.slug }).takeOptional()
      if (existing) {
        throw new Exception.BadRequestException('Slug already exists')
      }
    }

    const updated = await db.blogPost.where({ id }).update(dto)

    return c.json({
      data: updated,
    })
  })

  /** 获取博客文章列表（管理后台） */
  .get('/posts', authAd(), pagination(), async (c): Promise<HonoResponse<{ data: any[], pagination: any }>> => {
    const { where } = c.get('page')
    const status = c.req.query('status')
    const category = c.req.query('category')
    const tag = c.req.query('tag')
    const search = c.req.query('search')

    let query = db.blogPost

    if (status) {
      query = query.where({ status: Number(status) })
    }

    if (category) {
      query = query.where({ category })
    }

    if (tag) {
      query = query.where(q => q.sql`${q.tags}::jsonb @> ${JSON.stringify([tag])}::jsonb`)
    }

    if (search) {
      query = query.where(q => q.or([
        { title: { ilike: `%${search}%` } },
        { content: { ilike: `%${search}%` } },
        { excerpt: { ilike: `%${search}%` } },
      ]))
    }

    const [items, total] = await Promise.all([
      query
        .order({ createdAt: 'DESC' })
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

  /** 获取博客文章详情（管理后台） */
  .get('/posts/:id', authAd(), async (c): Promise<HonoResponse<{ data: any }>> => {
    const id = c.req.param('id')

    const post = await db.blogPost.where({ id }).takeOptional()

    if (!post) {
      throw new Exception.NotFoundException('Blog post not found')
    }

    return c.json({
      data: post,
    })
  })

  /** 删除博客文章 */
  .delete('/posts/:id', authAd(), async (c): Promise<HonoResponse<{ success: boolean }>> => {
    const id = c.req.param('id')

    const post = await db.blogPost.where({ id }).takeOptional()

    if (!post) {
      throw new Exception.NotFoundException('Blog post not found')
    }

    await db.blogPost.where({ id }).delete()

    return c.json({
      success: true,
    })
  })

  /** 发布/取消发布博客文章 */
  .put('/posts/:id/publish', authAd(), async (c): Promise<HonoResponse<{ data: any }>> => {
    const id = c.req.param('id')
    const { status } = await c.req.json()

    const post = await db.blogPost.where({ id }).takeOptional()

    if (!post) {
      throw new Exception.NotFoundException('Blog post not found')
    }

    const updateData: any = { status: Number(status) }

    if (Number(status) === 1 && !post.publishedAt) {
      updateData.publishedAt = new Date()
    }

    const updated = await db.blogPost.where({ id }).update(updateData)

    return c.json({
      data: updated,
    })
  })

  /** 设置/取消精选 */
  .put('/posts/:id/feature', authAd(), async (c): Promise<HonoResponse<{ data: any }>> => {
    const id = c.req.param('id')
    const { featured } = await c.req.json()

    const post = await db.blogPost.where({ id }).takeOptional()

    if (!post) {
      throw new Exception.NotFoundException('Blog post not found')
    }

    const updated = await db.blogPost.where({ id }).update({ featured: Boolean(featured) })

    return c.json({
      data: updated,
    })
  })
