import { cn } from "@workspace/ui/lib/utils"

export type LogoProps = {
  /** Mark only, or mark + lowercase wordmark lockup */
  variant?: "mark" | "lockup"
  className?: string
  alt?: string
  /** Hide from assistive tech when redundant adjacent text exists */
  decorative?: boolean
}

export function Logo({
  variant = "mark",
  className,
  alt = "Noema",
  decorative = false,
}: LogoProps) {
  const lightSrc =
    variant === "lockup" ? "/logo-light.svg" : "/mark-light.svg"
  const darkSrc = variant === "lockup" ? "/logo-dark.svg" : "/mark-dark.svg"
  const imgAlt = decorative ? "" : alt

  return (
    <span
      className={cn("inline-flex shrink-0", className)}
      aria-hidden={decorative ? true : undefined}
    >
      <img
        src={lightSrc}
        alt={imgAlt}
        className="h-full w-auto dark:hidden"
        decoding="async"
      />
      <img
        src={darkSrc}
        alt={imgAlt}
        className="hidden h-full w-auto dark:block"
        decoding="async"
      />
    </span>
  )
}