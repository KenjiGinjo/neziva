import type { DataReturnQuery } from '@packages/ts-rest-react-query'
import type { AppRoute, ClientArgs } from '@packages/ts-rest-react-query/ts-rest-core'
import React, { useEffect } from 'react'
import { usePageVisibility } from '@/hooks/life-time'
import { Loading } from './loading'
import { TableData } from './table-data'

interface QueryRoute<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> {
  useQuery: DataReturnQuery<TAppRoute, TClientArgs>
}

interface Column<T> {
  key: string
  title: string
  render?: (item: T, index: number) => React.ReactNode
  className?: string
}

interface QueryTableProps<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> {
  queryRoute: QueryRoute<TAppRoute, TClientArgs>
  queryArgs: Parameters<QueryRoute<TAppRoute, TClientArgs>['useQuery']>['0']
  queryOptions?: Parameters<QueryRoute<TAppRoute, TClientArgs>['useQuery']>['1']
  columns: Column<NonNullable<ReturnType<QueryRoute<TAppRoute, TClientArgs>['useQuery']>['data']>['body']['data'][number]>[]
  limit?: number
  hookRequested?: (
    item: NonNullable<ReturnType<QueryRoute<TAppRoute, TClientArgs>['useQuery']>['data']>['body'],
  ) => void
  showLoadingOnFetching?: boolean
  refetchOnLoad?: boolean
  refetchOnPageVisible?: boolean
}

export function QueryTable<TAppRoute extends AppRoute, TClientArgs extends ClientArgs>({
  queryRoute,
  queryArgs,
  queryOptions = {},
  columns,
  limit = 20,
  hookRequested,
  showLoadingOnFetching = false,
  refetchOnLoad = false,
  refetchOnPageVisible = false,
}: QueryTableProps<TAppRoute, TClientArgs>) {
  const [offset, setOffset] = React.useState(0)
  const [total, setTotal] = React.useState(0)
  const [currentPage, setCurrentPage] = React.useState(1)

  const handlePageChange = React.useCallback((page: number, pageSize: number) => {
    setOffset((page - 1) * pageSize)
  }, [])

  useEffect(() => {
    setOffset(0)
    setCurrentPage(1)
  }, [queryArgs])

  const { isLoading, isFetching, error, data, refetch } = queryRoute.useQuery({
    ...queryArgs,
    query: {
      ...(queryArgs as any)?.query,
      offset,
      limit,
    },
  } as any, {
    ...queryOptions,
    hookRequested: ({ body }) => {
      hookRequested?.(body)
      setTotal(body.total)
      setCurrentPage(Math.ceil(offset / limit) + 1)
    },
  })

  useEffect(() => {
    if (refetchOnLoad) {
      refetch()
    }
  }, [refetchOnLoad, refetch])

  usePageVisibility((visible) => {
    if (refetchOnPageVisible && visible) {
      refetch()
    }
  }, refetchOnPageVisible)

  const showLoading = showLoadingOnFetching ? isLoading || isFetching : isLoading

  if (showLoading) {
    return <Loading.Card />
  }
  else if (error || !data) {
    return <Loading.Error error={error} />
  }
  else {
    return (
      <TableData
        columns={columns}
        data={data.body.data}
        total={total}
        limit={limit}
        currentPage={currentPage}
        isLoading={isLoading}
        isError={false}
        onPageChange={handlePageChange}
      />
    )
  }
}
