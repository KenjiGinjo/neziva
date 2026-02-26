import { ArrowRight, Code, Clock, HeadphonesIcon, Map, Rocket } from 'lucide-react'

const steps = [
  { step: '1', title: 'Consultation', description: 'We start by understanding your business needs, challenges, and goals through detailed discussions.', icon: Clock },
  { step: '2', title: 'Planning', description: 'We create a detailed roadmap with clear milestones, timelines, and success metrics.', icon: Map },
  { step: '3', title: 'Development', description: 'Our team builds your AI solution using best practices and cutting-edge technologies.', icon: Code },
  { step: '4', title: 'Deployment', description: 'We deploy your solution to production with comprehensive testing and quality assurance.', icon: Rocket },
  { step: '5', title: 'Support', description: 'We provide ongoing support, training, and optimization to ensure long-term success.', icon: HeadphonesIcon },
]

export function ServicesProcess() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Work</h2>
          <p className="text-xl text-gray-600">Our proven process for delivering AI solutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((item, i) => {
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
  )
}
