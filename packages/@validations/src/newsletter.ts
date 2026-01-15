import { z } from 'zod'

export const vNewsletterSubscribe = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional(),
})
export type vNewsletterSubscribe = z.infer<typeof vNewsletterSubscribe>

export const vNewsletterSubscribersQuery = z.object({
  status: z.string().optional(),
  source: z.string().optional(),
  search: z.string().optional(),
})
export type vNewsletterSubscribersQuery = z.infer<typeof vNewsletterSubscribersQuery>

export const vNewsletterSubscriberStatus = z.object({
  status: z.number().int().min(0).max(2),
})
export type vNewsletterSubscriberStatus = z.infer<typeof vNewsletterSubscriberStatus>
