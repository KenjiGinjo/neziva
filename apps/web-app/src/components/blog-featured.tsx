import type { ResBlogPostList } from '@neziva/interfaces'
import { ArrowRight, Calendar as CalendarIcon, Clock, Star } from 'lucide-react'
import { Link } from 'wouter'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    'AI Trends': 'bg-[#F97316]',
    'Technical Insights': 'bg-[#4F46E5]',
    'Case Studies': 'bg-[#7C3AED]',
    'Guides & Tutorials': 'bg-[#10B981]',
    'Tools & Resources': 'bg-[#10B981]',
  }
  return colors[category] || 'bg-[#4F46E5]'
}

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

interface BlogFeaturedProps {
  post: ResBlogPostList | null
}

export function BlogFeatured({ post }: BlogFeaturedProps) {
  if (!post) return null

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center space-x-2 mb-8">
          <Star className="h-5 w-5 text-[#F97316]" />
          <h2 className="text-2xl font-bold">Featured Article</h2>
        </div>
        <Link href={`/blog/${post.id}`}>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-96 overflow-hidden bg-gray-100">
                {post.coverImage
                  ? (
                      <img
                        className="w-full h-full object-cover"
                        src={post.coverImage}
                        alt={post.title}
                      />
                    )
                  : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                    )}
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className={`inline-block px-4 py-1.5 ${getCategoryColor(post.category)} text-white rounded-full text-sm font-medium mb-4 w-fit`}>
                  {post.category}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  {post.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt || post.content?.slice(0, 200) || ''}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime ? `${post.readTime} min read` : ''}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Logo size="xs" className="text-[#4F46E5]" />
                    <span>{post.author || 'Neziva'}</span>
                  </div>
                </div>
                <Button className="px-8 py-3 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white rounded-lg hover:shadow-lg transition-all font-medium w-fit">
                  Read Article
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
