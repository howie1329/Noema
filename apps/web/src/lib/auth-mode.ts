export const AUTH_MODES = ["sign-in", "sign-up"] as const

export type AuthMode = (typeof AUTH_MODES)[number]

export function parseAuthMode(value: unknown): AuthMode {
  return value === "sign-up" ? "sign-up" : "sign-in"
}