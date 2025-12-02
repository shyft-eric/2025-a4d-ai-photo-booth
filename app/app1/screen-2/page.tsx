import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { NavBar } from "@/components/booth/nav-bar"
import { Badge } from "@/components/booth/data-display"
import { Home, PieChart, TrendingDown, Bell, X, ShoppingCart, Utensils, Zap } from "lucide-react"

export default function App1Screen2() {
  const notifications = [
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      title: "Amazon Purchase Detected",
      description: "You just spent $67.99. Was that necessary?",
      time: "2 min ago",
      type: "warning" as const,
    },
    {
      icon: <Utensils className="w-5 h-5" />,
      title: "DoorDash Again?",
      description: "That's your 8th delivery this week. Cook something.",
      time: "1 hour ago",
      type: "danger" as const,
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Subscription Renewal",
      description: "Netflix renewed for $15.99. Do you even use it?",
      time: "Yesterday",
      type: "warning" as const,
    },
  ]

  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-[hsl(var(--foreground))]">Spending Alerts</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Your financial conscience</p>
        </div>
        <Badge variant="danger">3 new</Badge>
      </div>

      {/* Notifications */}
      <div className="flex-1 p-5 space-y-3 overflow-auto pb-24">
        {notifications.map((notif, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notif.type === "danger" 
                    ? "bg-red-100 text-red-600" 
                    : "bg-yellow-100 text-yellow-600"
                }`}>
                  {notif.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-[hsl(var(--foreground))] text-sm">{notif.title}</p>
                    <span className="text-xs text-[hsl(var(--muted-foreground))] flex-shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{notif.description}</p>
                  
                  {/* Bah Humbug Button */}
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="text-xs flex items-center gap-1">
                      <X className="w-3 h-3" />
                      Bah Humbug!
                    </Button>
                    <Button size="sm" variant="ghost" className="text-xs">
                      I&apos;ll do better
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Scrooge Wisdom */}
        <div className="p-4 rounded-2xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] mt-4">
          <p className="font-bold">🎩 Daily Wisdom</p>
          <p className="text-sm mt-2 opacity-90">
            &ldquo;The only way to save money is to not spend it. Every other method is just pretending.&rdquo;
          </p>
          <p className="text-xs mt-2 opacity-70">— Ebenezer Scrooge</p>
        </div>
      </div>

      {/* Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home", active: false },
          { icon: <PieChart className="w-5 h-5" />, label: "Portfolio", active: false },
          { icon: <TrendingDown className="w-5 h-5" />, label: "Shame", active: false },
          { icon: <Bell className="w-5 h-5" />, label: "Alerts", active: true },
        ]}
      />
    </div>
  )
}
