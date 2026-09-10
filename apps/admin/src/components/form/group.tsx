import { Exception } from '@neziva/tools/exception'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { getStorageToken, handleUnauthorized } from '@/components/auth/signin'
import { cn } from '@/lib/utils'
import { Form } from '../ui/form'

interface FormGroupProps {
  form: any
  authGuard?: boolean
  onSubmit: (data: any) => Promise<void>
  children: React.ReactNode
  className?: string
}

export function FormGroup({ form, onSubmit, children, className, authGuard }: FormGroupProps) {
  async function handleSubmit(data: any) {
    try {
      if (authGuard) {
        if (!getStorageToken()) {
          handleUnauthorized()
          return
        }
      }

      await onSubmit?.(data)
    }
    catch (e) {
      if (e instanceof ZodError) {
        toast.error(e?.issues?.[0]?.message || '表单验证失败')
        return
      }
      else if (e instanceof Exception.BaseException) {
        toast.error(e.message)
        return
      }

      toast.error('未知错误, 请保存截图反馈给管理员')
      throw e
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={cn(className)}>
        <div className="space-y-4">{children}</div>
      </form>
    </Form>
  )
}
