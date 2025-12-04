import { Star, Phone, MessageCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, Badge } from "@/components/booth/data-display"
import { MapPlaceholder, BottomSheet } from "@/components/booth/interactive"

export default function SleighShareMap() {
  return (
    <div className="relative h-full bg-[hsl(var(--background))]">
      {/* Status Bar Area */}
      <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-6 pt-3 z-40 text-[hsl(var(--foreground))]">
        <span className="text-xs font-medium">9:41</span>
        <div className="flex items-center gap-1 text-xs">
          <span>🔋</span>
        </div>
      </div>

      {/* Map Area */}
      <div className="absolute inset-0 pt-12">
        <MapPlaceholder
          markerCount={2}
          showRoute
          className="h-full rounded-none"
        />

        {/* Current Location Indicator */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-white rounded-full shadow-lg flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[hsl(var(--primary))]" />
          <span className="text-sm font-medium">North Pole Village</span>
        </div>

        {/* Nose Glow Indicator (fun feature) */}
        <div className="absolute top-36 right-4 px-3 py-2 bg-[hsl(var(--primary))] text-white rounded-xl shadow-lg">
          <div className="text-xs opacity-80">Nose Glow</div>
          <div className="text-lg font-black">✨ 87%</div>
        </div>
      </div>

      {/* Driver Card Bottom Sheet */}
      <BottomSheet height="md">
        <div className="space-y-4">
          {/* Driver Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar
                fallback="D"
                size="lg"
                className="bg-[hsl(var(--secondary))]"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs">🦌</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">Dasher</h3>
                <Badge variant="success" size="sm">4.9 ⭐</Badge>
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Arctic Express Sleigh • 🔴 Red Harness
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[hsl(var(--border))]">
            <div className="text-center">
              <p className="text-lg font-bold">2,847</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Deliveries</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">3 min</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Away</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">❄️ Pro</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Blizzard Cert</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" size="icon" className="flex-1 h-12">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="flex-1 h-12">
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button className="flex-[3] h-12">
              Track Sleigh
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
