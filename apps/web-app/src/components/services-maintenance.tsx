import { Calendar, CheckCircle, FileText, HeadphonesIcon, Lightbulb, TrendingUp } from 'lucide-react'
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
                <h2 className="text-4xl font-bold text-gray-900">Post-Project Support</h2>
                <p className="text-gray-600 mt-1">Ongoing optimization for systems we've built together</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-[#10B981]" />
                  <div>
                    <p className="text-sm text-gray-500">Availability</p>
                    <p className="font-semibold text-gray-900">After project delivery</p>
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
                  'Bug fixes and performance improvements for delivered systems',
                  'Model updates and fine-tuning as needed',
                  'Feature enhancements based on usage feedback',
                  'Technical support via email with agreed response times',
                  'Security updates and dependency maintenance',
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
                  <p className="font-semibold text-gray-900">Status Reports</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <Lightbulb className="h-8 w-8 text-[#10B981] mb-2" />
                  <p className="font-semibold text-gray-900">Improvement Suggestions</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <HeadphonesIcon className="h-8 w-8 text-[#10B981] mb-2" />
                  <p className="font-semibold text-gray-900">Email Support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24 border-2 border-green-100">
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Pricing</p>
                <div className="text-5xl font-bold text-gray-900 mb-2">Custom quote</div>
                <p className="text-gray-600">Available after project delivery</p>
              </div>

              <a href="mailto:kenjiginjo@gmail.com?subject=Post-Project%20Support%20Inquiry">
                <Button className="w-full bg-gradient-to-r from-[#10B981] to-emerald-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all mb-6">
                  Ask About Support
                </Button>
              </a>

              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-gray-900">What's Included</h4>
                <ul className="space-y-2 text-sm">
                  {['Bug fixes & optimization', 'Model updates', 'Feature enhancements', 'Email support', 'Security updates'].map((item, i) => (
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
