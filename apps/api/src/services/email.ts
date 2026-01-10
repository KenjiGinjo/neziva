import { Resend } from 'resend'

import { ENV } from '../env'
import { contactUsTemplate, emailVerificationTemplate, passwordResetTemplate, verificationCodeTemplate, welcomeEmailTemplate } from './email-template'

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}

interface SendResult {
  success: boolean
  message?: string
  error?: string
}

// 初始化 Resend 客户端
const resend = new Resend(ENV.RESEND_API_KEY)

/**
 * 使用 Resend 发送邮件
 * Resend 是一个现代化的邮件服务，适合个人开发者
 * 免费额度：3000 封/月
 */
async function sendEmailViaResend(options: EmailOptions): Promise<SendResult> {
  try {
    const toList = Array.isArray(options.to) ? options.to : [options.to]

    const { error } = await resend.emails.send({
      from: ENV.RESEND_FROM_EMAIL,
      to: toList,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
    })

    if (error) {
      return {
        success: false,
        error: error.message || 'Failed to send email',
      }
    }

    return {
      success: true,
      message: 'Email sent successfully',
    }
  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Resend API error:', error)
    return {
      success: false,
      error: errorMessage,
    }
  }
}

export const email = {
  async sendVerificationCode(to: string, code: string): Promise<SendResult> {
    const template = verificationCodeTemplate(code)

    return sendEmailViaResend({
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
  },

  async sendPasswordReset(to: string, resetToken: string, userName?: string): Promise<SendResult> {
    const resetUrl = `${ENV.URI_CLIENT}/reset-password?token=${resetToken}`
    const template = passwordResetTemplate(resetUrl, userName)

    return sendEmailViaResend({
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
  },

  async sendWelcomeEmail(to: string, userName: string): Promise<SendResult> {
    const template = welcomeEmailTemplate(userName)

    return sendEmailViaResend({
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
  },

  async sendEmailVerification(to: string, verifyToken: string, userName?: string): Promise<SendResult> {
    const verifyUrl = `${ENV.URI_CLIENT}/verify-email?token=${verifyToken}`
    const template = emailVerificationTemplate(verifyUrl, userName)

    return sendEmailViaResend({
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
  },

  async sendContactUsEmail(
    type: string,
    email: string,
    name: string | undefined,
    content: string,
    images?: string[],
  ): Promise<SendResult> {
    const template = contactUsTemplate(type, email, name, content, images)

    return sendEmailViaResend({
      to: 'q1218605102@gmail.com',
      subject: template.subject,
      html: template.html,
      text: template.text,
      replyTo: email,
    })
  },
}
