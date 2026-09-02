import { generateContract, parseHono } from '@packages/honojs'

const httpDir = new URL('../src/http/', import.meta.url)

const { imports, routerTree } = parseHono({
  sources: [
    `${httpDir.pathname}**/*.ts`,
    `!${httpDir.pathname}**/index.ts`,
  ],
})

await generateContract({
  imports,
  routerTree,
  output: new URL('../../../packages/@contracts/src/contract.ts', import.meta.url),
})
