import { Briefcase } from 'lucide-react'
import { useI18n } from '@/i18n'

export function PortfolioHero() {
  const { m } = useI18n()
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
          <Briefcase className="h-5 w-5 text-[#4F46E5]" />
          <span className="text-sm font-semibold text-gray-700">{m.portfolio.heroBadge}</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">{m.portfolio.heroTitle}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{m.portfolio.heroSubtitle}</p>
      </div>
    </section>
  )
}
