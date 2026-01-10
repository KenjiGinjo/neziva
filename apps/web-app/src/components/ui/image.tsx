import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { config } from '@/config'
import { Loading } from '../loading'

const EMPTY_IMAGE_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTE2LjU2OSA3MCAxMzAgODMuNDMxIDEzMCAxMDBDMTMwIDExNi41NjkgMTE2LjU2OSAxMzAgMTAwIDEzMEM4My40MzEgMTMwIDcwIDExNi41NjkgNzAgMTAwQzcwIDgzLjQzMSA4My40MzEgNzAgMTAwIDcwWiIgZmlsbD0iI0QxRDVEM0EiLz4KPHBhdGggZD0iTTEwMCAxNDBDMTE2LjU2OSAxNDAgMTMwIDE1My40MzEgMTMwIDE3MEMxMzAgMTg2LjU2OSAxMTYuNTY5IDIwMCAxMDAgMjAwQzgzLjQzMSAyMDAgNzAgMTg2LjU2OSA3MCAxNzBDNzAgMTUzLjQzMSA4My40MzEgMTQwIDEwMCAxNDBaIiBmaWxsPSIjRDFENUQzQSIvPgo8L3N2Zz4K'

function ImageUrlFormat(src: string) {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }

  if (src.startsWith('data:image/')) {
    return src
  }

  return `${config.baseURL.get()}/${src}`
}

interface ImageProps {
  src?: string | null
  alt: string | null
  className?: string
  fallbackSrc?: string
  onError?: () => void
}

function ImageComponent({
  src,
  alt,
  className,
  fallbackSrc = '/no-image.png',
  onError,
}: ImageProps) {
  const formattedSrc = useMemo(() => ImageUrlFormat(src || fallbackSrc), [src, fallbackSrc])

  const [imageSrc, setImageSrc] = useState(formattedSrc)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 同步 props 变化到内部 state
  useEffect(() => {
    if (formattedSrc !== imageSrc && !hasError) {
      setImageSrc(formattedSrc)
      setHasError(false)
      setIsLoading(true)
    }
  }, [formattedSrc, imageSrc, hasError])

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true)
      setImageSrc(fallbackSrc)
      onError?.()
    }
    else {
      setImageSrc(EMPTY_IMAGE_SVG)
    }
    setIsLoading(false)
  }, [hasError, fallbackSrc, onError])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    setHasError(false)
  }, [])

  const containerClassName = useMemo(() => `relative ${className || ''}`, [className])
  const imgClassName = useMemo(
    () => `${className || ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    [className, isLoading],
  )
  const altText = useMemo(() => alt || '', [alt])

  return (
    <div className={containerClassName}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-50 animate-pulse flex items-center justify-center">
          <Loading />
        </div>
      )}
      <img
        src={imageSrc}
        alt={altText}
        className={imgClassName}
        loading="lazy"
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  )
}

// 使用 React.memo 防止 props 不变时的 rerender
export const Image = memo(ImageComponent, (prevProps, nextProps) => {
  // 自定义比较函数，精确控制何时需要 rerender
  return (
    prevProps.src === nextProps.src
    && prevProps.alt === nextProps.alt
    && prevProps.className === nextProps.className
    && prevProps.fallbackSrc === nextProps.fallbackSrc
    && prevProps.onError === nextProps.onError
  )
})
