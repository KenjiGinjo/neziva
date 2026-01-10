/* eslint-disable no-console */
import { faker } from '@faker-js/faker'
import { ds } from '../src'

export async function initInvoices(
  users: Awaited<ReturnType<typeof import('./users').initUsers>>,
  subscriptions: Awaited<ReturnType<typeof import('./subscriptions').initSubscriptions>>,
) {
  console.log('🌱 Seeding invoices...')

  const invoices = []

  // 为有订阅的用户创建发票记录
  for (const subscription of subscriptions) {
    const user = users.find(u => u.id === subscription.userId)
    if (!user)
      continue

    const invoiceCount = faker.number.int({ min: 1, max: 3 })

    for (let i = 0; i < invoiceCount; i++) {
      const status = i === invoiceCount - 1
        ? (subscription.status === 'active' ? 'paid' : 'pending')
        : 'paid'

      const invoice = await ds.invoice.createForSubscription({
        userId: user.id,
        subscriptionId: subscription.id,
        plan: subscription.plan as 'starter' | 'pro' | 'business',
        status,
        downloadUrl: status === 'paid'
          ? `https://example.com/invoices/${faker.string.uuid()}.pdf`
          : null,
      })

      invoices.push(invoice)
    }
  }

  console.log(`✅ Created ${invoices.length} invoices`)
  return invoices
}
