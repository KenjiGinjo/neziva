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
      .replace(/'/g, '')
    // 将获取到的import存入imports对象，保存格式 {"@xxx": {a,b}, "@xxx": {c,d}}  ，并且去重，去除重复的import，如果不是@开头的import则不处理
    const namedImports: ImportSpecifier[] = importDeclaration.getNamedImports()
    // 遍历namedImports
    namedImports.forEach((namedImport: ImportSpecifier) => {
      // 获取import的名称
      const name: string = namedImport.getName()
      // 判断是否是@haole开头的import
      if (moduleSpecifier.startsWith('@haole')) {
        // 如果imports[moduleSpecifier]不存在则创建一个新的set
        if (!imports[moduleSpecifier]) {
          imports[moduleSpecifier] = new Set()
        }
        // 如果存在则添加到set中
        imports[moduleSpecifier].add(name)
      }
    })
  })

  return imports
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
            // basePath = callExpression.getArguments()[0].getText().replace(/'/g, '');
            break
          }

          // 获取method方法
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
          routes.push(extras)
        }
      })

    const newRouterTree = generateRoutes(routes, basePath)
    routerTree = merge(routerTree, newRouterTree)
  })

  return { routerTree, imports }
}
