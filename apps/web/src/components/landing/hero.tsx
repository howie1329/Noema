import { AuthCard } from "@/components/landing/auth-card"
import { WaitlistForm } from "@/components/landing/waitlist-form"

export function Hero() {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden scroll-mt-20 pb-6 pt-14 sm:pt-16 lg:pt-20"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(55vh,520px)] bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,oklch(0.93_0.07_285),transparent_65%)]"
        aria-hidden
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_minmax(0,22rem)] lg:items-start lg:gap-14 lg:px-8">
        <div className="flex flex-col gap-8 text-center lg:text-left">
          <div className="space-y-6">
            <h2 className="mx-auto max-w-xl text-4xl font-semibold tracking-[-0.03em] text-foreground text-balance sm:text-[2.5rem] sm:leading-[1.1] lg:mx-0 lg:max-w-lg">
              ChatGPT that knows your notes, and notes that can think.
            </h2>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg lg:mx-0">
              Write and ask in one place. The assistant starts from your notes
              instead of a blank page, and it never changes a word without you.
            </p>
          </div>
          <WaitlistForm align="startOnLarge" />
        </div>
        <AuthCard />
      </div>
    </section>
  )
}