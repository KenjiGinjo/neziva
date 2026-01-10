import type { ResChangePassword, ResUserProfile } from '@neziva/interfaces'
import type { HonoResponse } from '../types'
import { hashPassword, verifyPassword } from '@neziva/tools/crypto'
import { Exception } from '@neziva/tools/exception'
import { vAuthChangePassword, vUpdateProfile } from '@neziva/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { authOptional } from '../middleware'
import { type Auth, auth } from '../middleware/auth'
import { validate } from '../utils'
import { saveBase64Image } from '../utils/file'

export const userRoute = new Hono<Auth>()
  .basePath('/user')

  /** 获取用户信息 */
  .get('/profile', authOptional(), async (c): Promise<HonoResponse<{ data: ResUserProfile | null }>> => {
    const user = c.get('user')

    if (!user) {
      return c.json({
        data: null,
      })
    }

    return c.json({
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        nickname: user.nickname,
        avatarUrl: user.avatarUrl,
        subscriptionPlan: user.subscriptionPlan,
        subscriptionStatus: user.subscriptionStatus,
        apiCallsUsed: user.apiCallsUsed,
        apiCallsLimit: user.apiCallsLimit,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  })

  /** 更新用户信息 */
  .put('/profile', auth(), validate('json', vUpdateProfile), async (c): Promise<HonoResponse<{ data: any }>> => {
    const user = c.get('user')
    const dto = c.req.valid('json')

    // If avatarUrl is a base64 data URL, save it and replace with the saved path
    if (dto.avatarUrl && dto.avatarUrl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)) {
      dto.avatarUrl = saveBase64Image({
        base64Data: dto.avatarUrl,
        subDir: 'user/avatar',
      })
    }

    const updated = await db.user.where({ id: user.id }).update(dto)

    return c.json({
      data: updated,
    })
  })

  /** 修改密码 */
  .put('/password', auth(), validate('json', vAuthChangePassword), async (c): Promise<HonoResponse<{ data: ResChangePassword }>> => {
    const user = c.get('user')
    const { oldPassword, newPassword, confirmPassword } = c.req.valid('json')

    if (newPassword !== confirmPassword) {
      throw new Exception.BadRequestException('New passwords do not match')
    }

    if (!user.password) {
      throw new Exception.BadRequestException('Password not set. Please set a password first.')
    }

    const isValid = await verifyPassword(oldPassword, user.password)
    if (!isValid) {
      throw new Exception.UnauthorizedException('Invalid old password')
    }

    const hashedPassword = await hashPassword(newPassword)

    await db.user.where({ id: user.id }).update({
      password: hashedPassword,
    })

    return c.json({
      data: { message: 'Password updated successfully' },
    })
  })
