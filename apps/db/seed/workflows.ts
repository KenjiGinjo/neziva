/* eslint-disable no-console */
import { faker } from '@faker-js/faker'
import { ds } from '../src'

export async function initWorkflows(users: Awaited<ReturnType<typeof import('./users').initUsers>>) {
  console.log('🌱 Seeding workflows...')

  const workflows = []

  // 为每个用户创建一些工作流
  for (const user of users) {
    const workflowCount = faker.number.int({ min: 1, max: 3 })

    for (let i = 0; i < workflowCount; i++) {
      const status = faker.helpers.arrayElement(['draft', 'active', 'paused', 'error'])
      const executionCount = status === 'active' ? faker.number.int({ min: 5, max: 50 }) : faker.number.int({ min: 0, max: 10 })
      const successCount = Math.floor(executionCount * faker.number.float({ min: 0.7, max: 1.0 }))
      const errorCount = executionCount - successCount

      const workflow = await ds.workflow.createSample({
        userId: user.id,
        name: faker.company.catchPhrase(),
        description: faker.lorem.sentence(),
        status,
        executionCount,
        successCount,
        errorCount,
        lastExecutedAt: executionCount > 0 ? faker.date.recent({ days: 30 }) : null,
      })

      workflows.push(workflow)
    }
  }

  console.log(`✅ Created ${workflows.length} workflows`)
  return workflows
}
