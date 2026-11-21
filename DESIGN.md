# Noema — design system (marketing)

<!-- impeccable:design-schema 1 -->

## World

**Quiet product marketing.** Light gray canvas, one screen, black text, a white account card. The page is the invitation to create an account. No feature grid, no product screenshot, no waitlist.

## Color

| Role | Usage |
| --- | --- |
| Canvas | `zinc-100` in light, `zinc-950` in dark |
| Text | `foreground` / `muted-foreground` |
| Card | `card` on the canvas, hairline border, small shadow |
| Primary CTA | `primary` — black in light, white in dark |
| AI marks | Violet wells only on AI lines in the checklist |
| Privacy mark | Neutral well. Violet means AI. |

## Typography

- **Sans:** Inter Variable (`packages/ui` globals)
- **Headline:** ~2.25–3rem, weight 600, tracking −0.03em, left aligned
- **Body:** 1rem, muted, narrow measure under the headline

## Layout (marketing page `/`)

1. **Header:** wordmark left; feature names (Notes, Auto-linking, Chat, Privacy) that will link out later and do not navigate yet; theme toggle on the right. No Sign in in the header.
2. **One screen:** left column is pronunciation, headline, one sentence, three checklist lines. Right column is the account card (Sign in / Sign up).
3. **No footer.** Nothing below this screen.
4. **Mobile:** the same content stacks. Feature names wrap under the wordmark.

## Account card

- Opens on Sign up. Tabs switch the card. They do not change the URL.
- Continue with Google, then name (sign up only), email, and password. No GitHub. No confirm-password field.
- **Create account** / **Sign in** validate the fields and stay on the page. A filled form says the preview does not open an account.
- Caption when idle: “Free, with limits.”

## Motion

No entrance animation. Hover and focus only. `prefers-reduced-motion` stays respected globally.

## Auth

Account creation and sign-in live on the Marketing page card until Clerk is wired. There is no separate `/auth` route.
