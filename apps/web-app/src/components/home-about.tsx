import { Award, Clock, RefreshCw, Shield, Users } from 'lucide-react'
import { useI18n } from '@/i18n'

export function HomeAbout() {
  const { m } = useI18n()

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{m.home.aboutTitle}</h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">{m.home.aboutP1}</p>
            <p className="text-gray-600 mb-8 leading-relaxed">{m.home.aboutP2}</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <Users className="h-8 w-8 text-[#4F46E5] mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">{m.home.aboutDirectTitle}</h3>
                <p className="text-sm text-gray-600">{m.home.aboutDirectBody}</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <Award className="h-8 w-8 text-[#7C3AED] mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">{m.home.aboutHandsOnTitle}</h3>
                <p className="text-sm text-gray-600">{m.home.aboutHandsOnBody}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="h-6 w-6 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{m.home.aboutRegisteredTitle}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {m.home.aboutRegisteredLegal}
                    <br />
                    {m.home.aboutRegisteredMeta}
                    <br />
                    {m.home.aboutRegisteredUscc}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{m.home.aboutLicense}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-8 text-white">
              <Award className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">{m.home.aboutQualityTitle}</h3>
              <p className="text-sm opacity-90">{m.home.aboutQualityBody}</p>
            </div>
            <div className="bg-gradient-to-br from-[#10B981] to-teal-500 rounded-xl p-8 text-white mt-8">
              <Clock className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">{m.home.aboutFastTitle}</h3>
              <p className="text-sm opacity-90">{m.home.aboutFastBody}</p>
            </div>
            <div className="bg-gradient-to-br from-[#F97316] to-red-500 rounded-xl p-8 text-white">
              <Shield className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">{m.home.aboutSecureTitle}</h3>
              <p className="text-sm opacity-90">{m.home.aboutSecureBody}</p>
            </div>
            <div className="bg-gradient-to-br from-[#7C3AED] to-[#10B981] rounded-xl p-8 text-white mt-8">
              <RefreshCw className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">{m.home.aboutScalableTitle}</h3>
              <p className="text-sm opacity-90">{m.home.aboutScalableBody}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
