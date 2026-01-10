import { Pencil, Trash } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'

export interface ActionButtonsProps {
  editUrl?: string
  onDelete?: () => void
  className?: string
  children?: React.ReactNode
}

export function ActionButtons({
  editUrl,
  onDelete,
  className = 'flex gap-2',
  children,
}: ActionButtonsProps) {
  return (
    <div className={className}>
      {children}
      {editUrl && (
        <Button variant="ghost" size="icon" asChild>
          <Link to={editUrl}>
            <Pencil className="text-gray-400" />
          </Link>
        </Button>
      )}
      {onDelete && (
        <>
          <AlertDialog>
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
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>确认</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  )
}
