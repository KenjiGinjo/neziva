import { faker } from '@faker-js/faker'
import { hashPassword } from '@haole/tools/crypto'
import { db } from '../src'

export async function initAdmin() {
  await db.admin.create({
    username: 'admin',
    password: await hashPassword('123456'),
    role: ['admin'],
    nickname: '管理员A',
    avatar: faker.image.avatar(),
  })
}
