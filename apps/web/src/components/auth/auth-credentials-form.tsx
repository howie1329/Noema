import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

import type { AuthMode } from "@/lib/auth-mode"

type AuthCredentialsFormProps = {
  mode: AuthMode
}

export function AuthCredentialsForm({ mode }: AuthCredentialsFormProps) {
  const [confirmMismatch, setConfirmMismatch] = useState(false)

  const isSignIn = mode === "sign-in"

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isSignIn) {
      const form = event.currentTarget
      const password = (
        form.elements.namedItem("password") as HTMLInputElement
      ).value
      const confirm = (
        form.elements.namedItem("confirmPassword") as HTMLInputElement
      ).value
      if (password !== confirm) {
        setConfirmMismatch(true)
        return
      }
    }
    setConfirmMismatch(false)
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit}
      noValidate={!isSignIn}
      aria-labelledby="auth-mode-label"
    >
      <div className="flex flex-col gap-1.5">
        <h1
          id="auth-mode-label"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          {isSignIn ? "Welcome back" : "Create your account"}
        </h1>
        <FieldDescription className="text-pretty">
          {isSignIn
            ? "Sign in when your invite is ready."
            : "Sign up when accounts open for beta."}
        </FieldDescription>
      </div>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="auth-email">Email</FieldLabel>
          <Input
            id="auth-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            className="h-10"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="auth-password">Password</FieldLabel>
          <Input
            id="auth-password"
            type="password"
            name="password"
            autoComplete={isSignIn ? "current-password" : "new-password"}
            required
            minLength={isSignIn ? undefined : 8}
            className="h-10"
            onChange={() => setConfirmMismatch(false)}
          />
        </Field>
        {!isSignIn ? (
          <Field {...(confirmMismatch ? { "data-invalid": true } : {})}>
            <FieldLabel htmlFor="auth-confirm-password">
              Confirm password
            </FieldLabel>
            <Input
              id="auth-confirm-password"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              required
              minLength={8}
              className="h-10"
              aria-invalid={confirmMismatch || undefined}
              onChange={() => setConfirmMismatch(false)}
            />
            {confirmMismatch ? (
              <FieldError>Passwords do not match. Try again.</FieldError>
            ) : null}
          </Field>
        ) : null}
      </FieldGroup>
      <Button type="submit" className="h-10 w-full">
        {isSignIn ? "Sign in" : "Sign up"}
      </Button>
    </form>
  )
}