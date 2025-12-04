import { AppShell } from "@/components/booth/app-shell"
import { ScreenNav } from "@/components/booth/screen-nav"

export const metadata = {
  title: "GrinchConnect - Krampus's Ride Share App",
}

export const appConfig = {
  name: "GrinchConnect",
  tagline: "Emotional scarring, on demand",
  author: "Dylan Camp",
  theme: "krampus" as const,
  appType: "ride-share" as const,
}

export default function App6Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      data-theme={appConfig.theme}
      className="flex items-center justify-center min-h-screen bg-zinc-900 p-8"
    >
      <AppShell>
        {children}
      </AppShell>
      <ScreenNav basePath="/app6" appName={appConfig.name} />
    </div>
  )
}
