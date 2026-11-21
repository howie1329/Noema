# Noema — design system (marketing)

<!-- impeccable:design-schema 1 -->

## World

**Light editorial SaaS (marketing).** Calm off-white canvas, black primary actions, Inter for all UI copy. Violet appears only as ambient atmosphere behind the product frame and inside product imagery (AI affordances in-app).

## Color

| Role | Usage |
| --- | --- |
| Canvas | `background` — near-white |
| Text | `foreground` / `muted-foreground` for hierarchy |
| Primary CTA | `primary` (black) on `primary-foreground` |
| Atmosphere | Radial `oklch(0.93 0.07 285)` behind hero → preview |
| Borders | `border` at 30–80% opacity for separation |

## Typography

- **Sans:** Inter Variable (`packages/ui` globals)
- **Hero:** ~3.25rem, weight 600, tracking −0.03em, centered, balance
- **Body:** 1rem–1.125rem, muted secondary, max ~42ch in hero

## Layout (landing `/`)

1. **Nav:** Logo left, section anchors right (no header auth)
2. **Hero (desktop):** Split — left: headline, subcopy, waitlist; right: auth card (Sign in / Sign up toggle)
3. **Hero (mobile):** Stack — copy → waitlist → auth card
4. **Proof:** Full-width browser-framed product screenshot
5. **Features:** Centered text blocks, anchor targets for nav

## Components

- **Waitlist track:** Single bordered `rounded-2xl` shell; input flush left, button inset right
- **Product frame:** `rounded-2xl`, traffic-light chrome bar, deep soft shadow
- **Controls:** `rounded-lg` / `rounded-xl`; pills only on small controls where shadcn defaults apply

## Motion

No entrance choreography on marketing landing; `prefers-reduced-motion` respected globally. Interactions: hover on links and buttons only.

## Reference

Approved marketing comp: `.impeccable/reference/landing-inspo.png`