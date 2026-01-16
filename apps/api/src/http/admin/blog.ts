import type { ResAdminBlogPostList, ResPagination } from '@neziva/interfaces'
import type { HonoResponse } from '../../types'
import { EnumBlogPostStatus } from '@neziva/enums'
import { vBlogAdminPostsQuery, vBlogCreate, vBlogFeature, vBlogPublish, vBlogUpdate, vIds } from '@neziva/validations'
import { db, dr, ds } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination, validate } from '../../utils'

export const blog = new Hono()
  .basePath('/blog')

  /** 创建博客文章 */
  .post('/posts', authAd(), validate('json', vBlogCreate), async (c): Promise<HonoResponse<{ data: { id: string } }>> => {
    const dto = c.req.valid('json')

    await ds.blogPost.checkSlug(dto.slug)

    const post = await db.blogPost.create(dto)

    return c.json({
      data: { id: post.id },
    })
  })

  /** 更新博客文章 */
  .put('/posts/:id', authAd(), validate('param', vIds('id')), validate('json', vBlogUpdate), async (c) => {
    const { id } = c.req.valid('param')
    const dto = c.req.valid('json')

    const post = await db.blogPost.where({ id }).take()

    // 如果更新 slug，检查是否已存在
    if (dto.slug && dto.slug !== post.slug) {
      await ds.blogPost.checkSlug(dto.slug)
    }

    await db.blogPost.where({ id }).update(dto)

    return c.body(null, 204)
  })

  /** 获取博客文章列表（管理后台） */
  .get('/posts', authAd(), pagination(), validate('query', vBlogAdminPostsQuery), async (c): Promise<HonoResponse<{ data: ResAdminBlogPostList[], pagi: ResPagination }>> => {
    const { where } = c.get('page')
    const { status, category, tag, search } = c.req.valid('query')

    const query = dr.blogPost.searchList({
      keyword: search,
      status,
      category,
      tag,
    })

    const total = await query.count()
    const data = await query
      .order({ createdAt: 'DESC' })
      .limit(where.limit)
      .offset(where.offset)

    return c.json({
      data,
      pagi: {
        total,
        ...where,
      },
    })
  })

  /** 获取博客文章详情（管理后台） */
  .get('/posts/:id', authAd(), validate('param', vIds('id')), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')

    const data = await db.blogPost.where({ id }).take()

    return c.json({ data })
  })

  /** 删除博客文章 */
  .delete('/posts/:id', authAd(), validate('param', vIds('id')), async (c) => {
    const { id } = c.req.valid('param')

    await db.blogPost.where({ id }).delete()

    return c.body(null, 204)
  })

  /** 发布/取消发布博客文章 */
  .put('/posts/:id/publish', authAd(), validate('param', vIds('id')), validate('json', vBlogPublish), async (c) => {
    const { id } = c.req.valid('param')
    const { status } = c.req.valid('json')

    const post = await db.blogPost.where({ id }).take()

    const updateData: any = { status: Number(status) as EnumBlogPostStatus }

    if (Number(status) === EnumBlogPostStatus.Published && !post.publishedAt) {
      updateData.publishedAt = new Date()
    }

    await db.blogPost.where({ id }).update(updateData)

    return c.body(null, 204)
  })

  /** 设置/取消精选 */
  .put('/posts/:id/feature', authAd(), validate('param', vIds('id')), validate('json', vBlogFeature), async (c) => {
    const { id } = c.req.valid('param')
    const { featured } = c.req.valid('json')

    await db.blogPost.where({ id }).update({ featured: Boolean(featured) })

    return c.body(null, 204)
  })
