import { observable } from '@legendapp/state'
import { getStorageToken } from './components/auth/signin'
import { $state } from './components/auth/state'

const baseURL = import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL

export const config = observable({
  baseURL,

  tokenBaseURL: baseURL,
  tokenProvider: async () => $state.token.get() || getStorageToken(),

  loginPagePath: '/auth/login',

  timezone: '+08:00',

})
