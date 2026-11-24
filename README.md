# Noema

Personal AI workspace: notes, chat, and projects that share context. Monorepo with TanStack Start, shared shadcn/ui, and a Hono agent server.

## Structure

| Path | Role |
| --- | --- |
| `apps/web` | TanStack Start (Vite) app — port 3000 |
| `apps/server` | Hono agent server (Node) — port 3001 |
| `packages/ui` | Shared UI components (`@workspace/ui`) |
| `docs/` | Product brief, agent docs, plans |

## Requirements

- Node `>=22.12.0`
- pnpm `11.25.0` (via `packageManager` field)

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev                 # turbo: web + server
pnpm --filter web dev    # web only → http://localhost:3000
pnpm --filter server dev # server only → http://localhost:3001
```

Other root scripts: `pnpm build`, `pnpm lint`, `pnpm format`, `pnpm typecheck`.

## UI components

Add shadcn components from the web app context (they land in `packages/ui`):

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

```tsx
import { Button } from "@workspace/ui/components/button";
```

## Docs

- Product brief: [`docs/PRODUCT_BRIEF.md`](docs/PRODUCT_BRIEF.md)
- Agent guidance: [`AGENTS.md`](AGENTS.md)
