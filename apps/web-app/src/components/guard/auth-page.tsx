import type { ReactNode } from 'react'
import { observer } from '@legendapp/state/react'
import { isValidElement } from 'react'
import { auth } from '../auth/state'
import { Loading } from '../loading'
import { AuthSection } from './auth-section'

export const GuardAuthPage = observer(({ children }: { children?: ReactNode }) => {
  const { isLoading, isSignin } = auth.useSignin()

  if (isLoading) {
    return <Loading.Card />
  }
  else if (isSignin) {
    if (isValidElement(children)) {
      return children
    }
    else {
      return <div>{children}</div>
    }
  }
  else {
    return <AuthSection />
  }
})
