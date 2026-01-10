import { db } from '../tables'

export const systemLog = {
  create: async ({
    level,
    message,
    context,
    userId,
    workflowId,
  }: {
    level: 'info' | 'warning' | 'error'
    message: string
    context?: Record<string, any>
    userId?: string
    workflowId?: string
  }) => {
    const log = await db.systemLog.create({
      level,
      message,
      context,
      userId,
      workflowId,
    })

    return log
  },

  findByLevel: async (level: 'info' | 'warning' | 'error') => {
    const logs = await db.systemLog.where({ level }).order({ createdAt: 'DESC' })

    return logs
  },

  findByUserId: async (userId: string) => {
    const logs = await db.systemLog.where({ userId }).order({ createdAt: 'DESC' })

    return logs
  },

  findByWorkflowId: async (workflowId: string) => {
    const logs = await db.systemLog.where({ workflowId }).order({ createdAt: 'DESC' })

    return logs
  },
}
