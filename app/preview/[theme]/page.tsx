import { notFound } from "next/navigation"
import { CHARACTER_DATA, type ThemeName } from "@/lib/registry"
import { AppShell } from "@/components/booth/app-shell"
import { SplashHero } from "@/components/booth/splash-hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"

// Generate static params for all themes
export function generateStaticParams() {
  return Object.keys(CHARACTER_DATA).map((theme) => ({
    theme,
  }))
}

export function generateMetadata({ params }: { params: Promise<{ theme: string }> }) {
  return params.then(({ theme }) => {
    const character = CHARACTER_DATA[theme as ThemeName]
    if (!character) return { title: "Theme Not Found" }
    return {
      title: `${character.emoji} ${character.name} Theme Preview`,
    }
  })
}

export default async function ThemePreviewPage({
  params,
}: {
  params: Promise<{ theme: string }>
}) {
  const { theme } = await params
  const character = CHARACTER_DATA[theme as ThemeName]

  if (!character) {
    notFound()
  }

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-zinc-900 p-8"
    >
      {/* Back button */}
      <div className="max-w-md mx-auto mb-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Theme info */}
      <div className="max-w-md mx-auto mb-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          {character.emoji} {character.name}
        </h1>
        <p className="text-white/60">{character.vibe}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 capitalize">
          {character.holiday}
        </span>
      </div>

      {/* Phone preview */}
      <div className="flex justify-center">
        <AppShell>
          <SplashHero
            title={`${character.name} App`}
            tagline={character.vibe}
            ctaText="Get Started"
            icon={<Sparkles className="w-12 h-12" />}
            backgroundPattern="gradient"
          >
            <div className="flex gap-4 mt-4">
              <div className="text-center">
                <p className="text-3xl font-black text-[hsl(var(--secondary))]">{character.emoji}</p>
                <p className="text-xs text-[hsl(var(--primary-foreground))] opacity-70">theme</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-[hsl(var(--secondary))]">3</p>
                <p className="text-xs text-[hsl(var(--primary-foreground))] opacity-70">screens</p>
              </div>
            </div>
          </SplashHero>
        </AppShell>
      </div>

      {/* CSS variable display */}
      <div className="max-w-md mx-auto mt-8 p-4 bg-zinc-800 rounded-lg">
        <h2 className="text-white font-semibold mb-3">Theme Colors</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[hsl(var(--primary))]" />
            <span className="text-white/70 text-sm">Primary</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[hsl(var(--secondary))]" />
            <span className="text-white/70 text-sm">Secondary</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[hsl(var(--accent))]" />
            <span className="text-white/70 text-sm">Accent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[hsl(var(--background))] border border-white/20" />
            <span className="text-white/70 text-sm">Background</span>
          </div>
        </div>
      </div>
    </div>
  )
}
