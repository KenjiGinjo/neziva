import type { ResAdminLogList } from '@neziva/interfaces'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { FilterBar, FilterSearch, FilterSelect } from '@/components/filter-bar'
import { Loading } from '@/components/loading'
import { PageShell } from '@/components/page-shell'
import { PagedTable } from '@/components/paged-table'
import { StatusBadge } from '@/components/status-badge'
import { compactQuery, formatDateTime, labelOf, LOG_TYPE_OPTIONS, PAGE_SIZE } from '@/lib/admin'
import { $qc } from '@/query-client'

function logTone(type: number) {
  if (type === 2)
    return 'red' as const
  if (type === 3)
    return 'amber' as const
  return 'muted' as const
}

export function PageLogs() {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('')
  const [page, setPage] = useState(1)
  const [debouncedSearch] = useDebounce(search, 300)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, level])

  const query = compactQuery({
    page,
    pageSize: PAGE_SIZE,
    search: debouncedSearch,
    level: level || undefined,
  })

  const { data, isLoading, isFetching, error } = $qc.admin.logs.$get.useQuery({ query }, { keepPreviousData: true })

  if (error && !data)
    return <Loading.Error error={error} />

  const rows = (data?.body.data ?? []) as ResAdminLogList[]
  const total = data?.body.pagi?.total ?? 0

  return (
    <PageShell title="日志" description="接口和应用错误。">
      <FilterBar>
        <FilterSearch value={search} onChange={setSearch} placeholder="搜索错误码 / 详情" />
        <FilterSelect value={level} onChange={setLevel} options={LOG_TYPE_OPTIONS} placeholder="全部类型" />
      </FilterBar>

      <PagedTable
        columns={[
          {
            key: 'type',
            title: '类型',
            render: item => (
              <StatusBadge label={labelOf(LOG_TYPE_OPTIONS, item.type)} tone={logTone(item.type)} />
            ),
          },
          {
            key: 'code',
            title: '错误码',
            className: 'font-mono text-xs',
          },
          {
            key: 'path',
            title: '路径',
            render: item => (
              <span className="font-mono text-xs text-muted-foreground">
                {[item.method, item.path].filter(Boolean).join(' ') || '—'}
              </span>
            ),
          },
          {
            key: 'detail',
            title: '详情',
            render: item => (
              <span className="line-clamp-2 max-w-md text-muted-foreground">{item.detail}</span>
            ),
          },
          {
            key: 'createdAt',
            title: '时间',
            className: 'whitespace-nowrap text-muted-foreground',
            render: item => formatDateTime(item.createdAt),
          },
        ]}
        data={rows}
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        empty="暂无错误日志"
        loading={isLoading || isFetching}
      />
    </PageShell>
  )
}
