import { z } from 'zod'

export const vUpdateProfile = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  nickname: z.string().optional(),
  avatarUrl: z.string().optional(), // Can be base64 data URL or regular URL
})
export type vUpdateProfile = z.infer<typeof vUpdateProfile>

export const vUploadUserAvatar = z.object({
  avatar: z.string({ required_error: 'avatar is required' }).min(1, 'avatar is required'),
})
export type vUploadUserAvatar = z.infer<typeof vUploadUserAvatar>
