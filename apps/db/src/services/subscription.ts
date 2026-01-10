import type { PlanType } from '@haole/constants'
import { PLAN_LIMITS } from '@haole/constants'
import { Exception } from '@haole/tools/exception'
import { db } from '../tables'

export const subscription = {

  getPlanPrice: (plan: PlanType): number => {
    const price = PLAN_LIMITS[plan]?.price
    if (price === undefined) {
      throw new Exception.BadRequestException('Invalid plan')
    }
    return price
  },

  getApiCallsLimitByPlan: (plan: PlanType): number => {
    const apiCallsLimit = PLAN_LIMITS[plan]?.apiCallsLimit
    if (apiCallsLimit === undefined) {
      throw new Exception.BadRequestException('Invalid plan')
    }
    return apiCallsLimit
  },

  create: async ({
    userId,
    subscriptionId,
    plan,
    currentPeriodStart,
    currentPeriodEnd,
  }: {
    userId: string
    subscriptionId?: string
    plan: 'starter' | 'pro' | 'business'
    currentPeriodStart: Date
    currentPeriodEnd: Date
  }) => {
    // Cancel existing active subscriptions
    await db.subscription
      .where({ userId, status: 'active' })
      .update({ status: 'canceled' })

    const subscription = await db.subscription.create({
      userId,
      subscriptionId,
      plan,
      status: 'active',
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd: false,
    })

    // Update user subscription info
    await db.user.where({ id: userId }).update({
      subscriptionPlan: plan,
      subscriptionStatus: 'active',
    })

    return subscription
  },

  findActiveByUserId: async (userId: string) => {
    const subscription = await db.subscription
      .where({ userId, status: 'active' })
      .takeOptional()

    return subscription
  },

  cancel: async (userId: string, cancelAtPeriodEnd: boolean = false) => {
    const sub = await subscription.findActiveByUserId(userId)

    if (!sub) {
      throw new Exception.NotFoundException('Active subscription not found')
    }

    const updated = await db.subscription.where({ id: sub.id }).update({
      cancelAtPeriodEnd,
      ...(cancelAtPeriodEnd ? {} : { status: 'canceled' }),
    })

    if (!cancelAtPeriodEnd) {
      await db.user.where({ id: userId }).update({
        subscriptionStatus: 'canceled',
      })
    }

    return updated
  },

  updateStatus: async (id: string, status: 'active' | 'canceled' | 'expired' | 'past_due') => {
    const subscription = await db.subscription.where({ id }).take()
    if (!subscription) {
      throw new Exception.NotFoundException('Subscription not found')
    }

    const updated = await db.subscription.where({ id }).update({ status })

    // Update user subscription status
    await db.user.where({ id: subscription.userId }).update({
      subscriptionStatus: status === 'active' ? 'active' : 'canceled',
    })

    return updated
  },

  createForPlan: async ({
    userId,
    plan,
    status = 'active',
    currentPeriodStart,
    currentPeriodEnd,
    subscriptionId,
    cancelAtPeriodEnd = false,
  }: {
    userId: string
    plan: 'starter' | 'pro' | 'business'
    status?: 'active' | 'canceled' | 'expired' | 'past_due'
    currentPeriodStart: Date
    currentPeriodEnd: Date
    subscriptionId?: string
    cancelAtPeriodEnd?: boolean
  }) => {
    const subscription = await db.subscription.create({
      userId,
      subscriptionId,
      plan,
      status,
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd,
    })

    return subscription
  },
}
