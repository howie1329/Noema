import type { ReactNode } from "react"

import { Link } from "@tanstack/react-router"

import { ModeToggle } from "@/components/mode-toggle"

type AuthShellProps = {
  children: ReactNode
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(to_right,oklch(1_0_0/0.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.05)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_60%_at_50%_0%,#000_50%,transparent_100%)]"
        aria-hidden
      />
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
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
          <ModeToggle />
        </div>
      </header>
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6">
        {children}
      </main>
    </div>
  )
}