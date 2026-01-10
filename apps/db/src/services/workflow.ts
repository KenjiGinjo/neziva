import { Exception } from '@neziva/tools/exception'
import { db } from '../tables'

export const workflow = {
  // Create sample workflow data for testing/seeding
  createSampleWorkflowData: (): { nodes: any[], edges: any[] } => {
    return {
      nodes: [
        {
          id: '1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: { label: 'Start' },
        },
        {
          id: '2',
          type: 'process',
          position: { x: 200, y: 0 },
          data: { label: 'Process Data' },
        },
        {
          id: '3',
          type: 'end',
          position: { x: 400, y: 0 },
          data: { label: 'End' },
        },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
      ],
    }
  },
  create: async ({
    userId,
    name,
    description,
    workflowData,
  }: {
    userId: string
    name: string
    description?: string
    workflowData: { nodes: any[], edges: any[] }
  }) => {
    const workflow = await db.workflow.create({
      userId,
      name,
      description,
      workflowData,
      status: 'draft',
    })

    return workflow
  },

  findById: async (id: string, userId?: string) => {
    const workflow = await db.workflow
      .where({
        id,
        ...(userId && { userId }),
      })
      .takeOptional()

    if (!workflow) {
      throw new Exception.NotFoundException('Workflow not found')
    }

    return workflow
  },

  update: async (
    id: string,
    userId: string,
    data: {
      name?: string
      description?: string
      workflowData?: { nodes: any[], edges: any[] }
      status?: 'draft' | 'active' | 'paused' | 'error'
    },
  ) => {
    await workflow.findById(id, userId)

    const updated = await db.workflow.where({ id }).update(data)

    return updated
  },

  delete: async (id: string, userId: string) => {
    await workflow.findById(id, userId)

    await db.workflow.where({ id }).delete()
  },

  incrementExecutionCount: async (id: string, success: boolean) => {
    const workflow = await db.workflow.where({ id }).take()
    if (!workflow) {
      throw new Exception.NotFoundException('Workflow not found')
    }

    await db.workflow.where({ id }).update({
      executionCount: workflow.executionCount + 1,
      ...(success
        ? { successCount: workflow.successCount + 1 }
        : { errorCount: workflow.errorCount + 1 }),
      lastExecutedAt: new Date(),
    })
  },

  createSample: async ({
    userId,
    name,
    description,
    status = 'draft',
    executionCount = 0,
    successCount = 0,
    errorCount = 0,
    lastExecutedAt,
  }: {
    userId: string
    name: string
    description?: string
    status?: 'draft' | 'active' | 'paused' | 'error'
    executionCount?: number
    successCount?: number
    errorCount?: number
    lastExecutedAt?: Date | null
  }) => {
    const workflow = await db.workflow.create({
      userId,
      name,
      description,
      workflowData: {
        nodes: [
          {
            id: '1',
            type: 'start',
            position: { x: 0, y: 0 },
            data: { label: 'Start' },
          },
          {
            id: '2',
            type: 'process',
            position: { x: 200, y: 0 },
            data: { label: 'Process Data' },
          },
          {
            id: '3',
            type: 'end',
            position: { x: 400, y: 0 },
            data: { label: 'End' },
          },
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2' },
          { id: 'e2-3', source: '2', target: '3' },
        ],
      },
      status,
      executionCount,
      successCount,
      errorCount,
      lastExecutedAt: lastExecutedAt || null,
    })

    return workflow
  },
}
