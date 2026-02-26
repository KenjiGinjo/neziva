export interface ResPortfolioProjectList {
  id: string
  createdAt: string
  name: string
  slug: string
  type: string
  description: string
  tags: string[] | null
  image: string
  status: string[] | null
  demoUrl: string | null
  githubUrl: string | null
  featured: boolean
}

export interface ITechnicalHighlight {
  title: string
  description: string
}

export interface IPortfolioProjectResult {
  title: string
  value?: string
}

export interface ResPortfolioProjectDetail extends ResPortfolioProjectList {
  problemStatement: string | null
  solutionOverview: string | null
  technicalHighlights: ITechnicalHighlight[] | null
  results: IPortfolioProjectResult[] | null
  screenshots: string[] | null
  technologies: string[] | null
}
