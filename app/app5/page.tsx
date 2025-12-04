import { SplashHero } from "@/components/booth/splash-hero"
import { Crown, Sparkles, Heart } from "lucide-react"

export default function Splash() {
  return (
    <SplashHero
      title="Clara's Closet"
      tagline="Where magical worlds meet destined hearts"
      ctaText="Enter the Kingdom"
      icon={<Crown className="w-12 h-12" />}
      backgroundPattern="stars"
    >
      <div className="mt-12 space-y-6 px-8">
        {/* Feature highlights */}
        <div className="flex items-center gap-4 text-[hsl(var(--foreground))] opacity-90">
          <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-[hsl(var(--primary-foreground))]" />
          </div>
          <div className="text-left">
            <div className="font-bold text-lg">Match by Realm</div>
            <div className="text-sm opacity-80">Discover souls from your world</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[hsl(var(--foreground))] opacity-90">
          <div className="w-12 h-12 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center flex-shrink-0">
            <Crown className="w-6 h-6 text-[hsl(var(--secondary-foreground))]" />
          </div>
          <div className="text-left">
            <div className="font-bold text-lg">Regal Connections</div>
            <div className="text-sm opacity-80">Chat with princes and dancers</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[hsl(var(--foreground))] opacity-90">
          <div className="w-12 h-12 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-[hsl(var(--accent-foreground))]" />
          </div>
          <div className="text-left">
            <div className="font-bold text-lg">Enchanted Romance</div>
            <div className="text-sm opacity-80">Find love beyond reality</div>
          </div>
        </div>
      </div>

      {/* Stats banner */}
      <div className="absolute bottom-24 left-0 right-0 px-8">
        <div className="bg-[hsl(var(--card))] rounded-2xl p-6 border-2 border-[hsl(var(--border))] shadow-lg">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-3xl font-black text-[hsl(var(--primary))]">47K</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] font-semibold">Matches</div>
            </div>
            <div className="w-px bg-[hsl(var(--border))]"></div>
            <div>
              <div className="text-3xl font-black text-[hsl(var(--secondary))]">12</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] font-semibold">Realms</div>
            </div>
            <div className="w-px bg-[hsl(var(--border))]"></div>
            <div>
              <div className="text-3xl font-black text-[hsl(var(--accent))]">∞</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] font-semibold">Magic</div>
            </div>
          </div>
        </div>
      </div>
    </SplashHero>
  )
}
