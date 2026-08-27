import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { useI18n } from './context'
import { withLocalePrefix } from './locale'

const SITE = 'https://neziva.com'

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(attrs.rel ? 'link' : 'meta')
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v)
  }
}

function metaForPath(path: string, m: ReturnType<typeof useI18n>['m']) {
  if (path === '/')
    return { title: m.meta.homeTitle, desc: m.meta.homeDescription }
  if (path.startsWith('/services'))
    return { title: m.meta.servicesTitle, desc: m.meta.servicesDescription }
  if (path.startsWith('/portfolio'))
    return { title: m.meta.portfolioTitle, desc: m.meta.portfolioDescription }
  if (path.startsWith('/about'))
    return { title: m.meta.aboutTitle, desc: m.meta.aboutDescription }
  if (path.startsWith('/careers'))
    return { title: m.meta.careersTitle, desc: m.meta.careersDescription }
  if (path.startsWith('/contact'))
    return { title: m.meta.contactTitle, desc: m.meta.contactDescription }
  if (path.startsWith('/blog'))
    return { title: m.meta.blogTitle, desc: m.meta.blogDescription }
  if (path.startsWith('/privacy'))
    return { title: m.meta.privacyTitle, desc: m.meta.privacyDescription }
  return { title: m.meta.notFoundTitle, desc: m.meta.defaultDescription }
}

export function DocumentMeta() {
  const [location] = useLocation()
  const { locale, m } = useI18n()
  const path = (location.split('?')[0] || '/') as string

  useEffect(() => {
    const { title, desc } = metaForPath(path, m)
    document.title = title
    upsertMeta('meta[name="description"]', { name: 'description', content: desc })
    upsertMeta('meta[name="title"]', { name: 'title', content: title })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: desc })
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: locale === 'zh' ? 'zh_CN' : 'en_US' })
    const canonical = `${SITE}${withLocalePrefix(path, locale)}`
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: canonical })
    upsertMeta('link[rel="alternate"][hreflang="en"]', { rel: 'alternate', hreflang: 'en', href: `${SITE}${path}` })
    upsertMeta('link[rel="alternate"][hreflang="zh-CN"]', { rel: 'alternate', hreflang: 'zh-CN', href: `${SITE}${withLocalePrefix(path, 'zh')}` })
    upsertMeta('link[rel="alternate"][hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default', href: `${SITE}${path}` })
  }, [path, locale, m])

  return null
}
