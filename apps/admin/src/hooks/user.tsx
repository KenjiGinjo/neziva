import { useEffect } from 'react'
import { auth } from '@/components/auth/state'
import { $qc } from '@/query-client'
import { stateUser } from '@/states'

export function useUserState() {
  const { data, refetch } = $qc.admin.auth.state.$get.useQuery()
  const _data = data?.body.data

  useEffect(() => {
    if (_data?.isAuthenticated && _data.admin) {
      stateUser.setData({
        id: _data.admin.id,
        nickname: _data.admin.nickname,
        avatar: null,
      })
      auth.setIsSignin(true)
    }
  }, [_data])

  return { refetch }
}

export function UserState() {
  useUserState()

  return null
}
