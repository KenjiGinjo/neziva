import { useLayoutEffect } from 'react'
import { useLocation } from 'wouter'

let pendingSectionId: string | null = null

export function requestSectionScroll(id: string | null) {
  pendingSectionId = id
}

function scrollToTarget() {
  const id = pendingSectionId || window.location.hash.replace(/^#/, '')
  pendingSectionId = null

  if (id) {
    const el = document.getElementById(id)
    if (el) {
      const next = `${window.location.pathname}${window.location.search}#${id}`
      if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== next)
        history.replaceState(null, '', next)
      el.scrollIntoView()
      return
    }
  }

  if (window.location.hash) {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
  }
  window.scrollTo(0, 0)
}

export function ScrollOnNavigate() {
  const [location] = useLocation()

  useLayoutEffect(() => {
    if ('scrollRestoration' in history)
      history.scrollRestoration = 'manual'
  }, [])

  useLayoutEffect(() => {
    scrollToTarget()
  }, [location])

  return null
}
