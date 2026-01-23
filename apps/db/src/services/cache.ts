import { Exception } from '@neziva/tools/exception'
import { db } from '../tables'

export const cache = {
  /**
   * 检查并增加限流计数
   * 使用数据库操作，BentoCache 会自动处理过期值的清理
   */
  async checkAndIncrement({ key, limit, expiresAt, errorMessage }: {
    key: string
    limit: number
    expiresAt: Date
    errorMessage?: string
  }): Promise<number> {
    // 检查缓存中是否已有记录
    const existing = await db.cache.findOptional(key)

    if (existing) {
      // 检查是否过期
      if (existing.expiresAt && new Date(existing.expiresAt) <= new Date()) {
        // 已过期，删除旧记录并重新开始
        await db.cache.where({ key }).delete()
        await db.cache.create({
          key,
          value: '1',
          expiresAt,
        })
        return 1
      }

      // 已存在且未过期，检查提交次数
      const count = parseInt(existing.value || '0', 10)
      if (count >= limit) {
        throw new Exception.BadRequestException(
          errorMessage
          || `You have reached the maximum number of attempts (${limit}). Please try again later.`,
        )
      }

      // 增加计数
      const newCount = count + 1
      await db.cache.where({ key }).update({
        value: newCount.toString(),
        expiresAt,
      })

      return newCount
    }
    else {
      // 首次提交，创建新记录
      await db.cache.create({
        key,
        value: '1',
        expiresAt,
      })

      return 1
    }
  },
}
