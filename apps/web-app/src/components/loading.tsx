import { IconErrorWarningFill } from '@haole/svg'
import { Exception } from '@haole/tools/exception'
import { Loader2Icon } from 'lucide-react'
import { Empty } from './empty'
import { AuthSection } from './guard/auth-section'

const ErrorIcon = <IconErrorWarningFill width={80} height={80} color="#ffffff" className="text-gray-400" />
export interface LoadingProps {
  className?: string
  size?: number | string
  type?: 'circular' | 'spinner'
}

interface LoadingCardProps {
  className?: string
}

interface LoadingErrorProps {
  error?: unknown
}

export function Loading(_props: LoadingProps) {
  return <Loader2Icon className="animate-spin size-8 text-pink-500" />
}

Loading.Card = ({ className = '' }: LoadingCardProps) => {
  return (
    <div className={`h-160 flex w-full items-center justify-center flex-col ${className}`}>
      <Loading />
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  )
}

Loading.Error = ({ error }: LoadingErrorProps) => {
  if (error instanceof Exception.NotFoundException) {
    return <Empty.Icon message="Data does not exist or has been deleted" />
  }

  if (error instanceof Exception.UnauthorizedException) {
    return <AuthSection message="You need to log in to access this data" />
  }

  if (error instanceof Exception.ForbiddenException) {
    return (
      <Empty.Icon
        icon={ErrorIcon}
        message="You are not authorized to access this data"
      />
    )
  }

  if (error instanceof Exception.BadRequestException) {
    return (
      <Empty.Icon
        icon={ErrorIcon}
        message={error.getFirstMessage()}
      />
    )
  }

  if (error instanceof Exception.BaseException) {
    return (
      <Empty.Icon
        icon={ErrorIcon}
        message={error.getFirstMessage()}
      />
    )
  }

  return (
    <Empty.Icon
      icon={ErrorIcon}
      message="An error occurred while fetching data, please try again later"
    />
  )
}
