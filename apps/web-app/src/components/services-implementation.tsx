import {
  BookOpen,
  Calendar,
  CheckCircle,
  Settings as Gears,
  GraduationCap,
  Rocket,
  Server,
} from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'

export function ServicesImplementation() {
  return (
    <section id="implementation" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
                <Rocket className="h-8 w-8 text-[#F97316]" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900">End-to-End AI System Implementation</h2>
                <p className="text-gray-600 mt-1">Complete AI solution from zero to production</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-[#F97316]" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">1-3 months</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Server className="h-6 w-6 text-[#F97316]" />
                  <div>
                    <p className="text-sm text-gray-500">Deliverable</p>
                    <p className="font-semibold text-gray-900">Production-ready system</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
              <ul className="space-y-3 mb-8">
                {[
                  'Complete AI system development from concept to production deployment',
                  'Data pipeline architecture and implementation for seamless data flow',
                  'Model training, fine-tuning, and API integration',
                  'System integration with existing business infrastructure',
                  'Custom user interface development for end-users',
                  'Production deployment with monitoring and maintenance setup',
                  'Security implementation and compliance considerations',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Deliverables</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-orange-50 rounded-xl p-4">
                  <Gears className="h-8 w-8 text-[#F97316] mb-2" />
                  <p className="font-semibold text-gray-900">Production AI System</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <BookOpen className="h-8 w-8 text-[#F97316] mb-2" />
                  <p className="font-semibold text-gray-900">Complete Documentation</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <GraduationCap className="h-8 w-8 text-[#F97316] mb-2" />
                  <p className="font-semibold text-gray-900">Team Training</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24 border-2 border-orange-100">
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Starting at</p>
                <div className="text-5xl font-bold text-gray-900 mb-2">$20,000</div>
                <p className="text-gray-600">Custom pricing based on scope</p>
              </div>

              <Link href="/contact">
                <Button className="w-full bg-gradient-to-r from-[#F97316] to-red-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all mb-6">
                  Request Proposal
                </Button>
              </Link>

              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-gray-900">What's Included</h4>
                <ul className="space-y-2 text-sm">
                  {['Complete system build', 'Data pipeline setup', 'Model training/integration', 'UI development', 'Production deployment', 'Documentation & training'].map((item, i) => (
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
