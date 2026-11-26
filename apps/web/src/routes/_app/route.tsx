import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app")({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="h-dvh overflow-hidden text-foreground">
      <Outlet />
    </div>
  )
}