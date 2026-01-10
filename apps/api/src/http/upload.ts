import type { HonoResponse } from '../types'
import { Hono } from 'hono'
import { auth } from '../middleware'

export const uploadRoute = new Hono()
  .basePath('/upload')

  /** 上传暂时没用 */
  .post('/', auth(), async (c): Promise<HonoResponse<{ data: string }>> => {
    return c.json({ data: '' })
  })
