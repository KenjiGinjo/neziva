export interface ResWorkflowList {
  items: any[]
  total: number
  page: number
  pageSize: number
}

export interface ResCreateWorkflow {
  id: string
}

export interface ResUpdateWorkflow {
  message: string
}

export interface ResDeleteWorkflow {
  message: string
}

export interface ResRunWorkflow {
  executionId: string
}

export interface ResStopWorkflow {
  message: string
}

export interface ResDuplicateWorkflow {
  id: string
}

export interface ResWorkflowExecutions {
  items: any[]
  total: number
}
