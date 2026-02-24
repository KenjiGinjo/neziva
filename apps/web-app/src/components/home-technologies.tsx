import { Brain, Code, Database, TrendingUp } from 'lucide-react'

const technologies = [
  { name: 'LLMs', icon: Brain },
  { name: 'Python', icon: Code },
  { name: 'React', icon: Code },
  { name: 'Node.js', icon: Code },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Docker', icon: Database },
  { name: 'LangChain', icon: Brain },
  { name: 'Vector DBs', icon: Database },
  { name: 'AWS', icon: Database },
  { name: 'TensorFlow', icon: TrendingUp },
  { name: 'PyTorch', icon: TrendingUp },
  { name: 'FastAPI', icon: Database },
]

export function HomeTechnologies() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Technologies We Use
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We leverage cutting-edge AI technologies and proven frameworks to build robust solutions.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map((tech) => {
            const Icon = tech.icon
            return (
              <div key={tech.name} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all">
                <Icon className="h-12 w-12 text-[#4F46E5] mb-3 mx-auto" />
                <div className="font-semibold text-gray-900">{tech.name}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
