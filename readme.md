# Neziva

重庆小工作室官网与配套后台。定位：先把范围谈清楚，再把能上线跑的 AI 系统交到客户现有环境里；客户直接对开发，不外包。

本仓库是 **pnpm + Turbo** 单体仓：公开站点、管理后台、Hono API、PostgreSQL。

## 仓库结构

```
apps/
  web-app/   公开站点（Vite + React，端口 20003）
  admin/     管理后台（Vite + React，端口 20004）
  api/       HTTP API（Bun + Hono，默认 10001）
  db/        Prisma schema、seed、备份恢复
packages/
  @contracts     ts-rest 契约（前后端共用）
  @validations   Zod 校验
  @enums @interfaces @constants @tools
  @svg           图标
  request        前端请求层
  ts-rest-react-query
  honojs         从路由生成契约等脚手架
bruno/           API 请求集
```

站点页面：首页、服务、作品、关于、招聘、付款说明、联系、博客、隐私政策。中英切换。

业务数据（Prisma / PostgreSQL）：管理员、联系表单、博客、作品集、Newsletter、错误日志。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 运行时 / 包管理 | Node ≥ 18、pnpm 9、Bun（API / 脚本） |
| 前端 | React 19、Vite 7、Wouter、Tailwind 4、Radix |
| API | Hono、Zod、Stripe / PayPal、Resend、Google / GitHub OAuth |
| 数据 | PostgreSQL、Prisma 5 |
| 契约 | ts-rest + workspace `@neziva/contracts` |

## 本地开发

前置：Node 18+、pnpm 9、Bun、本机 PostgreSQL。

```bash
pnpm install
```

环境文件（按 example 复制，勿提交真实密钥）：

- `apps/api/.env.example` → `apps/api/.env`
- `apps/db/.env.example` → `apps/db/.env`
- `apps/web-app/.env.example` → `apps/web-app/.env`

库名默认 `neziva`。初始化：

```bash
cd apps/db
pnpm db:generate
pnpm db:push
pnpm db:seed
```

起全部：

```bash
pnpm dev
```

或单独：

```bash
pnpm --filter web-app dev    # http://localhost:20003
pnpm --filter admin dev      # http://localhost:20004
pnpm --filter api dev        # http://localhost:10001
```

`apps/api/.env.example` 里的 `URI_CLIENT` / `URI_ADMIN` 端口（10003 / 10002）与 Vite 实际端口可能不一致，本地联调时改成与前端一致。

## 常用命令

根目录：`pnpm build` / `pnpm lint` / `pnpm lint:fix` / `pnpm check-types` / `pnpm format`

`apps/db`：`db:client`（Prisma Studio）、`db:backup` / `db:restore`、`db:test`

`apps/api`：`gen:contract`（根据路由生成契约）、`cron`

接口调试用仓库根目录 `bruno/`。
