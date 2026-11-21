import { Button } from "@workspace/ui/components/button"

import { useLandingAuth } from "@/components/landing/landing-auth"
import { ModeToggle } from "@/components/mode-toggle"

const NAV_LINKS = [
  { label: "Notes", href: "#notes" },
  { label: "Auto-linking", href: "#auto-linking" },
  { label: "Chat", href: "#chat" },
  { label: "Privacy", href: "#privacy" },
] as const

export function LandingNav() {
  const { openAuth } = useLandingAuth()

  return (
    <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <h1 className="sr-only">Noema</h1>
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight text-foreground"
        >
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-foreground text-xs font-semibold text-background"
            aria-hidden
          >
            n
          </span>
          Noema
        </a>
        <nav
          className="mx-auto hidden items-center justify-center gap-x-6 text-sm text-muted-foreground lg:flex"
          aria-label="Product"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="hidden text-muted-foreground sm:inline-flex"
            onClick={() => openAuth("sign-in")}
          >
            Log in
          </Button>
          <Button
            type="button"
            size="sm"
            className="rounded-full px-4"
            onClick={() => openAuth("sign-up")}
          >
            Start
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}