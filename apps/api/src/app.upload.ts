import type { Hono } from 'hono'
import { readFile } from 'node:fs/promises'
import { serveStatic } from 'hono/serve-static'

const mimeTypes: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
}

function createImageStaticHandler() {
  return serveStatic({
    root: './uploads',
    getContent: async (path, _c) => {
      try {
        const file = await readFile(path)
        const ext = path.split('.').pop()?.toLowerCase()

        const contentType = mimeTypes[ext || ''] || 'application/octet-stream'
        return new Response(file, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000', // 缓存1年
          },
        })
      }
      catch {
        return new Response('File not found', { status: 404 })
      }
    },
  })
}

export function setupUploadRoutes(app: Hono) {
  app.use('/user-avatar/*', createImageStaticHandler())
}
