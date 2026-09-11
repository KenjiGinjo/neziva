# Neziva

Source for [neziva.com](https://neziva.com): public site, admin, and API.

Scope first, then ship AI systems that run in the client’s existing environment. Clients work with the developer directly — no subcontracting.

## Layout

pnpm + Turbo monorepo.

```
apps/
  web-app/               public site (Vite + React, port 20003)
  admin/                 admin app (Vite + React, port 20004)
  api/                   HTTP API (Bun + Hono, default 20001)
  db/                    Prisma schema, seed, backup/restore
  china-mainland-page/   China landing page (eain.cn)
packages/
  @contracts             ts-rest contracts (shared)
  @validations           Zod schemas
  @enums @interfaces @constants @tools
  @svg                   icons
  request                frontend request layer
  ts-rest-react-query
  honojs                 generate contracts from routes
bruno/                   API request collection
```

Site: home, services, work, about, careers, payment, contact, blog, privacy. EN/ZH.

Data: admins, contact form, blog, portfolio, newsletter, error logs.

## Stack

| Layer | Choice |
| --- | --- |
| Runtime / packages | Node ≥ 18, pnpm 9, Bun (API / scripts) |
| Frontend | React 19, Vite 7, Wouter, Tailwind 4, Radix |
| API | Hono, Zod, Stripe / PayPal, Resend, Google / GitHub OAuth |
| Data | PostgreSQL, Prisma 5 |
| Contracts | ts-rest + workspace `@neziva/contracts` |

## Local setup

Needs Node 18+, [pnpm 9](https://pnpm.io), [Bun](https://bun.sh), and local PostgreSQL.

```bash
pnpm install
```

Env files (copy from examples; **do not commit real secrets**):

- `apps/api/.env.example` → `apps/api/.env`
- `apps/db/.env.example` → `apps/db/.env`
- `apps/web-app/.env.example` → `apps/web-app/.env`
- `apps/admin/.env.example` → `apps/admin/.env`

Default database name: `neziva`. Init:

```bash
cd apps/db
pnpm db:generate
pnpm db:push
pnpm db:seed
```

Seed creates a local admin: `admin` / `123456`. Dev only — never use in production.

Start everything:

```bash
pnpm dev
```

Or one app:

```bash
pnpm --filter web-app dev    # http://localhost:20003
pnpm --filter admin dev      # http://localhost:20004
pnpm --filter api dev        # http://localhost:20001
```

## Commands

Root: `pnpm build` / `pnpm lint` / `pnpm lint:fix` / `pnpm check-types` / `pnpm format`

`apps/db`: `db:client` (Prisma Studio), `db:backup` / `db:restore`, `db:test`

`apps/api`: `gen:contract` (generate contracts from routes), `cron`

API debugging: `bruno/` at the repo root.

## Links

- Site: https://neziva.com
- Contact: kenjiginjo@gmail.com

## License

[MIT](./LICENSE)
