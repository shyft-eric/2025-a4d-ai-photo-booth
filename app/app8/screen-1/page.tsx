import { NavBar } from "@/components/booth/nav-bar"
import { MapPlaceholder } from "@/components/booth/interactive"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/booth/data-display"
import { Home, User, MapPin, Settings, AlertTriangle, TrendingUp, Navigation } from "lucide-react"

export default function SafetyMap() {
  const drunkZones = [
    {
      name: "Holiday Tavern District",
      level: "High",
      count: 47,
      trend: "up",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      name: "Corporate Party Row",
      level: "Medium",
      count: 23,
      trend: "up",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      name: "Downtown Nightlife",
      level: "Low",
      count: 8,
      trend: "down",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
  ]

  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <h1 className="text-xl font-black text-[hsl(var(--foreground))]">
          Safe Route Navigator
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
          Real-time drunk zone detection powered by Rudolph
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 overflow-auto pb-24 space-y-4">
        {/* Map */}
        <MapPlaceholder markerCount={5} showRoute={true}>
          <div className="bg-[hsl(var(--card))] rounded-xl p-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-[hsl(var(--primary-foreground))]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[hsl(var(--foreground))]">
                    Safe Route Active
                  </p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Avoiding 3 danger zones
                  </p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                Clear
              </Badge>
            </div>
          </div>
        </MapPlaceholder>

        {/* Alert Banner */}
        <div className="p-4 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-[hsl(var(--foreground))]">
                High Activity Alert
              </h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 leading-relaxed">
                47 tipsy travelers detected in Holiday Tavern District. Route automatically adjusted for your safety.
              </p>
            </div>
          </div>
        </div>

        {/* Hot Zones List */}
        <div>
          <h3 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3">
            Current Hot Zones
          </h3>
          <div className="space-y-3">
            {drunkZones.map((zone, index) => (
              <Card
                key={index}
                className={`p-4 bg-[hsl(var(--card))] border-[hsl(var(--border))] ${zone.bgColor}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${zone.color}`} />
                      <h4 className="font-bold text-sm text-[hsl(var(--foreground))]">
                        {zone.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`${zone.color} bg-transparent border-current`}>
                        {zone.level} Risk
                      </Badge>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">
                        {zone.count} detected
                      </span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-3 h-3 ${zone.trend === 'up' ? 'text-red-500' : 'text-green-500'} ${zone.trend === 'down' && 'rotate-180'}`} />
                        <span className={`text-xs font-medium ${zone.trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                          {zone.trend === 'up' ? 'Rising' : 'Falling'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-[hsl(var(--card))] rounded-lg border border-[hsl(var(--border))]">
            <p className="text-2xl font-black text-[hsl(var(--primary))]">78</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Total Zones</p>
          </div>
          <div className="text-center p-3 bg-[hsl(var(--card))] rounded-lg border border-[hsl(var(--border))]">
            <p className="text-2xl font-black text-green-500">+12</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Miles Saved</p>
          </div>
          <div className="text-center p-3 bg-[hsl(var(--card))] rounded-lg border border-[hsl(var(--border))]">
            <p className="text-2xl font-black text-[hsl(var(--primary))]">98%</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Safe Rating</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home" },
          { icon: <MapPin className="w-5 h-5" />, label: "Map", active: true },
          { icon: <User className="w-5 h-5" />, label: "Profile" },
          { icon: <Settings className="w-5 h-5" />, label: "Settings" },
        ]}
      />
    </div>
  )
}
