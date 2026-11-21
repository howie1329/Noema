import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [acknowledged, setAcknowledged] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function handleJoinClick() {
    if (!email.trim() || !EMAIL_PATTERN.test(email.trim())) {
      return
    }
    setAcknowledged(true)
  }

  return (
    <div className="w-full max-w-md space-y-2">
      <form
        className="flex w-full flex-col gap-2 sm:flex-row sm:items-stretch"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setAcknowledged(false)
          }}
          className="h-11 flex-1 rounded-xl bg-background sm:min-w-0"
          aria-label="Email address"
        />
        <Button
          type="button"
          size="lg"
          className="h-11 shrink-0 rounded-xl px-5"
          onClick={handleJoinClick}
        >
          Join the waitlist
        </Button>
      </form>
      <p className="text-xs text-muted-foreground">
        Invite-only beta. Free, with limits.
      </p>
      {acknowledged ? (
        <p className="text-xs text-foreground" role="status">
          You&apos;re on the list. We&apos;ll reach out when a spot opens.
        </p>
      ) : null}
    </div>
  )
}