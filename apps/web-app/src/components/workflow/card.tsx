import { EnumWorkflowStatus } from '@haole/enums'
import { formatDistanceToNow } from 'date-fns'
import { MoreVertical, Trash2 } from 'lucide-react'
import { Link } from 'wouter'
import { Request } from '@/components/request'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface WorkflowCardProps {
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
  onDelete?: () => Promise<void>
}

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

export function WorkflowCard({
  id,
  name,
  description,
  status,
  executionCount,
  successCount,
  errorCount,
  lastExecutedAt,
  onDelete,
}: WorkflowCardProps) {
  const successRate = executionCount > 0
    ? ((successCount / executionCount) * 100).toFixed(1)
    : '0.0'

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{name}</CardTitle>
            {description && (
              <CardDescription className="line-clamp-2">{description}</CardDescription>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={statusVariantMap[status]}>
              {statusLabelMap[status]}
            </Badge>
            {onDelete && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Request
                    request={onDelete}
                    showLoading={true}
                    showLoadingOption={{
                      title: 'Deleting workflow...',
                    }}
                    showModal={true}
                    showModalOption={{
                      title: 'Delete Workflow',
                      description: 'Are you sure you want to delete this workflow? This action cannot be undone.',
                    }}
                  >
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault()
                      }}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </Request>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Executions</span>
            <span className="font-medium">{executionCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Success</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">{successCount}</span>
          </div>
          {errorCount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Errors</span>
              <span className="font-medium text-red-600 dark:text-red-400">{errorCount}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Success Rate</span>
            <span className="font-medium">
              {successRate}
              %
            </span>
          </div>
          {lastExecutedAt && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last Executed</span>
              <span className="font-medium">
                {formatDistanceToNow(new Date(lastExecutedAt), { addSuffix: true })}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link href={`/workflow/${id}`}>View</Link>
        </Button>
        <Button variant="default" size="sm" className="flex-1" asChild>
          <Link href={`/workflow/${id}/edit`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
