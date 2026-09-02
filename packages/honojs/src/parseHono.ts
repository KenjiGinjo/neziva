import type {
  ArrowFunction,
  CallExpression,
  ImportDeclaration,
  ImportSpecifier,
  Node,
  ts,
  VariableDeclaration,
} from 'ts-morph'
import merge from 'lodash.merge'
import { Project, SyntaxKind } from 'ts-morph'

export interface Imports {
  [key: string]: Set<string>
}

export interface Extras {
  basePath: string
  dirPath: string
  path: string
  fullPath: string
  method: string
  query: string | undefined
  body: string | undefined
  response: string | undefined
}

export interface RoutesTree {
  [x: string]: Extras | RoutesTree
}

const HTTP_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete', 'options'])

function isPackageSpecifier(moduleSpecifier: string) {
  return moduleSpecifier.length > 0
    && !moduleSpecifier.startsWith('.')
    && !moduleSpecifier.startsWith('/')
}

function isHttpRoute(extras: Extras) {
  return HTTP_METHODS.has(extras.method) && extras.path.startsWith('/')
}

// 获取读取文件的上级目录名称, 若传入ignore参数, 则忽略该目录，返回空字符串
function getDirPath(filepath: string, ignore?: string): string {
  const pathArr = filepath.split('/')
  if (ignore && pathArr[pathArr.length - 2] === ignore) {
    return ''
  }
  return pathArr[pathArr.length - 2] as string
}

function getBasePath(sourceCode: string) {
  const basePath = sourceCode.match(/basePath\('(.*)'\)/)
  if (!basePath) {
    return ''
  }
  return basePath[1]
}

function generateRoutes(routes: Extras[], basePath: string) {
  const routesTree: RoutesTree = {}
  const BasePath = basePath?.replace(/^\/|\/$/g, '')
  // 遍历routes树组，
  routes.forEach((route) => {
    const DirPath = route.dirPath.replace(/^\/|\/$/g, '')
    const Path = route.path.replace(/^\/|\/$/g, '')

    const fullPath = `${DirPath}/${BasePath}/${Path}`.replace(/^\/|\/$/g, '')

    route.fullPath = fullPath

    let currentLevel = routesTree

    const pathParts = route.fullPath.split('/')

    for (const part of pathParts) {
      if (!currentLevel[part]) {
        currentLevel[part] = {}
      }
      currentLevel = currentLevel[part] as RoutesTree
    }
    currentLevel[`$${route.method}`] = route
  })

  return routesTree
}

function getImports(
  importDeclarations: ImportDeclaration[],
  imports: Imports,
): Imports {
  importDeclarations.forEach((importDeclaration: ImportDeclaration) => {
    // 获取模块说明符
    const moduleSpecifier: string = importDeclaration
      .getModuleSpecifier()
      .getText()
      .replace(/['"]/g, '')
    if (!isPackageSpecifier(moduleSpecifier)) {
      return
    }
    const namedImports: ImportSpecifier[] = importDeclaration.getNamedImports()
    namedImports.forEach((namedImport: ImportSpecifier) => {
      const name: string = namedImport.getName()
      if (!imports[moduleSpecifier]) {
        imports[moduleSpecifier] = new Set()
      }
      imports[moduleSpecifier].add(name)
    })
  })

  return imports
}

function collectExtras(tree: RoutesTree): Extras[] {
  const extras: Extras[] = []
  for (const value of Object.values(tree)) {
    if (!value || typeof value !== 'object') {
      continue
    }
    if ('method' in value && 'fullPath' in value) {
      extras.push(value as Extras)
      continue
    }
    extras.push(...collectExtras(value as RoutesTree))
  }
  return extras
}

/** 契约只引用 query / body / response 类型字符串里出现过的名字 */
function pruneUnusedImports(imports: Imports, routerTree: RoutesTree): Imports {
  const used = new Set<string>()
  for (const extra of collectExtras(routerTree)) {
    for (const text of [extra.query, extra.body, extra.response]) {
      if (!text) {
        continue
      }
      for (const match of text.matchAll(/\b[A-Za-z_][A-Za-z0-9_]*\b/g)) {
        used.add(match[0])
      }
    }
  }

  const pruned: Imports = {}
  for (const [mod, names] of Object.entries(imports)) {
    const keep = [...names].filter(name => used.has(name))
    if (keep.length > 0) {
      pruned[mod] = new Set(keep)
    }
  }
  return pruned
}

export function parseHono({ sources }: { sources: string[] }) {
  const project = new Project()
  project.addSourceFilesAtPaths(sources)
  let routerTree = {}
  let imports: Imports = {}

  // 遍历所有的sourceFile
  project.getSourceFiles().forEach((sourceFile) => {
    // 获取imports
    imports = getImports(sourceFile.getImportDeclarations(), imports)

    const routes: Extras[] = []
    // 获取文件路径
    const dirPath = getDirPath(sourceFile.getFilePath(), 'http')
    const basePath = getBasePath(sourceFile.getFullText()) as string

    sourceFile
      .getVariableDeclarations()
      .forEach((variableDeclaration: VariableDeclaration) => {
        // 路由配置
        // 获取所有的CallExpression
        const callExpressions: CallExpression[]
          = variableDeclaration.getDescendantsOfKind(SyntaxKind.CallExpression)
        // 获取当前文件的export名称
        for (const callExpression of callExpressions) {
          const extras: Extras = {
            fullPath: '',
            dirPath,
            basePath: '',
            path: '',
            method: '',
            query: undefined,
            body: undefined,
            response: undefined,
          }

          const propertyAccessExpression = callExpression.getFirstChildByKind(
            SyntaxKind.PropertyAccessExpression,
          )
          const propertyAccessExpressionName
            = propertyAccessExpression?.getName()

          if (propertyAccessExpressionName === 'basePath') {
            continue
          }

          extras.method = propertyAccessExpressionName || ''

          const args: Node<ts.Node>[] = callExpression.getArguments()
          // 遍历args 获取 param query json
          args.forEach((arg) => {
            if (
              arg.getKind() === SyntaxKind.CallExpression
              && arg.getFullText().includes('validate')
            ) {
              const childArgs = (arg as CallExpression).getArguments()
              childArgs.forEach((childArg) => {
                if (childArg.getKind() === SyntaxKind.StringLiteral) {
                  if (childArg.getText() === `'param'`) {
                    // console.log('param')
                  }
                  if (childArg.getText() === `'query'`) {
                    const queryText = childArgs[1]?.getText() as string
                    const match = /vIds\('(.*)'\)/.exec(queryText)
                    if (match) {
                      const paramsText = match[1]
                      extras.query = `{${paramsText}:string}`
                    }
                    else {
                      extras.query = queryText
                    }
                  }
                  if (childArg.getText() === `'json'`) {
                    const bodyText = childArgs[1]?.getText() as string
                    // 如果是 vIds(xxx) 则转换为 {xxx:string}
                    const vIdsMatch = /vIds\('(.*)'\)/.exec(bodyText)
                    // 如果是 xxx.partial() 则转换为 Partial: <xxx>
                    const partialMatch = /(.*)\.partial\(\)/.exec(bodyText)
                    if (vIdsMatch) {
                      const paramsText = vIdsMatch[1]
                      extras.body = `{${paramsText}:string}`
                    }
                    else if (partialMatch) {
                      const paramsText = partialMatch[1]
                      extras.body = `Partial<${paramsText}>`
                    }
                    else {
                      extras.body = bodyText
                    }
                  }
                }
              })
            }

            // 处理response 返回类型 判断是否是箭头函数，且是最后一个箭头函数  TODO last 方法未知
            if (arg.getKind() === SyntaxKind.ArrowFunction) {
              const returnType = (arg as ArrowFunction)
                .getReturnTypeNode()
                ?.getFullText()
                .replace(/\s/g, '')
              if (returnType) {
                extras.response = returnType.match(/\{.*\}/gs)?.toString()
              }
              else {
                extras.response = undefined
              }
            }

            // 处理path
            if (arg.getKind() === SyntaxKind.StringLiteral) {
              extras.path = arg.getText().replace(/'/g, '')
            }
          })
          if (!isHttpRoute(extras)) {
            continue
          }
          routes.push(extras)
        }
      })

    const newRouterTree = generateRoutes(routes, basePath)
    routerTree = merge(routerTree, newRouterTree)
  })

  return { routerTree, imports: pruneUnusedImports(imports, routerTree) }
}
