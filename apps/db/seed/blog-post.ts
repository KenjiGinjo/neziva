import { db } from '../src'

const withheldSlugs = [
  'how-to-build-first-ai-app',
  'ai-customer-service-best-practices',
  'how-to-choose-ai-tools-for-your-business',
  '2026-ai-trends-for-business',
  'machine-learning-explained-beginners-guide',
  'ai-in-retail-roi-case-study',
]

/** Remove placeholder posts, including the fabricated retail case study. */
export async function initBlogPosts() {
  const removed: string[] = []
  for (const slug of withheldSlugs) {
    const existing = await db.blogPost.where({ slug }).takeOptional()
    if (!existing)
      continue
    await db.blogPost.where({ slug }).delete()
    removed.push(slug)
    console.warn(`  Removed placeholder blog post: ${slug}`)
  }
  return removed
}
