import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type WaitlistFormProps = {
  align?: "center" | "startOnLarge"
}

export function WaitlistForm({ align = "center" }: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [acknowledged, setAcknowledged] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim() || !EMAIL_PATTERN.test(email.trim())) {
      return
    }
    setAcknowledged(true)
  }

  const captionAlign =
    align === "startOnLarge"
      ? "text-center lg:text-left"
      : "text-center"

  return (
    <div
      className={[
        "w-full max-w-xl space-y-3",
        align === "center" ? "mx-auto" : "mx-auto lg:mx-0",
      ].join(" ")}
    >
      <form
        className="flex w-full items-stretch overflow-hidden rounded-2xl border border-border bg-background p-1.5 shadow-sm"
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
          className="h-11 min-w-0 flex-1 rounded-xl border-0 bg-transparent px-3 shadow-none focus-visible:border-transparent focus-visible:ring-0"
          aria-label="Email address"
        />
        <Button type="submit" size="lg" className="h-11 shrink-0 rounded-xl px-5">
          Join the waitlist
        </Button>
      </form>
      <p className={`text-sm text-muted-foreground ${captionAlign}`}>
        Invite-only beta. Free, with limits.
      </p>
      {acknowledged ? (
        <p className={`text-sm text-foreground ${captionAlign}`} role="status">
          You&apos;re on the list. We&apos;ll reach out when a spot opens.
        </p>
      ) : null}
    </div>
  )
}