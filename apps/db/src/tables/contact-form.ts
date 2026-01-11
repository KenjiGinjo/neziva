import { BaseTable } from './_base'

export class TableContactForm extends BaseTable {
  public override readonly table = 'contact_form'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    name: t.varchar(255),
    company: t.varchar(255).nullable(),
    email: t.varchar(255),
    phone: t.varchar(50).nullable(),
    projectType: t.varchar(50),
    description: t.text(),
    budget: t.varchar(50).nullable(),
    status: t.smallint().default(0), // 0: 未处理, 1: 已处理, 2: 已回复
    notes: t.text().nullable(), // 管理员备注
  }))
}
