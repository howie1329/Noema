# Noema — design system

<!-- impeccable:design-schema 1 -->

## World

**Quiet product.** Zinc canvas, black/white type, hairline borders, small shadows. Violet is reserved for AI affordances only. **Inter** for UI chrome; **Source Serif 4** for display type and long-form prose (Lane A — editorial calm).

Two surfaces share one density language; scale differs by job:

| Surface | Mode | Job |
| --- | --- | --- |
| Marketing `/` | Persuade | Invite someone to create an account |
| App `/home` | Operate | Daily workspace chrome |

## Shared density (Operate baseline)

Use these sizes across **app shell** and as the quiet reference for marketing chrome (nav, card controls). Marketing headline may sit one step larger; it must not return to oversized display type.

| Role | Pattern |
| --- | --- |
| Chrome base | `text-xs` |
| Icons (chrome) | `size-3.5`, hit target `size-7`, muted unless active / AI |
| List / menu rows | ~`h-7`, `rounded-md`, tight `px-2`, `gap-0.5` |
| Section labels | `text-xs` uppercase + tracking, muted |
| Meta / captions | `text-xs` (12px floor — no 10px chrome) |
| Document title | `prose-noema-heading` ~`1.875rem` |
| Body (notes) | `prose-noema` — 17px / 1.7 leading, serif |
| Subhead | `text-sm font-semibold` |
| Compact badges | `h-5`, `text-xs` |
| AI | Violet only (e.g. Ask Noema, AI checklist marks) |

**Do not:** default sidebar rows at `h-9`/`text-sm` with `rounded-xl`; note titles at `text-2xl+`; footer shortcut captions; violet on non-AI chrome.

## Color

| Role | Usage |
| --- | --- |
| Canvas | `zinc-100` light, `zinc-950` dark |
| Text | `foreground` / `muted-foreground` |
| Card | `card` on canvas, hairline border, small shadow |
| Primary CTA | `primary` — black in light, white in dark |
| AI marks | Violet wells / icons only |
| Privacy / neutral marks | Zinc wells — never violet |

## Typography

- **UI sans:** Inter Variable (`packages/ui` globals)
- **Display / prose serif:** Source Serif 4 Variable — `font-heading`, `prose-noema`, `prose-noema-heading` utilities
- **Marketing headline:** serif display, ~`text-3xl` / `sm:text-4xl`
- **Marketing body:** Inter `text-sm`, muted, narrow measure
- **App note title / body:** serif scale via `prose-noema*`; shell stays Inter
- **Editor pane:** `bg-editor` (slightly lifted from card in dark mode)

## Marketing page `/`

1. **Header:** wordmark left; feature names (Notes, Auto-linking, Chat, Privacy) that do not navigate yet; theme toggle right. No Sign in in the header. Compact: `text-xs` links, `size-7` toggle, tight vertical padding.
2. **One screen:** left — brand row (mark + Noema + pronunciation), headline, one sentence, three checklist lines with small icon wells. Right — account card.
3. **No footer.**
4. **Mobile:** content stacks; feature names wrap under the wordmark.

### Account card

- Opens on Sign up. Tabs switch the card; they do not change the URL.
- Continue with Google, then name (sign up only), email, password. No GitHub. No confirm-password.
- Valid submit / Google navigates to `/home` (UI preview until Clerk).
- Caption: “Free, with limits.”
- Density: `rounded-xl`, compact tabs (`h-8`), inputs/buttons ~`h-9`, labels `text-xs`.

## App shell `/home`

- Zinc canvas; **sidebar** + **main** as floating `rounded-xl` cards with ~8px gap (chat panel later).
- Sidebar: Home / Chats / Library, Search / Ask Noema / New tab, Favorites / Projects / Recent, compact footer icons (no shortcut caption).
- Main: light tabs, breadcrumbs, Saved + muted actions, note fixture (properties + body) or chat stub.
- Reading column ~720px. Collapse via control + `⌘\`.

## Motion

Hover and focus only on marketing. App shell: functional motion only (collapse, collapsibles). Respect `prefers-reduced-motion`.

## Auth

Account creation and sign-in live on the Marketing page card until Clerk is wired. No separate `/auth` route.
