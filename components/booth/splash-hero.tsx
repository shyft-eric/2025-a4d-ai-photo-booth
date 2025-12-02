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
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-full p-8 text-center relative overflow-hidden",
        backgroundPattern === "gradient" && "theme-gradient",
        backgroundPattern === "snow" && "bg-[hsl(var(--background))]",
        className
      )}
    >
      {/* Background decorations */}
      {backgroundPattern === "snow" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[hsl(var(--primary))] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            />
          ))}
        </div>
      )}
      
      {backgroundPattern === "stars" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[hsl(var(--accent))] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm">
        {icon && (
          <div className="w-24 h-24 rounded-3xl bg-[hsl(var(--card))] shadow-xl flex items-center justify-center text-[hsl(var(--primary))]">
            {icon}
          </div>
        )}
        
        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--primary-foreground))]">
            {title}
          </h1>
          {tagline && (
            <p className="text-lg text-[hsl(var(--primary-foreground))] opacity-90">
              {tagline}
            </p>
          )}
        </div>

        {children}

        {ctaText && (
          <Button size="xl" variant="secondary" onClick={onCtaClick} className="mt-4">
            {ctaText}
          </Button>
        )}
      </div>
    </div>
  )
}
