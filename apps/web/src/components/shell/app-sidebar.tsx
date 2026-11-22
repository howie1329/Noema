import {
  Bell,
  BookOpen,
  ChevronRight,
  FileText,
  Folder,
  Home,
  MessageSquare,
  PanelLeftClose,
  Plus,
  Search,
  Settings,
  Sparkles,
  SunMoon,
  Trash2,
} from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@workspace/ui/components/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { cn } from "@workspace/ui/lib/utils"

import {
  FIXTURE_FAVORITE_IDS,
  FIXTURE_ITEMS,
  FIXTURE_PROJECTS,
  FIXTURE_RECENT_IDS,
  FIXTURE_WORKSPACE_NAME,
  type FixtureItem,
  type ShellMode,
} from "@/lib/shell-fixtures"

type AppSidebarProps = {
  mode: ShellMode
  onModeChange: (mode: ShellMode) => void
  focusedId: string
  onSelectItem: (itemId: string) => void
  onCollapse: () => void
}

const CHAT_ITEMS = Object.values(FIXTURE_ITEMS).filter(
  (item) => item.kind === "chat"
)

const LIBRARY_ITEMS = Object.values(FIXTURE_ITEMS).filter(
  (item) => item.kind === "note"
)

function SidebarItemRow({
  item,
  isActive,
  onSelect,
}: {
  item: FixtureItem
  isActive: boolean
  onSelect: () => void
}) {
  const Icon = item.kind === "chat" ? MessageSquare : FileText

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        onClick={onSelect}
        render={<button type="button" />}
      >
        <Icon />
        <span>{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function SidebarItemList({
  itemIds,
  focusedId,
  onSelectItem,
}: {
  itemIds: string[]
  focusedId: string
  onSelectItem: (itemId: string) => void
}) {
  return (
  <>
    {itemIds.map((itemId) => (
      <SidebarItemRow
        key={itemId}
        item={FIXTURE_ITEMS[itemId]}
        isActive={focusedId === itemId}
        onSelect={() => onSelectItem(itemId)}
      />
    ))}
  </>
  )
}

function HomeModeContent({
  focusedId,
  onSelectItem,
}: {
  focusedId: string
  onSelectItem: (itemId: string) => void
}) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Favorites</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarItemList
              itemIds={FIXTURE_FAVORITE_IDS}
              focusedId={focusedId}
              onSelectItem={onSelectItem}
            />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {FIXTURE_PROJECTS.map((project) => (
              <Collapsible
                key={project.id}
                defaultOpen
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    className={cn(
                      "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm",
                      "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      "[&[data-panel-open]_svg.chevron]:rotate-90"
                    )}
                  >
                    <ChevronRight className="chevron size-4 shrink-0 transition-transform" />
                    <Folder className="size-4 shrink-0" />
                    <span className="truncate">{project.name}</span>
                    {project.count != null ? (
                      <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                        {project.count}
                      </span>
                    ) : null}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {project.itemIds.map((itemId) => (
                        <SidebarMenuSubItem key={itemId}>
                          <SidebarMenuSubButton
                            isActive={focusedId === itemId}
                            onClick={() => onSelectItem(itemId)}
                            render={<button type="button" />}
                          >
                            <span>{FIXTURE_ITEMS[itemId].title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Recent</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarItemList
              itemIds={FIXTURE_RECENT_IDS}
              focusedId={focusedId}
              onSelectItem={onSelectItem}
            />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}

function ChatsModeContent({
  focusedId,
  onSelectItem,
}: {
  focusedId: string
  onSelectItem: (itemId: string) => void
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {CHAT_ITEMS.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={focusedId === item.id}
                onClick={() => onSelectItem(item.id)}
                render={<button type="button" />}
              >
                <MessageSquare />
                <span className="flex flex-col items-start gap-0.5 overflow-hidden text-left">
                  <span className="truncate w-full">{item.title}</span>
                  {item.preview ? (
                    <span className="truncate w-full text-xs font-normal text-muted-foreground">
                      {item.preview}
                    </span>
                  ) : null}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function LibraryModeContent({
  focusedId,
  onSelectItem,
}: {
  focusedId: string
  onSelectItem: (itemId: string) => void
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Notes</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {LIBRARY_ITEMS.map((item) => (
            <SidebarItemRow
              key={item.id}
              item={item}
              isActive={focusedId === item.id}
              onSelect={() => onSelectItem(item.id)}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar({
  mode,
  onModeChange,
  focusedId,
  onSelectItem,
  onCollapse,
}: AppSidebarProps) {
  function handleModeChange(value: string) {
    if (value === "home" || value === "chats" || value === "library") {
      onModeChange(value)
    }
  }

  return (
    <SidebarProvider className="flex h-full min-h-0 w-full">
      <Sidebar collapsible="none" className="h-full w-full border-0 bg-transparent">
        <SidebarHeader className="gap-3 border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="min-w-0 flex-1 truncate text-sm font-semibold">
              {FIXTURE_WORKSPACE_NAME}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="relative shrink-0"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
              <Badge
                variant="secondary"
                className="pointer-events-none absolute -top-0.5 -right-0.5 size-4 justify-center rounded-full p-0 text-[10px]"
              >
                2
              </Badge>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
              aria-label="New"
            >
              <Plus className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
              onClick={onCollapse}
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="size-4" />
            </Button>
          </div>

          <Tabs value={mode} onValueChange={handleModeChange}>
            <TabsList className="grid h-8 w-full grid-cols-3">
              <TabsTrigger value="home" className="gap-1.5 px-2 text-xs">
                <Home className="size-3.5" />
                Home
              </TabsTrigger>
              <TabsTrigger value="chats" className="gap-1.5 px-2 text-xs">
                <MessageSquare className="size-3.5" />
                Chats
              </TabsTrigger>
              <TabsTrigger value="library" className="gap-1.5 px-2 text-xs">
                <BookOpen className="size-3.5" />
                Library
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<button type="button" />}>
                <Search />
                <span>Search</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton render={<button type="button" />}>
                <Sparkles className="text-violet-600 dark:text-violet-400" />
                <span>Ask Noema</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton render={<button type="button" />}>
                <Plus />
                <span>New tab</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {mode === "home" ? (
            <HomeModeContent
              focusedId={focusedId}
              onSelectItem={onSelectItem}
            />
          ) : null}
          {mode === "chats" ? (
            <ChatsModeContent
              focusedId={focusedId}
              onSelectItem={onSelectItem}
            />
          ) : null}
          {mode === "library" ? (
            <LibraryModeContent
              focusedId={focusedId}
              onSelectItem={onSelectItem}
            />
          ) : null}
        </SidebarContent>

        <SidebarFooter className="border-t pt-2">
          <div className="flex items-center justify-between gap-1 px-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Trash"
            >
              <Trash2 className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Appearance"
            >
              <SunMoon className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Settings"
            >
              <Settings className="size-4" />
            </Button>
          </div>
          <p className="px-1 text-[10px] leading-snug text-muted-foreground">
            Click replaces · ⌥ adds pane · ⌘ new tab
          </p>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}