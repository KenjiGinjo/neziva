import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Code,
  Cpu,
  FileText,
  FlaskConical,
  Settings as Gears,
  GraduationCap,
  Headphones as HeadphonesIcon,
  LaptopIcon,
  Lightbulb,
  ListChecks,
  Map,
  Rocket,
  Server,
  TrendingUp,
  Video,
} from 'lucide-react'
import { Link } from 'wouter'

import { FooterMarketing } from '@/components/footer/marketing'
import { HeaderMarketing } from '@/components/header/marketing'
import { Button } from '@/components/ui/button'

export function PageServices() {
  return (
    <div className="bg-white text-gray-900">
      <HeaderMarketing />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#4F46E5]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">Services</span>
          </div>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              From strategy to implementation, we deliver working AI solutions that solve real business problems. No hype, just practical results.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'AI Strategy Workshop',
                icon: Lightbulb,
                duration: '2-4 hours',
                price: '$800-1,500',
                description: 'Discover how AI can transform your business operations with our diagnostic workshop.',
                color: '#4F46E5',
                bgColor: 'from-blue-100 to-purple-100',
              },
              {
                title: 'AI POC Development',
                icon: FlaskConical,
                duration: '1-3 weeks',
                price: '$5,000-15,000',
                description: 'Validate your AI solution feasibility with a working minimum viable prototype.',
                color: '#7C3AED',
                bgColor: 'from-purple-100 to-pink-100',
              },
              {
                title: 'End-to-End AI System',
                icon: Rocket,
                duration: '1-3 months',
                price: '$20,000+',
                description: 'Complete AI system from concept to production-ready deployment.',
                color: '#F97316',
                bgColor: 'from-orange-100 to-red-100',
              },
              {
                title: 'AI Optimization & Maintenance',
                icon: TrendingUp,
                duration: 'Monthly',
                price: '$2,000-5,000/mo',
                description: 'Ongoing optimization and support for existing AI systems.',
                color: '#10B981',
                bgColor: 'from-green-100 to-emerald-100',
              },
            ].map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="group bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#4F46E5] hover:shadow-2xl transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${service.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon className="h-7 w-7" style={{ color: service.color }} />
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-sm font-semibold rounded-full" style={{ color: service.color }}>
                      {service.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">{service.price}</span>
                    </div>
                    <div className="flex items-center text-[#4F46E5] font-semibold group-hover:translate-x-2 transition-transform">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Detail 1: AI Strategy Workshop */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <Lightbulb className="h-8 w-8 text-[#4F46E5]" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">AI Strategy Workshop</h2>
                  <p className="text-gray-600 mt-1">Discover AI opportunities in your business</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-[#4F46E5]" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-900">2-4 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Video className="h-6 w-6 text-[#4F46E5]" />
                    <div>
                      <p className="text-sm text-gray-500">Format</p>
                      <p className="font-semibold text-gray-900">Online workshop</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                <ul className="space-y-3 mb-8">
                  {[
                    'Comprehensive business pain point diagnosis and analysis',
                    'Custom AI application roadmap tailored to your business',
                    'Identification of high-impact AI opportunities',
                    'Implementation priority recommendations with ROI estimates',
                    'Technology stack recommendations and feasibility assessment',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Who It's For</h3>
                <p className="text-gray-700 mb-8">
                  Perfect for businesses wanting to understand how AI can be practically applied to their operations, whether you're just starting to explore AI or looking to expand existing capabilities.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Deliverables</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <Map className="h-8 w-8 text-[#4F46E5] mb-2" />
                    <p className="font-semibold text-gray-900">AI Application Roadmap</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <ListChecks className="h-8 w-8 text-[#4F46E5] mb-2" />
                    <p className="font-semibold text-gray-900">Priority Recommendations</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <Cpu className="h-8 w-8 text-[#4F46E5] mb-2" />
                    <p className="font-semibold text-gray-900">Technology Suggestions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Starting at</p>
                  <div className="text-5xl font-bold text-gray-900 mb-2">$800</div>
                  <p className="text-gray-600">Up to $1,500</p>
                </div>

                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all mb-6">
                    Schedule Workshop
                  </Button>
                </Link>

                <div className="space-y-4 mb-6">
                  <h4 className="font-bold text-gray-900">What's Included</h4>
                  <ul className="space-y-2 text-sm">
                    {['Business diagnosis', 'AI roadmap', 'Priority recommendations', 'Tech stack guidance'].map((item, i) => (
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

      {/* Service Detail 2: AI POC Development */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
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
                  <Button className="w-full bg-gradient-to-r from-[#7C3AED] to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all mb-6">
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

      {/* Service Detail 3: Full Implementation */}
      <section className="py-20 bg-gray-50">
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

      {/* Service Detail 4: Maintenance */}
      <section className="py-20 bg-white">
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

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Compare Our Services</h2>
            <p className="text-xl text-gray-600">Find the perfect solution for your business needs</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white">
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold">Strategy Workshop</th>
                    <th className="px-6 py-4 text-center font-semibold">POC Development</th>
                    <th className="px-6 py-4 text-center font-semibold">End-to-End System</th>
                    <th className="px-6 py-4 text-center font-semibold">Optimization</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { feature: 'Duration', values: ['2-4 hours', '1-3 weeks', '1-3 months', 'Monthly'] },
                    { feature: 'Price Range', values: ['$800 - $1,500', '$5,000 - $15,000', '$20,000+', '$2,000 - $5,000/mo'], highlight: true },
                    { feature: 'Best For', values: ['Exploring AI opportunities', 'Validating feasibility', 'Full implementation', 'Existing systems'] },
                    { feature: 'Strategic Planning', values: [true, true, true, false] },
                    { feature: 'Working Prototype', values: [false, true, true, false] },
                    { feature: 'Production Deployment', values: [false, false, true, true] },
                    { feature: 'Ongoing Support', values: [false, false, '30 days', true] },
                    { feature: 'Documentation', values: [true, true, true, true] },
                  ].map((row, i) => (
                    <tr key={i} className={`hover:bg-gray-50 ${i === 1 ? 'bg-blue-50' : ''}`}>
                      <td className="px-6 py-4 font-semibold text-gray-900">{row.feature}</td>
                      {row.values.map((value, j) => (
                        <td key={j} className={`px-6 py-4 text-center ${row.highlight ? 'font-bold text-[#4F46E5]' : 'text-gray-700'}`}>
                          {typeof value === 'boolean'
                            ? (
                                value
                                  ? (
                                      <CheckCircle className="h-6 w-6 text-[#10B981] mx-auto" />
                                    )
                                  : (
                                      <span className="text-gray-300">—</span>
                                    )
                              )
                            : (
                                value
                              )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Work</h2>
            <p className="text-xl text-gray-600">Our proven process for delivering AI solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: '1', title: 'Consultation', description: 'We start by understanding your business needs, challenges, and goals through detailed discussions.', icon: Clock },
              { step: '2', title: 'Planning', description: 'We create a detailed roadmap with clear milestones, timelines, and success metrics.', icon: Map },
              { step: '3', title: 'Development', description: 'Our team builds your AI solution using best practices and cutting-edge technologies.', icon: Code },
              { step: '4', title: 'Deployment', description: 'We deploy your solution to production with comprehensive testing and quality assurance.', icon: Rocket },
              { step: '5', title: 'Support', description: 'We provide ongoing support, training, and optimization to ensure long-term success.', icon: HeadphonesIcon },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="text-center">
                  {i > 0 && i < 4 && (
                    <div className="hidden md:flex items-center justify-center -mb-8 relative z-10">
                      <ArrowRight className="h-8 w-8 text-gray-300" />
                    </div>
                  )}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center border-4 border-[#4F46E5]">
                      <span className="font-bold text-[#4F46E5] text-lg">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-pink-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Schedule a free consultation and we'll help you choose the right solution for your business
          </p>
          <Link href="/contact">
            <Button className="bg-white text-[#4F46E5] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Schedule Free Consultation
            </Button>
          </Link>
          <p className="text-white/80 mt-6">No commitment required • 30-minute session • Expert guidance</p>
        </div>
      </section>

      <FooterMarketing />
    </div>
  )
}
