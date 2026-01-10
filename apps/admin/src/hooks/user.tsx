import { useEffect } from 'react'
import { auth } from '@/components/auth/state'
import { $qc } from '@/query-client'
import { stateUser } from '@/states'

export function useUserState() {
  const { data, refetch } = $qc.admin.auth.state.$get.useQuery()
  const _data = data?.body.data

  useEffect(() => {
    if (_data) {
      stateUser.setData(_data)
      auth.setIsSignin(true)
    }
  }, [_data])

  return { refetch }
}

export function UserState() {
  useUserState()

  return null
}
