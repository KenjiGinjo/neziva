import { z } from 'zod'

export const vCreateSubscription = z.object({
  plan: z.enum(['starter', 'pro', 'business'], { required_error: 'plan is required', invalid_type_error: 'plan must be one of: starter, pro, business' }),
  paymentMethod: z.enum(['paypal', 'stripe'], { required_error: 'payment method is required', invalid_type_error: 'payment method must be one of: paypal, stripe' }),
})
export type vCreateSubscription = z.infer<typeof vCreateSubscription>
