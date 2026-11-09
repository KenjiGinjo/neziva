/**
 * Post-build SSG: serve dist, Playwright each route, write dist/.../index.html.
 * nginx try_files $uri $uri/ /index.html will prefer these files over SPA fallback.
 */
import { createServer } from 'node:http'
import { existsSync, createReadStream, statSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '../dist')
/** Must match DocumentMeta / index.html / vite sitemap hostname. */
const SITE = 'https://www.neziva.com'
const HOST = '127.0.0.1'
const PORT = 4179

/** Keep in sync with vite-plugin-sitemap dynamicRoutes (+ zh via prefix). */
const EN_ROUTES = [
  '/',
  '/services',
  '/about',
  '/careers',
  '/payment',
  '/contact',
  '/blog',
  '/privacy',
]

const ROUTES = [
  ...EN_ROUTES,
  ...EN_ROUTES.map(r => (r === '/' ? '/zh' : `/zh${r}`)),
]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function expectedCanonical(route) {
  return route === '/' ? `${SITE}/` : `${SITE}${route}`
}

function outFileForRoute(route) {
  if (route === '/')
    return path.join(DIST, 'index.html')
  return path.join(DIST, route.slice(1), 'index.html')
}

function resolveDistFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0])
  const normalized = clean.length > 1 && clean.endsWith('/') ? clean.slice(0, -1) : clean

  if (normalized === '/')
    return path.join(DIST, 'index.html')

  const asFile = path.join(DIST, normalized)
  if (existsSync(asFile) && statSync(asFile).isFile())
    return asFile

  const asIndex = path.join(DIST, normalized, 'index.html')
  if (existsSync(asIndex))
    return asIndex

  // SPA shell for routes not yet written
  return path.join(DIST, 'index.html')
}

function startStaticServer() {
  const server = createServer((req, res) => {
    try {
      const url = new URL(req.url || '/', `http://${HOST}:${PORT}`)
      const file = resolveDistFile(url.pathname)
      if (!existsSync(file)) {
        res.writeHead(404).end('Not found')
        return
      }
      const type = MIME[path.extname(file)] || 'application/octet-stream'
      res.writeHead(200, { 'Content-Type': type })
      createReadStream(file).pipe(res)
    }
    catch (err) {
      res.writeHead(500).end(String(err))
    }
  })

  return new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(PORT, HOST, () => resolve(server))
  })
}

async function prerenderRoute(browser, route) {
  const context = await browser.newContext({
    locale: 'en-US',
    javaScriptEnabled: true,
  })

  // Avoid Chinese first-visit redirect on `/`; keep locale stable for DocumentMeta.
  await context.addInitScript((r) => {
    const zh = r === '/zh' || r.startsWith('/zh/')
    localStorage.setItem('neziva-locale', zh ? 'zh' : 'en')
  }, route)

  // Skip third-party noise; page heroes are static so API is optional.
  await context.route('**/*', async (routeReq) => {
    const url = routeReq.request().url()
    if (
      url.includes('googletagmanager.com')
      || url.includes('google-analytics.com')
      || url.includes('gtag/js')
    ) {
      await routeReq.abort()
      return
    }
    await routeReq.continue()
  })

  const page = await context.newPage()
  const url = `http://${HOST}:${PORT}${route}`
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 })

  await page.waitForSelector('#root h1', { timeout: 60_000 })

  const canonical = expectedCanonical(route)
  const expectZh = route === '/zh' || route.startsWith('/zh/')

  try {
    await page.waitForFunction(
      ({ canonicalHref, expectZh: zh }) => {
        const h1 = document.querySelector('#root h1')
        const link = document.querySelector('link[rel="canonical"]')
        const lang = document.documentElement.lang
        if (!h1 || !link)
          return false
        if (link.getAttribute('href') !== canonicalHref)
          return false
        if (zh && lang !== 'zh-CN')
          return false
        if (!zh && lang !== 'en')
          return false
        const en = document.querySelector('link[rel="alternate"][hreflang="en"]')
        const zhCn = document.querySelector('link[rel="alternate"][hreflang="zh-CN"]')
        const xDef = document.querySelector('link[rel="alternate"][hreflang="x-default"]')
        return Boolean(en && zhCn && xDef)
      },
      { canonicalHref: canonical, expectZh },
      { timeout: 60_000 },
    )
  }
  catch (err) {
    const snap = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
      hreflang: [...document.querySelectorAll('link[rel="alternate"]')].map(el => el.getAttribute('hreflang')),
      h1: document.querySelector('#root h1')?.textContent?.trim() ?? null,
    })).catch(() => null)
    throw new Error(
      `Prerender timeout on ${route}; expected canonical ${canonical} lang ${expectZh ? 'zh-CN' : 'en'}; got ${JSON.stringify(snap)}`,
      { cause: err },
    )
  }

  const html = await page.content()
  const out = outFileForRoute(route)
  await mkdir(path.dirname(out), { recursive: true })
  await writeFile(out, `${html}\n`, 'utf8')
  await context.close()

  const rel = path.relative(DIST, out)
  console.log(`  ✓ ${route} → ${rel}`)
}

/** Align sitemap hreflang with page DocumentMeta (`zh-CN`, not plugin's `zh`). */
async function alignSitemapHreflang() {
  const sitemapPath = path.join(DIST, 'sitemap.xml')
  if (!existsSync(sitemapPath)) {
    console.warn('  ! sitemap.xml missing, skip hreflang align')
    return
  }
  const before = await readFile(sitemapPath, 'utf8')
  const after = before.replaceAll('hreflang="zh"', 'hreflang="zh-CN"')
  if (after === before) {
    console.warn('  ! no hreflang="zh" found in sitemap.xml')
    return
  }
  await writeFile(sitemapPath, after, 'utf8')
  const n = (after.match(/hreflang="zh-CN"/g) || []).length
  console.log(`  ✓ sitemap hreflang zh → zh-CN (${n})`)
}

async function main() {
  if (!existsSync(path.join(DIST, 'index.html'))) {
    throw new Error(`Missing ${path.join(DIST, 'index.html')}; run vite build first`)
  }

  await alignSitemapHreflang()

  console.log(`Prerender ${ROUTES.length} routes from ${DIST}`)
  const server = await startStaticServer()
  let browser
  try {
    browser = await chromium.launch({ headless: true })
    for (const route of ROUTES)
      await prerenderRoute(browser, route)
    console.log('Prerender done.')
  }
  finally {
    await browser?.close()
    await new Promise(resolve => server.close(resolve))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
