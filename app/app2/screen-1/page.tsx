import { NavBar } from "@/components/booth/nav-bar"
import { Badge } from "@/components/booth/data-display"
import { Home, Calendar, TrendingUp, Gift, CheckCircle2, Circle } from "lucide-react"

export default function App2Screen1() {
  const habits = [
    { name: "Morning sleigh prep", completed: true, streak: 12 },
    { name: "Check naughty list", completed: true, streak: 24 },
    { name: "Feed the reindeer", completed: true, streak: 365 },
    { name: "Read wish letters", completed: false, streak: 8 },
    { name: "Workshop inspection", completed: false, streak: 15 },
    { name: "Cookie quality test", completed: true, streak: 31 },
  ]

  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">December 25, 2025</p>
        <h1 className="text-2xl font-black text-[hsl(var(--foreground))]">Today's Deliveries</h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="success" size="sm">4 completed</Badge>
          <Badge variant="warning" size="sm">2 pending</Badge>
        </div>
      </div>

      {/* Motivation Banner */}
      <div className="px-5 py-4 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🎅</div>
          <div className="flex-1">
            <p className="font-bold text-white">Ho Ho Ho!</p>
            <p className="text-sm text-white opacity-90">
              You're on a 24-day streak! Keep spreading joy!
            </p>
          </div>
        </div>
      </div>

      {/* Habit List */}
      <div className="flex-1 p-5 overflow-auto pb-24">
        <h2 className="font-bold text-[hsl(var(--foreground))] mb-4">Daily Habits</h2>

        <div className="space-y-3">
          {habits.map((habit, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                habit.completed
                  ? "bg-[hsl(var(--primary))]"
                  : "bg-[hsl(var(--muted))]"
              }`}>
                {habit.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <Circle className="w-6 h-6 text-[hsl(var(--muted-foreground))]" />
                )}
              </div>

              <div className="flex-1">
                <p className={`font-semibold ${
                  habit.completed
                    ? "text-[hsl(var(--foreground))] line-through opacity-60"
                    : "text-[hsl(var(--foreground))]"
                }`}>
                  {habit.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">
                    {habit.streak} day streak
                  </span>
                  <span className="text-xs">🔥</span>
                </div>
              </div>

              {habit.completed && (
                <Gift className="w-5 h-5 text-[hsl(var(--primary))]" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-[hsl(var(--secondary))]">
          <p className="font-bold text-[hsl(var(--secondary-foreground))]">
            🎄 Santa's Tip:
          </p>
          <p className="text-sm text-[hsl(var(--secondary-foreground))] mt-1">
            Consistency is the key to making the nice list! Complete all habits to unlock special rewards.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home", active: false },
          { icon: <Calendar className="w-5 h-5" />, label: "Habits", active: true },
          { icon: <TrendingUp className="w-5 h-5" />, label: "Progress", active: false },
          { icon: <Gift className="w-5 h-5" />, label: "Rewards", active: false },
        ]}
      />
    </div>
  )
}
