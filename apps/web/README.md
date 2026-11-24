# Web app

TanStack Start (Vite) React frontend. Marketing at `/`, signed-in shell fixture at `/home`. Shared UI comes from `@workspace/ui`.

## Run

From the monorepo root:

```bash
pnpm --filter web dev
```

Or from this package:

```bash
pnpm dev
```

App: **http://localhost:3000**.

## Scripts

| Script | What it does |
| --- | --- |
| `dev` | Vite dev server (port 3000) |
| `build` | Production build |
| `preview` | Preview production build |
| `generate-routes` | Regenerate TanStack Router tree |
| `lint` | ESLint |
| `typecheck` | `tsc --noEmit` |
| `format` | Prettier on `ts` / `tsx` |

## Routes

File routes live in `src/routes/`. After adding or renaming routes, run `pnpm generate-routes` (or rely on the Vite plugin during `dev`).

## UI components

Add shadcn components from this app context (they install into `packages/ui`):

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

```tsx
import { Button } from "@workspace/ui/components/button";
```
