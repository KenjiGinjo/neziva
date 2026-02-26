import { BaseTable } from './_base'

export class TablePortfolioProject extends BaseTable {
  public override readonly table = 'portfolio_project'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    name: t.string(),
    slug: t.string().unique(),
    type: t.string(),
    description: t.string(),
    tags: t.array(t.text()).nullable(),
    image: t.string(),
    status: t.array(t.text()).nullable(),
    demoUrl: t.string().nullable(),
    githubUrl: t.string().nullable(),
    problemStatement: t.string().nullable(),
    solutionOverview: t.string().nullable(),
    technicalHighlights: t.xJsonb().nullable(),
    results: t.xJsonb().nullable(),
    screenshots: t.array(t.text()).nullable(),
    technologies: t.array(t.text()).nullable(),
    featured: t.boolean().default(false),
  }))
}
