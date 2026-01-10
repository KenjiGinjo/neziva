import type { z, ZodDiscriminatedUnion, ZodIntersection, ZodObject, ZodRawShape, ZodUnion } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import merge from 'lodash.merge'
import { pick, shake } from 'radash'
import { useCallback, useMemo, useState } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { ZodFirstPartyTypeKind } from 'zod'

type SchemaObject = ZodObject<ZodRawShape>
type SchemaUnion = ZodUnion<[SchemaObject, ...SchemaObject[]]>
type SchemaDiscriminatedUnion = ZodDiscriminatedUnion<any, [SchemaObject, ...SchemaObject[]]>
type SchemaIntersection = ZodIntersection<any, any>
type SchemaInput = SchemaObject | SchemaUnion | SchemaDiscriminatedUnion | SchemaIntersection

function getSchemaShape(schema: SchemaInput): ZodRawShape {
  const zodType = schema._def.typeName as ZodFirstPartyTypeKind

  switch (zodType) {
    case ZodFirstPartyTypeKind.ZodObject: {
      return (schema as SchemaObject).shape
    }
    case ZodFirstPartyTypeKind.ZodUnion:
    case ZodFirstPartyTypeKind.ZodDiscriminatedUnion: {
      return (schema as SchemaUnion).options.reduce((acc, cur) => ({ ...acc, ...cur.shape }), {})
    }
    case ZodFirstPartyTypeKind.ZodIntersection: {
      const leftShape = getSchemaShape((schema as SchemaIntersection)._def.left)
      const rightShape = getSchemaShape((schema as SchemaIntersection)._def.right)
      return { ...leftShape, ...rightShape }
    }
    default:
      throw new Error(`Unsupported Zod Type: ${zodType}`)
  }
}

export function useSchemaPatch<T extends SchemaInput>(schema: T, data?: Record<string, any>) {
  const form = useForm({
    defaultValues: data,
    resolver: zodResolver(schema),
  })
  const keys = useMemo(() => Object.keys(getSchemaShape(schema)), [schema])
  const [_dto, _setDto] = useState<z.infer<typeof schema>>(pick(data || {}, keys))

  const _patch = useCallback(
    (v: any) => {
      _setDto(dto => shake(pick(merge(dto, v), keys)))
    },
    [keys],
  )

  return {
    form: form as unknown as UseFormReturn<z.infer<typeof schema>>,
    dto: _dto,
    patch: _patch,
  }
}
