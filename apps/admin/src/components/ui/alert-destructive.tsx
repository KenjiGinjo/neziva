import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { Alert, AlertDescription, AlertTitle } from './alert'

export function AlertDestructive({ title = 'Error', detail }: { detail?: string, title?: string }) {
  if (!detail) {
    return null
  }

  return (
    <Alert variant="destructive" className="my-4">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{detail}</AlertDescription>
    </Alert>
  )
}
