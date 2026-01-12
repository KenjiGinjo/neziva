import type { HonoResponse } from '../../types'
import { EnumBlogPostStatus } from '@neziva/enums'
import { Exception } from '@neziva/tools/exception'
import { vBlogAdminPostsQuery, vBlogPostId, vBlogPublish, vBlogFeature } from '@neziva/validations'
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
      status: dto.status || EnumBlogPostStatus.Draft,
      coverImage: dto.coverImage,
      seoTitle: dto.seoTitle,
      seoDesc: dto.seoDesc,
    })

    return c.json({
      data: post,
    })
  })

  /** 更新博客文章 */
  .put('/posts/:id', authAd(), validate('param', vBlogPostId), validate('json', vUpdateBlogPost), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')
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

    await db.blogPost.where({ id }).update(dto)

    // 重新查询获取更新后的数据
    const updated = await db.blogPost.where({ id }).take()

    return c.json({
      data: updated,
    })
  })

  /** 获取博客文章列表（管理后台） */
  .get('/posts', authAd(), pagination(), validate('query', vBlogAdminPostsQuery), async (c): Promise<HonoResponse<{ data: any[], pagination: any }>> => {
    const { where } = c.get('page')
    const { status, category, tag, search } = c.req.valid('query')

    let query = db.blogPost

    if (status) {
      query = query.where({ status: Number(status) as EnumBlogPostStatus })
    }

    if (category) {
      query = query.where({ category })
    }

    if (tag) {
      // 查询 JSON 数组中包含指定标签的文章
      query = query.where({ tags: { jsonSupersetOf: [tag] } })
    }

    if (search) {
      query = query.where(q => q.or([
        { title: { ilike: `%${search}%` } },
        { content: { ilike: `%${search}%` } },
        { excerpt: { ilike: `%${search}%` } },
      ]))
    }

    const total = await query.count()
    const data = await query
      .order({ createdAt: 'DESC' })
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

  /** 获取博客文章详情（管理后台） */
  .get('/posts/:id', authAd(), validate('param', vBlogPostId), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')

    const post = await db.blogPost.where({ id }).takeOptional()

    if (!post) {
      throw new Exception.NotFoundException('Blog post not found')
    }

    return c.json({
      data: post,
    })
  })

  /** 删除博客文章 */
  .delete('/posts/:id', authAd(), validate('param', vBlogPostId), async (c): Promise<HonoResponse<{ success: boolean }>> => {
    const { id } = c.req.valid('param')

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
  .put('/posts/:id/publish', authAd(), validate('param', vBlogPostId), validate('json', vBlogPublish), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')
    const { status } = c.req.valid('json')

    const post = await db.blogPost.where({ id }).takeOptional()

    if (!post) {
      throw new Exception.NotFoundException('Blog post not found')
    }

    const updateData: any = { status: Number(status) as EnumBlogPostStatus }

    if (Number(status) === EnumBlogPostStatus.Published && !post.publishedAt) {
      updateData.publishedAt = new Date()
    }

    await db.blogPost.where({ id }).update(updateData)

    // 重新查询获取更新后的数据
    const updated = await db.blogPost.where({ id }).take()

    return c.json({
      data: updated,
    })
  })

  /** 设置/取消精选 */
  .put('/posts/:id/feature', authAd(), validate('param', vBlogPostId), validate('json', vBlogFeature), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')
    const { featured } = c.req.valid('json')

    const post = await db.blogPost.where({ id }).takeOptional()

    if (!post) {
      throw new Exception.NotFoundException('Blog post not found')
    }

    await db.blogPost.where({ id }).update({ featured: Boolean(featured) })

    // 重新查询获取更新后的数据
    const updated = await db.blogPost.where({ id }).take()

    return c.json({
      data: updated,
    })
  })
