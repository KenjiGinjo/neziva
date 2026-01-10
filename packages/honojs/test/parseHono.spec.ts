import { join } from 'node:path'
import { describe, expect, test } from 'bun:test'
import { parseHono } from '../src/parseHono'

const city_a = `"a":{"$get":{"fullPath":"city/a","dirPath":"","basePath":"","path":"/a","method":"get","response":"{data:City[]}"}}`
const city_b = `"b":{"$get":{"fullPath":"city/b","dirPath":"","basePath":"","path":"/b","method":"get","response":"{meta:City[]}"}}`
const city_c = `"c":{"$get":{"fullPath":"city/c","dirPath":"","basePath":"","path":"/c","method":"get","response":"{other:City[]}"}}`

const CITY_ROUTER = `"city":{${city_c},${city_b},${city_a}}`

describe('parse-hono', () => {
  test('single file', async () => {
    const { imports, routerTree } = parseHono({
      sources: [join(__dirname, './templates/http/city.template')],
    })

    expect(Array.from(imports['@acme/interface'])).toEqual(['City'])

    expect(imports['@skip']).toBeUndefined()

    expect(JSON.stringify(routerTree)).toEqual(`{${CITY_ROUTER}}`)
  })

  test('multiple files', async () => {
    const { imports, routerTree } = parseHono({
      sources: [
        join(__dirname, './templates/http/activity.template'),
        join(__dirname, './templates/http/city.template'),
        `!${join(__dirname, './templates/http/index.template')}`,
      ],
    })

    expect(Array.from(imports['@acme/interface'])).toEqual([
      'ActivityA',
      'City',
    ])
    expect(Array.from(imports['@acme/validation'])).toEqual([
      'ValidA',
      'ValidD',
      'vIds',
    ])

    expect(imports['@skip']).toBeUndefined()

    const activity_a = `"a":{"$get":{"fullPath":"activity/a","dirPath":"","basePath":"","path":"/a","method":"get","query":"{aId:string}","response":"{d:ActivityA[]}"}}`
    const activity_b = `"b":{":bId":{"$patch":{"fullPath":"activity/b/:bId","dirPath":"","basePath":"","path":"/b/:bId","method":"patch","body":"ValidA"}}}`
    const activity_c = `"c":{"$put":{"fullPath":"activity/c","dirPath":"","basePath":"","path":"/c","method":"put"}}`
    const activity_d = `"d":{"$post":{"fullPath":"activity/d","dirPath":"","basePath":"","path":"/d","method":"post","body":"ValidD"}}`
    const activity_e = `"e":{":eId":{"$delete":{"fullPath":"activity/e/:eId","dirPath":"","basePath":"","path":"/e/:eId","method":"delete"}}}`

    const ACTIVITY_ROUTER = `"activity":{${activity_e},${activity_d},${activity_c},${activity_b},${activity_a}}`
    expect(JSON.stringify(routerTree)).toEqual(
      `{${ACTIVITY_ROUTER},${CITY_ROUTER}}`,
    )
  })
})
