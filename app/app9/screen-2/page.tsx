import { NavBar } from "@/components/booth/nav-bar"
import { Badge, ProgressRing } from "@/components/booth/data-display"
import { Dumbbell, Timer, Calendar, Trophy, Scale, TrendingDown } from "lucide-react"

export default function App9Screen2() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Your Icy Achievements</p>
            <h1 className="text-2xl font-black text-[hsl(var(--foreground))]">Hall of Frosty Fame</h1>
          </div>
          <Badge variant="default">Level 7 ⛄</Badge>
        </div>
      </div>

      {/* Weight Loss Progress - Funny */}
      <div className="mx-5 mt-4 p-4 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/70">
        <div className="flex items-center gap-4">
          <div className="relative">
            <ProgressRing value={73} size={90} strokeWidth={8} />
          </div>
          <div className="text-white flex-1">
            <p className="text-xs opacity-70">Weight Melted Away</p>
            <p className="text-2xl font-black">-15 lbs</p>
            <p className="text-xs opacity-70 mt-1">
              <TrendingDown className="w-3 h-3 inline" /> That&apos;s like losing a whole turkey!
            </p>
          </div>
          <div className="text-4xl">🦃</div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="flex-1 p-5 space-y-4 overflow-auto pb-24">
        <h2 className="font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Ridiculous Achievements
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Achievement 1 */}
          <div className="p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-center">
            <div className="text-4xl mb-2">🥶</div>
            <p className="font-bold text-sm text-[hsl(var(--foreground))]">Cold Starter</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Did 1 workout without complaining</p>
          </div>

          {/* Achievement 2 */}
          <div className="p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-center">
            <div className="text-4xl mb-2">🌊</div>
            <p className="font-bold text-sm text-[hsl(var(--foreground))]">Sweat Ocean</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Sweated enough to fill a bathtub</p>
          </div>

          {/* Achievement 3 */}
          <div className="p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-center">
            <div className="text-4xl mb-2">🦵</div>
            <p className="font-bold text-sm text-[hsl(var(--foreground))]">Thunder Thighs</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">500 squats completed. Ouch!</p>
          </div>

          {/* Achievement 4 */}
          <div className="p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-center">
            <div className="text-4xl mb-2">🍕</div>
            <p className="font-bold text-sm text-[hsl(var(--foreground))]">Pizza Burner</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Burned off a whole pizza&apos;s worth</p>
          </div>
        </div>

        {/* Funny Weight Loss Stats */}
        <div className="p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Scale className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[hsl(var(--foreground))]">Fun Weight Facts</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                You&apos;ve lost the equivalent of:
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="secondary">15 butter sticks 🧈</Badge>
            <Badge variant="secondary">3 bowling balls 🎳</Badge>
            <Badge variant="secondary">1 car tire 🚗</Badge>
          </div>
        </div>

        {/* Motivation */}
        <div className="p-4 rounded-2xl bg-[hsl(var(--secondary))]">
          <p className="font-bold text-[hsl(var(--secondary-foreground))]">
            ⛄ Frosty cheers:
          </p>
          <p className="text-sm text-[hsl(var(--secondary-foreground))] mt-1">
            &ldquo;You&apos;re doing amazing! Soon you&apos;ll be so fit, even I&apos;ll be jealous of your cool physique!&rdquo;
          </p>
        </div>
      </div>

      {/* Navigation */}
      <NavBar
        items={[
          { icon: <Dumbbell className="w-5 h-5" />, label: "Workouts", active: false },
          { icon: <Timer className="w-5 h-5" />, label: "Timer", active: false },
          { icon: <Calendar className="w-5 h-5" />, label: "Schedule", active: false },
          { icon: <Trophy className="w-5 h-5" />, label: "Trophies", active: true },
        ]}
      />
    </div>
  )
}
