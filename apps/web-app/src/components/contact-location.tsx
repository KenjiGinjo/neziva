import { Clock, Globe, MapPin } from 'lucide-react'
import { useI18n } from '@/i18n'

export function ContactLocation() {
  const { m } = useI18n()
  const c = m.contact

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{c.locationTitle}</h2>

        <div className="space-y-8">
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 text-[#4F46E5] mr-3" />
              {c.officeTitle}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {c.officeLegal}
              <br />
              {c.officePlace}
              <br />
              <span className="text-gray-500 text-sm">{c.officeNote}</span>
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 text-[#4F46E5] mr-3" />
              {c.hoursTitle}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">{c.weekdays}</span>
                <span className="text-gray-900 font-medium">{c.weekdayHours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">{c.weekend}</span>
                <span className="text-gray-900 font-medium">{c.closed}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="h-5 w-5 text-[#4F46E5] mr-3" />
              {c.remoteTitle}
            </h3>
            <p className="text-gray-700 leading-relaxed">{c.remoteBody}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
