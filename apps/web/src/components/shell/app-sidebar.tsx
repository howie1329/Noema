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
        size="sm"
        isActive={isActive}
        onClick={onSelect}
        render={<button type="button" />}
        className="rounded-md px-2 [&_svg]:size-3.5"
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
      <SidebarGroup className="py-1">
        <SidebarGroupLabel className="h-6 px-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          Favorites
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-0.5">
            <SidebarItemList
              itemIds={FIXTURE_FAVORITE_IDS}
              focusedId={focusedId}
              onSelectItem={onSelectItem}
            />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup className="py-1">
        <SidebarGroupLabel className="h-6 px-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          Projects
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-0.5">
            {FIXTURE_PROJECTS.map((project) => (
              <Collapsible
                key={project.id}
                defaultOpen
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    className={cn(
                      "flex h-7 w-full items-center gap-1.5 rounded-md px-2 text-left text-xs",
                      "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      "[&[data-panel-open]_svg.chevron]:rotate-90"
                    )}
                  >
                    <ChevronRight className="chevron size-3.5 shrink-0 transition-transform" />
                    <Folder className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate">{project.name}</span>
                    {project.count != null ? (
                      <span className="ml-auto text-[10px] text-muted-foreground tabular-nums">
                        {project.count}
                      </span>
                    ) : null}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="mx-0 ml-3.5 gap-0.5 border-l border-sidebar-border px-0 pl-2">
                      {project.itemIds.map((itemId) => (
                        <SidebarMenuSubItem key={itemId}>
                          <SidebarMenuSubButton
                            size="sm"
                            isActive={focusedId === itemId}
                            onClick={() => onSelectItem(itemId)}
                            render={<button type="button" />}
                            className="h-7 rounded-md px-2 text-xs [&_svg]:size-3.5"
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

      <SidebarGroup className="py-1">
        <SidebarGroupLabel className="h-6 px-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          Recent
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-0.5">
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
    <SidebarGroup className="py-1">
      <SidebarGroupLabel className="h-6 px-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        Chats
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5">
          {CHAT_ITEMS.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                size="sm"
                isActive={focusedId === item.id}
                onClick={() => onSelectItem(item.id)}
                render={<button type="button" />}
                className="h-auto min-h-7 items-start rounded-md px-2 py-1.5 [&_svg]:mt-0.5 [&_svg]:size-3.5"
              >
                <MessageSquare />
                <span className="flex min-w-0 flex-col items-start gap-0 overflow-hidden text-left">
                  <span className="w-full truncate text-xs">{item.title}</span>
                  {item.preview ? (
                    <span className="w-full truncate text-[10px] font-normal text-muted-foreground">
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
    <SidebarGroup className="py-1">
      <SidebarGroupLabel className="h-6 px-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        Notes
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5">
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
      <Sidebar
        collapsible="none"
        className="h-full w-full border-0 bg-transparent text-xs"
      >
        <SidebarHeader className="gap-2 border-b px-2 py-2">
          <div className="flex items-center gap-0.5">
            <span className="min-w-0 flex-1 truncate px-1 text-xs font-medium tracking-tight">
              {FIXTURE_WORKSPACE_NAME}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="relative size-7 shrink-0 text-muted-foreground"
              aria-label="Notifications"
            >
              <Bell className="size-3.5" />
              <Badge
                variant="secondary"
                className="pointer-events-none absolute -top-0.5 -right-0.5 size-3.5 justify-center rounded-full p-0 text-[9px] leading-none"
              >
                2
              </Badge>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="size-7 shrink-0 text-muted-foreground"
              aria-label="New"
            >
              <Plus className="size-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="size-7 shrink-0 text-muted-foreground"
              onClick={onCollapse}
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="size-3.5" />
            </Button>
          </div>

          <Tabs value={mode} onValueChange={handleModeChange}>
            <TabsList className="grid h-7 w-full grid-cols-3 p-0.5">
              <TabsTrigger value="home" className="gap-1 px-1.5 text-[11px]">
                <Home className="size-3" />
                Home
              </TabsTrigger>
              <TabsTrigger value="chats" className="gap-1 px-1.5 text-[11px]">
                <MessageSquare className="size-3" />
                Chats
              </TabsTrigger>
              <TabsTrigger
                value="library"
                className="gap-1 px-1.5 text-[11px]"
              >
                <BookOpen className="size-3" />
                Library
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <SidebarMenu className="gap-0.5">
            <SidebarMenuItem>
              <SidebarMenuButton
                size="sm"
                render={<button type="button" />}
                className="rounded-md px-2 text-muted-foreground [&_svg]:size-3.5"
              >
                <Search />
                <span>Search</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="sm"
                render={<button type="button" />}
                className="rounded-md px-2 [&_svg]:size-3.5"
              >
                <Sparkles className="text-violet-600 dark:text-violet-400" />
                <span>Ask Noema</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="sm"
                render={<button type="button" />}
                className="rounded-md px-2 text-muted-foreground [&_svg]:size-3.5"
              >
                <Plus />
                <span>New tab</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="gap-0 px-1 py-1">
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

        <SidebarFooter className="border-t px-1.5 py-1.5">
          <div className="flex items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="size-7 text-muted-foreground"
              aria-label="Trash"
            >
              <Trash2 className="size-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="size-7 text-muted-foreground"
              aria-label="Appearance"
            >
              <SunMoon className="size-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="ml-auto size-7 text-muted-foreground"
              aria-label="Settings"
            >
              <Settings className="size-3.5" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}