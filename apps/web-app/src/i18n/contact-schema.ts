import type { Messages } from './en'
import { z } from 'zod'

export function createContactSchema(m: Messages) {
  return z.object({
    name: z.string().min(2, m.contact.errors.nameMin),
    company: z.string().optional(),
    email: z.string().email(m.contact.errors.email),
    phone: z.string().optional(),
    projectType: z.string().min(1, m.contact.errors.projectType),
    description: z.string().min(10, m.contact.errors.descriptionMin),
    budget: z.string().optional(),
  })
}
