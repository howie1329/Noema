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

import {
  FIXTURE_ITEMS,
  type OpenTab,
} from "@/lib/shell-fixtures"

type MainAreaProps = {
  sidebarOpen: boolean
  onExpandSidebar: () => void
  openTabs: OpenTab[]
  focusedId: string
  onSelectTab: (itemId: string) => void
  onCloseTab: (itemId: string) => void
}

export function MainArea({
  sidebarOpen,
  onExpandSidebar,
  openTabs,
  focusedId,
  onSelectTab,
  onCloseTab,
}: MainAreaProps) {
  const focusedItem = FIXTURE_ITEMS[focusedId]
  const breadcrumbSegments =
    focusedItem.breadcrumbs ?? [focusedItem.title]

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-9 shrink-0 items-end border-b bg-muted/30 px-1">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex h-9 items-end gap-0.5 px-1">
            {openTabs.map((tab) => {
              const item = FIXTURE_ITEMS[tab.itemId]
              const isActive = tab.itemId === focusedId
              const Icon = item.kind === "chat" ? MessageSquare : FileText
              const canClose = openTabs.length > 1

              return (
                <div
                  key={tab.id}
                  className={cn(
                    "group flex h-8 max-w-[11rem] shrink-0 items-center gap-1 rounded-t-md border border-b-0 px-2 text-xs",
                    isActive
                      ? "border-border bg-card text-foreground shadow-xs"
                      : "border-transparent bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <button
                    type="button"
                    className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
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

      <header className="flex h-11 shrink-0 items-center gap-2 border-b px-3">
        {!sidebarOpen ? (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onExpandSidebar}
            aria-label="Expand sidebar"
          >
            <PanelRightOpen />
          </Button>
        ) : null}

        <Breadcrumb className="min-w-0 flex-1">
          <BreadcrumbList className="flex-nowrap overflow-hidden">
            {breadcrumbSegments.map((segment, index) => {
              const isLast = index === breadcrumbSegments.length - 1
              return (
                <span key={`${segment}-${index}`} className="contents">
                  {index > 0 ? <BreadcrumbSeparator /> : null}
                  <BreadcrumbItem className="min-w-0">
                    {isLast ? (
                      <BreadcrumbPage className="truncate">
                        {segment}
                      </BreadcrumbPage>
                    ) : (
                      <span className="truncate">{segment}</span>
                    )}
                  </BreadcrumbItem>
                </span>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex shrink-0 items-center gap-1">
          <Badge variant="secondary" className="font-normal">
            Saved
          </Badge>
          <Button variant="ghost" size="icon-sm" aria-label="Share" disabled>
            <Share2 />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Favorite" disabled>
            <Star />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="More options" disabled>
            <Ellipsis />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="text-lg font-medium text-foreground">
          {focusedItem.title}
        </p>
        <p className="text-sm text-muted-foreground">
          Note and chat content arrives in the next task.
        </p>
      </div>
    </div>
  )
}