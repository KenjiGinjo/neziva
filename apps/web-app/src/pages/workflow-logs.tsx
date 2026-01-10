import { EnumExecutionStatus } from '@haole/enums'

import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useRoute } from 'wouter'
import { Empty } from '@/components/empty'
import { GuardAuthPage } from '@/components/guard/auth-page'
import { HeaderDashboard } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { QueryList } from '@/components/query-list'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LogViewer } from '@/components/workflow/log-viewer'
import { LIST_CACHE } from '@/lib/query-cache-config'
import { $qc } from '@/query-client'

const executionStatusVariantMap: Record<EnumExecutionStatus, 'default' | 'success' | 'warning' | 'destructive'> = {
  [EnumExecutionStatus.Pending]: 'default',
  [EnumExecutionStatus.Running]: 'warning',
  [EnumExecutionStatus.Completed]: 'success',
  [EnumExecutionStatus.Failed]: 'destructive',
  [EnumExecutionStatus.Canceled]: 'default',
}

const executionStatusLabelMap: Record<EnumExecutionStatus, string> = {
  [EnumExecutionStatus.Pending]: 'Pending',
  [EnumExecutionStatus.Running]: 'Running',
  [EnumExecutionStatus.Completed]: 'Completed',
  [EnumExecutionStatus.Failed]: 'Failed',
  [EnumExecutionStatus.Canceled]: 'Canceled',
}

export function PageWorkflowLogs() {
  const [, params] = useRoute('/workflow/:id/logs')
  const workflowId = params?.id
  const [selectedExecutionId, setSelectedExecutionId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [autoScroll, setAutoScroll] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [debouncedSearch] = useDebounce(searchQuery, 300)

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [autoScroll])

  if (!workflowId) {
    return (
      <GuardAuthPage>
        <MainLayout>
          <HeaderDashboard />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">Workflow ID not found</div>
          </div>
        </MainLayout>
      </GuardAuthPage>
    )
  }

  return (
    <GuardAuthPage>
      <MainLayout>
        <HeaderDashboard />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Workflow Logs</h1>
            <p className="text-muted-foreground">View and filter execution logs for this workflow</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left sidebar - Execution list */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Executions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Filters */}
                  <div className="space-y-4">
                    <div>
                      <Input
                        type="search"
                        placeholder="Search executions..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value={EnumExecutionStatus.Pending}>Pending</SelectItem>
                        <SelectItem value={EnumExecutionStatus.Running}>Running</SelectItem>
                        <SelectItem value={EnumExecutionStatus.Completed}>Completed</SelectItem>
                        <SelectItem value={EnumExecutionStatus.Failed}>Failed</SelectItem>
                        <SelectItem value={EnumExecutionStatus.Canceled}>Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Execution list */}
                  <ScrollArea className="h-[600px]">
                    <QueryList
                      queryRoute={$qc.workflows[':id'].executions.$get}
                      queryArgs={{ params: { id: workflowId } } as any}
                      queryOptions={LIST_CACHE}
                      renderProcessor={((items: any) => {
                        let filtered = Array.isArray(items) ? items : []

                        // Filter by status
                        if (statusFilter !== 'all') {
                          filtered = filtered.filter((item: any) => item.status === statusFilter)
                        }

                        // Filter by search query
                        if (debouncedSearch) {
                          const searchLower = debouncedSearch.toLowerCase()
                          filtered = filtered.filter((item: any) => {
                            return (
                              item.id?.toLowerCase().includes(searchLower)
                              || item.errorMessage?.toLowerCase().includes(searchLower)
                            )
                          })
                        }

                        return filtered
                      }) as any}
                      renderWrapper={<div className="space-y-2" />}
                      renderItem={({ data }, index) => {
                        const execution = data as any
                        const isSelected = execution.id === selectedExecutionId
                        return (
                          <button
                            key={execution.id || index}
                            type="button"
                            onClick={() => setSelectedExecutionId(execution.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-colors ${
                              isSelected
                                ? 'bg-primary/10 border-primary'
                                : 'hover:bg-accent border-border'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <div className="font-mono text-xs text-muted-foreground mb-1 truncate">
                                  {execution.id}
                                </div>
                                <Badge variant={executionStatusVariantMap[execution.status as EnumExecutionStatus]} className="text-xs">
                                  {executionStatusLabelMap[execution.status as EnumExecutionStatus]}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(execution.startedAt).toLocaleString()}
                            </div>
                            {execution.errorMessage && (
                              <div className="text-xs text-destructive mt-2 line-clamp-2">
                                {execution.errorMessage}
                              </div>
                            )}
                          </button>
                        )
                      }}
                      renderEmpty={<Empty.Icon message="No executions found." />}
                    />
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Right side - Log viewer */}
            <div className="lg:col-span-2">
              {selectedExecutionId
                ? (
                    <QueryData
                      queryRoute={$qc.executions[':id'].logs.$get}
                      queryArgs={{ params: { id: selectedExecutionId } } as any}
                      renderData={(data: any) => {
                        const logs = (data as any).logs || null
                        return (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h2 className="text-xl font-semibold">Execution Logs</h2>
                                <p className="text-sm text-muted-foreground">
                                  Execution ID:
                                  {' '}
                                  {selectedExecutionId}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant={autoScroll ? 'default' : 'outline'}
                                  size="sm"
                                  onClick={() => setAutoScroll(!autoScroll)}
                                >
                                  Auto Scroll
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedExecutionId(null)}
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Clear
                                </Button>
                              </div>
                            </div>
                            <LogViewer logs={logs} executionId={selectedExecutionId} />
                          </div>
                        )
                      }}
                    />
                  )
                : (
                    <Card>
                      <CardContent className="flex items-center justify-center h-[600px]">
                        <div className="text-center text-muted-foreground">
                          <p className="text-lg mb-2">Select an execution to view logs</p>
                          <p className="text-sm">Choose an execution from the list on the left</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
            </div>
          </div>
        </div>
      </MainLayout>
    </GuardAuthPage>
  )
}
