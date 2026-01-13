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

  test('获取订阅者列表：基本功能', async () => {
    const subscriber1 = await db.newsletter.create({
      email: 'list1@example.com',
      status: EnumNewsletterStatus.Subscribed,
    })

    const subscriber2 = await db.newsletter.create({
      email: 'list2@example.com',
      status: EnumNewsletterStatus.Pending,
    })

    const { data, total } = await ds.newsletter.getList({
      limit: 10,
      offset: 0,
    })

    expect(total).toBeGreaterThanOrEqual(2)
    expect(data.length).toBeGreaterThanOrEqual(2)
    expect(data.some(s => s.id === subscriber1.id)).toBe(true)
    expect(data.some(s => s.id === subscriber2.id)).toBe(true)
  })

  test('获取订阅者列表：按状态筛选', async () => {
    const subscribed = await db.newsletter.create({
      email: 'subscribed@example.com',
      status: EnumNewsletterStatus.Subscribed,
    })

    await db.newsletter.create({
      email: 'pending@example.com',
      status: EnumNewsletterStatus.Pending,
    })

    const { data, total } = await ds.newsletter.getList({
      status: EnumNewsletterStatus.Subscribed,
      limit: 10,
      offset: 0,
    })

    expect(total).toBeGreaterThanOrEqual(1)
    expect(data.some(s => s.id === subscribed.id)).toBe(true)
    expect(data.every(s => s.status === EnumNewsletterStatus.Subscribed)).toBe(true)
  })

  test('获取订阅者列表：按来源筛选', async () => {
    const source = 'homepage'
    const subscriber = await db.newsletter.create({
      email: 'source@example.com',
      status: EnumNewsletterStatus.Subscribed,
      source,
    })

    await db.newsletter.create({
      email: 'other@example.com',
      status: EnumNewsletterStatus.Subscribed,
      source: 'blog',
    })

    const { data, total } = await ds.newsletter.getList({
      source,
      limit: 10,
      offset: 0,
    })

    expect(total).toBeGreaterThanOrEqual(1)
    expect(data.some(s => s.id === subscriber.id)).toBe(true)
    expect(data.every(s => s.source === source)).toBe(true)
  })

  test('获取订阅者列表：搜索功能', async () => {
    const email = 'searchtest@example.com'
    const subscriber = await db.newsletter.create({
      email,
      status: EnumNewsletterStatus.Subscribed,
    })

    const { data, total } = await ds.newsletter.getList({
      search: 'searchtest',
      limit: 10,
      offset: 0,
    })

    expect(total).toBeGreaterThanOrEqual(1)
    expect(data.some(s => s.id === subscriber.id)).toBe(true)
  })

  test('获取订阅者列表：分页功能', async () => {
    // 创建多个订阅者
    for (let i = 0; i < 5; i++) {
      await db.newsletter.create({
        email: `page${i}@example.com`,
        status: EnumNewsletterStatus.Subscribed,
      })
    }

    const page1 = await ds.newsletter.getList({
      limit: 2,
      offset: 0,
    })

    const page2 = await ds.newsletter.getList({
      limit: 2,
      offset: 2,
    })

    expect(page1.data.length).toBe(2)
    expect(page2.data.length).toBe(2)
    expect(page1.data[0]?.id).not.toBe(page2.data[0]?.id)
  })

  test('获取订阅者详情：基本功能', async () => {
    const subscriber = await db.newsletter.create({
      email: 'detail@example.com',
      status: EnumNewsletterStatus.Subscribed,
      source: 'homepage',
    })

    const result = await ds.newsletter.getById(subscriber.id)

    expect(result).not.toBeNull()
    expect(result?.id).toBe(subscriber.id)
    expect(result?.email).toBe(subscriber.email)
    expect(result?.status).toBe(subscriber.status)
  })

  test('获取订阅者详情：不存在时返回 undefined', async () => {
    const result = await ds.newsletter.getById('non-existent-id')

    expect(result).toBeUndefined()
  })

  test('更新订阅状态：基本功能', async () => {
    const subscriber = await db.newsletter.create({
      email: 'updatestatus@example.com',
      status: EnumNewsletterStatus.Pending,
    })

    const updated = await ds.newsletter.updateStatus(subscriber.id, EnumNewsletterStatus.Subscribed)

    expect(updated.status).toBe(EnumNewsletterStatus.Subscribed)
    expect(updated.verifiedAt).not.toBeNull()
  })

  test('更新订阅状态：订阅时设置验证时间', async () => {
    const subscriber = await db.newsletter.create({
      email: 'verify@example.com',
      status: EnumNewsletterStatus.Pending,
    })

    const updated = await ds.newsletter.updateStatus(subscriber.id, EnumNewsletterStatus.Subscribed)

    expect(updated.status).toBe(EnumNewsletterStatus.Subscribed)
    expect(updated.verifiedAt).not.toBeNull()
    expect(updated.verifiedAt).toBeInstanceOf(Date)
  })

  test('更新订阅状态：退订时设置退订时间', async () => {
    const subscriber = await db.newsletter.create({
      email: 'unsubscribe@example.com',
      status: EnumNewsletterStatus.Subscribed,
    })

    const updated = await ds.newsletter.updateStatus(subscriber.id, EnumNewsletterStatus.Unsubscribed)

    expect(updated.status).toBe(EnumNewsletterStatus.Unsubscribed)
    expect(updated.unsubscribedAt).not.toBeNull()
    expect(updated.unsubscribedAt).toBeInstanceOf(Date)
  })

  test('更新订阅状态：所有状态', async () => {
    const subscriber = await db.newsletter.create({
      email: 'allstatus@example.com',
      status: EnumNewsletterStatus.Pending,
    })

    // 更新为已订阅
    const subscribed = await ds.newsletter.updateStatus(subscriber.id, EnumNewsletterStatus.Subscribed)
    expect(subscribed.status).toBe(EnumNewsletterStatus.Subscribed)

    // 更新为已退订
    const unsubscribed = await ds.newsletter.updateStatus(subscriber.id, EnumNewsletterStatus.Unsubscribed)
    expect(unsubscribed.status).toBe(EnumNewsletterStatus.Unsubscribed)
  })

  test('删除订阅者：基本功能', async () => {
    const subscriber = await db.newsletter.create({
      email: 'delete@example.com',
      status: EnumNewsletterStatus.Subscribed,
    })

    await ds.newsletter.delete(subscriber.id)

    const deleted = await db.newsletter.where({ id: subscriber.id }).takeOptional()
    expect(deleted).toBeUndefined()
  })
})
