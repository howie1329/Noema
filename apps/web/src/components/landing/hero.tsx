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
    <section className="flex flex-1 items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-20">
        <div className="max-w-xl">
          <div className="flex items-center gap-2.5">
            <BrandMark className="size-8 text-xs" />
            <span className="font-semibold tracking-tight">Noema</span>
            <span className="text-sm text-muted-foreground">no-EE-muh</span>
          </div>
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-5xl sm:leading-[1.08]">
            An assistant that knows your notes, and notes that can think.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">
            Write and ask in one place. The assistant starts from your notes
            instead of a blank page, and it never changes a word without you.
          </p>
          <ul className="mt-8 space-y-3.5">
            {POINTS.map((point) => (
              <li key={point.label} className="flex items-center gap-3 text-sm">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full",
                    point.ai
                      ? "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300"
                      : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  )}
                >
                  <point.icon className="size-3.5" aria-hidden />
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
