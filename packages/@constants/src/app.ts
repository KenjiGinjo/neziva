export const APP = {
  appName: 'neziva',
  appStartDate: '2025-07-30',
  defaultTZ: '+08:00',
  currency: 'USD',
  currencySymbol: '$',
}

export const DEFAULT_IMAGE_LIMIT_SIZE = 5 * 1024 * 1024
export const DEFAULT_IMAGE_LIMIT_TYPE = ['png', 'jpeg', 'jpg', 'webp', 'gif']
export const DEFAULT_IMAGE_COMPRESS_QUALITY = 85

export const PLAN_LIMITS = {
  free: { apiCallsLimit: 100, price: 0 },
  starter: { apiCallsLimit: 1000, price: 9.99 },
  pro: { apiCallsLimit: 10000, price: 29.99 },
  business: { apiCallsLimit: 100000, price: 99.99 },
} as const

export type PlanType = keyof typeof PLAN_LIMITS
