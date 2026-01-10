/* eslint-disable no-console */
import { faker } from '@faker-js/faker'
import { db } from '../src'

export async function initSystemLogs(
  users: Awaited<ReturnType<typeof import('./users').initUsers>>,
  workflows: Awaited<ReturnType<typeof import('./workflows').initWorkflows>>,
) {
  console.log('🌱 Seeding system logs...')

  const logs = []

  // 创建一些系统日志
  const logCount = 50

  for (let i = 0; i < logCount; i++) {
    const level = faker.helpers.arrayElement(['info', 'warning', 'error'])
    const user = faker.helpers.maybe(() => faker.helpers.arrayElement(users), { probability: 0.7 })
    const workflow = user && faker.helpers.maybe(() => {
      const userWorkflows = workflows.filter(w => w.userId === user.id)
      return userWorkflows.length > 0 ? faker.helpers.arrayElement(userWorkflows) : null
    }, { probability: 0.5 })

    const log = await db.systemLog.create({
      level,
      message: faker.lorem.sentence(),
      context: {
        timestamp: new Date().toISOString(),
        userAgent: faker.internet.userAgent(),
        ip: faker.internet.ip(),
        ...(faker.helpers.maybe(() => ({
          error: faker.lorem.sentence(),
          stack: faker.lorem.paragraph(),
        }), { probability: level === 'error' ? 0.8 : 0.2 })),
      },
      userId: user?.id,
      workflowId: workflow?.id,
    })

    logs.push(log)
  }

  console.log(`✅ Created ${logs.length} system logs`)
  return logs
}
