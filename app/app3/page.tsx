import { SplashHero } from "@/components/booth/splash-hero"
import { Skull } from "lucide-react"

export default function App3Splash() {
  return (
    <SplashHero
      title="Cold Winter Nights"
      tagline="Embrace the darkness within... and breathe"
      ctaText="Face Your Mortality"
      icon={<Skull className="w-12 h-12" />}
      backgroundPattern="gradient"
    >
      <div className="flex gap-6 mt-4">
        <div className="text-center">
          <p className="text-3xl font-black text-[hsl(var(--accent))]">666</p>
          <p className="text-xs text-[hsl(var(--primary-foreground))] opacity-70">breaths taken</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-black text-[hsl(var(--accent))]">∞</p>
          <p className="text-xs text-[hsl(var(--primary-foreground))] opacity-70">existential dread</p>
        </div>
      </div>

      <p className="text-xs text-[hsl(var(--primary-foreground))] opacity-60 mt-6 max-w-[200px]">
        &ldquo;We&apos;re all gonna die... but first, let&apos;s meditate on that.&rdquo;
      </p>
    </SplashHero>
  )
}
