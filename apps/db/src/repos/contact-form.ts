import { createRepo } from 'orchid-orm'
import { db } from '../tables'

export const contactForm = createRepo(db.contactForm, {})
