import { BarChart3, Bot, FileText, Megaphone, MessageSquare, Sparkles } from 'lucide-react'

const industries = [
  { name: 'Marketing Automation', icon: Megaphone, description: 'AI-powered marketing workflows that automate content creation, email campaigns, and customer segmentation to improve efficiency.' },
  { name: 'Data Analytics', icon: BarChart3, description: 'AI-driven data insights and analysis that help you understand patterns, predict trends, and make data-informed decisions.' },
  { name: 'Customer Service Chatbots', icon: MessageSquare, description: 'AI customer service solutions that handle common inquiries, provide instant responses, and escalate complex issues appropriately.' },
  { name: 'Business Process Automation', icon: Bot, description: 'Automating repetitive business tasks like data entry, document processing, and workflow management to save time and reduce errors.' },
  { name: 'Content Generation', icon: FileText, description: 'AI-powered content creation tools that help generate marketing copy, product descriptions, and social media posts efficiently.' },
  { name: 'Predictive Analytics', icon: Sparkles, description: 'Forecasting and prediction models that help anticipate customer behavior, inventory needs, and market trends for better planning.' },
]

export function AboutIndustries() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Areas We Work In</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Types of AI solutions we build — from automation to intelligent applications.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, i) => {
            const Icon = industry.icon
            return (
              <div
                key={i}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:-translate-y-1 transition-all border border-blue-200"
              >
                <div className="w-14 h-14 bg-[#4F46E5] rounded-xl flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{industry.name}</h3>
                <p className="text-gray-700">{industry.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
