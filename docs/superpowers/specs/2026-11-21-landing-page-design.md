# Noema marketing landing page — design

Date: 2026-11-21  
Status: approved in conversation; awaiting implementation plan

## Goal

Replace the TanStack Start starter home with a public marketing landing that matches the agreed mock: split hero with waitlist + auth card, static product preview, and short feature sections. Structure the routes so Clerk sign-in/sign-up can land next without reworking the marketing chrome.

## Decisions (locked)

| Decision | Choice |
| --- | --- |
| Scope | First viewport (nav, hero, waitlist, product mock) **plus** Notes / Auto-linking / Chat / Privacy sections and footer |
| Auth layout | **A** — Sign in / Sign up card on the **right** of the hero; header has logo + section links only (no Sign in / Get started in the nav) |
| Waitlist | UI only — looks real, no persistence |
| Auth card | UI only — no Clerk wiring in this pass; fields do not submit to a backend |
| Product preview | Static image under the hero |
| Route structure | Marketing pathless layout (`_marketing`) wrapping `/`; reserve `/sign-in` and `/sign-up` for a later Clerk pass |
| Out of scope | Clerk, waitlist API/storage, authenticated app shell, multi-page marketing site |

## Layout

### Header

- Logo (mark + “Noema”) left
- Center/left nav anchors: Notes, Auto-linking, Chat, Privacy → smooth-scroll to in-page section ids
- No auth buttons in the header (auth lives in the hero card)

### First viewport (split hero)

- **Left:** headline, supporting sentence, email waitlist control, caption “Invite-only beta. Free, with limits.”
- **Right:** auth card — Sign in by default; “Need an account? Sign up” toggles a Sign up presentation (still UI-only)
- **Below split:** framed static product screenshot

### Below the fold

Four short sections (one job each): Notes, Auto-linking, Chat, Privacy — each with one headline and one short supporting sentence drawn from the product brief. Minimal footer (product name + short line).

### Mobile

Stack: copy → waitlist → auth card → product image. Collapse or wrap nav links so the header stays usable.

## Copy

Source: `docs/PRODUCT_BRIEF.md` and the reference mock.

- **Headline:** ChatGPT that knows your notes, and notes that can think.
- **Subhead:** Write and ask in one place. The assistant starts from your notes instead of a blank page, and it never changes a word without you.
- **Waitlist CTA:** Join the waitlist
- **Waitlist placeholder:** you@example.com
- **Caption:** Invite-only beta. Free, with limits.
- **Auth card (sign in):** Welcome back; Email; Password; Sign in; Need an account? Sign up
- **Auth card (sign up):** Create account; Email; Password; Sign up; Already have an account? Sign in
- **Feature blurbs:** one sentence each — notes as the writing home; AI-proposed links you review; chat scoped to your notes; privacy / your data stays yours (align wording with the brief)

## Visual direction

- Light, minimal SaaS surface close to the reference mock (white / off-white, black text and primary buttons)
- Soft violet reserved for AI accents in the product image and small auth secondary links — not a purple gradient theme for the page
- Typography: load Inter (already imported in `packages/ui`); fix `--font-sans` so body actually uses Inter instead of unloaded Geist
- Subtle motion: light hero entrance and product-image reveal; respect `prefers-reduced-motion`
- Product image: use the provided landing reference screenshot (or a cropped export) placed under `apps/web/public/` (or `apps/web/src/assets/`)

## Architecture

```
routes/
  __root.tsx                 # html shell, globals.css, Noema meta/title
  _marketing.tsx             # Outlet + LandingNav + LandingFooter
  _marketing/index.tsx       # composes landing sections
components/landing/
  hero.tsx                   # split: copy + waitlist + AuthCard
  auth-card.tsx              # sign in / sign up toggle UI
  waitlist-form.tsx          # email + button, no network
  product-preview.tsx        # static image in browser-like frame
  feature-section.tsx        # reusable section block
  landing-nav.tsx
  landing-footer.tsx
```

Shared UI: add shadcn `input` (and `label` if needed) via `pnpm dlx shadcn@latest add … -c apps/web` into `@workspace/ui`. Reuse existing `Button`.

## Behavior details

- Waitlist submit: prevent default; optional client-side email format check for polish; no toast/API required (static idle or brief local “thanks” state is acceptable if it stays front-end only)
- Auth card submit: prevent default; no navigation until Clerk exists
- Nav: `#notes`, `#auto-linking`, `#chat`, `#privacy` (or equivalent ids) with smooth scroll
- Meta: replace “TanStack Start Starter” title with Noema; basic description meta from the one-line pitch

## Success criteria

- `/` reads as the Noema landing (not the starter page)
- First viewport matches layout A (split + auth card right)
- Feature sections and footer present and linked from nav
- Waitlist and auth are non-functional beyond UI
- Ready to add Clerk routes without ripping out `_marketing`

## Non-goals

- Real authentication or waitlist capture
- Dark-mode marketing variant
- Pixel-perfect recreation of every pixel in the product screenshot (image handles density)
- Building the in-app shell
