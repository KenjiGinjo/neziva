import type { ReactNode } from 'react'
import type { RequestProps } from './request'
import { useCallback, useState } from 'react'
import { Request } from './request'

export interface RequestCountDownProps extends Omit<RequestProps, 'children'> {
  countdown: number
  children: (event: { isCounting: boolean, countdownLeft: number }) => ReactNode
}

export function RequestCountDown(props: RequestCountDownProps) {
  const countdownInit = Math.abs(props.countdown) || 60
  const [isCounting, setIsCounting] = useState(false)
  const [countdownLeft, setCountdownLeft] = useState(countdownInit)

  const triggerCountdown = useCallback(() => {
    if (isCounting) {
      return
    }

    setIsCounting(true)

    const intervalId = setInterval(() => {
      setCountdownLeft((left) => {
        if (left <= 0) {
          clearInterval(intervalId)
          setIsCounting(false)
          setCountdownLeft(countdownInit)
          return left
        }
        else {
          return left - 1
        }
      })
    }, 1000)
  }, [])

  return (
    <Request
      showLoading
      {...props}
      onBeforeRequest={async () => {
        if (isCounting) {
          return false
        }

        return props.onBeforeRequest ? await props.onBeforeRequest?.() : true
      }}
      onSuccess={async (data: unknown) => {
        await props.onSuccess?.(data)
        triggerCountdown()
      }}
    >
      {props.children({ isCounting, countdownLeft })}
    </Request>
  )
}
