import type { ResCreateWorkflow, ResDeleteWorkflow, ResDuplicateWorkflow, ResRunWorkflow, ResStopWorkflow, ResUpdateWorkflow, ResWorkflowExecutions, ResWorkflowList } from '@haole/interfaces'
import type { HonoResponse } from '../types'
import { Exception } from '@haole/tools/exception'
import { vCreateWorkflow, vRunWorkflow, vUpdateWorkflow } from '@haole/validations'
import { db, ds } from 'db'
import { Hono } from 'hono'
import { type Auth, auth } from '../middleware/auth'
import { validate } from '../utils'
import { pagination } from '../utils/pagination'

export const workflowRoute = new Hono<Auth>()
  .basePath('/workflows')

  /** 获取工作流列表 */
  .get('/', auth(), pagination(), async (c): Promise<HonoResponse<{ data: ResWorkflowList }>> => {
    const user = c.get('user')
    const { query, where } = c.get('page')
    const status = c.req.query('status')
    const search = c.req.query('search')

    let queryBuilder = db.workflow.where({ userId: user.id })

    if (status) {
      queryBuilder = queryBuilder.where({ status })
    }

    if (search) {
      queryBuilder = queryBuilder.where(q => q
        .orWhere({ name: { contains: search } }, { description: { contains: search } }),
      )
    }

    const [items, total] = await Promise.all([
      queryBuilder
        .order({ updatedAt: 'DESC' })
        .limit(where.limit)
        .offset(where.offset)
        .select('id', 'name', 'description', 'status', 'executionCount', 'successCount', 'errorCount', 'lastExecutedAt', 'createdAt', 'updatedAt'),
      queryBuilder.count(),
    ])

    return c.json({
      data: {
        items,
        total,
        page: query.page,
        pageSize: query.pageSize,
      },
    })
  })

  /** 创建工作流 */
  .post('/', auth(), validate('json', vCreateWorkflow), async (c): Promise<HonoResponse<{ data: ResCreateWorkflow }>> => {
    const user = c.get('user')
    const { name, description, workflowData } = c.req.valid('json')

    const workflow = await ds.workflow.create({
      userId: user.id,
      name,
      description,
      workflowData,
    })

    return c.json({
      data: { id: workflow.id },
    })
  })

  /** 获取工作流详情 */
  .get('/:id', auth(), async (c): Promise<HonoResponse<{ data: any }>> => {
    const user = c.get('user')
    const id = c.req.param('id')

    const workflow = await ds.workflow.findById(id, user.id)

    return c.json({
      data: workflow,
    })
  })

  /** 更新工作流 */
  .put('/:id', auth(), validate('json', vUpdateWorkflow), async (c): Promise<HonoResponse<{ data: ResUpdateWorkflow }>> => {
    const user = c.get('user')
    const id = c.req.param('id')
    const data = c.req.valid('json')

    await ds.workflow.update(id, user.id, data)

    return c.json({
      data: { message: 'Workflow updated successfully' },
    })
  })

  /** 删除工作流 */
  .delete('/:id', auth(), async (c): Promise<HonoResponse<{ data: ResDeleteWorkflow }>> => {
    const user = c.get('user')
    const id = c.req.param('id')

    await ds.workflow.delete(id, user.id)

    return c.json({
      data: { message: 'Workflow deleted successfully' },
    })
  })

  /** 运行工作流 */
  .post('/:id/run', auth(), validate('json', vRunWorkflow), async (c): Promise<HonoResponse<{ data: ResRunWorkflow }>> => {
    const user = c.get('user')
    const id = c.req.param('id')
    const { inputData } = c.req.valid('json')

    const workflow = await ds.workflow.findById(id, user.id)

    if (workflow.status !== 'active' && workflow.status !== 'draft') {
      throw new Exception.BadRequestException('Workflow must be active or draft to run')
    }

    // 创建执行记录
    const execution = await ds.execution.create({
      workflowId: id,
      userId: user.id,
      inputData,
    })

    // TODO: 实际执行工作流的逻辑
    // 这里应该启动工作流执行器

    return c.json({
      data: { executionId: execution.id },
    })
  })

  /** 停止工作流 */
  .post('/:id/stop', auth(), async (c): Promise<HonoResponse<{ data: ResStopWorkflow }>> => {
    const user = c.get('user')
    const id = c.req.param('id')

    await ds.workflow.findById(id, user.id)

    // TODO: 停止工作流执行的逻辑
    // 这里应该停止正在运行的工作流

    return c.json({
      data: { message: 'Workflow stopped successfully' },
    })
  })

  /** 复制工作流 */
  .post('/:id/duplicate', auth(), async (c): Promise<HonoResponse<{ data: ResDuplicateWorkflow }>> => {
    const user = c.get('user')
    const id = c.req.param('id')

    const workflow = await ds.workflow.findById(id, user.id)

    const newWorkflow = await ds.workflow.create({
      userId: user.id,
      name: `${workflow.name} (Copy)`,
      description: workflow.description ?? '',
      workflowData: workflow.workflowData as { nodes: any[], edges: any[] },
    })

    return c.json({
      data: { id: newWorkflow.id },
    })
  })

  /** 获取工作流执行历史 */
  .get('/:id/executions', auth(), pagination(), async (c): Promise<HonoResponse<{ data: ResWorkflowExecutions }>> => {
    const user = c.get('user')
    const workflowId = c.req.param('id')
    const status = c.req.query('status')
    const { where } = c.get('page')

    // 验证工作流属于当前用户
    await ds.workflow.findById(workflowId, user.id)

    let queryBuilder = db.execution.where({
      workflowId,
      userId: user.id,
    })

    if (status) {
      queryBuilder = queryBuilder.where({ status })
    }

    const [items, total] = await Promise.all([
      queryBuilder
        .order({ startedAt: 'DESC' })
        .limit(where.limit)
        .offset(where.offset)
        .select('id', 'workflowId', 'status', 'startedAt', 'completedAt', 'durationMs', 'errorMessage'),
      queryBuilder.count(),
    ])

    return c.json({
      data: {
        items,
        total,
      },
    })
  })
