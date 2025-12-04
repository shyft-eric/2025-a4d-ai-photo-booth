import { NavBar } from "@/components/booth/nav-bar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/booth/data-display"
import { Home, User, MapPin, Settings, CheckCircle, Clock, Shield, TrendingUp } from "lucide-react"

export default function TripSummary() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <h1 className="text-xl font-black text-[hsl(var(--foreground))]">
          Trip Complete
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
          You navigated safely through the holiday chaos
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 overflow-auto pb-24 space-y-4">
        {/* Success Banner */}
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-[hsl(var(--primary))]/10 border border-green-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[hsl(var(--foreground))]">
                Perfect Safety Score!
              </h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 leading-relaxed">
                You successfully avoided all drunk zones and arrived safely. Rudolph's red nose guided you well!
              </p>
            </div>
          </div>
        </div>

        {/* Trip Stats */}
        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-[hsl(var(--primary))]" />
              Safety Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Drunk Zones Avoided
              </span>
              <span className="text-lg font-black text-[hsl(var(--primary))]">
                7
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Route Optimization
              </span>
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                +18% Safer
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Extra Distance
              </span>
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                +2.3 miles
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Incidents Prevented
              </span>
              <span className="text-lg font-black text-green-500">
                3
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Time & Distance */}
        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-[hsl(var(--primary))]" />
              Trip Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Total Duration
              </span>
              <span className="text-sm font-black text-[hsl(var(--foreground))]">
                18 min 42 sec
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Total Distance
              </span>
              <span className="text-sm font-black text-[hsl(var(--foreground))]">
                8.7 miles
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Average Speed
              </span>
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                28 mph
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Safety Rating
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[hsl(var(--primary))]">★</span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Hot Zones Avoided */}
        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[hsl(var(--primary))]" />
              Zones Navigated Around
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { name: "Holiday Tavern District", risk: "High", time: "8:42 PM" },
              { name: "Corporate Party Row", risk: "Medium", time: "8:51 PM" },
              { name: "Downtown Bar Crawl", risk: "High", time: "9:03 PM" },
            ].map((zone, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-[hsl(var(--muted))]/50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                    {zone.name}
                  </p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Detected at {zone.time}
                  </p>
                </div>
                <Badge
                  className={`${
                    zone.risk === "High"
                      ? "bg-red-500/20 text-red-500 border-red-500/30"
                      : "bg-orange-500/20 text-orange-500 border-orange-500/30"
                  }`}
                >
                  {zone.risk}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievement */}
        <div className="p-4 bg-gradient-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--accent))]/10 rounded-lg border border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-2xl">
              🦌
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-[hsl(var(--foreground))]">
                  Safe Navigator Badge Earned
                </h4>
                <TrendingUp className="w-3 h-3 text-green-500" />
              </div>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                You've completed 10 safe trips this holiday season
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          size="lg"
          className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90"
        >
          Start Another Safe Trip
        </Button>
      </div>

      {/* Bottom Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home" },
          { icon: <MapPin className="w-5 h-5" />, label: "Map" },
          { icon: <User className="w-5 h-5" />, label: "Profile", active: true },
          { icon: <Settings className="w-5 h-5" />, label: "Settings" },
        ]}
      />
    </div>
  )
}
