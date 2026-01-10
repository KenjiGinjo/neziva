import type { DataReturnQuery } from '@packages/ts-rest-react-query'
import type { AppRoute, ClientArgs } from '@packages/ts-rest-react-query/ts-rest-core'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { usePageVisibility } from '@/hooks/life-time'
import { Loading } from './loading'

interface QueryRoute<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> {
  useQuery: DataReturnQuery<TAppRoute, TClientArgs>
}

interface QueryDataProps<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> {
  queryRoute: QueryRoute<TAppRoute, TClientArgs>
  queryArgs: Parameters<QueryRoute<TAppRoute, TClientArgs>['useQuery']>['0']
  queryOptions?: Parameters<QueryRoute<TAppRoute, TClientArgs>['useQuery']>['1']
  renderData: (
    item: NonNullable<ReturnType<QueryRoute<TAppRoute, TClientArgs>['useQuery']>['data']>['body'],
  ) => ReactNode
  hookRequested?: (
    item: NonNullable<ReturnType<QueryRoute<TAppRoute, TClientArgs>['useQuery']>['data']>['body'],
  ) => void
  showLoadingOnFetching?: boolean
  refetchOnLoad?: boolean
  refetchOnPageVisible?: boolean
}

export function QueryData<TAppRoute extends AppRoute, TClientArgs extends ClientArgs>({
  queryRoute,
  queryArgs,
  queryOptions = {},
  renderData,
  hookRequested,
  showLoadingOnFetching = false,
  refetchOnLoad = false,
  refetchOnPageVisible = false,
}: QueryDataProps<TAppRoute, TClientArgs>) {
  const { isLoading, isFetching, error, data, refetch } = queryRoute.useQuery(queryArgs as any, {
    ...queryOptions,
    hookRequested: ({ body }) => hookRequested?.(body),
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
    return renderData(data.body)
  }
}
