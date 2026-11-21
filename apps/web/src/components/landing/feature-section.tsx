import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

type FeatureSectionProps = {
  id: string
  title: string
  description: string
}

export function FeatureSection({ id, title, description }: FeatureSectionProps) {
  return (
    <Card
      id={id}
      size="sm"
      className="scroll-mt-24 bg-card/30 shadow-none ring-border/80"
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed text-pretty">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}