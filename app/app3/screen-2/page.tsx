import { StatsCard } from "@/components/booth/data-display"
import { NavBar } from "@/components/booth/nav-bar"
import { Home, Wind, BarChart3, Moon, Skull, Clock, Flame, Ghost } from "lucide-react"

export default function App3Screen2() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Your Dark Journey</p>
        <h1 className="text-2xl font-black text-[hsl(var(--foreground))]">Doom Stats</h1>
      </div>

      {/* Stats Content */}
      <div className="flex-1 p-5 space-y-4 overflow-auto pb-24">
        {/* Mortality Counter */}
        <div className="p-4 rounded-2xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
          <div className="flex items-center gap-3">
            <Skull className="w-8 h-8" />
            <div>
              <p className="text-xs opacity-70">Time Until Inevitable End</p>
              <p className="text-2xl font-black">42 years, 87 days</p>
              <p className="text-xs opacity-70 mt-1">*Based on average life expectancy. Breathe while you can.</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <h2 className="font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Ghost className="w-4 h-4" />
          Weekly Darkness
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <StatsCard
            value="13"
            label="Dark meditations"
            trend="up"
            trendValue="Embracing it"
          />
          <StatsCard
            value="666"
            label="Minutes in void"
            trend="up"
            trendValue="Nice."
          />
          <StatsCard
            value="7"
            label="Existential crises"
            trend="neutral"
            trendValue="Par for course"
          />
          <StatsCard
            value="∞"
            label="Worries released"
            trend="up"
            trendValue="To the void"
          />
        </div>

        {/* Krampus Wisdom */}
        <div className="p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] mt-4">
          <div className="flex items-start gap-3">
            <div className="text-3xl">👹</div>
            <div>
              <p className="font-bold text-[hsl(var(--accent))]">Krampus Says:</p>
              <p className="text-sm text-[hsl(var(--foreground))] mt-1 italic">
                &ldquo;Nothing matters, and that&apos;s liberating. Now breathe deeply and accept the cold embrace of winter.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Achievement */}
        <div className="p-3 rounded-xl bg-[hsl(var(--muted))] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center">
            <Flame className="w-5 h-5 text-[hsl(var(--accent-foreground))]" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[hsl(var(--foreground))] text-sm">Dark Soul Unlocked</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Completed 13 midnight meditations</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home", active: false },
          { icon: <Wind className="w-5 h-5" />, label: "Breathe", active: false },
          { icon: <BarChart3 className="w-5 h-5" />, label: "Doom", active: true },
          { icon: <Moon className="w-5 h-5" />, label: "Sleep", active: false },
        ]}
      />
    </div>
  )
}
