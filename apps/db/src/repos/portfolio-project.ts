import { createRepo } from 'orchid-orm'
import { db } from '../tables'

const selectForDefault = db.portfolioProject.makeHelper(q => q.select(
  'id',
  'createdAt',
  'name',
  'slug',
  'type',
  'description',
  'tags',
  'image',
  'status',
  'demoUrl',
  'githubUrl',
  'problemStatement',
  'solutionOverview',
  'technicalHighlights',
  'results',
  'screenshots',
  'technologies',
  'featured',
))

export const portfolioProject = createRepo(db.portfolioProject, {
  queryMethods: {
    selectForDefault: q => selectForDefault(q),
    selectForList: (q, options?: { type?: string, tag?: string, featured?: boolean }) => {
      const { type, tag, featured } = options || {}
      const query = selectForDefault(q)
      const defaultWhere: Record<string, any> = {}

      if (type) {
        defaultWhere.type = type
      }

      if (tag) {
        defaultWhere.tags = { has: tag }
      }

      if (featured !== undefined) {
        defaultWhere.featured = featured
      }

      if (Object.keys(defaultWhere).length > 0) {
        return query.where(defaultWhere)
      }

      return query
    },
  },
})
