import { NavBar } from "@/components/booth/nav-bar"
import { Dumbbell, Flame, Calendar, Trophy, Sparkles, Timer } from "lucide-react"

export default function App9Screen1() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Your Future Self</p>
        <h1 className="text-2xl font-black text-[hsl(var(--foreground))]">Dream Transformations</h1>
      </div>

      {/* Transformation Preview Card */}
      <div className="mx-5 mt-4 p-4 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80 text-white">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">
            🏃
          </div>
          <div className="flex-1">
            <p className="text-xs opacity-70">After 10 miles/day for a year...</p>
            <p className="font-bold text-lg">You&apos;ll look like a superhero!</p>
            <p className="text-xs opacity-70">*Individual results may be hilariously better</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Sparkles className="w-4 h-4" />
          <span>AI-Generated Dream Preview</span>
        </div>
      </div>

      {/* Workout List */}
      <div className="flex-1 p-5 space-y-3 overflow-auto pb-24">
        <h2 className="font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          Today&apos;s Chill Workouts
        </h2>

        {/* Workout Item 1 */}
        <div className="p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary))]/10 flex items-center justify-center text-2xl">
              🏔️
            </div>
            <div className="flex-1">
              <p className="font-bold text-[hsl(var(--foreground))]">Snow Mountain Climbers</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">30 reps • Burns 150 snowflakes</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Future You:</p>
              <p className="text-xl">🦸</p>
            </div>
          </div>
        </div>

        {/* Workout Item 2 */}
        <div className="p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[hsl(var(--accent))]/20 flex items-center justify-center text-2xl">
              ⛷️
            </div>
            <div className="flex-1">
              <p className="font-bold text-[hsl(var(--foreground))]">Ski Squats of Power</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">20 reps • Glutes of glory</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Future You:</p>
              <p className="text-xl">🍑💪</p>
            </div>
          </div>
        </div>

        {/* Workout Item 3 */}
        <div className="p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
              🧊
            </div>
            <div className="flex-1">
              <p className="font-bold text-[hsl(var(--foreground))]">Ice Plank Challenge</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">60 sec • Core so cold it&apos;s hot</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Future You:</p>
              <p className="text-xl">🔥</p>
            </div>
          </div>
        </div>

        {/* Motivation Quote */}
        <div className="p-4 rounded-2xl bg-[hsl(var(--secondary))] mt-4">
          <p className="font-bold text-[hsl(var(--secondary-foreground))]">
            ⛄ Frosty says:
          </p>
          <p className="text-sm text-[hsl(var(--secondary-foreground))] mt-1">
            &ldquo;The only bad workout is the one you skipped to build a snowman. Actually, that sounds fun too!&rdquo;
          </p>
        </div>
      </div>

      {/* Navigation */}
      <NavBar
        items={[
          { icon: <Dumbbell className="w-5 h-5" />, label: "Workouts", active: true },
          { icon: <Timer className="w-5 h-5" />, label: "Timer", active: false },
          { icon: <Calendar className="w-5 h-5" />, label: "Schedule", active: false },
          { icon: <Trophy className="w-5 h-5" />, label: "Trophies", active: false },
        ]}
      />
    </div>
  )
}
