# Noema — Product Brief

Last updated: Nov 20, 2026

Supersedes the Google Doc *Project: Second Brain* (rewritten Nov 12, 2026; auto-linking added later). The product is now named **Noema** (no-EE-muh) and will live in a fresh repo, not Cortex. This file reflects decisions made after that doc was written.

## What it is

Noema is a personal AI workspace: the place you think, write, and get things done, and it gets smarter the more you use it.

One-line pitch: "ChatGPT that knows your notes, and notes that can think."

Today thinking is split between a chat app and a notes app, and neither knows about the other. Noema replaces both. The assistant knows your notes, projects, and history, so answers start from your context instead of a blank page. The editor is fast and beautiful, and AI helps without taking over. Every chat, note, and decision builds on the last, so everything compounds.

Think of it as a personal version of Ramp's Glass, centered on notes, chats, and projects.

## v1 goals

1. The default place to ask anything: as good as ChatGPT, plus your context.
2. Where you write: good enough to replace Obsidian or Notion for personal notes.
3. Chats and notes are one thing, connected by projects.
4. It remembers you, with visible, editable memory and corrections that stick.
5. Trustworthy for other people: real auth, privacy, your data is yours, and export anytime.

## Ground rules

- Product first, resume second. The resume value comes from it being real and used by you and others. It is also a job-search showcase, but that follows from shipping something real.
- At most two active projects. Slate 1.2 is the other.
- Ship one killer AI feature first: in-note edit review. Push back on scope creep.
- Be honest about which parts are API wrappers when describing the engineering work. Wrappers are fine as product features.
- Tool budget: about $80–100 a month (Cursor only on the tool side).
- Leave room for hand-coding fundamentals. Example: the 0.0.1 app shell should use the ShadCN Sidebar, with Howard hand-coding that piece.
- Team / "factory" shared-agent features stay out of scope.

## Feel and references

Keep the locked web stack. Use these as feel and feature references, not as architectures to copy:

- **[Tolaria](https://tolaria.md)** — feel and features: typed notes, relationship properties, a rich Markdown editor, per-note version history, and keyboard-first. Do not adopt Tolaria's local files-and-Git architecture.
- **[Moss Notes](https://www.mossnotes.app/)** — another example of where the app should go: calm writing, inline AI comments and suggested edits you review.
- **Tom Solid's typed `@type/name` objects** — create typed objects inline in the note, not only from a separate schema UI.
- **Phil Pitus's generative-UI chat widgets** — Vercel AI SDK 6 typed tool message parts render as React components in the chat.

Violet is used only for AI. Markdown is the source of truth.

## Tech stack

Locked:

- **Architecture:** hybrid. Convex holds data, live sync, search indexes, ownership checks, file storage, and the scheduler. A separate TypeScript agent server runs every AI or model call. If it calls a model or an outside API, it runs on the agent server; Convex never calls models.
- **Frontend:** TanStack Start (Vite) on Vercel, with ShadCN UI. Stays thin: pages, editor, UI, and tiny server functions (for example, the Clerk webhook).
- **Editor:** live-preview Markdown (type `##` and it becomes a heading). Markdown stays the source of truth. This is a later decision; the original brief tentatively named Tiptap and said to revisit it when building the editor. A live-preview editor avoids round-trip bugs between a block model and Markdown.
- **Auth:** Clerk (Google and email sign-in). Clerk JWTs are verified by both Convex and the agent server.
- **Agent server:** Hono on Node, on Railway, using Vercel AI SDK 6. Owns the chat run (auth check, rate limits and usage budget, context building, agent loop with tools, streaming to the browser), tools, memory extraction, embeddings, titles and summaries, and usage and cost tracking.
- **Models:** Vercel AI Gateway, with OpenRouter as a fallback. A strong default model for chat and writing, a cheap fast model for background jobs, a curated model picker from a catalog file, and per-user daily caps and a cost meter. Specific models are chosen at build time.
- **Chat streaming and saving:** the server creates the assistant message in Convex up front with an id and status (`streaming`, `done`, or `error`), streams tokens to the active tab, optionally writes a running copy about every half second, and saves the final message on finish so closing the tab never loses a reply. The UI shows one message per id; the stream shows live text, and Convex takes over when done.
- **Background jobs:** the Convex scheduler triggers jobs that call authenticated agent server endpoints (embeddings after a note save, memory extraction after a chat turn, titles, summaries). No separate queue for v1; add Inngest or BullMQ later only if needed.
- **Search:** Convex vector search plus keyword search for hybrid `search_workspace`. Embeddings use OpenAI `text-embedding-3-small` via the gateway. No separate vector database.
- **Integrations (on the agent server only):** Composio for per-user Gmail, Google Drive, and Notion, attached to chats as sources, not as scope. Web tools: `web_search` via Exa (Tavily as fallback); `read_page` / link capture via Firecrawl; `deep_research` via Parallel (long-running on Hono, results saved as artifacts). All sit behind our own adapters with a shared interface, fallbacks on error or out-of-credits, and per-call cost logging. Benchmark providers with about 10 identical queries before building.
- **Hosting and costs:** Vercel for the frontend, Railway for the agent server (about $5/month minimum), plus Convex, Clerk, and AI Gateway (usage-based). Expected to be mostly free tiers plus Railway and model usage, comfortably within budget.
- **Later, not v1:** a real job queue, observability and tracing (for example, Braintrust), and run cancellation and stream resume polish.

## Killer AI feature

**In-note edit review.** Build this widget first.

The agent proposes edits as inline diffs in the note. You can **Accept**, **Reject**, or **Explain**. Nothing is applied silently. "Continue writing" is only on request. AI ghost text is off by default, with a setting to turn it on.

This was originally listed under 0.9 as "if time allows." That priority has changed: it is the first AI feature to ship, and the portfolio/interview piece that is easiest to show in a real editor.

## Auto-linking / relationships layer

This is Noema's differentiator: AI-proposed edges with a review queue, across notes, links, PDFs, and chats, that also feed chat context. Notes connect themselves, but you stay in charge. AI proposes links, nothing becomes real until you accept it, and AI never edits your explicit structure.

A market check found no product that combines AI-proposed edges with a review queue across those surfaces and also feeds chat context.

### Three-layer model

- **Explicit truth:** folders and manual links (`[[wiki links]]`). This is the base layer, and only you change it.
- **Properties:** tags, dates, source type, and typed `@type/name` objects stamped on each note.
- **Soft relationships:** AI-proposed edges stored in a separate Convex `edges` table with `source`, `target`, `confidence`, `reason`, and `status` (`proposed`, `accepted`, `rejected`, or `blocked`). This layer never writes to or corrupts explicit data.

`blocked` is the persisted form of "never link these two." The original brief listed only proposed / accepted / rejected; `blocked` was added so a never-link survives later passes (both directions).

### Review queue

- Auto-links are always suggestions in a review queue, never applied silently.
- For each suggestion you can **accept**, **reject** once, or **never-link** (status `blocked`) so the pair is never proposed again.
- Accepting flips the status to `accepted`, and the same row renders as a real link. No copy, no second source of truth.
- The next screen to design is this review queue.

### How links are found

- Free signals first: folder membership and shared tags.
- A small model with structured `Output.choice` only for ambiguous cases.
- Model calls are batched to keep cost under control. The notes-screen mockup describes a scheduled (nightly) pass that writes `proposed` rows.

### Where it shows up

- Backlinks on every note, plus AI-suggested links at the bottom of the note (confidence, reason, Accept / Reject / Never, and a link to the review queue).
- Smarter search that surfaces related notes.
- Chat context: opening a chat on a note pulls its accepted relationships into the context window.
- A graph view (listed as a surface here; the original notes roadmap had graph view after v1, so do not treat it as a v1 must-have until it is scoped).

## Command bar and link capture

There is only ever **one AI input** on screen.

- When chat is closed, the Ask bar is the command bar (search, commands, jump, and chat).
- When chat is open, that same bar is the chat input, already scoped to the focused pane.
- Deterministic routing first: URL parse, `/` commands, `@` jump or scope.
- A cheap model with AI SDK 6 `Output.choice` only for ambiguous input, and only on Enter.

**Link capture flow:** paste or enter a URL → create a placeholder note immediately → Convex scheduler → Hono → Firecrawl scrape → patch the note so the link card fills in reactively.

Firecrawl scrape uses formats such as `markdown` and `summary`, and can fill `metadata.title`, `description`, and `ogImage`.

## Memory system

Memory is built in-house in Convex, not wrapped around mem0 or Supermemory. Be honest: products like mem0 already do roughly this. It is still a strong portfolio and interview piece because you will hand-build it and can explain every part.

There are two scopes:

- **Personal memory:** about you, used everywhere.
- **Project memory:** about the work, used only in its project.

### Write path

- Users can add memories explicitly ("Remember…"). The agent can add them too, via tools.
- When a memory is saved, Convex schedules a background job that creates its embedding (`text-embedding-3-small`). Re-embed only when the text changes.
- Automatic extraction after a chat turn still runs on the agent server, with a visible "Saved to memory" chip and undo. Corrections stick.
- Pause memory and temporary chats skip extraction.

### Fields and retrieval

Each memory stores at least: owner, scope (personal or a project id), text, source (you or the agent, plus source chat when relevant), embedding, timestamps, plus:

- `useCount`
- `lastUsedAt`
- `pinned`
- `status`: `active`, `archived`, or `superseded`

Retrieval ranks by similarity first, then a **capped** boost for frequent and recent use. A use counts only when the agent **cites** the memory in its answer, not merely when it is retrieved. This stops popular memories from winning just because they keep being pulled in. Chips show when an answer used memory.

An old memory that keeps getting cited stays strong.

### Agent tools

- `searchMemories`
- `saveMemory`
- `updateMemory`
- `forgetMemory`

These extend the original `search_memory` / `save_memory` / `forget_memory` set.

### Nightly cleanup

A Convex cron job:

- Finds near-duplicates and merges them with a cheap model.
- When a new memory contradicts an old one, marks the old one `superseded`.
- Archives old, low-use memories (they fade; they are not deleted).

Safety rails:

- Cleanup **archives**, it never hard-deletes.
- Cleanup never touches **pinned** or **user-written** memories.
- Big changes (merges, supersedes, bulk archives) go to the **same review queue** as AI edges, so you approve them.
- The memory page still lets you edit, pin, or delete facts yourself. Forgetting a fact you chose to remove removes it everywhere, including its embedding.

## Chat and assistant

### v1 must-haves

- Fast streaming chat: Markdown, code, edit and regenerate, stop, copy.
- Model picker with a good default.
- Web search with sources.
- File and image attachments.
- Searchable chat history: pin, rename, and file into a project.
- Notes context with citations and `@`-mentions.
- Memory used in the loop.
- One-click "Save to note."

### Strong if time allows

- Project-scoped chats (actually core to the context model below).
- Artifacts that open in the editor.
- Cost and usage meter.

### How context works

Chat knows where you opened it. There are three entry points but one system: context = primary items + secondary items.

- **Project chat:** prioritizes the project but can still answer anything ("prioritize," not "only").
- **Note chat:** the note first, plus its project's context if it is in one. Loose notes get just the note. Accepted relationships of that note are pulled in.
- **Home chat:** the whole workspace, pulled in only when relevant through a `search_workspace` tool the assistant calls (hybrid embeddings + keyword search over notes, chats, and artifacts), with "Used N notes" chips.
- Always-on light context: a short summary of your projects and memory goes into every chat.
- A context chip at the top of every chat shows the scope, with a dropdown to add or remove notes, chats, or artifacts.
- Chats can move between projects or become a new project.
- Composio and Google, Notion, or Gmail sources are attachments, never scope.
- The chat follows the focused pane.

### v1 AI chat tools

- **Web:** `web_search` via Exa (Tavily as fallback); `read_page` via Firecrawl; `deep_research` via Parallel.
- **Workspace:** `search_workspace`, `read_note`, `read_chat`, `create_note`, `update_note` (undoable), and `create_artifact`.
- **Projects:** `list_projects`, `read_project`, `move_chat`, `create_project_from_chat`, and `log_decision` (optional).
- **Memory:** `searchMemories`, `saveMemory`, `updateMemory`, and `forgetMemory`. Auto extraction still runs in the background.
- **Composio:** Gmail, Drive, and Notion tools, loaded only when attached to a chat. Read-only for v1.
- **Not in v1:** code execution, image generation, scheduled tasks, or any send/post actions.

## Notes and writing

A document-style, Markdown-flavored editor. Live-preview Markdown, not a block editor that converts to Markdown behind the scenes.

### v1 must-haves

- A fast, calm editor with Markdown shortcuts and slash commands.
- Rich blocks: checklists, tables, callouts, code, images, and embeds.
- Autosave, plus version history with restore and diff.
- Focus mode.
- `[[Links]]`, backlinks, and heading links.
- Light organization: projects, then folders, plus tags, and a command palette.
- Real Markdown underneath, with import and export.

### AI in writing

Covered in [Killer AI feature](#killer-ai-feature): select text and ask, with accept / reject / explain suggestions; continue writing only on request; ghost text off by default; turn a chat or artifact into a note; note chat in a side panel.

### Quick capture

Strong for v1, but design it later. For v1, a simple new note from anywhere plus a PWA share target is enough, along with the URL link-capture flow above. Rethink capture once the app is in daily use.

## Projects

A project is the home for one effort.

### v1

- Holds notes (in folders), chats, artifacts, files, and attached sources.
- Project instructions, added to every project chat.
- Project memory, separate from personal memory.
- A project home page: instructions, pinned notes, recent chats, and key facts.
- Move items between projects. Loose notes and home chats are fine. Archive projects when they are done.

### Maybe: decisions log (strong if time allows)

- When something is settled, the assistant proposes a decision card. One click saves it with the date, the reason, and a link to the chat.
- The assistant treats decisions as settled and flags contradictions.
- Reversed decisions are marked replaced, not deleted.

You're lukewarm on this but open to it.

## Accounts and trust

### Auth

- Google sign-in plus email (magic link or email/password, whichever Clerk makes easiest).
- Visible sessions with sign-out everywhere.
- Passkeys or 2FA if easy, otherwise soon after.
- One person, one workspace for v1.

### Privacy

- Strict per-user isolation, enforced on the server and covered by tests.
- A plain-language privacy page: what goes to AI providers, and no training on your data.
- Full export: a zip of Markdown, chats, and memory.
- Delete account removes everything, including embeddings and files.
- Prompt-injection safety: note, file, and source text is data, never instructions.

### Cost and abuse

- Per-user usage limits and a usage meter.
- Rate limits.

### Launch

- Invite-only beta, free with limits.
- After v1: Stripe or bring-your-own-key if people stick.

## App shell (desktop)

Approved v2 layout, combining a Notion 3.4-style sidebar with Noema's floating cards and pane stacks.

- The app sits on a zinc background. The **sidebar**, **main area**, and **chat panel** are floating rounded cards with **8px gaps**.
- The sidebar is Notion 3.4-style: **Home / Chats / Library** tabs, Search (`⌘K`), Ask Noema, New note, Favorites / Projects / Recent, plus Trash, Settings, and an Inbox entry for the review queue.
- The sidebar **fully collapses** with `⌘\` (or «). A **»** button at the top of the main header reopens it.
- Hover-peek: when the sidebar is hidden, it can slide out on a short delay (200ms open / 300ms close grace in the v1 shell mockup). This can be turned off.
- **Tabs sit in the main header.** Each tab holds a **stack of panes**. A tab's badge shows how many panes are in the stack.
- Click a note: **replaces** the top pane. `⌥`-click: **adds** a pane to the current tab's stack. `⌘`-click: opens a **new tab**.
- Web shortcuts use `⌥T` (new tab) and `⌥W` (close tab), because browsers reserve `⌘T` and `⌘W`. `⌘J` toggles the chat. `⌘\` toggles the sidebar. `⌘K` is search. `Ctrl+Tab` / `Ctrl+Shift+Tab` switch tabs.
- One AI input, as described in [Command bar and link capture](#command-bar-and-link-capture). The chat follows the focused pane.
- Violet is used only for AI.

Current mockup sizes (for implementation, not dogma): sidebar 256px, chat panel 360px, cards 12px radius.

## Mobile

- A single floating card. Opening the app lands on the **last note you had open**. Home is one tap away in the drawer.
- **☰** opens the same v2 sidebar as a drawer.
- A **tab-count square** in the header opens a grid of open tabs. A tab only shows its top pane.
- **Back** chevron, or a right swipe, pops the pane stack. The swipe starts a little in from the edge (24px in the mockup) so it does not fight the browser's back gesture.
- Chat is a **bottom sheet**: about **68%** height, drag up to full height, drag down to close. When the keyboard is up, the sheet goes full height so the conversation is not squeezed. The Ask bar sits at the bottom, in thumb reach; tapping it opens the sheet already scoped to that note.

## Notes screen

Designed for desktop, inside the v2 shell. Next screen to design: the review queue.

- **720px** reading column, with roomy text.
- A **collapsible properties block** under the title. Type is shown as an `@type/name` chip (for example `@schema/edges`). Other properties in the mockup: status, project, tags, created, updated, and a count of notes that link here.
- **Live-preview Markdown:** typing `##` turns into a heading.
- **Slash menu** (`/`): headings, lists, to-dos, code, callout, table, Mermaid, link card, and Ask Noema.
- **Selection toolbar:** bold, italic, code, link, and **Ask AI**.
- **Inline suggested edits** with Accept / Reject / Explain, as in [Killer AI feature](#killer-ai-feature).
- At the bottom of the note: **backlinks**, then **AI-suggested links** (confidence, reason, Accept / Reject / Never, and "Open review queue").
- An **"On this page" outline** appears on wide panes (in the mockup: full outline at ≥1020px; a quieter hover outline from 880px). When the chat is open and the pane is narrow, the outline hides.
- Wiki links and `@type/name` chips are clickable and open a pane.

## Roadmap

Product-first path from a working skeleton to v1, on the locked stack. You hand-code core pieces such as the memory pipeline, the chat run, and the 0.0.1 shell. Slate 1.2 remains the other active project.

Priority overlays on the original numbered plan (do not silently renumber until you rescope):

- **In-note edit review** is the first AI feature, not an optional 0.9 extra.
- **Auto-linking and the review queue** are the differentiator and still need a numbered slot when you schedule the build.
- **0.5 Memory** should include the self-managing system above, not only extraction and a memory page.
- **0.0.1** should leave the ShadCN Sidebar shell for Howard to hand-code.

| Version | Focus | Done when |
| --- | --- | --- |
| **0.0.1 — Skeleton** | Monorepo: TanStack Start app, Convex backend, Hono server, shared package. Deploys to Vercel and Railway. Clerk sign-in end to end, JWTs checked in Convex and Hono. Thin health-check path and shared types. Hand-coded ShadCN Sidebar shell. | You can sign in on the deployed app, and both Convex and Hono accept the same Clerk session. |
| **0.1 — Notes and editor** | Live-preview Markdown editor with shortcuts and a calm default note view. Create, open, and list notes, with real Markdown underneath. Autosave to Convex, plus undo. A notes list you can return to after closing the tab. | You can write and reopen notes in the deployed app, and closing the tab does not lose work. |
| **0.2 — Chat run** | Chat run on Hono: auth, rate limits and usage budget, agent loop, streaming. Assistant message created in Convex up front and saved on finish. Model picker from a catalog file. History you can open, rename, and pin, plus "Save to note." Caps enforced before each model call. | You can send a message, watch it stream, close or refresh mid-reply, and come back to a finished message. |
| **0.3 — Projects and context** | Projects with instructions, a project home, and moving chats and notes. One context system for project, note, and home chat. Context chip to add or remove items. `@`-mentions and citations. Artifacts that open in the editor. Workspace and project tools. | A chat opened from a project, a note, or home uses the right context, and you can see and change that scope from the chip. |
| **0.4 — Search and embeddings** | Convex scheduler triggers Hono to embed items after save (`text-embedding-3-small`). Hybrid `search_workspace`. "Used N notes" chips and citations. Home chat uses search instead of stuffing the whole workspace into the prompt. | Asking about something that lives in a note finds it, and the chat shows which notes were used. |
| **0.5 — Memory** | Memories table with the fields above. After each turn, Hono extracts, dedupes, and auto-saves, with an undo chip (hand-code this pipeline). Retrieval: short summary plus vector search, citation-only use tracking, and chips. Memory page to list, edit, pin, and delete. Pause and temporary chats skip extraction. Agent tools plus nightly cleanup, with big changes in the review queue. Evals to tune extraction. | The assistant remembers a fact after a chat, you can see and undo it, a paused or temporary chat does not write memory, and cleanup archives instead of silently deleting. |
| **0.6 — Web tools** | Benchmark Exa, Tavily, Firecrawl, and Parallel with about 10 identical queries. `web_search` via Exa (Tavily fallback) with sources. `read_page` and link capture via Firecrawl. `deep_research` via Parallel, results as artifacts. Own adapters, fallbacks, and cost logging. | The assistant can search the web, read a page, capture a link into a note, and run a deep research job whose result opens as an artifact, with costs logged. |
| **0.7 — Composio** | Per-user connections for Gmail, Google Drive, and Notion, on the agent server only. Attach as sources, not scope. Tools load only when attached. Read-only for v1. | You can attach Gmail, Drive, or Notion to a chat and the assistant can read from that source. |
| **0.8 — Trust and accounts** | Per-user isolation with tests. Full export and account deletion (including embeddings and files). Plain-language privacy page. Prompt-injection safety. Rate limits, daily caps, and a visible cost meter. Visible sessions. Passkeys or 2FA if they are easy. | A second user cannot see your data, you can export or delete your account, and usage limits are enforced and visible. |
| **0.9 — Polish and beta** | Chat polish: edit and regenerate, stop, copy, searchable history, file and image attachments. Notes polish: version history with restore and diff, focus mode, slash commands, `[[links]]` and backlinks, command palette, Markdown import and export. Optional decisions log if time allows. Invite-only beta, free with limits. You use it daily, and a few real users are on it. | You use Noema as your daily notes and chat app, and a small invite list can use it without hand-holding. |
| **1.0 — Public-ready v1** | The five v1 goals are met. v1 must-haves in chat, notes, projects, memory, and accounts are in place. After-v1 items stay out. Stable enough to share beyond the invite list. | The brief's v1 goals are true on the locked stack, and you would be comfortable putting the app in front of people as v1. |

## After v1 / out of scope for v1

- Composio write actions, with confirm-before-write.
- Routines and scheduled prompts; digests.
- Voice; multi-agent.
- Sharing, teams, and "factory" shared agents.
- Native apps (a PWA may come earlier; see open questions).
- Web clipper, voice notes, templates, daily note, collaboration, publishing.
- Graph view, unless it is scoped into auto-linking earlier.
- Expiring memories, importing from ChatGPT (cleanup suggestions are now in the v1 memory design).
- Code execution, image generation, or any send/post actions.
- A real job queue and heavier observability.

## Open questions

- **`@` meaning.** In the command bar, `@` is jump or scope. In the note body, `@type/name` creates or mentions a typed object. The exact rules when those two meet (and whether `@` in a note should ever trigger the command bar) are not locked.
- **PWA or desktop wrapper.** The web app uses `⌥T` / `⌥W` because browsers reserve `⌘T` / `⌘W`. A PWA or desktop wrapper could unlock the real tab shortcuts. Not decided.
- **Chat pin.** The chat follows the focused pane. Whether you can pin the chat to a specific pane (so it does not follow focus) is not locked.
- **When auto-linking ships.** The review queue and `edges` table do not yet have a numbered milestone.
- **Decisions log.** Still optional, and you are lukewarm on it.
