import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://neziva.com',
      // EN paths only; i18n.prefix emits /zh… + xhtml:link hreflang (en / zh / x-default)
      dynamicRoutes: [
        '/services',
        '/portfolio',
        '/about',
        '/careers',
        '/payment',
        '/contact',
        '/blog',
        '/privacy',
      ],
      i18n: {
        defaultLanguage: 'en',
        languages: ['en', 'zh'],
        strategy: 'prefix',
      },
      generateRobotsTxt: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
