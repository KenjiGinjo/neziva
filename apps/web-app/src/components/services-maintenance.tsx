import { Calendar, CheckCircle, FileText, HeadphonesIcon, Lightbulb, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

export function ServicesMaintenance() {
  const { m } = useI18n()
  const s = m.services.maintenance

  return (
    <section id="maintenance" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-[#10B981]" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900">{s.title}</h2>
                <p className="text-gray-600 mt-1">{s.subtitle}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-[#10B981]" />
                  <div>
                    <p className="text-sm text-gray-500">{s.availability}</p>
                    <p className="font-semibold text-gray-900">{s.availabilityValue}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <HeadphonesIcon className="h-6 w-6 text-[#10B981]" />
                  <div>
                    <p className="text-sm text-gray-500">{s.support}</p>
                    <p className="font-semibold text-gray-900">{s.supportValue}</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">{m.services.included}</h3>
              <ul className="space-y-3 mb-8">
                {s.included.map(item => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">{m.services.deliverables}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <FileText className="h-8 w-8 text-[#10B981] mb-2" />
                  <p className="font-semibold text-gray-900">{s.d1}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <Lightbulb className="h-8 w-8 text-[#10B981] mb-2" />
                  <p className="font-semibold text-gray-900">{s.d2}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <HeadphonesIcon className="h-8 w-8 text-[#10B981] mb-2" />
                  <p className="font-semibold text-gray-900">{s.d3}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24 border-2 border-green-100">
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{m.services.pricing}</p>
                <div className="text-5xl font-bold text-gray-900 mb-2">{s.priceValue}</div>
                <p className="text-gray-600">{s.priceNote}</p>
              </div>

              <a href={`mailto:kenjiginjo@gmail.com?subject=${encodeURIComponent(s.mailSubject)}`}>
                <Button className="w-full bg-gradient-to-r from-[#10B981] to-emerald-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all mb-6">
                  {s.cta}
                </Button>
              </a>

              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-gray-900">{m.services.included}</h4>
                <ul className="space-y-2 text-sm">
                  {s.sidebarIncluded.map(item => (
                    <li key={item} className="flex items-center text-gray-700">
                      <CheckCircle className="h-4 w-4 text-[#10B981] mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
