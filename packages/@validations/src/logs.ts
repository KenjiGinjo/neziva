import { z } from 'zod'

export const vLogsQuery = z.object({
  level: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  search: z.string().optional(),
})
export type vLogsQuery = z.infer<typeof vLogsQuery>
