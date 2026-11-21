import { Outlet, createFileRoute } from "@tanstack/react-router"

import { LandingFooter } from "@/components/landing/landing-footer"
import { LandingNav } from "@/components/landing/landing-nav"

export const Route = createFileRoute("/_marketing")({
  component: MarketingLayout,
})

function MarketingLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <LandingNav />
      <div className="flex-1">
        <Outlet />
      </div>
      <LandingFooter />
    </div>
  )
}