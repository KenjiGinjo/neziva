import { EnumContactFormStatus } from '@neziva/enums'
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
    status: t.xEnum(EnumContactFormStatus).hasDefault(),
    notes: t.text().nullable(),
    source: t.varchar(20).default('form'),
  }))
}
