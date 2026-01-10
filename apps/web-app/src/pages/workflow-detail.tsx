import { EnumExecutionStatus, EnumWorkflowStatus } from '@haole/enums'

import { vUpdateWorkflow } from '@haole/validations'
import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { formatDistanceToNow } from 'date-fns'
import { Copy, Edit, Play, Square, Trash2 } from 'lucide-react'
import { get } from 'radash'
import { useState } from 'react'
import { useLocation, useRoute } from 'wouter'
import { Empty } from '@/components/empty'
import { Form } from '@/components/form'
import { GuardAuthPage } from '@/components/guard/auth-page'
import { HeaderDashboard } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { QueryList } from '@/components/query-list'
import { Request } from '@/components/request'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Chart, LogViewer } from '@/components/workflow'
import { useSchemaPatch } from '@/hooks/schema-patch'
import { LIST_CACHE } from '@/lib/query-cache-config'
import { $qc } from '@/query-client'

const statusVariantMap: Record<EnumWorkflowStatus, 'default' | 'success' | 'warning' | 'destructive'> = {
  [EnumWorkflowStatus.Draft]: 'default',
  [EnumWorkflowStatus.Active]: 'success',
  [EnumWorkflowStatus.Paused]: 'warning',
  [EnumWorkflowStatus.Error]: 'destructive',
}

const statusLabelMap: Record<EnumWorkflowStatus, string> = {
  [EnumWorkflowStatus.Draft]: 'Draft',
  [EnumWorkflowStatus.Active]: 'Active',
  [EnumWorkflowStatus.Paused]: 'Paused',
  [EnumWorkflowStatus.Error]: 'Error',
}

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

export function PageWorkflowDetail() {
  const [, params] = useRoute('/workflow/:id')
  const [, setLocation] = useLocation()
  const queryClient = useQueryClient()
  const workflowId = params?.id
  const [selectedExecutionId, setSelectedExecutionId] = useState<string | null>(null)
  const [executionStatusFilter, setExecutionStatusFilter] = useState<string>('all')

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

  const handleRun = async () => {
    const runRoute = $qc.workflows[':id'].run.$post as any
    await runRoute.mutation({ params: { id: workflowId }, body: { inputData: {} } })
    // Refresh workflow data
    await queryClient.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey
        return Array.isArray(key) && typeof key[0] === 'string' && key[0].includes(`workflows/${workflowId}`)
      },
    })
  }

  const handleStop = async () => {
    const stopRoute = $qc.workflows[':id'].stop.$post as any
    await stopRoute.mutation({ params: { id: workflowId } })
    // Refresh workflow data
    await queryClient.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey
        return Array.isArray(key) && typeof key[0] === 'string' && key[0].includes(`workflows/${workflowId}`)
      },
    })
  }

  const handleDelete = async () => {
    const deleteRoute = $qc.workflows[':id'].$delete as any
    await deleteRoute.mutation({ params: { id: workflowId } })
    // Navigate back to dashboard
    setLocation('/dashboard')
  }

  const handleDuplicate = async () => {
    const duplicateRoute = $qc.workflows[':id'].duplicate.$post as any
    const res = await duplicateRoute.mutation({ params: { id: workflowId } })
    const newWorkflowId = get(res, 'body.data.id', undefined)
    if (newWorkflowId) {
      setLocation(`/workflow/${newWorkflowId}`)
    }
  }

  return (
    <GuardAuthPage>
      <MainLayout>
        <HeaderDashboard />
        <div className="container mx-auto px-4 py-8">
          <QueryData
            queryRoute={$qc.workflows[':id'].$get}
            queryArgs={{ params: { id: workflowId } } as any}
            renderData={(data) => {
              const workflow = data.data
              const status = workflow.status as EnumWorkflowStatus

              return (
                <>
                  {/* Header with Actions */}
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold">{workflow.name}</h1>
                        <Badge variant={statusVariantMap[status]}>
                          {statusLabelMap[status]}
                        </Badge>
                      </div>
                      {workflow.description && (
                        <p className="text-muted-foreground">{workflow.description}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/workflow/${workflowId}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </a>
                      </Button>
                      <Request
                        request={handleRun}
                        showLoading={true}
                        showLoadingOption={{ title: 'Running workflow...' }}
                      >
                        <Button variant="default" size="sm">
                          <Play className="mr-2 h-4 w-4" />
                          Run
                        </Button>
                      </Request>
                      <Request
                        request={handleStop}
                        showLoading={true}
                        showLoadingOption={{ title: 'Stopping workflow...' }}
                      >
                        <Button variant="outline" size="sm">
                          <Square className="mr-2 h-4 w-4" />
                          Stop
                        </Button>
                      </Request>
                      <Request
                        request={handleDuplicate}
                        showLoading={true}
                        showLoadingOption={{ title: 'Duplicating workflow...' }}
                      >
                        <Button variant="outline" size="sm">
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </Button>
                      </Request>
                      <Request
                        request={handleDelete}
                        showLoading={true}
                        showLoadingOption={{ title: 'Deleting workflow...' }}
                        showModal={true}
                        showModalOption={{
                          title: 'Delete Workflow',
                          description: 'Are you sure you want to delete this workflow? This action cannot be undone.',
                        }}
                      >
                        <Button variant="destructive" size="sm">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </Request>
                    </div>
                  </div>

                  {/* Tabs */}
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="executions">Executions</TabsTrigger>
                      <TabsTrigger value="logs">Logs</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6 space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Workflow Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Name</p>
                              <p className="font-medium">{workflow.name}</p>
                            </div>
                            {workflow.description && (
                              <div>
                                <p className="text-sm text-muted-foreground">Description</p>
                                <p className="font-medium">{workflow.description}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-sm text-muted-foreground">Status</p>
                              <Badge variant={statusVariantMap[status]}>
                                {statusLabelMap[status]}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Created At</p>
                              <p className="font-medium">
                                {formatDistanceToNow(new Date(workflow.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Statistics Charts */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Chart
                          title="Execution Trend"
                          data={[
                            { x: '2024-01-01', y: 10 },
                            { x: '2024-01-02', y: 15 },
                            { x: '2024-01-03', y: 12 },
                            { x: '2024-01-04', y: 18 },
                            { x: '2024-01-05', y: 20 },
                          ]}
                          type="line"
                          xLabel="Date"
                          yLabel="Executions"
                          height={300}
                        />
                        <Chart
                          title="Success Rate"
                          data={[
                            { x: 'Week 1', y: 85 },
                            { x: 'Week 2', y: 90 },
                            { x: 'Week 3', y: 88 },
                            { x: 'Week 4', y: 92 },
                          ]}
                          type="bar"
                          xLabel="Week"
                          yLabel="Success Rate (%)"
                          height={300}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="executions" className="mt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-semibold">Execution History</h2>
                          <Select value={executionStatusFilter} onValueChange={setExecutionStatusFilter}>
                            <SelectTrigger className="w-[180px]">
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
                        <QueryList
                          queryRoute={$qc.workflows[':id'].executions.$get}
                          queryArgs={{ params: { id: workflowId } } as any}
                          queryOptions={LIST_CACHE}
                          renderProcessor={((items: any) => {
                            // QueryList passes data.body.data which is the items array
                            const itemsArray = Array.isArray(items) ? items : []
                            if (executionStatusFilter === 'all') {
                              return itemsArray
                            }
                            return itemsArray.filter((item: any) => item.status === executionStatusFilter)
                          }) as any}
                          renderWrapper={<div className="space-y-4" />}
                          renderItem={({ data }, index) => {
                            const execution = data as any
                            return (
                              <div key={execution.id || index} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                                  <div>
                                    <div className="text-xs text-muted-foreground mb-1">ID</div>
                                    <button
                                      type="button"
                                      onClick={() => setSelectedExecutionId(execution.id)}
                                      className="text-primary hover:underline font-mono text-sm"
                                    >
                                      {execution.id?.slice(0, 8)}
                                      ...
                                    </button>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground mb-1">Status</div>
                                    <Badge variant={executionStatusVariantMap[execution.status as EnumExecutionStatus]}>
                                      {executionStatusLabelMap[execution.status as EnumExecutionStatus]}
                                    </Badge>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground mb-1">Started</div>
                                    <div className="text-sm">{new Date(execution.startedAt).toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {formatDistanceToNow(new Date(execution.startedAt), { addSuffix: true })}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground mb-1">Completed</div>
                                    {execution.completedAt
                                      ? (
                                          <>
                                            <div className="text-sm">{new Date(execution.completedAt).toLocaleString()}</div>
                                            <div className="text-xs text-muted-foreground">
                                              {formatDistanceToNow(new Date(execution.completedAt), { addSuffix: true })}
                                            </div>
                                          </>
                                        )
                                      : (
                                          <span className="text-muted-foreground text-sm">-</span>
                                        )}
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground mb-1">Duration</div>
                                    {execution.duration
                                      ? (
                                          (() => {
                                            const seconds = Math.floor(execution.duration / 1000)
                                            const minutes = Math.floor(seconds / 60)
                                            const hours = Math.floor(minutes / 60)
                                            if (hours > 0) {
                                              return (
                                                <span className="text-sm">
                                                  {hours}
                                                  h
                                                  {' '}
                                                  {minutes % 60}
                                                  m
                                                </span>
                                              )
                                            }
                                            if (minutes > 0) {
                                              return (
                                                <span className="text-sm">
                                                  {minutes}
                                                  m
                                                  {' '}
                                                  {seconds % 60}
                                                  s
                                                </span>
                                              )
                                            }
                                            return (
                                              <span className="text-sm">
                                                {seconds}
                                                s
                                              </span>
                                            )
                                          })()
                                        )
                                      : (
                                          <span className="text-muted-foreground text-sm">-</span>
                                        )}
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground mb-1">Error</div>
                                    {execution.errorMessage
                                      ? (
                                          <span className="text-sm text-destructive line-clamp-2">{execution.errorMessage}</span>
                                        )
                                      : (
                                          <span className="text-muted-foreground text-sm">-</span>
                                        )}
                                  </div>
                                </div>
                              </div>
                            )
                          }}
                          renderEmpty={<Empty.Icon message="No executions found." />}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="logs" className="mt-6">
                      <div className="space-y-4">
                        {selectedExecutionId ? (
                          <QueryData
                            queryRoute={$qc.executions[':id'].logs.$get}
                            queryArgs={{ params: { id: selectedExecutionId } } as any}
                            renderData={(data: any) => {
                              // QueryData passes data.body, ResExecutionLogs has { logs: string | null }
                              const logs = (data as any).logs || null
                              return (
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Execution Logs</h2>
                                    <Button variant="outline" size="sm" onClick={() => setSelectedExecutionId(null)}>
                                      Back to List
                                    </Button>
                                  </div>
                                  <LogViewer logs={logs} executionId={selectedExecutionId} />
                                </div>
                              )
                            }}
                          />
                        ) : (
                          <div className="text-center text-muted-foreground py-8">
                            <p>Select an execution from the Executions tab to view logs.</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="settings" className="mt-6">
                      <WorkflowSettingsForm workflow={workflow} workflowId={workflowId} />
                    </TabsContent>
                  </Tabs>
                </>
              )
            }}
          />
        </div>
      </MainLayout>
    </GuardAuthPage>
  )
}

function WorkflowSettingsForm({ workflow, workflowId }: { workflow: any, workflowId: string }) {
  const queryClient = useQueryClient()
  const { form, dto, patch } = useSchemaPatch(vUpdateWorkflow, {
    name: workflow.name,
    description: workflow.description || '',
    status: workflow.status,
  })

  const handleSave = async () => {
    const updateRoute = $qc.workflows[':id'].$put as any
    await updateRoute.mutation({ params: { id: workflowId }, body: dto })
    // Refresh workflow data
    await queryClient.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey
        return Array.isArray(key) && typeof key[0] === 'string' && key[0].includes(`workflows/${workflowId}`)
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form.Form form={form} onChange={patch}>
          <div className="space-y-4">
            <Form.Input
              name="name"
              label="Name"
              placeholder="Enter workflow name"
            />
            <Form.Textarea
              name="description"
              label="Description"
              placeholder="Enter workflow description"
            />
            <div className="flex items-center justify-end gap-2">
              <Form.Submit
                form={form}
                request={handleSave}
                showLoading={true}
                showLoadingOption={{ title: 'Saving settings...' }}
              >
                <Button type="button">Save Changes</Button>
              </Form.Submit>
            </div>
          </div>
        </Form.Form>
      </CardContent>
    </Card>
  )
}
