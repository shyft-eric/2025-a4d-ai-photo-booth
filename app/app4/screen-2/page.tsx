import { Star, Gift, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, StatsCard } from "@/components/booth/data-display"

export default function SleighShareSummary() {
  return (
    <div className="h-full bg-[hsl(var(--background))] overflow-auto">
      {/* Status Bar Area */}
      <div className="h-12 flex items-center justify-between px-6 pt-3">
        <span className="text-xs font-medium">9:41</span>
        <div className="flex items-center gap-1 text-xs">
          <span>🔋</span>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Success Header */}
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-black">Delivered!</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">
            Your gift arrived safely 🎁
          </p>
        </div>

        {/* Trip Card */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar fallback="D" size="md" className="bg-[hsl(var(--secondary))]" />
                <div>
                  <p className="font-semibold">Dasher</p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Arctic Express</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Trip Cost</p>
                <p className="text-xl font-bold">3 🍪</p>
              </div>
            </div>

            {/* Route Summary */}
            <div className="py-3 border-y border-[hsl(var(--border))] space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">Workshop District</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--primary))]" />
                <span className="text-sm">Candy Cane Lane #24</span>
              </div>
            </div>

            {/* Rating */}
            <div className="text-center py-2">
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                Rate your ride to boost your nose glow!
              </p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="w-10 h-10 rounded-full bg-[hsl(var(--muted))] hover:bg-[hsl(var(--accent))] flex items-center justify-center transition-colors"
                  >
                    <Star className={`w-5 h-5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-[hsl(var(--muted-foreground))]"}`} />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nose Glow Update */}
        <Card className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Nose Glow Increased!</p>
                  <p className="text-sm opacity-80">+5% from this ride</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-14 flex-col gap-1">
            <Gift className="w-5 h-5" />
            <span className="text-xs">Send Another</span>
          </Button>
          <Button className="h-14 flex-col gap-1">
            <Star className="w-5 h-5" />
            <span className="text-xs">Tip Dasher</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
