import { Hash } from 'lucide-react'

const tags = [
  'MachineLearning',
  'Automation',
  'NLP',
  'CustomerService',
  'DataAnalytics',
  'AIStrategy',
  'BusinessIntelligence',
  'Chatbots',
  'PredictiveAnalytics',
  'AIImplementation',
  'ROI',
  'DigitalTransformation',
]

export function BlogTags() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Trending Tags</h2>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, i) => (
            <a
              key={i}
              href="#"
              className="px-6 py-3 bg-white border border-gray-300 rounded-full hover:border-[#4F46E5] hover:text-[#4F46E5] hover:shadow-md transition-all"
            >
              <Hash className="h-4 w-4 inline mr-1" />
              {tag}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
