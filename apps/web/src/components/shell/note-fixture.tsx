import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { cn } from "@workspace/ui/lib/utils"

import type { FixtureItem } from "@/lib/shell-fixtures"

type NoteFixtureProps = {
  item: FixtureItem
}

function PropertyRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

export function NoteFixture({ item }: NoteFixtureProps) {
  const properties = item.properties
  const body = item.body

  return (
    <ScrollArea className="h-full min-h-0 flex-1">
      <article className="mx-auto w-full max-w-[720px] px-6 py-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {item.title}
        </h1>

        {properties ? (
          <Collapsible defaultOpen className="mt-5">
            <CollapsibleTrigger
              className={cn(
                "flex w-full items-center gap-1.5 text-left text-sm font-medium text-foreground",
                "[&[data-panel-open]_svg.chevron]:rotate-90"
              )}
            >
              <ChevronRight className="chevron size-4 shrink-0 text-muted-foreground transition-transform" />
              Properties
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-3 space-y-2.5 rounded-lg border bg-muted/30 px-4 py-3">
                {properties.type ? (
                  <PropertyRow label="Type">
                    <Badge variant="secondary" className="font-mono font-normal">
                      {properties.type}
                    </Badge>
                  </PropertyRow>
                ) : null}
                {properties.project ? (
                  <PropertyRow label="Project">
                    <span>{properties.project}</span>
                  </PropertyRow>
                ) : null}
                {properties.tags && properties.tags.length > 0 ? (
                  <PropertyRow label="Tags">
                    <div className="flex flex-wrap gap-1.5">
                      {properties.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </PropertyRow>
                ) : null}
                {properties.linkedFromCount != null ? (
                  <PropertyRow label="Linked from">
                    <span className="text-foreground">
                      {properties.linkedFromCount} notes
                    </span>
                  </PropertyRow>
                ) : null}
                {properties.status ? (
                  <PropertyRow label="Status">
                    <Badge variant="secondary" className="font-normal">
                      {properties.status}
                    </Badge>
                  </PropertyRow>
                ) : null}
                {properties.created ? (
                  <PropertyRow label="Created">
                    <span>{properties.created}</span>
                  </PropertyRow>
                ) : null}
                {properties.updated ? (
                  <PropertyRow label="Updated">
                    <span>{properties.updated}</span>
                  </PropertyRow>
                ) : null}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ) : null}

        {body ? (
          <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground">
            {body.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-pretty">
                {paragraph}
              </p>
            ))}
            {body.heading ? (
              <h2 className="pt-2 text-lg font-semibold tracking-tight">
                {body.heading}
              </h2>
            ) : null}
            {body.code ? (
              <div className="overflow-hidden rounded-lg border bg-muted/50">
                <div className="flex items-center justify-between border-b bg-muted/80 px-3 py-1.5 text-xs text-muted-foreground">
                  <span className="font-mono">convex/schema.ts</span>
                  <span className="uppercase tracking-wide">
                    {body.code.language}
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground">
                  <code>{body.code.content}</code>
                </pre>
              </div>
            ) : null}
          </div>
        ) : null}
      </article>
    </ScrollArea>
  )
}