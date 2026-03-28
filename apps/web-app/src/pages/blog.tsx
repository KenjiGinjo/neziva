import { useState } from 'react'
import { BlogFeatured } from '@/components/blog-featured'
import { BlogFilter } from '@/components/blog-filter'
import { BlogGrid } from '@/components/blog-grid'
import { BlogHero } from '@/components/blog-hero'
import { BlogNewsletter } from '@/components/blog-newsletter'
import { BlogSearch } from '@/components/blog-search'
import { BlogTags } from '@/components/blog-tags'
import { BlogTopics } from '@/components/blog-topics'
import { SectionCTA } from '@/components/section-cta'
import { Pagination } from '@/components/ui/pagination'
import { $qc } from '@/query-client'

const PAGE_SIZE = 12
const CATEGORY_ALL = 'All'

export function PageBlog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_ALL)
  const [page, setPage] = useState(1)

  const categoryFilter = selectedCategory === CATEGORY_ALL ? undefined : selectedCategory
  const keyword = searchQuery.trim()
  const isSearchMode = keyword.length > 0

  const { data: postsData, isLoading: postsLoading } = $qc.blog.posts.$get.useQuery({
    query: {
      category: categoryFilter,
      page,
      pageSize: PAGE_SIZE,
    },
  }, { enabled: !isSearchMode })

  const { data: searchData, isLoading: searchLoading } = $qc.blog.search.$get.useQuery({
    query: {
      keyword: keyword || undefined,
      page,
      pageSize: PAGE_SIZE,
    },
  }, { enabled: isSearchMode })

  const { data: featuredData } = $qc.blog.posts.$get.useQuery({
    query: { featured: true, page: 1, pageSize: 1 },
  }, { enabled: !isSearchMode })

  const posts = isSearchMode ? (searchData?.body?.data ?? []) : (postsData?.body?.data ?? [])
  const total = isSearchMode ? (searchData?.body?.pagination?.total ?? 0) : (postsData?.body?.pagination?.total ?? 0)
  const isLoading = isSearchMode ? searchLoading : postsLoading
  const featuredPost = featuredData?.body?.data?.[0] ?? null

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setPage(1)
  }

  return (
    <div className="bg-white text-gray-900">
      <BlogHero />
      <BlogFilter selectedCategory={selectedCategory} onCategoryChange={c => { setSelectedCategory(c); setPage(1) }} />
      <BlogSearch value={searchQuery} onChange={handleSearchChange} />
      <BlogFeatured post={featuredPost} />
      <BlogGrid
        posts={posts}
        isLoading={isLoading}
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
      />
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <Pagination
            total={total}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
      </section>
      <BlogNewsletter />
      <BlogTopics />
      <BlogTags />
      <SectionCTA variant="blog" />
    </div>
  )
}
