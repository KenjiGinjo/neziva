interface SectionProcessProps {
  /** Section background: 'white' | 'gradient' */
  variant?: 'white' | 'gradient'
}

export function SectionProcess({ variant = 'white' }: SectionProcessProps) {
  const steps = [
    {
      step: '1',
      title: 'Discovery',
      description: 'We analyze your business needs and identify AI opportunities that deliver real value.',
      gradient: 'from-[#4F46E5] to-[#7C3AED]',
    },
    {
      step: '2',
      title: 'Design',
      description: 'We architect the solution, plan the implementation, and define success metrics.',
      gradient: 'from-[#7C3AED] to-[#10B981]',
    },
    {
      step: '3',
      title: 'Development',
      description: 'We build the AI system with clean code, thorough testing, and regular updates.',
      gradient: 'from-[#F97316] to-red-500',
    },
    {
      step: '4',
      title: 'Deployment',
      description: 'We launch your AI solution and provide ongoing support to ensure optimal performance.',
      gradient: 'from-[#10B981] to-teal-500',
    },
  ]

  return (
    <section className={`py-24 ${variant === 'gradient' ? 'bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From initial consultation to deployment, we follow a proven methodology that ensures success.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map(item => (
            <div key={item.step} className="text-center">
              <div
                className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
              >
                <span className="text-3xl font-bold text-white">{item.step}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
