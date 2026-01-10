import type { DataReturnInfiniteQuery } from '@packages/ts-rest-react-query'
import type { AppRoute, ClientArgs } from '@packages/ts-rest-react-query/ts-rest-core'
import { objectHash } from 'ohash'
import { get } from 'radash'
import { type ReactNode, useEffect, useMemo } from 'react'
import { useLocation } from 'wouter'
import { usePageVisibility, useReachBottom } from '@/hooks'
import { stateQueryListRemoves } from '../states'
import { Loading } from './loading'

interface QueryRoute<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> {
  useInfiniteQuery: DataReturnInfiniteQuery<TAppRoute, TClientArgs>
  getQueryKey: (args?: TClientArgs) => readonly unknown[]
}

type RouteData<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> = NonNullable<
  ReturnType<QueryRoute<TAppRoute, TClientArgs>['useInfiniteQuery']>['data']
>['pages'][number]['body']['data'][number]

interface QueryPageDataProps<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> {
  queryRoute: QueryRoute<TAppRoute, TClientArgs>
  queryArgs: ReturnType<Parameters<QueryRoute<TAppRoute, TClientArgs>['useInfiniteQuery']>['0']>
  queryOptions?: Parameters<QueryRoute<TAppRoute, TClientArgs>['useInfiniteQuery']>['1']
  renderData: (data: { data: RouteData<TAppRoute, TClientArgs>[], page: { params: number[] } }) => ReactNode
  hookRequested?: (data: { data: RouteData<TAppRoute, TClientArgs>[] }) => void
  showLoadingOnFetching?: boolean
  refetchOnLoad?: boolean
  refetchOnPageVisible?: boolean
  /**
   * 1. 退出页面时清空queryCache, 重新打开页面时, 仍然可以像第一次打开页面一样请求reactQuery
   * 2. 避免重新打开页面时请求多个page
   * @default false
   */
  removeOnUnload?: boolean
  /**
   * 1. 进入子页面时清空queryCache, 返回列表页时, 仍然可以像第一次打开页面一样请求reactQuery
   * 2. 避免重新打开页面时请求多个page
   * @default false
   */
  removeOnDidHide?: boolean
}

export function QueryPageData<TAppRoute extends AppRoute, TClientArgs extends ClientArgs>({
  queryRoute,
  queryArgs,
  queryOptions = {},
  renderData,
  hookRequested,
  showLoadingOnFetching = false,
  refetchOnLoad = false,
  refetchOnPageVisible = false,
  removeOnUnload = false,
  removeOnDidHide = false,
}: QueryPageDataProps<TAppRoute, TClientArgs>) {
  const [path] = useLocation()

  const queryHash = objectHash(queryRoute.getQueryKey(queryArgs as any))

  const { isLoading, isFetching, error, data, refetch, hasNextPage, isFetchingNextPage, fetchNextPage, remove }
    = queryRoute.useInfiniteQuery(
      ({ pageParam = 1 }) => {
        return {
          ...queryArgs,
          query: { ...get(queryArgs, 'query', {}), page: pageParam },
        }
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.body.data.length === 0) {
            return undefined
          }

          return allPages.length + 1
        },
        ...queryOptions,
        hookRequested: data => hookRequested?.({ data: get(data, 'body.data', []) }),
      },
    )

  // 处理page
  const items = useMemo(() => {
    return data?.pages.map(page => page.body.data).flat()
  }, [data])

  useReachBottom(() => {
    if (!isFetchingNextPage) {
      fetchNextPage()
    }

    // 在上滑滚动的时候, 也需要添加remove, `useEffect`只能监听到tab切换的情况, 当用户进入子页面再回退时, 不切换tab只上滑滚动时, 无法监听到
    if (removeOnUnload) {
      stateQueryListRemoves.add({ event: 'unload', path, queryHash, queryRemove: remove })
    }

    if (removeOnDidHide) {
      stateQueryListRemoves.add({ event: 'didHide', path, queryHash, queryRemove: remove })
    }
  })

  useEffect(() => {
    if (refetchOnLoad) {
      refetch()
    }
    return () => {
      if (removeOnUnload) {
        stateQueryListRemoves.run({ event: 'unload', path })
      }
    }
  }, [refetchOnLoad, refetch])

  usePageVisibility((visible) => {
    if (refetchOnPageVisible) {
      if (visible) {
        refetch()
      }
      else {
        if (removeOnDidHide) {
          stateQueryListRemoves.run({ event: 'didHide', path })
        }
      }
    }
  }, refetchOnPageVisible)

  useEffect(() => {
    if (removeOnUnload) {
      stateQueryListRemoves.add({ event: 'unload', path, queryHash, queryRemove: remove })
    }

    if (removeOnDidHide) {
      stateQueryListRemoves.add({ event: 'didHide', path, queryHash, queryRemove: remove })
    }
  }, [queryRoute, queryArgs, path, remove, removeOnUnload, removeOnDidHide, queryHash])

  // 处理loading
  const showLoading = showLoadingOnFetching ? isLoading || isFetching : isLoading

  if (showLoading) {
    return <Loading.Card />
  }
  else if (error || !items) {
    return <Loading.Error error={error} />
  }
  else {
    return (
      <>
        {renderData({ data: items, page: { params: (data?.pageParams as number[]) || [] } })}

        {hasNextPage === false && <div className="text-12 mt-16 h-32 text-center text-gray-300">- Reached the end -</div>}

        {hasNextPage === true && isFetching && (
          <div className="text-12 mt-16 h-32 text-center text-gray-300">Loading...</div>
        )}
      </>
    )
  }
}
