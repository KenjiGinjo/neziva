import { DEFAULT_IMAGE_LIMIT_SIZE, DEFAULT_IMAGE_LIMIT_TYPE } from '@haole/constants'
import { Loader2, Upload, X } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'sonner'
import { fileToBase64, smartCompressImage } from '@/lib/image-compression'
import { cn } from '@/lib/utils'
import { Image } from './image'

interface MultipleImageUploadProps {
  value?: string[]
  onChange?: (images: string[]) => void
  maxNumber?: number
  className?: string
  disabled?: boolean
}

export function MultipleImageUpload({
  value = [],
  onChange,
  maxNumber = 8,
  className,
  disabled = false,
}: MultipleImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const [localImages, setLocalImages] = useState<string[]>(value)

  const handleChange = onChange || setLocalImages
  const currentImages = onChange ? value : localImages

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0)
      return

    const newFiles = Array.from(files).slice(0, maxNumber - currentImages.length)
    if (newFiles.length === 0)
      return

    setIsUploading(true)

    try {
      const newImages: string[] = []

      for (const file of newFiles) {
        // 验证文件类型
        const fileExtension = file.name.split('.').pop()?.toLowerCase()
        if (!fileExtension || !DEFAULT_IMAGE_LIMIT_TYPE.includes(fileExtension)) {
          toast.warning(`不支持的文件类型: ${fileExtension}，请选择 ${DEFAULT_IMAGE_LIMIT_TYPE.join(', ')} 格式的图片`)
          continue
        }

        try {
          // 智能压缩图片
          const processedFile = await smartCompressImage(file, DEFAULT_IMAGE_LIMIT_SIZE)

          // 显示压缩信息
          if (processedFile.size !== file.size) {
            const originalSize = (file.size / (1024 * 1024)).toFixed(2)
            const compressedSize = (processedFile.size / (1024 * 1024)).toFixed(2)
            console.warn(`图片已压缩: ${originalSize}MB → ${compressedSize}MB`)
          }

          // 转换为base64
          const base64 = await fileToBase64(processedFile)
          newImages.push(base64)
        }
        catch (error) {
          console.error('Error processing file:', error)
          toast.error(`处理文件 ${file.name} 时出错，请重试`)
        }
      }

      if (newImages.length > 0) {
        const updatedImages = [...currentImages, ...newImages]
        handleChange(updatedImages)
      }
    }
    catch (error) {
      console.error('Error processing files:', error)
      toast.error('处理文件时出错，请重试')
    }
    finally {
      setIsUploading(false)
    }
  }, [currentImages, handleChange, maxNumber])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    if (disabled)
      return

    const files = e.dataTransfer.files
    handleFileSelect(files)
  }, [handleFileSelect, disabled])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setDragActive(true)
    }
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }, [])

  const handleClick = useCallback(() => {
    if (disabled || isUploading)
      return
    fileInputRef.current?.click()
  }, [disabled, isUploading])

  const removeImage = useCallback((index: number) => {
    if (disabled)
      return
    const newImages = currentImages.filter((_, i) => i !== index)
    handleChange(newImages)
  }, [currentImages, handleChange, disabled])

  const canUpload = currentImages.length < maxNumber && !disabled

  return (
    <div className={cn('space-y-4', className)}>
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentImages.map((image, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                src={image}
                alt={`Uploaded image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
                fallbackSrc="/no-image.png"
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="删除图片"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {canUpload && (
        <div
          className={cn(
            'relative border-2 border-dashed rounded-lg p-6 transition-colors',
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={e => handleFileSelect(e.target.files)}
            className="hidden"
            disabled={disabled || isUploading}
          />

          <div
            className="flex flex-col items-center justify-center text-center cursor-pointer"
            onClick={handleClick}
          >
            {isUploading
              ? (
                  <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-2" />
                )
              : (
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                )}

            <div className="text-sm text-gray-600 mb-1">
              {isUploading ? '上传中...' : '点击或拖拽上传图片'}
            </div>

            <div className="text-xs text-gray-500">
              支持 JPG、PNG、GIF、WEBP 格式，单个文件不超过 5MB（大文件会自动压缩）
            </div>

            <div className="text-xs text-gray-400 mt-1">
              已上传
              {' '}
              {currentImages.length}
              /
              {maxNumber}
              {' '}
              张图片
            </div>
          </div>
        </div>
      )}
      {currentImages.length >= maxNumber && (
        <div className="text-sm text-gray-500 text-center">
          已达到最大上传数量 (
          {maxNumber}
          {' '}
          张)
        </div>
      )}
    </div>
  )
}
