import { Outlet, createFileRoute } from "@tanstack/react-router"

import { LandingNav } from "@/components/landing/landing-nav"

export const Route = createFileRoute("/_marketing")({
  component: MarketingLayout,
})

function MarketingLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-zinc-100 text-foreground selection:bg-foreground selection:text-background dark:bg-zinc-950">
      <LandingNav />
      <Outlet />
    </div>
  )
}
