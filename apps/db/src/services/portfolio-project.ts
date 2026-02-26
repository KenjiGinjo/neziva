import { dr } from '../repos'

export const portfolioProject = {
  getRelated: async (options: {
    id: string
    type: string
    tags: string[]
    limit: number
  }) => {
    const { id, type, tags, limit } = options

    const defaultWhere = {
      id: { not: id },
    }
    const orTags = tags.map(tag => ({ ...defaultWhere, tags: { has: tag } }))
    const orConditions = [
      { ...defaultWhere, type },
      ...orTags,
    ]
    const related = await dr.portfolioProject.selectForDefault()
      .orWhere(...orConditions)
      .order({ createdAt: 'DESC' })
      .limit(limit)
      .all()

    return related
  },
}
