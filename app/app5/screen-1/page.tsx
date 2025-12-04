import { NavBar } from "@/components/booth/nav-bar"
import { ProfileCard } from "@/components/booth/interactive"
import { Button } from "@/components/ui/button"
import { Heart, X, Crown, MapPin, Sparkles } from "lucide-react"

export default function MatchScreen() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <h1 className="text-xl font-black text-[hsl(var(--foreground))]">Discover</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Souls from magical realms</p>
      </div>

      {/* Content - Main Card */}
      <div className="flex-1 p-5 overflow-hidden pb-24 flex flex-col items-center justify-center">
        {/* Profile Card Stack */}
        <div className="relative w-full max-w-sm">
          {/* Background card (next in stack) */}
          <div className="absolute inset-0 bg-[hsl(var(--card))] rounded-3xl transform scale-95 opacity-50 -z-10 translate-y-4"></div>

          {/* Main Card */}
          <div className="bg-[hsl(var(--card))] rounded-3xl overflow-hidden border-2 border-[hsl(var(--border))] shadow-2xl">
            {/* Hero Image Area */}
            <div className="h-80 theme-gradient relative overflow-hidden">
              {/* Realm badge */}
              <div className="absolute top-4 left-4 bg-[hsl(var(--background))] backdrop-blur-sm bg-opacity-90 rounded-full px-4 py-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[hsl(var(--primary))]" />
                <span className="text-xs font-bold text-[hsl(var(--foreground))]">Land of Sweets</span>
              </div>

              {/* Verified badge */}
              <div className="absolute top-4 right-4 bg-[hsl(var(--accent))] rounded-full p-2">
                <Crown className="w-5 h-5 text-[hsl(var(--accent-foreground))]" />
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(var(--card))] to-transparent"></div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-3xl font-black text-[hsl(var(--foreground))]">Princess Clara</h2>
                <p className="text-lg text-[hsl(var(--muted-foreground))]">24 • Sugar Plum Fairy</p>
              </div>

              <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                <MapPin className="w-4 h-4 text-[hsl(var(--primary))]" />
                <span className="text-sm">1.2 realms away • Land of Sweets</span>
              </div>

              <div className="pt-2 space-y-2">
                <p className="text-sm text-[hsl(var(--foreground))]">
                  "Dancing through life with grace and sweetness. Love sugar-coated adventures
                  and moonlit waltzes in the Kingdom of Dolls."
                </p>
              </div>

              {/* Interest Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-full text-xs font-bold">
                  Ballet
                </span>
                <span className="px-3 py-1 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded-full text-xs font-bold">
                  Magic
                </span>
                <span className="px-3 py-1 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] rounded-full text-xs font-bold">
                  Adventure
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 mt-8">
          <button className="w-16 h-16 rounded-full bg-[hsl(var(--card))] border-2 border-[hsl(var(--border))] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <X className="w-7 h-7 text-[hsl(var(--muted-foreground))]" />
          </button>

          <button className="w-20 h-20 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
            <Heart className="w-9 h-9 text-[hsl(var(--accent-foreground))] fill-current" />
          </button>

          <button className="w-16 h-16 rounded-full bg-[hsl(var(--card))] border-2 border-[hsl(var(--primary))] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Crown className="w-7 h-7 text-[hsl(var(--primary))]" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <NavBar
        items={[
          { icon: <Sparkles className="w-5 h-5" />, label: "Discover", active: true },
          { icon: <Heart className="w-5 h-5" />, label: "Matches" },
          { icon: <Crown className="w-5 h-5" />, label: "Profile" },
        ]}
      />
    </div>
  )
}
