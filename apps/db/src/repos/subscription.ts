import { createRepo } from 'orchid-orm'
import { db } from '../tables'

export const subscription = createRepo(db.subscription, {})
