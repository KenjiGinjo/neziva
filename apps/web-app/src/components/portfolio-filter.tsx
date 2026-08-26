import { useI18n } from '@/i18n'

export type PortfolioFilterId = 'all' | 'personal' | 'concept'

export function PortfolioFilter({
  selectedFilter,
  onFilterChange,
  projectCount,
}: {
  selectedFilter: PortfolioFilterId
  onFilterChange: (filter: PortfolioFilterId) => void
  projectCount: number
}) {
  const { m, fmt } = useI18n()
  const filters: { id: PortfolioFilterId, label: string }[] = [
    { id: 'all', label: m.portfolio.filterAll },
    { id: 'personal', label: m.portfolio.filterPersonal },
    { id: 'concept', label: m.portfolio.filterConcept },
  ]

  return (
    <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-gray-700">{m.portfolio.filterBy}</span>
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{fmt(m.portfolio.projectCount, { n: projectCount })}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
