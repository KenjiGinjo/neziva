import { $ } from 'bun'

const host = process.env.SERVER_IP?.trim()
const username = process.env.SERVER_USERNAME?.trim() || 'root'
const password = process.env.SERVER_PASSWORD?.trim()
const port = process.env.SERVER_PORT?.trim() || '22'
const remotePath = '/www/wwwroot/neziva-admin'

if (!host) {
  throw new Error('SERVER_IP is missing')
}

const remoteSpec = `${username}@${host}:${remotePath}/`
const usePassword = Boolean(password)

if (usePassword) {
  await $`sshpass -p ${password} ssh -p ${port} ${username}@${host} mkdir -p ${remotePath}`
  await $`sshpass -p ${password} scp -r -P ${port} ./dist/* ${remoteSpec}`
} else {
  await $`ssh -p ${port} ${username}@${host} mkdir -p ${remotePath}`
  await $`scp -r -P ${port} ./dist/* ${remoteSpec}`
}

console.log('Deployment completed!')
