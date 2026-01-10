import { Exception } from '@neziva/tools/exception'
import { db } from '../tables'

export const execution = {
  create: async ({
    workflowId,
    userId,
    inputData,
  }: {
    workflowId: string
    userId: string
    inputData?: Record<string, any>
  }) => {
    const execution = await db.execution.create({
      workflowId,
      userId,
      status: 'pending',
      startedAt: new Date(),
      inputData,
    })

    return execution
  },

  findById: async (id: string, userId?: string) => {
    const execution = await db.execution
      .where({
        id,
        ...(userId && { userId }),
      })
      .takeOptional()

    if (!execution) {
      throw new Exception.NotFoundException('Execution not found')
    }

    return execution
  },

  updateStatus: async (
    id: string,
    status: 'pending' | 'running' | 'completed' | 'failed' | 'canceled',
    data?: {
      outputData?: Record<string, any>
      errorMessage?: string
      logs?: string
    },
  ) => {
    const updateData: any = { status }

    if (status === 'completed' || status === 'failed' || status === 'canceled') {
      updateData.completedAt = new Date()
    }

    if (data) {
      if (data.outputData)
        updateData.outputData = data.outputData
      if (data.errorMessage)
        updateData.errorMessage = data.errorMessage
      if (data.logs)
        updateData.logs = data.logs
    }

    if (updateData.completedAt) {
      const execution = await db.execution.where({ id }).take()
      if (execution?.startedAt) {
        updateData.durationMs = new Date().getTime() - execution.startedAt.getTime()
      }
    }

    const updated = await db.execution.where({ id }).update(updateData)

    return updated
  },

  findByWorkflowId: async (workflowId: string, userId?: string) => {
    const executions = await db.execution
      .where({
        workflowId,
        ...(userId && { userId }),
      })
      .order({ startedAt: 'DESC' })

    return executions
  },

  createSample: async ({
    workflowId,
    userId,
    status = 'pending',
    startedAt,
    completedAt,
    inputData,
    outputData,
    errorMessage,
    logs,
  }: {
    workflowId: string
    userId: string
    status?: 'pending' | 'running' | 'completed' | 'failed' | 'canceled'
    startedAt: Date
    completedAt?: Date | null
    inputData?: Record<string, any>
    outputData?: Record<string, any> | null
    errorMessage?: string | null
    logs?: string | null
  }) => {
    const durationMs = completedAt && startedAt
      ? completedAt.getTime() - startedAt.getTime()
      : null

    const execution = await db.execution.create({
      workflowId,
      userId,
      status,
      startedAt,
      completedAt: completedAt || null,
      durationMs,
      inputData: inputData || null,
      outputData: outputData || null,
      errorMessage: errorMessage || null,
      logs: logs || null,
    })

    return execution
  },
}
