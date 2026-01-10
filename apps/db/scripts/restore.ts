import { existsSync } from 'node:fs'
import { $ } from 'bun'
import { ENV } from '../src/env'

const backupFile = process.argv[2]

async function main() {
  if (!backupFile) {
    console.error('❌ 请指定备份文件路径')
    console.log('用法: bun scripts/restore.ts <backup_file>')
    process.exit(1)
  }

  if (!existsSync(backupFile)) {
    console.error(`❌ 备份文件不存在: ${backupFile}`)
    process.exit(1)
  }

  const isDump = backupFile.endsWith('.dump')
  const isSql = backupFile.endsWith('.sql')

  if (!isDump && !isSql) {
    console.error('❌ 不支持的备份格式，请使用 .dump 或 .sql 文件')
    process.exit(1)
  }

  try {
    console.log(`🔄 开始恢复数据库...`)
    console.log(`📁 备份文件: ${backupFile}`)
    console.log(`⚠️  警告: 这将覆盖现有数据！`)

    if (isDump) {
      // 恢复自定义格式备份
      await $`pg_restore -d ${ENV.DATABASE_URL} --clean --if-exists ${backupFile}`
    }
    else {
      // 恢复 SQL 格式备份
      await $`psql ${ENV.DATABASE_URL} < ${backupFile}`
    }

    console.log(`✅ 恢复完成`)
  }
  catch (error) {
    console.error('❌ 恢复失败:', error)
    process.exit(1)
  }
}

main()
