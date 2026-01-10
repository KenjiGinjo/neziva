import { db } from '../tables'

export const apiCall = {
  create: async ({
    userId,
    workflowId,
    executionId,
    provider,
    model,
    promptTokens,
    completionTokens,
    costUsd,
    status = 'success',
    errorMessage,
  }: {
    userId: string
    workflowId?: string
    executionId?: string
    provider: 'openai' | 'anthropic' | 'google'
    model: string
    promptTokens?: number
    completionTokens?: number
    costUsd?: number
    status?: 'success' | 'error'
    errorMessage?: string
  }) => {
    const apiCall = await db.apiCall.create({
      userId,
      workflowId,
      executionId,
      provider,
      model,
      promptTokens,
      completionTokens,
      costUsd,
      status,
      errorMessage,
    })

    // Update user API calls count
    const user = await db.user.where({ id: userId }).take()
    if (user) {
      await db.user.where({ id: userId }).update({
        apiCallsUsed: user.apiCallsUsed + 1,
      })
    }

    return apiCall
  },

  findByUserId: async (userId: string) => {
    const apiCalls = await db.apiCall.where({ userId }).order({ createdAt: 'DESC' })

    return apiCalls
  },

  findByWorkflowId: async (workflowId: string) => {
    const apiCalls = await db.apiCall.where({ workflowId }).order({ createdAt: 'DESC' })

    return apiCalls
  },

  findByExecutionId: async (executionId: string) => {
    const apiCalls = await db.apiCall.where({ executionId }).order({ createdAt: 'DESC' })

    return apiCalls
  },
}
