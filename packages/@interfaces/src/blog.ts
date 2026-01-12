export interface ResBlogPostList {
  status: number
  featured: boolean
  createdAt: string
  id: string
  publishedAt: string | null
  title: string
  slug: string
  content: string
  excerpt: string | null
  category: string
  tags: string[]
  author: string
  readTime: number
  views: number
  coverImage: string | null
  seoTitle: string | null
  seoDesc: string | null
}
