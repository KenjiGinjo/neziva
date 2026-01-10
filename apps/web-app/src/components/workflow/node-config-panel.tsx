import type { Node } from '@xyflow/react'
import { z } from 'zod'
import { Form } from '@/components/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSchemaPatch } from '@/hooks/schema-patch'

interface NodeConfigPanelProps {
  selectedNode: Node | null
  onNodeUpdate?: (nodeId: string, data: any) => void
}

const nodeConfigSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  description: z.string().optional(),
})

export function NodeConfigPanel({ selectedNode, onNodeUpdate }: NodeConfigPanelProps) {
  if (!selectedNode) {
    return (
      <Card className="border-0 shadow-none rounded-none h-full">
        <CardHeader>
          <CardTitle className="text-lg">Node Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground p-4 text-center">
            Select a node to configure
          </div>
        </CardContent>
      </Card>
    )
  }

  const { form, dto } = useSchemaPatch(nodeConfigSchema, {
    label: selectedNode.data.label || '',
    description: selectedNode.data.description || '',
  })

  const handleSave = async () => {
    if (onNodeUpdate && selectedNode) {
      onNodeUpdate(selectedNode.id, dto)
    }
  }

  return (
    <Card className="border-0 shadow-none rounded-none h-full">
      <CardHeader>
        <CardTitle className="text-lg">Node Configuration</CardTitle>
        <p className="text-sm text-muted-foreground">
          {selectedNode.type}
          {' '}
          Node
        </p>
      </CardHeader>
      <CardContent>
        <Form.Form form={form}>
          <div className="space-y-4">
            <Form.Input
              name="label"
              label="Label"
              placeholder="Enter node label"
            />
            {/* Add more fields based on node type */}
            <div className="flex items-center justify-end gap-2">
              <Form.Submit
                form={form}
                request={handleSave}
                showLoading={true}
                showLoadingOption={{ title: 'Updating node...' }}
              >
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm">
                  Save
                </button>
              </Form.Submit>
            </div>
          </div>
        </Form.Form>
      </CardContent>
    </Card>
  )
}
