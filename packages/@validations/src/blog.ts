import { EnumBlogPostStatus } from '@neziva/enums'
import { z } from 'zod'

export const vBlogSearch = z.object({
  keyword: z.string().optional(),
})
export type vBlogSearch = z.infer<typeof vBlogSearch>

export const vBlogPostsQuery = z.object({
  category: z.string().optional(),
  tag: z.string().optional(),
  featured: z.coerce.boolean().optional(),
})
export type vBlogPostsQuery = z.infer<typeof vBlogPostsQuery>

export const vBlogRelated = z.object({
  limit: z.string().optional().transform(val => val ? Number(val) : 5),
})
export type vBlogRelated = z.infer<typeof vBlogRelated>

export const vBlogPublish = z.object({
  status: z.number().int().min(0).max(1),
})
export type vBlogPublish = z.infer<typeof vBlogPublish>

export const vBlogFeature = z.object({
  featured: z.boolean(),
})
export type vBlogFeature = z.infer<typeof vBlogFeature>

export const vBlogAdminPostsQuery = z.object({
  status: z.nativeEnum(EnumBlogPostStatus).optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
})
export type vBlogAdminPostsQuery = z.infer<typeof vBlogAdminPostsQuery>

export const vBlogCreate = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  author: z.string().min(1),
  readTime: z.number().default(0),
  views: z.number().default(0),
  featured: z.boolean().default(false),
  status: z.number().optional(),
  coverImage: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
})
export type vBlogCreate = z.infer<typeof vBlogCreate>

export const vBlogUpdate = vBlogCreate.partial()
export type vBlogUpdate = z.infer<typeof vBlogUpdate>
