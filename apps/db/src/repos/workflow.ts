import { createRepo } from 'orchid-orm'
import { db } from '../tables'

export const workflow = createRepo(db.workflow, {})
