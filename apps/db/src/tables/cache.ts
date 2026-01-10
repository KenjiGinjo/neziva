import { BaseTable } from './_base'

export class TableCache extends BaseTable {
  public override readonly table = '__cache'

  public override columns = this.setColumns(t => ({
    key: t.varchar().primaryKey(),
    value: t.text(),
    expiresAt: t.timestamp().nullable(),
  }))
}
