import { EnumWorkflowStatus } from '@haole/enums'

import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { LayoutGrid, List } from 'lucide-react'
import { get } from 'radash'
import { useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useLocation } from 'wouter'
import { Empty } from '@/components/empty'
import { GuardAuthPage } from '@/components/guard/auth-page'
import { HeaderDashboard } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryPageList } from '@/components/query-page-list'
import { Request } from '@/components/request'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { WorkflowCard, WorkflowStats } from '@/components/workflow'
import { LIST_CACHE } from '@/lib/query-cache-config'
import { $qc } from '@/query-client'

interface WorkflowItem {
  id: string
  name: string
  description?: string | null
  status: EnumWorkflowStatus
  executionCount: number
  successCount: number
  errorCount: number
  lastExecutedAt?: string | null
  createdAt: string
  updatedAt: string
}

type ViewMode = 'grid' | 'list'

export function PageDashboard() {
  const [, setLocation] = useLocation()
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const [debouncedSearch] = useDebounce(searchQuery, 300)

  // 计算统计数据（从工作流列表中计算）
  const statsData = useMemo(() => {
    // TODO: 这些统计数据应该从 API 获取，暂时使用默认值
    return {
      total: 0,
      active: 0,
      todayExecutions: 0,
      successRate: 0,
    }
  }, [])

  // 构建查询参数
  const queryArgs = useMemo(() => {
    const query: Record<string, string> = {}
    if (debouncedSearch) {
      query.search = debouncedSearch
    }
    if (statusFilter && statusFilter !== 'all') {
      query.status = statusFilter
    }
    return { query }
  }, [debouncedSearch, statusFilter])

  const handleDeleteWorkflow = (workflowId: string) => {
    return async () => {
      // Call delete mutation with path parameter
      const deleteRoute = $qc.workflows[':id'].$delete as any
      await deleteRoute.mutation({ params: { id: workflowId } })
      // Invalidate and refetch workflows query - invalidate all workflow queries
      await queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey
          return Array.isArray(key) && typeof key[0] === 'string' && key[0].includes('workflows')
        },
      })
    }
  }

  return (
    <GuardAuthPage>
      <MainLayout>
        <HeaderDashboard />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Workflows</h1>
              <p className="text-muted-foreground mt-1">Manage and monitor your AI workflows</p>
            </div>
            <Request
              request={async () => {
                return await $qc.workflows.$post.mutation({
                  body: {
                    name: 'New Workflow',
                    description: '',
                    workflowData: {
                      nodes: [],
                      edges: [],
                    },
                  },
                })
              }}
              onSuccess={async (res) => {
                const workflowId = get(res, 'body.data.id', undefined)
                if (workflowId) {
                  setLocation(`/workflow/${workflowId}/edit`)
                }
              }}
              showLoading={true}
              showLoadingOption={{
                title: 'Creating workflow...',
              }}
            >
              <Button>Create Workflow</Button>
            </Request>
          </div>

          <div className="mb-8">
            <WorkflowStats
              total={statsData.total}
              active={statsData.active}
              todayExecutions={statsData.todayExecutions}
              successRate={statsData.successRate}
            />
          </div>

          {/* Search, Filter, and View Toggle */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Input
                  type="search"
                  placeholder="Search workflows..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value={EnumWorkflowStatus.Draft}>Draft</SelectItem>
                  <SelectItem value={EnumWorkflowStatus.Active}>Active</SelectItem>
                  <SelectItem value={EnumWorkflowStatus.Paused}>Paused</SelectItem>
                  <SelectItem value={EnumWorkflowStatus.Error}>Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <QueryPageList
            queryRoute={$qc.workflows.$get}
            queryArgs={queryArgs}
            queryOptions={LIST_CACHE}
            renderWrapper={
              viewMode === 'grid'
                ? <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />
                : <div className="space-y-4" />
            }
            renderItem={({ data }) => {
              const workflow = data as WorkflowItem

              return (
                <WorkflowCard
                  key={workflow.id}
                  id={workflow.id}
                  name={workflow.name}
                  description={workflow.description}
                  status={workflow.status}
                  executionCount={workflow.executionCount}
                  successCount={workflow.successCount}
                  errorCount={workflow.errorCount}
                  lastExecutedAt={workflow.lastExecutedAt}
                  createdAt={workflow.createdAt}
                  updatedAt={workflow.updatedAt}
                  onDelete={handleDeleteWorkflow(workflow.id)}
                />
              )
            }}
            renderEmpty={<Empty.Icon message="No workflows found. Create your first workflow to get started." />}
            removeOnUnload={true}
          />
        </div>
      </MainLayout>
    </GuardAuthPage>
  )
}
