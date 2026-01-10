import type { DefaultColumnTypes, DefaultSchemaConfig } from 'orchid-orm'

import { createId } from '@paralleldrive/cuid2'
import { createBaseTable } from 'orchid-orm'

function cuid(t: DefaultColumnTypes<DefaultSchemaConfig>) {
  return () => t.varchar(36).default(() => createId())
}

function createdAt(t: DefaultColumnTypes<DefaultSchemaConfig>) {
  return () =>
    t
      .timestamps()
      .createdAt
      .default(() => new Date().toISOString())
      .asDate()
}

function updatedAt(t: DefaultColumnTypes<DefaultSchemaConfig>) {
  return () =>
    t
      .timestamps()
      .updatedAt
      .default(() => new Date().toISOString())
      .asDate()
}

function xDecimal(t: DefaultColumnTypes<DefaultSchemaConfig>) {
  return () => t.decimal(10, 2).parse(v => Number(v))
}

export const BaseTable = createBaseTable({
  snakeCase: true,

  columnTypes: t => ({
    ...t,

    xDecimal: xDecimal(t),

    xEnum: <T extends Record<any, any>>(_: T) =>
      t.smallint().asType(t => t<T[keyof T]>()),

    xEnumString: <T extends Record<any, any>>(_: T) =>
      t.string().asType(t => t<T[keyof T]>()),
    xJsonText: () =>
      t.jsonText().encode((v: Record<string, any> | any[]) => {
        if (typeof v !== 'object')
          throw new Error('Invalid value for JSON column')

        return JSON.stringify(v)
      }),

    xTimestamp: () => t.timestamp().asDate(),
    xJsonb: () => t.json(),
    createdAt: createdAt(t),
    updatedAt: updatedAt(t),
    cuid: cuid(t),

    baseColumns: () => {
      return {
        id: cuid(t)().primaryKey(),
        createdAt: createdAt(t)(),
        updatedAt: updatedAt(t)(),
      }
    },
  }),
})
