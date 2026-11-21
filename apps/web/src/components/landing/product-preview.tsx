export function ProductPreview() {
  return (
    <section className="relative px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-background shadow-[0_24px_80px_-12px_oklch(0_0_0/0.18)]">
          <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-2.5">
            <span className="size-2 rounded-full bg-border" aria-hidden />
            <span className="size-2 rounded-full bg-border" aria-hidden />
            <span className="size-2 rounded-full bg-border" aria-hidden />
            <span className="ml-1 text-xs text-muted-foreground">noema.app</span>
          </div>
          <img
            src="/landing/product-preview.png"
            alt="Noema workspace showing notes editor, suggested edits, and scoped chat"
            width={2400}
            height={1400}
            className="block w-full bg-background"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}