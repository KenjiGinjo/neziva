import { ArrowRight, FlaskConical, Lightbulb, Rocket } from 'lucide-react'

const services = [
  {
    title: 'Discovery Call',
    anchor: 'strategy',
    icon: Lightbulb,
    duration: '30 min',
    price: 'Free',
    priceNote: 'No commitment',
    description: 'Explore how AI can help your business. We\'ll discuss your goals and outline possible next steps.',
    color: '#4F46E5',
    bgColor: 'from-blue-100 to-purple-100',
  },
  {
    title: 'AI POC Development',
    anchor: 'poc',
    icon: FlaskConical,
    duration: '1-3 weeks',
    price: 'From $2,000',
    priceNote: 'Early partner pricing',
    description: 'Validate your AI solution feasibility with a working minimum viable prototype.',
    color: '#7C3AED',
    bgColor: 'from-indigo-100 to-purple-100',
  },
  {
    title: 'End-to-End AI System',
    anchor: 'implementation',
    icon: Rocket,
    duration: '1-3 months',
    price: 'Custom quote',
    priceNote: 'Based on scope',
    description: 'Complete AI system from concept to production-ready deployment.',
    color: '#F97316',
    bgColor: 'from-orange-100 to-red-100',
  },
]

export function ServicesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[#4F46E5] font-medium mb-10">
          Early partner pricing available for our first pilot clients
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <p className="text-sm text-gray-500 mt-1">{service.priceNote}</p>
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
