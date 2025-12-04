import { NavBar } from "@/components/booth/nav-bar"
import { Home, Gift, Repeat, User, DollarSign, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SwapCart() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <h1 className="text-xl font-black text-[hsl(var(--foreground))]">Finalize Your Swap</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Review and add cash if needed</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto pb-24">
        {/* Swap Summary */}
        <div className="p-5 bg-[hsl(var(--card))] border-b border-[hsl(var(--border))]">
          <h2 className="text-sm font-bold text-[hsl(var(--muted-foreground))] mb-3">SWAP SUMMARY</h2>

          <div className="space-y-3">
            {/* Your item */}
            <div className="flex items-center gap-3 p-3 bg-[hsl(var(--background))] rounded-lg">
              <div className="w-16 h-16 bg-[hsl(var(--muted))] rounded-lg flex items-center justify-center">
                <Gift className="w-8 h-8 text-[hsl(var(--muted-foreground))]" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[hsl(var(--foreground))]">Ugly Sweater</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Your gift</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-[hsl(var(--primary))]">★ 4.0</p>
              </div>
            </div>

            {/* Divider */}
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center">
                <Repeat className="w-4 h-4 text-[hsl(var(--accent-foreground))]" />
              </div>
            </div>

            {/* Their item */}
            <div className="flex items-center gap-3 p-3 bg-[hsl(var(--background))] rounded-lg">
              <div className="w-16 h-16 bg-[hsl(var(--muted))] rounded-lg flex items-center justify-center">
                <Gift className="w-8 h-8 text-[hsl(var(--muted-foreground))]" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[hsl(var(--foreground))]">Smart Watch</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Their gift</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-[hsl(var(--secondary))]">★ 5.0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cash Upgrade Section */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-[hsl(var(--accent))]" />
            <h2 className="text-sm font-bold text-[hsl(var(--muted-foreground))]">ADD CASH TO UPGRADE</h2>
          </div>

          {/* Value Gap Alert */}
          <div className="bg-[hsl(var(--accent))] bg-opacity-10 border border-[hsl(var(--accent))] rounded-lg p-4 mb-4">
            <p className="text-sm font-bold text-[hsl(var(--foreground))] mb-1">Fair Swap Suggestion</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Based on ratings, we suggest adding <span className="font-bold text-[hsl(var(--foreground))]">$25</span> to make this swap equitable.
            </p>
          </div>

          {/* Cash Amount Selector */}
          <div className="bg-[hsl(var(--card))] rounded-xl p-5 border border-[hsl(var(--border))]">
            <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3 text-center">CASH AMOUNT</p>

            <div className="flex items-center justify-center gap-4 mb-4">
              <button className="w-12 h-12 bg-[hsl(var(--secondary))] rounded-full flex items-center justify-center">
                <Minus className="w-5 h-5 text-[hsl(var(--secondary-foreground))]" />
              </button>

              <div className="px-8 py-4 bg-[hsl(var(--background))] rounded-xl border-2 border-[hsl(var(--primary))]">
                <p className="text-4xl font-black text-[hsl(var(--foreground))] text-center">$25</p>
              </div>

              <button className="w-12 h-12 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-[hsl(var(--primary-foreground))]" />
              </button>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[10, 25, 50, 100].map((amount) => (
                <button
                  key={amount}
                  className={`py-2 rounded-lg font-bold text-sm ${
                    amount === 25
                      ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                      : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-5 bg-[hsl(var(--card))] rounded-xl p-4 border border-[hsl(var(--border))]">
            <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">PAYMENT METHOD</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-[hsl(var(--primary))] rounded flex items-center justify-center">
                <span className="text-[hsl(var(--primary-foreground))] text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="font-bold text-sm text-[hsl(var(--foreground))]">••••  4242</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Expires 12/25</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Summary */}
        <div className="px-5 pb-5">
          <div className="bg-[hsl(var(--primary))] rounded-xl p-5">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[hsl(var(--primary-foreground))] opacity-80">Your Gift Value</p>
              <p className="text-[hsl(var(--primary-foreground))] font-bold">★ 4.0</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-[hsl(var(--primary-foreground))] opacity-80">Their Gift Value</p>
              <p className="text-[hsl(var(--primary-foreground))] font-bold">★ 5.0</p>
            </div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-[hsl(var(--primary-foreground))] opacity-80">Cash Added</p>
              <p className="text-[hsl(var(--primary-foreground))] font-bold">+ $25.00</p>
            </div>
            <div className="border-t border-[hsl(var(--primary-foreground))] opacity-20 mb-3"></div>
            <div className="flex justify-between items-center">
              <p className="text-[hsl(var(--primary-foreground))] font-black text-lg">Total Deal Value</p>
              <p className="text-[hsl(var(--primary-foreground))] font-black text-2xl">Fair!</p>
            </div>
          </div>

          {/* Confirm Button */}
          <Button className="w-full h-14 mt-4 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-black text-lg">
            Confirm Swap + Payment
          </Button>

          <p className="text-center text-xs text-[hsl(var(--muted-foreground))] mt-3">
            By confirming, you agree to Santa's Swap Meet terms
          </p>
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
