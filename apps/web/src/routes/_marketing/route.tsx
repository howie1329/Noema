import { Outlet, createFileRoute } from "@tanstack/react-router"

import { LandingFooter } from "@/components/landing/landing-footer"
import { LandingAuthProvider } from "@/components/landing/landing-auth"
import { LandingNav } from "@/components/landing/landing-nav"

export const Route = createFileRoute("/_marketing")({
  component: MarketingLayout,
})

function MarketingLayout() {
  return (
    <LandingAuthProvider>
      <div className="flex min-h-svh flex-col bg-background">
        <LandingNav />
        <div className="flex-1">
          <Outlet />
        </div>
        <LandingFooter />
      </div>
    </LandingAuthProvider>
  )
}