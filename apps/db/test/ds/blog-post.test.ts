import { EnumBlogPostStatus } from '@neziva/enums'
import { describe, expect, test } from 'bun:test'
import { db, ds } from '../../src'

describe('blog-post', () => {
  describe('checkSlug', () => {
    test('检查 Slug：不存在时正常通过', async () => {
      const slug = 'new-slug-123'
      await expect(ds.blogPost.checkSlug(slug)).resolves.not.toThrow()
    })

    test('检查 Slug：已存在时抛出错误', async () => {
      const slug = 'existing-slug-456'
      await db.blogPost.create({
        title: 'Test Post',
        slug,
        content: 'Test content',
        category: 'test',
        author: 'Test Author',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Draft,
      })

      await expect(ds.blogPost.checkSlug(slug)).rejects.toThrow('Slug already exists')
    })
  })

  describe('getRelated', () => {
    test('获取相关文章：基于分类', async () => {
      const category = 'tech'
      const post1 = await db.blogPost.create({
        title: 'Post 1',
        slug: 'post-1',
        content: 'Content 1',
        category,
        tags: ['javascript'],
        author: 'Author 1',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Published,
        publishedAt: new Date('2024-01-01'),
      })

      const post2 = await db.blogPost.create({
        title: 'Post 2',
        slug: 'post-2',
        content: 'Content 2',
        category,
        tags: ['typescript'],
        author: 'Author 2',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Published,
        publishedAt: new Date('2024-01-02'),
      })

      // 不同分类的文章，不应被返回
      await db.blogPost.create({
        title: 'Post 3',
        slug: 'post-3',
        content: 'Content 3',
        category: 'design',
        tags: [],
        author: 'Author 3',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Published,
        publishedAt: new Date('2024-01-03'),
      })

      const related = await ds.blogPost.getRelated({
        id: post1.id,
        category,
        tags: [],
        limit: 10,
      })

      expect(related.length).toBe(1)
      expect(related[0]!.id).toBe(post2.id)
    })

    test('获取相关文章：基于标签', async () => {
      const tag = 'react'
      const post1 = await db.blogPost.create({
        title: 'Post 1',
        slug: 'post-1-tag',
        content: 'Content 1',
        category: 'tech',
        tags: [tag, 'javascript'],
        author: 'Author 1',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Published,
        publishedAt: new Date('2024-01-01'),
      })

      const post2 = await db.blogPost.create({
        title: 'Post 2',
        slug: 'post-2-tag',
        content: 'Content 2',
        category: 'design',
        tags: [tag],
        author: 'Author 2',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Published,
        publishedAt: new Date('2024-01-02'),
      })

      // 没有该标签的文章，不应被返回
      await db.blogPost.create({
        title: 'Post 3',
        slug: 'post-3-tag',
        content: 'Content 3',
        category: 'tech',
        tags: ['vue'],
        author: 'Author 3',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Published,
        publishedAt: new Date('2024-01-03'),
      })

      const related = await ds.blogPost.getRelated({
        id: post1.id,
        category: 'tech',
        tags: [tag],
        limit: 10,
      })

      expect(related.length).toBe(1)
      expect(related[0]!.id).toBe(post2.id)
    })

    test('获取相关文章：排除当前文章', async () => {
      const category = 'tech'
      const post1 = await db.blogPost.create({
        title: 'Post 1',
        slug: 'post-1-exclude',
        content: 'Content 1',
        category,
        tags: [],
        author: 'Author 1',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Published,
        publishedAt: new Date('2024-01-01'),
      })

      const related = await ds.blogPost.getRelated({
        id: post1.id,
        category,
        tags: [],
        limit: 10,
      })

      expect(related.every(p => p.id !== post1.id)).toBe(true)
    })

    test('获取相关文章：只返回已发布文章', async () => {
      const category = 'tech'
      const post1 = await db.blogPost.create({
        title: 'Post 1',
        slug: 'post-1-published',
        content: 'Content 1',
        category,
        tags: [],
        author: 'Author 1',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Published,
        publishedAt: new Date('2024-01-01'),
      })

      // 草稿文章，不应被返回
      await db.blogPost.create({
        title: 'Post 2',
        slug: 'post-2-draft',
        content: 'Content 2',
        category,
        tags: [],
        author: 'Author 2',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Draft,
      })

      const related = await ds.blogPost.getRelated({
        id: post1.id,
        category,
        tags: [],
        limit: 10,
      })

      expect(related.length).toBe(0)
    })

    test('获取相关文章：限制数量', async () => {
      const category = 'tech'
      const post1 = await db.blogPost.create({
        title: 'Post 1',
        slug: 'post-1-limit',
        content: 'Content 1',
        category,
        tags: [],
        author: 'Author 1',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Published,
        publishedAt: new Date('2024-01-01'),
      })

      // 创建多个相关文章
      for (let i = 2; i <= 5; i++) {
        await db.blogPost.create({
          title: `Post ${i}`,
          slug: `post-${i}-limit`,
          content: `Content ${i}`,
          category,
          tags: [],
          author: `Author ${i}`,
          readTime: 5,
          views: 0,
          featured: false,
          status: EnumBlogPostStatus.Published,
          publishedAt: new Date(`2024-01-0${i}`),
        })
      }

      const related = await ds.blogPost.getRelated({
        id: post1.id,
        category,
        tags: [],
        limit: 2,
      })

      expect(related.length).toBe(2)
    })
  })

  describe('recordView', () => {
    test('记录浏览量：没有 IP 时直接增加', async () => {
      const post = await db.blogPost.create({
        title: 'Test Post',
        slug: 'test-post-views',
        content: 'Test content',
        category: 'test',
        author: 'Test Author',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Published,
      })

      const result = await ds.blogPost.recordView(post.id)

      expect(result).toBe(true)

      const updated = await db.blogPost.where({ id: post.id }).take()
      expect(updated.views).toBe(1)
    })

    test('记录浏览量：有 IP 时首次访问增加', async () => {
      const post = await db.blogPost.create({
        title: 'Test Post',
        slug: 'test-post-ip',
        content: 'Test content',
        category: 'test',
        author: 'Test Author',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Published,
      })

      const ipAddress = '192.168.1.1'
      const result = await ds.blogPost.recordView(post.id, ipAddress)

      expect(result).toBe(true)

      const updated = await db.blogPost.where({ id: post.id }).take()
      expect(updated.views).toBe(1)

      // 验证缓存已创建
      const cacheKey = `blog_post_view:${post.id}:${ipAddress}`
      const cache = await db.cache.findOptional(cacheKey)
      expect(cache).toBeDefined()
    })

    test('记录浏览量：有 IP 时重复访问不增加', async () => {
      const post = await db.blogPost.create({
        title: 'Test Post',
        slug: 'test-post-duplicate',
        content: 'Test content',
        category: 'test',
        author: 'Test Author',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Published,
      })

      const ipAddress = '192.168.1.2'

      // 首次访问
      const result1 = await ds.blogPost.recordView(post.id, ipAddress)
      expect(result1).toBe(true)

      const afterFirst = await db.blogPost.where({ id: post.id }).take()
      expect(afterFirst.views).toBe(1)

      // 重复访问
      const result2 = await ds.blogPost.recordView(post.id, ipAddress)
      expect(result2).toBe(false)

      const afterSecond = await db.blogPost.where({ id: post.id }).take()
      expect(afterSecond.views).toBe(1) // 浏览量未增加
    })

    test('记录浏览量：不同 IP 可以分别增加', async () => {
      const post = await db.blogPost.create({
        title: 'Test Post',
        slug: 'test-post-different-ip',
        content: 'Test content',
        category: 'test',
        author: 'Test Author',
        readTime: 5,
        views: 0,
        featured: false,
        status: EnumBlogPostStatus.Published,
      })

      const ip1 = '192.168.1.3'
      const ip2 = '192.168.1.4'

      const result1 = await ds.blogPost.recordView(post.id, ip1)
      expect(result1).toBe(true)

      const result2 = await ds.blogPost.recordView(post.id, ip2)
      expect(result2).toBe(true)

      const updated = await db.blogPost.where({ id: post.id }).take()
      expect(updated.views).toBe(2)
    })
  })
})
