import { BaseTable } from './_base'

export class TableBlogPost extends BaseTable {
  public override readonly table = 'blog_post'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    publishedAt: t.timestamp().nullable(),

    title: t.varchar(255),
    slug: t.varchar(255).unique(),
    content: t.text(),
    excerpt: t.text().nullable(), // 摘要
    category: t.varchar(100),
    tags: t.json().default(() => []), // 标签数组
    author: t.varchar(100),
    readTime: t.smallint().default(0), // 阅读时长（分钟）
    views: t.integer().default(0), // 浏览次数
    featured: t.boolean().default(false), // 是否精选
    status: t.smallint().default(0), // 0: 草稿, 1: 已发布, 2: 已归档
    coverImage: t.varchar(500).nullable(), // 封面图片URL
    seoTitle: t.varchar(255).nullable(), // SEO标题
    seoDesc: t.text().nullable(), // SEO描述
  }))
}
