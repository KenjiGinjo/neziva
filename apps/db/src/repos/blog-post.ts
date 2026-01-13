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
    selectForList: (q, options?: { category?: string, tag?: string, featured?: boolean, status?: EnumBlogPostStatus }) => {
      const { category, tag, featured, status = EnumBlogPostStatus.Published } = options || {}

      let query = selectForDefault(q).where({ status })

      if (category) {
        query = query.where({ category })
      }

      if (tag) {
        query = query.where({ tags: { has: tag } })
      }

      if (featured !== undefined) {
        query = query.where({ featured })
      }

      return query
    },
    searchList: (q, options?: { keyword?: string, status?: EnumBlogPostStatus }) => {
      const { keyword, status = EnumBlogPostStatus.Published } = options || {}

      if (!keyword) {
        return selectForDefault(q).where({ status })
      }

      return selectForDefault(q).orWhere(
        { status, title: { contains: keyword } },
        { status, content: { contains: keyword } },
        { status, excerpt: { contains: keyword } },
      )
    },

  },
})
