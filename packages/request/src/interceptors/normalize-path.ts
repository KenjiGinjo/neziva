import type { InternalAxiosRequestConfig } from 'axios'
import { trim } from 'radash'

export function normalizePath(config: InternalAxiosRequestConfig) {
  return {
    ...config,
    baseURL: trim(config.baseURL, '/'),
  }
}
