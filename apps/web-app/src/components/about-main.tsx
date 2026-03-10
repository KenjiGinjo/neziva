import { CheckCircle, Code, Cog, Rocket, Sparkles } from 'lucide-react'

export function AboutMain() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-gray-900">What We Do</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#10B981] mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-gray-900">We do both AI consulting and write code.</strong>
                  {' '}
                  We're not just advisors who hand off recommendations. We're developers who build the systems ourselves, from initial requirements to deployment.
                </span>
              </p>
              <p className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#10B981] mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-gray-900">We focus on AI projects that can actually be implemented.</strong>
                  {' '}
                  No pie-in-the-sky promises or theoretical solutions. We work on practical applications that solve real business problems.
                </span>
              </p>
              <p className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#10B981] mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-gray-900">We help small and medium businesses integrate AI.</strong>
                  {' '}
                  Our clients are businesses and individuals looking to leverage AI tools to improve their operations, automate workflows, and gain insights from their data.
                </span>
              </p>
              <p className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#10B981] mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-gray-900">We're involved from requirements to deployment.</strong>
                  {' '}
                  We take full responsibility for the entire process - no handoffs, no communication gaps. You work with the same team from start to finish.
                </span>
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-[500px] flex items-center justify-center">
              <div className="grid grid-cols-2 gap-6 w-full">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-transform">
                  <Sparkles className="h-10 w-10 text-[#7C3AED] mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">AI Consulting</h3>
                  <p className="text-sm text-gray-600">Strategic guidance on AI implementation</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-transform mt-12">
                  <Code className="h-10 w-10 text-[#4F46E5] mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Development</h3>
                  <p className="text-sm text-gray-600">Full-stack coding & deployment</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-transform -mt-12">
                  <Cog className="h-10 w-10 text-[#F97316] mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Integration</h3>
                  <p className="text-sm text-gray-600">Seamless AI tool integration</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-transform">
                  <Rocket className="h-10 w-10 text-[#10B981] mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Deployment</h3>
                  <p className="text-sm text-gray-600">Production-ready solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
