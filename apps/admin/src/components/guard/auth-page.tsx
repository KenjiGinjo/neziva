import type { ReactNode } from 'react'
import { observer } from '@legendapp/state/react'
import { isValidElement, useEffect } from 'react'
import { goToLogin } from '../auth/signin'
import { auth } from '../auth/state'
import { Loading } from '../loading'

export const GuardAuthPage = observer(({ children }: { children?: ReactNode }) => {
  const { isLoading, isSignin } = auth.useSignin()

  useEffect(() => {
    if (!isLoading && !isSignin)
      goToLogin()
  }, [isLoading, isSignin])

  if (isLoading || !isSignin)
    return <Loading.Card />

  if (isValidElement(children))
    return children

  return <div>{children}</div>
})
