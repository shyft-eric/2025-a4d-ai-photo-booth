import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SplashHeroProps {
  title: string
  tagline?: string
  ctaText?: string
  onCtaClick?: () => void
  icon?: React.ReactNode
  backgroundPattern?: "snow" | "stars" | "gradient" | "none"
  className?: string
  children?: React.ReactNode
}

export function SplashHero({
  title,
  tagline,
  ctaText = "Get Started",
  onCtaClick,
  icon,
  backgroundPattern = "gradient",
  className,
  children,
}: SplashHeroProps) {
  // Use theme-appropriate text colors based on background
  // For gradient: use primary-foreground (designed for dark/colored backgrounds)
  // For snow/stars/none: use foreground (designed for light backgrounds)
  const usesDarkBackground = backgroundPattern === "gradient"
  const textColorClass = usesDarkBackground
    ? "text-[hsl(var(--primary-foreground))]"
    : "text-[hsl(var(--foreground))]"
  const mutedTextColorClass = usesDarkBackground
    ? "text-[hsl(var(--primary-foreground))] opacity-80"
    : "text-[hsl(var(--muted-foreground))]"

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-full p-6 text-center relative overflow-hidden",
        backgroundPattern === "gradient" && "theme-gradient",
        backgroundPattern !== "gradient" && "bg-[hsl(var(--background))]",
        className
      )}
    >
      {/* Background decorations */}
      {backgroundPattern === "snow" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {[...Array(20)].map((_, i) => {
            // Use deterministic positions based on index to avoid hydration mismatch
            const left = ((i * 37 + 13) % 100)
            const top = ((i * 53 + 29) % 100)
            const opacity = 0.3 + ((i * 17) % 50) / 100
            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[hsl(var(--primary))] rounded-full"
                style={{ left: `${left}%`, top: `${top}%`, opacity }}
              />
            )
          })}
        </div>
      )}

      {backgroundPattern === "stars" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => {
            // Use deterministic positions based on index to avoid hydration mismatch
            const left = ((i * 41 + 7) % 100)
            const top = ((i * 59 + 17) % 100)
            const opacity = 0.2 + ((i * 23) % 80) / 100
            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[hsl(var(--accent))] rounded-full"
                style={{ left: `${left}%`, top: `${top}%`, opacity }}
              />
            )
          })}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center gap-4 max-w-sm">
        {icon && (
          <div className="w-20 h-20 rounded-2xl bg-[hsl(var(--card))] shadow-xl flex items-center justify-center text-[hsl(var(--primary))]">
            {icon}
          </div>
        )}

        <div className="space-y-2">
          <h1 className={cn("text-3xl font-black tracking-tight", textColorClass)}>
            {title}
          </h1>
          {tagline && (
            <p className={cn("text-base", mutedTextColorClass)}>
              {tagline}
            </p>
          )}
        </div>

        {children}

        {ctaText && (
          <Button size="lg" variant="secondary" onClick={onCtaClick} className="mt-2">
            {ctaText}
          </Button>
        )}
      </div>
    </div>
  )
}
