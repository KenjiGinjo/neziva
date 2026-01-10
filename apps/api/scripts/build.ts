import { $ } from 'bun'

await $`rm -rf .malagu`
await $`mkdir -p .malagu`
await $`bun build src/app-http.ts --outfile .malagu/app.js --target bun --minify`

// 服务器配置
const SERVER_CONFIG = {
  host: process.env.SERVER_IP,
  username: process.env.SERVER_USERNAME,
  password: process.env.SERVER_PASSWORD,
  remotePath: '/www/wwwroot/neziva-api',
}

// 确保远程目录存在
await $`sshpass -p "${SERVER_CONFIG.password}" ssh ${SERVER_CONFIG.username}@${SERVER_CONFIG.host} "mkdir -p ${SERVER_CONFIG.remotePath}"`

// 上传整个 .malagu 目录
await $`sshpass -p "${SERVER_CONFIG.password}" scp -r .malagu/app.js ${SERVER_CONFIG.username}@${SERVER_CONFIG.host}:${SERVER_CONFIG.remotePath}/`

await $`rm -rf .malagu`

console.log('Deployment completed!')
