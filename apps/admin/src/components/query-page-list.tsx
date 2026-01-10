import type { DataReturnInfiniteQuery } from '@packages/ts-rest-react-query'
import type { AppRoute, ClientArgs } from '@packages/ts-rest-react-query/ts-rest-core'
import type { ReactElement, ReactNode } from 'react'
import { objectHash } from 'ohash'
import { get } from 'radash'
import { cloneElement, useEffect, useMemo } from 'react'
import { useLocation } from 'wouter'
import { usePageVisibility, useReachBottom } from '@/hooks/life-time'
import { stateQueryListRemoves } from '@/states'
import { Empty } from './empty'
import { Loading } from './loading'

interface QueryRoute<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> {
  useInfiniteQuery: DataReturnInfiniteQuery<TAppRoute, TClientArgs>
  getQueryKey: (args?: TClientArgs) => readonly unknown[]
}

type RouteData<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> = NonNullable<
  ReturnType<QueryRoute<TAppRoute, TClientArgs>['useInfiniteQuery']>['data']
>['pages'][number]['body']['data'][number]

interface QueryPageListProps<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> {
  queryRoute: QueryRoute<TAppRoute, TClientArgs>
  queryArgs: ReturnType<Parameters<QueryRoute<TAppRoute, TClientArgs>['useInfiniteQuery']>['0']>
  queryOptions?: Parameters<QueryRoute<TAppRoute, TClientArgs>['useInfiniteQuery']>['1']
  renderItem: (item: { data: RouteData<TAppRoute, TClientArgs> }) => ReactNode
  renderProcessor?: (items: RouteData<TAppRoute, TClientArgs>[]) => RouteData<TAppRoute, TClientArgs>[]
  hookRequested?: (data: { data: RouteData<TAppRoute, TClientArgs>[] }) => void
  renderWrapper?: ReactElement
  renderEmpty: ReactElement
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

export function QueryPageList<TAppRoute extends AppRoute, TClientArgs extends ClientArgs>({
  queryRoute,
  queryArgs,
  queryOptions = {},
  renderItem,
  renderProcessor = data => data,
  hookRequested,
  renderWrapper: Wrapper = <div />,
  renderEmpty,
  showLoadingOnFetching = false,
  refetchOnLoad = false,
  refetchOnPageVisible = false,
  removeOnUnload = false,
  removeOnDidHide = false,
}: QueryPageListProps<TAppRoute, TClientArgs>) {
  const [path] = useLocation()

  const queryHash = objectHash(queryRoute.getQueryKey(queryArgs as any))

  const { isLoading, isFetching, error, data, refetch, remove, hasNextPage, isFetchingNextPage, fetchNextPage }
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

  // 使用封装的滚动到底部监听 Hook
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
  }, [path, remove, removeOnUnload, removeOnDidHide, queryHash])

  // 处理loading
  // 向下滚动加载更多时, 不生效`showLoadingOnFetching`, 否则页面会自动滚动到顶部.
  const showLoading = isFetchingNextPage ? false : showLoadingOnFetching ? isLoading || isFetching : isLoading

  if (showLoading) {
    return <Loading.Card />
  }
  else if (error || !items) {
    return <Loading.Error error={error} />
  }
  else {
    const processed = renderProcessor(items)

    if (!Array.isArray(processed)) {
      return <Empty.Icon message="List data format error" />
    }
    else if (processed.length === 0) {
      return renderEmpty
    }
    else {
      return (
        <>
          {cloneElement(
            Wrapper,
            {},
            processed.map((_item: any) => renderItem({ data: _item })),
          )}

          {hasNextPage === false && <div className="text-12 mt-16 h-32 text-center text-gray-300">- Reached the end -</div>}

          {hasNextPage === true && isFetching && (
            <div className="text-12 mt-16 h-32 text-center text-gray-300">Loading...</div>
          )}
        </>
      )
    }
  }
}
