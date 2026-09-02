import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { showRoutes } from 'hono/dev'
import { logger } from 'hono/logger'
import { setupUploadRoutes } from './app.upload'
import { ENV } from './env'
import { routes } from './http'
import { cronService } from './services/cron'
import { errorHandler } from './utils'

const app = new Hono()

app.use('/*', cors({
  origin: '*',
  exposeHeaders: ['X-Vercel-AI-Data-Stream'],
}))
app.route('/', routes)

app.get('/', (c) => {
  console.warn('Hello World')
  return c.json({
    message: 'Hello World',
  })
})

app.get('/cron-status', (c) => {
  return c.json(cronService.getStatus())
})

app.post('/cron-start', (c) => {
  cronService.start()
  return c.json({ message: 'Cron scheduler started', status: cronService.getStatus() })
})

app.post('/cron-stop', (c) => {
  cronService.stop()
  return c.json({ message: 'Cron scheduler stopped', status: cronService.getStatus() })
})

setupUploadRoutes(app)

app.use(logger())
app.onError(errorHandler)

if (ENV.APP_STAGE === 'dev') {
  // eslint-disable-next-line no-console
  console.log(`server: localhost:${ENV.PORT}`)
  showRoutes(app)
}

export const App = app

// cronService.start()

if (ENV.APP_STAGE === 'prod') {
  Bun.serve({
    fetch: app.fetch,
    port: ENV.PORT,
  })
}

export default {
  port: ENV.PORT,
  fetch: app.fetch,
}
