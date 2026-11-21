export function ProductPreview() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-1000 motion-safe:delay-150 motion-reduce:animate-none">
        <div className="overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-lg shadow-black/5">
          <PreviewChromeBar />
          <img
            src="/landing/product-preview.png"
            alt="Noema workspace showing notes editor, suggested edits, and scoped chat"
            width={2400}
            height={1400}
            className="block w-full bg-background"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}

function PreviewChromeBar() {
  return (
    <div className="flex items-center gap-2 border-b border-border/80 bg-background/80 px-4 py-2.5">
      <span className="size-2 rounded-full bg-border" aria-hidden />
      <span className="size-2 rounded-full bg-border" aria-hidden />
      <span className="size-2 rounded-full bg-border" aria-hidden />
      <span className="ml-2 text-xs text-muted-foreground">noema.app</span>
    </div>
  )
}