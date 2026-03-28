import { Clock, Mail } from 'lucide-react'

export function ContactMethods() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Other Ways to Reach Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
            <a
              href="mailto:hello@neziva.com"
              className="text-[#4F46E5] font-medium text-lg hover:underline"
            >
              hello@neziva.com
            </a>
            <p className="text-gray-600 mt-2">Send us an email anytime</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Response Time</h3>
            <p className="text-[#4F46E5] font-medium text-lg">Within 24 hours</p>
            <p className="text-gray-600 mt-2">We respond to all inquiries</p>
          </div>
        </div>
      </div>
    </section>
  )
}
