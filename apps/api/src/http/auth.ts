import type { ResAuthMessage, ResAuthToken } from '@haole/interfaces'
import type { HonoResponse } from '../types'
import { hashPassword, verifyPassword } from '@haole/tools/crypto'
import { Exception } from '@haole/tools/exception'
import { vAuthForgotPassword, vAuthLoginByGithub, vAuthLoginByGoogle, vAuthLoginByPassword, vAuthRegisterByEmail, vAuthResetPassword } from '@haole/validations'
import { createId } from '@paralleldrive/cuid2'
import { db, ds } from 'db'
import { OAuth2Client } from 'google-auth-library'
import { Hono } from 'hono'
import { ENV } from '../env'
import { auth } from '../middleware'
import { email } from '../services/email'
import { generateToken, jwtExtractToken, jwtResponse, removeToken, validate } from '../utils'

export const authRoute = new Hono()
  .basePath('/auth')

  /** 用户注册 */
  .post('/register', validate('json', vAuthRegisterByEmail), async (c): Promise<HonoResponse<{ data: ResAuthToken }>> => {
    const { firstName, lastName, email: userEmail, password, confirmPassword } = c.req.valid('json')

    if (password !== confirmPassword) {
      throw new Exception.BadRequestException('Passwords do not match')
    }

    const nickname = firstName && lastName ? `${firstName} ${lastName}`.trim() : undefined

    const user = await ds.user.create({
      email: userEmail,
      password,
      firstName,
      lastName,
      nickname,
    })

    // 生成邮箱验证 token
    const verifyToken = createId()

    // 将验证 token 存储到 cache 表，过期时间 24 小时
    const verifyTokenKey = `email_verification:${verifyToken}`
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 小时后过期

    await db.cache.create({
      key: verifyTokenKey,
      value: JSON.stringify({ userId: user.id }),
      expiresAt,
    })

    // 发送邮箱验证邮件
    const userName = nickname || firstName || userEmail.split('@')[0]
    await email.sendEmailVerification(userEmail, verifyToken, userName)

    // 生成并存储 token（用户可以在验证邮箱前登录，但某些功能会被限制）
    const token = await generateToken({
      secret: ENV.JWT_SECRET,
      sub: user.id,
      exp: 3600 * 24 * ENV.JWT_EXPIRES_IN_DAYS,
    })

    await ds.user.updateLastLogin(user.id)

    return c.json({
      data: jwtResponse({ token }),
    })
  })

  /** 用户登录 */
  .post('/login', validate('json', vAuthLoginByPassword), async (c): Promise<HonoResponse<{ data: ResAuthToken }>> => {
    const { email, password } = c.req.valid('json')

    const user = await db.user.where({ email }).takeOptional()

    if (!user) {
      throw new Exception.BadRequestException('User not found or password is incorrect')
    }

    if (!user.password) {
      throw new Exception.BadRequestException('Please use OAuth login or set a password')
    }

    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      throw new Exception.BadRequestException('User not found or password is incorrect')
    }

    if (!user.emailVerifiedAt) {
      throw new Exception.ForbiddenException('Email not verified. Please verify your email before logging in.')
    }

    // 生成并存储 token
    const token = await generateToken({
      secret: ENV.JWT_SECRET,
      sub: user.id,
      exp: 3600 * 24 * ENV.JWT_EXPIRES_IN_DAYS,
    })

    // 更新最后登录时间
    await ds.user.updateLastLogin(user.id)

    return c.json({
      data: jwtResponse({ token }),
    })
  })

  /** 用户登出 */
  .post('/logout', auth(), async (c): Promise<HonoResponse<{ data: ResAuthMessage }>> => {
    const token = jwtExtractToken(c)
    if (token) {
      await removeToken(token)
    }

    return c.json({
      data: { message: 'Logged out successfully' },
    })
  })

  /** 忘记密码 */
  .post('/forgot-password', validate('json', vAuthForgotPassword), async (c): Promise<HonoResponse<{ data: ResAuthMessage }>> => {
    const { email: userEmail } = c.req.valid('json')

    const user = await db.user.where({ email: userEmail }).takeOptional()
    if (!user) {
      // 为了安全，即使用户不存在也返回成功
      return c.json({
        data: { message: 'If the email exists, a password reset link has been sent' },
      })
    }

    // 生成重置 token（使用 cuid2 生成唯一 token）
    const resetToken = createId()

    // 将重置 token 存储到 cache 表，过期时间 1 小时
    const resetTokenKey = `password_reset:${resetToken}`
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 小时后过期

    await db.cache.create({
      key: resetTokenKey,
      value: JSON.stringify({ userId: user.id }),
      expiresAt,
    })

    // 发送密码重置邮件
    const userName = user.nickname || user.firstName || (user.email ? user.email.split('@')[0] : 'User')
    await email.sendPasswordReset(userEmail, resetToken, userName)

    return c.json({
      data: { message: 'If the email exists, a password reset link has been sent' },
    })
  })

  /** 重置密码 */
  .post('/reset-password', validate('json', vAuthResetPassword), async (c): Promise<HonoResponse<{ data: ResAuthMessage }>> => {
    const { token, newPassword, confirmPassword } = c.req.valid('json')

    if (newPassword !== confirmPassword) {
      throw new Exception.BadRequestException('Passwords do not match')
    }

    // 验证重置 token
    const resetTokenKey = `password_reset:${token}`
    const cache = await db.cache.findOptional(resetTokenKey)

    if (!cache) {
      throw new Exception.BadRequestException('Invalid or expired reset token')
    }

    // 检查是否过期
    if (cache.expiresAt) {
      const expiresAtDate = new Date(cache.expiresAt as unknown as string | number | Date)
      if (new Date() > expiresAtDate) {
        // 如果过期，删除记录
        await db.cache.where({ key: resetTokenKey }).delete()
        throw new Exception.BadRequestException('Reset token has expired')
      }
    }

    // 解析用户 ID
    let userId: string
    try {
      const data = JSON.parse(cache.value)
      userId = data.userId
    }
    catch {
      throw new Exception.BadRequestException('Invalid reset token data')
    }

    // 验证用户是否存在
    const user = await db.user.findOptional(userId)
    if (!user) {
      await db.cache.where({ key: resetTokenKey }).delete()
      throw new Exception.NotFoundException('User not found')
    }

    // 更新密码
    const hashedPassword = await hashPassword(newPassword)
    await db.user.where({ id: userId }).update({
      password: hashedPassword,
    })

    // 删除已使用的重置 token
    await db.cache.where({ key: resetTokenKey }).delete()

    return c.json({
      data: { message: 'Password reset successfully' },
    })
  })

  /** Google 登录 */
  .post('/login/google', validate('json', vAuthLoginByGoogle), async (c): Promise<HonoResponse<{ data: ResAuthToken }>> => {
    const { token } = c.req.valid('json')

    try {
      const client = new OAuth2Client(ENV.GOOGLE_CLIENT_ID, ENV.GOOGLE_CLIENT_SECRET)
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: ENV.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload()
      if (!payload) {
        throw new Exception.UnauthorizedException('Invalid Google token')
      }

      const { sub: googleId, email, given_name: firstName, family_name: lastName, name: nickname, picture: avatar } = payload

      if (!email) {
        throw new Exception.BadRequestException('Email is required from Google account')
      }

      // 查找或创建用户
      const user = await ds.user.findOrCreateWithGoogle({
        email,
        googleId,
        avatar,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        nickname: nickname || undefined,
      })

      // 生成并存储 token
      const jwtToken = await generateToken({
        secret: ENV.JWT_SECRET,
        sub: user.id,
        exp: 3600 * 24 * ENV.JWT_EXPIRES_IN_DAYS,
      })

      return c.json({
        data: jwtResponse({ token: jwtToken }),
      })
    }
    catch (error) {
      if (error instanceof Exception.BadRequestException || error instanceof Exception.UnauthorizedException) {
        throw error
      }
      throw new Exception.UnauthorizedException('Failed to verify Google token')
    }
  })

  /** GitHub 登录 */
  .post('/login/github', validate('json', vAuthLoginByGithub), async (c): Promise<HonoResponse<{ data: ResAuthToken }>> => {
    const { code } = c.req.valid('json')

    try {
      // 第一步：使用 code 换取 access_token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: ENV.GITHUB_CLIENT_ID,
          client_secret: ENV.GITHUB_CLIENT_SECRET,
          code,
        }),
      })

      if (!tokenResponse.ok) {
        throw new Exception.UnauthorizedException('Failed to exchange GitHub code for token')
      }

      const tokenData = await tokenResponse.json() as { access_token?: string, error?: string }
      if (tokenData.error || !tokenData.access_token) {
        throw new Exception.UnauthorizedException(tokenData.error || 'Failed to get access token')
      }

      const accessToken = tokenData.access_token

      // 第二步：使用 access_token 获取用户信息
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      })

      if (!userResponse.ok) {
        throw new Exception.UnauthorizedException('Failed to get GitHub user info')
      }

      const githubUser = await userResponse.json() as {
        id: number
        login: string
        email?: string
        name?: string
        avatar_url?: string
      }

      if (!githubUser.email) {
        // 如果 GitHub 用户没有公开邮箱，尝试获取私有邮箱
        const emailResponse = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        })

        if (emailResponse.ok) {
          const emails = await emailResponse.json() as Array<{ email: string, primary: boolean, verified: boolean }>
          const primaryEmail = emails.find(e => e.primary && e.verified) || emails.find(e => e.verified) || emails[0]
          if (primaryEmail) {
            githubUser.email = primaryEmail.email
          }
        }
      }

      if (!githubUser.email) {
        throw new Exception.BadRequestException('Email is required from GitHub account')
      }

      const githubId = String(githubUser.id)
      const email = githubUser.email
      const nickname = githubUser.name || githubUser.login || email.split('@')[0]
      const avatar = githubUser.avatar_url

      // 解析 name 为 firstName 和 lastName
      let firstName: string | undefined
      let lastName: string | undefined
      if (githubUser.name) {
        const nameParts = githubUser.name.trim().split(/\s+/)
        firstName = nameParts[0]
        lastName = nameParts.slice(1).join(' ') || undefined
      }

      // 查找或创建用户
      const user = await ds.user.findOrCreateWithGithub({
        email,
        githubId,
        avatar,
        firstName,
        lastName,
        nickname,
      })

      // 生成并存储 token
      const jwtToken = await generateToken({
        secret: ENV.JWT_SECRET,
        sub: user.id,
        exp: 3600 * 24 * ENV.JWT_EXPIRES_IN_DAYS,
      })

      return c.json({
        data: jwtResponse({ token: jwtToken }),
      })
    }
    catch (error) {
      if (error instanceof Exception.BadRequestException || error instanceof Exception.UnauthorizedException) {
        throw error
      }
      throw new Exception.UnauthorizedException('Failed to authenticate with GitHub')
    }
  })

  /** 邮箱验证 */
  .get('/verify-email', async (c): Promise<HonoResponse<{ data: ResAuthMessage }>> => {
    const token = c.req.query('token')

    if (!token) {
      throw new Exception.BadRequestException('Verification token is required')
    }

    // 验证邮箱验证 token
    const verifyTokenKey = `email_verification:${token}`
    const cache = await db.cache.findOptional(verifyTokenKey)

    if (!cache) {
      throw new Exception.BadRequestException('Invalid or expired verification token')
    }

    // 检查是否过期
    if (cache.expiresAt) {
      const expiresAtDate = new Date(cache.expiresAt as unknown as string | number | Date)
      if (new Date() > expiresAtDate) {
        // 如果过期，删除记录
        await db.cache.where({ key: verifyTokenKey }).delete()
        throw new Exception.BadRequestException('Verification token has expired')
      }
    }

    // 解析用户 ID
    let userId: string
    try {
      const data = JSON.parse(cache.value)
      userId = data.userId
    }
    catch {
      throw new Exception.BadRequestException('Invalid verification token data')
    }

    // 验证用户是否存在
    const user = await db.user.findOptional(userId)
    if (!user) {
      await db.cache.where({ key: verifyTokenKey }).delete()
      throw new Exception.NotFoundException('User not found')
    }

    // 检查邮箱是否已经验证
    if (user.emailVerifiedAt) {
      // 如果已经验证，删除 token 并返回成功
      await db.cache.where({ key: verifyTokenKey }).delete()
      return c.json({
        data: { message: 'Email already verified' },
      })
    }

    // 更新邮箱验证状态
    await db.user.where({ id: userId }).update({
      emailVerifiedAt: new Date(),
    })

    // 删除已使用的验证 token
    await db.cache.where({ key: verifyTokenKey }).delete()

    return c.json({
      data: { message: 'Email verified successfully' },
    })
  })
