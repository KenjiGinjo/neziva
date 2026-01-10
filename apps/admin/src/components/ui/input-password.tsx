'use client'

import { IconEye, IconEyeOff, IconPassword } from '@haole/svg'
import React from 'react'
import { Input } from './input'

export function InputPassword({ field, placeholder }: { field: any, placeholder?: string }) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  return (
    <div className="relative">
      <IconPassword className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder={placeholder || 'Password'}
        {...field}
        className="pl-8"
      />
      {!isPasswordVisible
        ? <IconEye className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setIsPasswordVisible(true)} />
        : <IconEyeOff className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setIsPasswordVisible(false)} />}
    </div>
  )
}
