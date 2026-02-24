import { ArrowRight } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'

export function HomeHero() {
  return (
    <section className="relative min-h-[700px] bg-gradient-to-br from-[#667eea] to-[#764ba2] overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 h-full min-h-[600px] flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Practical AI Solutions for Your Business
            </h1>
            <p className="text-2xl font-light mb-4 text-purple-100">
              From Ideas to Working Code
            </p>
            <p className="text-lg mb-8 text-purple-100 leading-relaxed">
              We build working AI systems. Not just consulting—we write code and deliver real solutions that transform your business operations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button className="bg-[#F97316] hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline">
                  View Our Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#10B981] rounded-full animate-pulse" />
                  <span className="text-white font-mono text-sm">AI System Active</span>
                </div>
                <div className="bg-white/5 rounded-lg p-4 font-mono text-xs text-purple-100">
                  <div className="mb-2">
                    <span className="text-[#10B981]">function</span>
                    {' '}
                    buildAISolution()
                    {'{'}
                  </div>
                  <div className="ml-4 mb-2">
                    <span className="text-[#F97316]">const</span>
                    {' '}
                    strategy = analyzeNeeds();
                  </div>
                  <div className="ml-4 mb-2">
                    <span className="text-[#F97316]">const</span>
                    {' '}
                    code = developSystem();
                  </div>
                  <div className="ml-4 mb-2">
                    <span className="text-[#4F46E5]">return</span>
                    {' '}
                    deployWorkingSolution();
                  </div>
                  <div>{'}'}</div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-xs text-purple-200">Accuracy</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-xs text-purple-200">Uptime</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">3x</div>
                    <div className="text-xs text-purple-200">ROI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
