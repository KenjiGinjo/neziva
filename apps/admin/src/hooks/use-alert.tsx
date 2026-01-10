'use client'

import * as React from 'react'

interface AlertDialogProps {
  title: string
  description: string
  onConfirm: () => void
  onCancel?: () => void
}

const ALERT_LIMIT = 1

interface AlertState {
  alerts: AlertDialogProps[]
}

const _actionTypes = {
  ADD_ALERT: 'ADD_ALERT',
  REMOVE_ALERT: 'REMOVE_ALERT',
} as const

type ActionType = typeof _actionTypes

type Action =
  | {
    type: ActionType['ADD_ALERT']
    alert: AlertDialogProps
  }
  | {
    type: ActionType['REMOVE_ALERT']
  }

const listeners: Array<(state: AlertState) => void> = []

let memoryState: AlertState = { alerts: [] }

function reducer(state: AlertState, action: Action): AlertState {
  switch (action.type) {
    case 'ADD_ALERT':
      return {
        ...state,
        alerts: [action.alert, ...state.alerts].slice(0, ALERT_LIMIT),
      }
    case 'REMOVE_ALERT':
      return {
        ...state,
        alerts: [],
      }
  }
}

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function alert({ ...props }: AlertDialogProps) {
  dispatch({
    type: 'ADD_ALERT',
    alert: props,
  })
}

function useAlert() {
  const [state, setState] = React.useState<AlertState>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    alert,
    dismiss: () => dispatch({ type: 'REMOVE_ALERT' }),
  }
}

export { alert, useAlert }
