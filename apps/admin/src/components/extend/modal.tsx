import type { ReactNode } from 'react'
import { createContext, useContext, useRef, useState } from 'react'
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

interface ModalOptions {
  title?: string
  description?: string | ReactNode
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
  onConfirm?: () => void
  onCancel?: () => void
}

interface ModalContextType {
  showModal: (options: ModalOptions) => Promise<boolean>
}

const ModalContext = createContext<ModalContextType | null>(null)

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}

interface ModalProviderProps {
  children: ReactNode
}

let globalShowModal: ((options: ModalOptions) => Promise<boolean>) | null = null

export function showModal(options: ModalOptions): Promise<boolean> {
  if (!globalShowModal) {
    throw new Error('ModalProvider not initialized. Make sure to wrap your app with ModalProvider.')
  }
  return globalShowModal(options)
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ModalOptions>({})
  const resolveRef = useRef<((value: boolean) => void) | null>(null)

  const settle = (value: boolean) => {
    const resolve = resolveRef.current
    if (!resolve)
      return
    resolveRef.current = null
    if (value)
      options.onConfirm?.()
    else
      options.onCancel?.()
    resolve(value)
  }

  const showModal = (modalOptions: ModalOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      const buttonElement = document.activeElement as HTMLElement
      if (buttonElement)
        buttonElement.blur()

      setOptions(modalOptions)
      resolveRef.current = resolve
      setIsOpen(true)
    })
  }

  globalShowModal = showModal

  const handleConfirm = () => {
    settle(true)
    setIsOpen(false)
  }

  const handleCancel = () => {
    settle(false)
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open)
      settle(false)
    setIsOpen(open)
  }

  const {
    title = '系统提示',
    description = '',
    confirmText = '确认',
    cancelText = '取消',
    showCancel = true,
  } = options

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {showCancel && <AlertDialogCancel onClick={handleCancel}>{cancelText}</AlertDialogCancel>}
            <AlertDialogAction onClick={handleConfirm}>{confirmText}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ModalContext.Provider>
  )
}
