import { observable } from '@legendapp/state'
import { useSelector } from '@legendapp/state/react'
import { get } from 'radash'
import { useEffect } from 'react'
import { USER_DATA_CACHE } from '@/lib/query-cache-config'
import { $qc } from '@/query-client'

interface State {
  isLoading: boolean
  isSignin: boolean
  token: string
}

export const $state = observable<State>({

  isLoading: false,
  isSignin: false,
  token: '',
})

export const auth = {

  setToken: (token: string): void => {
    $state.token.set(token)
  },

  setIsSignin: (isSignin: boolean): void => {
    $state.isSignin.set(isSignin)
  },

  useSignin: () => {
    const { isSignin, token, isLoading } = useSelector(() => $state)

    // 使用 React Query 的 useQuery，它会自动去重相同的请求
    // 所有调用 useSignin 的组件会共享同一个查询实例，React Query 会自动合并相同的请求
    const { data } = $qc.user.profile.$get.useQuery(
      {},
      {
        ...USER_DATA_CACHE,
        // 不自动重新获取
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        // 如果已经知道登录状态，则不请求
        enabled: !isSignin,
      },
    )

    // 同步 React Query 的结果到 state
    useEffect(() => {
      if (data?.body.data !== undefined) {
        const isLogin = get(data, 'body.data', false)
        $state.isSignin.set(isLogin)
      }
    }, [data])

    return { isLoading, isSignin, token }
  },
}
