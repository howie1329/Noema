import { ArrowUp, Mic, Plus, Sparkles, X } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { cn } from "@workspace/ui/lib/utils"

import {
  FIXTURE_CHAT_SUGGESTIONS,
  getFixtureChatMessages,
  type FixtureItem,
} from "@/lib/shell-fixtures"

type ChatPanelProps = {
  focusedItem: FixtureItem
  className?: string
  onClose?: () => void
}

export function ChatPanel({ focusedItem, className, onClose }: ChatPanelProps) {
  const messages = getFixtureChatMessages(focusedItem.title)
  const scopeLabel =
    focusedItem.kind === "note" ? `Scoped to ${focusedItem.title}` : "Noema"

  return (
    <aside
      className={cn(
        "shell-glass-pane flex min-h-0 w-[min(22rem,30vw)] shrink-0 flex-col text-xs",
        className
      )}
    >
      <header className="flex h-10 shrink-0 items-center gap-2 border-b border-border/40 px-2.5">
        <Sparkles className="size-3.5 shrink-0 text-violet-600 dark:text-violet-400" />
        <span className="min-w-0 flex-1 truncate font-medium">Ask Noema</span>
        {onClose ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="size-6 text-muted-foreground"
            onClick={onClose}
            aria-label="Close chat panel"
          >
            <X className="size-3" />
          </Button>
        ) : null}
      </header>

      <div className="shrink-0 border-b border-border/30 px-2.5 py-1.5">
        <Badge
          variant="secondary"
          className="h-5 max-w-full truncate px-1.5 font-normal"
        >
          {scopeLabel}
        </Badge>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-3 px-2.5 py-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[95%] text-xs leading-relaxed",
                message.role === "user"
                  ? "ml-auto rounded-2xl rounded-br-md bg-foreground/8 px-3 py-2 text-foreground dark:bg-white/10"
                  : "text-foreground/90"
              )}
            >
              {message.role === "assistant" ? (
                <span className="mb-1 block text-[10px] font-medium text-muted-foreground">
                  Noema
                </span>
              ) : null}
              {message.content}
            </div>
          ))}

          <div className="rounded-lg border border-border/50 bg-background/40 px-2.5 py-2 dark:bg-black/20">
            <p className="text-[10px] font-medium text-muted-foreground">
              Suggested edit
            </p>
            <p className="mt-1 font-mono text-[11px] leading-relaxed">
              <span className="text-red-600/90 line-through dark:text-red-400/90">
                v.literal(&quot;blocked&quot;),
              </span>{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                v.literal(&quot;blocked&quot;), // requires review note
              </span>
            </p>
            <div className="mt-2 flex gap-1">
              <Button
                type="button"
                variant="outline"
                size="xs"
                className="h-6"
                disabled
              >
                Reject
              </Button>
              <Button type="button" size="xs" className="h-6" disabled>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="shrink-0 border-t border-border/40 px-2.5 pt-2 pb-2.5">
        <div className="mb-2 flex flex-wrap gap-1">
          {FIXTURE_CHAT_SUGGESTIONS.map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-full border border-border/60 bg-background/50 px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-2 py-1 shadow-sm dark:bg-black/25">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="size-6 shrink-0 text-muted-foreground"
            aria-label="Attach"
          >
            <Plus className="size-3" />
          </Button>
          <input
            readOnly
            placeholder="Chat, delegate, or search…"
            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground/80"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="size-6 shrink-0 text-muted-foreground"
            aria-label="Dictate"
          >
            <Mic className="size-3" />
          </Button>
          <Button
            type="button"
            size="icon-xs"
            className="size-6 shrink-0 rounded-full"
            aria-label="Send"
          >
            <ArrowUp className="size-3" />
          </Button>
        </div>
      </div>
    </aside>
  )
}