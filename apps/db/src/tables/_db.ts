import { orchidORM } from 'orchid-orm'
import { ENV } from '../env'
import { TableAdmin } from './admin'
import { TableBlogPost } from './blog-post'
import { TableCache } from './cache'
import { TableContactForm } from './contact-form'
import { TableErrorLog } from './error-log'
import { TableNewsletter } from './newsletter'

export const db = orchidORM(
  {
    log: ENV.DATABASE_LOG,
    databaseURL: ENV.DATABASE_URL,
  },
  {
    admin: TableAdmin,
    cache: TableCache,
    errorLog: TableErrorLog,
    contactForm: TableContactForm,
    blogPost: TableBlogPost,
    newsletter: TableNewsletter,
  },
)
