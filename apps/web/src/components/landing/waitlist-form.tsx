import { useState } from "react"

import { FieldDescription } from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group"

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
        "flex w-full max-w-lg flex-col gap-3",
        align === "center" ? "mx-auto" : "mx-auto lg:mx-0",
      ].join(" ")}
    >
      <form onSubmit={handleSubmit}>
        <InputGroup className="h-11">
          <InputGroupInput
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setAcknowledged(false)
            }}
            aria-label="Email address"
            required
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton type="submit" size="sm" className="px-4">
              Join the waitlist
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
      <FieldDescription className={captionAlign}>
        Invite-only beta. Free, with limits.
      </FieldDescription>
      {acknowledged ? (
        <p className={`text-sm text-foreground ${captionAlign}`} role="status">
          You&apos;re on the list. We&apos;ll reach out when a spot opens.
        </p>
      ) : null}
    </div>
  )
}