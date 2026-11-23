import { Link } from "@tanstack/react-router"

import { BrandMark } from "@/components/landing/brand-mark"
import { ModeToggle } from "@/components/mode-toggle"

const FEATURE_LINKS = [
  { label: "Notes", href: "#notes" },
  { label: "Auto-linking", href: "#auto-linking" },
  { label: "Chat", href: "#chat" },
  { label: "Privacy", href: "#privacy" },
] as const

function FeatureLinks({ className }: { className?: string }) {
  return (
    <>
      {FEATURE_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={(event) => event.preventDefault()}
          className={className}
        >
          {link.label}
        </a>
      ))}
    </>
  )
}

const featureLinkClass =
  "rounded-sm text-xs text-foreground/75 transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"

export function LandingNav() {
  return (
    <header className="bg-zinc-100 dark:bg-zinc-950">
      <h1 className="sr-only">Noema</h1>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-3 px-4 py-2.5 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 justify-self-start text-xs font-medium tracking-tight text-foreground"
        >
          <BrandMark className="size-6 text-[0.65rem]" />
          Noema
        </Link>
        <nav
          className="hidden items-center gap-4 md:flex"
          aria-label="Features"
        >
          <FeatureLinks className={featureLinkClass} />
        </nav>
        <div className="justify-self-end">
          <ModeToggle variant="ghost" className="size-7" />
        </div>
        <nav
          className="col-span-2 flex gap-3 overflow-x-auto md:hidden"
          aria-label="Features"
        >
          <FeatureLinks className={`${featureLinkClass} shrink-0`} />
        </nav>
      </div>
    </header>
  )
}
