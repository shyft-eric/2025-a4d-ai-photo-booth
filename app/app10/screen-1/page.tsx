import { NavBar } from "@/components/booth/nav-bar"
import { Home, Activity, TrendingUp, Sparkles } from "lucide-react"

export default function BreathingScreen() {
  return (
    <div className="flex flex-col h-full theme-gradient">
      {/* Header */}
      <div className="px-5 py-6">
        <h1 className="text-2xl font-black text-white">Candy Breath</h1>
        <p className="text-sm text-white/70 mt-1">Count your way to zen</p>
      </div>

      {/* Main breathing circle */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        {/* Large breathing indicator */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Outer glow rings */}
          <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute inset-4 rounded-full bg-white/10 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
          <div className="absolute inset-8 rounded-full bg-white/15 animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }}></div>

          {/* Center circle */}
          <div className="relative w-40 h-40 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/40 flex flex-col items-center justify-center shadow-2xl">
            <Sparkles className="w-8 h-8 text-white mb-2" />
            <p className="text-5xl font-black text-white">12</p>
            <p className="text-sm text-white/80 mt-1">breaths</p>
          </div>
        </div>

        {/* Instruction text */}
        <div className="mt-8 text-center">
          <p className="text-lg font-bold text-white">After each candy...</p>
          <p className="text-white/70 mt-1">Take 3 deep, mindful breaths</p>
        </div>

        {/* Candy counter */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-black text-white">4</p>
              <p className="text-xs text-white/70">Candies</p>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <p className="text-3xl font-black text-white">12</p>
              <p className="text-xs text-white/70">Total Breaths</p>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <p className="text-3xl font-black text-white">3.0</p>
              <p className="text-xs text-white/70">Avg/Candy</p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <button className="mt-6 px-8 py-4 bg-white text-[hsl(var(--primary))] rounded-full font-black text-lg shadow-xl hover:scale-105 transition-transform">
          Complete Breath Set
        </button>
      </div>

      {/* Bottom Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home" },
          { icon: <Activity className="w-5 h-5" />, label: "Breathe", active: true },
          { icon: <TrendingUp className="w-5 h-5" />, label: "Stats" },
          { icon: <Sparkles className="w-5 h-5" />, label: "Magic" },
        ]}
      />
    </div>
  )
}
