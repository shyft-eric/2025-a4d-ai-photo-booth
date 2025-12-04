import { NavBar } from "@/components/booth/nav-bar"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/booth/data-display"
import { MapPin, Home, User, Clock, Settings } from "lucide-react"

export default function DriverSelection() {
  const grinches = [
    {
      name: "The Classic Grinch",
      rating: "4.9",
      scareLevel: 5,
      specialty: "Heart Stealing",
      eta: "8 min",
      price: "$25",
      avatar: "🟢",
    },
    {
      name: "Krampus Jr.",
      rating: "5.0",
      scareLevel: 8,
      specialty: "Naughty List Expert",
      eta: "12 min",
      price: "$45",
      avatar: "👹",
    },
    {
      name: "Grumpy McScrooge",
      rating: "4.7",
      scareLevel: 6,
      specialty: "Wealth Shaming",
      eta: "5 min",
      price: "$30",
      avatar: "💰",
    },
  ]

  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <h1 className="text-xl font-black text-[hsl(var(--foreground))]">
          Available Grinches
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
          Select your preferred nightmare
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 overflow-auto pb-24 space-y-4">
        {grinches.map((grinch, index) => (
          <Card
            key={index}
            className="p-4 bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] transition-colors cursor-pointer"
          >
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center text-3xl">
                  {grinch.avatar}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-[hsl(var(--foreground))]">
                      {grinch.name}
                    </h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                      {grinch.specialty}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-[hsl(var(--primary))]">
                      {grinch.price}
                    </div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))]">
                      {grinch.eta} away
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-xs font-medium text-[hsl(var(--foreground))]">
                      {grinch.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
                      Scare Level:
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-3 rounded-sm ${
                            i < grinch.scareLevel
                              ? "bg-[hsl(var(--primary))]"
                              : "bg-[hsl(var(--muted))]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Location hint */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[hsl(var(--muted))] rounded-lg">
          <MapPin className="w-4 h-4 text-[hsl(var(--primary))]" />
          <p className="text-xs text-[hsl(var(--foreground))]">
            Pickup: 123 Whoville Lane
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home", active: true },
          { icon: <Clock className="w-5 h-5" />, label: "History" },
          { icon: <User className="w-5 h-5" />, label: "Profile" },
          { icon: <Settings className="w-5 h-5" />, label: "Settings" },
        ]}
      />
    </div>
  )
}
