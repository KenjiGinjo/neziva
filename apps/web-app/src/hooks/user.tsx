import { useEffect } from 'react'
import { auth } from '@/components/auth/state'
import { $qc } from '@/query-client'
import { stateUser } from '@/states'

/**
 * Hook to manage user state
 * - Fetches user profile from API
 * - Updates global user state and auth state
 * - Returns refetch function to manually refresh user data
 */
export function useUserState() {
  const { data, refetch } = $qc.user.profile.$get.useQuery()
  const _data = data?.body.data

  useEffect(() => {
    if (_data) {
      stateUser.setData(_data)
      auth.setIsSignin(true)
    }
  }, [_data])

  return { refetch }
}

/**
 * Component to initialize user state globally
 * Should be rendered once at the app root level
 */
export function UserState() {
  useUserState()

  return null
}
