import type { ResAdminContactFormList } from '@neziva/interfaces'
import { EnumContactFormStatus } from '@neziva/enums'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Link, useSearch } from 'wouter'
import { FilterBar, FilterSearch, FilterSelect } from '@/components/filter-bar'
import { Loading } from '@/components/loading'
import { PageShell } from '@/components/page-shell'
import { PagedTable } from '@/components/paged-table'
import { StatusBadge } from '@/components/status-badge'
import {
  compactQuery,
  CONTACT_STATUS_OPTIONS,
  formatDateTime,
  labelOf,
  PAGE_SIZE,
  PROJECT_TYPE_OPTIONS,
} from '@/lib/admin'
import { $qc } from '@/query-client'

function contactTone(status: number) {
  if (status === EnumContactFormStatus.Pending)
    return 'amber' as const
  if (status === EnumContactFormStatus.Processed)
    return 'blue' as const
  return 'green' as const
}

export function PageContacts() {
  const searchString = useSearch()
  const initialStatus = new URLSearchParams(searchString).get('status') ?? ''
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(initialStatus)
  const [projectType, setProjectType] = useState('')
  const [page, setPage] = useState(1)
  const [debouncedSearch] = useDebounce(search, 300)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, status, projectType])

  const query = compactQuery({
    page,
    pageSize: PAGE_SIZE,
    search: debouncedSearch,
    status: status === '' ? undefined : Number(status),
    projectType: projectType || undefined,
  })

  const { data, isLoading, error } = $qc.admin.contact.forms.$get.useQuery({ query })

  if (isLoading)
    return <Loading.Card />
  if (error || !data)
    return <Loading.Error error={error} />

  const rows = (data.body.data ?? []) as ResAdminContactFormList[]
  const total = data.body.pagi?.total ?? 0

  return (
    <PageShell title="咨询" description="官网和聊天提交的联系表单。">
      <FilterBar>
        <FilterSearch value={search} onChange={setSearch} placeholder="搜索姓名 / 邮箱 / 公司" />
        <FilterSelect value={status} onChange={setStatus} options={CONTACT_STATUS_OPTIONS} placeholder="全部状态" />
        <FilterSelect value={projectType} onChange={setProjectType} options={PROJECT_TYPE_OPTIONS} placeholder="项目类型" />
      </FilterBar>

      <PagedTable
        columns={[
          {
            key: 'name',
            title: '联系人',
            render: item => (
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.company || item.email}</div>
              </div>
            ),
          },
          {
            key: 'projectType',
            title: '类型',
            render: item => labelOf(PROJECT_TYPE_OPTIONS, item.projectType),
          },
          {
            key: 'status',
            title: '状态',
            render: item => (
              <StatusBadge
                label={labelOf(CONTACT_STATUS_OPTIONS, item.status)}
                tone={contactTone(item.status)}
              />
            ),
          },
          {
            key: 'createdAt',
            title: '提交时间',
            className: 'whitespace-nowrap text-muted-foreground',
            render: item => formatDateTime(item.createdAt),
          },
          {
            key: 'action',
            title: '',
            className: 'w-20 text-right',
            render: item => (
              <Link href={`/contacts/${item.id}`} className="text-sm text-primary hover:underline">
                查看
              </Link>
            ),
          },
        ]}
        data={rows}
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        empty="还没有咨询"
      />
    </PageShell>
  )
}
