import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

type AuthMode = "sign-in" | "sign-up"

export function AuthCard() {
  const [mode, setMode] = useState<AuthMode>("sign-in")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  const isSignIn = mode === "sign-in"

  return (
    <aside
      id="auth"
      className="w-full scroll-mt-24 lg:max-w-sm lg:justify-self-end"
      aria-labelledby="auth-card-heading"
    >
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h2 id="auth-card-heading" className="sr-only">
            {isSignIn ? "Sign in" : "Create account"}
          </h2>
          <div className="space-y-1">
            <p className="text-base font-semibold tracking-tight text-foreground">
              {isSignIn ? "Welcome back" : "Create your account"}
            </p>
            <p className="text-sm text-muted-foreground">
              {isSignIn
                ? "Sign in when your invite is ready."
                : "Sign up when accounts open for beta."}
            </p>
          </div>
          <div className="space-y-3">
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium text-foreground">Email</span>
              <Input
                type="email"
                name="email"
                autoComplete="email"
                className="h-10 rounded-xl bg-background"
              />
            </label>
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium text-foreground">Password</span>
              <Input
                type="password"
                name="password"
                autoComplete={isSignIn ? "current-password" : "new-password"}
                className="h-10 rounded-xl bg-background"
              />
            </label>
          </div>
          <Button type="submit" className="h-10 w-full rounded-xl">
            {isSignIn ? "Sign in" : "Sign up"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {isSignIn ? "Need an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="font-medium text-[oklch(0.48_0.12_285)] underline-offset-4 hover:underline"
              onClick={() => setMode(isSignIn ? "sign-up" : "sign-in")}
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </aside>
  )
}