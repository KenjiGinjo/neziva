import { z } from 'zod'
import { vId } from './_utils'

export const vContactSubmit = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  budget: z.string().optional(),
})
export type vContactSubmit = z.infer<typeof vContactSubmit>

export const vContactFormsQuery = z.object({
  status: z.string().optional(),
  projectType: z.string().optional(),
  search: z.string().optional(),
})
export type vContactFormsQuery = z.infer<typeof vContactFormsQuery>

export const vContactFormId = z.object({
  id: vId,
})
export type vContactFormId = z.infer<typeof vContactFormId>

export const vContactFormStatus = z.object({
  status: z.number().int().min(0).max(2),
})
export type vContactFormStatus = z.infer<typeof vContactFormStatus>

export const vContactFormNotes = z.object({
  notes: z.string().optional(),
})
export type vContactFormNotes = z.infer<typeof vContactFormNotes>
