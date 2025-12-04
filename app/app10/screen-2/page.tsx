import { NavBar } from "@/components/booth/nav-bar"
import { StatsCard } from "@/components/booth/data-display"
import { Home, Activity, TrendingUp, Sparkles, Candy, Coffee, Wine } from "lucide-react"
import { ProgressRing } from "@/components/booth/data-display"

export default function StatsScreen() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-6 theme-gradient">
        <h1 className="text-2xl font-black text-white">Your Zen Journey</h1>
        <p className="text-sm text-white/70 mt-1">Sweet mindfulness achievements</p>
      </div>

      {/* Content - use pb-24 for nav clearance */}
      <div className="flex-1 p-5 overflow-auto pb-24 space-y-6">
        {/* Today's Progress Ring */}
        <div className="bg-[hsl(var(--card))] rounded-3xl p-6 border border-[hsl(var(--border))] flex flex-col items-center">
          <h2 className="text-lg font-black text-[hsl(var(--foreground))] mb-4">Today's Mindfulness</h2>
          <div className="relative">
            <ProgressRing
              value={78}
              size={140}
              strokeWidth={12}
              label="Complete"
            />
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-4 text-center">
            Great work! You're 78% to your daily goal
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatsCard
            value="127"
            label="Candy Breaths"
            icon={<Candy className="w-5 h-5" />}
            trend="up"
            trendValue="+23 today"
          />
          <StatsCard
            value="42"
            label="Cocoa Sips"
            icon={<Coffee className="w-5 h-5" />}
            trend="up"
            trendValue="+8 today"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatsCard
            value="18"
            label="Cider Sniffs"
            icon={<Wine className="w-5 h-5" />}
            trend="neutral"
            trendValue="Same as yesterday"
          />
          <StatsCard
            value="2.8s"
            label="Avg Breath"
            icon={<Activity className="w-5 h-5" />}
            trend="up"
            trendValue="+0.4s deeper"
          />
        </div>

        {/* Weekly Streak */}
        <div className="bg-[hsl(var(--card))] rounded-3xl p-6 border border-[hsl(var(--border))]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-[hsl(var(--foreground))]">7-Day Streak</h2>
            <Sparkles className="w-6 h-6 text-[hsl(var(--primary))]" />
          </div>

          <div className="flex justify-between items-end h-32 gap-2">
            {[65, 82, 91, 78, 88, 95, 78].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-t-lg transition-all"
                  style={{ height: `${value}%` }}
                ></div>
                <span className="text-xs text-[hsl(var(--muted-foreground))] font-medium">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-[hsl(var(--card))] rounded-3xl p-6 border border-[hsl(var(--border))]">
          <h2 className="text-lg font-black text-[hsl(var(--foreground))] mb-4">Recent Achievements</h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
                <Candy className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[hsl(var(--foreground))]">Sweet Zen Master</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">100 candy breaths completed</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[hsl(var(--foreground))]">Cocoa Connoisseur</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Perfect sip timing for 5 days</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[hsl(var(--foreground))]">Magical Mindfulness</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">7-day streak maintained</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home" },
          { icon: <Activity className="w-5 h-5" />, label: "Breathe" },
          { icon: <TrendingUp className="w-5 h-5" />, label: "Stats", active: true },
          { icon: <Sparkles className="w-5 h-5" />, label: "Magic" },
        ]}
      />
    </div>
  )
}
