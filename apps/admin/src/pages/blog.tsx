import type { ResAdminBlogPostList } from '@neziva/interfaces'
import { EnumBlogPostStatus } from '@neziva/enums'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDebounce } from 'use-debounce'
import { Link, useSearch } from 'wouter'
import { ActionButtons } from '@/components/action-buttons'
import { FilterBar, FilterSearch, FilterSelect } from '@/components/filter-bar'
import { Loading } from '@/components/loading'
import { PageShell } from '@/components/page-shell'
import { PagedTable } from '@/components/paged-table'
import { Request } from '@/components/request'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import {
  BLOG_CATEGORY_OPTIONS,
  BLOG_STATUS_OPTIONS,
  compactQuery,
  formatDateTime,
  labelOf,
  PAGE_SIZE,
  qcArgs,
} from '@/lib/admin'
import { $qc } from '@/query-client'

function blogTone(status: number) {
  if (status === EnumBlogPostStatus.Draft)
    return 'muted' as const
  if (status === EnumBlogPostStatus.Published)
    return 'green' as const
  return 'amber' as const
}

export function PageBlog() {
  const searchString = useSearch()
  const initialStatus = new URLSearchParams(searchString).get('status') ?? ''
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(initialStatus)
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [debouncedSearch] = useDebounce(search, 300)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, status, category])

  const query = compactQuery({
    page,
    pageSize: PAGE_SIZE,
    search: debouncedSearch,
    status: status === '' ? undefined : Number(status),
    category: category || undefined,
  })

  const { data, isLoading, error, refetch } = $qc.admin.blog.posts.$get.useQuery({ query })

  if (isLoading)
    return <Loading.Card />
  if (error || !data)
    return <Loading.Error error={error} />

  const rows = (data.body.data ?? []) as ResAdminBlogPostList[]
  const total = data.body.pagi?.total ?? 0

  return (
    <PageShell
      title="博客"
      description="草稿、发布和精选。"
      actions={(
        <Button asChild>
          <Link href="/blog/new">
            <Plus />
            写文章
          </Link>
        </Button>
      )}
    >
      <FilterBar>
        <FilterSearch value={search} onChange={setSearch} placeholder="搜索标题 / 内容" />
        <FilterSelect value={status} onChange={setStatus} options={BLOG_STATUS_OPTIONS} placeholder="全部状态" />
        <FilterSelect value={category} onChange={setCategory} options={BLOG_CATEGORY_OPTIONS} placeholder="全部分类" />
      </FilterBar>

      <PagedTable
        columns={[
          {
            key: 'title',
            title: '标题',
            render: item => (
              <div className="max-w-sm">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.slug}</div>
              </div>
            ),
          },
          {
            key: 'category',
            title: '分类',
            className: 'whitespace-nowrap',
          },
          {
            key: 'status',
            title: '状态',
            render: item => (
              <div className="flex items-center gap-2">
                <StatusBadge label={labelOf(BLOG_STATUS_OPTIONS, item.status)} tone={blogTone(item.status)} />
                {item.featured && <StatusBadge label="精选" tone="violet" />}
              </div>
            ),
          },
          {
            key: 'views',
            title: '浏览',
            className: 'tabular-nums text-muted-foreground',
          },
          {
            key: 'createdAt',
            title: '创建',
            className: 'whitespace-nowrap text-muted-foreground',
            render: item => formatDateTime(item.createdAt),
          },
          {
            key: 'action',
            title: '',
            className: 'w-40',
            render: item => (
              <div className="flex justify-end" onClick={e => e.stopPropagation()}>
                <Request
                  request={() => $qc.admin.blog.posts[':id'].feature.$put.mutation(qcArgs({
                    params: { id: item.id },
                    body: { featured: !item.featured },
                  }))}
                  onSuccess={async () => {
                    toast.success(item.featured ? '已取消精选' : '已设为精选')
                    await refetch()
                  }}
                >
                  <Button variant="ghost" size="sm">
                    {item.featured ? '取消精选' : '精选'}
                  </Button>
                </Request>
                <ActionButtons
                  editUrl={`/blog/${item.id}`}
                  onDelete={async () => {
                    await $qc.admin.blog.posts[':id'].$delete.mutation(qcArgs({ params: { id: item.id } }))
                    toast.success('已删除')
                    await refetch()
                  }}
                />
              </div>
            ),
          },
        ]}
        data={rows}
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        empty="还没有文章"
      />
    </PageShell>
  )
}
