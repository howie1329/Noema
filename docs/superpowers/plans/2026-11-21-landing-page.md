# Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the Noema marketing landing at `/` per `docs/superpowers/specs/2026-11-21-landing-page-design.md` — split hero with UI-only waitlist + auth card, static product preview, feature sections, marketing route layout ready for Clerk later.

**Architecture:** Pathless `_marketing` layout owns nav/footer; landing components live under `apps/web/src/components/landing/`; shared primitives via `@workspace/ui`; Inter font fix in `globals.css`.

**Tech Stack:** TanStack Start (file routes), React 19, Tailwind v4, shadcn (`input` + existing `Button`), static asset in `apps/web/public/`.

**Spec:** `docs/superpowers/specs/2026-11-21-landing-page-design.md`

## Global Constraints

- Auth layout A: hero auth card on the right; no Sign in / Get started in the header
- Waitlist and auth are UI-only (no API, no Clerk)
- Product preview is a static image
- App code in `apps/web`; reusable UI in `packages/ui`
- Do not invent npm scripts; use root `pnpm` turbo scripts
- Do not commit secrets or modify lockfiles unless shadcn add requires it

---

### Task 1: Foundations — meta, fonts, asset, shadcn input

**Files:**
- Modify: `apps/web/src/routes/__root.tsx`
- Modify: `packages/ui/src/styles/globals.css`
- Create: `apps/web/public/landing/product-preview.png` (copy from reference screenshot)
- Modify: `packages/ui/src/components/` via shadcn add

- [ ] **Step 1: Fix Inter as the sans font**

In `packages/ui/src/styles/globals.css`, set every `--font-sans` to use the Inter variable font family that is already imported (e.g. `"Inter Variable", Inter, sans-serif`), and apply `font-sans` on `body` in `@layer base`.

- [ ] **Step 2: Update document meta**

In `__root.tsx`, set title to `Noema` and add a meta description using the one-line pitch from the product brief.

- [ ] **Step 3: Add product preview asset**

Copy the approved landing reference image to `apps/web/public/landing/product-preview.png` (export/crop if needed so the app chrome is clear).

- [ ] **Step 4: Add shadcn input**

From repo root:

```bash
pnpm dlx shadcn@latest add input -c apps/web
```

Confirm `@workspace/ui/components/input` resolves.

- [ ] **Step 5: Verify**

```bash
pnpm typecheck
```

Expected: pass (or only pre-existing unrelated errors).

---

### Task 2: Marketing route shell

**Files:**
- Create: `apps/web/src/routes/_marketing.tsx`
- Create: `apps/web/src/routes/_marketing/index.tsx`
- Delete: `apps/web/src/routes/index.tsx`
- Create: `apps/web/src/components/landing/landing-nav.tsx`
- Create: `apps/web/src/components/landing/landing-footer.tsx`

- [ ] **Step 1: Create pathless layout**

`_marketing.tsx` exports a route with a component that renders `LandingNav`, `<Outlet />`, `LandingFooter`.

- [ ] **Step 2: Move home under marketing**

Create `_marketing/index.tsx` as a placeholder page; delete `routes/index.tsx` so `/` is only served by the marketing index.

- [ ] **Step 3: Nav and footer**

Nav: logo + anchors `#notes`, `#auto-linking`, `#chat`, `#privacy` (smooth scroll). No auth buttons. Footer: product name + short line.

- [ ] **Step 4: Regenerate routes if needed**

```bash
pnpm --filter web generate-routes
```

- [ ] **Step 5: Smoke-check**

`pnpm --filter web dev` → `/` shows nav/footer shell.

---

### Task 3: Landing sections (hero, auth, waitlist, preview, features)

**Files:**
- Create: `apps/web/src/components/landing/waitlist-form.tsx`
- Create: `apps/web/src/components/landing/auth-card.tsx`
- Create: `apps/web/src/components/landing/hero.tsx`
- Create: `apps/web/src/components/landing/product-preview.tsx`
- Create: `apps/web/src/components/landing/feature-section.tsx`
- Modify: `apps/web/src/routes/_marketing/index.tsx`

- [ ] **Step 1: WaitlistForm**

Email input + “Join the waitlist” button; `preventDefault` on submit; optional local email format check; caption under control. No network.

- [ ] **Step 2: AuthCard**

Toggle Sign in / Sign up UI; Email + Password fields; primary button; secondary text link to flip mode. Submit `preventDefault` only.

- [ ] **Step 3: Hero**

Desktop: CSS grid — left copy + WaitlistForm, right AuthCard. Mobile: stack copy → waitlist → auth. Use approved copy from the spec.

- [ ] **Step 4: ProductPreview**

Browser-like frame around `/landing/product-preview.png` with modest shadow; light entrance animation gated by `prefers-reduced-motion`.

- [ ] **Step 5: Feature sections**

Four `FeatureSection` blocks with ids matching nav anchors; one headline + one sentence each (Notes, Auto-linking, Chat, Privacy).

- [ ] **Step 6: Compose index**

`_marketing/index.tsx` renders Hero → ProductPreview → features in order.

- [ ] **Step 7: Verify**

```bash
pnpm --filter web typecheck
pnpm --filter web lint
```

Manual: desktop split matches layout A; mobile stacks; waitlist/auth do not hit a network; anchors scroll.

---

### Task 4: Polish and handoff readiness

- [ ] **Step 1: Responsive and reduced-motion pass**

Check 375px and 1280px; confirm reduced-motion disables entrance animations.

- [ ] **Step 2: Final checks**

```bash
pnpm lint
pnpm typecheck
```

- [ ] **Step 3: Summarize**

Note how to verify (`pnpm dev` → localhost:3000) and that Clerk/waitlist backend are intentionally deferred.
