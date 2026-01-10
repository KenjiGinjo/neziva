import type {
  FetchQueryOptions,
  QueryClient,
  QueryFilters,
  QueryFunction,
  QueryFunctionContext,
  QueryKey,
  UseInfiniteQueryOptions as TanStackUseInfiniteQueryOptions,
  UseMutationOptions as TanStackUseMutationOptions,
  UseQueryOptions as TanStackUseQueryOptions,
} from '@tanstack/react-query'
import type { AppRoute, AppRouteMutation, AppRouter, ClientArgs, ClientInferRequest, Without } from '@ts-rest/core'
import type { AppRouteFunctions, AppRouteFunctionsWithQueryClient, DataReturnQueries } from './inner-types'
import { useInfiniteQuery, useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchApi, getCompleteUrl, getRouteQuery, isAppRoute } from '@ts-rest/core'
import { useMemo } from 'react'

function queryFn<TAppRoute extends AppRoute, TClientArgs extends ClientArgs>(route: TAppRoute, clientArgs: TClientArgs, args?: ClientInferRequest<AppRouteMutation, ClientArgs>, hookRequested?: (data: TAppRoute['responses']) => Promise<void> | void): QueryFunction<TAppRoute['responses']> {
  return async (queryFnContext?: QueryFunctionContext) => {
    const { query, params, body, headers, extraHeaders, ...extraInputArgs } = args || {}

    const path = getCompleteUrl(query, clientArgs.baseUrl, params, route, !!clientArgs.jsonQuery)

    const result = await fetchApi({
      signal: queryFnContext?.signal,
      path,
      clientArgs,
      route,
      body,
      query,
      headers: {
        ...extraHeaders,
        ...headers,
      },
      extraInputArgs,
    })

    // If the response is not a 2XX, throw an error to be handled by react-query
    if (!String(result.status).startsWith('2')) {
      throw result
    }

    await hookRequested?.(result)

    return result
  }
}

function generateQueryKey(path: string, args?: ClientInferRequest<AppRouteMutation, ClientArgs>): QueryKey {
  const params = args?.params || {}
  const query = args?.query || {}

  // 让infiniteQuery的不同page共用同一个queryKey
  // delete query.page;

  return [path, { params, query }]
}

export type InitClientReturn<T extends AppRouter, TClientArgs extends ClientArgs> = {
  [TKey in keyof T]: T[TKey] extends AppRoute
    ? Without<AppRouteFunctions<T[TKey], TClientArgs>, never>
    : T[TKey] extends AppRouter
      ? InitClientReturn<T[TKey], TClientArgs>
      : never;
}

const ClientParameters = Symbol('ClientParameters')

export function initQueryClient<T extends AppRouter, TClientArgs extends ClientArgs>(router: T, clientArgs: TClientArgs): InitClientReturn<T, TClientArgs> {
  const recursiveInit = <TInner extends AppRouter>(innerRouter: TInner): InitClientReturn<TInner, TClientArgs> => {
    return Object.fromEntries(
      Object.entries(innerRouter).map(([key, subRouter]) => {
        if (isAppRoute(subRouter)) {
          return [
            key,
            {
              useQuery: (
                args?: ClientInferRequest<AppRouteMutation, ClientArgs>,
                options?: TanStackUseQueryOptions<(typeof subRouter)['responses']> & {
                  hookRequested?: (data: (typeof subRouter)['responses']) => Promise<void> | void
                },
              ) => {
                const { hookRequested, ...tanstackOptions } = options || {}
                const dataFn = queryFn(subRouter, clientArgs, args, hookRequested)

                return useQuery(generateQueryKey(subRouter.path, args), dataFn, tanstackOptions)
              },
              useQueries: <TAppRoute extends AppRoute, TClientArgs extends ClientArgs>(
                route: TAppRoute,
                clientArgs: TClientArgs,
              ) => {
                return (args: Parameters<DataReturnQueries<TAppRoute, TClientArgs>>[0]) => {
                  const queries = args.queries.map((fullQueryArgs: any) => {
                    const { credentials, queryKey, retry, ...queryArgs } = fullQueryArgs
                    const dataFn = queryFn(route, clientArgs, queryArgs)

                    return {
                      queryFn: dataFn,
                      ...fullQueryArgs,
                    }
                  })

                  return useQueries({ queries, context: args.context })
                }
              },
              useInfiniteQuery: (
                argsMapper: (context: QueryFunctionContext) => ClientInferRequest<AppRouteMutation, ClientArgs>,
                options?: TanStackUseInfiniteQueryOptions<(typeof subRouter)['responses']> & {
                  hookRequested?: (data: (typeof subRouter)['responses']) => Promise<void> | void
                },
              ) => {
                const { hookRequested, ...tanstackOptions } = options || {}
                const args = argsMapper({} as any)

                return useInfiniteQuery(
                  generateQueryKey(subRouter.path, args),
                  async (context) => {
                    const resultingQueryArgs = argsMapper(context)

                    const innerDataFn = queryFn(subRouter, clientArgs, resultingQueryArgs, hookRequested)

                    return innerDataFn(undefined as any)
                  },
                  tanstackOptions,
                )
              },
              useMutation: (
                options?: TanStackUseMutationOptions<(typeof subRouter)['responses']> & {
                  hookRequested?: (data: (typeof subRouter)['responses']) => Promise<void> | void
                },
              ) => {
                const { hookRequested, ...tanstackOptions } = options || {}

                const mutationFunction = async (args?: ClientInferRequest<AppRouteMutation, ClientArgs>) => {
                  const dataFn = queryFn(subRouter, clientArgs, args, hookRequested)

                  return dataFn(undefined as any)
                }

                return useMutation({
                  mutationFn: mutationFunction as any,
                  ...tanstackOptions,
                })
              },
              invalidateQueries: (qc: QueryClient, args?: ClientInferRequest<AppRouteMutation, ClientArgs>): void => {
                qc.invalidateQueries(generateQueryKey(subRouter.path, args))
              },
              getQueryKey: (args?: ClientInferRequest<AppRouteMutation, ClientArgs>): QueryKey => {
                return generateQueryKey(subRouter.path, args)
              },
              query: getRouteQuery(subRouter, clientArgs),
              mutation: getRouteQuery(subRouter, clientArgs),
              fetchQuery: (
                queryClient: QueryClient,
                queryKey: QueryKey,
                args: ClientInferRequest<AppRouteMutation, ClientArgs>,
                options?: FetchQueryOptions<any>,
              ) => {
                const dataFn = queryFn(subRouter, clientArgs, args)
                return queryClient.fetchQuery(queryKey, dataFn, options)
              },
              fetchInfiniteQuery: (
                queryClient: QueryClient,
                queryKey: QueryKey,
                argsMapper: (context: QueryFunctionContext) => ClientInferRequest<AppRouteMutation, ClientArgs>,
                options?: FetchQueryOptions<any>,
              ) => {
                return queryClient.fetchInfiniteQuery(
                  queryKey,
                  async (context) => {
                    const resultingQueryArgs = argsMapper(context)

                    const innerDataFn = queryFn(subRouter, clientArgs, resultingQueryArgs)

                    return innerDataFn(undefined as any)
                  },
                  options,
                )
              },
              prefetchQuery: (
                queryClient: QueryClient,
                queryKey: QueryKey,
                args: ClientInferRequest<AppRouteMutation, ClientArgs>,
                options?: FetchQueryOptions<any>,
              ) => {
                const dataFn = queryFn(subRouter, clientArgs, args)

                return queryClient.prefetchQuery(queryKey, dataFn, options)
              },
              prefetchInfiniteQuery: (
                queryClient: QueryClient,
                queryKey: QueryKey,
                argsMapper: (context: QueryFunctionContext) => ClientInferRequest<AppRouteMutation, ClientArgs>,
                options?: FetchQueryOptions<any>,
              ) => {
                return queryClient.prefetchInfiniteQuery(
                  queryKey,
                  async (context) => {
                    const resultingQueryArgs = argsMapper(context)

                    const innerDataFn = queryFn(subRouter, clientArgs, resultingQueryArgs)

                    return innerDataFn(undefined as any)
                  },
                  options,
                )
              },
              getQueryData: (queryClient: QueryClient, queryKey: QueryKey, filters?: QueryFilters) => {
                return queryClient.getQueryData(queryKey, filters)
              },
              ensureQueryData: (
                queryClient: QueryClient,
                queryKey: QueryKey,
                args: ClientInferRequest<AppRouteMutation, ClientArgs>,
                options?: FetchQueryOptions<any>,
              ) => {
                const dataFn = queryFn(subRouter, clientArgs, args)

                return queryClient.ensureQueryData(queryKey, dataFn, options)
              },
              getQueriesData: (queryClient: QueryClient, filters: QueryFilters) => {
                return queryClient.getQueriesData(filters)
              },
              setQueryData: (queryClient: QueryClient, queryKey: QueryKey, updater: any) => {
                return queryClient.setQueryData(queryKey, updater)
              },
            },
          ]
        }
        else {
          return [key, recursiveInit(subRouter)]
        }
      }),
    )
  }

  return {
    ...recursiveInit(router),
    [ClientParameters]: {
      router,
      clientArgs,
    },
  }
}

type InitUseTsRestQueryClientReturn<T extends AppRouter, TClientArgs extends ClientArgs> = {
  [TKey in keyof T]: T[TKey] extends AppRoute
    ? Without<AppRouteFunctionsWithQueryClient<T[TKey], TClientArgs>, never>
    : T[TKey] extends AppRouter
      ? InitUseTsRestQueryClientReturn<T[TKey], TClientArgs>
      : never;
}

export function useTsRestQueryClient<T extends AppRouter, TClientArgs extends ClientArgs>(client: InitClientReturn<T, TClientArgs>): InitUseTsRestQueryClientReturn<T, TClientArgs> {
  // @ts-expect-error - hidden symbol, so we can refetch the original client router and clientArgs
  const { router } = client[ClientParameters] as unknown as {
    router: T
    clientArgs: TClientArgs
  }

  const queryClient = useQueryClient()

  const recursiveInit = <TInner extends AppRouter>(
    innerRouter: TInner,
    innerClient: InitClientReturn<TInner, TClientArgs>,
  ): InitUseTsRestQueryClientReturn<TInner, TClientArgs> => {
    return Object.fromEntries(
      Object.entries(innerRouter).map(([key, subRouter]) => {
        if (isAppRoute(subRouter)) {
          type TSubRouter = typeof subRouter
          const routeFunctions = innerClient[key] as AppRouteFunctions<TSubRouter, TClientArgs>

          return [
            key,
            {
              ...routeFunctions,
              fetchQuery: (
                queryKey: QueryKey,
                args: ClientInferRequest<AppRouteMutation, ClientArgs>,
                options?: FetchQueryOptions<any>,
              ) => routeFunctions.fetchQuery(queryClient, queryKey, args as any, options),
              fetchInfiniteQuery: (
                queryKey: QueryKey,
                argsMapper: (context: QueryFunctionContext) => ClientInferRequest<AppRouteMutation, ClientArgs>,
                options?: FetchQueryOptions<any>,
              ) => routeFunctions.fetchInfiniteQuery(queryClient, queryKey, argsMapper as any, options),
              prefetchQuery: (
                queryKey: QueryKey,
                args: ClientInferRequest<AppRouteMutation, ClientArgs>,
                options?: FetchQueryOptions<any>,
              ) => routeFunctions.prefetchQuery(queryClient, queryKey, args as any, options),
              prefetchInfiniteQuery: (
                queryKey: QueryKey,
                argsMapper: (context: QueryFunctionContext) => ClientInferRequest<AppRouteMutation, ClientArgs>,
                options?: FetchQueryOptions<any>,
              ) => routeFunctions.prefetchInfiniteQuery(queryClient, queryKey, argsMapper as any, options),
              getQueryData: (queryKey: QueryKey, filters?: QueryFilters) =>
                routeFunctions.getQueryData(queryClient, queryKey, filters),
              ensureQueryData: (
                queryKey: QueryKey,
                args: ClientInferRequest<AppRouteMutation, ClientArgs>,
                options?: FetchQueryOptions<any>,
              ) => routeFunctions.ensureQueryData(queryClient, queryKey, args as any, options),
              getQueriesData: (filters: QueryFilters) => routeFunctions.getQueriesData(queryClient, filters),
              setQueryData: (queryKey: QueryKey, updater: any) =>
                routeFunctions.setQueryData(queryClient, queryKey, updater),
            },
          ]
        }
        else {
          return [key, recursiveInit(subRouter, innerClient[key] as any)]
        }
      }),
    )
  }

  return useMemo(() => recursiveInit(router, client), [client])
}
