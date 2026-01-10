import { STORAGE_KEY } from '@haole/constants'
import { get } from 'radash'
import { $state } from './state'

export function getStorageToken(): string {
  const tokenStorageKey = STORAGE_KEY.AUTH_TOKEN
  if (tokenStorageKey) {
    const storage = JSON.parse(window.localStorage.getItem(tokenStorageKey) || '{}')
    const token = get(storage, 'token', '')
    const expire = get(storage, 'expire', 0)

    if (Date.now() < expire && token) {
      return token
    }
  }

  return ''
}

function setStorageToken(token: string) {
  const tokenStorageKey = STORAGE_KEY.AUTH_TOKEN

  if (tokenStorageKey) {
    window.localStorage.setItem(tokenStorageKey, JSON.stringify({
      token,
      expire: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7天
    }))
  }
}

export async function signout() {
  $state.token.set('')
  $state.isSignin.set(false)
  window.localStorage.removeItem(STORAGE_KEY.AUTH_TOKEN)
}

export async function signin(meta?: { token: string, type: string }) {
  if (!meta?.token) {
    return ''
  }

  setStorageToken(meta.token)
  $state.token.set(meta.token)
}
