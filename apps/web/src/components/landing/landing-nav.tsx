import { ModeToggle } from "@/components/mode-toggle"

const NAV_LINKS = [
  { label: "Notes", href: "#notes" },
  { label: "Auto-linking", href: "#auto-linking" },
  { label: "Chat", href: "#chat" },
  { label: "Privacy", href: "#privacy" },
] as const

export function LandingNav() {
  return (
    <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <h1 className="sr-only">Noema</h1>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
        <a
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight text-foreground"
        >
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground"
            aria-hidden
          >
            n
          </span>
          Noema
        </a>
        <nav
          className="hidden items-center justify-center gap-x-5 text-sm text-muted-foreground md:flex"
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
        <div className="flex items-center justify-end gap-3">
          <nav
            className="flex items-center gap-3 md:hidden"
            aria-label="Product sections"
          >
            {NAV_LINKS.slice(0, 2).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}