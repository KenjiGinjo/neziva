import type { ResAdminSettings } from '@neziva/interfaces'
import type { HonoResponse } from '../../types'
import { vUpdateSettings } from '@neziva/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '../../middleware/authAd'
import { validate } from '../../utils'

// 系统设置存储在 Cache 表中，使用 key-value 结构
const SETTINGS_KEY = 'system_settings'

// 默认设置
const defaultSettings = {
  maintenanceMode: false,
  maxApiCallsPerUser: 1000,
  maxWorkflowsPerUser: 50,
  features: {},
  emailService: {
    provider: 'smtp' as const,
  },
  payment: {},
}

export const settings = new Hono()
  .basePath('/settings')

  /** 获取系统设置 */
  .get('/', authAd(), async (c): Promise<HonoResponse<{ data: any }>> => {
    // 从 Cache 表获取设置
    const cache = await db.cache.findOptional(SETTINGS_KEY)

    if (!cache) {
      // 如果不存在，返回默认设置
      return c.json({
        data: defaultSettings,
      })
    }

    try {
      const settings = JSON.parse(cache.value)
      return c.json({
        data: { ...defaultSettings, ...settings },
      })
    }
    catch {
      return c.json({
        data: defaultSettings,
      })
    }
  })

  /** 更新系统设置 */
  .put('/', authAd(), validate('json', vUpdateSettings), async (c): Promise<HonoResponse<{ data: ResAdminSettings }>> => {
    const data = c.req.valid('json')

    // 获取当前设置
    const cache = await db.cache.findOptional(SETTINGS_KEY)
    let currentSettings = defaultSettings

    if (cache) {
      try {
        currentSettings = { ...defaultSettings, ...JSON.parse(cache.value) }
      }
      catch {
        // 如果解析失败，使用默认设置
      }
    }

    // 合并新设置
    const updatedSettings = { ...currentSettings, ...data }

    // 如果 emailService 或 payment 是部分更新，需要合并
    if (data.emailService) {
      updatedSettings.emailService = {
        ...currentSettings.emailService,
        ...data.emailService,
      }
    }

    if (data.payment) {
      updatedSettings.payment = {
        ...currentSettings.payment,
        ...data.payment,
      }
    }

    if (data.features) {
      updatedSettings.features = {
        ...currentSettings.features,
        ...data.features,
      }
    }

    // 保存到 Cache 表
    const settingsJson = JSON.stringify(updatedSettings)

    if (cache) {
      await db.cache.where({ key: SETTINGS_KEY }).update({
        value: settingsJson,
        expiresAt: null, // 设置永不过期
      })
    }
    else {
      await db.cache.create({
        key: SETTINGS_KEY,
        value: settingsJson,
        expiresAt: null,
      })
    }

    return c.json({
      data: { message: 'Settings updated successfully' },
    })
  })
