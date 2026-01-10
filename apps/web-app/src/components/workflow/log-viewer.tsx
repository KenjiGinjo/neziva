import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

interface LogViewerProps {
  logs: string | null
  executionId?: string
}

export function LogViewer({ logs, executionId }: LogViewerProps) {
  const logContent = logs || 'No logs available'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Execution Logs</CardTitle>
        {executionId && (
          <p className="text-sm text-muted-foreground">
            Execution ID:
            {executionId}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full rounded-md border p-4">
          <SyntaxHighlighter
            language="text"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              background: 'transparent',
              fontSize: '13px',
              lineHeight: '1.6',
            }}
            showLineNumbers
            wrapLines
          >
            {logContent}
          </SyntaxHighlighter>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
