import { EnumBlogPostStatus } from '@neziva/enums'
import { BaseTable } from './_base'

export class TableBlogPost extends BaseTable {
  public override readonly table = 'blog_post'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    publishedAt: t.timestamp().nullable(),

    title: t.string(),
    slug: t.string().unique(),
    content: t.string(),
    excerpt: t.string().nullable(),
    category: t.string(),
    tags: t.array(t.text()).nullable(),
    author: t.string(),
    readTime: t.smallint(),
    views: t.integer(),
    featured: t.boolean(),
    status: t.xEnum(EnumBlogPostStatus).hasDefault(),
    coverImage: t.string().nullable(),
    seoTitle: t.string().nullable(),
    seoDesc: t.string().nullable(),
  }))
}
