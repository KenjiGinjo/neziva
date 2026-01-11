import { BaseTable } from './_base'

export class TableNewsletter extends BaseTable {
  public override readonly table = 'newsletter'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    email: t.varchar(255).unique(),
    status: t.smallint().default(0), // 0: 待验证, 1: 已订阅, 2: 已退订
    verifiedAt: t.timestamp().nullable(), // 验证时间
    unsubscribedAt: t.timestamp().nullable(), // 退订时间
    source: t.varchar(100).nullable(), // 订阅来源（如：homepage, blog, etc.）
  }))
}
