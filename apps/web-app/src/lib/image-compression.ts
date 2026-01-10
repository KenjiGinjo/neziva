import imageCompression from 'browser-image-compression'

export interface CompressionOptions {
  targetSize: number
  maxWidthOrHeight?: number
  useWebWorker?: boolean
  fileType?: string
  initialQuality?: number
}

export async function compressImage(
  file: File,
  options: CompressionOptions,
): Promise<File> {
  const defaultOptions: CompressionOptions = {
    targetSize: options.targetSize,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/jpeg',
    initialQuality: 0.8,
  }

  const compressionOptions = { ...defaultOptions, ...options }

  try {
    const compressedFile = await imageCompression(file, compressionOptions)
    return compressedFile
  }
  catch (error) {
    console.error('图片压缩失败:', error)
    throw new Error('图片压缩失败')
  }
}

export async function smartCompressImage(
  file: File,
  limitSize: number,
): Promise<File> {
  if (file.size <= limitSize) {
    return file
  }

  const sizeRatio = file.size / limitSize
  let initialQuality = 0.8

  if (sizeRatio > 5) {
    initialQuality = 0.6
  }
  else if (sizeRatio > 3) {
    initialQuality = 0.7
  }
  else if (sizeRatio > 2) {
    initialQuality = 0.75
  }

  return await compressImage(file, {
    targetSize: limitSize * 0.95,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/jpeg',
    initialQuality,
  })
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
