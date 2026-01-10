import { orchidORM } from 'orchid-orm'
import { ENV } from '../env'
import { TableAdmin } from './admin'
import { TableApiCall } from './api-call'
import { TableCache } from './cache'
import { TableErrorLog } from './error-log'
import { TableExecution } from './execution'
import { TableInvoice } from './invoice'
import { TableSubscription } from './subscription'
import { TableSystemLog } from './system-log'
import { TableUser } from './user'
import { TableWorkflow } from './workflow'

export const db = orchidORM(
  {
    log: ENV.DATABASE_LOG,
    databaseURL: ENV.DATABASE_URL,
  },
  {
    admin: TableAdmin,
    user: TableUser,
    workflow: TableWorkflow,
    execution: TableExecution,
    subscription: TableSubscription,
    invoice: TableInvoice,
    systemLog: TableSystemLog,
    apiCall: TableApiCall,
    errorLog: TableErrorLog,
    cache: TableCache,
  },
)
