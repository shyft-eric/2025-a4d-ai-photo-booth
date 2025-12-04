// Splash/Hero Screen
import { SplashHero } from "@/components/booth/splash-hero"
import { StatsCard } from "@/components/booth/data-display"
import { Moon, Beer, Snowflake } from "lucide-react"

export default function Splash() {
  return (
    <SplashHero
      title="Its Cold and Dark Lets Drink Beer"
      tagline="Winter survival metrics for the damned"
      ctaText="Embrace the Darkness"
      icon={<Moon className="w-12 h-12" />}
      backgroundPattern="none"
    >
      <div className="space-y-3 mt-6">
        <div className="flex gap-3 justify-center items-center">
          <StatsCard
            label="Darkness"
            value="100%"
            icon={<Moon className="w-5 h-5" />}
            variant="compact"
            className="[&_*]:!text-[hsl(var(--foreground))]"
          />
          <StatsCard
            label="Beer"
            value="∞"
            icon={<Beer className="w-5 h-5" />}
            variant="compact"
            className="[&_*]:!text-[hsl(var(--foreground))]"
          />
          <StatsCard
            label="Cold"
            value="-40°"
            icon={<Snowflake className="w-5 h-5" />}
            variant="compact"
            className="[&_*]:!text-[hsl(var(--foreground))]"
          />
        </div>

        <div className="text-center pt-4 border-t border-[hsl(var(--border))] mt-4">
          <p className="text-sm text-[hsl(var(--foreground))]/80 italic">
            "Track what matters when winter tries to kill you"
          </p>
          <p className="text-xs text-[hsl(var(--foreground))]/70 mt-1">
            - Krampus, Dark Anti-Hero
          </p>
        </div>
      </div>
    </SplashHero>
  )
}
