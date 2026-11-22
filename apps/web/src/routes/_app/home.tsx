import { createFileRoute } from "@tanstack/react-router"

import { WorkspaceShell } from "@/components/shell/workspace-shell"

export const Route = createFileRoute("/_app/home")({
  component: HomePage,
})

function HomePage() {
  return <WorkspaceShell />
}