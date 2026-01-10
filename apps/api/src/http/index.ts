import { Hono } from 'hono'
import { admin } from './admin'
import { authRoute } from './auth'
import { billingRoute } from './billing'
import { executionRoute } from './execution'
import { systemRoute } from './system'
import { uploadRoute } from './upload'
import { userRoute } from './user'
import { workflowRoute } from './workflow'

export const route = new Hono()
  .route('/', admin)
  .route('/', authRoute)
  .route('/', userRoute)
  .route('/', workflowRoute)
  .route('/', executionRoute)
  .route('/', billingRoute)
  .route('/', systemRoute)
  .route('/', uploadRoute)
