import { ArrowRight, Cog, FlaskConical, Lightbulb, TrendingUp } from 'lucide-react'
import { Link } from 'wouter'

export function HomeServices() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible engagement models to match your needs—from quick strategy sessions to full implementation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-[#4F46E5] hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">AI Strategy Workshop</h3>
              <Lightbulb className="h-8 w-8 text-[#F97316]" />
            </div>
            <div className="mb-4">
              <span className="inline-block bg-purple-100 text-[#7C3AED] px-3 py-1 rounded-full text-sm font-semibold">
                2-4 hours
              </span>
            </div>
            <div className="text-3xl font-bold text-[#4F46E5] mb-4">$800-1,500</div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Identify AI opportunities in your business. We analyze your workflow and recommend practical AI solutions.
            </p>
            <Link href="/services" className="text-[#4F46E5] font-semibold inline-flex items-center hover:text-[#7C3AED] transition">
              Learn More
              {' '}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-[#4F46E5] hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">AI POC Development</h3>
              <FlaskConical className="h-8 w-8 text-[#10B981]" />
            </div>
            <div className="mb-4">
              <span className="inline-block bg-green-100 text-[#10B981] px-3 py-1 rounded-full text-sm font-semibold">
                1-3 weeks
              </span>
            </div>
            <div className="text-3xl font-bold text-[#4F46E5] mb-4">$5,000-15,000</div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Build a working prototype to validate your AI concept. Test feasibility before full investment.
            </p>
            <Link href="/services" className="text-[#4F46E5] font-semibold inline-flex items-center hover:text-[#7C3AED] transition">
              Learn More
              {' '}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-8 text-white hover:shadow-xl transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Full Implementation</h3>
                <Cog className="h-8 w-8" />
              </div>
              <div className="mb-4">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                  1-3 months
                </span>
              </div>
              <div className="text-3xl font-bold mb-4">$20,000-60,000+</div>
              <p className="mb-6 leading-relaxed opacity-90">
                Complete AI system development from design to deployment. Production-ready, scalable solution.
              </p>
              <Link href="/services" className="text-white font-semibold inline-flex items-center hover:opacity-80 transition">
                Learn More
                {' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-[#4F46E5] hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Optimization & Maintenance</h3>
              <TrendingUp className="h-8 w-8 text-[#F97316]" />
            </div>
            <div className="mb-4">
              <span className="inline-block bg-orange-100 text-[#F97316] px-3 py-1 rounded-full text-sm font-semibold">
                Monthly
              </span>
            </div>
            <div className="text-3xl font-bold text-[#4F46E5] mb-4">$2,000-5,000/mo</div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ongoing support, performance optimization, and feature enhancements for your AI system.
            </p>
            <Link href="/services" className="text-[#4F46E5] font-semibold inline-flex items-center hover:text-[#7C3AED] transition">
              Learn More
              {' '}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
