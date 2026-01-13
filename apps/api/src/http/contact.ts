import type { ResContactSubmit } from '@neziva/interfaces'
import type { HonoResponse } from '../types'
import { vContactSubmit } from '@neziva/validations'
import { ds } from 'db'
import { Hono } from 'hono'
import { validate } from '../utils'

export const contactRoute = new Hono()
  .basePath('/api/contact')

  /** 提交联系表单 */
  .post('/submit', validate('json', vContactSubmit), async (c): Promise<HonoResponse<ResContactSubmit>> => {
    const dto = c.req.valid('json')

    await ds.contactForm.submit({
      name: dto.name,
      company: dto.company,
      email: dto.email,
      phone: dto.phone,
      projectType: dto.projectType,
      description: dto.description,
      budget: dto.budget,
    })

    // TODO: 发送邮件通知到 hello@neziva.com

    return c.json({
      success: true,
      message: 'Thank you! We\'ll get back to you within 24 hours.',
    })
  })
