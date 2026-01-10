import { BaseTable } from './_base'
import { TableExecution } from './execution'
import { TableUser } from './user'
import { TableWorkflow } from './workflow'

export class TableApiCall extends BaseTable {
  public override readonly table = 'api_call'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    userId: t.varchar(),

    workflowId: t.varchar().nullable(),
    executionId: t.varchar().nullable(),

    provider: t.string(), // openai, anthropic, google
    model: t.string(),

    promptTokens: t.integer().nullable(),
    completionTokens: t.integer().nullable(),
    costUsd: t.decimal(10, 6).nullable(),

    status: t.string().default('success'), // success, error
    errorMessage: t.text().nullable(),
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

    execution: this.belongsTo(() => TableExecution, {
      columns: ['executionId'],
      references: ['id'],
    }),
  }
}
