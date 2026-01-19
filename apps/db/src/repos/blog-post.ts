import { EnumBlogPostStatus } from '@neziva/enums'
import { createRepo } from 'orchid-orm'
import { db } from '../tables'

const selectForDefault = db.blogPost.makeHelper(q => q.select(
  'id',
  'createdAt',
  'publishedAt',
  'title',
  'slug',
  'content',
  'excerpt',
  'category',
  'tags',
  'author',
  'readTime',
  'views',
  'featured',
  'status',
  'coverImage',
  'seoTitle',
  'seoDesc',
))

export const blogPost = createRepo(db.blogPost, {
  queryMethods: {
    selectForDefault: q => selectForDefault(q),
    selectForList: (q, options?: { category?: string, tag?: string, featured?: boolean, status?: EnumBlogPostStatus, keyword?: string }) => {
      const { category, tag, featured, status, keyword } = options || {}

      const query = selectForDefault(q)
      const defaultWhere: any = { }
      // status 处理：如果未指定，默认使用 Published；如果明确指定（包括 undefined），则使用指定值
      if (status !== undefined) {
        defaultWhere.status = status
      }
      else {
        defaultWhere.status = EnumBlogPostStatus.Published
      }

      if (category) {
        defaultWhere.category = category
      }

      if (tag) {
        defaultWhere.tags = { has: tag }
      }

      if (featured !== undefined) {
        defaultWhere.featured = featured
      }

      const searchWhere: any = []
      if (keyword) {
        searchWhere.push({ title: { contains: keyword } })
        searchWhere.push({ content: { contains: keyword } })
        searchWhere.push({ excerpt: { contains: keyword } })
      }
      if (Object.keys(searchWhere).length > 0) {
        const sa = searchWhere.map((item: any) => {
          return { ...defaultWhere, ...item }
        })

        return query.orWhere(...sa)
      }
      else {
        if (Object.keys(defaultWhere).length > 0) {
          return query.where(defaultWhere)
        }
        else {
          return query
        }
      }
    },

  },
})
