import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { $ } from 'bun'
import { ENV } from '../src/env'

const BACKUP_DIR = join(process.cwd(), 'backups')

async function main() {
  // 确保备份目录存在
  if (!existsSync(BACKUP_DIR)) {
    mkdirSync(BACKUP_DIR, { recursive: true })
  }

  // 生成时间戳
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  const filename = `backup_${timestamp}.dump`

  const backupPath = join(BACKUP_DIR, filename)

  try {
    console.log(`📦 开始备份数据库...`)
    console.log(`📁 备份文件: ${backupPath}`)

    // 自定义格式备份（压缩）
    await $`pg_dump ${ENV.DATABASE_URL} -F c -f ${backupPath}`

    console.log(`✅ 备份完成: ${backupPath}`)
  }
  catch (error) {
    console.error('❌ 备份失败:', error)
    process.exit(1)
  }
}

main()
