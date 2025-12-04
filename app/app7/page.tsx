import { SplashHero } from "@/components/booth/splash-hero"
import { Gift, Repeat, DollarSign } from "lucide-react"

export default function Splash() {
  return (
    <SplashHero
      title="Santa's Swap Meet"
      tagline="Trade the gifts you got for the gifts you want!"
      ctaText="Start Swapping"
      icon={<Gift className="w-12 h-12" />}
      backgroundPattern="snow"
    >
      <div className="mt-8 space-y-4 max-w-sm mx-auto">
        {/* Feature highlights */}
        <div className="flex items-center gap-3 bg-[hsl(var(--card))] p-4 rounded-lg">
          <div className="p-2 bg-[hsl(var(--primary))] rounded-full">
            <Repeat className="w-5 h-5 text-[hsl(var(--primary-foreground))]" />
          </div>
          <div>
            <p className="font-bold text-[hsl(var(--card-foreground))]">Swap Unwanted Gifts</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Trade with Santa's community</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[hsl(var(--card))] p-4 rounded-lg">
          <div className="p-2 bg-[hsl(var(--secondary))] rounded-full">
            <Gift className="w-5 h-5 text-[hsl(var(--secondary-foreground))]" />
          </div>
          <div>
            <p className="font-bold text-[hsl(var(--card-foreground))]">Rate Gift Value</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Fair swaps for everyone</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[hsl(var(--card))] p-4 rounded-lg">
          <div className="p-2 bg-[hsl(var(--accent))] rounded-full">
            <DollarSign className="w-5 h-5 text-[hsl(var(--accent-foreground))]" />
          </div>
          <div>
            <p className="font-bold text-[hsl(var(--card-foreground))]">Add Cash to Upgrade</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Sweeten your swap deal</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto">
        <div className="text-center">
          <p className="text-2xl font-black text-[hsl(var(--primary))]">10.2k</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Active Swaps</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-[hsl(var(--secondary))]">98%</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Happy Traders</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-[hsl(var(--accent))]">24hr</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Avg Swap Time</p>
        </div>
      </div>
    </SplashHero>
  )
}
