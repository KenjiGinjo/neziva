import { useState } from 'react'
import { PortfolioFilter, type PortfolioFilterId } from '@/components/portfolio-filter'
import { PortfolioGrid } from '@/components/portfolio-grid'
import { PortfolioHero } from '@/components/portfolio-hero'
import { Pagination } from '@/components/ui/pagination'
import { $qc } from '@/query-client'

const FILTER_TYPE_MAP: Record<PortfolioFilterId, string | undefined> = {
  all: undefined,
  personal: 'Personal Project',
  concept: 'Concept Validation',
}

const PAGE_SIZE = 12

export function PagePortfolio() {
  const [selectedFilter, setSelectedFilter] = useState<PortfolioFilterId>('all')
  const [page, setPage] = useState(1)
  const typeFilter = FILTER_TYPE_MAP[selectedFilter]

  const { data, isLoading } = $qc.portfolio.projects.$get.useQuery({
    query: {
      type: typeFilter,
      page,
      pageSize: PAGE_SIZE,
    },
  })

  const projects = data?.body?.data ?? []
  const projectCount = data?.body?.pagination?.total ?? 0

  return (
    <div className="bg-white">
      <PortfolioHero />
      {projectCount > 0 && (
        <PortfolioFilter
          selectedFilter={selectedFilter}
          onFilterChange={(f) => {
            setSelectedFilter(f)
            setPage(1)
          }}
          projectCount={projectCount}
        />
      )}
      <PortfolioGrid
        projects={projects}
        isLoading={isLoading}
      />
      {projectCount > PAGE_SIZE && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <Pagination
              total={projectCount}
              page={page}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </div>
        </section>
      )}
    </div>
  )
}
