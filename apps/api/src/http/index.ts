import { Hono } from 'hono'
import { admin } from './admin'
import { blogRoute } from './blog'
import { contactRoute } from './contact'
import { newsletterRoute } from './newsletter'
import { systemRoute } from './system'
import { uploadRoute } from './upload'

export const route = new Hono()
  .route('/', admin)
  .route('/', systemRoute)
  .route('/', uploadRoute)
  .route('/', contactRoute)
  .route('/', blogRoute)
  .route('/', newsletterRoute)
