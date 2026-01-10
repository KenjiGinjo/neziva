import { createRepo } from 'orchid-orm'
import { db } from '../tables'

export const systemLog = createRepo(db.systemLog, {})
