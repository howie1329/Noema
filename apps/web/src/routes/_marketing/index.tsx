import { createFileRoute } from "@tanstack/react-router"

import { FeatureSection } from "@/components/landing/feature-section"
import { Hero } from "@/components/landing/hero"

export const Route = createFileRoute("/_marketing/")({
  component: LandingPage,
})

const FEATURES = [
  {
    id: "notes",
    title: "Notes",
    description:
      "A fast, beautiful editor for personal notes. Markdown stays the source of truth, with live preview as you write.",
  },
  {
    id: "auto-linking",
    title: "Auto-linking",
    description:
      "AI proposes links across notes, PDFs, and chats. Nothing becomes real until you accept it in the review queue.",
  },
  {
    id: "chat",
    title: "Chat",
    description:
      "Ask anything with the same ease as ChatGPT, scoped to the note or project you are in so answers start from your context.",
  },
  {
    id: "privacy",
    title: "Privacy",
    description:
      "Your data is yours. Real auth, clear privacy, and export anytime — the assistant never applies edits without your review.",
  },
] as const

function LandingPage() {
  return (
    <main>
      <Hero />
      <section
        className="border-t border-border/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        aria-labelledby="features-heading"
      >
        <div className="mx-auto w-full max-w-6xl">
          <h2 id="features-heading" className="sr-only">
            Product capabilities
          </h2>
          <p className="mb-10 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Everything you need in one workspace—without giving up control over
            what the assistant can change.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <FeatureSection
                key={feature.id}
                id={feature.id}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}