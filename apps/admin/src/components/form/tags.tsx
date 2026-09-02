import type { WrapperProps } from './base'
import { X } from 'lucide-react'
import { useState } from 'react'
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

  const addTag = (current: string[], tag: string, onChange: (next: string[]) => void) => {
    const trimmed = tag.trim()
    if (!trimmed || current.includes(trimmed))
      return
    if (props.maxTags && current.length >= props.maxTags)
      return
    onChange([...current, trimmed])
    setInputValue('')
  }

  return (
    <Wrapper {...props}>
      <FormField
        control={form.control}
        name={props.name}
        render={({ field }) => {
          const tags: string[] = Array.isArray(field.value) ? field.value : []

          return (
            <FormItem>
              <FormControl>
                <div className={cn(
                  'min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm',
                  'focus-within:ring-1 focus-within:ring-ring',
                  props.className,
                )}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => field.onChange(tags.filter(t => t !== tag))}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value.includes(',')) {
                          value.split(',').forEach(part => addTag(tags, part, field.onChange))
                          return
                        }
                        setInputValue(value)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addTag(tags, inputValue, field.onChange)
                        }
                        else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
                          field.onChange(tags.slice(0, -1))
                        }
                      }}
                      onBlur={() => {
                        if (inputValue.trim())
                          addTag(tags, inputValue, field.onChange)
                      }}
                      placeholder={tags.length === 0 ? (props.placeholder || '输入后回车') : ''}
                      className="min-w-28 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
    </Wrapper>
  )
}
