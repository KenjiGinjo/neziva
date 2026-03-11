import { useState } from 'react'
import { PortfolioFilter } from '@/components/portfolio-filter'
import { PortfolioGrid } from '@/components/portfolio-grid'
import { PortfolioHero } from '@/components/portfolio-hero'
import { SectionCTA } from '@/components/section-cta'
import { SectionProcess } from '@/components/section-process'
import { SectionTechnologies } from '@/components/section-technologies'
import { $qc } from '@/query-client'

const FILTER_TYPE_MAP: Record<string, string | undefined> = {
  'All Projects': undefined,
  'Personal Project': 'Personal Project',
  'Concept Validation': 'Concept Validation',
}

export function PagePortfolio() {
  const [selectedFilter, setSelectedFilter] = useState('All Projects')
  const typeFilter = FILTER_TYPE_MAP[selectedFilter]

  const { data, isLoading } = $qc.portfolio.projects.$get.useQuery({
    query: {
      type: typeFilter,
      page: 1,
      pageSize: 50,
    },
  })

  const projects = data?.body?.data ?? []
  const projectCount = data?.body?.pagination?.total ?? 0

  return (
    <div className="bg-white">
      <PortfolioHero />
      <PortfolioFilter
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        projectCount={projectCount}
      />
      <PortfolioGrid
        projects={projects}
        isLoading={isLoading}
      />
      <SectionTechnologies variant="white" />
      <SectionProcess variant="gradient" />
      <SectionCTA variant="portfolio" />
    </div>
  )
}
