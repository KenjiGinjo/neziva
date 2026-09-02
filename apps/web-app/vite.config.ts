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
      dynamicRoutes: [
        '/services',
        '/portfolio',
        '/about',
        '/contact',
        '/blog',
        '/privacy',
        '/landing.html',
        '/zh',
        '/zh/services',
        '/zh/portfolio',
        '/zh/about',
        '/zh/contact',
        '/zh/blog',
        '/zh/privacy',
      ],
      generateRobotsTxt: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        landing: path.resolve(__dirname, 'landing.html'),
      },
    },
  },
})
