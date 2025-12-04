// Screen 2: How Dark and How Beer? - Combined Achievement Screen
import { NavBar } from "@/components/booth/nav-bar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/booth/data-display"
import { Moon, Beer, TrendingUp, Home, Award, Flame } from "lucide-react"

export default function Screen2() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-[hsl(var(--foreground))]">Achievement Unlocked</h1>
            <p className="text-xs text-[hsl(var(--foreground))]/70">Dark Beer Mastery</p>
          </div>
          <Award className="w-8 h-8 text-[hsl(var(--primary))]" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 overflow-auto pb-24 space-y-5">
        {/* Ultimate Achievement Card */}
        <Card className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] border-[hsl(var(--border))] text-[hsl(var(--primary-foreground))]">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-[hsl(var(--background))]/20 flex items-center justify-center">
                <Flame className="w-10 h-10" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black">Winter Survivalist</h2>
              <p className="text-sm opacity-90 mt-1">7-Day Darkness + Beer Streak</p>
            </div>
            <div className="flex gap-2 justify-center">
              <Badge variant="success">100% Dark</Badge>
              <Badge variant="success">200 Beers</Badge>
              <Badge variant="success">Level 13</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Combined Stats */}
        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-sm">This Week's Synergy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[hsl(var(--foreground))]/80">Darkness × Beer Combo</span>
                <span className="text-lg font-bold text-[hsl(var(--primary))]">13x</span>
              </div>
              <div className="h-2 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]" style={{ width: "100%" }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded bg-[hsl(var(--muted))]">
                <Moon className="w-6 h-6 mx-auto mb-1 text-[hsl(var(--primary))]" />
                <p className="text-2xl font-black text-[hsl(var(--foreground))]">168</p>
                <p className="text-xs text-[hsl(var(--foreground))]/70">Hours Dark</p>
              </div>
              <div className="text-center p-3 rounded bg-[hsl(var(--muted))]">
                <Beer className="w-6 h-6 mx-auto mb-1 text-[hsl(var(--accent))]" />
                <p className="text-2xl font-black text-[hsl(var(--foreground))]">47</p>
                <p className="text-xs text-[hsl(var(--foreground))]/70">Beers Logged</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-sm">Recent Unlocks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded bg-[hsl(var(--muted))]">
              <Award className="w-5 h-5 text-[hsl(var(--primary))] shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[hsl(var(--foreground))]">The Long Night</p>
                <p className="text-xs text-[hsl(var(--foreground))]/70">18 hours darkness + 6 beers</p>
              </div>
              <span className="text-xs text-[hsl(var(--foreground))]/60">2h ago</span>
            </div>

            <div className="flex items-center gap-3 p-2 rounded bg-[hsl(var(--muted))]">
              <Award className="w-5 h-5 text-[hsl(var(--accent))] shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Basement Brewer</p>
                <p className="text-xs text-[hsl(var(--foreground))]/70">Drank in 100% darkness</p>
              </div>
              <span className="text-xs text-[hsl(var(--foreground))]/60">1d ago</span>
            </div>

            <div className="flex items-center gap-3 p-2 rounded bg-[hsl(var(--muted))]">
              <Award className="w-5 h-5 text-[hsl(var(--secondary))] shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Krampus Approved</p>
                <p className="text-xs text-[hsl(var(--foreground))]/70">Perfect darkness-to-beer ratio</p>
              </div>
              <span className="text-xs text-[hsl(var(--foreground))]/60">3d ago</span>
            </div>
          </CardContent>
        </Card>

        {/* Quote */}
        <div className="text-center p-4 bg-[hsl(var(--muted))] rounded-lg">
          <p className="text-sm italic text-[hsl(var(--foreground))]/80">
            "When the sun abandons you and warmth becomes a memory, beer becomes both fuel and friend."
          </p>
          <p className="text-xs text-[hsl(var(--foreground))]/70 mt-2">- Ancient Winter Wisdom</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home" },
          { icon: <Moon className="w-5 h-5" />, label: "Dark" },
          { icon: <Beer className="w-5 h-5" />, label: "Beer" },
          { icon: <TrendingUp className="w-5 h-5" />, label: "Stats", active: true },
        ]}
      />
    </div>
  )
}
