# Signed-in UI Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a UI-only signed-in workspace shell at `/home`: floating **sidebar** + **main area** cards (no chat panel), fixture-driven navigation, matching the approved v2 layout / screenshot feel.

**Architecture:** Pathless `_app` layout owns the zinc canvas and two floating cards. Shell components live under `apps/web/src/components/shell/`. Fixture data is a static module (no Convex/Clerk). Sidebar mode + open tabs + focused item are React state in the shell. shadcn Sidebar primitives are added to `@workspace/ui` and composed *inside* the floating sidebar card (not the stock docked dashboard layout).

**Tech Stack:** TanStack Start (file routes), React 19, Tailwind v4, shadcn (`sidebar` + supporting primitives via `pnpm dlx shadcn@latest add … -c apps/web`).

**References:** `docs/PRODUCT_BRIEF.md` § App shell (desktop); screenshot in chat; `docs/pictures/layout_draft.png`; grilling decisions below.

## Global Constraints

- **UI-only:** no Clerk, Convex, Hono, or real persistence
- **Surfaces:** sidebar + main only — do **not** add a chat / Lens card this pass
- **Layout:** zinc canvas; sidebar + main as floating rounded cards with ~8px gap (brief: 12px radius, sidebar ~256px)
- **shadcn:** pull Sidebar (and needed peers); compose inside the floating card — do not ship stock full-bleed docked dashboard chrome
- **Main content:** static rendered fixture note (not a live Markdown editor)
- **Tabs:** light interaction only — click sidebar item replaces focused content; tab bar shows open fixtures; **no** ⌥-pane stacks / ⌘-new-tab semantics
- **Sidebar modes:** Home / Chats / Library all switch fixture lists; opening a “chat” opens a **stub in main**, not a right panel
- **Collapse:** toggle + `⌘\` only; **no** hover-peek
- **Viewport:** desktop-first; mobile can be crude
- **Entry:** `/home` always public for now; marketing Sign in / Sign up CTA navigates to `/home`
- **Violet:** reserved for AI affordances only (Ask Noema icon, etc.)
- App code in `apps/web`; reusable primitives in `packages/ui`
- Do not invent npm scripts; use root `pnpm` turbo scripts / `apps/web` scripts that already exist
- Do not commit secrets; avoid lockfile churn unless shadcn add requires it
- Treat `apps/web/src/routeTree.gen.ts` as generated (`pnpm generate-routes` in `apps/web` if needed)

## Settled decisions (grilling)

| Topic | Choice |
| --- | --- |
| Scope | UI shell first (not full 0.0.1 backends) |
| Cards | Sidebar + main; chat later |
| Main default | Fixture note (Edges schema–style) |
| Sidebar depth | Full mock Favorites / Projects / Recent |
| Visual | Floating cards; shadcn Sidebar inside |
| Entry | `/home` + marketing CTA |
| Tabs / panes | Light tabs; no pane stacks |
| Mode tabs | Home / Chats / Library all fixture-driven |
| Collapse | Toggle + shortcut; no hover-peek |
| Glossary person term | Deferred |
| Shell glossary nouns | Deferred this pass |

## File map

| Path | Responsibility |
| --- | --- |
| `apps/web/src/routes/_app/route.tsx` | Pathless layout: zinc canvas, shell chrome |
| `apps/web/src/routes/_app/home.tsx` | `/home` page — mounts workspace shell |
| `apps/web/src/components/shell/workspace-shell.tsx` | Owns shell state; composes sidebar + main |
| `apps/web/src/components/shell/app-sidebar.tsx` | Floating sidebar card (shadcn Sidebar inside) |
| `apps/web/src/components/shell/main-area.tsx` | Floating main card: tab bar + content |
| `apps/web/src/components/shell/note-fixture.tsx` | Static note view (title, properties, body) |
| `apps/web/src/components/shell/chat-stub.tsx` | Minimal stub when a fixture chat is focused |
| `apps/web/src/lib/shell-fixtures.ts` | Mock workspace / notes / chats / projects |
| `apps/web/src/components/landing/account-card.tsx` | Navigate to `/home` on successful preview submit / Google |
| `packages/ui/src/components/sidebar.tsx` (+ peers) | Added via shadcn |

---

## Mini Phase 1 — Foundations: shadcn + `/home` chrome

**Done when:** Visiting `/home` shows zinc background, two floating cards (empty-ish), sidebar collapses with button/`⌘\`, and shadcn Sidebar imports resolve.

### Task 1.1: Add shadcn Sidebar and peers

**Files:**
- Modify: `packages/ui/src/components/` via CLI
- Possibly: `packages/ui/package.json` / lockfile if CLI adds deps

- [ ] **Step 1: Add sidebar (and accept peer components the CLI installs)**

From repo root:

```bash
pnpm dlx shadcn@latest add sidebar -c apps/web
```

If the CLI prompts for related components (e.g. `separator`, `skeleton`, `tooltip`, `sheet`), accept them. Confirm `@workspace/ui/components/sidebar` resolves.

- [ ] **Step 2: Add any extras the shell will need soon**

```bash
pnpm dlx shadcn@latest add breadcrumb scroll-area badge collapsible -c apps/web
```

Skip any that are already installed. Do not add chat-specific packages.

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: pass (or only pre-existing unrelated errors).

- [ ] **Step 4: Commit** (only if the user asked for commits)

```bash
git add packages/ui apps/web
git commit -m "$(cat <<'EOF'
chore: add shadcn sidebar and shell primitives

EOF
)"
```

### Task 1.2: `/home` route + floating two-card layout + collapse

**Files:**
- Create: `apps/web/src/routes/_app/route.tsx`
- Create: `apps/web/src/routes/_app/home.tsx`
- Create: `apps/web/src/components/shell/workspace-shell.tsx`
- Create: `apps/web/src/components/shell/app-sidebar.tsx` (stub)
- Create: `apps/web/src/components/shell/main-area.tsx` (stub)

**Interfaces:**
- Produces: `WorkspaceShell` with local `sidebarOpen: boolean` and `toggleSidebar()`
- Collapse shortcut: `⌘\` (Meta+Backslash) when `/home` is mounted

- [ ] **Step 1: Create pathless `_app` layout**

`apps/web/src/routes/_app/route.tsx`:

```tsx
import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app")({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="min-h-dvh bg-zinc-100 text-foreground dark:bg-zinc-950">
      <Outlet />
    </div>
  )
}
```

- [ ] **Step 2: Create `/home` route**

`apps/web/src/routes/_app/home.tsx` — file route path should resolve to `/home` (confirm with TanStack file-route convention; adjust filename/`createFileRoute` if the project’s `tsr` setup differs):

```tsx
import { createFileRoute } from "@tanstack/react-router"

import { WorkspaceShell } from "@/components/shell/workspace-shell"

export const Route = createFileRoute("/_app/home")({
  component: HomePage,
})

function HomePage() {
  return <WorkspaceShell />
}
```

Regenerate routes if the tree does not update automatically:

```bash
pnpm --filter web generate-routes
```

- [ ] **Step 3: Implement shell chrome with collapse**

`workspace-shell.tsx` owns `sidebarOpen` (default `true`). Layout: `flex` row, `p-2`, `gap-2`, full viewport height. When open, render floating sidebar card (~`w-64`, `rounded-xl`, `border`, `bg-card`, `shadow-sm`) containing a thin `AppSidebar` stub. Always render floating `MainArea` stub (`flex-1`, same card chrome) with a header control that expands the sidebar when closed (`»` / panel icon).

Wire `useEffect` for `keydown`: if `metaKey && key === "\\"`, `preventDefault` and toggle.

- [ ] **Step 4: Verify manually**

```bash
pnpm dev
```

Open `http://localhost:3000/home` — two cards, collapse works, shortcut works. Marketing `/` still works.

- [ ] **Step 5: Typecheck**

```bash
pnpm typecheck
```

---

## Mini Phase 2 — Sidebar: modes + mock hierarchy

**Done when:** Sidebar matches screenshot structure (header, Home/Chats/Library, Search/Ask/New, Favorites/Projects/Recent, footer). Switching modes changes the list. Rows are selectable (visual active state). No requirement yet that main content updates (that is Phase 4) — optional temporary `console`/`aria` is fine; prefer lifting selection into shell state early if easy.

### Task 2.1: Fixture module

**Files:**
- Create: `apps/web/src/lib/shell-fixtures.ts`

**Interfaces:**
- Produces types + data roughly:

```ts
export type ShellMode = "home" | "chats" | "library"

export type FixtureKind = "note" | "chat"

export type FixtureItem = {
  id: string
  kind: FixtureKind
  title: string
  projectId?: string
  favorite?: boolean
  // note-only fields used by NoteFixture
  breadcrumbs?: string[]
  properties?: {
    type?: string
    project?: string
    tags?: string[]
    linkedFromCount?: number
    status?: string
    created?: string
    updated?: string
  }
  body?: {
    paragraphs: string[]
    heading?: string
    code?: { language: string; content: string }
  }
  // chat stub
  preview?: string
}

export type FixtureProject = {
  id: string
  name: string
  itemIds: string[]
  count?: number
}

export const FIXTURE_WORKSPACE_NAME = "Noema"
export const FIXTURE_ITEMS: Record<string, FixtureItem>
export const FIXTURE_PROJECTS: FixtureProject[]
export const FIXTURE_FAVORITE_IDS: string[]
export const FIXTURE_RECENT_IDS: string[]
export const DEFAULT_FOCUSED_ID: string // e.g. edges-schema note
```

Seed content from the screenshot: favorites (“Auto-linking design”, “Subnetting cheatsheet”), project **Noema** with “Edges schema” (default), “Auto-linking design”, “Command bar routing”; a few chats for Chats mode; Library can reuse the flat note list.

- [ ] **Step 1: Write `shell-fixtures.ts` with the seed data above**
- [ ] **Step 2: Typecheck**

### Task 2.2: Build `AppSidebar`

**Files:**
- Modify: `apps/web/src/components/shell/app-sidebar.tsx`
- Modify: `apps/web/src/components/shell/workspace-shell.tsx` (pass mode / selection props)

**Interfaces:**
- Consumes: `mode`, `onModeChange`, `focusedId`, `onSelectItem`, `onCollapse`
- Uses: shadcn `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarMenu`, etc. **inside** the floating card (card provides radius/border; avoid double full-viewport sidebar wrapper)

- [ ] **Step 1: Header** — workspace name `Noema` + placeholder icons (notifications badge optional, new, collapse)
- [ ] **Step 2: Mode control** — Home / Chats / Library (Tabs or segmented control)
- [ ] **Step 3: Global actions** — Search, Ask Noema (violet accent on icon only), New tab/note — **non-functional buttons** OK this phase
- [ ] **Step 4: Lists by mode**
  - **Home:** Favorites, Projects (nested, expandable), Recent
  - **Chats:** flat mock chat list from fixtures
  - **Library:** flat notes list
- [ ] **Step 5: Footer** — Trash, Appearance, Settings icons (non-functional); caption optional: `Click replaces · ⌥ adds pane · ⌘ new tab` as static hint text even though ⌥/⌘ are not implemented
- [ ] **Step 6: Verify** — mode switching and active row styles look right at `/home`

---

## Mini Phase 3 — Main area: tabs + fixture note

**Done when:** Main card shows a tab bar and a static Edges-schema-style note (breadcrumbs, properties, body/code). Multiple tabs can be represented in UI state even if wiring from sidebar is Phase 4.

### Task 3.1: Tab bar (light)

**Files:**
- Modify: `apps/web/src/components/shell/main-area.tsx`
- Modify: `apps/web/src/components/shell/workspace-shell.tsx`

**Interfaces:**
- Shell state shape (finalize here if not earlier):

```ts
type OpenTab = { id: string; itemId: string } // id === itemId is fine for fixtures
// openTabIds: string[]
// focusedItemId: string
```

- [ ] **Step 1: Render tab strip** at top of main card (titles from fixtures). Active tab highlighted. Closing a tab is optional; if implemented, never leave zero tabs — fall back to `DEFAULT_FOCUSED_ID`.
- [ ] **Step 2: Header row under tabs** — breadcrumbs, “Saved”, Share / Favorite / more as non-functional controls.

### Task 3.2: `NoteFixture` + `ChatStub`

**Files:**
- Create: `apps/web/src/components/shell/note-fixture.tsx`
- Create: `apps/web/src/components/shell/chat-stub.tsx`
- Modify: `apps/web/src/components/shell/main-area.tsx`

- [ ] **Step 1: `NoteFixture`** — title, collapsible-looking properties block (`Type` `@schema/edges`, project, tags as badges, linked-from count, status, dates), body paragraphs, “Shape” heading, static `<pre>` code block (Convex `edges` table snippet). Not editable.
- [ ] **Step 2: `ChatStub`** — simple title + muted “Chat panel comes later” / preview text so Chats mode has somewhere to land.
- [ ] **Step 3: `MainArea` switches on `focusedItem.kind`
- [ ] **Step 4: Verify** default load shows Edges schema fixture looking close to the screenshot (minus chat column)

---

## Mini Phase 4 — Wire navigation + marketing entry

**Done when:** Sidebar selection updates main + tabs (replace semantics). Home/Chats/Library selection works end-to-end. Marketing auth card goes to `/home`. Lint/typecheck clean for touched packages.

### Task 4.1: Selection → main + tabs

**Files:**
- Modify: `apps/web/src/components/shell/workspace-shell.tsx`
- Modify: `apps/web/src/components/shell/app-sidebar.tsx` (ensure `onSelectItem` wired)

**Behavior:**
- Click item: set `focusedItemId`; if its tab is not open, open it (append); if open, focus that tab. **Replace** focused content (no pane stack).
- Clicking an already-focused item is a no-op.
- Mode switches do not clear open tabs.

- [ ] **Step 1: Implement `selectItem(itemId: string)` in `WorkspaceShell`**
- [ ] **Step 2: Pass into sidebar rows**
- [ ] **Step 3: Tab click sets focus without removing other tabs**
- [ ] **Step 4: Manual test matrix**
  - Open `/home` → Edges schema
  - Click another note → main + active tab update
  - Switch to Chats → pick a chat → chat stub in main
  - Switch to Library → pick a note
  - Collapse sidebar; reopen; focus preserved

### Task 4.2: Marketing CTA → `/home`

**Files:**
- Modify: `apps/web/src/components/landing/account-card.tsx`

- [ ] **Step 1: On valid submit and on Google click, navigate to `/home`**

Use TanStack Router navigation (e.g. `useNavigate` from `@tanstack/react-router`):

```tsx
const navigate = useNavigate()
// after successful validate / Google:
navigate({ to: "/home" })
```

Remove or keep the preview note string — prefer navigate instead of only showing `PREVIEW_NOTE`.

- [ ] **Step 2: Verify from `/`** — Sign in / Sign up / Google lands on shell

### Task 4.3: Final checks

- [ ] **Step 1: Lint / typecheck**

```bash
pnpm lint
pnpm typecheck
```

- [ ] **Step 2: Smoke** — `/` and `/home` both render; no chat card; violet only on AI affordances
- [ ] **Step 3: Summarize** what shipped vs deferred (chat panel, pane stacks, hover-peek, real editor, Clerk)

---

## Out of scope (explicit)

- Chat / Lens floating panel and Ask bar as chat input
- ⌥-add pane / ⌘-new tab / pane stack badges
- Hover-peek sidebar
- Live-preview Markdown editor, slash menu, AI edit review
- Clerk / Convex / Hono
- Mobile drawer / bottom sheet per brief
- Writing shell terms into `CONTEXT.md` (deferred)

## Spec coverage check

| Settled requirement | Phase |
| --- | --- |
| UI-only shell | All |
| Floating cards + shadcn Sidebar inside | 1–2 |
| `/home` + marketing CTA | 1, 4 |
| Sidebar + main only | 1 |
| Full mock hierarchy | 2 |
| Home/Chats/Library fixtures | 2, 4 |
| Fixture note default | 3 |
| Light tabs | 3–4 |
| Collapse + `⌘\` | 1 |
| No chat panel | All |
