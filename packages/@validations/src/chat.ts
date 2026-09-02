import { z } from 'zod'

export const vChatBody = z.object({
  messages: z.array(z.record(z.unknown())).min(1).max(40),
})
export type vChatBody = z.infer<typeof vChatBody>
