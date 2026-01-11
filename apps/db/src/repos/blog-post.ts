import { createRepo } from 'orchid-orm'
import { db } from '../tables'

export const blogPost = createRepo(db.blogPost, {})
