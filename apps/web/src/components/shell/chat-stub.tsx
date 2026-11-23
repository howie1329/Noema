import { MessageSquare } from "lucide-react"

import { ScrollArea } from "@workspace/ui/components/scroll-area"

import type { FixtureItem } from "@/lib/shell-fixtures"

type ChatStubProps = {
  item: FixtureItem
}

export function ChatStub({ item }: ChatStubProps) {
  return (
    <ScrollArea className="h-full min-h-0 flex-1">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-3 px-5 py-5">
        <div className="flex items-center gap-1.5">
          <MessageSquare className="size-3.5 text-muted-foreground" />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {item.title}
          </h1>
        </div>
        {item.preview ? (
          <p className="text-sm leading-relaxed text-foreground/90">
            {item.preview}
          </p>
        ) : null}
        <p className="text-xs text-muted-foreground">
          Chat panel comes later — this is a preview of the conversation title
          and first message until the right-hand chat column ships.
        </p>
      </div>
    </ScrollArea>
  )
}
