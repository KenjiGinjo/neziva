export interface ResSubscription {
  plan: string
  status: string
  currentPeriodStart: string | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
}

export interface ResCreateSubscription {
  checkoutUrl: string
}

export interface ResCancelSubscription {
  message: string
}

export interface ResUsage {
  apiCallsUsed: number
  apiCallsLimit: number
  workflowExecutions: number
  periodStart: string
  periodEnd: string
}

export interface ResInvoices {
  items: any[]
  total: number
}
