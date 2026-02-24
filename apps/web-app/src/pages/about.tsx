import {
  BarChart3,
  Bot,
  Calendar,
  CheckCircle,
  CheckCircle2,
  Code,
  Cog,
  Compass,
  FileText,
  GitBranch,
  Hammer,
  Handshake,
  Lightbulb,
  ListTodo,
  Mail,
  Megaphone,
  MessageSquare,
  Rocket,
  Sparkles,
  Star,
  TrendingUp,
  Wrench,
} from 'lucide-react'
import { Link } from 'wouter'

import { Button } from '@/components/ui/button'

export function PageAbout() {
  return (
    <div className="bg-white text-gray-900">
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#4F46E5]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">About</span>
          </div>
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">About neziva</h1>
            <p className="text-2xl text-gray-600 leading-relaxed">
              AI consulting and full-stack development - We build working solutions that integrate seamlessly into your business processes.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Main */}
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

      {/* Why We're Different */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Why We're Different</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not typical consultants. Here's what sets us apart from other AI consulting firms.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">We Write Code</h3>
              <p className="text-gray-600 leading-relaxed">
                We directly develop systems, not just give recommendations. Code, documentation, and deployment - we handle it all. You get working software, not just a report.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                We've actually built AI projects and know what works and what doesn't. We've encountered the challenges firsthand and learned from real implementations.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                <ListTodo className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Full Process Involvement</h3>
              <p className="text-gray-600 leading-relaxed">
                From initial discussions to code deployment, we're involved throughout. No handoffs or gaps in communication. One team, start to finish.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Working Systems We Deliver</h3>
              <p className="text-gray-600 leading-relaxed">
                Code, documentation, and deployment - we deliver everything needed for a functioning system. You get a complete, production-ready solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Industries We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work across various domains to integrate AI solutions that make a real difference in day-to-day operations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Marketing Automation', icon: Megaphone, description: 'AI-powered marketing workflows that automate content creation, email campaigns, and customer segmentation to improve efficiency.' },
              { name: 'Data Analytics', icon: BarChart3, description: 'AI-driven data insights and analysis that help you understand patterns, predict trends, and make data-informed decisions.' },
              { name: 'Customer Service Chatbots', icon: MessageSquare, description: 'AI customer service solutions that handle common inquiries, provide instant responses, and escalate complex issues appropriately.' },
              { name: 'Business Process Automation', icon: Bot, description: 'Automating repetitive business tasks like data entry, document processing, and workflow management to save time and reduce errors.' },
              { name: 'Content Generation', icon: FileText, description: 'AI-powered content creation tools that help generate marketing copy, product descriptions, and social media posts efficiently.' },
              { name: 'Predictive Analytics', icon: Sparkles, description: 'Forecasting and prediction models that help anticipate customer behavior, inventory needs, and market trends for better planning.' },
            ].map((industry, i) => {
              const Icon = industry.icon
              return (
                <div
                  key={i}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:-translate-y-1 transition-all border border-blue-200"
                >
                  <div className="w-14 h-14 bg-[#4F46E5] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{industry.name}</h3>
                  <p className="text-gray-700">{industry.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A straightforward, practical process that takes you from initial concept to a working system in production.
            </p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#10B981] transform -translate-y-1/2" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { step: '1', title: 'Understand Your Needs', description: 'We start by understanding your business challenges, current processes, and what you\'re trying to achieve with AI integration.', icon: Lightbulb, color: '#4F46E5' },
                { step: '2', title: 'Design a Solution', description: 'We design an AI solution that fits your specific requirements, considering technical feasibility, budget, and timeline constraints.', icon: Compass, color: '#7C3AED' },
                { step: '3', title: 'Build It', description: 'We write the code and build the system. You get regular updates and can provide feedback throughout the development process.', icon: Hammer, color: '#F97316' },
                { step: '4', title: 'Deploy & Support', description: 'We deploy the system to production and provide documentation and support. You get a complete, working solution ready to use.', icon: Rocket, color: '#10B981' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:-translate-y-1 transition-all border-t-4" style={{ borderTopColor: item.color }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto" style={{ backgroundColor: item.color }}>
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-center">{item.description}</p>
                    <div className="mt-6 flex justify-center">
                      <Icon className="h-8 w-8" style={{ color: item.color }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">What We Value</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide how we work and what we deliver to our clients.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { title: 'Honest Communication', description: 'We\'re transparent about what\'s possible, what\'s not, and what it will take to get there. No overselling, no false promises.', icon: Handshake },
              { title: 'Practical Solutions', description: 'We focus on solutions that work in the real world, not theoretical approaches. If something won\'t work for your situation, we\'ll tell you.', icon: Wrench },
              { title: 'Code Quality', description: 'We write maintainable, well-documented code that you can understand and modify. No black boxes, no spaghetti code.', icon: GitBranch },
            ].map((value, i) => {
              const Icon = value.icon
              return (
                <div key={i} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6 hover:rotate-0 transition-transform">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Connect */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Let's Connect</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Ready to discuss your AI project? Choose the way that works best for you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <a
              href="mailto:hello@neziva.com"
              className="bg-white rounded-2xl p-8 hover:-translate-y-1 transition-all text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Email Us</h3>
              <p className="text-[#4F46E5] font-semibold mb-2">hello@neziva.com</p>
              <p className="text-gray-600 text-sm">We respond within 24 hours</p>
            </a>
            <Link
              href="/contact"
              className="bg-white rounded-2xl p-8 hover:-translate-y-1 transition-all text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#F97316] to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Schedule a Call</h3>
              <p className="text-[#F97316] font-semibold mb-2">Book directly</p>
              <p className="text-gray-600 text-sm">30-minute consultation call</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Build Something Together?
          </h2>
          <p className="text-2xl text-blue-100 mb-12">
            Let's discuss how AI can help your business improve operations and achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact">
              <Button className="bg-white text-[#4F46E5] px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105">
                Schedule Free Consultation
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#4F46E5] transition-all">
                View Our Services
              </Button>
            </Link>
          </div>
          <p className="text-blue-200 mt-8 text-lg">No commitment required • Free 30-minute consultation</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">What Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from businesses we've helped integrate AI solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Michael Chen',
                role: 'CEO, TechStart Inc',
                image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
                quote: 'They actually delivered working code, not just recommendations. The chatbot they built handles 60% of our customer inquiries automatically now.',
              },
              {
                name: 'Sarah Johnson',
                role: 'Marketing Director, GrowthCo',
                image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
                quote: 'Honest about what was possible and what wasn\'t. The marketing automation system saved us 15 hours per week and the documentation is excellent.',
              },
              {
                name: 'David Rodriguez',
                role: 'Operations Manager, LogiFlow',
                image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
                quote: 'They stayed involved from start to finish. No handoffs to other teams. The predictive analytics dashboard they built gives us real insights we can act on.',
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:-translate-y-1 transition-all">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array.from({ length: 5 })].map((_, j) => (
                    <Star key={j} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
