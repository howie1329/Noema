import { PanelRightOpen } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

type MainAreaProps = {
  sidebarOpen: boolean
  onExpandSidebar: () => void
}

export function MainArea({ sidebarOpen, onExpandSidebar }: MainAreaProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
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
      </header>
      <div className="flex flex-1 items-center justify-center p-4 text-sm text-muted-foreground">
        Main area
      </div>
    </div>
  )
}