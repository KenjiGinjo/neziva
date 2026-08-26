export type Locale = 'en' | 'zh'

export const LOCALES: Locale[] = ['en', 'zh']
export const DEFAULT_LOCALE: Locale = 'en'
export const ZH_PREFIX = '/zh'
export const STORAGE_KEY = 'neziva-locale'

export function isZhPath(pathname: string): boolean {
  return pathname === ZH_PREFIX || pathname.startsWith(`${ZH_PREFIX}/`)
}

export function getLocaleFromPath(pathname = window.location.pathname): Locale {
  return isZhPath(pathname) ? 'zh' : 'en'
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === ZH_PREFIX)
    return '/'
  if (pathname.startsWith(`${ZH_PREFIX}/`))
    return pathname.slice(ZH_PREFIX.length) || '/'
  return pathname
}

export function withLocalePrefix(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === 'en')
    return normalized
  return normalized === '/' ? ZH_PREFIX : `${ZH_PREFIX}${normalized}`
}

export function switchLocaleUrl(next: Locale): string {
  const path = stripLocalePrefix(window.location.pathname)
  return `${withLocalePrefix(path, next)}${window.location.search}${window.location.hash}`
}

export function routerBase(locale: Locale): string {
  return locale === 'zh' ? ZH_PREFIX : ''
}

/** First visit on `/` + Chinese browser → /zh. URL otherwise wins. */
export function maybeRedirectToPreferredLocale(): boolean {
  if (typeof window === 'undefined')
    return false
  const path = window.location.pathname
  if (path !== '/')
    return false
  if (localStorage.getItem(STORAGE_KEY))
    return false
  const lang = navigator.language.toLowerCase()
  if (!lang.startsWith('zh'))
    return false
  window.location.replace(`${ZH_PREFIX}${window.location.search}${window.location.hash}`)
  return true
}

export function formatDate(iso: string | null | undefined, locale: Locale, style: 'long' | 'short' = 'long'): string {
  if (!iso)
    return ''
  const loc = locale === 'zh' ? 'zh-CN' : 'en-US'
  if (style === 'short') {
    return new Date(iso).toLocaleDateString(loc, { month: 'short', day: 'numeric', year: 'numeric' })
  }
  return new Date(iso).toLocaleDateString(loc, { month: 'long', day: 'numeric', year: 'numeric' })
}

export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`))
}
