import { Hono } from 'hono'
import { admin } from './admin'
import { blogRoute } from './blog'
import { chatRoute } from './chat'
import { contactRoute } from './contact'
import { newsletterRoute } from './newsletter'
import { portfolioRoute } from './portfolio'
import { systemRoute } from './system'
import { uploadRoute } from './upload'

export const routes = new Hono()
  .route('/', admin)
  .route('/', systemRoute)
  .route('/', uploadRoute)
  .route('/', contactRoute)
  .route('/', chatRoute)
  .route('/', blogRoute)
  .route('/', portfolioRoute)
  .route('/', newsletterRoute)
