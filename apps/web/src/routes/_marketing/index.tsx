import { createFileRoute } from "@tanstack/react-router"

import { Hero } from "@/components/landing/hero"

export const Route = createFileRoute("/_marketing/")({
  component: LandingPage,
})

function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
    </main>
  )
}
