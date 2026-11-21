const NAV_LINKS = [
  { label: "Notes", href: "#notes" },
  { label: "Auto-linking", href: "#auto-linking" },
  { label: "Chat", href: "#chat" },
  { label: "Privacy", href: "#privacy" },
] as const

export function LandingNav() {
  return (
    <header className="border-b border-border/60">
      <h1 className="sr-only">Noema</h1>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
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
          className="hidden items-center gap-6 text-sm text-muted-foreground md:flex"
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
        <nav
          className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-xs text-muted-foreground md:hidden"
          aria-label="Product sections"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}