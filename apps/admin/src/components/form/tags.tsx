import type { WrapperProps } from './base'
import { IconCloseLine } from '@haole/svg'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useFormContext, Wrapper } from './base'

export type TagsProps = WrapperProps & {
  placeholder?: string
  maxTags?: number
}

export function Tags(props: TagsProps) {
  const { form } = useFormContext()
  const [inputValue, setInputValue] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // 从form值初始化tags
  useEffect(() => {
    const formValue = form.getValues(props.name)
    if (formValue && typeof formValue === 'string' && formValue.trim()) {
      const initialTags = formValue.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      setTags(initialTags)
    }
  }, [form, props.name])

  // 当tags变化时更新form值
  useEffect(() => {
    form.setValue(props.name, tags.length > 0 ? tags.join(', ') : '')
  }, [tags, form, props.name])

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag) && (!props.maxTags || tags.length < props.maxTags)) {
      setTags([...tags, trimmedTag])
      setInputValue('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue)
    }
    else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value.includes(',')) {
      const parts = value.split(',')
      const lastPart = parts.pop() || ''
      parts.forEach(part => addTag(part))
      setInputValue(lastPart)
    }
  }

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue)
    }
  }

  return (
    <Wrapper {...props}>
      <FormField
        control={form.control}
        name={props.name}
        render={() => (
          <FormItem>
            <FormControl>
              <div className={cn(
                'min-h-[36px] w-full rounded-md bg-gray-200 px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none',
                'focus-within:ring-ring/50 focus-within:ring-[3px]',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                props.className,
              )}
              >
                <div className="flex flex-wrap gap-2 items-center">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 bg-green-600 hover:bg-green-700 rounded-sm p-0.5 transition-colors"
                      >
                        <IconCloseLine className="text-white size-3" />
                      </button>
                    </div>
                  ))}
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    onBlur={handleInputBlur}
                    placeholder={tags.length === 0 ? props.placeholder || '输入标签...' : ''}
                    className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Wrapper>
  )
}
