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
}
