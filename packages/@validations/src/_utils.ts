import { z } from 'zod'

export const vIp = z.string().ip({ message: 'IP address format is incorrect' })

export const vId = z.string().cuid2('resource ID format is incorrect')

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
