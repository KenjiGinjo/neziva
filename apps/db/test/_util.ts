import { expect } from 'bun:test'

export function expectCloseToDate(d1?: Date | null, d2?: Date | null, ms = 1000) {
  expect(d1).toBeDate()
  expect(d2).toBeDate()
  expect(Math.abs((d1 as Date).valueOf() - (d2 as Date).valueOf())).toBeLessThan(ms)
}

export function expectNotCloseToDate(d1?: Date | null, d2?: Date | null, ms = 1000) {
  expect(d1).toBeDate()
  expect(d2).toBeDate()
  expect(Math.abs((d1 as Date).valueOf() - (d2 as Date).valueOf())).toBeGreaterThanOrEqual(ms)
}
