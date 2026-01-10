import type { ValidationTargets } from 'hono'
import type { ZodSchema } from 'zod'
import { zValidator } from '@hono/zod-validator'

export function validate<T extends ZodSchema, Target extends keyof ValidationTargets>(target: Target, schema: T) {
  return zValidator(target, schema, (result) => {
    if (!result.success) {
      throw result.error
    }
  })
}
