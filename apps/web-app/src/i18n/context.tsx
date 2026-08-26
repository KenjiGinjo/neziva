import type { ReactNode } from 'react'
import type { Messages } from './en'
import { createContext, useContext, useEffect, useMemo } from 'react'
import { en } from './en'
import { getLocaleFromPath, interpolate, type Locale, STORAGE_KEY, switchLocaleUrl } from './locale'
import { zh } from './zh'

const dict: Record<Locale, Messages> = { en, zh }

interface I18nContextValue {
  locale: Locale
  m: Messages
  setLocale: (next: Locale) => void
  fmt: (template: string, vars: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = getLocaleFromPath()
  const m = dict[locale]

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    m,
    setLocale: (next) => {
      if (next === locale)
        return
      localStorage.setItem(STORAGE_KEY, next)
      window.location.assign(switchLocaleUrl(next))
    },
    fmt: interpolate,
  }), [locale, m])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx)
    throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
