import { SplashHero } from "@/components/booth/splash-hero"
import { Skull } from "lucide-react"

export default function Splash() {
  return (
    <SplashHero
      title="GrinchConnect"
      tagline="Emotional scarring, on demand"
      ctaText="Find a Grinch"
      icon={<Skull className="w-12 h-12" />}
      backgroundPattern="gradient"
    >
      <div className="mt-6 space-y-3 text-[hsl(var(--primary-foreground))] opacity-90">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--card))] flex items-center justify-center text-[hsl(var(--primary))] text-lg font-black">
            1
          </div>
          <p className="text-sm text-left">Select your Grinch impersonator</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--card))] flex items-center justify-center text-[hsl(var(--primary))] text-lg font-black">
            2
          </div>
          <p className="text-sm text-left">Choose horror level & specialties</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--card))] flex items-center justify-center text-[hsl(var(--primary))] text-lg font-black">
            3
          </div>
          <p className="text-sm text-left">Watch the magic unfold</p>
        </div>
      </div>
    </SplashHero>
  )
}
