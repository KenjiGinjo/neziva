import type { HonoResponse } from '../../types'
import { EnumBlogPostStatus } from '@neziva/enums'
import { Exception } from '@neziva/tools/exception'
import { vBlogAdminPostsQuery, vBlogPostId, vBlogPublish, vBlogFeature, vBlogCreate, vBlogUpdate } from '@neziva/validations'
import { ds } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination, validate } from '../../utils'

export const blog = new Hono()
  .basePath('/api/admin/blog')

  /** 创建博客文章 */
  .post('/posts', authAd(), validate('json', vBlogCreate), async (c): Promise<HonoResponse<{ data: any }>> => {
    const dto = c.req.valid('json')

    try {
      const post = await ds.blogPost.create({
        title: dto.title,
        slug: dto.slug,
        content: dto.content,
        excerpt: dto.excerpt,
        category: dto.category,
        tags: dto.tags,
        author: dto.author,
        readTime: dto.readTime,
        featured: dto.featured,
        status: dto.status ? dto.status as EnumBlogPostStatus : undefined,
        coverImage: dto.coverImage,
        seoTitle: dto.seoTitle,
        seoDesc: dto.seoDesc,
      })

      return c.json({
        data: post,
      })
    }
    catch (error: any) {
      if (error.message === 'Slug already exists') {
        throw new Exception.BadRequestException('Slug already exists')
      }
      throw error
    }
  })

  /** 更新博客文章 */
  .put('/posts/:id', authAd(), validate('param', vBlogPostId), validate('json', vBlogUpdate), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')
    const dto = c.req.valid('json')

    try {
      const updated = await ds.blogPost.update(id, {
        title: dto.title,
        slug: dto.slug,
        content: dto.content,
        excerpt: dto.excerpt,
        category: dto.category,
        tags: dto.tags,
        author: dto.author,
        readTime: dto.readTime,
        featured: dto.featured,
        status: dto.status ? dto.status as EnumBlogPostStatus : undefined,
        coverImage: dto.coverImage,
        seoTitle: dto.seoTitle,
        seoDesc: dto.seoDesc,
      })

      return c.json({
        data: updated,
      })
    }
    catch (error: any) {
      if (error.message === 'Blog post not found') {
        throw new Exception.NotFoundException('Blog post not found')
      }
      if (error.message === 'Slug already exists') {
        throw new Exception.BadRequestException('Slug already exists')
      }
      throw error
    }
  })

  /** 获取博客文章列表（管理后台） */
  .get('/posts', authAd(), pagination(), validate('query', vBlogAdminPostsQuery), async (c): Promise<HonoResponse<{ data: any[], pagination: any }>> => {
    const { where } = c.get('page')
    const { status, category, tag, search } = c.req.valid('query')

    const { data, total } = await ds.blogPost.getListForAdmin({
      status: status ? Number(status) as EnumBlogPostStatus : undefined,
      category,
      tag,
      search,
      limit: where.limit,
      offset: where.offset,
    })

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

    const post = await ds.blogPost.getByIdForAdmin(id)

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

    const post = await ds.blogPost.getByIdForAdmin(id)

    if (!post) {
      throw new Exception.NotFoundException('Blog post not found')
    }

    await ds.blogPost.delete(id)

    return c.json({
      success: true,
    })
  })

  /** 发布/取消发布博客文章 */
  .put('/posts/:id/publish', authAd(), validate('param', vBlogPostId), validate('json', vBlogPublish), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')
    const { status } = c.req.valid('json')

    try {
      const updated = await ds.blogPost.publish(id, Number(status) as EnumBlogPostStatus)

      return c.json({
        data: updated,
      })
    }
    catch (error: any) {
      if (error.message === 'Blog post not found') {
        throw new Exception.NotFoundException('Blog post not found')
      }
      throw error
    }
  })

  /** 设置/取消精选 */
  .put('/posts/:id/feature', authAd(), validate('param', vBlogPostId), validate('json', vBlogFeature), async (c): Promise<HonoResponse<{ data: any }>> => {
    const { id } = c.req.valid('param')
    const { featured } = c.req.valid('json')

    try {
      const updated = await ds.blogPost.setFeatured(id, Boolean(featured))

      return c.json({
        data: updated,
      })
    }
    catch (error: any) {
      if (error.message === 'Blog post not found') {
        throw new Exception.NotFoundException('Blog post not found')
      }
      throw error
    }
  })
