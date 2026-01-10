export interface IUploadToken {
  id: string
  key: string
  host: string
  policy: string
  signature: string
  ak: string
}

export interface IImageChooseResult {
  path: string
  size: number
  type: string
}

export interface IMedia {
  type: 'image'
  link: string
}

export interface IImageChoose {
  showModal?: boolean
}

export interface IImageUpload {
  filePath: string
  showModal?: boolean
  // TODO remove unknown
  tokenRequest: () => Promise<{ body: { data: IUploadToken } | unknown }>
}
export interface ImageChooseProps {

  limitSize?: number
  limitType?: string[]
  className?: string
}
