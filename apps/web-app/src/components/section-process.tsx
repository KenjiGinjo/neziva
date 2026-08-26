import { useI18n } from '@/i18n'

interface SectionProcessProps {
  variant?: 'white' | 'gradient'
}

const GRADIENTS = [
  'from-[#4F46E5] to-[#7C3AED]',
  'from-[#7C3AED] to-[#10B981]',
  'from-[#F97316] to-red-500',
  'from-[#10B981] to-teal-500',
] as const

export function SectionProcess({ variant = 'white' }: SectionProcessProps) {
  const { m } = useI18n()

  return (
    <section className={`py-24 ${variant === 'gradient' ? 'bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{m.process.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{m.process.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {m.process.steps.map((item, i) => (
            <div key={item.title} className="text-center">
              <div className={`w-20 h-20 bg-gradient-to-br ${GRADIENTS[i]} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <span className="text-3xl font-bold text-white">{i + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
