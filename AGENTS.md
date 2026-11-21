<!-- agentkit:start agents -->
# Noema

TanStack Start monorepo with shared shadcn/ui (`@workspace/ui`). Product docs live under `docs/`.

## Project map

| Path | Role |
| --- | --- |
| `apps/web` | TanStack Start (Vite) React app — file routes in `src/routes/` |
| `apps/server` | Placeholder package directory (empty) |
| `packages/ui` | Shared UI: components, hooks, lib, `globals.css` |
| `docs/prd` | Product requirements docs |
| `docs/pictures` | Design / reference images |
| `agentkit.config.json` | AgentKit skill config |

UI components are added via shadcn into `packages/ui` and imported as `@workspace/ui/components/...`.

## Commands

Root (pnpm + Turborepo):

| Task | Command |
| --- | --- |
| Dev | `pnpm dev` |
| Build | `pnpm build` |
| Lint | `pnpm lint` |
| Format | `pnpm format` |
| Typecheck | `pnpm typecheck` |

`apps/web` also has `pnpm generate-routes` (TanStack Router) and `pnpm preview`. Prefer root turbo scripts unless you need a package-local script.

Package manager: **pnpm** (`pnpm@11.25.0`). Node `>=22.12.0`.

## Workflow expectations

- Keep app code in `apps/web`; keep reusable UI in `packages/ui`.
- Add shadcn components from the web app context: `pnpm dlx shadcn@latest add <name> -c apps/web`.
- Prefer file-based routes under `apps/web/src/routes/`; regenerate the route tree when needed.
- Do not invent npm scripts — only use scripts defined in package manifests.
- Issue tracking uses local markdown under `.scratch/<feature>/` — see `docs/agents/issue-tracker.md`.

## Companion docs

This install uses `templateSet: minimal` — `AGENTS.md` is the sole core guidance file. Adapters for Cursor and Claude point here.

Optional later:

- `/agentkit design` — create `DESIGN.md` (config has `designSystem: linear`)
- Expand `templateSet` or run update after adding stack/testing companions

## Safety

- Do not commit secrets, `.env*` values, or credentials.
- Do not modify lockfiles or CI unless the task explicitly requires it.
- Treat generated files such as `apps/web/src/routeTree.gen.ts` as generated output.

## Before finishing

1. Run relevant checks: `pnpm lint` and/or `pnpm typecheck` for touched packages.
2. Confirm UI imports resolve from `@workspace/ui`.
3. Summarize what changed and how to verify it.
<!-- agentkit:end agents -->

## Agent skills

### Issue tracker

Local markdown under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout (`CONTEXT.md` + `docs/adr/`). See `docs/agents/domain.md`.
