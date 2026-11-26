import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  PanelRightOpen,
  Share2,
  Star,
  X,
} from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area"
import { cn } from "@workspace/ui/lib/utils"

import { ChatStub } from "@/components/shell/chat-stub"
import { NoteFixture } from "@/components/shell/note-fixture"
import {
  FIXTURE_ITEMS,
  type FixtureItem,
  type OpenTab,
} from "@/lib/shell-fixtures"

type MainAreaProps = {
  sidebarOpen: boolean
  onExpandSidebar: () => void
  openTabs: OpenTab[]
  focusedItem: FixtureItem
  onSelectTab: (itemId: string) => void
  onCloseTab: (itemId: string) => void
}

export function MainArea({
  sidebarOpen,
  onExpandSidebar,
  openTabs,
  focusedItem,
  onSelectTab,
  onCloseTab,
}: MainAreaProps) {
  const focusedId = focusedItem.id

  return (
    <div className="flex h-full min-h-0 flex-col text-xs">
      <header className="flex h-11 shrink-0 items-center justify-between gap-2 border-b border-border/50 px-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {!sidebarOpen ? (
            <Button
              variant="ghost"
              size="icon-xs"
              className="size-6 text-muted-foreground"
              onClick={onExpandSidebar}
              aria-label="Expand sidebar"
            >
              <PanelRightOpen className="size-3.5" />
            </Button>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="size-6 text-muted-foreground"
            aria-label="Back"
            disabled
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="size-6 text-muted-foreground"
            aria-label="Forward"
            disabled
          >
            <ChevronRight className="size-3.5" />
          </Button>
          <ScrollArea className="min-w-0 flex-1 whitespace-nowrap">
            <div className="flex items-center gap-1 pr-1">
              {openTabs.map((tab) => {
                const item = FIXTURE_ITEMS[tab.itemId]
                const isActive = tab.itemId === focusedId
                const canClose = openTabs.length > 1

                return (
                  <div
                    key={tab.id}
                    className={cn(
                      "group flex h-6 max-w-[8.5rem] shrink-0 items-center gap-0.5 rounded-full border px-2 text-[11px]",
                      isActive
                        ? "border-border bg-muted font-medium text-foreground"
                        : "border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                    )}
                  >
                    <button
                      type="button"
                      className="min-w-0 truncate text-left"
                      onClick={() => onSelectTab(tab.itemId)}
                    >
                      {item.title}
                    </button>
                    {canClose ? (
                      <button
                        type="button"
                        className={cn(
                          "rounded p-0.5 hover:bg-muted",
                          isActive
                            ? "opacity-60"
                            : "opacity-0 group-hover:opacity-60"
                        )}
                        aria-label={`Close ${item.title}`}
                        onClick={(event) => {
                          event.stopPropagation()
                          onCloseTab(tab.itemId)
                        }}
                      >
                        <X className="size-2.5" />
                      </button>
                    ) : null}
                  </div>
                )
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-0.5">
          <Badge
            variant="secondary"
            className="hidden h-5 px-1.5 text-[11px] font-normal sm:inline-flex"
          >
            Saved
          </Badge>
          <Button
            variant="ghost"
            size="icon-xs"
            className="size-6 text-muted-foreground"
            aria-label="Share"
            disabled
          >
            <Share2 className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            className="size-6 text-muted-foreground"
            aria-label="Favorite"
            disabled
          >
            <Star className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            className="size-6 text-muted-foreground"
            aria-label="More options"
            disabled
          >
            <Ellipsis className="size-3.5" />
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col bg-editor">
        {focusedItem.kind === "chat" ? (
          <ChatStub item={focusedItem} />
        ) : (
          <NoteFixture item={focusedItem} />
        )}
      </div>
    </div>
  )
}