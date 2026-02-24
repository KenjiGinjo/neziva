import { Brain, Github, Rocket, TrendingUp } from 'lucide-react'
import { Link } from 'wouter'

export function HomePortfolio() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Portfolio - Our Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what we've built and how we solve problems with AI. These projects showcase our technical capabilities.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-2xl" />
              </div>
              <div className="relative text-center text-white p-6">
                <Brain className="h-16 w-16 mx-auto mb-4" />
                <div className="text-2xl font-bold">AI Workflow Engine</div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-[#4F46E5] px-3 py-1 rounded-full text-xs font-semibold">
                  Personal Project
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                AI Workflow Automation Platform
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                RAG-based intelligent workflow engine that automates complex business processes. Features include natural language task creation, smart routing, and automated decision-making.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">RAG</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Full-Stack</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">AI Integration</span>
              </div>
              <div className="flex gap-3">
                <Link href="/portfolio" className="flex-1 bg-[#4F46E5] text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-700 transition">
                  View Demo
                </Link>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="h-64 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-2xl" />
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-2xl" />
              </div>
              <div className="relative text-center text-white p-6">
                <TrendingUp className="h-16 w-16 mx-auto mb-4" />
                <div className="text-2xl font-bold">Analytics Platform</div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-3">
                <span className="inline-block bg-green-100 text-[#10B981] px-3 py-1 rounded-full text-xs font-semibold">
                  Concept Validation
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Smart Data Analytics Tool
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                AI-driven data analysis platform that transforms raw data into actionable insights. Features automated report generation, predictive analytics, and natural language queries.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Machine Learning</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Data Science</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Visualization</span>
              </div>
              <div className="flex gap-3">
                <Link href="/portfolio" className="flex-1 bg-[#4F46E5] text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-700 transition">
                  View Demo
                </Link>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="h-64 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-2xl" />
              </div>
              <div className="relative text-center text-white p-6">
                <Rocket className="h-16 w-16 mx-auto mb-4" />
                <div className="text-2xl font-bold">Content Generator</div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-3">
                <span className="inline-block bg-orange-100 text-[#F97316] px-3 py-1 rounded-full text-xs font-semibold">
                  Personal Project
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                AI Content Generation Assistant
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Multi-modal AI content generation tool for marketing teams. Creates text, images, and videos based on brand guidelines and campaign objectives.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">GPT-4</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Multi-Modal</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Marketing</span>
              </div>
              <div className="flex gap-3">
                <Link href="/portfolio" className="flex-1 bg-[#4F46E5] text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-700 transition">
                  View Demo
                </Link>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
