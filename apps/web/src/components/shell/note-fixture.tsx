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
    <div className="grid grid-cols-[6.5rem_1fr] items-center gap-x-3 gap-y-0.5 text-xs">
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
      <article className="mx-auto w-full max-w-[720px] px-5 py-5">
        <h1 className="prose-noema-heading text-[1.875rem] leading-[1.2] text-foreground">
          {item.title}
        </h1>

        {properties ? (
          <Collapsible defaultOpen className="mt-3">
            <CollapsibleTrigger
              className={cn(
                "flex w-full items-center gap-1 text-left text-xs font-medium text-muted-foreground",
                "hover:text-foreground",
                "[&[data-panel-open]_svg.chevron]:rotate-90"
              )}
            >
              <ChevronRight className="chevron size-3.5 shrink-0 transition-transform" />
              Properties
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 space-y-1.5 rounded-md border bg-muted/20 px-3 py-2.5">
                {properties.type ? (
                  <PropertyRow label="Type">
                    <Badge
                      variant="secondary"
                      className="h-5 px-1.5 font-mono text-xs font-normal"
                    >
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
                    <div className="flex flex-wrap gap-1">
                      {properties.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="h-5 px-1.5 text-xs font-normal"
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
                    <Badge
                      variant="secondary"
                      className="h-5 px-1.5 text-xs font-normal"
                    >
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
          <div className="prose-noema mt-6 space-y-4 text-foreground">
            {body.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {body.heading ? (
              <h2 className="prose-noema-heading pt-2 text-[1.25rem] leading-snug">
                {body.heading}
              </h2>
            ) : null}
            {body.code ? (
              <div className="overflow-hidden rounded-md border bg-muted/40">
                <div className="flex items-center justify-between border-b bg-muted/60 px-2.5 py-1 font-sans text-xs text-muted-foreground">
                  <span className="font-mono">convex/schema.ts</span>
                  <span className="uppercase tracking-wide">
                    {body.code.language}
                  </span>
                </div>
                <pre className="overflow-x-auto p-3 font-mono text-[12px] leading-relaxed text-foreground">
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
