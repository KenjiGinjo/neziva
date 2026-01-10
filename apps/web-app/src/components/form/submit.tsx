import type { FieldValues, UseFormReturn } from 'react-hook-form'
import type { RequestProps } from '../request'
import { toast } from 'sonner'
import { showModal } from '../extend'
import { Request } from '../request'

type SubmitProps<TFieldValues extends FieldValues = FieldValues> = { form: UseFormReturn<TFieldValues> } & RequestProps

function extractErrorMessages(errors: any): string | null {
  function findFirstMessage(obj: any, prefix = ''): string | null {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        if (obj[key].message) {
          return obj[key].message
        }
        else {
          const result = findFirstMessage(obj[key], prefix ? `${prefix}.${key}` : key)
          if (result)
            return result
        }
      }
    }
    return null
  }

  const firstMessage = findFirstMessage(errors)
  return firstMessage
}

export function Submit<TFieldValues extends FieldValues = FieldValues>(props: SubmitProps<TFieldValues>) {
  const { form, children, showLoading = true, ...rest } = props

  return (
    <Request
      {...rest}
      showLoading={showLoading}
      onBeforeRequest={async () => {
        try {
          const isValid = await new Promise<boolean>((resolve) => {
            form.handleSubmit(
              () => resolve(true),
              (errors) => {
                const description = extractErrorMessages(errors)
                toast.warning(description || 'Form validation failed.', {
                  position: 'top-center',
                })
                resolve(false)
              },
            )()
          })

          if (!isValid) {
            return false
          }
        }
        catch (e) {
          showModal({
            title: 'Form Validation Error',
            description: typeof e === 'string' ? e : 'Something went wrong, please try again.',
            showCancel: false,
          })
          return false
        }

        return props.onBeforeRequest ? await props.onBeforeRequest?.() : true
      }}
    >
      {children}
    </Request>
  )
}
