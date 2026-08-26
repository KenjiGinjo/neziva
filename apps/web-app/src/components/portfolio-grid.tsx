import type { ResPortfolioProjectList } from '@neziva/interfaces'
import { ExternalLink, Github, Mail, Play } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import { Loading } from './loading'

const CONTACT_EMAIL = 'kenjiginjo@gmail.com'

interface PortfolioGridProps {
  projects: ResPortfolioProjectList[]
  isLoading?: boolean
}

export function PortfolioGrid({ projects, isLoading }: PortfolioGridProps) {
  const { m } = useI18n()

  if (isLoading) {
    return <Loading.Card />
  }

  if (projects.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {m.portfolio.empty}
          </p>
          <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(m.portfolio.mailSubject)}`}>
            <Button className="bg-[#F97316] hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              {m.common.contactUs}
            </Button>
          </a>
        </div>
      </section>
    )
  }

  return (
    <section id="projects-grid" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
            >
              <Link href={`/portfolio/${project.id}`}>
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                  <img
                    className="w-full h-full object-cover"
                    src={project.image}
                    alt={project.name}
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-[#4F46E5] border border-[#4F46E5]/20">
                    {project.type}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  {(project.status ?? []).map((status, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 ${
                        i === 0
                          ? 'bg-blue-100 text-[#4F46E5]'
                          : 'bg-purple-100 text-[#7C3AED]'
                      } text-xs font-semibold rounded-full`}
                    >
                      {status}
                    </span>
                  ))}
                </div>
                <Link href={`/portfolio/${project.id}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#4F46E5] transition-colors">
                    {project.name}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(project.tags ?? []).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-3">
                  {(project.demoUrl && project.demoUrl !== '#')
                    ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-4 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {m.portfolio.viewDemo}
                        </a>
                      )
                    : (
                        <Link
                          href={`/portfolio/${project.id}`}
                          className="flex-1 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-4 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {m.portfolio.viewDemo}
                        </Link>
                      )}
                  {project.githubUrl
                    ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 border border-gray-300 rounded-lg hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )
                    : null}
                  {project.demoUrl
                    ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 border border-gray-300 rounded-lg hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )
                    : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
