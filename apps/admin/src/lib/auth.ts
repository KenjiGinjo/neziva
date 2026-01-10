import { toast } from 'sonner'
import { useAdminStore } from '@/store/admin'

export function checkAuth() {
  if (useAdminStore.getState().token) {
    return true
  }
  return false
}

export function showModalAuth() {
  toast.error('请先登录')
}
