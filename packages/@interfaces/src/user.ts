export interface ResUserProfile {
  id: string
  email: string | null
  firstName: string | null
  lastName: string | null
  nickname: string | null
  avatarUrl: string | null
  subscriptionPlan: string
  subscriptionStatus: string
  apiCallsUsed: number
  apiCallsLimit: number
  createdAt: string
  updatedAt: string
}

export interface ResUpdateProfile {
  message?: string
  [key: string]: any
}

export interface ResChangePassword {
  message: string
}
