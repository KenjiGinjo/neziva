import { afterAll, afterEach, beforeAll, beforeEach, jest } from 'bun:test'
import { db, testTransaction } from '../src'
import './_extend'

beforeAll(async () => {
  await testTransaction.start(db)
})

beforeEach(async () => {
  await testTransaction.start(db)
})

afterEach(async () => {
  await testTransaction.rollback(db)
  jest.clearAllMocks()
})

afterAll(async () => {
  await testTransaction.close(db)
})
