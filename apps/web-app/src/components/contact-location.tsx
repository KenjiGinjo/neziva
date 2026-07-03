import { Clock, Globe, MapPin } from 'lucide-react'

export function ContactLocation() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Location & Hours
        </h2>

        <div className="space-y-8">
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 text-[#4F46E5] mr-3" />
              Registered Office
            </h3>
            <p className="text-gray-700 leading-relaxed">
              两江新区涅智网络科技工作室（个体工商户）
              <br />
              Liangjiang New Area, Chongqing, China
              <br />
              <span className="text-gray-500 text-sm">Cluster registration address</span>
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 text-[#4F46E5] mr-3" />
              Business Hours
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Monday – Friday</span>
                <span className="text-gray-900 font-medium">9:00 AM – 6:00 PM (UTC+8)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Saturday – Sunday</span>
                <span className="text-gray-900 font-medium">Closed</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="h-5 w-5 text-[#4F46E5] mr-3" />
              Remote Consultations
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We work remotely with clients worldwide via email and video call.
              Location doesn't matter — if you have a project idea, we'd love to hear about it.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
