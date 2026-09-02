import { THEME } from '@neziva/constants'
import { IconGroup } from '@neziva/svg'
import { navigate } from 'wouter/use-browser-location'
import { config } from '@/config'
import { Button } from '../ui/button'

export function AuthSection({ message = '请先登录后再访问此页面' }: { message?: string }) {
  return (
    <div className="flex h-full flex-col items-center px-4 pt-60">
      <IconGroup width={48} height={48} color={THEME.colors.gray[300]} />
      <div className="pb-10 pt-2 text-gray-400">{message}</div>
      <Button
        onClick={() => {
          navigate(config.loginPagePath.get(), { replace: true })
        }}
        className="w-[65%] rounded-full font-bold"
      >
        去登录
      </Button>
    </div>
  )
}
