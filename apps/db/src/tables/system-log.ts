import { BaseTable } from './_base'
import { TableUser } from './user'
import { TableWorkflow } from './workflow'

export class TableSystemLog extends BaseTable {
  public override readonly table = 'system_log'

  public override columns = this.setColumns(t => ({
    id: t.cuid().primaryKey(),
    createdAt: t.createdAt(),

    level: t.string(), // info, warning, error
    message: t.text(),

    context: t.xJsonb().nullable(),

    userId: t.varchar().nullable(),
    workflowId: t.varchar().nullable(),
  }))

  public relations = {
    user: this.belongsTo(() => TableUser, {
      columns: ['userId'],
      references: ['id'],
    }),

    workflow: this.belongsTo(() => TableWorkflow, {
      columns: ['workflowId'],
      references: ['id'],
    }),
  }
}
