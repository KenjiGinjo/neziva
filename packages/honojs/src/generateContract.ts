import type { Extras, Imports, RoutesTree } from './parseHono'
import { writeFileSync } from 'node:fs'

function generateRouteString(routerTree: RoutesTree) {
  let result = ''
  for (const [key, value] of Object.entries(routerTree)) {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      const childHasDollarKey = Object.keys(value).some(childKey =>
        childKey.startsWith('$'),
      )
      if (key.startsWith('$')) {
        const { method, query, body, response, fullPath } = value as Extras
        if (method === 'get') {
          result += `"${key}":{method:'${method.toUpperCase()}',path:'${fullPath}',query:c.type<${query}>(),responses:{200: c.type<${response}>()}},`
        }
        else {
          result += `"${key}":{method:'${method.toUpperCase()}',path:'${fullPath}',query:c.type<${query}>(),body:c.type<${body}>(),responses:{200: c.type<${response}>()}},`
        }
      }
      else {
        if (childHasDollarKey) {
          result += `"${key}":c.router({${generateRouteString(value as RoutesTree)}}),`
        }
        else {
          result += `"${key}":{${generateRouteString(value as RoutesTree)}},`
        }
      }
    }
  }

  return result
}

// 生成 contract
export function generateContract({
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
  output: string
}) {
  let importStr = ''
  let staticStr = ''

  // 解析完所有文件后，将imports对象转换为字符串加入文件头部
  Object.entries(imports).forEach(([key, value]) => {
    importStr += `import { ${Array.from(value).join(', ')} } from '${key}';`
  })

  // 静态默认添加的字符串，依据statics数组顺序添加
  staticStr = statics.join(';')

  // 生成路由字符串
  const routesString = generateRouteString(routerTree)
  writeFileSync(
    output,
    `${importStr}${staticStr};export const contract = {${routesString}};`,
  )
}
