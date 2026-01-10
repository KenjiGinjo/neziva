import { EnumUserStatus } from '@neziva/enums'
import { BaseTable } from './_base'
import { TableApiCall } from './api-call'
import { TableExecution } from './execution'
import { TableInvoice } from './invoice'
import { TableSubscription } from './subscription'
import { TableSystemLog } from './system-log'
import { TableWorkflow } from './workflow'

export class TableUser extends BaseTable {
  public override readonly table = 'user'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    username: t.string().nullable(),
    password: t.string().nullable(),

    googleId: t.string().nullable(),
    githubId: t.string().nullable(),

    firstName: t.string().nullable(),
    lastName: t.string().nullable(),

    nickname: t.string().nullable(),
    avatarUrl: t.string().nullable(),

    email: t.string().nullable(),
    emailVerifiedAt: t.xTimestamp().nullable(),
    phone: t.string().nullable(),
    phoneVerifiedAt: t.xTimestamp().nullable(),

    subscriptionPlan: t.string().default('free'),
    subscriptionStatus: t.string().default('active'),
    apiCallsUsed: t.integer().default(0),
    apiCallsLimit: t.integer().default(100),

    lastLoginAt: t.xTimestamp().nullable(),

    status: t.xEnum(EnumUserStatus).hasDefault(),
  }))

  public relations = {
    workflows: this.hasMany(() => TableWorkflow, {
      columns: ['id'],
      references: ['userId'],
    }),

    executions: this.hasMany(() => TableExecution, {
      columns: ['id'],
      references: ['userId'],
    }),

    subscriptions: this.hasMany(() => TableSubscription, {
      columns: ['id'],
      references: ['userId'],
    }),

    invoices: this.hasMany(() => TableInvoice, {
      columns: ['id'],
      references: ['userId'],
    }),

    apiCalls: this.hasMany(() => TableApiCall, {
      columns: ['id'],
      references: ['userId'],
    }),

    systemLogs: this.hasMany(() => TableSystemLog, {
      columns: ['id'],
      references: ['userId'],
    }),
  }
}
