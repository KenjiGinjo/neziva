import type { ResExecutionLogs } from '@neziva/interfaces'
import type { HonoResponse } from '../types'
import { ds } from 'db'
import { Hono } from 'hono'
import { type Auth, auth } from '../middleware/auth'

export const executionRoute = new Hono<Auth>()
  .basePath('/executions')

  /** 获取执行详情 */
  .get('/:id', auth(), async (c): Promise<HonoResponse<{ data: any }>> => {
    const user = c.get('user')
    const id = c.req.param('id')

    const execution = await ds.execution.findById(id, user.id)

    return c.json({
      data: execution,
    })
  })

  /** 获取执行日志 */
  .get('/:id/logs', auth(), async (c): Promise<HonoResponse<{ data: ResExecutionLogs }>> => {
    const user = c.get('user')
    const id = c.req.param('id')

    const execution = await ds.execution.findById(id, user.id)

    return c.json({
      data: {
        logs: execution.logs || '',
      },
    })
  })
