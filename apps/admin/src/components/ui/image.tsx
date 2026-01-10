import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { baseURL } from '@/config'

function ImageUrlFormat(src: string) {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }

  if (src.startsWith('data:image/')) {
    return src
  }

  return `${baseURL}/${src}`
}

interface ImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  onError?: () => void
}

export function Image({
  src,
  alt,
  className,
  fallbackSrc = '/no-image.png',
  onError,
}: ImageProps) {
  const [imageSrc, setImageSrc] = useState(ImageUrlFormat(src))
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImageSrc(fallbackSrc)
      onError?.()
    }
    else {
      setImageSrc('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTE2LjU2OSA3MCAxMzAgODMuNDMxIDEzMCAxMDBDMTMwIDExNi41NjkgMTE2LjU2OSAxMzAgMTAwIDEzMEM4My40MzEgMTMwIDcwIDExNi41NjkgNzAgMTAwQzcwIDgzLjQzMSA4My40MzEgNzAgMTAwIDcwWiIgZmlsbD0iI0QxRDVEM0EiLz4KPHBhdGggZD0iTTEwMCAxNDBDMTE2LjU2OSAxNDAgMTMwIDE1My40MzEgMTMwIDE3MEMxMzAgMTg2LjU2OSAxMTYuNTY5IDIwMCAxMDAgMjAwQzgzLjQzMSAyMDAgNzAgMTg2LjU2OSA3MCAxNzBDNzAgMTUzLjQzMSA4My40MzEgMTQwIDEwMCAxNDBaIiBmaWxsPSIjRDFENUQzQSIvPgo8L3N2Zz4K')
    }
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  return (
    <div className={`relative ${className || ''}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-50 animate-pulse flex items-center justify-center">
          <Loader2Icon className="animate-spin size-8 text-pink-100" />
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className || ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading="lazy"
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  )
}
