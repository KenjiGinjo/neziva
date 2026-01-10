import { apiCall } from './api-call'
import { execution } from './execution'
import { invoice } from './invoice'
import { subscription } from './subscription'
import { systemLog } from './system-log'
import { user } from './user'
import { workflow } from './workflow'

export const ds = {
  user,
  workflow,
  execution,
  subscription,
  invoice,
  systemLog,
  apiCall,
}
