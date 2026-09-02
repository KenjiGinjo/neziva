import { createOpenAI } from '@ai-sdk/openai'
import { EnumContactFormSource, EnumContactFormStatus } from '@neziva/enums'
import { vChatBody } from '@neziva/validations'
import { convertToCoreMessages, streamText, tool } from 'ai'
import { endOfDay } from 'date-fns'
import { db, ds } from 'db'
import { Hono } from 'hono'
import { z } from 'zod'
import { ENV } from '../env'
import { ip } from '../middleware'
import { STUDIO_CHAT_SYSTEM_PROMPT } from '../services/studio-knowledge'
import { validate } from '../utils'

const openai = createOpenAI({
  baseURL: ENV.GPT_GE_BASE_URL,
  apiKey: ENV.GPT_GE_API_KEY,
})

const saveLeadSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional(),
  company: z.string().max(255).optional(),
  projectType: z.enum(['strategy', 'poc', 'implementation', 'maintenance', 'other']),
  description: z.string().min(10).max(8000),
  budget: z.enum(['under2k', '2k-8k', '8k-25k', '25k+', 'not-say']).optional(),
})

export const chatRoute = new Hono()
  .basePath('/chat')

  .post('/', ip(), validate('json', vChatBody), async (c) => {
    if (!ENV.GPT_GE_API_KEY) {
      return c.json({ detail: 'Chat is not configured.' }, 503)
    }

    const ipAddress = c.get('ipAddress')
    if (ipAddress) {
      await ds.cache.checkAndIncrement({
        key: `chat_message:${ipAddress}`,
        limit: 40,
        expiresAt: endOfDay(new Date()),
        errorMessage: 'Daily chat limit reached. Please email kenjiginjo@gmail.com or try again tomorrow.',
      })
    }

    const { messages } = c.req.valid('json')
    const coreMessages = convertToCoreMessages(messages as never).slice(-20)

    const result = streamText({
      model: openai(ENV.GPT_GE_MODEL),
      system: STUDIO_CHAT_SYSTEM_PROMPT,
      messages: coreMessages,
      temperature: 0.4,
      maxTokens: 1024,
      maxSteps: 4,
      tools: {
        saveLead: tool({
          description: 'Save a qualified project inquiry once name, email, and a clear need summary are known.',
          parameters: saveLeadSchema,
          execute: async (lead) => {
            await db.contactForm.create({
              name: lead.name,
              email: lead.email,
              phone: lead.phone,
              company: lead.company,
              projectType: lead.projectType,
              description: lead.description,
              budget: lead.budget,
              status: EnumContactFormStatus.Pending,
              source: EnumContactFormSource.Chat,
            })
            return { ok: true, message: 'Lead saved. A developer will follow up by email.' }
          },
        }),
      },
    })

    return result.toDataStreamResponse({
      headers: {
        'X-Vercel-AI-Data-Stream': 'v1',
      },
    })
  })
