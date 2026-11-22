import { PanelLeftClose } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

type AppSidebarProps = {
  onCollapse: () => void
}

export function AppSidebar({ onCollapse }: AppSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-end border-b p-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onCollapse}
          aria-label="Collapse sidebar"
        >
          <PanelLeftClose />
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-center p-4 text-sm text-muted-foreground">
        Sidebar
      </div>
    </div>
  )
}