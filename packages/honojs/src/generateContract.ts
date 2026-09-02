import type { Extras, Imports, RoutesTree } from './parseHono'

function indent(level: number) {
  return '  '.repeat(level)
}

function generateRouteString(routerTree: RoutesTree, level = 1) {
  let result = ''
  const pad = indent(level)
  const inner = indent(level + 1)

  for (const [key, value] of Object.entries(routerTree)) {
    if (typeof value !== 'object' || Array.isArray(value) || value === null) {
      continue
    }

    const childHasDollarKey = Object.keys(value).some(childKey =>
      childKey.startsWith('$'),
    )

    if (key.startsWith('$')) {
      const { method, query, body, response, fullPath } = value as Extras
      result += `${pad}"${key}": {\n`
      result += `${inner}method: '${method.toUpperCase()}',\n`
      result += `${inner}path: '${fullPath}',\n`
      result += `${inner}query: c.type<${query}>(),\n`
      if (method !== 'get') {
        result += `${inner}body: c.type<${body}>(),\n`
      }
      result += `${inner}responses: { 200: c.type<${response}>() },\n`
      result += `${pad}},\n`
      continue
    }

    if (childHasDollarKey) {
      result += `${pad}"${key}": c.router({\n`
      result += generateRouteString(value as RoutesTree, level + 1)
      result += `${pad}}),\n`
    }
    else {
      result += `${pad}"${key}": {\n`
      result += generateRouteString(value as RoutesTree, level + 1)
      result += `${pad}},\n`
    }
  }

  return result
}

function namedImportBlock(names: string[], from: string) {
  const sorted = [...names].sort((a, b) => a.localeCompare(b))
  return `import {\n${sorted.map(name => `  ${name},`).join('\n')}\n} from '${from}'\n`
}

export async function generateContract({
  imports,
  routerTree,
  statics = [
    'import { initContract } from \'@packages/ts-rest-react-query/ts-rest-core\'',
    'const c = initContract()',
  ],
  output,
}: {
  imports: Imports
  routerTree: any
  statics?: string[]
  output: string | URL
}) {
  let importStr = ''
  Object.entries(imports).forEach(([key, value]) => {
    importStr += namedImportBlock(Array.from(value), key)
  })

  const staticStr = statics.join('\n')
  const routesString = generateRouteString(routerTree)
  await Bun.write(
    output,
    `${importStr}${staticStr}\nexport const contract = {\n${routesString}}\n`,
  )
}
