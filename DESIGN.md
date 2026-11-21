# Noema — design system (marketing)

<!-- impeccable:design-schema 1 -->

## World

**Developer SaaS marketing (Vercel register).** Dark-first neutral canvas, crisp borders, centered thesis copy, inverse primary for the main CTA. Atmosphere is a **line grid** masked behind the hero only—not violet wash or product rasters.

## Color

| Role | Usage |
| --- | --- |
| Canvas | `background` — near-black in dark default |
| Text | `foreground` / `muted-foreground` |
| Primary CTA | `primary` on `primary-foreground` (reads as light pill on dark) |
| Cards | `card` / `border` at 80% opacity on feature grid |
| Accents | No marketing violet; violet reserved for in-app AI affordances |

## Typography

- **Sans:** Inter Variable (`packages/ui` globals)
- **Hero:** ~2.5–3rem, weight 600, tracking −0.03em, centered, balance
- **Body:** 1rem–1.125rem, muted secondary, ~max 36ch in hero

## Layout (landing `/`)

1. **Nav:** Logo left; section anchors center (lg+); right **Log in** + **Start** + theme toggle
2. **Hero:** Centered headline, subcopy, pill waitlist (sole hero action)
3. **Features:** 2×2 bordered cards + short intro line; no screenshot section
4. **Footer:** Minimal centered copy

## Components

- **Waitlist:** Rounded-full compound control on sm+ (input + button)
- **Auth:** Dialog from header; labeled fields; mode toggle in form footer
- **Controls:** `rounded-full` for primary marketing CTAs; `rounded-xl` for cards

## Motion

No entrance choreography on marketing landing; `prefers-reduced-motion` respected globally. Hover on links and buttons only.

## Auth (`/auth`)

Mode: Operate. Minimal shell (logo + theme toggle), centered card, **segmented tabs** for Sign in | Sign up. URL `?mode=sign-in` | `sign-up`. Sign-up includes confirm password. UI-only until Clerk.

## Reference

Shape brief: Vercel-like centered marketing, features-only proof (Nov 2025). Combined auth page shape Nov 2025.