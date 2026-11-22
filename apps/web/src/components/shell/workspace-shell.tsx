import { useCallback, useEffect, useState } from "react"

import { AppSidebar } from "@/components/shell/app-sidebar"
import { MainArea } from "@/components/shell/main-area"
import {
  DEFAULT_FOCUSED_ID,
  type ShellMode,
} from "@/lib/shell-fixtures"

const cardChrome =
  "flex min-h-0 flex-col overflow-hidden rounded-xl border bg-card shadow-sm"

export function WorkspaceShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mode, setMode] = useState<ShellMode>("home")
  const [focusedId, setFocusedId] = useState(DEFAULT_FOCUSED_ID)

  const selectItem = useCallback((itemId: string) => {
    setFocusedId(itemId)
  }, [])

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
        />
      </section>
    </div>
  )
}