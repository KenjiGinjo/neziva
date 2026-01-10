import { parseEnv } from 'znv'
import { z } from 'zod'

const schema = {
  DATABASE_URL: z.string(),
  DATABASE_LOG: z.boolean().default(false),
}

export const ENV = parseEnv(process.env, schema)
