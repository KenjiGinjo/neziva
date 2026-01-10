import type {
  Connection,
  DefaultEdgeOptions,
  Edge,
  Node,
  NodeMouseHandler,
  NodeTypes,
} from '@xyflow/react'
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'
import { useCallback, useEffect } from 'react'
import '@xyflow/react/dist/style.css'

interface WorkflowCanvasProps {
  initialNodes?: Node[]
  initialEdges?: Edge[]
  onNodesChange?: (nodes: Node[]) => void
  onEdgesChange?: (edges: Edge[]) => void
  onNodeSelect?: (node: Node | null) => void
  selectedNodeId?: string | null
}

const defaultNodeTypes: NodeTypes = {
  input: ({ data }) => (
    <div className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md">
      {data.label || 'Input'}
    </div>
  ),
  process: ({ data }) => (
    <div className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md">
      {data.label || 'Process'}
    </div>
  ),
  output: ({ data }) => (
    <div className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md">
      {data.label || 'Output'}
    </div>
  ),
  ai: ({ data }) => (
    <div className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md">
      {data.label || 'AI Model'}
    </div>
  ),
}

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
  style: { strokeWidth: 2 },
}

export function WorkflowCanvas({
  initialNodes = [],
  initialEdges = [],
  onNodesChange,
  onEdgesChange,
  onNodeSelect,
  selectedNodeId,
}: WorkflowCanvasProps) {
  const [nodes, setNodes, onNodesChangeInternal] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState(initialEdges)

  useEffect(() => {
    if (onNodesChange) {
      onNodesChange(nodes)
    }
  }, [nodes, onNodesChange])

  useEffect(() => {
    if (onEdgesChange) {
      onEdgesChange(edges)
    }
  }, [edges, onEdgesChange])

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges(eds => addEdge(params, eds))
    },
    [setEdges],
  )

  const onNodeClick: NodeMouseHandler = useCallback(
    (event, node) => {
      if (onNodeSelect) {
        onNodeSelect(node)
      }
    },
    [onNodeSelect],
  )

  const onPaneClick = useCallback(() => {
    if (onNodeSelect) {
      onNodeSelect(null)
    }
  }, [onNodeSelect])

  // Update node selection state
  useEffect(() => {
    setNodes(nds => nds.map(n => ({
      ...n,
      selected: n.id === selectedNodeId,
    })))
  }, [selectedNodeId, setNodes])

  return (
    <div className="w-full h-full" style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeInternal}
        onEdgesChange={onEdgesChangeInternal}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={defaultNodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
