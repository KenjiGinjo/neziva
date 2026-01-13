import { EnumContactFormStatus } from '@neziva/enums'
import { describe, expect, test } from 'bun:test'
import { db, ds } from '../../src'

describe('contact-form', () => {
  test('提交联系表单：基本功能', async () => {
    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      projectType: 'Web Development',
      description: 'This is a test project description',
    }

    const form = await ds.contactForm.submit(formData)

    expect(form).not.toBeNull()
    expect(form.name).toBe(formData.name)
    expect(form.email).toBe(formData.email)
    expect(form.projectType).toBe(formData.projectType)
    expect(form.status).toBe(EnumContactFormStatus.Pending)
  })

  test('提交联系表单：包含所有字段', async () => {
    const formData = {
      name: 'Full User',
      company: 'Test Company',
      email: 'full@example.com',
      phone: '1234567890',
      projectType: 'Mobile App',
      description: 'This is a full test project description',
      budget: '10000-50000',
    }

    const form = await ds.contactForm.submit(formData)

    expect(form.name).toBe(formData.name)
    expect(form.company).toBe(formData.company)
    expect(form.email).toBe(formData.email)
    expect(form.phone).toBe(formData.phone)
    expect(form.projectType).toBe(formData.projectType)
    expect(form.description).toBe(formData.description)
    expect(form.budget).toBe(formData.budget)
  })

  test('获取联系表单列表：基本功能', async () => {
    const form1 = await db.contactForm.create({
      name: 'User 1',
      email: 'user1@example.com',
      projectType: 'Web',
      description: 'Description 1',
      status: EnumContactFormStatus.Pending,
    })

    const form2 = await db.contactForm.create({
      name: 'User 2',
      email: 'user2@example.com',
      projectType: 'Mobile',
      description: 'Description 2',
      status: EnumContactFormStatus.Processed,
    })

    const { data, total } = await ds.contactForm.getList({
      limit: 10,
      offset: 0,
    })

    expect(total).toBeGreaterThanOrEqual(2)
    expect(data.length).toBeGreaterThanOrEqual(2)
    expect(data.some(f => f.id === form1.id)).toBe(true)
    expect(data.some(f => f.id === form2.id)).toBe(true)
  })

  test('获取联系表单列表：按状态筛选', async () => {
    const pendingForm = await db.contactForm.create({
      name: 'Pending User',
      email: 'pending@example.com',
      projectType: 'Web',
      description: 'Pending description',
      status: EnumContactFormStatus.Pending,
    })

    await db.contactForm.create({
      name: 'Processed User',
      email: 'processed@example.com',
      projectType: 'Mobile',
      description: 'Processed description',
      status: EnumContactFormStatus.Processed,
    })

    const { data, total } = await ds.contactForm.getList({
      status: EnumContactFormStatus.Pending,
      limit: 10,
      offset: 0,
    })

    expect(total).toBeGreaterThanOrEqual(1)
    expect(data.some(f => f.id === pendingForm.id)).toBe(true)
    expect(data.every(f => f.status === EnumContactFormStatus.Pending)).toBe(true)
  })

  test('获取联系表单列表：按项目类型筛选', async () => {
    const projectType = 'E-commerce'
    const form = await db.contactForm.create({
      name: 'E-commerce User',
      email: 'ecommerce@example.com',
      projectType,
      description: 'E-commerce description',
      status: EnumContactFormStatus.Pending,
    })

    const { data, total } = await ds.contactForm.getList({
      projectType,
      limit: 10,
      offset: 0,
    })

    expect(total).toBeGreaterThanOrEqual(1)
    expect(data.some(f => f.id === form.id)).toBe(true)
    expect(data.every(f => f.projectType === projectType)).toBe(true)
  })

  test('获取联系表单列表：搜索功能', async () => {
    const form = await db.contactForm.create({
      name: 'Search Test User',
      email: 'search@example.com',
      company: 'Search Company',
      projectType: 'Web',
      description: 'Search description',
      status: EnumContactFormStatus.Pending,
    })

    // 按名称搜索
    const { data: nameResults } = await ds.contactForm.getList({
      search: 'Search Test',
      limit: 10,
      offset: 0,
    })
    expect(nameResults.some(f => f.id === form.id)).toBe(true)

    // 按邮箱搜索
    const { data: emailResults } = await ds.contactForm.getList({
      search: 'search@example.com',
      limit: 10,
      offset: 0,
    })
    expect(emailResults.some(f => f.id === form.id)).toBe(true)

    // 按公司搜索
    const { data: companyResults } = await ds.contactForm.getList({
      search: 'Search Company',
      limit: 10,
      offset: 0,
    })
    expect(companyResults.some(f => f.id === form.id)).toBe(true)
  })

  test('获取联系表单列表：分页功能', async () => {
    // 创建多个表单
    for (let i = 0; i < 5; i++) {
      await db.contactForm.create({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        projectType: 'Web',
        description: `Description ${i}`,
        status: EnumContactFormStatus.Pending,
      })
    }

    const page1 = await ds.contactForm.getList({
      limit: 2,
      offset: 0,
    })

    const page2 = await ds.contactForm.getList({
      limit: 2,
      offset: 2,
    })

    expect(page1.data.length).toBe(2)
    expect(page2.data.length).toBe(2)
    expect(page1.data[0]?.id).not.toBe(page2.data[0]?.id)
  })

  test('获取联系表单详情：基本功能', async () => {
    const form = await db.contactForm.create({
      name: 'Detail User',
      email: 'detail@example.com',
      projectType: 'Web',
      description: 'Detail description',
      status: EnumContactFormStatus.Pending,
    })

    const result = await ds.contactForm.getById(form.id)

    expect(result).not.toBeNull()
    expect(result?.id).toBe(form.id)
    expect(result?.name).toBe(form.name)
    expect(result?.email).toBe(form.email)
  })

  test('获取联系表单详情：不存在时返回 undefined', async () => {
    const result = await ds.contactForm.getById('non-existent-id')

    expect(result).toBeUndefined()
  })

  test('更新处理状态：基本功能', async () => {
    const form = await db.contactForm.create({
      name: 'Status User',
      email: 'status@example.com',
      projectType: 'Web',
      description: 'Status description',
      status: EnumContactFormStatus.Pending,
    })

    const updated = await ds.contactForm.updateStatus(form.id, EnumContactFormStatus.Processed)

    expect(updated.status).toBe(EnumContactFormStatus.Processed)
    expect(updated.id).toBe(form.id)
  })

  test('更新处理状态：所有状态', async () => {
    const form = await db.contactForm.create({
      name: 'All Status User',
      email: 'allstatus@example.com',
      projectType: 'Web',
      description: 'All status description',
      status: EnumContactFormStatus.Pending,
    })

    // 更新为已处理
    const processed = await ds.contactForm.updateStatus(form.id, EnumContactFormStatus.Processed)
    expect(processed.status).toBe(EnumContactFormStatus.Processed)

    // 更新为已回复
    const replied = await ds.contactForm.updateStatus(form.id, EnumContactFormStatus.Replied)
    expect(replied.status).toBe(EnumContactFormStatus.Replied)
  })

  test('更新备注：基本功能', async () => {
    const form = await db.contactForm.create({
      name: 'Notes User',
      email: 'notes@example.com',
      projectType: 'Web',
      description: 'Notes description',
      status: EnumContactFormStatus.Pending,
    })

    const notes = 'This is a test note'
    const updated = await ds.contactForm.updateNotes(form.id, notes)

    expect(updated.notes).toBe(notes)
    expect(updated.id).toBe(form.id)
  })

  test('更新备注：清空备注', async () => {
    const form = await db.contactForm.create({
      name: 'Clear Notes User',
      email: 'clearnotes@example.com',
      projectType: 'Web',
      description: 'Clear notes description',
      status: EnumContactFormStatus.Pending,
      notes: 'Original note',
    })

    const updated = await ds.contactForm.updateNotes(form.id, '')

    expect(updated.notes).toBe('')
  })

  test('删除联系表单记录：基本功能', async () => {
    const form = await db.contactForm.create({
      name: 'Delete User',
      email: 'delete@example.com',
      projectType: 'Web',
      description: 'Delete description',
      status: EnumContactFormStatus.Pending,
    })

    await ds.contactForm.delete(form.id)

    const deleted = await db.contactForm.where({ id: form.id }).takeOptional()
    expect(deleted).toBeUndefined()
  })
})
