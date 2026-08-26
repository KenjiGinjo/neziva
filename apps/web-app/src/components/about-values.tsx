import { GitBranch, Handshake, Wrench } from 'lucide-react'
import { useI18n } from '@/i18n'

const ICONS = [Handshake, Wrench, GitBranch] as const

export function AboutValues() {
  const { m } = useI18n()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">{m.about.valuesTitle}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{m.about.valuesSubtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {m.about.values.map((value, i) => {
            const Icon = ICONS[i]
            return (
              <div key={value.title} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6 hover:rotate-0 transition-transform">
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
