import { z } from 'zod'

export const vAdminLogin = z.object({
  username: z.string({ required_error: 'username is required' }).min(1, 'username is required'),
  password: z.string({ required_error: 'password is required' }).min(1, 'password is required'),
})
export type vAdminLogin = z.infer<typeof vAdminLogin>

export const vUpdateUser = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  nickname: z.string().optional(),
  email: z.string().email().optional(),
  status: z.enum(['active', 'inactive', 'banned']).optional(),
  subscriptionPlan: z.enum(['free', 'starter', 'pro', 'business']).optional(),
  apiCallsLimit: z.number().int().positive().optional(),
})
export type vUpdateUser = z.infer<typeof vUpdateUser>

export const vUpdateSettings = z.object({
  openaiApiKey: z.string().optional(),
  anthropicApiKey: z.string().optional(),
  googleApiKey: z.string().optional(),
  emailService: z.object({
    provider: z.enum(['smtp', 'sendgrid', 'ses']).optional(),
    host: z.string().optional(),
    port: z.number().int().positive().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
  }).optional(),
  payment: z.object({
    paypalClientId: z.string().optional(),
    stripeSecretKey: z.string().optional(),
  }).optional(),
  features: z.record(z.boolean()).optional(),
  maintenanceMode: z.boolean().optional(),
  maxApiCallsPerUser: z.number().int().positive().optional(),
  maxWorkflowsPerUser: z.number().int().positive().optional(),
})
export type vUpdateSettings = z.infer<typeof vUpdateSettings>
