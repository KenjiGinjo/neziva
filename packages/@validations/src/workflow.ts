import { z } from 'zod'

export const vCreateWorkflow = z.object({
  name: z.string({ required_error: 'name is required' }).min(1, 'name is required'),
  description: z.string().optional(),
  workflowData: z.object({
    nodes: z.array(z.any()),
    edges: z.array(z.any()),
  }),
})
export type vCreateWorkflow = z.infer<typeof vCreateWorkflow>

export const vUpdateWorkflow = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  workflowData: z.object({
    nodes: z.array(z.any()),
    edges: z.array(z.any()),
  }).optional(),
  status: z.enum(['draft', 'active', 'paused', 'error']).optional(),
})
export type vUpdateWorkflow = z.infer<typeof vUpdateWorkflow>

export const vRunWorkflow = z.object({
  inputData: z.record(z.any()).optional(),
})
export type vRunWorkflow = z.infer<typeof vRunWorkflow>
