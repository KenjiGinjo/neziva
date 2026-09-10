import type { ReactNode } from 'react'
import { Exception } from '@neziva/tools/exception'
import { Pencil, Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Link } from 'wouter'
import { handleUnauthorized } from '@/components/auth/signin'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'

export interface ActionButtonsProps {
  editUrl?: string
  onDelete?: () => void | Promise<void>
  className?: string
  children?: ReactNode
}

function deleteErrorMessage(error: unknown) {
  if (error instanceof Exception.BaseException)
    return error.getFirstMessage() || '删除失败'
  if (error instanceof Error && error.message)
    return error.message
  return '删除失败，请稍后重试'
}

export function ActionButtons({
  editUrl,
  onDelete,
  className = 'flex gap-2',
  children,
}: ActionButtonsProps) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  return (
    <div className={className}>
      {children}
      {editUrl && (
        <Button variant="ghost" size="icon" asChild>
          <Link href={editUrl}>
            <Pencil className="text-gray-400" />
          </Link>
        </Button>
      )}
      {onDelete && (
        <AlertDialog
          open={open}
          onOpenChange={(next) => {
            if (!pending)
              setOpen(next)
          }}
        >
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash className="text-red-400" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确定删除吗？</AlertDialogTitle>
              <AlertDialogDescription>
                删除后将无法恢复。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={pending}>取消</AlertDialogCancel>
              <AlertDialogAction
                disabled={pending}
                onClick={async (e) => {
                  e.preventDefault()
                  if (pending)
                    return
                  setPending(true)
                  try {
                    await onDelete()
                    setOpen(false)
                  }
                  catch (error) {
                    if (error instanceof Exception.UnauthorizedException) {
                      handleUnauthorized()
                      return
                    }
                    toast.error(deleteErrorMessage(error))
                  }
                  finally {
                    setPending(false)
                  }
                }}
              >
                {pending ? '删除中...' : '确认'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
