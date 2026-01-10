import { useDraggable } from '@dnd-kit/core'
import { Code, Database, FileText, Image, Mail, Settings, Zap } from 'lucide-react'

interface NodeType {
  id: string
  type: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  category: 'input' | 'process' | 'output' | 'ai'
}

const nodeTypes: NodeType[] = [
  { id: 'input-text', type: 'input', label: 'Text Input', icon: FileText, description: 'Text input field', category: 'input' },
  { id: 'input-image', type: 'input', label: 'Image Input', icon: Image, description: 'Image upload', category: 'input' },
  { id: 'input-data', type: 'input', label: 'Data Input', icon: Database, description: 'Data source', category: 'input' },
  { id: 'process-ai', type: 'ai', label: 'AI Model', icon: Zap, description: 'AI processing', category: 'ai' },
  { id: 'process-transform', type: 'process', label: 'Transform', icon: Settings, description: 'Data transformation', category: 'process' },
  { id: 'output-text', type: 'output', label: 'Text Output', icon: FileText, description: 'Text output', category: 'output' },
  { id: 'output-email', type: 'output', label: 'Email', icon: Mail, description: 'Send email', category: 'output' },
  { id: 'output-code', type: 'output', label: 'Code', icon: Code, description: 'Code output', category: 'output' },
]

interface DraggableNodeProps {
  node: NodeType
}

function DraggableNode({ node }: DraggableNodeProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: node.id,
    data: {
      type: 'node',
      nodeType: node.type,
      nodeData: node,
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined

  const Icon = node.icon

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab active:cursor-grabbing p-3 rounded-lg border bg-card hover:bg-accent transition-colors ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-primary" />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{node.label}</div>
          <div className="text-xs text-muted-foreground truncate">{node.description}</div>
        </div>
      </div>
    </div>
  )
}

interface NodeLibraryProps {
  // No props needed - DndContext is provided by parent
}

export function NodeLibrary({}: NodeLibraryProps) {
  const categories: Record<string, NodeType[]> = {
    input: nodeTypes.filter(n => n.category === 'input'),
    process: nodeTypes.filter(n => n.category === 'process'),
    ai: nodeTypes.filter(n => n.category === 'ai'),
    output: nodeTypes.filter(n => n.category === 'output'),
  }

  return (
    <div className="space-y-4">
      {Object.entries(categories).map(([category, nodes]) => (
        <div key={category}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-2">
            {category}
          </h3>
          <div className="space-y-2">
            {nodes.map(node => (
              <DraggableNode key={node.id} node={node} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
