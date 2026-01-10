import { BaseTable } from './_base'
import { TableUser } from './user'

export class TableSubscription extends BaseTable {
  public override readonly table = 'subscription'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    userId: t.varchar(),

    subscriptionId: t.string().nullable().unique(), // Payment provider subscription ID

    plan: t.string(), // starter, pro, business
    status: t.string().default('active'), // active, canceled, expired, past_due

    currentPeriodStart: t.xTimestamp(),
    currentPeriodEnd: t.xTimestamp(),
    cancelAtPeriodEnd: t.boolean().default(false),
  }))

  public relations = {
    user: this.belongsTo(() => TableUser, {
      columns: ['userId'],
      references: ['id'],
    }),
  }
}
