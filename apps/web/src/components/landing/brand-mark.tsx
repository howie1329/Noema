import { Logo, type LogoProps } from "@/components/logo"

type BrandMarkProps = Omit<LogoProps, "variant" | "decorative">

export function BrandMark({ className }: BrandMarkProps) {
  return <Logo variant="mark" decorative className={className} />
}