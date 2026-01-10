import { spawn } from 'node:child_process'
import { dotenvLoad } from '@haole/tools/extend'
import { $ } from 'bun'
import chokidar from 'chokidar'

async function restart() {
  const PORT = Bun.env.PORT
  if ((await $`bunx port-client ${PORT} `.text()).includes('is active')) {
    await $`bunx port-client ${PORT} --kill`
  }

  const child = spawn('bun', ['run', '--hot', './src/app-http.ts'])
  child.on('exit', () => child.kill())
  child.stdout.on('data', (data: Buffer) => console.log(data.toString()))
  child.stderr.on('data', (data: Buffer) => console.error(data.toString()))
}

chokidar
  .watch('.env')
  .on('ready', async () => {
    await restart()
  })
  .on('change', async () => {
    dotenvLoad('.env')
    await restart()
  })
