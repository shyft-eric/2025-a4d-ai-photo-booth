import { AppShell } from "@/components/booth/app-shell"
import { ScreenNav } from "@/components/booth/screen-nav"

export const metadata = {
  title: "Candy Calm - Sugar Plum Fairy's Wellness App",
}

export const appConfig = {
  name: "Candy Calm",
  tagline: "Find zen through sweet mindfulness",
  author: "Alonna Denney",
  theme: "sugar-plum" as const,
  appType: "wellness" as const,
}

export default function App10Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      data-theme={appConfig.theme}
      style={{
        // Berry Fusion color palette override
        "--theme-gradient-start": "320 70% 50%",
        "--theme-gradient-end": "280 60% 45%",
        // Override light backgrounds with rich berry tones
        "--background": "280 40% 12%",
        "--foreground": "320 20% 95%",
        "--card": "280 35% 18%",
        "--card-foreground": "320 20% 95%",
        "--muted": "280 30% 22%",
        "--muted-foreground": "320 20% 70%",
        "--border": "280 30% 30%",
      } as React.CSSProperties}
      className="flex items-center justify-center min-h-screen bg-zinc-900 p-8"
    >
      <AppShell>
        {children}
      </AppShell>
      <ScreenNav basePath="/app10" appName={appConfig.name} />
    </div>
  )
}
