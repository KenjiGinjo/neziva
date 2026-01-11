import { createRepo } from 'orchid-orm'
import { db } from '../tables'

export const newsletter = createRepo(db.newsletter, {})
