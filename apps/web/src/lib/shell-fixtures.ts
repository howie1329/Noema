export type ShellMode = "home" | "chats" | "library"

export type OpenTab = { id: string; itemId: string }

export type FixtureKind = "note" | "chat"

export type FixtureItem = {
  id: string
  kind: FixtureKind
  title: string
  projectId?: string
  favorite?: boolean
  // note-only fields used by NoteFixture
  breadcrumbs?: string[]
  properties?: {
    type?: string
    project?: string
    tags?: string[]
    linkedFromCount?: number
    status?: string
    created?: string
    updated?: string
  }
  body?: {
    paragraphs: string[]
    heading?: string
    code?: { language: string; content: string }
  }
  // chat stub
  preview?: string
}

export type FixtureProject = {
  id: string
  name: string
  itemIds: string[]
  count?: number
}

export const FIXTURE_WORKSPACE_NAME = "Noema"

export const FIXTURE_ITEMS: Record<string, FixtureItem> = {
  "edges-schema": {
    id: "edges-schema",
    kind: "note",
    title: "Edges schema",
    projectId: "project-noema",
    breadcrumbs: ["Noema", "Schemas", "Edges schema"],
    properties: {
      type: "@schema/edges",
      project: "Noema",
      tags: ["schema", "convex", "relationships"],
      linkedFromCount: 12,
      status: "Active",
      created: "Oct 14, 2025",
      updated: "Nov 18, 2025",
    },
    body: {
      paragraphs: [
        "Soft relationships between notes live in a dedicated Convex table. AI proposes edges; nothing becomes explicit structure until you accept it in the review queue.",
        "Statuses flow proposed → accepted | rejected | blocked. Accepted edges inform chat context and sidebar hints but never overwrite wikilinks or folders.",
      ],
      heading: "Shape",
      code: {
        language: "typescript",
        content: `// convex/schema.ts — edges table
edges: defineTable({
  source: v.id("notes"),
  target: v.id("notes"),
  confidence: v.number(),
  reason: v.string(),
  status: v.union(
    v.literal("proposed"),
    v.literal("accepted"),
    v.literal("rejected"),
    v.literal("blocked"),
  ),
})
  .index("by_source", ["source"])
  .index("by_target", ["target"])
  .index("by_status", ["status"])`,
      },
    },
  },
  "auto-linking-design": {
    id: "auto-linking-design",
    kind: "note",
    title: "Auto-linking design",
    projectId: "project-noema",
    favorite: true,
    breadcrumbs: ["Noema", "Auto-linking design"],
    properties: {
      type: "@note/design",
      project: "Noema",
      tags: ["auto-linking", "review-queue"],
      linkedFromCount: 8,
      status: "Draft",
      created: "Sep 2, 2025",
      updated: "Nov 10, 2025",
    },
    body: {
      paragraphs: [
        "Proposal pipeline: embed chunks, score candidate pairs, surface top-N in the review queue with confidence and human-readable reasons.",
        "Blocked pairs respect explicit structure the user has already rejected or pinned.",
      ],
    },
  },
  "command-bar-routing": {
    id: "command-bar-routing",
    kind: "note",
    title: "Command bar routing",
    projectId: "project-noema",
    breadcrumbs: ["Noema", "Command bar routing"],
    properties: {
      type: "@note/rfc",
      project: "Noema",
      tags: ["command-bar", "navigation"],
      linkedFromCount: 5,
      status: "Active",
      created: "Oct 1, 2025",
      updated: "Nov 5, 2025",
    },
    body: {
      paragraphs: [
        "The command bar is the primary navigation surface: jump to notes, run actions, and open the Ask flow without leaving the keyboard.",
        "Routes are fixture-driven for the shell preview; later they map to Convex queries and Clerk-scoped workspaces.",
      ],
    },
  },
  "subnetting-cheatsheet": {
    id: "subnetting-cheatsheet",
    kind: "note",
    title: "Subnetting cheatsheet",
    favorite: true,
    breadcrumbs: ["Library", "Subnetting cheatsheet"],
    properties: {
      type: "@note/reference",
      tags: ["networking", "cheatsheet"],
      linkedFromCount: 3,
      status: "Stable",
      created: "Aug 20, 2025",
      updated: "Sep 15, 2025",
    },
    body: {
      paragraphs: [
        "Quick CIDR ↔ host count reference for lab work. /24 = 256 addresses, /26 = 64, and so on.",
      ],
    },
  },
  "review-queue-ux": {
    id: "review-queue-ux",
    kind: "note",
    title: "Review queue UX",
    projectId: "project-noema",
    breadcrumbs: ["Noema", "Review queue UX"],
    properties: {
      type: "@note/design",
      project: "Noema",
      tags: ["ui", "review-queue"],
      linkedFromCount: 4,
      status: "Draft",
      created: "Oct 22, 2025",
      updated: "Nov 12, 2025",
    },
    body: {
      paragraphs: [
        "Batch accept/reject with keyboard shortcuts. Each row shows source excerpt, target title, confidence, and the model's reason.",
      ],
    },
  },
  "chat-edges-explainer": {
    id: "chat-edges-explainer",
    kind: "chat",
    title: "Explain edges table",
    preview: "Walk me through how proposed edges differ from explicit wikilinks…",
  },
  "chat-subnetting-quiz": {
    id: "chat-subnetting-quiz",
    kind: "chat",
    title: "Subnetting practice",
    preview: "Give me five /24 split exercises with answers hidden.",
  },
  "chat-auto-link-pairing": {
    id: "chat-auto-link-pairing",
    kind: "chat",
    title: "Pair notes for review",
    preview: "Which notes in Noema project should I link to Edges schema?",
  },
}

export const FIXTURE_PROJECTS: FixtureProject[] = [
  {
    id: "project-noema",
    name: "Noema",
    itemIds: ["edges-schema", "auto-linking-design", "command-bar-routing"],
    count: 3,
  },
]

export const FIXTURE_FAVORITE_IDS: string[] = [
  "auto-linking-design",
  "subnetting-cheatsheet",
]

export const FIXTURE_RECENT_IDS: string[] = [
  "edges-schema",
  "auto-linking-design",
  "command-bar-routing",
  "review-queue-ux",
]

export const DEFAULT_FOCUSED_ID = "edges-schema"