import { useCallback, useEffect, useState } from "react"

import { AppSidebar } from "@/components/shell/app-sidebar"
import { MainArea } from "@/components/shell/main-area"
import {
  DEFAULT_FOCUSED_ID,
  FIXTURE_ITEMS,
  type OpenTab,
  type ShellMode,
} from "@/lib/shell-fixtures"

const cardChrome =
  "flex min-h-0 flex-col overflow-hidden rounded-xl border bg-card shadow-sm"

function createOpenTab(itemId: string): OpenTab {
  return { id: itemId, itemId }
}

export function WorkspaceShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mode, setMode] = useState<ShellMode>("home")
  const [focusedId, setFocusedId] = useState(DEFAULT_FOCUSED_ID)
  const [openTabs, setOpenTabs] = useState<OpenTab[]>(() => [
    createOpenTab(DEFAULT_FOCUSED_ID),
  ])

  const selectItem = useCallback((itemId: string) => {
    setFocusedId(itemId)
  }, [])

  const selectTab = useCallback((itemId: string) => {
    setFocusedId(itemId)
  }, [])

  const closeTab = useCallback(
    (itemId: string) => {
      setOpenTabs((tabs) => {
        if (tabs.length <= 1) return tabs
        const next = tabs.filter((tab) => tab.itemId !== itemId)
        if (focusedId === itemId) {
          const closedIndex = tabs.findIndex((tab) => tab.itemId === itemId)
          const nextFocus =
            next[Math.min(closedIndex, next.length - 1)]?.itemId ??
            DEFAULT_FOCUSED_ID
          setFocusedId(nextFocus)
        }
        return next
      })
    },
    [focusedId]
  )

  useEffect(() => {
    setOpenTabs((tabs) => {
      if (tabs.some((tab) => tab.itemId === focusedId)) return tabs
      return [...tabs, createOpenTab(focusedId)]
    })
  }, [focusedId])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((open) => !open)
  }, [])

  const expandSidebar = useCallback(() => {
    setSidebarOpen(true)
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey && event.key === "\\") {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [toggleSidebar])

  const focusedItem = FIXTURE_ITEMS[focusedId] ?? FIXTURE_ITEMS[DEFAULT_FOCUSED_ID]

  return (
    <div className="flex h-dvh gap-2 p-2">
      {sidebarOpen ? (
        <aside className={`w-64 shrink-0 ${cardChrome}`}>
          <AppSidebar
            mode={mode}
            onModeChange={setMode}
            focusedId={focusedId}
            onSelectItem={selectItem}
            onCollapse={toggleSidebar}
          />
        </aside>
      ) : null}
      <section className={`min-w-0 flex-1 ${cardChrome}`}>
        <MainArea
          sidebarOpen={sidebarOpen}
          onExpandSidebar={expandSidebar}
          openTabs={openTabs}
          focusedItem={focusedItem}
          onSelectTab={selectTab}
          onCloseTab={closeTab}
        />
      </section>
    </div>
  )
}