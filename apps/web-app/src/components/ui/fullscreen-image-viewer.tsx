import { IconCloseLine } from '@neziva/svg'
import * as React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Image } from './image'

interface FullscreenImageViewerProps {
  isOpen: boolean
  onClose: () => void
  src: string
  alt: string
  className?: string
}

export function FullscreenImageViewer({
  isOpen,
  onClose,
  src,
  alt,
  className,
}: FullscreenImageViewerProps) {
  React.useEffect(() => {
    if (isOpen) {
      // 防止背景滚动
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen)
    return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* 关闭按钮 */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 z-10 bg-white/10 border-white/20 text-white hover:bg-white/20"
        onClick={onClose}
      >
        <IconCloseLine className="size-6" />
      </Button>

      {/* 图片容器 */}
      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <Image
          src={src}
          alt={alt}
          className={cn(
            'max-w-full max-h-full object-contain',
            className,
          )}
        />
      </div>
    </div>,
    document.body,
  )
}
