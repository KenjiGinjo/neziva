import { EnumBlogPostStatus } from '@neziva/enums'
import { describe, expect, test } from 'bun:test'
import { db, ds } from '../../src'

describe('blog', () => {
  test('获取文章列表：基本功能', async () => {
    // 创建测试文章
    const post1 = await db.blogPost.create({
      title: 'Test Post 1',
      slug: 'test-post-1',
      content: 'Content 1',
      category: 'Tech',
      tags: ['JavaScript', 'TypeScript'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const post2 = await db.blogPost.create({
      title: 'Test Post 2',
      slug: 'test-post-2',
      content: 'Content 2',
      category: 'Design',
      tags: ['CSS', 'UI'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const { data, total } = await ds.blogPost.getList({
      limit: 10,
      offset: 0,
    })

    expect(total).toBeGreaterThanOrEqual(2)
    expect(data.length).toBeGreaterThanOrEqual(2)
    expect(data.some(p => p.id === post1.id)).toBe(true)
    expect(data.some(p => p.id === post2.id)).toBe(true)
  })

  test('获取文章列表：按分类筛选', async () => {
    const category = 'Tech'
    const post = await db.blogPost.create({
      title: 'Tech Post',
      slug: 'tech-post',
      content: 'Tech Content',
      category,
      tags: ['Tech'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const { data, total } = await ds.blogPost.getList({
      category,
      limit: 10,
      offset: 0,
    })

    expect(total).toBeGreaterThanOrEqual(1)
    expect(data.some(p => p.id === post.id)).toBe(true)
    expect(data.every(p => p.category === category)).toBe(true)
  })

  test('获取文章列表：按标签筛选', async () => {
    const tag = 'JavaScript'
    const post = await db.blogPost.create({
      title: 'JS Post',
      slug: 'js-post',
      content: 'JS Content',
      category: 'Tech',
      tags: [tag, 'TypeScript'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const { data, total } = await ds.blogPost.getList({
      tag,
      limit: 10,
      offset: 0,
    })

    expect(total).toBeGreaterThanOrEqual(1)
    expect(data.some(p => p.id === post.id)).toBe(true)
  })

  test('获取文章列表：按精选筛选', async () => {
    const featuredPost = await db.blogPost.create({
      title: 'Featured Post',
      slug: 'featured-post',
      content: 'Featured Content',
      category: 'Tech',
      tags: ['Featured'],
      author: 'test',
      featured: true,
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const { data, total } = await ds.blogPost.getList({
      featured: true,
      limit: 10,
      offset: 0,
    })

    expect(total).toBeGreaterThanOrEqual(1)
    expect(data.some(p => p.id === featuredPost.id)).toBe(true)
    expect(data.every(p => p.featured === true)).toBe(true)
  })

  test('获取文章列表：分页功能', async () => {
    // 创建多篇文章
    for (let i = 0; i < 5; i++) {
      await db.blogPost.create({
        title: `Post ${i}`,
        slug: `post-${i}`,
        content: `Content ${i}`,
        category: 'Tech',
        tags: ['Test'],
        author: 'test',
        status: EnumBlogPostStatus.Published,
        publishedAt: new Date(),
      })
    }

    const page1 = await ds.blogPost.getList({
      limit: 2,
      offset: 0,
    })

    const page2 = await ds.blogPost.getList({
      limit: 2,
      offset: 2,
    })

    expect(page1.data.length).toBe(2)
    expect(page2.data.length).toBe(2)
    expect(page1.data[0]?.id).not.toBe(page2.data[0]?.id)
  })

  test('获取文章列表：不返回草稿', async () => {
    const draft = await db.blogPost.create({
      title: 'Draft Post',
      slug: 'draft-post',
      content: 'Draft Content',
      category: 'Tech',
      tags: ['Draft'],
      author: 'test',
      status: EnumBlogPostStatus.Draft,
    })

    const { data } = await ds.blogPost.getList({
      limit: 10,
      offset: 0,
    })

    expect(data.some(p => p.id === draft.id)).toBe(false)
  })

  test('获取文章详情：基本功能', async () => {
    const post = await db.blogPost.create({
      title: 'Detail Post',
      slug: 'detail-post',
      content: 'Detail Content',
      category: 'Tech',
      tags: ['Detail'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const result = await ds.blogPost.getById(post.id)

    expect(result).not.toBeNull()
    expect(result?.id).toBe(post.id)
    expect(result?.title).toBe(post.title)
    expect(result?.status).toBe(EnumBlogPostStatus.Published)
  })

  test('获取文章详情：不存在时返回 null', async () => {
    const result = await ds.blogPost.getById('non-existent-id')

    expect(result).toBeUndefined()
  })

  test('获取文章详情：不返回草稿', async () => {
    const draft = await db.blogPost.create({
      title: 'Draft Detail',
      slug: 'draft-detail',
      content: 'Draft Content',
      category: 'Tech',
      tags: ['Draft'],
      author: 'test',
      status: EnumBlogPostStatus.Draft,
    })

    const result = await ds.blogPost.getById(draft.id)

    expect(result).toBeUndefined()
  })

  test('搜索文章：有关键词', async () => {
    const post = await db.blogPost.create({
      title: 'Search Test Post',
      slug: 'search-test-post',
      content: 'This is a search test content',
      excerpt: 'Search test excerpt',
      category: 'Tech',
      tags: ['Search'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const { data, total } = await ds.blogPost.search({
      keyword: 'search',
      limit: 10,
      offset: 0,
    })

    expect(total).toBeGreaterThanOrEqual(1)
    expect(data.some(p => p.id === post.id)).toBe(true)
  })

  test('搜索文章：无关键词', async () => {
    const { data, total } = await ds.blogPost.search({
      limit: 10,
      offset: 0,
    })

    expect(total).toBeGreaterThanOrEqual(0)
    expect(Array.isArray(data)).toBe(true)
  })

  test('搜索文章：分页功能', async () => {
    const { data: page1, total } = await ds.blogPost.search({
      keyword: 'test',
      limit: 2,
      offset: 0,
    })

    const { data: page2 } = await ds.blogPost.search({
      keyword: 'test',
      limit: 2,
      offset: 2,
    })

    expect(page1.length).toBeLessThanOrEqual(2)
    expect(page2.length).toBeLessThanOrEqual(2)
    if (total > 2) {
      expect(page1[0]?.id).not.toBe(page2[0]?.id)
    }
  })

  test('获取相关文章：相同分类', async () => {
    const category = 'RelatedCategory'
    const post1 = await db.blogPost.create({
      title: 'Post 1',
      slug: 'post-1',
      content: 'Content 1',
      category,
      tags: ['Tag1'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const post2 = await db.blogPost.create({
      title: 'Post 2',
      slug: 'post-2',
      content: 'Content 2',
      category,
      tags: ['Tag2'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const related = await ds.blogPost.getRelated({
      id: post1.id,
      category: post1.category,
      tags: post1.tags,
      limit: 10,
    })

    expect(related.some(p => p.id === post2.id)).toBe(true)
    expect(related.every(p => p.id !== post1.id)).toBe(true)
  })

  test('获取相关文章：相同标签', async () => {
    const tag = 'RelatedTag'
    const post1 = await db.blogPost.create({
      title: 'Post 1',
      slug: 'post-1-related',
      content: 'Content 1',
      category: 'Category1',
      tags: [tag, 'Other'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const post2 = await db.blogPost.create({
      title: 'Post 2',
      slug: 'post-2-related',
      content: 'Content 2',
      category: 'Category2',
      tags: [tag, 'Another'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const related = await ds.blogPost.getRelated({
      id: post1.id,
      category: post1.category,
      tags: post1.tags,
      limit: 10,
    })

    expect(related.some(p => p.id === post2.id)).toBe(true)
  })

  test('获取相关文章：无标签时只按分类', async () => {
    const category = 'NoTagCategory'
    const post1 = await db.blogPost.create({
      title: 'Post 1',
      slug: 'post-1-notag',
      content: 'Content 1',
      category,
      tags: [],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const post2 = await db.blogPost.create({
      title: 'Post 2',
      slug: 'post-2-notag',
      content: 'Content 2',
      category,
      tags: [],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const related = await ds.blogPost.getRelated({
      id: post1.id,
      category: post1.category,
      tags: [],
      limit: 10,
    })

    expect(related.some(p => p.id === post2.id)).toBe(true)
  })

  test('获取相关文章：排除当前文章', async () => {
    const post = await db.blogPost.create({
      title: 'Current Post',
      slug: 'current-post',
      content: 'Current Content',
      category: 'Tech',
      tags: ['Current'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      publishedAt: new Date(),
    })

    const related = await ds.blogPost.getRelated({
      id: post.id,
      category: post.category,
      tags: post.tags,
      limit: 10,
    })

    expect(related.every(p => p.id !== post.id)).toBe(true)
  })

  test('记录浏览量：无 IP 地址', async () => {
    const post = await db.blogPost.create({
      title: 'View Test',
      slug: 'view-test',
      content: 'View Content',
      category: 'Tech',
      tags: ['View'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      views: 0,
      publishedAt: new Date(),
    })

    const initialViews = post.views

    const result = await ds.blogPost.recordView(post.id)

    expect(result).toBe(true)

    const updated = await db.blogPost.find(post.id).select('views')
    expect(updated.views).toBe(initialViews + 1)
  })

  test('记录浏览量：有 IP 地址（首次访问）', async () => {
    const post = await db.blogPost.create({
      title: 'IP View Test',
      slug: 'ip-view-test',
      content: 'IP View Content',
      category: 'Tech',
      tags: ['IP'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      views: 0,
      publishedAt: new Date(),
    })

    const ipAddress = '192.168.1.1'
    const initialViews = post.views

    const result = await ds.blogPost.recordView(post.id, ipAddress)

    expect(result).toBe(true)

    const updated = await db.blogPost.find(post.id).select('views')
    expect(updated.views).toBe(initialViews + 1)

    // 验证缓存已创建
    const cache = await db.cache.findOptional(`blog_post_view:${post.id}:${ipAddress}`)
    expect(cache).not.toBeNull()
  })

  test('记录浏览量：重复访问（相同 IP）', async () => {
    const post = await db.blogPost.create({
      title: 'Duplicate View Test',
      slug: 'duplicate-view-test',
      content: 'Duplicate View Content',
      category: 'Tech',
      tags: ['Duplicate'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      views: 0,
      publishedAt: new Date(),
    })

    const ipAddress = '192.168.1.2'

    // 第一次访问
    const result1 = await ds.blogPost.recordView(post.id, ipAddress)
    expect(result1).toBe(true)

    const afterFirst = await db.blogPost.find(post.id).select('views')
    const viewsAfterFirst = afterFirst.views

    // 第二次访问（相同 IP）
    const result2 = await ds.blogPost.recordView(post.id, ipAddress)
    expect(result2).toBe(false) // 应该返回 false，表示已访问过

    const afterSecond = await db.blogPost.find(post.id).select('views')
    expect(afterSecond.views).toBe(viewsAfterFirst) // 浏览量不应该增加
  })

  test('记录浏览量：不同 IP 可以重复统计', async () => {
    const post = await db.blogPost.create({
      title: 'Different IP Test',
      slug: 'different-ip-test',
      content: 'Different IP Content',
      category: 'Tech',
      tags: ['Different'],
      author: 'test',
      status: EnumBlogPostStatus.Published,
      views: 0,
      publishedAt: new Date(),
    })

    const ip1 = '192.168.1.3'
    const ip2 = '192.168.1.4'

    // IP1 访问
    const result1 = await ds.blogPost.recordView(post.id, ip1)
    expect(result1).toBe(true)

    const afterFirst = await db.blogPost.find(post.id).select('views')
    const viewsAfterFirst = afterFirst.views

    // IP2 访问（不同 IP）
    const result2 = await ds.blogPost.recordView(post.id, ip2)
    expect(result2).toBe(true) // 应该返回 true，因为是不同 IP

    const afterSecond = await db.blogPost.find(post.id).select('views')
    expect(afterSecond.views).toBe(viewsAfterFirst + 1) // 浏览量应该增加
  })
})
