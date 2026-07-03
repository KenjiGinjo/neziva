import { Briefcase } from 'lucide-react'

export function PortfolioHero() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
          <Briefcase className="h-5 w-5 text-[#4F46E5]" />
          <span className="text-sm font-semibold text-gray-700">Portfolio</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Our Work</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Neziva is a new studio — we don't have published case studies yet.
          Projects will appear here as we deliver them.
        </p>
      </div>
    </section>
  )
}
