import {
  ArrowRight,
  Briefcase,
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  Hash,
  Lock,
  Mail,
  MessageSquare,
  Search,
  Star,
  Tag,
  TrendingUp,
  User,
  Wrench,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'

export function PageBlog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'AI Trends', 'Technical Insights', 'Case Studies', 'Guides & Tutorials', 'Tools & Resources']

  const articles = [
    {
      id: 1,
      title: '从零到一：如何构建你的第一个AI应用',
      category: 'Technical Insights',
      categoryColor: 'blue',
      description: 'A comprehensive step-by-step guide for beginners to build their first AI application. Learn the fundamentals, tools, and best practices.',
      date: 'Jan 12, 2026',
      readTime: '12 min read',
      tags: ['AI Development', 'Tutorial', 'Beginner'],
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ebd9c15b5c-cd3770fcb1c7ff967822.png',
    },
    {
      id: 2,
      title: 'AI客服机器人的5个最佳实践',
      category: 'Case Studies',
      categoryColor: 'purple',
      description: 'Real-world case studies showing how companies improved customer satisfaction by 60% using AI chatbots. Practical lessons and recommendations.',
      date: 'Jan 10, 2026',
      readTime: '10 min read',
      tags: ['Customer Service', 'Chatbots'],
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/53b1c2ea5d-183667614ebbeab28bdb.png',
    },
    {
      id: 3,
      title: '如何选择适合你业务的AI工具',
      category: 'Guides & Tutorials',
      categoryColor: 'green',
      description: 'A practical guide with comparison tables and checklists to help you choose the right AI tools for your specific business needs and budget.',
      date: 'Jan 8, 2026',
      readTime: '15 min read',
      tags: ['Tools', 'Selection Guide'],
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/0ee2356c7c-815b9147e630034f8ca7.png',
    },
    {
      id: 4,
      title: '2026 AI Trends Every Business Owner Should Know',
      category: 'AI Trends',
      categoryColor: 'orange',
      description: 'Stay ahead of the curve with our analysis of the top AI trends shaping business in 2026. Data-driven insights and actionable recommendations.',
      date: 'Jan 5, 2026',
      readTime: '7 min read',
      tags: ['Trends', 'Business Strategy'],
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/505d809bd2-f4eb0d4c975a3e4ca66d.png',
    },
    {
      id: 5,
      title: 'Understanding Machine Learning Models for Business',
      category: 'Technical Insights',
      categoryColor: 'blue',
      description: 'Demystifying machine learning concepts for business owners. Learn which models work best for different use cases without the technical jargon.',
      date: 'Jan 3, 2026',
      readTime: '11 min read',
      tags: ['Machine Learning', 'Explained'],
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/dc02df2c99-330b9f6e04a0df8c5101.png',
    },
    {
      id: 6,
      title: 'How a Retail Company Increased Sales by 35% with AI',
      category: 'Case Studies',
      categoryColor: 'purple',
      description: 'Real case study showing how AI-powered personalization transformed a retail business. Detailed analysis of implementation and results.',
      date: 'Dec 30, 2025',
      readTime: '9 min read',
      tags: ['Retail', 'ROI'],
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/3eccbb46ce-3c046dede186acc83cd9.png',
    },
  ]

  const featuredArticle = {
    title: '2026年中小企业如何用AI省钱省力',
    category: 'AI Trends',
    description: 'Discover how small and medium-sized businesses are leveraging AI to reduce costs by up to 40% while improving efficiency. Learn practical strategies and real-world examples.',
    date: 'Jan 15, 2026',
    readTime: '8 min read',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/af9c440a92-f59d054aab4db834a7a8.png',
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'AI Trends': 'bg-[#F97316]',
      'Technical Insights': 'bg-[#4F46E5]',
      'Case Studies': 'bg-[#7C3AED]',
      'Guides & Tutorials': 'bg-[#10B981]',
      'Tools & Resources': 'bg-[#10B981]',
    }
    return colors[category] || 'bg-[#4F46E5]'
  }

  return (
    <div className="bg-white text-gray-900">
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#4F46E5]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#4F46E5]">Blog</span>
          </div>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
              Insights & Resources
            </h1>
            <p className="text-xl text-gray-600">
              AI trends, technical insights, and practical guides to help you leverage AI for your business success
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-[73px] bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-lg'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <button className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-[#4F46E5] transition-colors">
              <Tag className="h-4 w-4" />
              <span className="text-sm font-medium">View by tag</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search articles, insights, guides..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-2 mb-8">
            <Star className="h-5 w-5 text-[#F97316]" />
            <h2 className="text-2xl font-bold">Featured Article</h2>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-96 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className={`inline-block px-4 py-1.5 ${getCategoryColor(featuredArticle.category)} text-white rounded-full text-sm font-medium mb-4 w-fit`}>
                  {featuredArticle.category}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  {featuredArticle.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {featuredArticle.description}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{featuredArticle.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>neziva</span>
                  </div>
                </div>
                <Button className="px-8 py-3 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white rounded-lg hover:shadow-lg transition-all font-medium w-fit">
                  Read Article
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Showing 1-12 of 48 articles</span>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5]">
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>Trending</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <article
                key={article.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={article.image}
                    alt={article.title}
                  />
                  <div className={`absolute top-4 left-4 px-3 py-1 ${getCategoryColor(article.category)} text-white rounded-full text-xs font-medium`}>
                    {article.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#4F46E5] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              <ArrowRight className="h-4 w-4 mr-2 rotate-180 inline" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white rounded-lg font-medium">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all">
              4
            </button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all">
              12
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all">
              <span className="mr-2 hidden sm:inline">Next</span>
              <ArrowRight className="h-4 w-4 inline" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stay Updated with AI Insights
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to get the latest AI trends, practical guides, and exclusive case studies delivered to your inbox
          </p>
          <div className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <Button className="px-8 py-4 bg-white text-[#4F46E5] rounded-lg font-semibold hover:bg-gray-100 transition-all whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-6 text-white/80 text-sm flex-wrap">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Weekly AI insights</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Exclusive case studies</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Tool recommendations</span>
              </div>
            </div>
            <p className="text-white/70 text-sm mt-4">
              <Lock className="h-4 w-4 mr-1 inline" />
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Browse by Topic</h2>
            <p className="text-xl text-gray-600">Explore articles organized by your interests</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'AI Trends', icon: TrendingUp, count: 24, color: 'from-[#4F46E5] to-[#7C3AED]' },
              { name: 'Technical Guides', icon: Code, count: 18, color: 'from-[#7C3AED] to-[#4F46E5]' },
              { name: 'Case Studies', icon: Briefcase, count: 15, color: 'from-[#10B981] to-green-600' },
              { name: 'Tools & Resources', icon: Wrench, count: 12, color: 'from-[#F97316] to-orange-600' },
            ].map((topic, i) => {
              const Icon = topic.icon
              return (
                <div
                  key={i}
                  className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{topic.name}</h3>
                  <p className="text-gray-600 mb-4">Latest developments and predictions</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {topic.count}
                      {' '}
                      articles
                    </span>
                    <ArrowRight className="h-5 w-5 text-[#4F46E5] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trending Tags */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Trending Tags</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'MachineLearning',
              'Automation',
              'NLP',
              'CustomerService',
              'DataAnalytics',
              'AIStrategy',
              'BusinessIntelligence',
              'Chatbots',
              'PredictiveAnalytics',
              'AIImplementation',
              'ROI',
              'DigitalTransformation',
            ].map((tag, i) => (
              <a
                key={i}
                href="#"
                className="px-6 py-3 bg-white border border-gray-300 rounded-full hover:border-[#4F46E5] hover:text-[#4F46E5] hover:shadow-md transition-all"
              >
                <Hash className="h-4 w-4 inline mr-1" />
                {tag}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#4F46E5]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8">
            <MessageSquare className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Have Questions About AI?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Let's discuss how AI can help your business grow. Schedule a free consultation with our experts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button className="px-10 py-4 bg-white text-[#4F46E5] rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl">
                Schedule Free Consultation
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all">
                View Our Services
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>No commitment required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>30-minute session</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Expert advice</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
