import { NavBar } from "@/components/booth/nav-bar"
import { ProgressRing, StatsCard } from "@/components/booth/data-display"
import { Home, Calendar, TrendingUp, Gift, TrendingDown } from "lucide-react"

export default function App2Screen2() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">This Week</p>
        <h1 className="text-2xl font-black text-[hsl(var(--foreground))]">Progress Dashboard</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 overflow-auto pb-24">
        {/* Progress Ring */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <ProgressRing
              value={72}
              size={140}
              strokeWidth={12}
              label="Complete"
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-[hsl(var(--foreground))]">
            18 of 25 Tasks Sleighed!
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
            7 more to reach your weekly goal
          </p>
        </div>

        {/* Burndown Chart Visual */}
        <div className="p-5 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] mb-6">
          <h3 className="font-bold text-[hsl(var(--foreground))] mb-4">Weekly Burndown</h3>

          {/* Simple bar chart visualization */}
          <div className="space-y-3">
            {[
              { day: "Mon", tasks: 20, completed: 16 },
              { day: "Tue", tasks: 18, completed: 15 },
              { day: "Wed", tasks: 15, completed: 13 },
              { day: "Thu", tasks: 12, completed: 11 },
              { day: "Fri", tasks: 10, completed: 8 },
              { day: "Sat", tasks: 7, completed: 0 },
              { day: "Sun", tasks: 5, completed: 0 },
            ].map((day, index) => {
              const totalHeight = 100
              const remainingHeight = (day.tasks / 20) * totalHeight
              const completedHeight = (day.completed / 20) * totalHeight
              const isToday = index === 4

              return (
                <div key={day.day} className="flex items-end gap-3">
                  <span className={`text-xs font-semibold w-8 ${
                    isToday ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]"
                  }`}>
                    {day.day}
                  </span>
                  <div className="flex-1 flex gap-2 items-end">
                    {/* Completed bar */}
                    <div
                      className="bg-[hsl(var(--primary))] rounded-t transition-all"
                      style={{
                        height: `${completedHeight}px`,
                        width: '45%'
                      }}
                    />
                    {/* Remaining bar */}
                    <div
                      className="bg-[hsl(var(--muted))] rounded-t transition-all opacity-50"
                      style={{
                        height: `${remainingHeight}px`,
                        width: '45%'
                      }}
                    />
                  </div>
                  <span className="text-xs text-[hsl(var(--muted-foreground))] w-8 text-right">
                    {day.tasks}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[hsl(var(--border))]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[hsl(var(--primary))]"></div>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[hsl(var(--muted))] opacity-50"></div>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Remaining</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatsCard
            value="24"
            label="Day streak"
            icon={<span className="text-xl">🔥</span>}
            trend="up"
            trendValue="+2 days"
          />
          <StatsCard
            value="156"
            label="Total completed"
            icon={<span className="text-xl">✅</span>}
            trend="up"
            trendValue="This month"
          />
        </div>

        {/* Achievement Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--primary))] text-white">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🏆</div>
            <div>
              <p className="font-bold">Nice List Achievement!</p>
              <p className="text-sm opacity-90 mt-1">
                You've completed 72% of your tasks this week. Keep it up to earn the Golden Sleigh Badge!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home", active: false },
          { icon: <Calendar className="w-5 h-5" />, label: "Habits", active: false },
          { icon: <TrendingUp className="w-5 h-5" />, label: "Progress", active: true },
          { icon: <Gift className="w-5 h-5" />, label: "Rewards", active: false },
        ]}
      />
    </div>
  )
}
