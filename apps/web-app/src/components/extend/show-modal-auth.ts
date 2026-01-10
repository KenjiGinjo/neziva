import { navigate } from 'wouter/use-browser-location'

import { config } from '@/config'
import { showModal } from './modal'

interface ShowModalAuthProps {
  description?: string
}

export function showModalAuth({ description = 'You need to be logged in to access this feature. Please login to continue.' }: ShowModalAuthProps = {}) {
  showModal({
    title: 'Please login first',
    description,
    confirmText: 'Login',
    onConfirm: () => {
      navigate(config.loginPagePath.get(), { replace: true })
    },
  })
}
