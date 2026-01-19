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

      let query = selectForDefault(q)

      // status 处理：如果未指定，默认使用 Published；如果明确指定（包括 undefined），则使用指定值
      if (status !== undefined) {
        query = query.where({ status })
      }
      else {
        query = query.where({ status: EnumBlogPostStatus.Published })
      }

      if (category) {
        query = query.where({ category })
      }

      if (tag) {
        query = query.where({ tags: { has: tag } })
      }

      if (featured !== undefined) {
        query = query.where({ featured })
      }

      if (keyword) {
        query = query.orWhere(
          { title: { contains: keyword } },
          { content: { contains: keyword } },
          { excerpt: { contains: keyword } },
        )
      }

      return query
    },

  },
})
