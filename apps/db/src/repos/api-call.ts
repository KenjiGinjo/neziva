import { createRepo } from 'orchid-orm'
import { db } from '../tables'

export const apiCall = createRepo(db.apiCall, {})
