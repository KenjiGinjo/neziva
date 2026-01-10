import { BaseTable } from './_base'
import { TableUser } from './user'

export class TableInvoice extends BaseTable {
  public override readonly table = 'invoice'

  public override columns = this.setColumns(t => ({
    id: t.cuid().primaryKey(),
    createdAt: t.createdAt(),

    userId: t.varchar(),

    subscriptionId: t.string().nullable(),

    amount: t.decimal(10, 2),
    currency: t.string().default('USD'),

    status: t.string().default('pending'), // paid, pending, failed

    downloadUrl: t.string().nullable(),
  }))

  public relations = {
    user: this.belongsTo(() => TableUser, {
      columns: ['userId'],
      references: ['id'],
    }),
  }
}
