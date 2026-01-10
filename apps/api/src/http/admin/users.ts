import type { ResAdminDeleteUser, ResAdminUpdateUser, ResAdminUserList, ResAdminUserStats } from '@neziva/interfaces'
import type { HonoResponse } from '../../types'
import { Exception } from '@neziva/tools/exception'
import { vUpdateUser } from '@neziva/validations'
import { subDays } from 'date-fns'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { pagination, validate } from '../../utils'

export const users = new Hono()
  .basePath('/users')

  /** 获取用户列表 */
  .get('/', authAd(), pagination(), async (c): Promise<HonoResponse<{ data: ResAdminUserList }>> => {
    const { query, where } = c.get('page')
    const search = c.req.query('search')
    const status = c.req.query('status')
    const subscriptionPlan = c.req.query('subscriptionPlan')
    const sortBy = c.req.query('sortBy') || 'createdAt'
    const order = c.req.query('order') || 'desc'

    let queryBuilder = db.user

    // 搜索
    if (search) {
      queryBuilder = queryBuilder.where(q => q
        .orWhere(
          { email: { contains: search } },
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { nickname: { contains: search } },
        ),
      )
    }

    // 状态筛选
    if (status) {
      const statusMap: Record<string, number> = {
        active: 1,
        inactive: 0,
        banned: 2,
      }
      queryBuilder = queryBuilder.where({ status: statusMap[status] })
    }

    // 订阅计划筛选
    if (subscriptionPlan) {
      queryBuilder = queryBuilder.where({ subscriptionPlan })
    }

    // 排序
    const sortOrder = order === 'asc' ? 'ASC' : 'DESC'
    const sortField = sortBy === 'lastLoginAt' ? 'lastLoginAt' : sortBy === 'subscriptionPlan' ? 'subscriptionPlan' : 'createdAt'

    const [items, total] = await Promise.all([
      queryBuilder
        .order({ [sortField]: sortOrder })
        .limit(where.limit)
        .offset(where.offset)
        .select(
          'id',
          'email',
          'firstName',
          'lastName',
          'nickname',
          'avatarUrl',
          'subscriptionPlan',
          'subscriptionStatus',
          'status',
          'apiCallsUsed',
          'apiCallsLimit',
          'createdAt',
          'lastLoginAt',
        ),
      queryBuilder.count(),
    ])

    // 转换状态为字符串
    const statusMap: Record<number, string> = {
      1: 'active',
      0: 'inactive',
      2: 'banned',
    }

    const formattedItems = items.map(item => ({
      ...item,
      status: statusMap[item.status] || 'inactive',
    }))

    return c.json({
      data: {
        items: formattedItems,
        total,
        page: query.page,
        pageSize: query.pageSize,
      },
    })
  })

  /** 获取用户详情 */
  .get('/:id', authAd(), async (c): Promise<HonoResponse<{ data: any }>> => {
    const id = c.req.param('id')

    const user = await db.user.findOptional(id)
    if (!user) {
      throw new Exception.NotFoundException('User not found')
    }

    // 获取用户的工作流
    const workflows = await db.workflow
      .where({ userId: id })
      .select('id', 'name', 'description', 'status', 'executionCount', 'createdAt', 'updatedAt')

    // 获取用户的账单
    const invoices = await db.invoice
      .where({ userId: id })
      .order({ createdAt: 'DESC' })
      .select('id', 'amount', 'currency', 'status', 'createdAt', 'downloadUrl')

    const statusMap: Record<number, string> = {
      1: 'active',
      0: 'inactive',
      2: 'banned',
    }

    return c.json({
      data: {
        ...user,
        status: statusMap[user.status] || 'inactive',
        workflows,
        invoices,
      },
    })
  })

  /** 更新用户信息 */
  .put('/:id', authAd(), validate('json', vUpdateUser), async (c): Promise<HonoResponse<{ data: ResAdminUpdateUser }>> => {
    const id = c.req.param('id')
    const data = c.req.valid('json')

    const user = await db.user.findOptional(id)
    if (!user) {
      throw new Exception.NotFoundException('User not found')
    }

    // 转换状态字符串为数字
    const statusMap: Record<string, number> = {
      active: 1,
      inactive: 0,
      banned: 2,
    }

    const updateData: any = {}
    if (data.firstName !== undefined)
      updateData.firstName = data.firstName
    if (data.lastName !== undefined)
      updateData.lastName = data.lastName
    if (data.nickname !== undefined)
      updateData.nickname = data.nickname
    if (data.email !== undefined)
      updateData.email = data.email
    if (data.status !== undefined)
      updateData.status = statusMap[data.status]
    if (data.subscriptionPlan !== undefined)
      updateData.subscriptionPlan = data.subscriptionPlan
    if (data.apiCallsLimit !== undefined)
      updateData.apiCallsLimit = data.apiCallsLimit

    await db.user.where({ id }).update(updateData)

    return c.json({
      data: { message: 'User updated successfully' },
    })
  })

  /** 删除用户 */
  .delete('/:id', authAd(), async (c): Promise<HonoResponse<{ data: ResAdminDeleteUser }>> => {
    const id = c.req.param('id')

    const user = await db.user.findOptional(id)
    if (!user) {
      throw new Exception.NotFoundException('User not found')
    }

    await db.user.where({ id }).delete()

    return c.json({
      data: { message: 'User deleted successfully' },
    })
  })

  /** 获取用户统计 */
  .get('/stats', authAd(), async (c): Promise<HonoResponse<{ data: ResAdminUserStats }>> => {
    const startDate = c.req.query('startDate')
    const endDate = c.req.query('endDate')

    const start = startDate ? new Date(startDate) : subDays(new Date(), 30)
    const end = endDate ? new Date(endDate) : new Date()

    const [
      totalUsers,
      newUsers,
      activeUsers,
      paidUsers,
    ] = await Promise.all([
      db.user.count(),
      db.user
        .where({
          createdAt: {
            gte: start,
            lte: end,
          },
        })
        .count(),
      db.user.where({ status: 1 }).count(), // Active
      db.user
        .where({
          subscriptionPlan: {
            in: ['starter', 'pro', 'business'],
          },
        })
        .count(),
    ])

    // 用户增长趋势（按天统计）
    const userGrowth = await db.user
      .where({
        createdAt: {
          gte: start,
          lte: end,
        },
      })
      .select('createdAt')

    // 按日期分组统计
    const growthMap = new Map<string, number>()
    userGrowth.forEach((user) => {
      const date = user.createdAt.toISOString().split('T')[0]!
      const currentCount = growthMap.get(date) ?? 0
      growthMap.set(date, currentCount + 1)
    })

    const userGrowthArray = Array.from(growthMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))

    return c.json({
      data: {
        totalUsers,
        newUsers,
        activeUsers,
        paidUsers,
        userGrowth: userGrowthArray,
      },
    })
  })
