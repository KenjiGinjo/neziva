import { join } from 'node:path'
import { generateContract, parseHono } from '@packages/honojs'
import { $ } from 'bun'

const contractPath = join(
  __dirname,
  '../../../packages/@contracts/src/contract.ts',
)

const { imports, routerTree } = parseHono({
  sources: [
    join(__dirname, '../src/http/**/*.ts'),
    `!${join(__dirname, '../src/http/**/index.ts')}`,
    `!${join(__dirname, '../src/http/_base/*.ts')}`,
  ],
})

generateContract({
  imports,
  routerTree,
  output: contractPath,
})

await $`bunx prettier ${contractPath} --write`
await $`bunx eslint ${contractPath} --fix`
