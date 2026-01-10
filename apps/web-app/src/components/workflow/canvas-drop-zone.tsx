import { useDroppable } from '@dnd-kit/core'

interface CanvasDropZoneProps {
  children: React.ReactNode
}

export function CanvasDropZone({ children }: CanvasDropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
    data: {
      type: 'canvas',
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 relative bg-muted/20 ${isOver ? 'bg-primary/5 border-2 border-primary border-dashed' : ''}`}
      style={{ width: '100%', height: '100%', minHeight: 0 }}
    >
      {children}
    </div>
  )
}
