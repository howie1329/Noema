# Agent server

Hono app on Node. Will own AI / model and external API calls (per product brief). Scaffold only for now.

## Run

From the monorepo root:

```bash
pnpm --filter server dev
```

Or from this package:

```bash
pnpm dev
```

Listens on **http://localhost:3001**. `GET /` returns `Hello Hono!`.

## Scripts

| Script | What it does |
| --- | --- |
| `dev` | `tsx watch src/index.ts` |
| `build` | `tsc` → `dist/` |
| `start` | `node dist/index.js` |

## Stack

- [Hono](https://hono.dev) + `@hono/node-server`
- TypeScript via `tsx` in development
