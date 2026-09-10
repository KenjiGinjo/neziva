import { join } from 'node:path'
import { $ } from 'bun'

/** Deploy vars: always taken from apps/api/.env so shell exports cannot override wrong IP/port. */
const DEPLOY_KEYS = ['SERVER_IP', 'SERVER_USERNAME', 'SERVER_PASSWORD', 'SERVER_PORT'] as const

async function applyDeployEnvFromDotenv() {
  const envPath = join(import.meta.dir, '..', '.env')
  const file = Bun.file(envPath)
  if (!(await file.exists())) return
  const text = await file.text()
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    if (!DEPLOY_KEYS.includes(key as (typeof DEPLOY_KEYS)[number])) continue
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    process.env[key] = val
  }
}

await applyDeployEnvFromDotenv()

await $`rm -rf .malagu`
await $`mkdir -p .malagu`
await $`bun build src/app-http.ts --outfile .malagu/app.js --target bun --minify`

const host = process.env.SERVER_IP?.trim()
const username = process.env.SERVER_USERNAME?.trim() || 'root'
const password = process.env.SERVER_PASSWORD?.trim()
const port = process.env.SERVER_PORT?.trim() || '22'
const remotePath = '/var/www/neziva-api'

if (!host) {
  throw new Error('SERVER_IP is missing in apps/api/.env')
}

const remoteSpec = `${username}@${host}:${remotePath}/`
const usePassword = Boolean(password)

// ssh uses -p PORT; scp uses -P PORT (capital P). Destination must be user@host:path in one piece.
if (usePassword) {
  await $`sshpass -p ${password} ssh -p ${port} ${username}@${host} mkdir -p ${remotePath}`
  await $`sshpass -p ${password} scp -r -P ${port} .malagu/app.js ${remoteSpec}`
  await $`sshpass -p ${password} ssh -p ${port} ${username}@${host} pm2 restart neziva_api`
} else {
  await $`ssh -p ${port} ${username}@${host} mkdir -p ${remotePath}`
  await $`scp -r -P ${port} .malagu/app.js ${remoteSpec}`
  await $`ssh -p ${port} ${username}@${host} pm2 restart neziva_api`
}

await $`rm -rf .malagu`

console.log('Deployment completed!')
