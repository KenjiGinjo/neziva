# Neziva

[neziva.com](https://neziva.com) 的源码：公开站点、管理后台、API。

定位：先把范围谈清楚，再把能上线跑的 AI 系统交到客户现有环境里。客户直接对开发，不转包。

Studio site, admin, and API for shipping AI systems that run in the client's existing environment.

## 仓库结构

pnpm + Turbo 单体仓。

```
apps/
  web-app/               公开站点（Vite + React，端口 20003）
  admin/                 管理后台（Vite + React，端口 20004）
  api/                   HTTP API（Bun + Hono，默认 10001）
  db/                    Prisma schema、seed、备份恢复
  china-mainland-page/   大陆落地页（eain.cn）
packages/
  @contracts             ts-rest 契约（前后端共用）
  @validations           Zod 校验
  @enums @interfaces @constants @tools
  @svg                   图标
  request                前端请求层
  ts-rest-react-query
  honojs                 从路由生成契约
bruno/                   API 请求集
```

站点：首页、服务、作品、关于、招聘、付款说明、联系、博客、隐私政策。中英切换。

数据：管理员、联系表单、博客、作品集、Newsletter、错误日志。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 运行时 / 包管理 | Node ≥ 18、pnpm 9、Bun（API / 脚本） |
| 前端 | React 19、Vite 7、Wouter、Tailwind 4、Radix |
| API | Hono、Zod、Stripe / PayPal、Resend、Google / GitHub OAuth |
| 数据 | PostgreSQL、Prisma 5 |
| 契约 | ts-rest + workspace `@neziva/contracts` |

## 本地开发

需要：Node 18+、[pnpm 9](https://pnpm.io)、[Bun](https://bun.sh)、本机 PostgreSQL。

```bash
pnpm install
```

环境文件（按 example 复制，**不要提交真实密钥**）：

- `apps/api/.env.example` → `apps/api/.env`
- `apps/db/.env.example` → `apps/db/.env`
- `apps/web-app/.env.example` → `apps/web-app/.env`
- `apps/admin/.env.example` → `apps/admin/.env`

库名默认 `neziva`。初始化：

```bash
cd apps/db
pnpm db:generate
pnpm db:push
pnpm db:seed
```

seed 会创建一个本地管理员：`admin` / `123456`。只用于开发，不要用到生产。

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

`apps/api/.env` 里的 `URI_CLIENT` / `URI_ADMIN` 默认端口（10003 / 10002）和 Vite 实际端口不一致，本地联调时改成 `20003` / `20004`。

## 常用命令

根目录：`pnpm build` / `pnpm lint` / `pnpm lint:fix` / `pnpm check-types` / `pnpm format`

`apps/db`：`db:client`（Prisma Studio）、`db:backup` / `db:restore`、`db:test`

`apps/api`：`gen:contract`（根据路由生成契约）、`cron`

接口调试用仓库根目录 `bruno/`。

## 相关链接

- 站点：https://neziva.com
- 联系：kenjiginjo@gmail.com
