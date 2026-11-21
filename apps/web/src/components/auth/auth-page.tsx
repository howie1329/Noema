import { useNavigate } from "@tanstack/react-router"

import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { AuthCredentialsForm } from "@/components/auth/auth-credentials-form"
import { AuthShell } from "@/components/auth/auth-shell"
import type { AuthMode } from "@/lib/auth-mode"

type AuthPageProps = {
  mode: AuthMode
}

export function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate({ from: "/auth" })

  function handleModeChange(next: string) {
    const parsed: AuthMode = next === "sign-up" ? "sign-up" : "sign-in"
    void navigate({
      search: { mode: parsed },
      replace: true,
    })
  }

  return (
    <AuthShell>
      <Card className="w-full max-w-md bg-card/40 shadow-sm ring-border/80">
        <CardContent className="pt-6">
          <Tabs value={mode} onValueChange={handleModeChange}>
            <TabsList className="mb-6 grid h-10 w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign in</TabsTrigger>
              <TabsTrigger value="sign-up">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <AuthCredentialsForm mode="sign-in" />
            </TabsContent>
            <TabsContent value="sign-up">
              <AuthCredentialsForm mode="sign-up" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AuthShell>
  )
}