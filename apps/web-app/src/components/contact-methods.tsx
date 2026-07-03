import { Clock, Globe, Mail } from 'lucide-react'

const CONTACT_EMAIL = 'kenjiginjo@gmail.com'

export function ContactMethods() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Other Ways to Reach Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#4F46E5] font-medium hover:underline break-all"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-gray-600 mt-2 text-sm">Our preferred contact method</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Response Time</h3>
            <p className="text-[#4F46E5] font-medium text-lg">Within 24 hours</p>
            <p className="text-gray-600 mt-2 text-sm">Mon – Fri, UTC+8</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Remote Worldwide</h3>
            <p className="text-[#4F46E5] font-medium text-lg">Video or email</p>
            <p className="text-gray-600 mt-2 text-sm">We work with clients globally</p>
          </div>
        </div>
      </div>
    </section>
  )
}
