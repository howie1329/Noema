import { AuthCard } from "@/components/landing/auth-card"
import { WaitlistForm } from "@/components/landing/waitlist-form"

export function Hero() {
  return (
    <section className="border-b border-border/40 bg-[linear-gradient(180deg,oklch(0.99_0_0)_0%,oklch(0.97_0_0)_100%)]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_minmax(0,22rem)] lg:items-start lg:gap-12 lg:px-8 lg:py-20">
        <Reveal className="space-y-8">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]">
            ChatGPT that knows your notes, and notes that can think.
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Write and ask in one place. The assistant starts from your notes
            instead of a blank page, and it never changes a word without you.
          </p>
          <WaitlistForm />
        </Reveal>
        <Reveal className="flex justify-center lg:justify-end lg:pt-2">
          <AuthCard />
        </Reveal>
      </div>
    </section>
  )
}

function Reveal({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-reduce:animate-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  )
}