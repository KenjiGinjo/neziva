import type { ResSystemSetting } from '@haole/interfaces'
import type { HonoResponse } from '../types'
import { Hono } from 'hono'

export const systemRoute = new Hono()
  .basePath('/system')

  /** 获取系统设置 */
  .get('/setting', async (c): Promise<HonoResponse<{ data: ResSystemSetting }>> => {
    return c.json({
      data: {
        apiVersion: '1.0.0',
      },
    })
  })
