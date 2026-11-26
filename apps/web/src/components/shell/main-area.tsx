import {
  Ellipsis,
  FileText,
  MessageSquare,
  PanelRightOpen,
  Share2,
  Star,
  X,
} from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
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
  const breadcrumbSegments = focusedItem.breadcrumbs ?? [focusedItem.title]

  return (
    <div className="flex h-full min-h-0 flex-col text-xs">
      <div className="flex h-8 shrink-0 items-end border-b bg-muted/30 px-1">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex h-8 items-end gap-0.5 px-0.5">
            {openTabs.map((tab) => {
              const item = FIXTURE_ITEMS[tab.itemId]
              const isActive = tab.itemId === focusedId
              const Icon = item.kind === "chat" ? MessageSquare : FileText
              const canClose = openTabs.length > 1

              return (
                <div
                  key={tab.id}
                  className={cn(
                    "group flex h-7 max-w-[10rem] shrink-0 items-center gap-1 rounded-t-md border border-b-0 px-1.5 text-xs",
                    isActive
                      ? "border-border bg-card text-foreground shadow-xs"
                      : "border-transparent bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <button
                    type="button"
                    className="flex min-w-0 flex-1 items-center gap-1 text-left"
                    onClick={() => onSelectTab(tab.itemId)}
                  >
                    <Icon className="size-3 shrink-0 opacity-70" />
                    <span className="truncate">{item.title}</span>
                  </button>
                  {canClose ? (
                    <button
                      type="button"
                      className={cn(
                        "rounded p-0.5 transition-opacity hover:bg-muted",
                        isActive
                          ? "opacity-70 hover:opacity-100"
                          : "opacity-0 group-hover:opacity-70"
                      )}
                      aria-label={`Close ${item.title}`}
                      onClick={(event) => {
                        event.stopPropagation()
                        onCloseTab(tab.itemId)
                      }}
                    >
                      <X className="size-3" />
                    </button>
                  ) : null}
                </div>
              )
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <header className="flex h-9 shrink-0 items-center gap-1.5 border-b px-2.5">
        {!sidebarOpen ? (
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-7 text-muted-foreground"
            onClick={onExpandSidebar}
            aria-label="Expand sidebar"
          >
            <PanelRightOpen className="size-3.5" />
          </Button>
        ) : null}

        <Breadcrumb className="min-w-0 flex-1">
          <BreadcrumbList className="flex-nowrap gap-1 overflow-hidden text-xs sm:gap-1.5">
            {breadcrumbSegments.map((segment, index) => {
              const isLast = index === breadcrumbSegments.length - 1
              return (
                <span key={`${segment}-${index}`} className="contents">
                  {index > 0 ? (
                    <BreadcrumbSeparator className="[&>svg]:size-3" />
                  ) : null}
                  <BreadcrumbItem className="min-w-0">
                    {isLast ? (
                      <BreadcrumbPage className="truncate text-xs font-normal">
                        {segment}
                      </BreadcrumbPage>
                    ) : (
                      <span className="truncate text-muted-foreground">
                        {segment}
                      </span>
                    )}
                  </BreadcrumbItem>
                </span>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex shrink-0 items-center gap-0.5">
          <Badge
            variant="secondary"
            className="h-5 px-1.5 text-xs font-normal"
          >
            Saved
          </Badge>
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-7 text-muted-foreground"
            aria-label="Share"
            disabled
          >
            <Share2 className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-7 text-muted-foreground"
            aria-label="Favorite"
            disabled
          >
            <Star className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-7 text-muted-foreground"
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
