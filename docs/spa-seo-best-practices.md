# SPA SEO 最佳实践指南

## 当前技术栈
- **框架**: Vite + React + Wouter
- **类型**: SPA (Single Page Application)
- **问题**: 搜索引擎爬虫可能无法正确渲染 JavaScript 内容

---

## 方案对比

### 方案 1: 预渲染（Prerendering）⭐ 推荐用于营销页面

**优点**:
- ✅ 实现简单，无需重构
- ✅ 保持 SPA 架构
- ✅ 适合静态/半静态内容（营销页面）
- ✅ 构建时生成静态 HTML，SEO 友好

**缺点**:
- ❌ 不适合完全动态的内容
- ❌ 需要为每个路由生成 HTML

**适用场景**: 首页、服务页、关于页、联系页、案例页

**实现方式**:
```bash
npm install -D vite-plugin-prerender
```

### 方案 2: 服务端渲染（SSR）

**优点**:
- ✅ SEO 效果最好
- ✅ 首屏加载快
- ✅ 完全支持动态内容

**缺点**:
- ❌ 需要重构（迁移到 Next.js/Remix）
- ❌ 增加服务器成本
- ❌ 开发复杂度提高

**适用场景**: 如果 SEO 是最高优先级，且愿意重构

### 方案 3: 混合方案（推荐）⭐

**策略**:
- **营销页面**（首页、服务、关于、联系、案例）→ 预渲染
- **应用页面**（Dashboard、工作流）→ 保持 SPA（不需要 SEO）
- **博客页面** → 如果实现，考虑 SSR 或静态生成

---

## 推荐实施方案：预渲染 + 动态 Meta 标签

### 第一步：安装依赖

```bash
# 预渲染插件
pnpm add -D vite-plugin-prerender

# 动态 Meta 标签管理
pnpm add react-helmet-async

# 生成 sitemap
pnpm add -D vite-plugin-sitemap
```

### 第二步：配置 Vite 预渲染

```typescript
import react from '@vitejs/plugin-react'
// vite.config.ts
import { defineConfig } from 'vite'
import { prerender } from 'vite-plugin-prerender'

export default defineConfig({
  plugins: [
    react(),
    prerender({
      // 需要预渲染的路由
      routes: [
        '/',
        '/services',
        '/portfolio',
        '/about',
        '/contact',
        '/blog',
      ],
      // 渲染配置
      renderer: {
        // 等待内容加载
        renderAfterDocumentEvent: 'render-event',
        // 或者等待特定时间
        // renderAfterTime: 500,
      },
    }),
  ],
})
```

### 第三步：创建 SEO 组件

```typescript
// src/components/seo/SeoHead.tsx
import { Helmet } from 'react-helmet-async'

interface SeoHeadProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: string
  canonical?: string
  noindex?: boolean
}

export function SeoHead({
  title = 'neziva | AI Strategy to Implementation',
  description = 'Transform your business with practical AI solutions. From strategy workshops to full-stack AI system implementation.',
  keywords = 'AI consulting, AI development, full-stack development, AI solutions',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  canonical,
  noindex = false,
}: SeoHeadProps) {
  const fullTitle = title.includes('neziva') ? title : `${title} | neziva`
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '')

  return (
    <Helmet>
      {/* 基础 Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="neziva" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* 结构化数据 (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'neziva',
          url: 'https://neziva.com',
          logo: 'https://neziva.com/logo.png',
          description: 'AI consulting and full-stack development services',
          sameAs: [
            // LinkedIn, Twitter 等社交媒体链接
          ],
        })}
      </script>
    </Helmet>
  )
}
```

### 第四步：在页面中使用

```typescript
// src/pages/home.tsx
import { SeoHead } from '@/components/seo/SeoHead'

export function PageHome() {
  return (
    <>
      <SeoHead
        title="neziva | AI Strategy to Implementation - End-to-End Solutions"
        description="Transform your business with practical AI solutions. From strategy workshops to full-stack AI system implementation."
        keywords="AI consulting, AI development, full-stack development"
      />
      {/* 页面内容 */}
    </>
  )
}
```

### 第五步：触发预渲染事件

```typescript
// src/main.tsx
// 在应用加载完成后触发
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      {/* ... */}
    </HelmetProvider>
  </StrictMode>,
)

// 在应用渲染完成后
window.dispatchEvent(new Event('render-event'))
```

### 第六步：生成 Sitemap

```typescript
// vite.config.ts
import { sitemap } from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    // ... 其他插件
    sitemap({
      hostname: 'https://neziva.com',
      routes: [
        '/',
        '/services',
        '/portfolio',
        '/about',
        '/contact',
        '/blog',
      ],
    }),
  ],
})
```

### 第七步：创建 robots.txt

```txt
# public/robots.txt
User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /settings
Disallow: /workflow
Disallow: /auth

Sitemap: https://neziva.com/sitemap.xml
```

---

## 完整实现步骤

### 1. 安装所有依赖

```bash
pnpm add react-helmet-async
pnpm add -D vite-plugin-prerender vite-plugin-sitemap
```

### 2. 更新 vite.config.ts

```typescript
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { prerender } from 'vite-plugin-prerender'
import { sitemap } from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // 预渲染营销页面
    prerender({
      routes: ['/', '/services', '/portfolio', '/about', '/contact', '/blog'],
      renderer: {
        renderAfterDocumentEvent: 'render-event',
      },
    }),
    // 生成 sitemap
    sitemap({
      hostname: 'https://neziva.com',
      routes: [
        '/',
        '/services',
        '/portfolio',
        '/about',
        '/contact',
        '/blog',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 3. 创建 SEO 组件库

```typescript
export { JsonLd } from './JsonLd'
// src/components/seo/index.ts
export { SeoHead } from './SeoHead'
```

### 4. 更新 main.tsx

```typescript
import { HelmetProvider } from 'react-helmet-async'

// ... 其他导入

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        {/* ... 其他 Provider */}
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)

// 应用加载完成后触发预渲染
setTimeout(() => {
  window.dispatchEvent(new Event('render-event'))
}, 100)
```

### 5. 为每个营销页面添加 SEO

```typescript
// src/pages/services.tsx
import { SeoHead } from '@/components/seo/SeoHead'

export function PageServices() {
  return (
    <>
      <SeoHead
        title="AI Consulting Services | Strategy, POC Development & Implementation"
        description="Professional AI consulting services including strategy workshops, proof of concept development, and end-to-end AI system implementation."
        keywords="AI consulting, AI strategy, POC development, AI implementation"
      />
      {/* 页面内容 */}
    </>
  )
}
```

---

## 其他 SEO 最佳实践

### 1. 结构化数据（JSON-LD）

为不同页面添加相应的结构化数据：

```typescript
// src/components/seo/JsonLd.tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// 使用示例 - 服务页面
<JsonLd
  data={{
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'AI Consulting',
    provider: {
      '@type': 'Organization',
      name: 'neziva',
    },
  }}
/>
```

### 2. 图片优化

```typescript
// 使用 WebP 格式
// 添加 alt 属性
<img src="/hero.webp" alt="AI Solutions for Business" loading="lazy" />
```

### 3. 性能优化

- 代码分割（Vite 自动处理）
- 图片懒加载
- 关键 CSS 内联
- 压缩资源

### 4. 移动端优化

- 响应式设计（已有）
- 触摸友好的按钮大小（最小 44x44px）
- 移动端性能优化

### 5. 链接优化

```typescript
// 使用语义化链接
<a href="/services" aria-label="View our services">Services</a>

// 避免使用 JavaScript 导航（对于 SEO 重要页面）
// Wouter 的 Link 组件会处理，但确保有 href 属性
```

---

## 验证 SEO

### 1. Google Search Console
- 提交 sitemap
- 检查索引状态
- 监控搜索表现

### 2. 测试工具
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### 3. 检查预渲染效果

```bash
# 构建后检查 dist 目录
npm run build
# 查看 dist/index.html 是否包含完整内容
```

---

## 注意事项

1. **预渲染限制**:
   - 只预渲染静态/半静态页面
   - 动态内容（如用户数据）不会在预渲染时出现

2. **Meta 标签更新**:
   - 使用 `react-helmet-async` 确保每个页面有正确的 meta 标签
   - 预渲染会捕获这些标签

3. **路由处理**:
   - 确保所有 SEO 重要页面都有对应的路由
   - 404 页面也要有 SEO 设置

4. **内容可见性**:
   - 确保关键内容在初始 HTML 中可见
   - 避免完全依赖 JavaScript 渲染关键内容

---

## 总结

**推荐方案**: 预渲染 + 动态 Meta 标签

**实施优先级**:
1. ✅ 安装 react-helmet-async，为所有页面添加 SEO 组件
2. ✅ 配置预渲染（营销页面）
3. ✅ 生成 sitemap 和 robots.txt
4. ✅ 添加结构化数据
5. ✅ 优化图片和性能
6. ✅ 提交到 Google Search Console

**预期效果**:
- ✅ 搜索引擎可以正确索引所有营销页面
- ✅ 每个页面有独立的 meta 标签
- ✅ 支持 Open Graph 和 Twitter Card
- ✅ 结构化数据提升搜索展示效果
