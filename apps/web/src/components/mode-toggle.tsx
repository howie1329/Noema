import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

function readIsDark() {
  return document.documentElement.classList.contains("dark")
}

type ModeToggleProps = {
  variant?: "outline" | "ghost"
  className?: string
}

export function ModeToggle({
  variant = "outline",
  className,
}: ModeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const sync = () => setIsDark(readIsDark())
    sync()

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [theme])

  function handleToggle() {
    const next = !readIsDark()
    setTheme(next ? "dark" : "light")
    setIsDark(next)
  }

  return (
    <Button
      type="button"
      variant={variant}
      size="icon-sm"
      className={cn("size-7 shrink-0 text-muted-foreground", className)}
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Moon className="size-3.5" aria-hidden />
      ) : (
        <Sun className="size-3.5" aria-hidden />
      )}
    </Button>
  )
}