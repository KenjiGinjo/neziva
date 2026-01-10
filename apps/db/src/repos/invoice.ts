import { createRepo } from 'orchid-orm'
import { db } from '../tables'

export const invoice = createRepo(db.invoice, {})
