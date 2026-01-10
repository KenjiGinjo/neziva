import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { DEFAULT_IMAGE_LIMIT_SIZE } from '@haole/constants'
import { Exception } from '@haole/tools/exception'
import { createId } from '@paralleldrive/cuid2'
import { format } from 'date-fns'
import { ENV } from '../env'

export interface SaveImageOptions {
  base64Data: string
  subDir?: string
  filename?: string
  maxSize?: number // 最大文件大小，默认5MB
}

export function saveBase64Image(options: SaveImageOptions): string {
  const uploadDir = ENV.UPLOADS_DIR
  const { base64Data, filename, maxSize = DEFAULT_IMAGE_LIMIT_SIZE, subDir = 'illustration' } = options // 默认5MB

  const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
  if (!matches) {
    throw new Exception.BadRequestException('Invalid base64 image data')
  }

  const mimeType = matches[1]
  const base64String = matches[2]

  if (!mimeType || !base64String) {
    throw new Exception.BadRequestException('Invalid base64 image data')
  }

  // 验证文件大小
  const fileSize = Math.ceil((base64String.length * 3) / 4) // base64解码后的大概大小
  if (fileSize > maxSize) {
    const maxSizeMB = Math.round(maxSize / 1024 / 1024)
    throw new Exception.BadRequestException(`File size exceeds the maximum limit of ${maxSizeMB}MB`)
  }

  const extension = mimeType.split('/')[1] || 'jpg'

  const finalFilename = filename || `${createId()}.${extension}`

  const dateDir = format(new Date(), 'yyyyMMdd')
  const targetDir = join(uploadDir, subDir, dateDir)

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true })
  }

  const filePath = join(targetDir, finalFilename)

  const buffer = Buffer.from(base64String, 'base64')
  writeFileSync(filePath, buffer)

  return `${subDir}/${dateDir}/${finalFilename}`
}
