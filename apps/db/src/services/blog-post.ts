import { EnumBlogPostStatus } from '@neziva/enums'
import { dr } from '../repos'
import { db } from '../tables'

export const blogPost = {
  /**
   * 获取文章列表
   */
  getList: async (options: {
    category?: string
    tag?: string
    featured?: boolean
    limit: number
    offset: number
  }) => {
    const { category, tag, featured, limit, offset } = options

    const query = dr.blogPost.selectForList({
      category,
      tag,
      featured,
      status: EnumBlogPostStatus.Published,
    })

    const total = await query.count()
    const data = await query
      .order({ publishedAt: 'DESC', createdAt: 'DESC' })
      .limit(limit)
      .offset(offset)

    return { data, total }
  },

  /**
   * 获取文章详情
   */
  getById: async (id: string) => {
    return await dr.blogPost.selectForDefault()
      .where({ id, status: EnumBlogPostStatus.Published })
      .takeOptional()
  },

  /**
   * 搜索文章
   */
  search: async (options: {
    keyword?: string
    limit: number
    offset: number
  }) => {
    const { keyword, limit, offset } = options

    const query = dr.blogPost.searchList({ keyword })

    const total = await query.count()
    const data = await query
      .order({ publishedAt: 'DESC' })
      .limit(limit)
      .offset(offset)

    return { data, total }
  },

  /**
   * 获取相关文章
   */
  getRelated: async (options: {
    id: string
    category: string
    tags: string[]
    limit: number
  }) => {
    const { id, category, tags, limit } = options

    const defaultWhere = {
      status: EnumBlogPostStatus.Published,
      id: { not: id },
    }
    const orTags = tags.map(tag => ({ ...defaultWhere, tags: { has: tag } }))
    const orConditions = [
      { ...defaultWhere, category },
      ...orTags,
    ]
    const related = await dr.blogPost.selectForDefault()
      .orWhere(...orConditions)
      .order({ publishedAt: 'DESC' })
      .limit(limit)
      .all()

    return related
  },

  /**
   * 记录文章浏览量（基于 IP 去重）
   */
  recordView: async (postId: string, ipAddress?: string, expireHours: number = 24): Promise<boolean> => {
    // 如果没有 IP 地址，直接增加浏览量（不进行去重）
    if (!ipAddress) {
      await db.blogPost.where({ id: postId }).increment({ views: 1 })
      return true
    }

    // 生成缓存 key: blog_post_view:{postId}:{ipAddress}
    const cacheKey = `blog_post_view:${postId}:${ipAddress}`
    const expiresAt = new Date(Date.now() + expireHours * 60 * 60 * 1000)

    // 检查是否已访问过
    const existing = await db.cache.findOptional(cacheKey)

    if (existing) {
      // 已访问过，不重复统计
      return false
    }

    // 使用事务记录访问并增加浏览量
    await db.$transaction(async () => {
      await db.cache.create({
        key: cacheKey,
        value: '1',
        expiresAt,
      })
      await db.blogPost.where({ id: postId }).increment({ views: 1 })
    })

    return true
  },

  /**
   * 获取文章列表（管理后台）
   */
  getListForAdmin: async (options: {
    status?: EnumBlogPostStatus
    category?: string
    tag?: string
    search?: string
    limit: number
    offset: number
  }) => {
    const { status, category, tag, search, limit, offset } = options

    let query = db.blogPost

    if (status !== undefined) {
      query = query.where({ status })
    }

    if (category) {
      query = query.where({ category })
    }

    if (tag) {
      query = query.where({ tags: { has: tag } })
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
      .limit(limit)
      .offset(offset)

    return { data, total }
  },

  /**
   * 获取文章详情（管理后台）
   */
  getByIdForAdmin: async (id: string) => {
    return await db.blogPost.where({ id }).takeOptional()
  },

  /**
   * 创建文章
   */
  create: async (data: {
    title: string
    slug: string
    content: string
    excerpt?: string
    category: string
    tags?: string[]
    author: string
    readTime?: number
    featured?: boolean
    status?: EnumBlogPostStatus
    coverImage?: string
    seoTitle?: string
    seoDesc?: string
  }) => {
    // 检查 slug 是否已存在
    const existing = await db.blogPost.where({ slug: data.slug }).takeOptional()
    if (existing) {
      throw new Error('Slug already exists')
    }

    return await db.blogPost.create({
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      category: data.category,
      tags: data.tags || [],
      author: data.author,
      readTime: data.readTime || 0,
      featured: data.featured || false,
      status: data.status || EnumBlogPostStatus.Draft,
      coverImage: data.coverImage,
      seoTitle: data.seoTitle,
      seoDesc: data.seoDesc,
    })
  },

  /**
   * 更新文章
   */
  update: async (id: string, data: {
    title?: string
    slug?: string
    content?: string
    excerpt?: string
    category?: string
    tags?: string[]
    author?: string
    readTime?: number
    featured?: boolean
    status?: EnumBlogPostStatus
    coverImage?: string
    seoTitle?: string
    seoDesc?: string
  }) => {
    const post = await db.blogPost.where({ id }).takeOptional()

    if (!post) {
      throw new Error('Blog post not found')
    }

    // 如果更新 slug，检查是否已存在
    if (data.slug && data.slug !== post.slug) {
      const existing = await db.blogPost.where({ slug: data.slug }).takeOptional()
      if (existing) {
        throw new Error('Slug already exists')
      }
    }

    await db.blogPost.where({ id }).update(data)

    return await db.blogPost.where({ id }).take()
  },

  /**
   * 删除文章
   */
  delete: async (id: string) => {
    await db.blogPost.where({ id }).delete()
  },

  /**
   * 发布/取消发布文章
   */
  publish: async (id: string, status: EnumBlogPostStatus) => {
    const post = await db.blogPost.where({ id }).takeOptional()

    if (!post) {
      throw new Error('Blog post not found')
    }

    const updateData: any = { status }

    if (status === EnumBlogPostStatus.Published && !post.publishedAt) {
      updateData.publishedAt = new Date()
    }

    await db.blogPost.where({ id }).update(updateData)

    return await db.blogPost.where({ id }).take()
  },

  /**
   * 设置/取消精选
   */
  setFeatured: async (id: string, featured: boolean) => {
    const post = await db.blogPost.where({ id }).takeOptional()

    if (!post) {
      throw new Error('Blog post not found')
    }

    await db.blogPost.where({ id }).update({ featured })

    return await db.blogPost.where({ id }).take()
  },
}
