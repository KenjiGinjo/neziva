import { STORAGE_KEY } from '@neziva/constants'
import { get } from 'radash'
import { toast } from 'sonner'
import { $state } from './state'

export function getStorageToken(): string {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY.AUTH_TOKEN)
    if (!raw)
      return ''

    const storage = JSON.parse(raw)
    const token = get(storage, 'token', '')
    const expire = get(storage, 'expire', 0)

    if (Date.now() < expire && token)
      return token
  }
  catch {
    window.localStorage.removeItem(STORAGE_KEY.AUTH_TOKEN)
  }

  return ''
}

function setStorageToken(token: string) {
  window.localStorage.setItem(STORAGE_KEY.AUTH_TOKEN, JSON.stringify({
    token,
    expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
  }))
}

export async function signin(meta?: { token: string, type: string }) {
  if (!meta?.token)
    return ''

  setStorageToken(meta.token)
  $state.token.set(meta.token)
}

export function signout() {
  window.localStorage.removeItem(STORAGE_KEY.AUTH_TOKEN)
  $state.token.set('')
  $state.isSignin.set(false)
}

export function isLoginPath(path = window.location.pathname) {
  return path === '/login' || path === '/'
}

export function getSafeRedirect(search = window.location.search) {
  const query = search.startsWith('?') ? search : `?${search}`
  const redirect = new URLSearchParams(query).get('redirect') || ''
  if (
    redirect.startsWith('/a')
    && !redirect.startsWith('//')
    && !redirect.includes('\\')
    && !/^[a-z][a-z0-9+.-]*:/i.test(redirect)
  ) {
    return redirect
  }
  return '/a'
}

export function goToLogin() {
  if (isLoginPath())
    return

  const current = `${window.location.pathname}${window.location.search}`
  const loginPath = '/login'
  const url = current.startsWith('/a')
    ? `${loginPath}?redirect=${encodeURIComponent(current)}`
    : loginPath
  window.location.assign(url)
}

let handlingUnauthorized = false

export function handleUnauthorized() {
  if (isLoginPath() || handlingUnauthorized)
    return

  handlingUnauthorized = true
  signout()
  toast.error('登录已过期，请重新登录')
  goToLogin()
}
