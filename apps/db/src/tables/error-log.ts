import { EnumErrorLogType } from '@haole/enums'
import { BaseTable } from './_base'

export class TableErrorLog extends BaseTable {
  public override readonly table = 'error_log'

  public override columns = this.setColumns(t => ({
    id: t.cuid().primaryKey(),
    createdAt: t.createdAt(),
    type: t.xEnum(EnumErrorLogType),
    code: t.string(),
    detail: t.text(),
    path: t.text().nullable(),
    method: t.string().nullable(),
    query: t.json().nullable(),
    body: t.json().nullable(),
    headers: t.json().nullable(),
    stack: t.text().nullable(),
  }))
}
