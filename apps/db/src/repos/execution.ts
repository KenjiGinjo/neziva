import { createRepo } from 'orchid-orm'
import { db } from '../tables'

export const execution = createRepo(db.execution, {})
