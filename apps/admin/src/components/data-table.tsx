'use client'

import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  SortingState,
  Table as TanStackTable,
  VisibilityState,
} from '@tanstack/react-table'
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Generic types for the data table
export interface DataTableProps<TData, TValue> {
  // Core data and columns
  data: TData[]
  columns: ColumnDef<TData, TValue>[]

  // Table configuration
  enableRowSelection?: boolean
  enableSorting?: boolean
  enableColumnFilters?: boolean
  enableColumnVisibility?: boolean
  enablePagination?: boolean
  enableDragAndDrop?: boolean

  // Custom renderers
  renderEmptyState?: () => React.ReactNode
  renderToolbar?: (table: TanStackTable<TData>) => React.ReactNode
  renderPagination?: (table: TanStackTable<TData>) => React.ReactNode

  // Callbacks
  onRowSelectionChange?: (selection: Record<string, boolean>) => void
  onSortingChange?: (sorting: SortingState) => void
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void
  onColumnVisibilityChange?: (visibility: VisibilityState) => void
  onPaginationChange?: (pagination: PaginationState) => void
  onDragEnd?: (event: DragEndEvent, data: TData[]) => void

  // Initial state
  initialRowSelection?: Record<string, boolean>
  initialSorting?: SortingState
  initialColumnFilters?: ColumnFiltersState
  initialColumnVisibility?: VisibilityState
  initialPagination?: PaginationState

  // Pagination options
  pageSizeOptions?: number[]
  defaultPageSize?: number

  // Drag and drop options
  dragHandleColumnId?: string
  getRowId?: (row: TData) => string

  // Styling
  className?: string
  tableClassName?: string
  headerClassName?: string
  bodyClassName?: string
}

// Default empty state component
function DefaultEmptyState() {
  return (
    <TableRow>
      <TableCell colSpan={100} className="h-24 text-center text-muted-foreground">
        No results found.
      </TableCell>
    </TableRow>
  )
}

// Default toolbar component
function DefaultToolbar<TData>({ table }: { table: TanStackTable<TData> }) {
  // Add safety checks
  if (!table || !table.getFilteredRowModel) {
    return (
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-2">
        {/* Simple search placeholder - can be customized per use case */}
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length}
          {' '}
          items
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column: any) => column.getCanHide())
            .map((column: any) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={value => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// Default pagination component
function DefaultPagination<TData>({ table }: { table: TanStackTable<TData> }) {
  // Add safety checks
  if (!table || !table.getFilteredRowModel || !table.getState) {
    return (
      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between px-4">
      <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
        {table.getFilteredRowModel().rows.length}
        {' '}
        row(s) total.
      </div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page
          {' '}
          {table.getState().pagination.pageIndex + 1}
          {' '}
          of
          {' '}
          {table.getPageCount()}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            IconChevronsLeft
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            IconChevronLeft
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            IconChevronRight
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            IconChevronsRight
          </Button>
        </div>
      </div>
    </div>
  )
}

// Drag handle component
function DragHandle({
  id,
  enableDragAndDrop,
}: {
  id: string | number
  enableDragAndDrop: boolean
}) {
  const { attributes, listeners } = useSortable({
    id,
  })

  if (!enableDragAndDrop)
    return null

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      IconGripVertical
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

// Draggable row component
function DraggableRow<TData>({
  row,
  enableDragAndDrop,
}: {
  row: Row<TData>
  enableDragAndDrop: boolean
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id,
  })

  if (!enableDragAndDrop) {
    return (
      <TableRow data-state={row.getIsSelected() && 'selected'}>
        {row.getVisibleCells().map(cell => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    )
  }

  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {row.getVisibleCells().map(cell => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

// Main DataTable component
export function DataTable<TData, TValue>({
  data,
  columns,
  enableRowSelection = false,
  enableSorting = true,
  enableColumnFilters = true,
  enableColumnVisibility = true,
  enablePagination = true,
  enableDragAndDrop = false,
  renderEmptyState = DefaultEmptyState,
  renderToolbar = DefaultToolbar as unknown as (table: TanStackTable<TData>) => React.ReactNode,
  renderPagination = DefaultPagination as unknown as (table: TanStackTable<TData>) => React.ReactNode,
  onRowSelectionChange,
  onSortingChange,
  onColumnFiltersChange,
  onColumnVisibilityChange,
  onPaginationChange,
  onDragEnd,
  initialRowSelection = {},
  initialSorting = [],
  initialColumnFilters = [],
  initialColumnVisibility = {},
  initialPagination = { pageIndex: 0, pageSize: 10 },
  pageSizeOptions: _pageSizeOptions = [10, 20, 30, 40, 50],
  defaultPageSize: _defaultPageSize = 10,
  dragHandleColumnId = 'drag',
  getRowId = (row: TData) => (row as any).id?.toString() || Math.random().toString(),
  className = '',
  tableClassName = '',
  headerClassName = '',
  bodyClassName = '',
}: DataTableProps<TData, TValue>) {
  // State management
  const [rowSelection, setRowSelection] = React.useState(initialRowSelection)
  const [columnVisibility, setColumnVisibility] = React.useState(initialColumnVisibility)
  const [columnFilters, setColumnFilters] = React.useState(initialColumnFilters)
  const [sorting, setSorting] = React.useState(initialSorting)
  const [pagination, setPagination] = React.useState(initialPagination)

  // Drag and drop setup
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(item => getRowId(item)) || [],
    [data, getRowId],
  )

  // Enhanced columns with drag handle if enabled
  const enhancedColumns = React.useMemo(() => {
    if (!enableDragAndDrop)
      return columns

    const dragColumn: ColumnDef<TData, TValue> = {
      id: dragHandleColumnId,
      header: () => null,
      cell: ({ row }) => (
        <DragHandle
          id={getRowId(row.original)}
          enableDragAndDrop={enableDragAndDrop}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }

    return [dragColumn, ...columns]
  }, [columns, enableDragAndDrop, dragHandleColumnId, getRowId])

  // Table instance
  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: {
      sorting: enableSorting ? sorting : undefined,
      columnVisibility: enableColumnVisibility ? columnVisibility : undefined,
      rowSelection: enableRowSelection ? rowSelection : undefined,
      columnFilters: enableColumnFilters ? columnFilters : undefined,
      pagination: enablePagination ? pagination : undefined,
    },
    getRowId,
    enableRowSelection,
    enableSorting,
    enableColumnFilters,
    manualPagination: !enablePagination,
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater
      setRowSelection(newSelection)
      onRowSelectionChange?.(newSelection)
    },
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(sorting) : updater
      setSorting(newSorting)
      onSortingChange?.(newSorting)
    },
    onColumnFiltersChange: (updater) => {
      const newFilters = typeof updater === 'function' ? updater(columnFilters) : updater
      setColumnFilters(newFilters)
      onColumnFiltersChange?.(newFilters)
    },
    onColumnVisibilityChange: (updater) => {
      const newVisibility = typeof updater === 'function' ? updater(columnVisibility) : updater
      setColumnVisibility(newVisibility)
      onColumnVisibilityChange?.(newVisibility)
    },
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater
      setPagination(newPagination)
      onPaginationChange?.(newPagination)
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  // Drag and drop handlers
  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id)
      const newIndex = dataIds.indexOf(over.id)
      const newData = arrayMove(data, oldIndex, newIndex)
      onDragEnd?.(event, newData)
    }
  }, [dataIds, data, onDragEnd])

  // Render table content
  const renderTableContent = () => {
    if (table.getRowModel().rows?.length) {
      if (enableDragAndDrop) {
        return (
          <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
            {table.getRowModel().rows.map(row => (
              <DraggableRow key={row.id} row={row} enableDragAndDrop={enableDragAndDrop} />
            ))}
          </SortableContext>
        )
      }
      return table.getRowModel().rows.map(row => (
        <DraggableRow key={row.id} row={row} enableDragAndDrop={false} />
      ))
    }
    return renderEmptyState()
  }

  // Check if table is ready
  const isTableReady = table && typeof table.getRowModel === 'function' && typeof table.getHeaderGroups === 'function'

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Toolbar */}
      {isTableReady && renderToolbar(table)}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        {enableDragAndDrop
          ? (
              <DndContext
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
                sensors={sensors}
                id={sortableId}
              >
                <Table className={tableClassName}>
                  <TableHeader className={`bg-muted sticky top-0 z-10 ${headerClassName}`}>
                    {table.getHeaderGroups().map(headerGroup => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <TableHead key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody className={bodyClassName}>
                    {renderTableContent()}
                  </TableBody>
                </Table>
              </DndContext>
            )
          : (
              <Table className={tableClassName}>
                <TableHeader className={`bg-muted sticky top-0 z-10 ${headerClassName}`}>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody className={bodyClassName}>
                  {renderTableContent()}
                </TableBody>
              </Table>
            )}
      </div>

      {/* Pagination */}
      {enablePagination && isTableReady && renderPagination(table)}
    </div>
  )
}

// Export types for external use
export type { ColumnDef, ColumnFiltersState, PaginationState, SortingState, VisibilityState }
