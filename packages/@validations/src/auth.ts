import { z } from 'zod'

export const vAuthLoginByPassword = z.object({
  email: z.string({ required_error: 'email is required' }).email('email format is incorrect'),
  password: z.string({ required_error: 'password is required' }).min(1, 'password is required'),
})
export type vAuthLoginByPassword = z.infer<typeof vAuthLoginByPassword>

export const vSendEmailVerificationCode = z.object({
  email: z.string({ required_error: 'email is required' }).email('email format is incorrect'),
})
export type vSendEmailVerificationCode = z.infer<typeof vSendEmailVerificationCode>

export const vAuthRegisterByEmail = z.object({
  firstName: z.string({ required_error: 'first name is required' }).min(1, 'first name is required'),
  lastName: z.string({ required_error: 'last name is required' }).min(1, 'last name is required'),
  email: z.string({ required_error: 'email is required' }).email('email format is incorrect'),
  password: z.string({ required_error: 'password is required' }).min(6, 'password must be at least 6 characters'),
  confirmPassword: z.string({ required_error: 'confirm password is required' }).min(1, 'confirm password is required'),
})
export type vAuthRegisterByEmail = z.infer<typeof vAuthRegisterByEmail>

export const vAuthChangePassword = z.object({
  oldPassword: z.string({ required_error: 'old password is required' }).min(1, 'old password is required'),
  newPassword: z.string({ required_error: 'new password is required' }).min(1, 'new password is required'),
  confirmPassword: z.string({ required_error: 'confirm password is required' }).min(1, 'confirm password is required'),
})
export type vAuthChangePassword = z.infer<typeof vAuthChangePassword>

export const vAuthForgotPassword = z.object({
  email: z.string({ required_error: 'email is required' }).email('email format is incorrect'),
})
export type vAuthForgotPassword = z.infer<typeof vAuthForgotPassword>

export const vAuthResetPassword = z.object({
  token: z.string({ required_error: 'reset token is required' }).min(1, 'reset token is required'),
  newPassword: z.string({ required_error: 'new password is required' }).min(6, 'password must be at least 6 characters'),
  confirmPassword: z.string({ required_error: 'confirm password is required' }).min(1, 'confirm password is required'),
})
export type vAuthResetPassword = z.infer<typeof vAuthResetPassword>

export const vAuthSetPassword = z.object({
  newPassword: z.string({ required_error: 'new password is required' }).min(6, 'password must be at least 6 characters'),
  confirmPassword: z.string({ required_error: 'confirm password is required' }).min(1, 'confirm password is required'),
})
export type vAuthSetPassword = z.infer<typeof vAuthSetPassword>

export const vAuthLoginByGoogle = z.object({
  token: z.string({ required_error: 'Google token is required' }).min(1, 'Google token is required'),
})
export type vAuthLoginByGoogle = z.infer<typeof vAuthLoginByGoogle>

export const vAuthLoginByGithub = z.object({
  code: z.string({ required_error: 'GitHub code is required' }).min(1, 'GitHub code is required'),
})
export type vAuthLoginByGithub = z.infer<typeof vAuthLoginByGithub>
