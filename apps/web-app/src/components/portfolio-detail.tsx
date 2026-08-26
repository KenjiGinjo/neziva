import {
  ArrowLeft,
  Brain,
  Code,
  Cpu,
  Github,
  Image as ImageIcon,
  Lightbulb,
  Play,
  Rocket,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import { $qc } from '@/query-client'
import { Loading } from './loading'

interface PortfolioDetailProps {
  id: string
}

const HIGHLIGHT_ICONS = [Code, Brain, TrendingUp]
const HIGHLIGHT_COLORS = ['bg-blue-50', 'bg-purple-50', 'bg-green-50']
const HIGHLIGHT_BG = ['bg-[#4F46E5]', 'bg-[#7C3AED]', 'bg-[#10B981]']

export function PortfolioDetail({ id }: PortfolioDetailProps) {
  const { m, fmt } = useI18n()
  const { data, isLoading, error } = $qc.portfolio.projects[':id'].$get.useQuery(
    { params: { id } },
    { enabled: !!id },
  )

  if (!id) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 mb-6">{m.portfolio.notFound}</p>
          <Link href="/portfolio">
            <Button variant="outline">{m.portfolio.back}</Button>
          </Link>
        </div>
      </section>
    )
  }

  if (isLoading) {
    return <Loading.Card />
  }

  if (error || !data?.body?.data) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 mb-6">{m.portfolio.loadFailed}</p>
          <Link href="/portfolio">
            <Button variant="outline">{m.portfolio.back}</Button>
          </Link>
        </div>
      </section>
    )
  }

  const project = data.body.data

  const technicalHighlights = (project.technicalHighlights ?? []) as Array<{ title: string, description: string }>
  const results = (project.results ?? []) as Array<{ title: string, value?: string }>
  const screenshots = project.screenshots ?? []
  const technologies = project.technologies ?? []
  const status = project.status ?? []

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <Link href="/portfolio" className="inline-flex items-center text-[#4F46E5] hover:text-[#7C3AED] transition-colors font-semibold">
            <ArrowLeft className="h-5 w-5 mr-2" />
            {m.portfolio.backProjects}
          </Link>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
          <div className="h-96 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
            <img
              className="w-full h-full object-cover"
              src={project.image}
              alt={project.name}
            />
          </div>

          <div className="p-8 lg:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-blue-100 text-[#4F46E5] text-sm font-semibold rounded-full">
                {project.type}
              </span>
              {status.map((s, i) => (
                <span
                  key={i}
                  className={`px-4 py-2 ${i === 0 ? 'bg-purple-100 text-[#7C3AED]' : 'bg-green-100 text-[#10B981]'} text-sm font-semibold rounded-full`}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {project.name}
                </h2>

                {project.problemStatement && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Lightbulb className="h-6 w-6 text-[#F97316] mr-3" />
                      {m.portfolio.problem}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {project.problemStatement}
                    </p>
                  </div>
                )}

                {project.solutionOverview && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Rocket className="h-6 w-6 text-[#4F46E5] mr-3" />
                      {m.portfolio.solution}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                      {project.solutionOverview}
                    </p>
                  </div>
                )}

                {technicalHighlights.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Cpu className="h-6 w-6 text-[#7C3AED] mr-3" />
                      {m.portfolio.highlights}
                    </h3>
                    <div className="space-y-4">
                      {technicalHighlights.map((item, i) => (
                        <div key={i} className={`flex items-start space-x-4 p-4 ${HIGHLIGHT_COLORS[i % 3]} rounded-xl`}>
                          <div className={`w-10 h-10 ${HIGHLIGHT_BG[i % 3]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            {(() => {
                              const Icon = HIGHLIGHT_ICONS[i % 3]
                              return <Icon className="h-5 w-5 text-white" />
                            })()}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-gray-700">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Trophy className="h-6 w-6 text-[#F97316] mr-3" />
                      {m.portfolio.results}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {results.map((item, i) => (
                        <div key={i} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl text-center">
                          {item.value
                            ? (
                                <>
                                  <div className="text-4xl font-bold text-[#4F46E5] mb-2">{item.value}</div>
                                  <div className="text-gray-700 font-semibold">{item.title}</div>
                                </>
                              )
                            : (
                                <>
                                  <Github className="h-12 w-12 text-[#7C3AED] mx-auto mb-2" />
                                  <div className="text-gray-700 font-semibold">{item.title}</div>
                                </>
                              )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {screenshots.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <ImageIcon className="h-6 w-6 text-[#4F46E5] mr-3" />
                      {m.portfolio.screenshots}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {screenshots.map((img, i) => (
                        <div key={i} className="rounded-xl overflow-hidden shadow-lg">
                          <img className="w-full h-64 object-cover" src={img} alt={fmt(m.portfolio.screenshotAlt, { n: i + 1 })} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-32 space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{m.portfolio.quickInfo}</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">{m.portfolio.projectType}</div>
                        <div className="font-semibold text-gray-900">{project.type}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">{m.portfolio.status}</div>
                        <div className="font-semibold text-[#10B981]">{status.join(' / ') || m.portfolio.statusActive}</div>
                      </div>
                      {technologies.length > 0 && (
                        <div>
                          <div className="text-sm text-gray-600 mb-1">{m.portfolio.technologies}</div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-lg shadow-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{m.portfolio.links}</h4>
                    <div className="space-y-3">
                      {project.demoUrl && project.demoUrl !== '#'
                        ? (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <Button className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                                <Play className="h-4 w-4 mr-2" />
                                {m.portfolio.liveDemo}
                              </Button>
                            </a>
                          )
                        : (
                            <Link href="/portfolio">
                              <Button className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                                <Play className="h-4 w-4 mr-2" />
                                {m.portfolio.viewPortfolio}
                              </Button>
                            </Link>
                          )}
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all duration-200 flex items-center justify-center"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          {m.portfolio.github}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
