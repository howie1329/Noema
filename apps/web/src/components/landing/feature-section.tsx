type FeatureSectionProps = {
  id: string
  title: string
  description: string
}

export function FeatureSection({ id, title, description }: FeatureSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border/30 px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      </div>
    </section>
  )
}