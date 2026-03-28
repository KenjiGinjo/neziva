import { ArrowRight } from 'lucide-react'

export interface PaginationProps {
  total: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  className?: string
}

const MAX_VISIBLE_PAGES = 5

export function Pagination({ total, page, pageSize, onPageChange, className = '' }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  if (totalPages <= 1) return null

  const prevDisabled = page <= 1
  const nextDisabled = page >= totalPages

  function getPageNumbers() {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const half = Math.floor(MAX_VISIBLE_PAGES / 2)
    let start = Math.max(1, page - half)
    const end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1)
    if (end - start + 1 < MAX_VISIBLE_PAGES) {
      start = Math.max(1, end - MAX_VISIBLE_PAGES + 1)
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const pages = getPageNumbers()

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <button
        type="button"
        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
        disabled={prevDisabled}
        onClick={() => onPageChange(page - 1)}
      >
        <ArrowRight className="h-4 w-4 mr-2 rotate-180 inline" />
        <span className="hidden sm:inline">Previous</span>
      </button>
      {pages[0] > 1 && (
        <>
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {pages[0] > 2 && <span className="px-2 text-gray-500">...</span>}
        </>
      )}
      {pages.map(p => (
        <button
          key={p}
          type="button"
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            p === page
              ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white'
              : 'border border-gray-300 text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5]'
          }`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        type="button"
        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
        disabled={nextDisabled}
        onClick={() => onPageChange(page + 1)}
      >
        <span className="mr-2 hidden sm:inline">Next</span>
        <ArrowRight className="h-4 w-4 inline" />
      </button>
    </div>
  )
}
