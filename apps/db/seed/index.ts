/* eslint-disable no-console */
import { initAdmin } from './admin'
import { initExecutions } from './executions'
import { initInvoices } from './invoices'
import { initSubscriptions } from './subscriptions'
import { initSystemLogs } from './system-logs'
import { initUsers } from './users'
import { initWorkflows } from './workflows'

async function main() {
  console.log('🚀 Starting database seeding...\n')

  try {
    // 初始化管理员
    await initAdmin()
    console.log()

    // 初始化用户
    const users = await initUsers()
    console.log()

    // 初始化订阅
    const subscriptions = await initSubscriptions(users)
    console.log()

    // 初始化发票
    const invoices = await initInvoices(users, subscriptions)
    console.log()

    // 初始化工作流
    const workflows = await initWorkflows(users)
    console.log()

    // 初始化执行记录
    const executions = await initExecutions(workflows)
    console.log()

    // 初始化系统日志
    const systemLogs = await initSystemLogs(users, workflows)
    console.log()

    console.log('✨ Database seeding completed successfully!')
    console.log(`\n📊 Summary:`)
    console.log(`   - Users: ${users.length}`)
    console.log(`   - Subscriptions: ${subscriptions.length}`)
    console.log(`   - Invoices: ${invoices.length}`)
    console.log(`   - Workflows: ${workflows.length}`)
    console.log(`   - Executions: ${executions.length}`)
    console.log(`   - System Logs: ${systemLogs.length}`)
  }
  catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

main()
