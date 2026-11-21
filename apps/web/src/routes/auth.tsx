import { createFileRoute } from "@tanstack/react-router"

import { AuthPage } from "@/components/auth/auth-page"
import { parseAuthMode, type AuthMode } from "@/lib/auth-mode"

type AuthSearch = {
  mode: AuthMode
}

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    mode: parseAuthMode(search.mode),
  }),
  head: () => ({
    meta: [
      {
        title: "Sign in — Noema",
      },
    ],
  }),
  component: AuthRoute,
})

function AuthRoute() {
  const { mode } = Route.useSearch()
  return <AuthPage mode={mode} />
}