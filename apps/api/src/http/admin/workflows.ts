import type { ResAdminWorkflowList, ResAdminWorkflowStats } from '@neziva/interfaces'
import type { HonoResponse } from '../../types'
import { Exception } from '@neziva/tools/exception'
import { subDays } from 'date-fns'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination } from '../../utils'

export const workflows = new Hono()
  .basePath('/workflows')

  /** 获取所有工作流 */
  .get('/', authAd(), pagination(), async (c): Promise<HonoResponse<{ data: ResAdminWorkflowList }>> => {
    const { query, where } = c.get('page')
    const search = c.req.query('search')
    const status = c.req.query('status')
    const userId = c.req.query('userId')
    const sortBy = c.req.query('sortBy') || 'createdAt'
    const order = c.req.query('order') || 'desc'

    let queryBuilder = db.workflow

    // 搜索
    if (search) {
      queryBuilder = queryBuilder.where(q => q
        .orWhere({ name: { contains: search } }, { description: { contains: search } }),
      )
    }

    // 状态筛选
    if (status) {
      queryBuilder = queryBuilder.where({ status })
    }

    // 用户筛选
    if (userId) {
      queryBuilder = queryBuilder.where({ userId })
    }

    // 排序
    const sortOrder = order === 'asc' ? 'ASC' : 'DESC'
    let sortField = 'createdAt'
    if (sortBy === 'lastExecutedAt') {
      sortField = 'lastExecutedAt'
    }
    else if (sortBy === 'executionCount') {
      sortField = 'executionCount'
    }

    const [items, total] = await Promise.all([
      queryBuilder
        .order({ [sortField]: sortOrder })
        .limit(where.limit)
        .offset(where.offset)
        .select(
          'id',
          'userId',
          'name',
          'description',
          'status',
          'executionCount',
          'successCount',
          'errorCount',
          'lastExecutedAt',
          'createdAt',
          'updatedAt',
        ),
      queryBuilder.count(),
    ])

    // 获取用户信息
    const userIds = [...new Set(items.map(item => item.userId))]
    const users = await db.user
      .where({ id: { in: userIds } })
      .select('id', 'email', 'firstName', 'lastName', 'nickname')

    const userMap = new Map(users.map(u => [u.id, u]))

    const formattedItems = items.map((item) => {
      const user = userMap.get(item.userId)
      const userName = user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.nickname || user?.email?.split('@')[0] || 'Unknown'
      return {
        id: item.id,
        userId: item.userId,
        userName,
        userEmail: user?.email || 'Unknown',
        name: item.name,
        description: item.description,
        status: item.status,
        executionCount: item.executionCount,
        successCount: item.successCount,
        errorCount: item.errorCount,
        lastExecutedAt: item.lastExecutedAt,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }
    })

    return c.json({
      data: {
        items: formattedItems,
        total,
        page: query.page,
        pageSize: query.pageSize,
      },
    })
  })

  /** 获取工作流详情 */
  .get('/:id', authAd(), async (c): Promise<HonoResponse<{ data: any }>> => {
    const id = c.req.param('id')

    const workflow = await db.workflow.findOptional(id)
    if (!workflow) {
      throw new Exception.NotFoundException('Workflow not found')
    }

    // 获取用户信息
    const user = await db.user.findOptional(workflow.userId)
    if (!user) {
      throw new Exception.NotFoundException('User not found')
    }

    // 获取最近的执行记录
    const executions = await db.execution
      .where({ workflowId: id })
      .order({ startedAt: 'DESC' })
      .limit(10)
      .select(
        'id',
        'status',
        'startedAt',
        'completedAt',
        'durationMs',
        'errorMessage',
      )

    const userName = user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.nickname || user.email?.split('@')[0] || 'Unknown'

    return c.json({
      data: {
        ...workflow,
        userName,
        userEmail: user.email || 'Unknown',
        executions,
      },
    })
  })

  /** 获取工作流统计 */
  .get('/stats', authAd(), async (c): Promise<HonoResponse<{ data: ResAdminWorkflowStats }>> => {
    const startDate = c.req.query('startDate')
    const endDate = c.req.query('endDate')

    const start = startDate ? new Date(startDate) : subDays(new Date(), 30)
    const end = endDate ? new Date(endDate) : new Date()

    const [
      totalWorkflows,
      activeWorkflows,
      pausedWorkflows,
      errorWorkflows,
    ] = await Promise.all([
      db.workflow.count(),
      db.workflow.where({ status: 'active' }).count(),
      db.workflow.where({ status: 'paused' }).count(),
      db.workflow.where({ status: 'error' }).count(),
    ])

    // 统计执行次数
    const executions = await db.execution
      .where({
        startedAt: {
          gte: start,
          lte: end,
        },
      })
      .select('status', 'durationMs')

    const executionsCount = executions.length
    const successCount = executions.filter(e => e.status === 'completed').length
    const successRate = executionsCount > 0
      ? (successCount / executionsCount) * 100
      : 0

    // 计算平均执行时间
    const completedExecutions = executions.filter(
      e => e.status === 'completed' && e.durationMs !== null,
    )
    const averageExecutionTime = completedExecutions.length > 0
      ? completedExecutions.reduce((sum, e) => sum + (e.durationMs || 0), 0) / completedExecutions.length
      : 0

    return c.json({
      data: {
        totalWorkflows,
        activeWorkflows,
        pausedWorkflows,
        errorWorkflows,
        executionsCount,
        successRate: Math.round(successRate * 100) / 100,
        averageExecutionTime: Math.round(averageExecutionTime),
      },
    })
  })
