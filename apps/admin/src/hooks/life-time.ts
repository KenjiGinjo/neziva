import { useCallback, useEffect } from 'react'

/**
 * 监听窗口获得焦点事件
 * @param callback 窗口获得焦点时执行的回调函数
 * @param enabled 是否启用监听，默认为 true
 */
export function useWindowFocus(callback: () => void, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled)
      return

    const handleFocus = () => {
      callback()
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [callback, enabled])
}

/**
 * 监听窗口失去焦点事件
 * @param callback 窗口失去焦点时执行的回调函数
 * @param enabled 是否启用监听，默认为 true
 */
export function useWindowBlur(callback: () => void, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled)
      return

    const handleBlur = () => {
      callback()
    }

    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('blur', handleBlur)
    }
  }, [callback, enabled])
}

/**
 * 监听页面可见性变化事件
 * @param callback 页面可见性变化时执行的回调函数
 * @param enabled 是否启用监听，默认为 true
 */
export function usePageVisibility(callback: (isVisible: boolean) => void, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled)
      return

    const handleVisibilityChange = () => {
      callback(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [callback, enabled])
}

/**
 * 监听滚动到底部事件
 * @param callback 滚动到底部时执行的回调函数
 * @param enabled 是否启用监听，默认为 true
 * @param threshold 触发阈值（距离底部多少像素时触发），默认为 100
 * @param target 监听的元素，默认为 window
 */
export function useReachBottom(
  callback: () => void,
  enabled: boolean = true,
  threshold: number = 100,
  target: Element | Window = window,
) {
  const handleScroll = useCallback(() => {
    if (!enabled)
      return

    let scrollTop: number
    let scrollHeight: number
    let clientHeight: number

    if (target === window) {
      scrollTop = window.scrollY || document.documentElement.scrollTop
      scrollHeight = document.documentElement.scrollHeight
      clientHeight = window.innerHeight
    }
    else {
      const element = target as Element
      scrollTop = element.scrollTop
      scrollHeight = element.scrollHeight
      clientHeight = element.clientHeight
    }

    // 检查是否滚动到底部（考虑阈值）
    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      callback()
    }
  }, [callback, enabled, threshold, target])

  useEffect(() => {
    if (!enabled)
      return

    target.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      target.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, enabled, target])
}
