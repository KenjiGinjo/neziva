import { expect } from 'bun:test'

expect.extend({
  extendToEqualUnsortedArray(actual, result: any[]) {
    if (!Array.isArray(actual) || !Array.isArray(result)) {
      return {
        pass: false,
        message: () => `expected ${this.utils.printReceived(actual)} to be an array`,
      }
    }

    if (actual.length !== result.length) {
      return {
        pass: false,
        message: () => `expected ${this.utils.printReceived(actual)} to have length ${result.length}`,
      }
    }

    const pass
      = result.every(r => actual.some(a => this.equals(a, r)))
        && actual.every(a => result.some(r => this.equals(a, r)))

    return {
      pass,
      message: () => `expected ${this.utils.printReceived(actual)} to equal ${this.utils.printExpected(result)}`,
    }
  },
})

declare module 'bun:test' {
  interface Matchers {
    extendToEqualUnsortedArray: (result: any[]) => void
  }
}
