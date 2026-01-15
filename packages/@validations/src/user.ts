import { z } from 'zod'

export const vUpdateProfile = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  nickname: z.string().optional(),
  avatarUrl: z.string().optional(), // Can be base64 data URL or regular URL
})
export type vUpdateProfile = z.infer<typeof vUpdateProfile>
