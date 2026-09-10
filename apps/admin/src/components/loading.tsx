import { IconErrorWarningFill } from '@neziva/svg'
import { Exception } from '@neziva/tools/exception'
import { Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { handleUnauthorized } from '@/components/auth/signin'
import { Empty } from './empty'

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
  return <Loader2Icon className="animate-spin size-8 text-pink-100" />
}

Loading.Card = ({ className = '' }: LoadingCardProps) => {
  return (
    <div className={`h-160 flex w-full items-center justify-center flex-col ${className}`}>
      <Loading />
      <p className="text-sm text-gray-500">加载中...</p>
    </div>
  )
}

function RedirectToLogin() {
  useEffect(() => {
    handleUnauthorized()
  }, [])
  return <Loading.Card />
}

Loading.Error = ({ error }: LoadingErrorProps) => {
  if (error instanceof Exception.NotFoundException) {
    return <Empty.Icon message="数据不存在或已被删除" />
  }

  if (error instanceof Exception.UnauthorizedException) {
    return <RedirectToLogin />
  }

  if (error instanceof Exception.ForbiddenException) {
    return (
      <Empty.Icon
        icon={ErrorIcon}
        message="没有权限访问该数据"
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
      message="加载失败，请稍后重试"
    />
  )
}
