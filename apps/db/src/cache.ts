import { db } from './tables/_db'

function encode(value: unknown): string {
  return JSON.stringify(value)
}

function decode(raw: string): unknown {
  const parsed = JSON.parse(raw) as unknown
  if (
    parsed !== null
    && typeof parsed === 'object'
    && 'logicalExpiration' in parsed
    && 'value' in parsed
  ) {
    return (parsed as { value: unknown }).value
  }
  return parsed
}

export const Cache = {
  async get({ key }: { key: string }): Promise<unknown> {
    const row = await db.cache.where({ key }).takeOptional()
    if (!row || row.value == null)
      return undefined

    if (row.expiresAt && new Date(row.expiresAt).getTime() <= Date.now()) {
      await db.cache.where({ key }).delete()
      return undefined
    }

    return decode(row.value)
  },

  async set({ key, value, ttl }: { key: string, value: unknown, ttl?: number }): Promise<void> {
    const expiresAt = ttl ? new Date(Date.now() + ttl) : null
    const stored = encode(value)
    await db.cache.findBy({ key }).upsert({
      update: { value: stored, expiresAt },
      create: { key, value: stored, expiresAt },
    })
  },

  async delete({ key }: { key: string }): Promise<void> {
    await db.cache.where({ key }).delete()
  },
}
