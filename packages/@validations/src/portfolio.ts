import { z } from 'zod'

export const vPortfolioProjectsQuery = z.object({
  type: z.string().optional(),
  tag: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  page: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
})
export type vPortfolioProjectsQuery = z.infer<typeof vPortfolioProjectsQuery>

export const vPortfolioRelated = z.object({
  limit: z.string().optional().transform(val => val ? Number(val) : 5),
})
export type vPortfolioRelated = z.infer<typeof vPortfolioRelated>
