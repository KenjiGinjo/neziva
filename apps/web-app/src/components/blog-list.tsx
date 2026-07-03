import type { ResBlogPostList } from '@neziva/interfaces'
import { Mail } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'
import { Loading } from './loading'

const CONTACT_EMAIL = 'kenjiginjo@gmail.com'

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

interface BlogListProps {
  posts: ResBlogPostList[]
  isLoading?: boolean
}

export function BlogList({ posts, isLoading }: BlogListProps) {
  if (isLoading) {
    return <Loading.Card />
  }

  if (posts.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xl text-gray-600 mb-4">No articles yet.</p>
          <p className="text-gray-500 mb-8">We're working on content about AI for business. In the meantime, feel free to reach out with questions.</p>
          <a href={`mailto:${CONTACT_EMAIL}?subject=AI%20Question`}>
            <Button variant="outline" className="inline-flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Ask Us a Question
            </Button>
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl divide-y divide-gray-200">
        {posts.map(post => (
          <article key={post.id} className="py-8 first:pt-0">
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-2xl font-bold text-gray-900 hover:text-[#4F46E5] transition-colors mb-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500 mb-3">
              {formatDate(post.publishedAt)}
              {post.readTime ? ` · ${post.readTime} min read` : ''}
            </p>
            {(post.excerpt || post.content) && (
              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {post.excerpt || post.content.slice(0, 200)}
              </p>
            )}
          </article>
        ))}
        </div>
      </div>
    </section>
  )
}
