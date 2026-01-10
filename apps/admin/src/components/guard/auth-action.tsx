import type { ReactElement } from 'react'
import { cloneElement } from 'react'
import { showModalAuth } from '@/components/extend'
import { auth } from '../auth/state'

// TODO: 看看 observer 不使用 启用的get是否有效
export function GuardAuthAction({ children, onClick }: { children: ReactElement, onClick?: MouseEvent }) {
  const props = children.props || {}
  const { isSignin } = auth.useSignin()

  if (isSignin) {
    if (onClick) {
      return cloneElement(children, { ...props, onClick } as any)
    }
    else {
      return children
    }
  }
  else {
    return cloneElement(children, {
      ...props,
      onClick: (e: MouseEvent) => {
        e.stopPropagation()
        showModalAuth()
      },
    } as any)
  }
}
