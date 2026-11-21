import { WaitlistForm } from "@/components/landing/waitlist-form"

export function Hero() {
  return (
    <section
      id="waitlist"
      className="relative scroll-mt-20 px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(70vh,640px)] bg-[linear-gradient(to_right,oklch(0.92_0_0/0.12)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.92_0_0/0.12)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_75%_55%_at_50%_0%,#000_45%,transparent_100%)] dark:bg-[linear-gradient(to_right,oklch(1_0_0/0.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.06)_1px,transparent_1px)]"
        aria-hidden
      />
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center">
        <div className="space-y-5">
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-foreground text-balance sm:text-5xl sm:leading-[1.08]">
            ChatGPT that knows your notes, and notes that can think.
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Write and ask in one place. The assistant starts from your notes
            instead of a blank page, and it never changes a word without you.
          </p>
        </div>
        <WaitlistForm align="center" />
      </div>
    </section>
  )
}