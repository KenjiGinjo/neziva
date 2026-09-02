import type { HonoResponse } from '../types'
import { Hono } from 'hono'
import { authAd } from '../middleware'

export const uploadRoute = new Hono()
  .basePath('/upload')

  /** 上传暂时没用 */
  .post('/', authAd(), async (c): Promise<HonoResponse<{ data: string }>> => {
    return c.json({ data: '' })
  })
