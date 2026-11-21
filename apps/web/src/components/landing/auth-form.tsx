import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

export type AuthMode = "sign-in" | "sign-up"

type AuthFormProps = {
  initialMode?: AuthMode
  onModeChange?: (mode: AuthMode) => void
}

export function AuthForm({
  initialMode = "sign-in",
  onModeChange,
}: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode)

  function switchMode(next: AuthMode) {
    setMode(next)
    onModeChange?.(next)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  const isSignIn = mode === "sign-in"

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <p className="text-lg font-semibold tracking-tight text-foreground">
          {isSignIn ? "Welcome back" : "Create your account"}
        </p>
        <p className="text-sm text-muted-foreground">
          {isSignIn
            ? "Sign in when your invite is ready."
            : "Sign up when accounts open for beta."}
        </p>
      </div>
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="auth-email">Email</Label>
          <Input
            id="auth-email"
            type="email"
            name="email"
            autoComplete="email"
            className="h-10 bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="auth-password">Password</Label>
          <Input
            id="auth-password"
            type="password"
            name="password"
            autoComplete={isSignIn ? "current-password" : "new-password"}
            className="h-10 bg-background"
          />
        </div>
      </div>
      <Button type="submit" className="h-10 w-full">
        {isSignIn ? "Sign in" : "Sign up"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {isSignIn ? "Need an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="font-medium text-foreground underline-offset-4 hover:underline"
          onClick={() => switchMode(isSignIn ? "sign-up" : "sign-in")}
        >
          {isSignIn ? "Sign up" : "Sign in"}
        </button>
      </p>
    </form>
  )
}