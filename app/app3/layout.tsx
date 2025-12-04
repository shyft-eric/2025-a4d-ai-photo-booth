import { AppShell } from "@/components/booth/app-shell"
import { ScreenNav } from "@/components/booth/screen-nav"

export const metadata = {
  title: "Cold Winter Nights - Krampus Meditation",
}

// App configuration
export const appConfig = {
  name: "Cold Winter Nights",
  tagline: "Embrace the darkness within",
  author: "Stephen",
  theme: "krampus" as const,
  appType: "meditation" as const,
}

export default function App3Layout({
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
      <ScreenNav basePath="/app3" appName={appConfig.name} />
    </div>
  )
}
