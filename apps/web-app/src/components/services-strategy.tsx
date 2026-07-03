import { CheckCircle, Clock, Cpu, Lightbulb, ListChecks, Map, Video } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'

export function ServicesStrategy() {
  return (
    <section id="strategy" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-[#4F46E5]" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900">Discovery Call</h2>
                <p className="text-gray-600 mt-1">Explore how AI can help your business — free, no commitment</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-[#4F46E5]" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">30 minutes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Video className="h-6 w-6 text-[#4F46E5]" />
                  <div>
                    <p className="text-sm text-gray-500">Format</p>
                    <p className="font-semibold text-gray-900">Video call or email</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
              <ul className="space-y-3 mb-8">
                {[
                  'Understand your business goals and current workflow',
                  'Identify practical AI opportunities for your use case',
                  'Discuss feasibility, timeline, and possible approaches',
                  'Recommend a starting point — POC, full build, or further exploration',
                  'No sales pressure — just an honest conversation',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Who It's For</h3>
              <p className="text-gray-700 mb-8">
                Perfect for businesses curious about AI but not sure where to start. We'll help you figure out if AI is the right fit and what a realistic first step looks like.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Get</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <Map className="h-8 w-8 text-[#4F46E5] mb-2" />
                  <p className="font-semibold text-gray-900">Feasibility Assessment</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <ListChecks className="h-8 w-8 text-[#4F46E5] mb-2" />
                  <p className="font-semibold text-gray-900">Recommended Next Steps</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <Cpu className="h-8 w-8 text-[#4F46E5] mb-2" />
                  <p className="font-semibold text-gray-900">Rough Scope & Timeline</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Price</p>
                <div className="text-5xl font-bold text-gray-900 mb-2">Free</div>
                <p className="text-gray-600">30 min · No commitment</p>
              </div>

              <a href="mailto:kenjiginjo@gmail.com?subject=Discovery%20Call%20Request">
                <Button className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all mb-6">
                  Book a Free Call
                </Button>
              </a>

              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-gray-900">What's Included</h4>
                <ul className="space-y-2 text-sm">
                  {['Business goals review', 'AI opportunity assessment', 'Feasibility discussion', 'Next steps recommendation'].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <CheckCircle className="h-4 w-4 text-[#10B981] mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Need more information?</p>
                <Link href="/contact" className="text-[#4F46E5] font-semibold hover:underline">
                  Contact us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
