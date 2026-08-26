import { Compass, Hammer, Lightbulb, Rocket } from 'lucide-react'
import { useI18n } from '@/i18n'

const ICONS = [Lightbulb, Compass, Hammer, Rocket] as const
const COLORS = ['#4F46E5', '#7C3AED', '#F97316', '#10B981'] as const

export function AboutApproach() {
  const { m } = useI18n()

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">{m.about.approachTitle}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{m.about.approachSubtitle}</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#10B981] transform -translate-y-1/2" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {m.about.approachSteps.map((item, i) => {
              const Icon = ICONS[i]
              const color = COLORS[i]
              return (
                <div key={item.title} className="bg-white rounded-2xl p-8 shadow-lg hover:-translate-y-1 transition-all border-t-4" style={{ borderTopColor: color }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto" style={{ backgroundColor: color }}>
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-center">{item.description}</p>
                  <div className="mt-6 flex justify-center">
                    <Icon className="h-8 w-8" style={{ color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
