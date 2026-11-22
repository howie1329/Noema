import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app")({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="min-h-dvh bg-zinc-100 text-foreground dark:bg-zinc-950">
      <Outlet />
    </div>
  )
}