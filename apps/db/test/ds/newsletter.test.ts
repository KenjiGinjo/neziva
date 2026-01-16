import { EnumNewsletterStatus } from '@neziva/enums'
import { describe, expect, test } from 'bun:test'
import { db, ds } from '../../src'

describe('newsletter', () => {
  test('订阅 Newsletter：基本功能', async () => {
    const email = 'new@example.com'
    const result = await ds.newsletter.subscribe({ email })

    expect(result.created).toBe(true)

    const subscriber = await db.newsletter.where({ email }).take()
    expect(subscriber.email).toBe(email)
    expect(subscriber.status).toBe(EnumNewsletterStatus.Pending)
  })

  test('订阅 Newsletter：包含来源', async () => {
    const email = 'source@example.com'
    const source = 'homepage'
    const result = await ds.newsletter.subscribe({ email, source })

    expect(result.created).toBe(true)

    const subscriber = await db.newsletter.where({ email }).take()
    expect(subscriber.source).toBe(source)
  })

  test('订阅 Newsletter：已订阅时抛出错误', async () => {
    const email = 'subscribed@example.com'
    await db.newsletter.create({
      email,
      status: EnumNewsletterStatus.Subscribed,
    })

    await expect(ds.newsletter.subscribe({ email })).rejects.toThrow('Email already subscribed')
  })

  test('订阅 Newsletter：退订后重新订阅', async () => {
    const email = 'unsubscribed@example.com'
    const originalSource = 'blog'
    await db.newsletter.create({
      email,
      status: EnumNewsletterStatus.Unsubscribed,
      source: originalSource,
      unsubscribedAt: new Date(),
    })

    const newSource = 'homepage'
    const result = await ds.newsletter.subscribe({ email, source: newSource })

    expect(result.reactivated).toBe(true)

    const subscriber = await db.newsletter.where({ email }).take()
    expect(subscriber.status).toBe(EnumNewsletterStatus.Pending)
    expect(subscriber.unsubscribedAt).toBeNull()
    expect(subscriber.source).toBe(newSource)
  })

  test('订阅 Newsletter：待验证状态时返回已存在', async () => {
    const email = 'pending@example.com'
    await db.newsletter.create({
      email,
      status: EnumNewsletterStatus.Pending,
    })

    const result = await ds.newsletter.subscribe({ email })

    expect(result.alreadyExists).toBe(true)
  })
})
