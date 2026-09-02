import type { ResAdminNewsletterList } from '@neziva/interfaces'
import { EnumNewsletterStatus } from '@neziva/enums'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDebounce } from 'use-debounce'
import { useSearch } from 'wouter'
import { ActionButtons } from '@/components/action-buttons'
import { FilterBar, FilterSearch, FilterSelect } from '@/components/filter-bar'
import { Loading } from '@/components/loading'
import { PageShell } from '@/components/page-shell'
import { PagedTable } from '@/components/paged-table'
import { Request } from '@/components/request'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import {
  compactQuery,
  formatDateTime,
  labelOf,
  NEWSLETTER_SOURCE_OPTIONS,
  NEWSLETTER_STATUS_OPTIONS,
  PAGE_SIZE,
  qcArgs,
} from '@/lib/admin'
import { $qc } from '@/query-client'

function newsletterTone(status: number) {
  if (status === EnumNewsletterStatus.Pending)
    return 'amber' as const
  if (status === EnumNewsletterStatus.Subscribed)
    return 'green' as const
  return 'muted' as const
}

export function PageNewsletter() {
  const searchString = useSearch()
  const initialStatus = new URLSearchParams(searchString).get('status') ?? ''
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(initialStatus)
  const [source, setSource] = useState('')
  const [page, setPage] = useState(1)
  const [debouncedSearch] = useDebounce(search, 300)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, status, source])

  const query = compactQuery({
    page,
    pageSize: PAGE_SIZE,
    search: debouncedSearch,
    status: status === '' ? undefined : Number(status),
    source: source || undefined,
  })

  const { data, isLoading, error, refetch } = $qc.admin.newsletter.subscribers.$get.useQuery({ query })

  if (isLoading)
    return <Loading.Card />
  if (error || !data)
    return <Loading.Error error={error} />

  const rows = (data.body.data ?? []) as ResAdminNewsletterList[]
  const total = data.body.pagi?.total ?? 0

  return (
    <PageShell title="订阅" description="Newsletter 订阅者。">
      <FilterBar>
        <FilterSearch value={search} onChange={setSearch} placeholder="搜索邮箱" />
        <FilterSelect value={status} onChange={setStatus} options={NEWSLETTER_STATUS_OPTIONS} placeholder="全部状态" />
        <FilterSelect value={source} onChange={setSource} options={NEWSLETTER_SOURCE_OPTIONS} placeholder="全部来源" />
      </FilterBar>

      <PagedTable
        columns={[
          { key: 'email', title: '邮箱' },
          {
            key: 'status',
            title: '状态',
            render: item => (
              <StatusBadge
                label={labelOf(NEWSLETTER_STATUS_OPTIONS, item.status)}
                tone={newsletterTone(item.status)}
              />
            ),
          },
          {
            key: 'source',
            title: '来源',
            render: item => labelOf(NEWSLETTER_SOURCE_OPTIONS, item.source),
          },
          {
            key: 'createdAt',
            title: '订阅时间',
            className: 'whitespace-nowrap text-muted-foreground',
            render: item => formatDateTime(item.createdAt),
          },
          {
            key: 'action',
            title: '',
            className: 'w-56',
            render: item => (
              <div className="flex justify-end gap-1">
                {item.status !== EnumNewsletterStatus.Subscribed && (
                  <Request
                    request={() => $qc.admin.newsletter.subscribers[':id'].status.$put.mutation(qcArgs({
                      params: { id: item.id },
                      body: { status: EnumNewsletterStatus.Subscribed },
                    }))}
                    onSuccess={async () => {
                      toast.success('已标记订阅')
                      await refetch()
                    }}
                  >
                    <Button variant="ghost" size="sm">订阅</Button>
                  </Request>
                )}
                {item.status !== EnumNewsletterStatus.Unsubscribed && (
                  <Request
                    request={() => $qc.admin.newsletter.subscribers[':id'].status.$put.mutation(qcArgs({
                      params: { id: item.id },
                      body: { status: EnumNewsletterStatus.Unsubscribed },
                    }))}
                    onSuccess={async () => {
                      toast.success('已退订')
                      await refetch()
                    }}
                  >
                    <Button variant="ghost" size="sm">退订</Button>
                  </Request>
                )}
                <ActionButtons
                  onDelete={async () => {
                    await $qc.admin.newsletter.subscribers[':id'].$delete.mutation(qcArgs({ params: { id: item.id } }))
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
        empty="还没有订阅者"
      />
    </PageShell>
  )
}
