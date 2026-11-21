import { cn } from "@workspace/ui/lib/utils"

type BrandMarkProps = {
  className?: string
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground text-[0.7rem] font-semibold text-background",
        className
      )}
      aria-hidden
    >
      n
    </span>
  )
}
