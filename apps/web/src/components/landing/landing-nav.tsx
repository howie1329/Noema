import { Link } from "@tanstack/react-router"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

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
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight text-foreground"
        >
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-foreground text-xs font-semibold text-background"
            aria-hidden
          >
            n
          </span>
          Noema
        </Link>
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
          <Link
            to="/auth"
            search={{ mode: "sign-in" }}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden text-muted-foreground sm:inline-flex"
            )}
          >
            Log in
          </Link>
          <Link
            to="/auth"
            search={{ mode: "sign-up" }}
            className={cn(buttonVariants({ size: "sm" }), "rounded-full px-4")}
          >
            Start
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}