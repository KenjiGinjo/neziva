import { Award, CheckCircle, Code, Cog, ExternalLink, Rocket, Shield, Sparkles, Users } from 'lucide-react'

export function AboutMain() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">What We Do</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#10B981] mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-gray-900">We build AI systems, not just slide decks.</strong>
                  {' '}
                  Neziva is a full-stack AI development studio — we write code, integrate models, and deploy working solutions in-house.
                </span>
              </p>
              <p className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#10B981] mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-gray-900">We focus on what can actually be built.</strong>
                  {' '}
                  No pie-in-the-sky promises. We work on practical AI applications that solve real business problems.
                </span>
              </p>
              <p className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#10B981] mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-gray-900">We work directly with you.</strong>
                  {' '}
                  No account managers or outsourced teams. You communicate with the engineers who write your code.
                </span>
              </p>
              <p className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#10B981] mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-gray-900">We're involved from start to finish.</strong>
                  {' '}
                  Requirements, design, development, deployment — one team handles the entire process.
                </span>
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Led by Kenji Ginjo, a full-stack engineer with experience across React, Vue, Node.js, TypeScript, and AI integration.
            </p>
            <a
              href="https://kenjiginjo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#4F46E5] font-semibold hover:text-[#7C3AED] transition"
            >
              Meet our founder & technical background
              <ExternalLink className="h-4 w-4" />
            </a>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-start gap-3">
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
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-transform">
                  <Sparkles className="h-10 w-10 text-[#7C3AED] mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">AI Consulting</h3>
                  <p className="text-sm text-gray-600">Discovery & feasibility assessment</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-transform">
                  <Code className="h-10 w-10 text-[#4F46E5] mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Development</h3>
                  <p className="text-sm text-gray-600">Full-stack coding & deployment</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-transform">
                  <Cog className="h-10 w-10 text-[#F97316] mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Integration</h3>
                  <p className="text-sm text-gray-600">AI model & API integration</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-transform">
                  <Rocket className="h-10 w-10 text-[#10B981] mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Deployment</h3>
                  <p className="text-sm text-gray-600">Production-ready delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-16 max-w-2xl">
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
      </div>
    </section>
  )
}
