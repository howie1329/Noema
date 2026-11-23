import { Check, Link2, Lock } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

import { AccountCard } from "@/components/landing/account-card"
import { BrandMark } from "@/components/landing/brand-mark"

const POINTS = [
  {
    icon: Check,
    label: "Edits you review with Accept and Reject",
    ai: true,
  },
  {
    icon: Link2,
    label: "Auto-linking with a review queue",
    ai: true,
  },
  {
    icon: Lock,
    label: "Your data stays yours. Export anytime.",
    ai: false,
  },
] as const

export function Hero() {
  return (
    <section className="flex flex-1 items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
        <div className="max-w-xl">
          <div className="flex items-center gap-2">
            <BrandMark className="size-6 text-[0.65rem]" />
            <span className="text-sm font-semibold tracking-tight">Noema</span>
            <span className="text-xs text-muted-foreground">no-EE-muh</span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-4xl sm:leading-[1.1]">
            An assistant that knows your notes, and notes that can think.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground">
            Write and ask in one place. The assistant starts from your notes
            instead of a blank page, and it never changes a word without you.
          </p>
          <ul className="mt-6 space-y-2.5">
            {POINTS.map((point) => (
              <li
                key={point.label}
                className="flex items-center gap-2.5 text-xs text-foreground"
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full",
                    point.ai
                      ? "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300"
                      : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  )}
                >
                  <point.icon className="size-3" aria-hidden />
                </span>
                {point.label}
              </li>
            ))}
          </ul>
        </div>
        <AccountCard />
      </div>
    </section>
  )
}
