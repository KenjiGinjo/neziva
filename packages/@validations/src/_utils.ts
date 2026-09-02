import { z } from 'zod'

export const vIp = z.string().ip({ message: 'IP address format is incorrect' })

export const vId = z.string().min(1, 'resource ID is required')

/** Query 里的数字枚举（空字符串视为未传） */
export function zQueryIntEnum(e: Record<string, string | number>): z.ZodType<number | undefined> {
  const values = Object.values(e).filter((v): v is number => typeof v === 'number')
  return z.preprocess((val) => {
    if (val === undefined || val === null || val === '')
      return undefined
    const n = Number(val)
    return Number.isNaN(n) ? val : n
  }, z.number().refine(n => values.includes(n)).optional()) as z.ZodType<number | undefined>
}

export function vIds<Args extends string[]>(...ids: Args): z.ZodObject<{ [T in Args[number]]: z.ZodString }> {
  return z.object(ids.reduce((a, v) => ({ ...a, [v]: vId }), {})) as any
}
export function vStrings<Args extends string[]>(...strings: Args): z.ZodObject<{ [T in Args[number]]: z.ZodString }> {
  return z.object(strings.reduce((a, v) => ({ ...a, [v]: z.string() }), {})) as any
}

export const zPhone = z
  .string({
    required_error: '手机号不能为空',
    invalid_type_error: '手机号必须是字符串',
  })
  .regex(/^1[3-9]\d{9}$/, '手机号格式错误')
