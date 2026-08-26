import { BarChart3, Bot, FileText, Megaphone, MessageSquare, Sparkles } from 'lucide-react'
import { useI18n } from '@/i18n'

const ICONS = [Megaphone, BarChart3, MessageSquare, Bot, FileText, Sparkles] as const

export function AboutIndustries() {
  const { m } = useI18n()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">{m.about.industriesTitle}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{m.about.industriesSubtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {m.about.industries.map((industry, i) => {
            const Icon = ICONS[i]
            return (
              <div
                key={industry.name}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:-translate-y-1 transition-all border border-blue-200"
              >
                <div className="w-14 h-14 bg-[#4F46E5] rounded-xl flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{industry.name}</h3>
                <p className="text-gray-700">{industry.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
