'use client'

import type { ResAdminAuthState } from '@haole/interfaces'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface AdminStore {
  token: string | null
  user: ResAdminAuthState | null
  setToken: (token: string | null) => void
  clearStorageToken: () => void
}

export const useAdminStore = create<AdminStore>()(
  devtools(
    persist(
      immer(
        (set, _) => ({
          token: null,
          user: null,
          setUser: (user: ResAdminAuthState | null) => {
            set((state) => {
              state.user = user
            })
          },
          setToken: (token: string | null) => {
            set((state) => {
              state.token = token
            })
          },
          clearStorageToken: () => {
            set((state) => {
              state.token = null
            })
          },
        }),
      ),
      {
        name: 'admin',
        partialize: state => ({ token: state.token }),
      },
    ),
  ),
)
