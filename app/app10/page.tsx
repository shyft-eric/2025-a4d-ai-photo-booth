import { SplashHero } from "@/components/booth/splash-hero"
import { Sparkles, Candy } from "lucide-react"

export default function Splash() {
  return (
    <SplashHero
      title="Candy Calm"
      tagline="Find zen through sweet mindfulness"
      ctaText="Begin Your Journey"
      icon={<Sparkles className="w-12 h-12" />}
      backgroundPattern="gradient"
    >
      <div className="mt-6 space-y-4 w-full">
        {/* Feature highlights with dreamy aesthetic */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Candy className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">Candy Breath Counting</p>
            <p className="text-xs text-white/70">Deep breaths after each sweet</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">Cocoa Sip Timing</p>
            <p className="text-xs text-white/70">Mindful beverage meditation</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">Cider Sniff Guidance</p>
            <p className="text-xs text-white/70">Aromatic breath exercises</p>
          </div>
        </div>
      </div>

      {/* Magical stats preview */}
      <div className="mt-6 grid grid-cols-3 gap-3 w-full">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <p className="text-2xl font-black text-white">127</p>
          <p className="text-xs text-white/70">Breaths</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <p className="text-2xl font-black text-white">42</p>
          <p className="text-xs text-white/70">Sips</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <p className="text-2xl font-black text-white">18</p>
          <p className="text-xs text-white/70">Sniffs</p>
        </div>
      </div>
    </SplashHero>
  )
}
