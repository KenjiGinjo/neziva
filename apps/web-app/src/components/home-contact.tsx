import { Clock, Mail } from 'lucide-react'
import { useI18n } from '@/i18n'

const CONTACT_EMAIL = 'kenjiginjo@gmail.com'

export function HomeContact() {
  const { m } = useI18n()

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{m.home.contactTitle}</h2>
          <p className="text-xl text-gray-600">{m.home.contactSubtitle}</p>
        </div>
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-[#4F46E5] rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{m.home.contactEmailTitle}</h3>
                <p className="text-gray-600 mb-2">{m.home.contactEmailDesc}</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#4F46E5] font-semibold text-lg hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-8 text-white">
            <h3 className="font-bold text-xl mb-3">{m.home.contactResponseTitle}</h3>
            <p className="text-purple-100 mb-4">{m.home.contactResponseBody}</p>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2" />
              <span>{m.home.contactHours}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
