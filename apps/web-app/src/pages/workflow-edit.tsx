import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'

import type { Edge, Node } from '@xyflow/react'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { EnumWorkflowStatus } from '@haole/enums'
import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { Menu, Play, Save, Square, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useLocation, useRoute } from 'wouter'
import { GuardAuthPage } from '@/components/guard/auth-page'
import { HeaderDashboard } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { Request } from '@/components/request'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { CanvasDropZone } from '@/components/workflow/canvas-drop-zone'
import { NodeConfigPanel } from '@/components/workflow/node-config-panel'
import { NodeLibrary } from '@/components/workflow/node-library'
import { WorkflowCanvas } from '@/components/workflow/workflow-canvas'
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

export function PageWorkflowEdit() {
  const [, params] = useRoute('/workflow/:id/edit')
  const [, setLocation] = useLocation()
  const queryClient = useQueryClient()
  const workflowId = params?.id
  const [hasChanges, setHasChanges] = useState(false)
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false)

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

  const handleSave = async () => {
    const updateRoute = $qc.workflows[':id'].$put as any
    await updateRoute.mutation({
      params: { id: workflowId },
      body: {
        workflowData: {
          nodes,
          edges,
        },
      },
    })
    await queryClient.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey
        return Array.isArray(key) && typeof key[0] === 'string' && key[0].includes(`workflows/${workflowId}`)
      },
    })
    setHasChanges(false)
  }

  const handleNodesChange = useCallback((newNodes: Node[]) => {
    setNodes(newNodes)
    setHasChanges(true)
  }, [])

  const handleEdgesChange = useCallback((newEdges: Edge[]) => {
    setEdges(newEdges)
    setHasChanges(true)
  }, [])

  const handleNodeUpdate = useCallback((nodeId: string, data: any) => {
    setNodes(nds => nds.map(n => n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n))
    setHasChanges(true)
  }, [])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragId(event.active.id as string)
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    setActiveDragId(null)

    if (over?.id === 'canvas' && active?.data?.current) {
      const nodeData = active.data.current.nodeData
      const nodeType = active.data.current.nodeType

      // Create new node at default position (will be positioned by ReactFlow)
      const newNode: Node = {
        id: `${nodeType}-${Date.now()}`,
        type: nodeType,
        position: { x: 100, y: 100 },
        data: {
          label: nodeData.label,
          ...nodeData,
        },
      }

      setNodes(nds => [...nds, newNode])
      setHasChanges(true)
    }
  }, [])

  const handleNodeSelect = useCallback((node: Node | null) => {
    setSelectedNode(node)
  }, [])

  const handleRun = async () => {
    const runRoute = $qc.workflows[':id'].run.$post as any
    await runRoute.mutation({ params: { id: workflowId }, body: { inputData: {} } })
  }

  const handleStop = async () => {
    const stopRoute = $qc.workflows[':id'].stop.$post as any
    await stopRoute.mutation({ params: { id: workflowId } })
  }

  return (
    <GuardAuthPage>
      <MainLayout>
        <HeaderDashboard />
        <QueryData
          queryRoute={$qc.workflows[':id'].$get}
          queryArgs={{ params: { id: workflowId } } as any}
          hookRequested={(data) => {
            const workflow = data.data
            // Initialize nodes and edges from workflow data
            if (workflow.workflowData) {
              const workflowNodes = workflow.workflowData.nodes || []
              const workflowEdges = workflow.workflowData.edges || []
              if (workflowNodes.length > 0 || workflowEdges.length > 0) {
                setNodes(workflowNodes as Node[])
                setEdges(workflowEdges as Edge[])
              }
            }
          }}
          renderData={(data) => {
            const workflow = data.data
            const status = workflow.status as EnumWorkflowStatus

            return (
              <div className="flex flex-col h-[calc(100vh-4rem)]">
                {/* Top toolbar */}
                <div className="border-b bg-background px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <h1 className="text-xl font-bold flex items-center gap-2">
                        {workflow.name}
                        <Badge variant={statusVariantMap[status]}>
                          {statusLabelMap[status]}
                        </Badge>
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLocation(`/workflow/${workflowId}`)}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Close
                    </Button>
                    <Request
                      request={handleSave}
                      showLoading={true}
                      showLoadingOption={{ title: 'Saving workflow...' }}
                    >
                      <Button
                        variant="default"
                        size="sm"
                        disabled={!hasChanges}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </Request>
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
                  </div>
                </div>

                {/* Main editor area */}
                <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                  <div className="flex-1 flex overflow-hidden relative">
                    {/* Left sidebar - Node Library (Desktop) */}
                    <div className="hidden lg:block w-64 border-r bg-muted/30 overflow-y-auto">
                      <Card className="border-0 shadow-none rounded-none h-full">
                        <CardHeader>
                          <CardTitle className="text-lg">Node Library</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <NodeLibrary />
                        </CardContent>
                      </Card>
                    </div>

                    {/* Mobile: Left Drawer for Node Library */}
                    <Drawer open={leftDrawerOpen} onOpenChange={setLeftDrawerOpen}>
                      <DrawerContent className="h-[80vh] max-w-xs" data-vaul-drawer-direction="left">
                        <DrawerHeader>
                          <DrawerTitle>Node Library</DrawerTitle>
                          <DrawerClose asChild>
                            <Button variant="ghost" size="icon" className="absolute right-4 top-4">
                              <X className="h-4 w-4" />
                            </Button>
                          </DrawerClose>
                        </DrawerHeader>
                        <div className="flex-1 overflow-y-auto p-4">
                          <NodeLibrary />
                        </div>
                      </DrawerContent>
                    </Drawer>

                    {/* Center - Canvas */}
                    <div className="flex-1 relative" style={{ minHeight: 0 }}>
                      {/* Mobile: Menu buttons */}
                      <div className="lg:hidden absolute top-2 left-2 z-10 flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setLeftDrawerOpen(true)}
                          aria-label="Open Node Library"
                        >
                          <Menu className="h-4 w-4" />
                        </Button>
                        {selectedNode && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setRightDrawerOpen(true)}
                            aria-label="Open Node Configuration"
                          >
                            <Menu className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <CanvasDropZone>
                        <WorkflowCanvas
                          initialNodes={nodes}
                          initialEdges={edges}
                          onNodesChange={handleNodesChange}
                          onEdgesChange={handleEdgesChange}
                          onNodeSelect={handleNodeSelect}
                          selectedNodeId={selectedNode?.id || null}
                        />
                      </CanvasDropZone>
                    </div>

                    {/* Right sidebar - Node Config Panel (Desktop) */}
                    {selectedNode && (
                      <div className="hidden lg:block w-80 border-l bg-muted/30 overflow-y-auto">
                        <NodeConfigPanel
                          selectedNode={selectedNode}
                          onNodeUpdate={handleNodeUpdate}
                        />
                      </div>
                    )}

                    {/* Mobile: Right Drawer for Node Config Panel */}
                    {selectedNode && (
                      <Drawer open={rightDrawerOpen} onOpenChange={setRightDrawerOpen}>
                        <DrawerContent className="h-[80vh] max-w-xs" data-vaul-drawer-direction="right">
                          <DrawerHeader>
                            <DrawerTitle>Node Configuration</DrawerTitle>
                            <DrawerClose asChild>
                              <Button variant="ghost" size="icon" className="absolute right-4 top-4">
                                <X className="h-4 w-4" />
                              </Button>
                            </DrawerClose>
                          </DrawerHeader>
                          <div className="flex-1 overflow-y-auto p-4">
                            <NodeConfigPanel
                              selectedNode={selectedNode}
                              onNodeUpdate={handleNodeUpdate}
                            />
                          </div>
                        </DrawerContent>
                      </Drawer>
                    )}
                  </div>

                  <DragOverlay>
                    {activeDragId
                      ? (
                          <Card className="p-3 w-48 opacity-90">
                            <div className="text-sm font-medium">Dragging node...</div>
                          </Card>
                        )
                      : null}
                  </DragOverlay>
                </DndContext>
              </div>
            )
          }}
        />
      </MainLayout>
    </GuardAuthPage>
  )
}
