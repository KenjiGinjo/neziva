import { Calendar, CheckCircle, FileText, HeadphonesIcon, Lightbulb, TrendingUp } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'

export function ServicesMaintenance() {
  return (
    <section id="maintenance" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-[#10B981]" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900">AI Optimization & Maintenance</h2>
                <p className="text-gray-600 mt-1">Keep your AI systems running at peak performance</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-[#10B981]" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">Monthly service</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <HeadphonesIcon className="h-6 w-6 text-[#10B981]" />
                  <div>
                    <p className="text-sm text-gray-500">Support</p>
                    <p className="font-semibold text-gray-900">Ongoing optimization</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
              <ul className="space-y-3 mb-8">
                {[
                  'System performance optimization and efficiency improvements',
                  'Regular model updates and fine-tuning based on performance data',
                  '24/7 monitoring and proactive maintenance',
                  'Continuous improvement recommendations based on usage patterns',
                  'Priority technical support and issue resolution',
                  'Regular security updates and compliance checks',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Deliverables</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <FileText className="h-8 w-8 text-[#10B981] mb-2" />
                  <p className="font-semibold text-gray-900">Monthly Reports</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <Lightbulb className="h-8 w-8 text-[#10B981] mb-2" />
                  <p className="font-semibold text-gray-900">Optimization Recommendations</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <HeadphonesIcon className="h-8 w-8 text-[#10B981] mb-2" />
                  <p className="font-semibold text-gray-900">Priority Support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24 border-2 border-green-100">
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Starting at</p>
                <div className="text-5xl font-bold text-gray-900 mb-2">$2,000</div>
                <p className="text-gray-600">per month</p>
              </div>

              <Link href="/contact">
                <Button className="w-full bg-gradient-to-r from-[#10B981] to-emerald-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all mb-6">
                  Start Maintenance Plan
                </Button>
              </Link>

              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-gray-900">What's Included</h4>
                <ul className="space-y-2 text-sm">
                  {['Performance optimization', 'Model updates', '24/7 monitoring', 'Monthly reports', 'Technical support'].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <CheckCircle className="h-4 w-4 text-[#10B981] mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
