import { CheckCircle2, Code, ListTodo, TrendingUp } from 'lucide-react'
import { useI18n } from '@/i18n'

const ICONS = [Code, TrendingUp, ListTodo, CheckCircle2] as const
const GRADIENTS = [
  'from-blue-500 to-purple-600',
  'from-orange-500 to-red-600',
  'from-green-500 to-teal-600',
  'from-[#4F46E5] to-[#7C3AED]',
] as const

export function AboutWhyDifferent() {
  const { m } = useI18n()

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">{m.about.whyTitle}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{m.about.whySubtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {m.about.whyItems.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-all">
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
