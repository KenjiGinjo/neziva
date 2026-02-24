import { QueryClient, QueryClientProvider } from '@packages/ts-rest-react-query/tanstack-react-query'
import { ThemeProvider } from 'next-themes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from 'wouter'
import { AppRouter } from './app-router.tsx'
import { ModalProvider } from './components/extend'
import { GoogleAnalytics } from './components/google-analytics.tsx'
import { TailwindIndicator } from './components/tailwind-indicator.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { SystemSetting } from './hooks/system-setting.tsx'
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <Router>
            <AppRouter />
            <GoogleAnalytics />
          </Router>
          <Toaster />
          <SystemSetting />
          {isDevMode && <TailwindIndicator />}
        </ModalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
