import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"

import { AuthForm, type AuthMode } from "@/components/landing/auth-form"

type LandingAuthContextValue = {
  openAuth: (mode: AuthMode) => void
}

const LandingAuthContext = createContext<LandingAuthContextValue | null>(null)

export function useLandingAuth() {
  const ctx = useContext(LandingAuthContext)
  if (!ctx) {
    throw new Error("useLandingAuth must be used within LandingAuthProvider")
  }
  return ctx
}

export function LandingAuthProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<AuthMode>("sign-in")

  const openAuth = useCallback((next: AuthMode) => {
    setMode(next)
    setOpen(true)
  }, [])

  const value = useMemo(() => ({ openAuth }), [openAuth])

  return (
    <LandingAuthContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {mode === "sign-in" ? "Sign in" : "Create account"}
            </DialogTitle>
          </DialogHeader>
          <AuthForm
            key={`${open}-${mode}`}
            initialMode={mode}
            onModeChange={setMode}
          />
        </DialogContent>
      </Dialog>
    </LandingAuthContext.Provider>
  )
}