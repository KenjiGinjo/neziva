import { Exception } from '@haole/tools/exception'
import { db } from '../tables'

export const invoice = {
  create: async ({
    userId,
    subscriptionId,
    amount,
    currency = 'USD',
    status = 'pending',
  }: {
    userId: string
    subscriptionId?: string
    amount: number
    currency?: string
    status?: 'paid' | 'pending' | 'failed'
  }) => {
    const invoice = await db.invoice.create({
      userId,
      subscriptionId,
      amount,
      currency,
      status,
    })

    return invoice
  },

  findById: async (id: string, userId?: string) => {
    const invoice = await db.invoice
      .where({
        id,
        ...(userId && { userId }),
      })
      .takeOptional()

    if (!invoice) {
      throw new Exception.NotFoundException('Invoice not found')
    }

    return invoice
  },

  findByUserId: async (userId: string) => {
    const invoices = await db.invoice.where({ userId }).order({ createdAt: 'DESC' })

    return invoices
  },

  updateStatus: async (id: string, status: 'paid' | 'pending' | 'failed', downloadUrl?: string) => {
    const updated = await db.invoice.where({ id }).update({
      status,
      ...(downloadUrl && { downloadUrl }),
    })

    return updated
  },

  createForSubscription: async ({
    userId,
    subscriptionId,
    plan,
    status = 'pending',
    currency = 'USD',
    downloadUrl,
  }: {
    userId: string
    subscriptionId?: string
    plan: 'starter' | 'pro' | 'business'
    status?: 'paid' | 'pending' | 'failed'
    currency?: string
    downloadUrl?: string | null
  }) => {
    const PLAN_PRICES: Record<string, number> = {
      starter: 9.99,
      pro: 29.99,
      business: 99.99,
    }

    const amount = PLAN_PRICES[plan] || 0

    const invoice = await db.invoice.create({
      userId,
      subscriptionId,
      amount: amount.toString(),
      currency,
      status,
      downloadUrl: downloadUrl || null,
    })

    return invoice
  },
}
