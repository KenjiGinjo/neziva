import { QueryClient, QueryClientProvider } from '@packages/ts-rest-react-query/tanstack-react-query'
import { ThemeProvider } from 'next-themes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from 'wouter'
import { AppRouter } from './app-router.tsx'
import { ModalProvider } from './components/extend'
import { GoogleAnalytics } from './components/google-analytics.tsx'
import { ScrollOnNavigate } from './components/scroll-on-navigate.tsx'
import { TailwindIndicator } from './components/tailwind-indicator.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { SystemSetting } from './hooks/system-setting.tsx'
import { I18nProvider } from './i18n/context.tsx'
import { DocumentMeta } from './i18n/document-meta.tsx'
import { getLocaleFromPath, maybeRedirectToPreferredLocale, routerBase } from './i18n/locale.ts'
import './style/index.css'

const isDevMode = import.meta.env.DEV

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      cacheTime: 0,
      staleTime: 0,
    },
  },
})

if (maybeRedirectToPreferredLocale()) {
  // Chinese first-visit on `/` — wait for /zh
}
else {
  const locale = getLocaleFromPath()

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <I18nProvider>
              <Router base={routerBase(locale)}>
                <DocumentMeta />
                <ScrollOnNavigate />
                <AppRouter />
                <GoogleAnalytics />
              </Router>
            </I18nProvider>
            <Toaster />
            <SystemSetting />
            {isDevMode && <TailwindIndicator />}
          </ModalProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>,
  )
}
