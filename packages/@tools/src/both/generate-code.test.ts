import { describe, expect, test } from 'bun:test'
import { generateCode } from './generate-code'

describe('generateCode', () => {
  test('normal cases', async () => {
    expect(generateCode({ length: 1 })).toHaveLength(1)
    expect(generateCode({ length: 2 })).toHaveLength(2)
    expect(generateCode({ length: 3 })).toHaveLength(3)
    expect(generateCode({ length: 4 })).toHaveLength(4)
    expect(generateCode({ length: 5 })).toHaveLength(5)
    expect(generateCode({ length: 6 })).toHaveLength(6)
    expect(generateCode({ length: 7 })).toHaveLength(7)
    expect(generateCode({ length: 8 })).toHaveLength(8)
    expect(generateCode({ length: 9 })).toHaveLength(9)
    expect(generateCode({ length: 10 })).toHaveLength(10)
    expect(generateCode({ length: 11 })).toHaveLength(11)
    expect(generateCode({ length: 12 })).toHaveLength(12)
    expect(generateCode({ length: 13 })).toHaveLength(13)
    expect(generateCode({ length: 14 })).toHaveLength(14)
    expect(generateCode({ length: 15 })).toHaveLength(15)
    expect(generateCode({ length: 16 })).toHaveLength(16)
    expect(generateCode({ length: 17 })).toHaveLength(17)
    expect(generateCode({ length: 18 })).toHaveLength(18)
  })
  test('error cases', async () => {
    expect(() => generateCode({ length: 0 })).toThrow()
    expect(() => generateCode({ length: 19 })).toThrow()
  })
})
