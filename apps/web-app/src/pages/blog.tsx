import { useState } from 'react'
import { BlogHero } from '@/components/blog-hero'
import { BlogList } from '@/components/blog-list'
import { Pagination } from '@/components/ui/pagination'
import { $qc } from '@/query-client'

const PAGE_SIZE = 10

export function PageBlog() {
  const [page, setPage] = useState(1)

  const { data, isLoading } = $qc.blog.posts.$get.useQuery({
    query: { page, pageSize: PAGE_SIZE },
  })

  const posts = data?.body?.data ?? []
  const total = data?.body?.pagination?.total ?? 0

  return (
    <div className="bg-white text-gray-900">
      <BlogHero />
      <BlogList posts={posts} isLoading={isLoading} />
      {total > PAGE_SIZE && (
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
            <Pagination
              total={total}
              page={page}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
