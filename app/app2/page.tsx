import { SplashHero } from "@/components/booth/splash-hero"
import { Gift } from "lucide-react"

export default function App2Splash() {
  return (
    <SplashHero
      title="Santa's Task Sleigher"
      tagline="Making lists, checking them twice"
      ctaText="Start Delivering"
      icon={<Gift className="w-10 h-10" />}
      backgroundPattern="snow"
    >
      <div className="flex gap-6">
        <div className="text-center">
          <p className="text-2xl">🎁</p>
          <p className="text-lg font-bold text-[hsl(var(--foreground))]">24</p>
        </div>
        <div className="text-center">
          <p className="text-2xl">🦌</p>
          <p className="text-lg font-bold text-[hsl(var(--foreground))]">9</p>
        </div>
        <div className="text-center">
          <p className="text-2xl">⭐</p>
          <p className="text-lg font-bold text-[hsl(var(--foreground))]">85%</p>
        </div>
      </div>
    </SplashHero>
  )
}
