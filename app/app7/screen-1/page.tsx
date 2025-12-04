import { NavBar } from "@/components/booth/nav-bar"
import { Home, Gift, Repeat, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/booth/data-display"

export default function SwapDetail() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <h1 className="text-xl font-black text-[hsl(var(--foreground))]">Gift Swap Detail</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Perfect match found!</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto pb-24">
        {/* Your Gift Section */}
        <div className="p-5 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-4 h-4 text-[hsl(var(--primary))]" />
            <p className="text-sm font-bold text-[hsl(var(--muted-foreground))]">YOUR GIFT</p>
          </div>
          <div className="bg-[hsl(var(--card))] rounded-xl p-4 border border-[hsl(var(--border))]">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-[hsl(var(--muted))] rounded-lg flex items-center justify-center">
                <Gift className="w-10 h-10 text-[hsl(var(--muted-foreground))]" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-lg text-[hsl(var(--card-foreground))]">Ugly Sweater</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">Reindeer pattern, size XL</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Clothing</Badge>
                  <Badge variant="outline">Never Worn</Badge>
                </div>
              </div>
            </div>
            {/* Rating */}
            <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Your Gift Value Rating</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <div key={star} className="w-8 h-8 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center">
                    <span className="text-[hsl(var(--primary-foreground))] text-sm font-bold">★</span>
                  </div>
                ))}
                <div className="w-8 h-8 bg-[hsl(var(--muted))] rounded-full flex items-center justify-center">
                  <span className="text-[hsl(var(--muted-foreground))] text-sm">★</span>
                </div>
                <span className="ml-2 text-sm font-bold text-[hsl(var(--foreground))]">4.0/5.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Swap Icon */}
        <div className="flex justify-center py-4 bg-[hsl(var(--background))]">
          <div className="w-12 h-12 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center shadow-lg">
            <Repeat className="w-6 h-6 text-[hsl(var(--accent-foreground))]" />
          </div>
        </div>

        {/* Their Gift Section */}
        <div className="px-5 pb-5">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-4 h-4 text-[hsl(var(--secondary))]" />
            <p className="text-sm font-bold text-[hsl(var(--muted-foreground))]">THEIR GIFT</p>
          </div>
          <div className="bg-[hsl(var(--card))] rounded-xl p-4 border border-[hsl(var(--border))]">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-[hsl(var(--muted))] rounded-lg flex items-center justify-center">
                <Gift className="w-10 h-10 text-[hsl(var(--muted-foreground))]" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-lg text-[hsl(var(--card-foreground))]">Smart Watch</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">Fitness tracker, black band</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Electronics</Badge>
                  <Badge variant="outline">Like New</Badge>
                </div>
              </div>
            </div>
            {/* Rating */}
            <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Their Gift Value Rating</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="w-8 h-8 bg-[hsl(var(--secondary))] rounded-full flex items-center justify-center">
                    <span className="text-[hsl(var(--secondary-foreground))] text-sm font-bold">★</span>
                  </div>
                ))}
                <span className="ml-2 text-sm font-bold text-[hsl(var(--foreground))]">5.0/5.0</span>
              </div>
            </div>
          </div>

          {/* Swap Info */}
          <div className="mt-4 bg-[hsl(var(--accent))] bg-opacity-10 border border-[hsl(var(--accent))] rounded-lg p-4">
            <p className="text-sm font-bold text-[hsl(var(--foreground))] mb-1">Value Gap Notice</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Their gift is rated higher. Consider adding cash to make this swap fair!</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-5 pb-5 space-y-3">
          <Button className="w-full h-12 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold text-base">
            Propose Swap
          </Button>
          <Button variant="outline" className="w-full h-12 font-bold text-base">
            Add Cash & Upgrade
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home" },
          { icon: <Gift className="w-5 h-5" />, label: "My Gifts" },
          { icon: <Repeat className="w-5 h-5" />, label: "Swaps", active: true },
          { icon: <User className="w-5 h-5" />, label: "Profile" },
        ]}
      />
    </div>
  )
}
