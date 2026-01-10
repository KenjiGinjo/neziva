import { Hono } from 'hono'
import { authRoute } from './auth'
import { executions } from './executions'
import { logs } from './logs'
import { settings } from './settings'
import { stats } from './stats'
import { users } from './users'
import { workflows } from './workflows'

export const admin = new Hono()
  .basePath('/admin')
  .route('/', authRoute)
  .route('/', stats)
  .route('/', users)
  .route('/', workflows)
  .route('/', executions)
  .route('/', logs)
  .route('/', settings)
