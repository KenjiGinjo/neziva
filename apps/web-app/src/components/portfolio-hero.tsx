import { Briefcase } from 'lucide-react'

export function PortfolioHero() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
          <Briefcase className="h-5 w-5 text-[#4F46E5]" />
          <span className="text-sm font-semibold text-gray-700">Our Work</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Portfolio & Projects</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Explore our projects and see how we solve real-world problems with AI
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          These are personal projects showcasing our technical capabilities and innovative approaches
        </p>
      </div>
    </section>
  )
}
