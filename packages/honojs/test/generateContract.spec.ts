import { join } from 'node:path'
import { $ } from 'bun'
import { describe, expect, test } from 'bun:test'
import { generateContract } from '../src/generateContract'
import { parseHono } from '../src/parseHono'

const contractPath = join(__dirname, './templates/http/contract.ts')

const BASE = `import { initContract } from '@packages/ts-rest-react-query/ts-rest-core';const c = initContract();export const contract = `
const CITY = `"city":{"c":c.router({"$get":{method:'GET',path:'city/c',query:c.type<undefined>(),responses:{200: c.type<{other:City[]}>()}},}),"b":c.router({"$get":{method:'GET',path:'city/b',query:c.type<undefined>(),responses:{200: c.type<{meta:City[]}>()}},}),"a":c.router({"$get":{method:'GET',path:'city/a',query:c.type<undefined>(),responses:{200: c.type<{data:City[]}>()}},}),},`

describe('generate-contract', () => {
  test('single file', async () => {
    const { imports, routerTree } = parseHono({
      sources: [join(__dirname, './templates/http/city.template')],
    })

    generateContract({
      imports,
      routerTree,
      output: contractPath,
    })

    const text = await Bun.file(contractPath).text()

    expect(text).toEqual(
      `import { City } from '@acme/interface';${BASE}{${CITY}};`,
    )

    await $`rm ${contractPath}`.text()
  })

  test('multiple files', async () => {
    const { imports, routerTree } = parseHono({
      sources: [
        join(__dirname, './templates/http/city.template'),
        join(__dirname, './templates/http/activity.template'),
        `!${join(__dirname, './templates/http/index.template')}`,
      ],
    })

    generateContract({
      imports,
      routerTree,
      output: contractPath,
    })

    const text = await Bun.file(contractPath).text()

    const ACTIVITY = `"activity":{"e":{":eId":c.router({"$delete":{method:'DELETE',path:'activity/e/:eId',query:c.type<undefined>(),body:c.type<undefined>(),responses:{200: c.type<undefined>()}},}),},"d":c.router({"$post":{method:'POST',path:'activity/d',query:c.type<undefined>(),body:c.type<ValidD>(),responses:{200: c.type<undefined>()}},}),"c":c.router({"$put":{method:'PUT',path:'activity/c',query:c.type<undefined>(),body:c.type<undefined>(),responses:{200: c.type<undefined>()}},}),"b":{":bId":c.router({"$patch":{method:'PATCH',path:'activity/b/:bId',query:c.type<undefined>(),body:c.type<ValidA>(),responses:{200: c.type<undefined>()}},}),},"a":c.router({"$get":{method:'GET',path:'activity/a',query:c.type<{aId:string}>(),responses:{200: c.type<{d:ActivityA[]}>()}},}),}`

    expect(text).toEqual(
      `import { ActivityA, City } from '@acme/interface';import { ValidA, ValidD, vIds } from '@acme/validation';${BASE}{${ACTIVITY},${CITY}};`,
    )
    await $`rm ${contractPath}`.text()
  })
})
