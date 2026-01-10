import { observable } from '@legendapp/state'
import { useSelector } from '@legendapp/state/react'
import React from 'react'
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
    const { isLoading, isSignin, token } = useSelector(() => $state)

    React.useEffect(() => {
      (async () => {
        if (!isSignin && !isLoading) {
          $state.isLoading.set(true)
          try {
            await $qc.admin.auth.state.$get.query()
            $state.isSignin.set(true)
          }
          catch {
            $state.isSignin.set(false)
          }
          finally {
            $state.isLoading.set(false)
          }
        }
      })()
    }, [])
    return { isLoading, isSignin, token }
  },
}
