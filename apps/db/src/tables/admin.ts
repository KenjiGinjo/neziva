import { BaseTable } from './_base'

export class TableAdmin extends BaseTable {
  readonly table = 'admin'

  columns = this.setColumns(t => ({
    ...t.baseColumns(),

    username: t.string().unique(),
    password: t.string(),
    nickname: t.string().nullable(),
    avatar: t.string().nullable(),
    phone: t.string().nullable(),
    email: t.string().nullable(),
    status: t.smallint().default(0),

    role: t.json<string[]>().hasDefault(),
  }))
}
