type FeatureSectionProps = {
  id: string
  title: string
  description: string
}

export function FeatureSection({ id, title, description }: FeatureSectionProps) {
  return (
    <article
      id={id}
      className="scroll-mt-24 rounded-xl border border-border/80 bg-card/30 p-6 sm:p-8"
    >
      <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
        {description}
      </p>
    </article>
  )
}