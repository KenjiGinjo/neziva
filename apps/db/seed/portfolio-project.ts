import { db } from '../src'

const withheldSlugs = [
  'ai-workflow-automation-platform',
  'smart-data-analytics-tool',
  'ai-content-generation-assistant',
]

/** Remove placeholder projects that were never real client work. */
export async function initPortfolioProjects() {
  const removed: string[] = []
  for (const slug of withheldSlugs) {
    const existing = await db.portfolioProject.where({ slug }).takeOptional()
    if (!existing)
      continue
    await db.portfolioProject.where({ slug }).delete()
    removed.push(slug)
    console.warn(`  Removed placeholder portfolio project: ${slug}`)
  }
  return removed
}
