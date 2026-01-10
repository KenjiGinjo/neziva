import type { DataReturnQuery } from '@packages/ts-rest-react-query'
import type { AppRoute, ClientArgs } from '@packages/ts-rest-react-query/ts-rest-core'
import type { ReactElement, ReactNode } from 'react'
import { cloneElement, useEffect } from 'react'
import { usePageVisibility } from '@/hooks/life-time'
import { Empty } from './empty'
import { Loading } from './loading'

interface QueryRoute<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> {
  useQuery: DataReturnQuery<TAppRoute, TClientArgs>
  getQueryKey: (args?: TClientArgs) => readonly unknown[]
}

type RouteBody<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> = NonNullable<
  ReturnType<QueryRoute<TAppRoute, TClientArgs>['useQuery']>['data']
>['body']

type ItemizeData<T extends { data: any[] }> = Omit<T, 'data'> & {
  data: T['data'][number]
}

interface QueryListProps<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> {
  queryRoute: QueryRoute<TAppRoute, TClientArgs>
  queryArgs: Parameters<QueryRoute<TAppRoute, TClientArgs>['useQuery']>['0']
  queryOptions?: Parameters<QueryRoute<TAppRoute, TClientArgs>['useQuery']>['1']
  renderItem: (item: ItemizeData<RouteBody<TAppRoute, TClientArgs>>, index: number) => ReactNode
  renderProcessor?: (items: RouteBody<TAppRoute, TClientArgs>['data']) => RouteBody<TAppRoute, TClientArgs>['data']
  hookRequested?: (data: { data: ItemizeData<RouteBody<TAppRoute, TClientArgs>>[] }) => void
  renderEmpty: ReactElement
  renderWrapper?: ReactElement
  showLoadingOnFetching?: boolean
  refetchOnLoad?: boolean
  refetchOnPageVisible?: boolean
}

export function QueryList<TAppRoute extends AppRoute, TClientArgs extends ClientArgs>({
  queryRoute,
  queryArgs,
  queryOptions = {},
  renderItem,
  renderProcessor = data => data,
  hookRequested,
  renderEmpty,
  renderWrapper: Wrapper = <div />,
  showLoadingOnFetching = false,
  refetchOnLoad = false,
  refetchOnPageVisible = false,
}: QueryListProps<TAppRoute, TClientArgs>) {
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
    const processed = renderProcessor(data.body.data)

    // 不需要支持`<Wrapper><Empty /></Wrapper>`, 因为这种等同于`<Wrapper><List /></Wrapper>`
    if (!Array.isArray(processed)) {
      return <Empty.Icon message="List data format error" />
    }
    else if (processed.length === 0) {
      return renderEmpty
    }
    else {
      return cloneElement(
        Wrapper,
        {},
        processed.map((_item: any, index: number) => renderItem({ ...data.body, data: _item }, index)),
      )
    }
  }
}
