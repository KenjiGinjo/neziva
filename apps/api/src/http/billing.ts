import type { ResCancelSubscription, ResCreateSubscription, ResInvoices, ResSubscription, ResUsage } from '@haole/interfaces'
import type { HonoResponse } from '../types'
import { vCreateSubscription } from '@haole/validations'
import { addMonths } from 'date-fns'
import { db, ds } from 'db'
import { Hono } from 'hono'
import { ENV } from '../env'
import { type Auth, auth } from '../middleware/auth'
import { validate } from '../utils'
import { pagination } from '../utils/pagination'

export const billingRoute = new Hono<Auth>()
  .basePath('/billing')

  /** 获取订阅信息 */
  .get('/subscription', auth(), async (c): Promise<HonoResponse<{ data: ResSubscription }>> => {
    const user = c.get('user')

    const subscription = await ds.subscription.findActiveByUserId(user.id)

    if (!subscription) {
      return c.json({
        data: {
          plan: user.subscriptionPlan,
          status: user.subscriptionStatus,
          currentPeriodStart: null,
          currentPeriodEnd: null,
          cancelAtPeriodEnd: false,
        },
      })
    }

    return c.json({
      data: {
        plan: subscription.plan,
        status: subscription.status,
        currentPeriodStart: subscription.currentPeriodStart,
        currentPeriodEnd: subscription.currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      },
    })
  })

  /** 创建订阅 */
  .post('/subscribe', auth(), validate('json', vCreateSubscription), async (c): Promise<HonoResponse<{ data: ResCreateSubscription }>> => {
    const user = c.get('user')
    const { plan, paymentMethod } = c.req.valid('json')

    // TODO: 集成支付网关 (PayPal/Stripe)
    // 这里应该创建支付会话并返回 checkout URL

    const now = new Date()
    const currentPeriodStart = now
    const currentPeriodEnd = addMonths(now, 1)

    // 创建订阅记录（实际应该等支付成功后再创建）
    const subscription = await ds.subscription.create({
      userId: user.id,
      plan,
      currentPeriodStart,
      currentPeriodEnd,
    })

    // 返回模拟的 checkout URL
    const checkoutUrl = `${ENV.URI_CLIENT}/billing/checkout?subscriptionId=${subscription.id}&paymentMethod=${paymentMethod}`

    return c.json({
      data: {
        checkoutUrl,
      },
    })
  })

  /** 取消订阅 */
  .post('/cancel', auth(), async (c): Promise<HonoResponse<{ data: ResCancelSubscription }>> => {
    const user = c.get('user')

    await ds.subscription.cancel(user.id, true) // cancelAtPeriodEnd = true

    return c.json({
      data: { message: 'Subscription will be canceled at the end of the current period' },
    })
  })

  /** 获取使用量 */
  .get('/usage', auth(), async (c): Promise<HonoResponse<{ data: ResUsage }>> => {
    const user = c.get('user')

    // 获取当前订阅周期
    const subscription = await ds.subscription.findActiveByUserId(user.id)
    const periodStart = subscription?.currentPeriodStart || new Date()
    const periodEnd = subscription?.currentPeriodEnd || addMonths(new Date(), 1)

    // 统计工作流执行次数
    const workflowExecutions = await db.execution
      .where({
        userId: user.id,
        createdAt: {
          gte: periodStart,
          lte: periodEnd,
        },
      })
      .count()

    return c.json({
      data: {
        apiCallsUsed: user.apiCallsUsed,
        apiCallsLimit: user.apiCallsLimit,
        workflowExecutions,
        periodStart,
        periodEnd,
      },
    })
  })

  /** 获取账单历史 */
  .get('/invoices', auth(), pagination(), async (c): Promise<HonoResponse<{ data: ResInvoices }>> => {
    const user = c.get('user')
    const { where } = c.get('page')

    const [items, total] = await Promise.all([
      db.invoice
        .where({ userId: user.id })
        .order({ createdAt: 'DESC' })
        .limit(where.limit)
        .offset(where.offset)
        .select('id', 'amount', 'currency', 'status', 'createdAt', 'downloadUrl'),
      db.invoice.where({ userId: user.id }).count(),
    ])

    return c.json({
      data: {
        items,
        total,
      },
    })
  })
