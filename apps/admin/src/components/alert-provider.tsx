'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useAlert } from '@/hooks/use-alert'

export function AlertProvider() {
  const { alerts, dismiss } = useAlert()

  return (
    <>
      {alerts.map((alert, index) => (
        <AlertDialog
          key={index}
          open
          onOpenChange={(open: boolean) => {
            if (!open) {
              dismiss()
              alert.onCancel?.()
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{alert.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {alert.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={alert.onCancel}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={alert.onConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ))}
    </>
  )
}
