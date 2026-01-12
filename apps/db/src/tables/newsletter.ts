import { EnumNewsletterStatus } from '@neziva/enums'
import { BaseTable } from './_base'

export class TableNewsletter extends BaseTable {
  public override readonly table = 'newsletter'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    email: t.varchar(255).unique(),
    status: t.xEnum(EnumNewsletterStatus).hasDefault(),
    verifiedAt: t.timestamp().nullable(),
    unsubscribedAt: t.timestamp().nullable(),
    source: t.varchar(100).nullable(),
  }))
}
