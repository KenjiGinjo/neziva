/**
 * 邮件模板
 *
 * 包含所有邮件模板函数，用于生成 HTML 和纯文本格式的邮件内容。
 * 所有模板使用一致的样式，符合 neziva 品牌风格。
 */

interface EmailTemplateResult {
  html: string
  text: string
  subject: string
}

/**
 * 验证码邮件模板
 *
 * @param code 验证码
 * @returns 邮件模板结果
 */
export function verificationCodeTemplate(code: string): EmailTemplateResult {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 20px auto; padding: 30px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; margin-top: 0;">Email Verification Code</h2>
        <p style="font-size: 16px; color: #333;">Dear User,</p>
        <p style="font-size: 16px; color: #333;">Your verification code is:</p>
        <div style="margin: 20px 0; padding: 20px; background-color: #f8f8f8; border-left: 4px solid #666; border-radius: 6px;">
          <p style="font-size: 32px; font-weight: bold; color: #333; margin: 0; text-align: center; letter-spacing: 8px;">${code}</p>
        </div>
        <p style="font-size: 16px; color: #333;">This code will expire in 60 seconds. Please do not share this code with anyone.</p>
        <p style="font-size: 16px; color: #333;">If you did not request this code, please ignore this email.</p>
        <div style="margin-top: 25px;">
          <p style="font-size: 16px; color: #333;">Best regards,<br>
          <strong>neziva Team</strong></p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `Your verification code is: ${code}. This code will expire in 60 seconds. Please do not share this code with anyone.`

  return {
    html,
    text,
    subject: 'Email Verification Code',
  }
}

/**
 * 邮箱验证邮件模板
 *
 * @param verifyUrl 验证链接
 * @param userName 用户名（可选）
 * @returns 邮件模板结果
 */
export function emailVerificationTemplate(verifyUrl: string, userName?: string): EmailTemplateResult {
  const displayName = userName || 'User'

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 20px auto; padding: 30px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; margin-top: 0;">Verify Your Email Address</h2>
        <p style="font-size: 16px; color: #333;">Dear ${displayName},</p>
        <p style="font-size: 16px; color: #333;">Thank you for registering! Please verify your email address by clicking the button below:</p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${verifyUrl}" style="display: inline-block; padding: 12px 30px; background-color: #666; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">Verify Email</a>
        </div>
        <p style="font-size: 14px; color: #666;">Or copy and paste this link into your browser:</p>
        <p style="font-size: 14px; color: #666; word-break: break-all;">${verifyUrl}</p>
        <div style="margin: 20px 0; padding: 20px; background-color: #f8f8f8; border-left: 4px solid #ff9800; border-radius: 6px;">
          <p style="font-size: 14px; color: #333; margin: 0;"><strong>Important:</strong> This link will expire in 24 hours. If you did not create an account, please ignore this email.</p>
        </div>
        <div style="margin-top: 25px;">
          <p style="font-size: 16px; color: #333;">Best regards,<br>
          <strong>neziva Team</strong></p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `Verify Your Email Address\n\nDear ${displayName},\n\nThank you for registering! Please verify your email address by clicking the following link:\n${verifyUrl}\n\nThis link will expire in 24 hours.\n\nIf you did not create an account, please ignore this email.`

  return {
    html,
    text,
    subject: 'Verify Your Email Address',
  }
}

/**
 * 密码重置邮件模板
 *
 * @param resetUrl 重置链接
 * @param userName 用户名（可选）
 * @returns 邮件模板结果
 */
export function passwordResetTemplate(resetUrl: string, userName?: string): EmailTemplateResult {
  const displayName = userName || 'User'

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 20px auto; padding: 30px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; margin-top: 0;">Password Reset Request</h2>
        <p style="font-size: 16px; color: #333;">Dear ${displayName},</p>
        <p style="font-size: 16px; color: #333;">We received a request to reset your password. Click the button below to reset it:</p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 30px; background-color: #666; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">Reset Password</a>
        </div>
        <p style="font-size: 14px; color: #666;">Or copy and paste this link into your browser:</p>
        <p style="font-size: 14px; color: #666; word-break: break-all;">${resetUrl}</p>
        <div style="margin: 20px 0; padding: 20px; background-color: #f8f8f8; border-left: 4px solid #ff9800; border-radius: 6px;">
          <p style="font-size: 14px; color: #333; margin: 0;"><strong>Important:</strong> This link will expire in 1 hour. If you did not request a password reset, please ignore this email or contact support.</p>
        </div>
        <div style="margin-top: 25px;">
          <p style="font-size: 16px; color: #333;">Best regards,<br>
          <strong>neziva Team</strong></p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `Password Reset Request\n\nDear ${displayName},\n\nWe received a request to reset your password. Click the following link to reset it:\n${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you did not request a password reset, please ignore this email or contact support.`

  return {
    html,
    text,
    subject: 'Password Reset Request',
  }
}

/**
 * 欢迎邮件模板
 *
 * @param userName 用户名
 * @returns 邮件模板结果
 */
export function welcomeEmailTemplate(userName: string): EmailTemplateResult {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 20px auto; padding: 30px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; margin-top: 0;">Welcome to neziva!</h2>
        <p style="font-size: 16px; color: #333;">Dear ${userName},</p>
        <p style="font-size: 16px; color: #333;">Thank you for joining neziva! We're excited to have you on board.</p>
        <p style="font-size: 16px; color: #333;">Your account has been successfully created. You can now start exploring all the features we have to offer.</p>
        <div style="margin-top: 25px;">
          <p style="font-size: 16px; color: #333;">Best regards,<br>
          <strong>neziva Team</strong></p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `Welcome to neziva!\n\nDear ${userName},\n\nThank you for joining neziva! We're excited to have you on board.\n\nYour account has been successfully created. You can now start exploring all the features we have to offer.`

  return {
    html,
    text,
    subject: 'Welcome to neziva!',
  }
}

/**
 * 联系我们邮件模板
 *
 * @param type 联系类型
 * @param email 用户邮箱
 * @param name 用户姓名（可选）
 * @param content 联系内容
 * @param images 图片URLs（可选）
 * @returns 邮件模板结果
 */
export function contactUsTemplate(
  type: string,
  email: string,
  name: string | undefined,
  content: string,
  images?: string[],
): EmailTemplateResult {
  const displayName = name || 'User'
  const typeLabels: Record<string, { zh: string, en: string }> = {
    defect_refund: { zh: '瑕疵品/换货/退款', en: 'Defect/Exchange/Refund' },
    artist_collaboration: { zh: '画师合作', en: 'Artist Collaboration' },
    feedback: { zh: '意见与建议', en: 'Feedback & Suggestions' },
  }
  const typeLabel = typeLabels[type] || { zh: '联系我们', en: 'Contact Us' }

  let imagesSection = ''
  if (images && images.length > 0) {
    imagesSection = `
      <div style="margin: 20px 0; padding: 20px; background-color: #f8f8f8; border-radius: 6px;">
        <h3 style="color: #333; margin-top: 0;">Attached Images (${images.length})</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${images.map(img => `
            <a href="${img}" target="_blank" style="display: block; max-width: 200px;">
              <img src="${img}" alt="Attachment" style="max-width: 100%; height: auto; border-radius: 4px; border: 1px solid #ddd;" />
            </a>
          `).join('')}
        </div>
      </div>
    `
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 20px auto; padding: 30px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; margin-top: 0;">New Contact Form Submission</h2>
        <div style="margin: 20px 0; padding: 15px; background-color: #f8f8f8; border-left: 4px solid #666; border-radius: 6px;">
          <p style="margin: 0; font-size: 14px; color: #666;"><strong>Type:</strong> ${typeLabel.zh} / ${typeLabel.en}</p>
        </div>
        <div style="margin: 20px 0;">
          <p style="font-size: 16px; color: #333;"><strong>From:</strong> ${displayName} &lt;${email}&gt;</p>
        </div>
        <div style="margin: 20px 0; padding: 20px; background-color: #f8f8f8; border-left: 4px solid #666; border-radius: 6px;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="font-size: 16px; color: #333; white-space: pre-wrap;">${content}</p>
        </div>
        ${imagesSection}
        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="font-size: 14px; color: #666;">This is an automated message from neziva Contact Form.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `New Contact Form Submission\n\nType: ${typeLabel.zh} / ${typeLabel.en}\nFrom: ${displayName} <${email}>\n\nMessage:\n${content}\n\n${images && images.length > 0 ? `\nAttached Images:\n${images.map((img, i) => `${i + 1}. ${img}`).join('\n')}\n` : ''}`

  return {
    html,
    text,
    subject: `[neziva Contact] ${typeLabel.en} - ${displayName}`,
  }
}
