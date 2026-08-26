import { Code, HandHeart, Layers, Rocket } from 'lucide-react'
import { useI18n } from '@/i18n'

const ICONS = [Code, Layers, Rocket, HandHeart] as const
const GRADIENTS = [
  'from-[#4F46E5] to-[#7C3AED]',
  'from-[#7C3AED] to-[#10B981]',
  'from-[#F97316] to-red-500',
  'from-[#10B981] to-teal-500',
] as const

export function HomeWhyChoose() {
  const { m } = useI18n()

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {m.home.whyTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {m.home.whySubtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {m.home.whyItems.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <div key={item.title} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${GRADIENTS[i]} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
