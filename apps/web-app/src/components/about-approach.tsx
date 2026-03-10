import { Compass, Hammer, Lightbulb, Rocket } from 'lucide-react'

const steps = [
  { step: '1', title: 'Understand Your Needs', description: 'We start by understanding your business challenges, current processes, and what you\'re trying to achieve with AI integration.', icon: Lightbulb, color: '#4F46E5' },
  { step: '2', title: 'Design a Solution', description: 'We design an AI solution that fits your specific requirements, considering technical feasibility, budget, and timeline constraints.', icon: Compass, color: '#7C3AED' },
  { step: '3', title: 'Build It', description: 'We write the code and build the system. You get regular updates and can provide feedback throughout the development process.', icon: Hammer, color: '#F97316' },
  { step: '4', title: 'Deploy & Support', description: 'We deploy the system to production and provide documentation and support. You get a complete, working solution ready to use.', icon: Rocket, color: '#10B981' },
]

export function AboutApproach() {
  return (
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
            {steps.map((item, i) => {
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
  )
}
