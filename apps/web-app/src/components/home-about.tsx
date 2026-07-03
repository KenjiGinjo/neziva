import { Award, Clock, ExternalLink, RefreshCw, Shield, Users } from 'lucide-react'

export function HomeAbout() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Neziva</h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Neziva is an AI development studio focused on building real, production-ready systems — not slide decks.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We specialize in full-stack AI development: from requirements analysis and system design
              to writing code, integrating models, and deploying working solutions.
              Our stack covers React, Vue, Node.js, TypeScript, and modern AI tooling.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Led by Kenji Ginjo, a full-stack engineer with hands-on experience across frontend, backend, and AI integration.
            </p>
            <a
              href="https://kenjiginjo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#4F46E5] font-semibold hover:text-[#7C3AED] transition mb-8"
            >
              Meet our founder & technical background
              <ExternalLink className="h-4 w-4" />
            </a>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <Users className="h-8 w-8 text-[#4F46E5] mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Direct Communication</h3>
                <p className="text-sm text-gray-600">Work directly with our engineering team — no middlemen</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <Award className="h-8 w-8 text-[#7C3AED] mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Hands-On Delivery</h3>
                <p className="text-sm text-gray-600">Full-stack development in-house, never outsourced</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="h-6 w-6 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Registered Business</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    两江新区涅智网络科技工作室（个体工商户）
                    <br />
                    Registered: May 14, 2026 · Chongqing, China
                    <br />
                    USCC: 92500157MAKD81B01T
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Licensed for software development, AI application development, IT consulting, and related technology services.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-8 text-white">
              <Award className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Quality Driven</h3>
              <p className="text-sm opacity-90">Every line of code meets our high standards</p>
            </div>
            <div className="bg-gradient-to-br from-[#10B981] to-teal-500 rounded-xl p-8 text-white mt-8">
              <Clock className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-sm opacity-90">Agile methodology for quick iterations</p>
            </div>
            <div className="bg-gradient-to-br from-[#F97316] to-red-500 rounded-xl p-8 text-white">
              <Shield className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure</h3>
              <p className="text-sm opacity-90">Enterprise-grade security standards</p>
            </div>
            <div className="bg-gradient-to-br from-[#7C3AED] to-[#10B981] rounded-xl p-8 text-white mt-8">
              <RefreshCw className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Scalable</h3>
              <p className="text-sm opacity-90">Built to grow with your business</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
