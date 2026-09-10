import type { ResAdminAuthStateResponse, ResAdminLogin, ResAuthMessage } from '@neziva/interfaces'
import type { HonoResponse } from '../../types'
import { verifyPassword } from '@neziva/tools/crypto'
import { Exception } from '@neziva/tools/exception'
import { vAdminLogin } from '@neziva/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { ENV } from '../../env'
import { authAd } from '../../middleware/authAd'
import { assertLoginAllowed, clearLoginFailures, generateToken, getClientIp, jwtExtractToken, jwtResponse, recordLoginFailure, removeToken, validate } from '../../utils'

export const authRoute = new Hono()
  .basePath('/auth')

  /** 管理员登录 */
  .post('/login', validate('json', vAdminLogin), async (c): Promise<HonoResponse<{ data: ResAdminLogin }>> => {
    const { username, password } = c.req.valid('json')
    const ip = getClientIp(c)
    assertLoginAllowed(ip, username)

    const admin = await db.admin.where({ username }).takeOptional()

    if (!admin) {
      recordLoginFailure(ip, username)
      throw new Exception.BadRequestException('账号或密码错误')
    }

    const isValid = await verifyPassword(password, admin.password)
    if (!isValid) {
      recordLoginFailure(ip, username)
      throw new Exception.BadRequestException('账号或密码错误')
    }

    clearLoginFailures(ip, username)

    // 生成并存储 token（管理员 token）
    const token = await generateToken({
      secret: ENV.JWT_SECRET_ADMIN,
      sub: admin.id,
      exp: 3600 * 24 * ENV.JWT_EXPIRES_IN_DAYS,
      isAdmin: true,
    })

    return c.json({
      data: jwtResponse({ token }),
    })
  })

  /** 管理员登出 */
  .post('/logout', authAd(), async (c): Promise<HonoResponse<{ data: ResAuthMessage }>> => {
    const token = jwtExtractToken(c)
    if (token) {
      await removeToken(token, true)
    }

    return c.json({
      data: { message: '已退出登录' },
    })
  })

  /** 获取管理员状态 */
  .get('/state', authAd(), async (c): Promise<HonoResponse<{ data: ResAdminAuthStateResponse }>> => {
    const authId = c.get('authId')
    const admin = await db.admin.findOptional(authId)
    if (!admin) {
      return c.json({
        data: {
          isAuthenticated: false,
        },
      })
    }

    return c.json({
      data: {
        isAuthenticated: true,
        admin: {
          id: admin.id,
          username: admin.username,
          nickname: admin.nickname,
          role: admin.role as string[],
        },
      },
    })
  })
