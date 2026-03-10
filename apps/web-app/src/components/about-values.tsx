import { GitBranch, Handshake, Wrench } from 'lucide-react'

const values = [
  { title: 'Honest Communication', description: 'We\'re transparent about what\'s possible, what\'s not, and what it will take to get there. No overselling, no false promises.', icon: Handshake },
  { title: 'Practical Solutions', description: 'We focus on solutions that work in the real world, not theoretical approaches. If something won\'t work for your situation, we\'ll tell you.', icon: Wrench },
  { title: 'Code Quality', description: 'We write maintainable, well-documented code that you can understand and modify. No black boxes, no spaghetti code.', icon: GitBranch },
]

export function AboutValues() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">What We Value</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide how we work and what we deliver to our clients.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {values.map((value, i) => {
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
  )
}
