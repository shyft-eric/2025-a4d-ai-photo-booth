import { StatsCard } from "@/components/booth/data-display"
import { NavBar } from "@/components/booth/nav-bar"
import { TrendingDown, TrendingUp, Coffee, Home, PieChart, Bell } from "lucide-react"

export default function App1Screen1() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Your Portfolio</p>
        <h1 className="text-2xl font-black text-[hsl(var(--foreground))]">$12,847.32</h1>
        <div className="flex items-center gap-2 mt-1">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-green-500">+$234.50 today</span>
        </div>
      </div>

      {/* Shame Section */}
      <div className="px-5 py-4 bg-[hsl(var(--destructive))] bg-opacity-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[hsl(var(--destructive))] flex items-center justify-center">
            <Coffee className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[hsl(var(--foreground))]">Bah Humbug!</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              You spent <span className="font-bold text-[hsl(var(--destructive))]">$847</span> on coffee this month
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="flex-1 p-5 space-y-4 overflow-auto pb-24">
        <h2 className="font-bold text-[hsl(var(--foreground))]">Money You Could Have Saved</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <StatsCard
            value="$3,241"
            label="Wasted on dining out"
            trend="down"
            trendValue="vs last month"
          />
          <StatsCard
            value="$1,847"
            label="Unnecessary subscriptions"
            trend="down"
            trendValue="12 active"
          />
          <StatsCard
            value="$892"
            label="Impulse purchases"
            trend="up"
            trendValue="Getting worse"
          />
          <StatsCard
            value="$456"
            label="Late fees (shameful)"
            trend="neutral"
            trendValue="Pay on time!"
          />
        </div>

        <div className="p-4 rounded-2xl bg-[hsl(var(--secondary))] mt-4">
          <p className="font-bold text-[hsl(var(--secondary-foreground))]">
            💰 Scrooge says:
          </p>
          <p className="text-sm text-[hsl(var(--secondary-foreground))] mt-1">
            &ldquo;Every penny you spend frivolously is a penny that could be earning interest. Think about that.&rdquo;
          </p>
        </div>
      </div>

      {/* Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home", active: false },
          { icon: <PieChart className="w-5 h-5" />, label: "Portfolio", active: true },
          { icon: <TrendingDown className="w-5 h-5" />, label: "Shame", active: false },
          { icon: <Bell className="w-5 h-5" />, label: "Alerts", active: false },
        ]}
      />
    </div>
  )
}
