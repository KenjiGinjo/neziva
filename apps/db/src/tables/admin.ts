import { BaseTable } from './_base'

export class TableAdmin extends BaseTable {
  public override readonly table = 'admin'

  public override columns = this.setColumns(t => ({
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
