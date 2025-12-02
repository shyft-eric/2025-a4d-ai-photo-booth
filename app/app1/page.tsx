import { SplashHero } from "@/components/booth/splash-hero"
import { DollarSign } from "lucide-react"

export default function App1Splash() {
  return (
    <SplashHero
      title="PennyPincher"
      tagline="Your money deserves better than you"
      ctaText="Start Saving"
      icon={<DollarSign className="w-12 h-12" />}
      backgroundPattern="gradient"
    >
      <div className="flex gap-4 mt-2">
        <div className="text-center">
          <p className="text-3xl font-black text-[hsl(var(--secondary))]">$0</p>
          <p className="text-xs text-[hsl(var(--primary-foreground))] opacity-70">spent wisely</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-black text-[hsl(var(--secondary))]">∞</p>
          <p className="text-xs text-[hsl(var(--primary-foreground))] opacity-70">regrets</p>
        </div>
      </div>
    </SplashHero>
  )
}
