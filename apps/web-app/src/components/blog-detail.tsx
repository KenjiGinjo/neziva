import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'wouter'
import { Breadcrumb } from '@/components/breadcrumb'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { formatDate, useI18n } from '@/i18n'
import { $qc } from '@/query-client'

interface BlogDetailProps {
  id: string
}

export function BlogDetail({ id }: BlogDetailProps) {
  const { m, locale, fmt } = useI18n()
  const { data, isLoading, error } = $qc.blog.posts[':id'].$get.useQuery(
    { params: { id } },
    { enabled: !!id },
  )

  if (!id || (!isLoading && (error || !data?.body?.data))) {
    return (
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gray-600 mb-6">{m.blog.notFound}</p>
          <Link href="/blog">
            <Button variant="outline">{m.blog.back}</Button>
          </Link>
        </div>
      </section>
    )
  }

  if (isLoading) {
    return <Loading.Card />
  }

  const post = data!.body.data

  return (
    <article className="bg-white text-gray-900">
      <div className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb
            items={[
              { label: m.nav.home, href: '/' },
              { label: m.nav.blog, href: '/blog' },
              { label: post.title },
            ]}
            className="mb-6"
          />
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-gray-500 text-sm">
              {formatDate(post.publishedAt, locale)}
              {post.readTime ? ` · ${fmt(m.blog.minRead, { n: post.readTime })}` : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <div className="prose prose-gray max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {m.blog.back}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
