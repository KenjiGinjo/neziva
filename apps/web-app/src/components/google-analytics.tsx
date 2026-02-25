import { useEffect } from 'react'
import { useLocation } from 'wouter'

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

function loadGtagScript(measurementId: string) {
  if (typeof window === 'undefined' || window.gtag) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)
}

export function GoogleAnalytics() {
  const [location] = useLocation()

  useEffect(() => {
    if (!GA4_MEASUREMENT_ID) return

    loadGtagScript(GA4_MEASUREMENT_ID)
    window.gtag?.('config', GA4_MEASUREMENT_ID, {
      send_page_view: false, // 我们手动发送，以支持 SPA 路由
    })
  }, [])

  useEffect(() => {
    if (!GA4_MEASUREMENT_ID || !window.gtag) return

    const pagePath = location || '/'
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: document.title,
    })
  }, [location])

  return null
}
