import process from 'node:process'
import { parseEnv } from 'znv'
import { z } from 'zod'

const schema = {
  APP_STAGE: z.enum(['dev', 'prod']),
  PORT: z.number(),
  JWT_SECRET: z.string(),
  JWT_SECRET_ADMIN: z.string(),
  JWT_EXPIRES_IN_DAYS: z.number().default(14),
  URI_SERVER: z.string(),
  URI_CLIENT: z.string(),
  URI_ADMIN: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  // GitHub OAuth 配置
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),

  UPLOADS_DIR: z.string(),

  // Resend 邮件配置
  RESEND_API_KEY: z.string(),
  RESEND_FROM_EMAIL: z.string().default('onboarding@resend.dev'),
}

export const ENV = parseEnv(process.env, schema)
