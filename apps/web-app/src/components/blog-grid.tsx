import type { ResBlogPostList } from '@neziva/interfaces'
import { Link } from 'wouter'
import { Loading } from './loading'

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

interface BlogGridProps {
  posts: ResBlogPostList[]
  isLoading?: boolean
  total: number
  page: number
  pageSize: number
}

export function BlogGrid({ posts, isLoading, total, page, pageSize }: BlogGridProps) {
  if (isLoading) {
    return <Loading.Card />
  }

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              {total === 0 ? 'No articles' : `Showing ${start}-${end} of ${total} articles`}
            </span>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5]" defaultValue="recent">
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="h-56 overflow-hidden relative bg-gray-100">
                  {post.coverImage
                    ? (
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={post.coverImage}
                          alt={post.title}
                        />
                      )
                    : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          No image
                        </div>
                      )}
                  <div className={`absolute top-4 left-4 px-3 py-1 ${getCategoryColor(post.category)} text-white rounded-full text-xs font-medium`}>
                    {post.category}
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <Link href={`/blog/${post.id}`}>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#4F46E5] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt || post.content?.slice(0, 160) || ''}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>{post.readTime ? `${post.readTime} min read` : ''}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(post.tags ?? []).map((tag, i) => (
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
  )
}
