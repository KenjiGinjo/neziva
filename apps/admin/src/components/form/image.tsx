import type { ImageChooseProps } from '@neziva/interfaces'
import type { WrapperProps } from './base'
import { DEFAULT_IMAGE_LIMIT_SIZE, DEFAULT_IMAGE_LIMIT_TYPE } from '@neziva/constants'
import { IconImageFill } from '@neziva/svg'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { fileToBase64, smartCompressImage } from '@/lib/image-compression'
import { Loading } from '../loading'
import { Image } from '../ui/image'
import { useFormContext, Wrapper } from './base'

export function FormImage(props: WrapperProps & { uploaderProps: ImageChooseProps & { emptyMessage?: string } }) {
  const { className = '', ...rest } = props

  const { form } = useFormContext()

  return (
    <Wrapper {...rest} className={className}>
      <ImageChooser
        image={form.getValues(props.name) || ''}
        {...props.uploaderProps}
        onChange={(url: string) => {
          form.setValue(props.name, url)
        }}
      />
    </Wrapper>
  )
}

function ImageChooser({
  className = '',
  image,
  onChange,
  limitSize = DEFAULT_IMAGE_LIMIT_SIZE,
  limitType = DEFAULT_IMAGE_LIMIT_TYPE,
  emptyMessage = '点击上传图片',
}: ImageChooseProps & {
  image: string
  onChange?: (url: string) => void
  emptyMessage?: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [url, setUrl] = useState(image)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file)
      return

    // Validate file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    if (!limitType.includes(fileExtension || '')) {
      toast.warning(`Unsupported file type, please select ${limitType.join(', ')} format image`)
      return
    }

    setIsLoading(true)
    try {
      // 智能压缩图片
      const processedFile = await smartCompressImage(file, limitSize)

      // 显示压缩信息
      if (processedFile.size !== file.size) {
        const originalSize = (file.size / (1024 * 1024)).toFixed(2)
        const compressedSize = (processedFile.size / (1024 * 1024)).toFixed(2)
        console.warn(`图片已压缩: ${originalSize}MB → ${compressedSize}MB`)
      }

      // 转换为base64
      const dataUrl = await fileToBase64(processedFile)
      setUrl(dataUrl)
      onChange?.(dataUrl)
    }
    catch (error) {
      if (error instanceof Error) {
        console.error('Error processing file:', error.message)
        toast.error(`处理文件失败: ${error.message}`)
      }
      else {
        console.error('Error processing file:', error)
        toast.error('Error processing file, please try again')
      }
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleClick = () => {
    if (isLoading)
      return
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={limitType.map((type: string) => `image/${type}`).join(',')}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <div
        className={`min-h-42 w-full ${className}`}
        onClick={handleClick}
      >
        {isLoading
          ? (
              <Loading.Card className="h-full" />
            )
          : !url
              ? (
                  <div className="flex size-full px-4 py-8 flex-col items-center justify-center rounded border border-dashed border-gray-400">
                    <IconImageFill className="text-gray-400 size-8" />
                    <div className="mt-4 text-gray-500">{emptyMessage}</div>
                  </div>
                )
              : (
                  <div className="relative rounded">
                    <Image
                      className="w-full h-auto rounded object-cover"
                      src={url}
                      alt="上传的图片"
                    />
                    <div
                      className="text-12 absolute bottom-0 w-full rounded-b py-2 text-center tracking-wider text-white"
                      style={{
                        backgroundColor: 'rgba(80, 80, 80, 0.75)',
                      }}
                    >
                      点击修改图片
                    </div>
                  </div>
                )}
      </div>
    </>
  )
}
