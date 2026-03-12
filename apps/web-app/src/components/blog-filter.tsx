import { Tag } from 'lucide-react'

const categories = ['All', 'AI Trends', 'Technical Insights', 'Case Studies', 'Guides & Tutorials', 'Tools & Resources']

export function BlogFilter({
  selectedCategory,
  onCategoryChange,
}: {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}) {
  return (
    <section className="sticky top-[73px] bg-white border-b border-gray-200 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-lg'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <button className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-[#4F46E5] transition-colors">
            <Tag className="h-4 w-4" />
            <span className="text-sm font-medium">View by tag</span>
          </button>
        </div>
      </div>
    </section>
  )
}
