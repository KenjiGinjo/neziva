import { EnumBlogPostStatus } from '@neziva/enums'
import { BaseTable } from './_base'

export class TableBlogPost extends BaseTable {
  public override readonly table = 'blog_post'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    publishedAt: t.timestamp().nullable(),

    title: t.varchar(255),
    slug: t.varchar(255).unique(),
    content: t.text(),
    excerpt: t.text().nullable(),
    category: t.varchar(100),
    tags: t.json<string[]>().hasDefault(),
    author: t.varchar(100),
    readTime: t.smallint().default(0),
    views: t.integer().default(0),
    featured: t.boolean().default(false),
    status: t.xEnum(EnumBlogPostStatus).hasDefault(),
    coverImage: t.varchar(500).nullable(),
    seoTitle: t.varchar(255).nullable(),
    seoDesc: t.text().nullable(),
  }))
}
