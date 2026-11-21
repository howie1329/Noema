type FeatureSectionProps = {
  id: string
  title: string
  description: string
}

export function FeatureSection({ id, title, description }: FeatureSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border/40 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}