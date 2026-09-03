import { $ } from 'bun'

const host = process.env.SERVER_IP
const username = process.env.SERVER_USERNAME
const password = process.env.SERVER_PASSWORD
const port = process.env.SERVER_PORT
const remotePath = process.env.REMOTE_PATH

await $`sshpass -p ${password} ssh -p ${port} ${username}@${host} mkdir -p ${remotePath}`
await $`sshpass -p ${password} scp -P ${port} ./landing.html ${username}@${host}:${remotePath}/index.html`

console.log('Deployment completed!')
