import {
  Activity,
  Brain,
  Cloud,
  Code,
  Database,
  Layers,
  Layout,
  Link,
  Package,
  Server,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { useI18n } from '@/i18n'

const technologies = [
  { name: 'LLMs', icon: Brain },
  { name: 'Python', icon: Code },
  { name: 'React', icon: Layout },
  { name: 'Node.js', icon: Server },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Docker', icon: Package },
  { name: 'LangChain', icon: Link },
  { name: 'Vector DBs', icon: Layers },
  { name: 'AWS', icon: Cloud },
  { name: 'TensorFlow', icon: TrendingUp },
  { name: 'PyTorch', icon: Activity },
  { name: 'FastAPI', icon: Zap },
]

interface SectionTechnologiesProps {
  variant?: 'gray' | 'white'
}

export function SectionTechnologies({ variant = 'gray' }: SectionTechnologiesProps) {
  const { m } = useI18n()

  return (
    <section className={`py-24 ${variant === 'gray' ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {m.tech.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {m.tech.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map((tech) => {
            const Icon = tech.icon
            return (
              <div
                key={tech.name}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all"
              >
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
