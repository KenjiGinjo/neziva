import {
  ArrowRight,
  Award,
  Brain,
  Calendar,
  CheckCircle,
  Clock,
  Code,
  Cog,
  Database,
  FlaskConical,
  Github,
  HandHeart,
  Layers,
  Lightbulb,
  Mail,
  RefreshCw,
  Rocket,
  Shield,
  Star,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'

export function PageHome() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[700px] bg-gradient-to-br from-[#667eea] to-[#764ba2] overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 h-full min-h-[600px] flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Practical AI Solutions for Your Business
              </h1>
              <p className="text-2xl font-light mb-4 text-purple-100">
                From Ideas to Working Code
              </p>
              <p className="text-lg mb-8 text-purple-100 leading-relaxed">
                We build working AI systems. Not just consulting—we write code and deliver real solutions that transform your business operations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button className="bg-[#F97316] hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center">
                    Schedule Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button variant="outline">
                    View Our Work
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#10B981] rounded-full animate-pulse" />
                    <span className="text-white font-mono text-sm">AI System Active</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 font-mono text-xs text-purple-100">
                    <div className="mb-2">
                      <span className="text-[#10B981]">function</span>
                      {' '}
                      buildAISolution()
                      {'{'}
                    </div>
                    <div className="ml-4 mb-2">
                      <span className="text-[#F97316]">const</span>
                      {' '}
                      strategy = analyzeNeeds();
                    </div>
                    <div className="ml-4 mb-2">
                      <span className="text-[#F97316]">const</span>
                      {' '}
                      code = developSystem();
                    </div>
                    <div className="ml-4 mb-2">
                      <span className="text-[#4F46E5]">return</span>
                      {' '}
                      deployWorkingSolution();
                    </div>
                    <div>{'}'}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-white">98%</div>
                      <div className="text-xs text-purple-200">Accuracy</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-white">24/7</div>
                      <div className="text-xs text-purple-200">Uptime</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-white">3x</div>
                      <div className="text-xs text-purple-200">ROI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why neziva?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't just talk about AI—we build it. Here's what makes us different from traditional consultants.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Code, Not Just Advice</h3>
              <p className="text-gray-600 leading-relaxed">
                We write working code and build systems, not just give recommendations. Every project includes actual implementation.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7C3AED] to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <Layers className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Full-Stack Capability</h3>
              <p className="text-gray-600 leading-relaxed">
                From requirements to deployment, we handle the entire process. Frontend, backend, AI integration—we do it all.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#F97316] to-red-500 rounded-xl flex items-center justify-center mb-6">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Solutions</h3>
              <p className="text-gray-600 leading-relaxed">
                We deliver actual working systems, not theoretical concepts. Your AI solution will be production-ready and scalable.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <HandHeart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hands-On Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                We've built AI projects and know what works. Our experience comes from real implementation, not just theory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible engagement models to match your needs—from quick strategy sessions to full implementation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-[#4F46E5] hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">AI Strategy Workshop</h3>
                <Lightbulb className="h-8 w-8 text-[#F97316]" />
              </div>
              <div className="mb-4">
                <span className="inline-block bg-purple-100 text-[#7C3AED] px-3 py-1 rounded-full text-sm font-semibold">
                  2-4 hours
                </span>
              </div>
              <div className="text-3xl font-bold text-[#4F46E5] mb-4">$800-1,500</div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Identify AI opportunities in your business. We analyze your workflow and recommend practical AI solutions.
              </p>
              <Link href="/services" className="text-[#4F46E5] font-semibold inline-flex items-center hover:text-[#7C3AED] transition">
                Learn More
                {' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-[#4F46E5] hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">AI POC Development</h3>
                <FlaskConical className="h-8 w-8 text-[#10B981]" />
              </div>
              <div className="mb-4">
                <span className="inline-block bg-green-100 text-[#10B981] px-3 py-1 rounded-full text-sm font-semibold">
                  1-3 weeks
                </span>
              </div>
              <div className="text-3xl font-bold text-[#4F46E5] mb-4">$5,000-15,000</div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Build a working prototype to validate your AI concept. Test feasibility before full investment.
              </p>
              <Link href="/services" className="text-[#4F46E5] font-semibold inline-flex items-center hover:text-[#7C3AED] transition">
                Learn More
                {' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-8 text-white hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">Full Implementation</h3>
                  <Cog className="h-8 w-8" />
                </div>
                <div className="mb-4">
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    1-3 months
                  </span>
                </div>
                <div className="text-3xl font-bold mb-4">$20,000-60,000+</div>
                <p className="mb-6 leading-relaxed opacity-90">
                  Complete AI system development from design to deployment. Production-ready, scalable solution.
                </p>
                <Link href="/services" className="text-white font-semibold inline-flex items-center hover:opacity-80 transition">
                  Learn More
                  {' '}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-[#4F46E5] hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Optimization & Maintenance</h3>
                <TrendingUp className="h-8 w-8 text-[#F97316]" />
              </div>
              <div className="mb-4">
                <span className="inline-block bg-orange-100 text-[#F97316] px-3 py-1 rounded-full text-sm font-semibold">
                  Monthly
                </span>
              </div>
              <div className="text-3xl font-bold text-[#4F46E5] mb-4">$2,000-5,000/mo</div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Ongoing support, performance optimization, and feature enhancements for your AI system.
              </p>
              <Link href="/services" className="text-[#4F46E5] font-semibold inline-flex items-center hover:text-[#7C3AED] transition">
                Learn More
                {' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
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
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    RAG
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    Full-Stack
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    AI Integration
                  </span>
                </div>
                <div className="flex gap-3">
                  <Link href="/portfolio" className="flex-1 bg-[#4F46E5] text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-700 transition">
                    View Demo
                  </Link>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
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
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    Machine Learning
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    Data Science
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    Visualization
                  </span>
                </div>
                <div className="flex gap-3">
                  <Link href="/portfolio" className="flex-1 bg-[#4F46E5] text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-700 transition">
                    View Demo
                  </Link>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
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
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    GPT-4
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    Multi-Modal
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    Marketing
                  </span>
                </div>
                <div className="flex gap-3">
                  <Link href="/portfolio" className="flex-1 bg-[#4F46E5] text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-700 transition">
                    View Demo
                  </Link>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Interactive Demo */}
      <section className="py-24 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Try Our AI Assistant
            </h2>
            <p className="text-xl text-gray-600">
              Ask about your business needs and see how AI can help
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Brain className="h-6 w-6 text-[#4F46E5]" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">neziva AI Assistant</div>
                  <div className="text-purple-100 text-sm flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 h-96 overflow-y-auto bg-gray-50">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3 bg-white rounded-lg rounded-tl-none p-4 shadow-sm max-w-md">
                  <p className="text-gray-800">
                    Hi! I'm neziva's AI assistant. What kind of AI solution are you looking for?
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Just now</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left hover:border-[#4F46E5] hover:bg-blue-50 transition">
                  <Lightbulb className="h-6 w-6 text-[#F97316] mb-2" />
                  <div className="font-semibold text-gray-900 text-sm">Strategy Session</div>
                  <div className="text-xs text-gray-600">Explore AI opportunities</div>
                </button>
                <button className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left hover:border-[#4F46E5] hover:bg-blue-50 transition">
                  <Code className="h-6 w-6 text-[#4F46E5] mb-2" />
                  <div className="font-semibold text-gray-900 text-sm">Build a POC</div>
                  <div className="text-xs text-gray-600">Validate your concept</div>
                </button>
                <button className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left hover:border-[#4F46E5] hover:bg-blue-50 transition">
                  <Rocket className="h-6 w-6 text-[#10B981] mb-2" />
                  <div className="font-semibold text-gray-900 text-sm">Full Development</div>
                  <div className="text-xs text-gray-600">Complete AI system</div>
                </button>
                <button className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left hover:border-[#4F46E5] hover:bg-blue-50 transition">
                  <Brain className="h-6 w-6 text-[#7C3AED] mb-2" />
                  <div className="font-semibold text-gray-900 text-sm">Custom Question</div>
                  <div className="text-xs text-gray-600">Ask anything</div>
                </button>
              </div>
            </div>
            <div className="p-6 bg-white border-t border-gray-200">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4F46E5] transition"
                />
                <Button className="bg-[#4F46E5] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial consultation to deployment, we follow a proven methodology that ensures success.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Discovery</h3>
              <p className="text-gray-600">
                We analyze your business needs and identify AI opportunities that deliver real value.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#7C3AED] to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Design</h3>
              <p className="text-gray-600">
                We architect the solution, plan the implementation, and define success metrics.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#F97316] to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Development</h3>
              <p className="text-gray-600">
                We build the AI system with clean code, thorough testing, and regular updates.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#10B981] to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Deployment</h3>
              <p className="text-gray-600">
                We launch your AI solution and provide ongoing support to ensure optimal performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
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
            {[
              { name: 'GPT-4', icon: Brain },
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
            ].map((tech) => {
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

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from businesses we've helped transform with AI solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="flex items-center mb-6">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                  alt="Client"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <div className="font-bold text-gray-900">Michael Chen</div>
                  <div className="text-sm text-gray-600">CEO, TechStart Inc</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array.from({ length: 5 })].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "neziva didn't just consult—they built our entire AI system. The team delivered working code that transformed our operations. Highly recommended for anyone serious about AI."
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="flex items-center mb-6">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                  alt="Client"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <div className="font-bold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">CTO, DataFlow Solutions</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array.from({ length: 5 })].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "What impressed me most was their full-stack capability. From backend AI models to frontend interfaces, they handled everything. The result exceeded our expectations."
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="flex items-center mb-6">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                  alt="Client"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <div className="font-bold text-gray-900">David Martinez</div>
                  <div className="text-sm text-gray-600">Founder, InnovateAI</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array.from({ length: 5 })].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Their POC development service was perfect for validating our concept before full investment. Professional, efficient, and technically excellent."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About neziva</h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                We're a team of AI engineers and full-stack developers who believe in building real solutions, not just providing advice.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our approach is simple: understand your business needs, design the right AI solution, write clean code, and deliver a working system. We've worked on projects ranging from small POCs to enterprise-scale implementations.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                What sets us apart is our hands-on development capability. We don't outsource the technical work—we build it ourselves, ensuring quality and maintaining direct communication throughout the project.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#4F46E5] mb-2">50+</div>
                  <div className="text-gray-600">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#7C3AED] mb-2">98%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#10B981] mb-2">24/7</div>
                  <div className="text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-8 text-white">
                <Award className="h-10 w-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Quality Driven</h3>
                <p className="text-sm opacity-90">Every line of code meets our high standards</p>
              </div>
              <div className="bg-gradient-to-br from-[#10B981] to-teal-500 rounded-xl p-8 text-white mt-8">
                <Clock className="h-10 w-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                <p className="text-sm opacity-90">Agile methodology for quick iterations</p>
              </div>
              <div className="bg-gradient-to-br from-[#F97316] to-red-500 rounded-xl p-8 text-white">
                <Shield className="h-10 w-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Secure</h3>
                <p className="text-sm opacity-90">Enterprise-grade security standards</p>
              </div>
              <div className="bg-gradient-to-br from-[#7C3AED] to-pink-500 rounded-xl p-8 text-white mt-8">
                <RefreshCw className="h-10 w-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Scalable</h3>
                <p className="text-sm opacity-90">Built to grow with your business</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Something Together?
          </h2>
          <p className="text-2xl mb-4 text-purple-100">
            Let's discuss how AI can help your business
          </p>
          <p className="text-lg mb-12 text-purple-100 max-w-2xl mx-auto">
            Schedule a free consultation to explore AI opportunities. No commitment required—just an honest conversation about what's possible.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-[#4F46E5] px-10 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transition transform hover:scale-105">
              Schedule Free Consultation
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-purple-100">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>No commitment required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>30-minute call</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Actionable insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">
              Have a question or ready to start a project? We'd love to hear from you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4F46E5] transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4F46E5] transition"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Company (Optional)</label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4F46E5] transition"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Service Interested In</label>
                  <select className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4F46E5] transition">
                    <option>AI Strategy Workshop</option>
                    <option>AI POC Development</option>
                    <option>Full Implementation</option>
                    <option>Optimization & Maintenance</option>
                    <option>Not Sure Yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4F46E5] transition"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <Button className="w-full bg-[#4F46E5] text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition">
                  Send Message
                </Button>
              </form>
            </div>
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#4F46E5] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Email Us</h3>
                    <p className="text-gray-600 mb-2">
                      For general inquiries and project discussions
                    </p>
                    <a href="mailto:hello@neziva.com" className="text-[#4F46E5] font-semibold">
                      hello@neziva.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#10B981] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Book a Call</h3>
                    <p className="text-gray-600 mb-2">Schedule a free 30-minute consultation</p>
                    <Link href="/contact" className="text-[#10B981] font-semibold">
                      calendly.com/neziva
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-8 text-white">
                <h3 className="font-bold text-xl mb-3">Response Time</h3>
                <p className="text-purple-100 mb-4">
                  We typically respond within 24 hours on business days. For urgent matters, please mention it in your message.
                </p>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Monday - Friday, 9:00 AM - 6:00 PM EST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
