import type { ReactNode } from 'react'
import { Empty } from '@/components/empty'
import { TablePagination } from '@/components/table-pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

export interface PagedColumn<T> {
  key: string
  title: string
  className?: string
  render?: (item: T) => ReactNode
}

export function PagedTable<T extends { id: string }>({
  columns,
  data,
  total,
  page,
  pageSize,
  onPageChange,
  empty = '暂无数据',
  onRowClick,
}: {
  columns: PagedColumn<T>[]
  data: T[]
  total: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  empty?: string
  onRowClick?: (item: T) => void
}) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border bg-card">
        <Empty.Text message={empty} dash={false} />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={column.key} className={column.className}>
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(item => (
            <TableRow
              key={item.id}
              className={cn(onRowClick && 'cursor-pointer')}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map(column => (
                <TableCell key={column.key} className={column.className}>
                  {column.render ? column.render(item) : (item as Record<string, unknown>)[column.key] as ReactNode}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {total > pageSize && (
        <div className="border-t px-4 py-3">
          <TablePagination
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={next => onPageChange(next)}
          />
        </div>
      )}
    </div>
  )
}
