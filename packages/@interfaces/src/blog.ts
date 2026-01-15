import type { EnumBlogPostStatus } from '@neziva/enums'

export interface ResBlogPostList {
  id: string
  createdAt: string
  publishedAt: string | null

  title: string
  slug: string
  content: string
  excerpt: string | null
  category: string
  tags: string[] | null
  author: string
  readTime: number
  views: number
  featured: boolean
  status: EnumBlogPostStatus
  coverImage: string | null
  seoTitle: string | null
  seoDesc: string | null
}
