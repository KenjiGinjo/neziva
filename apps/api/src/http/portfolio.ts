import type { ResPagination, ResPortfolioProjectDetail, ResPortfolioProjectList } from '@neziva/interfaces'
import type { HonoResponse } from '../types'
import { vIds, vPortfolioProjectsQuery, vPortfolioRelated } from '@neziva/validations'
import { dr, ds } from 'db'
import { Hono } from 'hono'
import { pagination, validate } from '../utils'

export const portfolioRoute = new Hono()
  .basePath('/portfolio')

  /** 获取项目列表 */
  .get('/projects', pagination(), validate('query', vPortfolioProjectsQuery), async (c): Promise<HonoResponse<{ data: ResPortfolioProjectList[], pagination: ResPagination }>> => {
    const { where } = c.get('page')
    const { type, tag, featured } = c.req.valid('query')
    const query = dr.portfolioProject.selectForList({
      type,
      tag,
      featured,
    })
      .limit(where.limit)
      .offset(where.offset)

    const total = await query.count()
    const data = await query.order({ createdAt: 'DESC' })

    return c.json({
      data,
      pagination: {
        total,
        limit: where.limit,
        offset: where.offset,
      },
    })
  })

  /** 获取项目详情 */
  .get('/projects/:id', validate('param', vIds('id')), async (c): Promise<HonoResponse<{ data: ResPortfolioProjectDetail }>> => {
    const { id } = c.req.valid('param')

    const data = await dr.portfolioProject.find(id).selectForDefault()

    return c.json({ data })
  })

  /** 获取相关项目 */
  .get('/related/:id', validate('param', vIds('id')), validate('query', vPortfolioRelated), async (c): Promise<HonoResponse<{ data: ResPortfolioProjectDetail[] }>> => {
    const { id } = c.req.valid('param')
    const { limit } = c.req.valid('query')

    const project = await dr.portfolioProject.find(id).selectForDefault()

    const data = await ds.portfolioProject.getRelated({
      id,
      type: project.type,
      tags: Array.isArray(project.tags) ? project.tags : [],
      limit,
    })

    return c.json({ data })
  })
