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
  items: any[]
  total: number
}
