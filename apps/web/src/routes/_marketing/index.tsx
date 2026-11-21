import { createFileRoute } from "@tanstack/react-router"

import { FeatureSection } from "@/components/landing/feature-section"
import { Hero } from "@/components/landing/hero"
import { ProductPreview } from "@/components/landing/product-preview"

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
      <ProductPreview />
      {FEATURES.map((feature) => (
        <FeatureSection
          key={feature.id}
          id={feature.id}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </main>
  )
}