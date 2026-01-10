import type { ReactNode } from 'react'
import { IconEmptyBoxFill } from '@haole/svg'

export const Empty = {
  Text: ({ message, dash = true }: { message: string, dash?: boolean }) => {
    return <div className="py-12 text-center text-gray-400">{dash ? `- ${message} -` : message}</div>
  },

  Icon: ({ message, icon = <IconEmptyBoxFill width={80} height={80} className="text-gray-400" /> }: { message: string, icon?: ReactNode }) => {
    return (
      <div className="flex flex-col items-center rounded  px-4 py-12 text-center">
        {icon}
        <div className="my-4 leading-loose text-gray-400">{message}</div>
      </div>
    )
  },
}
