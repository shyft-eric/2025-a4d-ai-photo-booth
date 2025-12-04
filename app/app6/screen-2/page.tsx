import { NavBar } from "@/components/booth/nav-bar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/booth/data-display"
import { Home, User, Clock, Settings, MapPin, Star, Skull } from "lucide-react"

export default function TripSummary() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <h1 className="text-xl font-black text-[hsl(var(--foreground))]">
          Booking Confirmed
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
          Your Grinch is on the way
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 overflow-auto pb-24 space-y-4">
        {/* Selected Grinch */}
        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center text-3xl">
                👹
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[hsl(var(--foreground))]">
                  Krampus Jr.
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-medium text-[hsl(var(--foreground))]">
                      5.0
                    </span>
                  </div>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">•</span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">
                    247 terrified customers
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-[hsl(var(--primary))]">
                  $45.00
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horror Level */}
        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Skull className="w-4 h-4 text-[hsl(var(--primary))]" />
              Horror Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Scare Level
              </span>
              <div className="flex gap-0.5">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-4 rounded-sm ${
                      i < 8
                        ? "bg-[hsl(var(--primary))]"
                        : "bg-[hsl(var(--muted))]"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Specialty
              </span>
              <Badge className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                Naughty List Expert
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Duration
              </span>
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                30 minutes
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Arrival Info */}
        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[hsl(var(--primary))]" />
              Arrival Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Estimated Arrival
              </span>
              <span className="text-sm font-black text-[hsl(var(--primary))]">
                12 minutes
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Location
              </span>
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                123 Whoville Lane
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Sleigh ID
              </span>
              <span className="text-sm font-mono text-[hsl(var(--foreground))]">
                KRMP-666
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Emotional Scarring Guarantee */}
        <div className="p-4 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🎁</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[hsl(var(--foreground))]">
                Emotional Scarring Guarantee
              </h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 leading-relaxed">
                We guarantee lasting memories and at least 3-5 therapy sessions, or your money back!
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          size="lg"
          className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90"
        >
          Track Your Grinch
        </Button>
      </div>

      {/* Bottom Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home" },
          { icon: <Clock className="w-5 h-5" />, label: "History", active: true },
          { icon: <User className="w-5 h-5" />, label: "Profile" },
          { icon: <Settings className="w-5 h-5" />, label: "Settings" },
        ]}
      />
    </div>
  )
}
