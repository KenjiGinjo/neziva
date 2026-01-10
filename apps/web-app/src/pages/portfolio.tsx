import {
  ArrowLeft,
  Brain,
  Briefcase,
  CheckCircle,
  Code,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  Filter,
  Github,
  Image as ImageIcon,
  Lightbulb,
  Play,
  Rocket,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'wouter'
import { FooterMarketing } from '@/components/footer/marketing'
import { HeaderMarketing } from '@/components/header/marketing'
import { Button } from '@/components/ui/button'

export function PagePortfolio() {
  const [selectedFilter, setSelectedFilter] = useState('All Projects')

  const projects = [
    {
      id: 1,
      name: 'AI Workflow Automation Platform',
      type: 'Personal Project',
      badge: 'Personal Project',
      badgeColor: 'blue',
      description: 'A RAG-based intelligent workflow engine designed to automate repetitive business tasks. Features multi-API integration and visual flow design.',
      tags: ['RAG', 'Python', 'React', 'Node.js', 'API Integration'],
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/f9293fd5ec-76f14148b74e150793a5.png',
      status: ['Open Source', 'Live Demo'],
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: 2,
      name: 'Smart Data Analytics Tool',
      type: 'Concept Validation',
      badge: 'Concept Validation',
      badgeColor: 'green',
      description: 'An AI-driven data analysis platform that provides fast insights for businesses. Includes data processing pipelines, AI model integration, and comprehensive visualization.',
      tags: ['Data Processing', 'AI Models', 'Visualization', 'Python', 'FastAPI'],
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/3eccbb46ce-6de20934e69f9953bd7c.png',
      status: ['POC'],
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: 3,
      name: 'AI Content Generation Assistant',
      type: 'Personal Project',
      badge: 'Personal Project',
      badgeColor: 'orange',
      description: 'A multi-modal AI content generation tool that improves content creation efficiency. Features LLM integration, content optimization, and batch processing capabilities.',
      tags: ['LLM', 'Content Processing', 'Batch Operations', 'Python'],
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/5b51cb9e4a-5ddc13625e4da19fff37.png',
      status: ['Open Source', 'Active'],
      demoUrl: '#',
      githubUrl: '#',
    },
  ]

  const filters = ['All Projects', 'RAG', 'Full-Stack', 'AI Integration', 'Data Analytics']

  return (
    <div className="bg-white">
      <HeaderMarketing />

      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
            <Briefcase className="h-5 w-5 text-[#4F46E5]" />
            <span className="text-sm font-semibold text-gray-700">Our Work</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Portfolio & Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Explore our projects and see how we solve real-world problems with AI
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            These are personal projects showcasing our technical capabilities and innovative approaches
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-gray-700">Filter by:</span>
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>
                {projects.length}
                {' '}
                Projects
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                  <img
                    className="w-full h-full object-cover"
                    src={project.image}
                    alt={project.name}
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-[#4F46E5] border border-[#4F46E5]/20">
                    {project.badge}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    {project.status.map((status, i) => (
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#4F46E5] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-3">
                    <Link href="/portfolio" className="flex-1 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-4 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                      <Play className="h-4 w-4 mr-2" />
                      View Demo
                    </Link>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 border border-gray-300 rounded-lg hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={project.demoUrl}
                      className="p-2.5 border border-gray-300 rounded-lg hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Example - Project 1 */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <Link href="#projects-grid" className="inline-flex items-center text-[#4F46E5] hover:text-[#7C3AED] transition-colors font-semibold">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Projects
            </Link>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="h-96 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
              <img
                className="w-full h-full object-cover"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/dd7b27e401-750b25099de3116c5968.png"
                alt="AI Workflow Automation Platform"
              />
            </div>

            <div className="p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-blue-100 text-[#4F46E5] text-sm font-semibold rounded-full">
                  Personal Project / Concept Validation
                </span>
                <span className="px-4 py-2 bg-purple-100 text-[#7C3AED] text-sm font-semibold rounded-full">
                  Open Source
                </span>
                <span className="px-4 py-2 bg-green-100 text-[#10B981] text-sm font-semibold rounded-full">
                  Live Demo
                </span>
              </div>

              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    AI Workflow Automation Platform
                  </h2>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Lightbulb className="h-6 w-6 text-[#F97316] mr-3" />
                      Problem Statement
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Solving the automation needs of small and medium businesses for repetitive tasks. Many businesses struggle with manual processes that consume valuable time and resources, leading to inefficiency and human error.
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Rocket className="h-6 w-6 text-[#4F46E5] mr-3" />
                      Solution Overview
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      We developed a comprehensive RAG-based intelligent workflow engine that revolutionizes how businesses approach automation. The platform combines cutting-edge AI technology with intuitive design to create a powerful automation solution.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      The system features multi-API integration capabilities, allowing seamless connection with popular business tools and services. Users can build complex workflows through our visual flow design interface without writing a single line of code.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Our RAG implementation ensures intelligent decision-making within workflows, adapting to context and providing smart suggestions for optimization. The platform scales effortlessly from simple task automation to complex business process management.
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Cpu className="h-6 w-6 text-[#7C3AED] mr-3" />
                      Technical Highlights
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                        <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Code className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Full-Stack Development Capability</h4>
                          <p className="text-gray-700">
                            Built with modern React frontend and robust Node.js backend, ensuring responsive user experience and reliable performance.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl">
                        <div className="w-10 h-10 bg-[#7C3AED] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Brain className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">AI Integration and System Architecture</h4>
                          <p className="text-gray-700">
                            Sophisticated RAG implementation with vector databases and LLM integration for intelligent workflow processing and decision-making.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl">
                        <div className="w-10 h-10 bg-[#10B981] rounded-lg flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Scalable Design Patterns</h4>
                          <p className="text-gray-700">
                            Microservices architecture with containerization support, enabling horizontal scaling and easy deployment across different environments.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Trophy className="h-6 w-6 text-[#F97316] mr-3" />
                      Results & Achievements
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl text-center">
                        <div className="text-4xl font-bold text-[#4F46E5] mb-2">100%</div>
                        <div className="text-gray-700 font-semibold">Complete Demonstrable System</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl text-center">
                        <Github className="h-12 w-12 text-[#7C3AED] mx-auto mb-2" />
                        <div className="text-gray-700 font-semibold">Open Source on GitHub</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl text-center">
                        <FileText className="h-12 w-12 text-[#10B981] mx-auto mb-2" />
                        <div className="text-gray-700 font-semibold">Technical Documentation</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <ImageIcon className="h-6 w-6 text-[#4F46E5] mr-3" />
                      Project Screenshots
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        'https://storage.googleapis.com/uxpilot-auth.appspot.com/dcb836d01e-c9d6e6fd7bc9fdfa126e.png',
                        'https://storage.googleapis.com/uxpilot-auth.appspot.com/898963f877-460a309fdd98f29eccbf.png',
                        'https://storage.googleapis.com/uxpilot-auth.appspot.com/6327ffc6d7-d2f2399bea2ad27b3614.png',
                        'https://storage.googleapis.com/uxpilot-auth.appspot.com/4daebecd36-3d773782b582a5c5c47a.png',
                      ].map((img, i) => (
                        <div key={i} className="rounded-xl overflow-hidden shadow-lg">
                          <img className="w-full h-64 object-cover" src={img} alt={`Screenshot ${i + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-32 space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Project Type</div>
                          <div className="font-semibold text-gray-900">Personal Project</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Status</div>
                          <div className="font-semibold text-[#10B981]">Active / Completed</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Technologies Used</div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {['RAG', 'Python', 'React', 'Node.js', 'API Integration', 'Vector DB'].map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-lg shadow-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Project Links</h4>
                      <div className="space-y-3">
                        <Link href="/portfolio">
                          <Button className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                            <Play className="h-4 w-4 mr-2" />
                            Try Live Demo
                          </Button>
                        </Link>
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all duration-200 flex items-center justify-center"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          View on GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Technologies We Use</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building with modern, reliable, and scalable technologies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['Python', 'React', 'Node.js', 'Databases', 'Docker', 'AWS'].map((tech, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-200">
                <Database className="h-12 w-12 text-[#4F46E5] mb-3" />
                <span className="font-semibold text-gray-900">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From idea to deployment, we follow a structured approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Discovery', description: 'Understanding your needs, goals, and technical requirements through detailed consultation.', color: '[#4F46E5]' },
              { step: '2', title: 'Planning', description: 'Creating detailed technical specifications and project roadmap with clear milestones.', color: '[#7C3AED]' },
              { step: '3', title: 'Development', description: 'Building your solution with best practices, regular updates, and transparent communication.', color: '[#F97316]' },
              { step: '4', title: 'Deployment', description: 'Launching your project with comprehensive testing, documentation, and ongoing support.', color: '[#10B981]' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className={`w-16 h-16 bg-gradient-to-br from-${item.color} to-purple-100 rounded-xl flex items-center justify-center mb-6`}>
                  <span className="text-3xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Build Something Together?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Let's discuss how AI can help your business grow and transform your operations
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/contact">
              <Button className="bg-white text-[#4F46E5] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
                Schedule Free Consultation
              </Button>
            </Link>
            <Link href="/services" className="text-white font-semibold text-lg hover:underline flex items-center">
              View Our Services
              <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>No commitment required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Quick response</span>
            </div>
          </div>
        </div>
      </section>

      <FooterMarketing />
    </div>
  )
}
