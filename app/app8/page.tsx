import { SplashHero } from "@/components/booth/splash-hero"
import { Navigation } from "lucide-react"

export default function Splash() {
  return (
    <SplashHero
      title="Boozy Reindeer"
      tagline="Navigate the party safely - avoid the wobbly ones"
      ctaText="Light the Way"
      icon={<Navigation className="w-12 h-12" />}
      backgroundPattern="gradient"
    >
      <div className="mt-6 space-y-3 text-[hsl(var(--primary-foreground))] opacity-90">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--card))] flex items-center justify-center text-[hsl(var(--primary))] text-lg font-black">
            🚨
          </div>
          <p className="text-sm text-left">Real-time drunk zone alerts</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--card))] flex items-center justify-center text-[hsl(var(--primary))] text-lg font-black">
            🗺️
          </div>
          <p className="text-sm text-left">Smart route planning around hot spots</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--card))] flex items-center justify-center text-[hsl(var(--primary))] text-lg font-black">
            🦌
          </div>
          <p className="text-sm text-left">Guided by Rudolph's red nose technology</p>
        </div>
      </div>
    </SplashHero>
  )
}
