import { generateCode } from './generate-code'

interface GenerateNoOptions {
  prefix: string
  recordCount?: () => Promise<number>
}

export async function generateNo({ prefix, recordCount }: GenerateNoOptions): Promise<string> {
  const date = new Date()

  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const sequence = (await recordCount?.() ?? 0 + 1).toString().padStart(4, '0')
  const random = generateCode({ length: 3 })

  return `${prefix}${year}${month}${day}${sequence}${random}`
}
