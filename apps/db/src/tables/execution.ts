import { BaseTable } from './_base'
import { TableApiCall } from './api-call'
import { TableUser } from './user'
import { TableWorkflow } from './workflow'

export class TableExecution extends BaseTable {
  public override readonly table = 'execution'

  public override columns = this.setColumns(t => ({
    id: t.cuid().primaryKey(),
    createdAt: t.createdAt(),

    workflowId: t.varchar(),
    userId: t.varchar(),

    status: t.string().default('pending'), // pending, running, completed, failed, canceled

    startedAt: t.xTimestamp(),
    completedAt: t.xTimestamp().nullable(),
    durationMs: t.integer().nullable(),

    inputData: t.xJsonb().nullable(),
    outputData: t.xJsonb().nullable(),

    errorMessage: t.text().nullable(),
    logs: t.text().nullable(),
  }))

  public relations = {
    workflow: this.belongsTo(() => TableWorkflow, {
      columns: ['workflowId'],
      references: ['id'],
    }),

    user: this.belongsTo(() => TableUser, {
      columns: ['userId'],
      references: ['id'],
    }),

    apiCalls: this.hasMany(() => TableApiCall, {
      columns: ['id'],
      references: ['executionId'],
    }),
  }
}
