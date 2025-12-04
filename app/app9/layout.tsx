import { AppShell } from "@/components/booth/app-shell"
import { ScreenNav } from "@/components/booth/screen-nav"

export const metadata = {
  title: "Your Dream Budy - Frosty's Fun Fitness",
}

// App configuration
export const appConfig = {
  name: "Your Dream Budy",
  tagline: "Melt fat, not snowmen!",
  author: "Faran",
  theme: "frosty" as const,
  appType: "fitness" as const,
}

export default function App9Layout({
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
      <ScreenNav basePath="/app9" appName={appConfig.name} />
    </div>
  )
}
