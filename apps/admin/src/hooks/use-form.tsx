'use client'
import type { DefaultValues, FieldValues } from 'react-hook-form'
import type { ZodSchema } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

function generateDefaultValues<T extends FieldValues>(schema: ZodSchema): DefaultValues<T> {
  const defaultValues: Partial<Record<keyof T, any>> = {}
  const shape = (schema as any)._def.shape()

  for (const key in shape) {
    defaultValues[key as keyof T] = ''
  }

  return defaultValues as DefaultValues<T>
}

export function useForm<T extends FieldValues>(schema: ZodSchema, defaultValues?: DefaultValues<T>) {
  const finalDefaultValues = React.useMemo(() => defaultValues || generateDefaultValues<T>(schema), [schema, defaultValues])

  return useReactHookForm<T>({
    resolver: zodResolver(schema),
    defaultValues: finalDefaultValues,
  })
}
