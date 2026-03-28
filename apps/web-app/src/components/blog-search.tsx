import { SearchInput } from '@/components/ui/search-input'

export function BlogSearch({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <SearchInput
            value={value}
            onChange={onChange}
            placeholder="Search articles, insights, guides..."
          />
        </div>
      </div>
    </section>
  )
}
