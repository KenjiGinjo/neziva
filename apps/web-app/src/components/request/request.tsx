/* eslint-disable no-console */
import type { HTMLAttributes, MouseEvent, MouseEventHandler, ReactElement } from 'react'
import type { LoadingProps } from '../loading'
import { Exception } from '@neziva/tools/exception'
import { observer } from '@legendapp/state/react'
import { get } from 'radash'
import { cloneElement, isValidElement, useState } from 'react'
import { toast } from 'sonner'
import { showModalAuth, showModal as showModalBase } from '@/components/extend'
import { auth } from '../auth/state'
import { GuardAuthAction } from '../guard'
import { Loading } from '../loading'

import { RequestException } from './exception'
import { RequestSymbol } from './symbol'

type _ErrorHandler = typeof RequestSymbol.CancelErrorHandle | void
type ErrorHandler = _ErrorHandler | Promise<_ErrorHandler>
type BaseException = InstanceType<typeof Exception.BaseException>

function handleErrorBaseException(e: BaseException): ErrorHandler {
  const message = e.getFirstMessage()

  if (e instanceof Exception.UnauthorizedException) {
    showModalAuth({ description: message })
  }
  else {
    console.warn('BaseRequest::BaseExceptionMessage: ', message)
    showModalBase({
      title: 'Operation Failed',
      description: message,
      showCancel: false,
      confirmText: 'Got it',
    })
  }
}

function handleErrorUnknown(e: unknown): ErrorHandler {
  const errMsg = get<string>(e, 'errMsg')

  if (errMsg === 'chooseImage:fail cancel') {
    console.log('chooseImage:fail cancel')
  }
  else {
    console.error('BaseRequest::UnknownError: ', e)
    console.error('BaseRequest::UnknownErrorMessage: ', get(e, 'message', ''))
    showModalBase({
      title: 'Operation Failed',
      description: 'System error, please try again later',
      showCancel: false,
      confirmText: 'Got it',
    })
  }
}

export type RequestProps = {
  authGuard?: boolean
  showModal?: boolean
  showModalOption?: { title?: string, description?: string }
  showLoading?: boolean
  showLoadingOption?: { title?: string, description?: string }
  showBaseLoading?: boolean
  showBaseLoadingProps?: LoadingProps

  onBeforeRequest?: () => boolean | Promise<boolean>
  request: () => Promise<unknown>
  onSuccess?: (data: unknown) => any | Promise<any>

  onErrorHandle?: (e: unknown) => ErrorHandler
  onErrorBaseException?: (e: BaseException) => ErrorHandler
  /**
   * 在某些版本的IOS系统上, 必须要await一下, 不然request请求会被中断, 导致无报错无反应
   */
  extraAwait?: true
} & HTMLAttributes<HTMLDivElement>

const Handler = observer((props: RequestProps) => {
  const {
    showModal,
    showModalOption,
    showLoading,
    showLoadingOption,
    showBaseLoading,
    showBaseLoadingProps,

    onBeforeRequest,
    request,
    onSuccess,

    onErrorHandle,
    onErrorBaseException,

    extraAwait = true,
  } = props

  const [isLoading, setLoading] = useState(false)

  const onClick: MouseEventHandler = props.onClick
    ? props.onClick
    : async (e: MouseEvent) => {
      e.stopPropagation()

      if (isLoading) {
        return
      }

      if (showModal) {
        try {
          const confirmed = await showModalBase({
            title: showModalOption?.title || 'Confirm Action',
            description: showModalOption?.description || 'Are you sure you want to proceed?',
            showCancel: true,
            confirmText: 'Confirm',
            cancelText: 'Cancel',
          })

          if (!confirmed) {
            return
          }
        }
        catch {
          return
        }
      }

      setLoading(true)
      if (showLoading) {
        toast.loading(showLoadingOption?.title || 'Loading...', { description: showLoadingOption?.description || '', position: 'top-center' })
      }

      if (extraAwait) {
        await new Promise((r) => {
          setTimeout(r, 0)
        })
      }

      try {
        // 拦截 onBeforeRequest
        if ((await onBeforeRequest?.()) === false) {
          return
        }

        // 处理 request
        const data = await request()

        await onSuccess?.(data)
      }
      catch (e) {
        if (e instanceof RequestException.Cancel) {
          console.log('RequestException::Cancel', e.message)
          return
        }

        if ((await onErrorHandle?.(e)) === RequestSymbol.CancelErrorHandle) {
          return
        }

        if (e instanceof Exception.BaseException) {
          console.error('BaseRequest::Error: ', e)
          if ((await onErrorBaseException?.(e)) === RequestSymbol.CancelErrorHandle) {
            return
          }
          await handleErrorBaseException(e)
          return
        }

        await handleErrorUnknown(e)
      }
      finally {
        setLoading(false)
        if (showLoading) {
          toast.dismiss()
        }
      }
    }

  if (isLoading && showBaseLoading) {
    return <Loading {...showBaseLoadingProps} />
  }
  else {
    if (isValidElement(props.children)) {
      return cloneElement(props.children as ReactElement, { onClick } as any)
    }
    else {
      return (
        <div {...props} onClick={onClick}>
          {props.children}
        </div>
      )
    }
  }
})

export function Request(props: RequestProps) {
  const { authGuard = false, children, ...rest } = props
  const { isSignin } = auth.useSignin()

  if (!authGuard || isSignin) {
    return <Handler {...rest}>{children}</Handler>
  }

  return (
    <GuardAuthAction>
      <Handler {...rest}>{children}</Handler>
    </GuardAuthAction>
  )
}
