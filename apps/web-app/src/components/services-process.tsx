import { ArrowRight, Clock, Code, HeadphonesIcon, Map, Rocket } from 'lucide-react'
import { useI18n } from '@/i18n'

const ICONS = [Clock, Map, Code, Rocket, HeadphonesIcon] as const

export function ServicesProcess() {
  const { m } = useI18n()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{m.services.processTitle}</h2>
          <p className="text-xl text-gray-600">{m.services.processSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {m.services.processSteps.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <div key={item.title} className="text-center">
                {i > 0 && i < 4 && (
                  <div className="hidden md:flex items-center justify-center -mb-8 relative z-10">
                    <ArrowRight className="h-8 w-8 text-gray-300" />
                  </div>
                )}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center border-4 border-[#4F46E5]">
                    <span className="font-bold text-[#4F46E5] text-lg">{i + 1}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
