/**
 * Orchid ORM 常用模式示例
 *
 * 这个文件包含项目中常用的 Orchid ORM 查询模式
 * 供 AI 助手参考，了解项目的编码风格和最佳实践
 */

import { db } from '..'

// ==================== 基础查询 ====================

/**
 * 获取单条记录（可能不存在）
 */
export async function getPostById(id: string) {
  return await db.blogPost.where({ id }).takeOptional()
}

/**
 * 获取单条记录（必须存在，否则抛出错误）
 */
export async function getPostByIdRequired(id: string) {
  return await db.blogPost.where({ id }).take()
}

/**
 * 获取多条记录
 */
export async function getPublishedPosts() {
  return await db.blogPost.where({ status: 1 }).take()
}

/**
 * 计数
 */
export async function countPublishedPosts() {
  return await db.blogPost.where({ status: 1 }).count()
}

// ==================== 条件查询 ====================

/**
 * 多条件查询
 */
export async function getPostsByCategoryAndStatus(category: string, status: number) {
  return await db.blogPost
    .where({ category, status })
    .take()
}

/**
 * JSON 数组包含查询
 */
export async function getPostsByTag(tag: string) {
  return await db.blogPost
    .where({ tags: { jsonSupersetOf: [tag] } })
    .take()
}

/**
 * OR 条件查询
 */
export async function searchPosts(keyword: string) {
  return await db.blogPost
    .where({ status: 1 })
    .where(q => q.or([
      { title: { ilike: `%${keyword}%` } },
      { content: { ilike: `%${keyword}%` } },
      { excerpt: { ilike: `%${keyword}%` } },
    ]))
    .take()
}

/**
 * 排除条件
 */
export async function getRelatedPosts(postId: string, category: string) {
  return await db.blogPost
    .where({
      status: 1,
      id: { not: postId },
      category,
    })
    .take()
}

// ==================== 排序和分页 ====================

/**
 * 分页查询
 */
export async function getPostsPaginated(page: number, pageSize: number) {
  const offset = (page - 1) * pageSize

  const [items, total] = await Promise.all([
    db.blogPost
      .where({ status: 1 })
      .order({ publishedAt: 'DESC', createdAt: 'DESC' })
      .limit(pageSize)
      .offset(offset),
    db.blogPost.where({ status: 1 }).count(),
  ])

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

/**
 * 排序查询
 */
export async function getFeaturedPosts(limit: number = 5) {
  return await db.blogPost
    .where({ status: 1, featured: true })
    .order({ publishedAt: 'DESC' })
    .limit(limit)
    .take()
}

// ==================== 更新操作 ====================

/**
 * 更新单条记录
 */
export async function updatePost(id: string, data: { title?: string, content?: string }) {
  return await db.blogPost.where({ id }).update(data)
}

/**
 * 递增
 */
export async function incrementViews(id: string) {
  return db.blogPost.where({ id }).increment({ views: 1 })
}

/**
 * 批量更新
 */
export async function publishPosts(ids: string[]) {
  return await db.blogPost
    .where({ id: { in: ids } })
    .update({ status: 1, publishedAt: new Date() })
}

// ==================== 复杂查询 ====================

/**
 * 动态条件构建
 */
export async function getPostsWithFilters(filters: {
  category?: string
  tag?: string
  featured?: boolean
  status?: number
}) {
  let query = db.blogPost.where({})

  if (filters.category) {
    query = query.where({ category: filters.category })
  }

  if (filters.tag) {
    query = query.where({ tags: { jsonSupersetOf: [filters.tag] } })
  }

  if (filters.featured !== undefined) {
    query = query.where({ featured: filters.featured })
  }

  if (filters.status !== undefined) {
    query = query.where({ status: filters.status })
  }

  return await query.order({ publishedAt: 'DESC' }).take()
}

/**
 * 复杂 OR 条件
 */
export async function getRelatedPostsByTags(postId: string, tags: string[]) {
  const conditions: any[] = []

  if (tags.length > 0) {
    conditions.push(...tags.map(tag => ({ tags: { jsonSupersetOf: [tag] } })))
  }

  if (conditions.length === 0) {
    return []
  }

  return await db.blogPost
    .where({
      status: 1,
      id: { not: postId },
    })
    .where(q => q.or(conditions))
    .order({ publishedAt: 'DESC' })
    .limit(5)
    .take()
}

// ==================== 事务示例 ====================

/**
 * 事务操作（如果项目中有使用）
 * 注意：需要检查项目中是否配置了事务支持
 */
export async function createPostWithTags(data: {
  title: string
  content: string
  tags: string[]
}) {
  // 示例：创建文章并更新统计
  // 实际使用时需要根据项目的事务配置来调整
  const post = await db.blogPost.create({
    ...data,
    status: 1,
    publishedAt: new Date(),
  })

  // 可以在这里执行其他相关操作
  // 例如更新标签统计等

  return post
}

// ==================== 性能优化 ====================

/**
 * 并行查询优化
 */
export async function getPostWithStats(id: string) {
  const [post, relatedPosts, totalViews] = await Promise.all([
    db.blogPost.where({ id }).takeOptional(),
    db.blogPost
      .where({ status: 1, id: { not: id } })
      .order({ views: 'DESC' })
      .limit(5)
      .take(),
    db.blogPost.where({ status: 1 }).sum('views'),
  ])

  return {
    post,
    relatedPosts,
    totalViews,
  }
}
