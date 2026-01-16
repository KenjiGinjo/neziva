import type { EnumBlogPostStatus, EnumContactFormStatus, EnumErrorLogType, EnumNewsletterStatus } from '@neziva/enums'

export interface ResAdminUserList {
  items: any[]
  total: number
  page: number
  pageSize: number
}

export interface ResAdminUpdateUser {
  message: string
}

export interface ResAdminDeleteUser {
  message: string
}

export interface ResAdminUserStats {
  totalUsers: number
  newUsers: number
  activeUsers: number
  paidUsers: number
  userGrowth: Array<{ date: string, count: number }>
}

export interface ResAdminWorkflowList {
  items: any[]
  total: number
  page: number
  pageSize: number
}

export interface ResAdminWorkflowStats {
  totalWorkflows: number
  activeWorkflows: number
  pausedWorkflows: number
  errorWorkflows: number
  executionsCount: number
  successRate: number
  averageExecutionTime: number
}

export interface ResAdminStats {
  totalUsers: number
  activeUsers: number
  totalWorkflows: number
  executionsToday: number
  revenueToday: number
  apiCallsToday: number
  errorRate: number
  systemHealth: 'healthy' | 'warning' | 'error'
}

export interface ResAdminSettings {
  message: string
}

export interface ResAdminExecutionList {
  items: any[]
  total: number
}

export interface ResAdminLogList {
  path: string | null
  code: string
  type: EnumErrorLogType
  createdAt: string
  id: string
  detail: string
  method: string | null
}

export interface ResAdminBlogPostList {
  id: string
  createdAt: string
  publishedAt: string | null
  title: string
  slug: string
  content: string
  excerpt: string | null
  category: string
  tags: string[] | null
  author: string
  readTime: number
  views: number
  featured: boolean
  status: EnumBlogPostStatus
  coverImage: string | null
  seoTitle: string | null
  seoDesc: string | null
}

export interface ResAdminContactFormList {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  company: string | null
  email: string
  phone: string | null
  projectType: string
  description: string
  budget: string | null
  status: EnumContactFormStatus
  notes: string | null
}

export interface ResAdminNewsletterList {
  id: string
  createdAt: string
  updatedAt: string
  email: string
  status: EnumNewsletterStatus
  verifiedAt: string | null
  unsubscribedAt: string | null
  source: string | null
}
