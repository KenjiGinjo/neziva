import { EnumNewsletterStatus } from '@neziva/enums'
import { z } from 'zod'
import { zQueryIntEnum } from './_utils'

export const vNewsletterSubscribe = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional(),
})
export type vNewsletterSubscribe = z.infer<typeof vNewsletterSubscribe>

export const vNewsletterSubscribersQuery = z.object({
  status: zQueryIntEnum(EnumNewsletterStatus),
  source: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
})
export type vNewsletterSubscribersQuery = z.infer<typeof vNewsletterSubscribersQuery>

export const vNewsletterSubscriberStatus = z.object({
  status: z.number().int().min(0).max(2),
})
export type vNewsletterSubscriberStatus = z.infer<typeof vNewsletterSubscriberStatus>
