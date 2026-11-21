# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary (v1 beta):** the builder (Howard) as the first power user—a daily driver for thinking, writing, and AI-assisted work on real projects.

**Next:** a small invite-only list of trusted testers once core notes + chat + trust paths work; not a broad consumer launch at first.

## Product Purpose

Noema is a personal AI workspace: one place to think, write, ask, and get things done, where the assistant starts from your notes and history instead of a blank page.

**Success for the current phase:** the builder uses it daily; the deployed app supports sign-in, notes, and chat on the locked stack; the landing accurately represents the product; invite-only beta remains free with limits.

**One-line pitch:** ChatGPT that knows your notes, and notes that can think.

## Positioning

Neighboring products split chat and notes and rarely combine **AI-proposed relationships with a human review queue** across notes, links, PDFs, and chats while feeding **scoped chat context**, plus **in-note edit review** where nothing applies silently.

## Operating Context

- **Roadmap discipline:** product-first; at most two active projects (Noema + Slate 1.2).
- **Build posture:** ship one killer AI surface first (in-note edit review), resist scope creep; hand-code core pieces (e.g. ShadCN app shell, memory pipeline).
- **Honesty:** API-wrapper parts are fine as product features but should be described accurately in engineering narrative.
- **Tool budget:** about $80–100/month (Cursor on the tool side).
- **Launch model:** invite-only beta, free with limits (see `docs/PRODUCT_BRIEF.md` § Launch).
- **Current repo state:** marketing landing at `/` (UI-only waitlist and auth); product app shell and backends largely ahead on roadmap 0.0.1+.

Authoritative long-form source: [`docs/PRODUCT_BRIEF.md`](docs/PRODUCT_BRIEF.md).

## Capabilities and Constraints

**v1 goals (confirmed):**

1. Default place to ask anything—ChatGPT-class, plus personal context.
2. Writing home—good enough to replace Obsidian/Notion for personal notes.
3. Chats and notes unified, tied to projects.
4. Memory users can see, edit, and correct.
5. Real auth, privacy, export, and account deletion for other people.

**Differentiator (scheduled, not all shipped):** auto-linking `edges` layer with review queue (`proposed` / `accepted` / `rejected` / `blocked`); never corrupts explicit wikilinks/folders.

**First AI feature to ship in product UI:** in-note edit review (Accept / Reject / Explain).

**Locked stack (high level):** TanStack Start + shadcn on Vercel; Convex for data/sync/search/scheduling; Hono agent server on Railway for all model and external API calls; Clerk auth; Vercel AI SDK 6 + AI Gateway (OpenRouter fallback). Details in product brief.

**Explicitly undecided (do not invent):** `@` rules when command bar vs note body collide; PWA/desktop wrapper; chat pin behavior; numbered milestone for auto-linking ship; optional decisions log. See product brief § Open questions.

**Out of scope for v1:** teams/sharing, native apps (PWA may come earlier), graph view unless later scoped, Composio write actions, heavy job queues—see product brief § After v1.

## Brand Commitments

- **Name:** Noema (pronounced no-EE-muh).
- **Voice:** Calm, trustworthy, assistant never overwrites user text without review.
- **Visual constraint (product UI):** violet reserved for AI affordances only; Markdown is source of truth in the editor.
- **Feel references (not architectures to copy):** [Tolaria](https://tolaria.md), [Moss Notes](https://www.mossnotes.app/)—typed notes, calm writing, inline AI suggestions users approve.

## Evidence on Hand

| Asset | Path |
| --- | --- |
| Full product brief and roadmap | [`docs/PRODUCT_BRIEF.md`](docs/PRODUCT_BRIEF.md) |
| App shell layout reference | [`docs/pictures/layout_draft.png`](docs/pictures/layout_draft.png) |
| Marketing landing (no product raster) | [`apps/web/src/routes/_marketing/`](apps/web/src/routes/_marketing/) |
| Shipped marketing surface | [`apps/web/src/routes/_marketing/`](apps/web/src/routes/_marketing/) |
| Marketing account card (UI-only) | [`apps/web/src/components/landing/account-card.tsx`](apps/web/src/components/landing/account-card.tsx) |

**Do not fabricate:** customer logos, testimonials, benchmark numbers, pricing, or deployment claims not in the brief.

## Product Principles

1. **User sovereignty:** AI proposes; the user accepts, rejects, or blocks—especially for links and edits.
2. **One workspace:** notes, chat, and projects compound together; context is scoped and visible.
3. **Product before portfolio:** ship something real and used; resume value follows from that.
4. **Thin client, honest backend:** models and integrations live on the agent server; Convex holds data truth.
5. **Scope discipline:** one flagship AI widget first; defer v1.0 breadth until daily use is true.

## Accessibility & Inclusion

No product-specific accessibility standard recorded yet. Future work should meet baseline web accessibility for auth, editor, and chat (keyboard, focus, motion preferences). Landing already respects `prefers-reduced-motion` for entrance animation.