import React from 'react'
import { MainLayout } from '@/components/layout'
import { TablePagination } from '@/components/table-pagination'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loading } from './loading'

export interface Column<T> {
  key: string
  title: string
  render?: (item: T, index: number) => React.ReactNode
  className?: string
}

export interface TableDataProps<T> {
  columns: Column<T>[]
  data: T[]
  total: number
  limit: number
  currentPage: number
  isLoading: boolean
  isError: boolean
  onPageChange: (page: number, pageSize: number) => void
  emptyMessage?: string
  loadingMessage?: string
  errorMessage?: string
  className?: string
}

export function TableData<T extends { id: number | string }>({
  columns,
  data,
  total,
  limit,
  currentPage,
  isLoading,
  isError,
  onPageChange,
  emptyMessage = '暂无数据',
  loadingMessage = '加载中...',
  errorMessage = '加载失败',
  className,
}: TableDataProps<T>) {
  if (isLoading) {
    return (
      <MainLayout>
        <Loading.Card />
        <p className="text-center text-primary/50 text-xs">{loadingMessage}</p>
      </MainLayout>
    )
  }

  if (isError) {
    return (
      <MainLayout>
        <Loading.Error error={errorMessage} />
      </MainLayout>
    )
  }

  if (!data || data.length === 0) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">{emptyMessage}</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Table className={className}>
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
          {data.map((item, index) => (
            <TableRow key={item.id}>
              {columns.map(column => (
                <TableCell key={column.key} className={column.className}>
                  {column.render ? column.render(item, index) : (item as any)[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {total > 0 && total > limit && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length}>
                <TablePagination
                  current={currentPage}
                  pageSize={limit}
                  total={total}
                  onChange={onPageChange}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </MainLayout>
  )
}

// Hook for managing pagination state
export function usePagination(limit: number = 20) {
  const [offset, setOffset] = React.useState(0)
  const [total, setTotal] = React.useState(0)
  const [currentPage, setCurrentPage] = React.useState(1)

  const handlePageChange = React.useCallback((page: number, pageSize: number) => {
    setOffset((page - 1) * pageSize)
  }, [])

  const updatePagination = React.useCallback((data: any) => {
    setTotal(data?.body?.total || 0)
    setCurrentPage(Math.ceil(offset / limit) + 1)
  }, [offset, limit])

  return {
    offset,
    total,
    currentPage,
    limit,
    handlePageChange,
    updatePagination,
  }
}
