import type { ResAdminExecutionList } from '@neziva/interfaces'
import type { HonoResponse } from '../../types'
import { Exception } from '@neziva/tools/exception'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination } from '../../utils'

export const executions = new Hono()
  .basePath('/executions')

  /** 获取执行列表 */
  .get('/', authAd(), pagination(), async (c): Promise<HonoResponse<{ data: ResAdminExecutionList }>> => {
    const { where } = c.get('page')
    const status = c.req.query('status')
    const workflowId = c.req.query('workflowId')
    const userId = c.req.query('userId')
    const startDate = c.req.query('startDate')
    const endDate = c.req.query('endDate')
    const sortBy = c.req.query('sortBy') || 'startedAt'
    const order = c.req.query('order') || 'desc'

    let queryBuilder = db.execution

    // 状态筛选
    if (status) {
      queryBuilder = queryBuilder.where({ status })
    }

    // 工作流筛选
    if (workflowId) {
      queryBuilder = queryBuilder.where({ workflowId })
    }

    // 用户筛选
    if (userId) {
      queryBuilder = queryBuilder.where({ userId })
    }

    // 日期范围筛选
    if (startDate || endDate) {
      const dateFilter: any = {}
      if (startDate)
        dateFilter.gte = new Date(startDate)
      if (endDate)
        dateFilter.lte = new Date(endDate)
      queryBuilder = queryBuilder.where({ startedAt: dateFilter })
    }

    // 排序
    const sortOrder = order === 'asc' ? 'ASC' : 'DESC'
    const sortField = sortBy === 'durationMs' ? 'durationMs' : 'startedAt'

    const [items, total] = await Promise.all([
      queryBuilder
        .order({ [sortField]: sortOrder })
        .limit(where.limit)
        .offset(where.offset)
        .select(
          'id',
          'workflowId',
          'userId',
          'status',
          'startedAt',
          'completedAt',
          'durationMs',
          'errorMessage',
        ),
      queryBuilder.count(),
    ])

    // 获取工作流和用户信息
    const workflowIds = [...new Set(items.map(item => item.workflowId).filter(Boolean))]
    const userIds = [...new Set(items.map(item => item.userId).filter(Boolean))]

    const [workflows, users] = await Promise.all([
      workflowIds.length > 0
        ? db.workflow
            .where({ id: { in: workflowIds } })
            .select('id', 'name')
        : [],
      userIds.length > 0
        ? db.user
            .where({ id: { in: userIds } })
            .select('id', 'email')
        : [],
    ])

    const workflowMap = new Map(workflows.map(w => [w.id, w]))
    const userMap = new Map(users.map(u => [u.id, u]))

    const formattedItems = items.map((item) => {
      const workflow = workflowMap.get(item.workflowId)
      const user = userMap.get(item.userId)
      return {
        id: item.id,
        workflowId: item.workflowId,
        workflowName: workflow?.name || 'Unknown',
        userId: item.userId,
        userEmail: user?.email || 'Unknown',
        status: item.status,
        startedAt: item.startedAt,
        completedAt: item.completedAt,
        durationMs: item.durationMs,
        errorMessage: item.errorMessage,
      }
    })

    return c.json({
      data: {
        items: formattedItems,
        total,
      },
    })
  })

  /** 获取执行详情 */
  .get('/:id', authAd(), async (c): Promise<HonoResponse<{ data: any }>> => {
    const id = c.req.param('id')

    const execution = await db.execution.findOptional(id)
    if (!execution) {
      throw new Exception.NotFoundException('Execution not found')
    }

    // 获取工作流信息
    const workflow = await db.workflow.findOptional(execution.workflowId)
    if (!workflow) {
      throw new Exception.NotFoundException('Workflow not found')
    }

    // 获取用户信息
    const user = await db.user.findOptional(execution.userId)
    if (!user) {
      throw new Exception.NotFoundException('User not found')
    }

    return c.json({
      data: {
        ...execution,
        workflowName: workflow.name,
        userEmail: user.email || 'Unknown',
      },
    })
  })
