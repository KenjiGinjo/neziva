import { ArrowRight, FlaskConical, Lightbulb, Rocket, TrendingUp } from 'lucide-react'

const services = [
  {
    title: 'AI Strategy Workshop',
    anchor: 'strategy',
    icon: Lightbulb,
    duration: '2-4 hours',
    price: '$800-1,500',
    description: 'Discover how AI can transform your business operations with our diagnostic workshop.',
    color: '#4F46E5',
    bgColor: 'from-blue-100 to-purple-100',
  },
  {
    title: 'AI POC Development',
    anchor: 'poc',
    icon: FlaskConical,
    duration: '1-3 weeks',
    price: '$5,000-15,000',
    description: 'Validate your AI solution feasibility with a working minimum viable prototype.',
    color: '#7C3AED',
    bgColor: 'from-indigo-100 to-purple-100',
  },
  {
    title: 'End-to-End AI System',
    anchor: 'implementation',
    icon: Rocket,
    duration: '1-3 months',
    price: '$20,000+',
    description: 'Complete AI system from concept to production-ready deployment.',
    color: '#F97316',
    bgColor: 'from-orange-100 to-red-100',
  },
  {
    title: 'AI Optimization & Maintenance',
    anchor: 'maintenance',
    icon: TrendingUp,
    duration: 'Monthly',
    price: '$2,000-5,000/mo',
    description: 'Ongoing optimization and support for existing AI systems.',
    color: '#10B981',
    bgColor: 'from-green-100 to-emerald-100',
  },
]

export function ServicesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
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
                  <a
                    href={`/services#${service.anchor}`}
                    className="flex items-center text-[#4F46E5] font-semibold group-hover:translate-x-2 transition-transform"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
