import { Hono } from 'hono'
import { authRoute } from './auth'
import { blog } from './blog'
import { contact } from './contact'
import { logs } from './logs'
import { newsletter } from './newsletter'
import { settings } from './settings'
import { stats } from './stats'

export const admin = new Hono()
  .basePath('/admin')
  .route('/', authRoute)
  .route('/', stats)
  .route('/', logs)
  .route('/', settings)
  .route('/', contact)
  .route('/', blog)
  .route('/', newsletter)
