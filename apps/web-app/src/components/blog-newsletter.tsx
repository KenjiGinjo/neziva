import { CheckCircle, Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BlogNewsletter() {
  return (
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
  )
}
