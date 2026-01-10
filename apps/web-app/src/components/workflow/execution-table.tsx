import type { ColumnDef } from '@tanstack/react-table'

import { EnumExecutionStatus } from '@haole/enums'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'wouter'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/table'

interface Execution {
  id: string
  status: EnumExecutionStatus
  startedAt: string
  completedAt?: string | null
  duration?: number | null
  errorMessage?: string | null
}

const statusVariantMap: Record<EnumExecutionStatus, 'default' | 'success' | 'warning' | 'destructive'> = {
  [EnumExecutionStatus.Pending]: 'default',
  [EnumExecutionStatus.Running]: 'warning',
  [EnumExecutionStatus.Completed]: 'success',
  [EnumExecutionStatus.Failed]: 'destructive',
  [EnumExecutionStatus.Canceled]: 'default',
}

const statusLabelMap: Record<EnumExecutionStatus, string> = {
  [EnumExecutionStatus.Pending]: 'Pending',
  [EnumExecutionStatus.Running]: 'Running',
  [EnumExecutionStatus.Completed]: 'Completed',
  [EnumExecutionStatus.Failed]: 'Failed',
  [EnumExecutionStatus.Canceled]: 'Canceled',
}

interface ExecutionTableProps {
  executions: Execution[]
  workflowId: string
}

export function ExecutionTable({ executions, workflowId }: ExecutionTableProps) {
  const columns: ColumnDef<Execution>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => {
        const id = row.getValue('id') as string
        return (
          <Link href={`/workflow/${workflowId}/execution/${id}`} className="text-primary hover:underline font-mono text-sm">
            {id.slice(0, 8)}
            ...
          </Link>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as EnumExecutionStatus
        return (
          <Badge variant={statusVariantMap[status]}>
            {statusLabelMap[status]}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'startedAt',
      header: 'Started',
      cell: ({ row }) => {
        const startedAt = row.getValue('startedAt') as string
        return (
          <div className="text-sm">
            <div>{new Date(startedAt).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(startedAt), { addSuffix: true })}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'completedAt',
      header: 'Completed',
      cell: ({ row }) => {
        const completedAt = row.original.completedAt
        if (!completedAt) {
          return <span className="text-muted-foreground text-sm">-</span>
        }
        return (
          <div className="text-sm">
            <div>{new Date(completedAt).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(completedAt), { addSuffix: true })}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'duration',
      header: 'Duration',
      cell: ({ row }) => {
        const duration = row.original.duration
        if (!duration) {
          return <span className="text-muted-foreground text-sm">-</span>
        }
        const seconds = Math.floor(duration / 1000)
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
      },
    },
    {
      accessorKey: 'errorMessage',
      header: 'Error',
      cell: ({ row }) => {
        const errorMessage = row.original.errorMessage
        if (!errorMessage) {
          return <span className="text-muted-foreground text-sm">-</span>
        }
        return (
          <div className="max-w-md">
            <span className="text-sm text-destructive line-clamp-2">{errorMessage}</span>
          </div>
        )
      },
    },
  ]

  return <DataTable columns={columns} data={executions} />
}
