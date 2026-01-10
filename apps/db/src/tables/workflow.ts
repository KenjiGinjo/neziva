import { BaseTable } from './_base'
import { TableApiCall } from './api-call'
import { TableExecution } from './execution'
import { TableSystemLog } from './system-log'
import { TableUser } from './user'

export class TableWorkflow extends BaseTable {
  public override readonly table = 'workflow'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    userId: t.varchar(),
    name: t.string(),
    description: t.text().nullable(),

    workflowData: t.xJsonb(), // { nodes: Node[], edges: Edge[] }

    status: t.string().default('draft'), // draft, active, paused, error

    executionCount: t.integer().default(0),
    successCount: t.integer().default(0),
    errorCount: t.integer().default(0),

    lastExecutedAt: t.xTimestamp().nullable(),
  }))

  public relations = {
    user: this.belongsTo(() => TableUser, {
      columns: ['userId'],
      references: ['id'],
    }),

    executions: this.hasMany(() => TableExecution, {
      columns: ['id'],
      references: ['workflowId'],
    }),

    apiCalls: this.hasMany(() => TableApiCall, {
      columns: ['id'],
      references: ['workflowId'],
    }),

    systemLogs: this.hasMany(() => TableSystemLog, {
      columns: ['id'],
      references: ['workflowId'],
    }),
  }
}
