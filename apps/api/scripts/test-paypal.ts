#!/usr/bin/env bun

/**
 * PayPal 支付功能测试脚本
 *
 * 使用方法:
 *   bun run scripts/test-paypal.ts [command]
 *
 * 命令:
 *   info        - 获取沙盒测试信息
 *   connection  - 测试 PayPal API 连接
 *   webhook     - 模拟 webhook 事件（需要手动提供参数）
 */

const BASE_URL = process.env.URI_SERVER || 'http://localhost:3000'
const AUTH_TOKEN = process.env.TEST_AUTH_TOKEN || ''

interface TestResult {
  success: boolean
  message: string
  data?: any
  error?: any
}

async function testConnection(): Promise<TestResult> {
  try {
    console.log('🔍 测试 PayPal API 连接...')

    const response = await fetch(`${BASE_URL}/pay/paypal/test-connection`)
    const data = await response.json()

    if (data.success) {
      console.log('✅ PayPal API 连接成功!')
      console.log('📊 响应状态:', data.status)
      console.log('🔑 Token 类型:', data.data?.token_type)
      console.log('⏰ Token 过期时间:', data.data?.expires_in, '秒')
      return { success: true, message: '连接成功', data }
    }
    else {
      console.error('❌ PayPal API 连接失败!')
      console.error('📊 响应状态:', data.status)
      console.error('❌ 错误信息:', data.error)
      return { success: false, message: '连接失败', error: data.error }
    }
  }
  catch (error) {
    console.error('❌ 请求失败:', error)
    return {
      success: false,
      message: '请求失败',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

async function getSandboxInfo(): Promise<TestResult> {
  try {
    console.log('🔍 获取沙盒测试信息...')

    const response = await fetch(`${BASE_URL}/pay/sandbox/info`)

    if (response.status === 204) {
      console.log('⚠️  当前不在沙盒模式')
      return { success: false, message: '不在沙盒模式' }
    }

    const data = await response.json()

    if (data.data) {
      console.log('✅ 沙盒信息获取成功!')
      console.log('📦 沙盒模式:', data.data.sandboxMode)

      if (data.data.paypal) {
        console.log('💳 PayPal 沙盒:', data.data.paypal.sandbox)
        console.log('👤 测试账户:')
        console.log('  买家:', data.data.paypal.testAccounts.buyer.email)
        console.log('  卖家:', data.data.paypal.testAccounts.seller.email)
        console.log('🔗 Webhook URL:', data.data.paypal.webhookUrl)
        console.log('✅ 成功 URL:', data.data.paypal.successUrl)
        console.log('❌ 取消 URL:', data.data.paypal.cancelUrl)
      }

      return { success: true, message: '获取成功', data: data.data }
    }
    else {
      return { success: false, message: '数据格式错误', data }
    }
  }
  catch (error) {
    console.error('❌ 请求失败:', error)
    return {
      success: false,
      message: '请求失败',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

async function testWebhook(eventType: string = 'PAYMENT.CAPTURE.COMPLETED'): Promise<TestResult> {
  try {
    console.log('🔍 测试 PayPal Webhook...')
    console.log('📝 事件类型:', eventType)

    // 模拟 webhook 事件
    const webhookEvent = {
      event_type: eventType,
      resource: {
        id: `TEST_${Date.now()}`,
        status: 'COMPLETED',
        amount: {
          currency_code: 'USD',
          value: '10.00',
        },
        supplementary_data: {
          related_ids: {
            order_id: `ORDER_${Date.now()}`,
          },
        },
      },
    }

    const headers = {
      'Content-Type': 'application/json',
      'paypal-auth-algo': 'SHA256withRSA',
      'paypal-cert-id': 'TEST_CERT_ID',
      'paypal-transmission-id': `TEST_${Date.now()}`,
      'paypal-transmission-sig': 'TEST_SIGNATURE',
      'paypal-transmission-time': new Date().toISOString(),
    }

    console.log('📤 发送 Webhook 事件...')
    const response = await fetch(`${BASE_URL}/pay/paypal/webhook`, {
      method: 'POST',
      headers,
      body: JSON.stringify(webhookEvent),
    })

    const data = await response.json()

    if (response.ok && data.received) {
      console.log('✅ Webhook 处理成功!')
      return { success: true, message: 'Webhook 处理成功', data }
    }
    else {
      console.error('❌ Webhook 处理失败!')
      console.error('📊 响应状态:', response.status)
      console.error('❌ 错误信息:', data.error)
      return { success: false, message: 'Webhook 处理失败', error: data.error }
    }
  }
  catch (error) {
    console.error('❌ 请求失败:', error)
    return {
      success: false,
      message: '请求失败',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

async function createPayment(orderId: string, paymentMethod: 'paypal' | 'stripe' = 'paypal'): Promise<TestResult> {
  try {
    if (!AUTH_TOKEN) {
      console.error('❌ 需要设置 TEST_AUTH_TOKEN 环境变量')
      return { success: false, message: '缺少认证 token' }
    }

    console.log('🔍 创建支付订单...')
    console.log('📦 订单 ID:', orderId)
    console.log('💳 支付方式:', paymentMethod)

    const response = await fetch(`${BASE_URL}/pay/figurine/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        id: orderId,
        paymentMethod,
      }),
    })

    const data = await response.json()

    if (response.ok && data.data) {
      console.log('✅ 支付订单创建成功!')
      console.log('🆔 支付 ID:', data.data.paymentId)
      console.log('🔗 重定向 URL:', data.data.redirectUrl)
      console.log('\n💡 提示: 在浏览器中打开重定向 URL 完成支付')
      return { success: true, message: '订单创建成功', data: data.data }
    }
    else {
      console.error('❌ 支付订单创建失败!')
      console.error('📊 响应状态:', response.status)
      console.error('❌ 错误信息:', data.error || data)
      return { success: false, message: '订单创建失败', error: data.error || data }
    }
  }
  catch (error) {
    console.error('❌ 请求失败:', error)
    return {
      success: false,
      message: '请求失败',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

function printUsage() {
  console.log(`
📖 PayPal 测试脚本使用说明

使用方法:
  bun run scripts/test-paypal.ts [command] [options]

命令:
  info                   获取沙盒测试信息
  connection            测试 PayPal API 连接
  webhook [eventType]   测试 webhook 事件处理
  create [orderId]      创建支付订单（需要 TEST_AUTH_TOKEN）

环境变量:
  URI_SERVER            API 服务器地址 (默认: http://localhost:3000)
  TEST_AUTH_TOKEN      测试用的认证 token

示例:
  bun run scripts/test-paypal.ts info
  bun run scripts/test-paypal.ts connection
  bun run scripts/test-paypal.ts webhook PAYMENT.CAPTURE.COMPLETED
  bun run scripts/test-paypal.ts create ORDER_123

Webhook 事件类型:
  PAYMENT.CAPTURE.COMPLETED      - 支付完成
  PAYMENT.CAPTURE.REFUNDED       - 退款完成
  CUSTOMER.DISPUTE.CREATED       - 争议创建
  CUSTOMER.DISPUTE.RESOLVED      - 争议解决
`)
}

async function main() {
  const command = process.argv[2]
  const arg1 = process.argv[3]

  console.log('🚀 PayPal 支付功能测试\n')
  console.log('📍 服务器地址:', BASE_URL)
  console.log('')

  switch (command) {
    case 'info':
      await getSandboxInfo()
      break

    case 'connection':
      await testConnection()
      break

    case 'webhook':
      await testWebhook(arg1)
      break

    case 'create':
      if (!arg1) {
        console.error('❌ 请提供订单 ID')
        printUsage()
        process.exit(1)
      }
      await createPayment(arg1)
      break

    default:
      printUsage()
      if (command) {
        console.error(`\n❌ 未知命令: ${command}`)
        process.exit(1)
      }
  }
}

main().catch(console.error)
