const filters = ['All Projects', 'Personal Project', 'Concept Validation']

export function PortfolioFilter({
  selectedFilter,
  onFilterChange,
  projectCount,
}: {
  selectedFilter: string
  onFilterChange: (filter: string) => void
  projectCount: number
}) {
  return (
    <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-gray-700">Filter by:</span>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>
              {projectCount}
              {' '}
              Projects
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
