import { Exception } from '@neziva/tools/exception'
import { Cache } from '../cache'

export const cache = {
  /**
   * 检查并增加限流计数
   * 使用 BentoCache，自动处理过期值的清理
   */
  async checkAndIncrement({ key, limit, expiresAt, errorMessage }: {
    key: string
    limit: number
    expiresAt: Date
    errorMessage?: string
  }): Promise<number> {
    // 计算 TTL（毫秒）
    const ttl = expiresAt.getTime() - Date.now()
    
    // 如果 TTL 已经过期，直接返回错误
    if (ttl <= 0) {
      throw new Exception.BadRequestException(
        errorMessage || `Invalid expiration time.`,
      )
    }

    // 获取当前计数
    const existing = await Cache.get({ key })
    
    if (existing !== undefined) {
      // 已存在且未过期（BentoCache 会自动处理过期），检查提交次数
      const count = typeof existing === 'number' ? existing : parseInt(String(existing) || '0', 10)
      
      if (count >= limit) {
        throw new Exception.BadRequestException(
          errorMessage
          || `You have reached the maximum number of attempts (${limit}). Please try again later.`,
        )
      }

      // 增加计数
      const newCount = count + 1
      await Cache.set({
        key,
        value: newCount,
        ttl,
      })

      return newCount
    }
    else {
      // 首次提交，创建新记录
      await Cache.set({
        key,
        value: 1,
        ttl,
      })

      return 1
    }
  },
}
