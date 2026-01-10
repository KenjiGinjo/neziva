/* eslint-disable no-console */
import { faker } from '@faker-js/faker'
import { ds } from '../src'

export async function initExecutions(
  workflows: Awaited<ReturnType<typeof import('./workflows').initWorkflows>>,
) {
  console.log('🌱 Seeding executions...')

  const executions = []

  // 为每个工作流创建一些执行记录
  for (const workflow of workflows) {
    if (workflow.executionCount === 0)
      continue

    const executionCount = Math.min(workflow.executionCount, 10) // 限制每个工作流最多10条执行记录

    for (let i = 0; i < executionCount; i++) {
      const status = faker.helpers.arrayElement(['completed', 'failed', 'running', 'pending'])
      const startedAt = faker.date.recent({ days: 30 })
      const completedAt = status === 'completed' || status === 'failed'
        ? new Date(startedAt.getTime() + faker.number.int({ min: 1000, max: 60000 }))
        : null

      const execution = await ds.execution.createSample({
        workflowId: workflow.id,
        userId: workflow.userId,
        status,
        startedAt,
        completedAt,
        inputData: {
          prompt: faker.lorem.sentence(),
          temperature: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
        },
        outputData: status === 'completed'
          ? {
              result: faker.lorem.paragraph(),
              tokens: faker.number.int({ min: 100, max: 2000 }),
            }
          : null,
        errorMessage: status === 'failed' ? faker.lorem.sentence() : null,
        logs: status === 'completed' || status === 'failed'
          ? faker.lorem.paragraphs(2)
          : null,
      })

      executions.push(execution)
    }
  }

  console.log(`✅ Created ${executions.length} executions`)
  return executions
}
