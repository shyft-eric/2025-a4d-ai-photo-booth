import { Gift, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SleighShareSplash() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-8 text-center relative overflow-hidden theme-gradient">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          // Use deterministic positions based on index to avoid hydration mismatch
          const left = ((i * 37 + 13) % 100)
          const top = ((i * 53 + 29) % 100)
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{ left: `${left}%`, top: `${top}%` }}
            />
          )
        })}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm">
        {/* App Icon */}
        <div className="w-28 h-28 rounded-3xl bg-white shadow-2xl flex items-center justify-center">
          <div className="relative">
            <Gift className="w-14 h-14 text-[hsl(var(--primary))]" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-5xl font-black tracking-tight text-white">
            SleighShare
          </h1>
          <p className="text-xl text-white/90">
            Your nose glows brighter with every 5-star ride ✨
          </p>
        </div>

        {/* Features */}
        <div className="flex gap-4 text-white/80 text-sm mt-2">
          <span>🦌 Reindeer Fleet</span>
          <span>🗺️ North Pole GPS</span>
        </div>

        {/* CTA */}
        <Button size="xl" className="mt-6 bg-white text-[hsl(var(--primary))] hover:bg-white/90 shadow-xl">
          Request a Sleigh
        </Button>

        <p className="text-white/60 text-sm mt-4">
          By Rudolph • Holiday Hackathon 2024
        </p>
      </div>
    </div>
  )
}
