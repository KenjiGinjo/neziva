import { ArrowRight, Briefcase, Code, TrendingUp, Wrench } from 'lucide-react'

const topics = [
  { name: 'AI Trends', icon: TrendingUp, count: 24, color: 'from-[#4F46E5] to-[#7C3AED]' },
  { name: 'Technical Guides', icon: Code, count: 18, color: 'from-[#7C3AED] to-[#4F46E5]' },
  { name: 'Case Studies', icon: Briefcase, count: 15, color: 'from-[#10B981] to-green-600' },
  { name: 'Tools & Resources', icon: Wrench, count: 12, color: 'from-[#F97316] to-orange-600' },
]

export function BlogTopics() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Browse by Topic</h2>
          <p className="text-xl text-gray-600">Explore articles organized by your interests</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, i) => {
            const Icon = topic.icon
            return (
              <div
                key={i}
                className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{topic.name}</h3>
                <p className="text-gray-600 mb-4">Latest developments and predictions</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {topic.count}
                    {' '}
                    articles
                  </span>
                  <ArrowRight className="h-5 w-5 text-[#4F46E5] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
