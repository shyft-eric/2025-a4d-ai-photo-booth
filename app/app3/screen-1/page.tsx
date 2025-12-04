import { NavBar } from "@/components/booth/nav-bar"
import { Home, Wind, BarChart3, Moon } from "lucide-react"

export default function App3Screen1() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Dark Breathing</p>
        <h1 className="text-2xl font-black text-[hsl(var(--foreground))]">Memento Mori</h1>
      </div>

      {/* Breathing Circle */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-[hsl(var(--primary))] opacity-20 blur-xl scale-125" />

          {/* Main breathing circle */}
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--card))] flex items-center justify-center relative shadow-2xl border-4 border-[hsl(var(--primary))]">
            <div className="text-center">
              <p className="text-5xl font-black text-[hsl(var(--primary-foreground))]">4</p>
              <p className="text-sm text-[hsl(var(--primary-foreground))] opacity-80 mt-1">INHALE</p>
            </div>
          </div>

          {/* Decorative skulls around the circle */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl opacity-60">💀</div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl opacity-60">💀</div>
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 text-2xl opacity-60">💀</div>
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-2xl opacity-60">💀</div>
        </div>

        {/* Dark wisdom */}
        <div className="mt-8 text-center max-w-[250px]">
          <p className="text-[hsl(var(--accent))] font-bold text-lg">Breathe In Darkness</p>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">
            Each breath brings you closer to the void... and that&apos;s perfectly fine.
          </p>
        </div>

        {/* Breathing pattern */}
        <div className="flex gap-4 mt-6">
          <div className="px-4 py-2 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Pattern</p>
            <p className="font-bold text-[hsl(var(--foreground))]">4-7-8 Death</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Session</p>
            <p className="font-bold text-[hsl(var(--foreground))]">13 min</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home", active: false },
          { icon: <Wind className="w-5 h-5" />, label: "Breathe", active: true },
          { icon: <BarChart3 className="w-5 h-5" />, label: "Doom", active: false },
          { icon: <Moon className="w-5 h-5" />, label: "Sleep", active: false },
        ]}
      />
    </div>
  )
}
