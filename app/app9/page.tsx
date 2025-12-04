import { SplashHero } from "@/components/booth/splash-hero"
import { Snowflake } from "lucide-react"

export default function App9Splash() {
  return (
    <SplashHero
      title="Your Dream Budy"
      tagline="Melt fat, not snowmen! Get fit the frosty way."
      ctaText="Start Melting!"
      icon={<Snowflake className="w-12 h-12" />}
      backgroundPattern="gradient"
    >
      <div className="flex gap-6 mt-4">
        <div className="text-center">
          <p className="text-4xl font-black text-[hsl(var(--secondary))]">0</p>
          <p className="text-xs text-[hsl(var(--primary-foreground))] opacity-70">excuses</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-black text-[hsl(var(--secondary))]">100%</p>
          <p className="text-xs text-[hsl(var(--primary-foreground))] opacity-70">chill vibes</p>
        </div>
      </div>
      
      <div className="mt-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
        <p className="text-sm text-[hsl(var(--primary-foreground))]">
          ⛄ Warning: Results may include abs of steel
        </p>
      </div>
    </SplashHero>
  )
}
