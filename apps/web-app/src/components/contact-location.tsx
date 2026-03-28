import { Clock, Globe, MapPin } from 'lucide-react'

export function ContactLocation() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Location & Hours
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-[#4F46E5] mx-auto mb-4" />
              <p className="text-gray-600">Map integration would appear here</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 text-[#4F46E5] mr-3" />
                Office Location
              </h3>
              <p className="text-gray-700">123 Tech Street, Suite 400</p>
              <p className="text-gray-700">San Francisco, CA 94105</p>
              <p className="text-gray-700">United States</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 text-[#4F46E5] mr-3" />
                Business Hours
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Friday:</span>
                  <span className="text-gray-900 font-medium">9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Saturday:</span>
                  <span className="text-gray-900 font-medium">10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sunday:</span>
                  <span className="text-gray-900 font-medium">Closed</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="h-5 w-5 text-[#4F46E5] mr-3" />
                Remote Consultations
              </h3>
              <p className="text-gray-700">
                We offer remote consultations worldwide via video call. Available 24/7 by appointment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
