import { navigate } from 'wouter/use-browser-location'

import { config } from '@/config'
import { showModal } from './modal'

interface ShowModalAuthProps {
  description?: string
}

export function showModalAuth({ description = '您需要先登录才能访问该功能。请登录继续。' }: ShowModalAuthProps = {}) {
  showModal({
    title: '请先登录',
    description,
    confirmText: '登录',
    onConfirm: () => {
      navigate(config.loginPagePath.get(), { replace: true })
    },
  })
}
