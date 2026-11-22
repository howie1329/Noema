import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { cn } from "@workspace/ui/lib/utils"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type AccountMode = "sign-in" | "sign-up"

type FieldErrors = {
  name?: string
  email?: string
  password?: string
}

export function AccountCard() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<AccountMode>("sign-up")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})

  const isSignUp = mode === "sign-up"

  function handleModeChange(next: string) {
    setMode(next === "sign-in" ? "sign-in" : "sign-up")
    setErrors({})
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    if (isSignUp && name.trim().length === 0) {
      next.name = "Enter your name."
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = "Enter a valid email."
    }
    if (password.length === 0) {
      next.password = "Enter a password."
    }
    return next
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      navigate({ to: "/home" })
    }
  }

  function handleGoogle() {
    setErrors({})
    navigate({ to: "/home" })
  }

  return (
    <div className="w-full rounded-2xl border border-border/80 bg-card px-6 py-6 shadow-sm sm:px-7 sm:py-7">
      <Tabs value={mode} onValueChange={handleModeChange}>
        <TabsList className="mb-5 grid h-10 w-full grid-cols-2 rounded-lg! bg-zinc-100 p-1 dark:bg-zinc-900">
          <TabsTrigger
            value="sign-in"
            className="rounded-md! data-active:bg-white data-active:shadow-sm dark:data-active:bg-zinc-800"
          >
            Sign in
          </TabsTrigger>
          <TabsTrigger
            value="sign-up"
            className="rounded-md! data-active:bg-white data-active:shadow-sm dark:data-active:bg-zinc-800"
          >
            Sign up
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-4">
        <Button
          type="button"
          variant="outline"
          className="h-10 w-full rounded-lg! bg-card"
          onClick={handleGoogle}
        >
          <GoogleMark />
          Continue with Google
        </Button>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>
        <form className="flex flex-col gap-3.5" onSubmit={handleSubmit} noValidate>
          {isSignUp ? (
            <Field
              id="account-name"
              label="Name"
              error={errors.name}
              autoComplete="name"
              placeholder="Ada Lovelace"
              value={name}
              onChange={(value) => {
                setName(value)
                setErrors((current) => ({ ...current, name: undefined }))
              }}
            />
          ) : null}
          <Field
            id="account-email"
            label="Email"
            type="email"
            error={errors.email}
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(value) => {
              setEmail(value)
              setErrors((current) => ({ ...current, email: undefined }))
            }}
          />
          <Field
            id="account-password"
            label="Password"
            type="password"
            error={errors.password}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            value={password}
            onChange={(value) => {
              setPassword(value)
              setErrors((current) => ({ ...current, password: undefined }))
            }}
          />
          <Button type="submit" className="mt-1 h-11 w-full rounded-lg!">
            {isSignUp ? "Create account" : "Sign in"}
          </Button>
        </form>
        <p className="text-center text-xs text-muted-foreground">Free, with limits.</p>
      </div>
    </div>
  )
}

type FieldProps = {
  id: string
  label: string
  error?: string
  value: string
  onChange: (value: string) => void
  type?: string
  autoComplete?: string
  placeholder?: string
}

function Field({
  id,
  label,
  error,
  value,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-10 rounded-lg border-transparent bg-zinc-100 px-3 dark:bg-zinc-900",
          error && "border-destructive"
        )}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  )
}
