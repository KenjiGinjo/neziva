import { Calendar, CheckCircle, Code, FileText, FlaskConical, LaptopIcon, Rocket } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'

export function ServicesPOC() {
  return (
    <section id="poc" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                <FlaskConical className="h-8 w-8 text-[#7C3AED]" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900">AI POC Development</h2>
                <p className="text-gray-600 mt-1">Validate your AI solution with a working prototype</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-[#7C3AED]" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">1-3 weeks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="h-6 w-6 text-[#7C3AED]" />
                  <div>
                    <p className="text-sm text-gray-500">Deliverable</p>
                    <p className="font-semibold text-gray-900">Working prototype</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
              <ul className="space-y-3 mb-8">
                {[
                  'Development of minimum viable prototype with core functionality',
                  'Examples: AI chatbot, sales prediction model, automated content generation tool',
                  'Complete system including frontend interface, backend logic, and deployment',
                  'Fully demonstrable system ready for stakeholder testing',
                  'Performance metrics and feasibility analysis',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Deliverables</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-xl p-4">
                  <LaptopIcon className="h-8 w-8 text-[#7C3AED] mb-2" />
                  <p className="font-semibold text-gray-900">Working POC System</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <FileText className="h-8 w-8 text-[#7C3AED] mb-2" />
                  <p className="font-semibold text-gray-900">Technical Documentation</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <Rocket className="h-8 w-8 text-[#7C3AED] mb-2" />
                  <p className="font-semibold text-gray-900">Deployment Guide</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24 border-2 border-purple-100">
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Starting at</p>
                <div className="text-5xl font-bold text-gray-900 mb-2">$5,000</div>
                <p className="text-gray-600">Up to $15,000</p>
              </div>

              <Link href="/contact">
                <Button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#10B981] text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all mb-6">
                  Start POC Project
                </Button>
              </Link>

              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-gray-900">What's Included</h4>
                <ul className="space-y-2 text-sm">
                  {['MVP prototype development', 'Frontend & backend', 'Deployment setup', 'Technical documentation', 'Feasibility analysis'].map((item, i) => (
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
