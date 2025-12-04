// Screen 1: How Dark? - Darkness Tracker
import { NavBar } from "@/components/booth/nav-bar"
import { ProgressRing } from "@/components/booth/data-display"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Moon, Beer, TrendingUp, Home } from "lucide-react"

export default function Screen1() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-[hsl(var(--foreground))]">How Dark?</h1>
            <p className="text-xs text-[hsl(var(--foreground))]/70">Darkness Index</p>
          </div>
          <Moon className="w-8 h-8 text-[hsl(var(--primary))]" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 overflow-auto pb-24 space-y-5">
        {/* Darkness Ring */}
        <div className="flex justify-center pt-4">
          <div className="text-center">
            <ProgressRing
              value={100}
              max={100}
              label="Darkness"
              size="large"
            />
            <p className="text-sm text-[hsl(var(--foreground))]/70 mt-3">
              Optimal gloom achieved
            </p>
          </div>
        </div>

        {/* Daily Darkness Stats */}
        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Today's Darkness Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[hsl(var(--foreground))]/80">Hours of night</span>
              <span className="text-lg font-bold text-[hsl(var(--foreground))]">18h</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[hsl(var(--foreground))]/80">Cloudiness</span>
              <span className="text-lg font-bold text-[hsl(var(--foreground))]">97%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[hsl(var(--foreground))]/80">Cave visits</span>
              <span className="text-lg font-bold text-[hsl(var(--foreground))]">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[hsl(var(--foreground))]/80">Basement time</span>
              <span className="text-lg font-bold text-[hsl(var(--foreground))]">6h</span>
            </div>
          </CardContent>
        </Card>

        {/* Darkness Achievements */}
        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-sm">Darkness Milestones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-3 p-2 rounded bg-[hsl(var(--muted))]">
              <Moon className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Eternal Night</p>
                <p className="text-xs text-[hsl(var(--foreground))]/70">7 consecutive days without sun</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2 rounded bg-[hsl(var(--muted))]">
              <Moon className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Shadow Dweller</p>
                <p className="text-xs text-[hsl(var(--foreground))]/70">100% indoor darkness score</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2 rounded bg-[hsl(var(--muted))]">
              <Moon className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Abyss Walker</p>
                <p className="text-xs text-[hsl(var(--foreground))]/70">Navigated pitch black for 2 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home" },
          { icon: <Moon className="w-5 h-5" />, label: "Dark", active: true },
          { icon: <Beer className="w-5 h-5" />, label: "Beer" },
          { icon: <TrendingUp className="w-5 h-5" />, label: "Stats" },
        ]}
      />
    </div>
  )
}
