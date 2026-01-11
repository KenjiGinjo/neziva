import type { HonoResponse } from '../types'
import { Exception } from '@neziva/tools/exception'
import { db } from 'db'
import { Hono } from 'hono'
import { z } from 'zod'
import { validate } from '../utils'

const vContactSubmit = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  budget: z.string().optional(),
})

export const contactRoute = new Hono()
  .basePath('/api/contact')

  /** 提交联系表单 */
  .post('/submit', validate('json', vContactSubmit), async (c): Promise<HonoResponse<{ success: boolean, message: string }>> => {
    const dto = c.req.valid('json')

    const form = await db.contactForm.create({
      name: dto.name,
      company: dto.company,
      email: dto.email,
      phone: dto.phone,
      projectType: dto.projectType,
      description: dto.description,
      budget: dto.budget,
      status: 0, // 0: 未处理
    })

    // TODO: 发送邮件通知到 hello@neziva.com

    return c.json({
      success: true,
      message: 'Thank you! We\'ll get back to you within 24 hours.',
    })
  })
