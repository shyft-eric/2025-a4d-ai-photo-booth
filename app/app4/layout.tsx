import { AppShell } from "@/components/booth/app-shell"
import { ScreenNav } from "@/components/booth/screen-nav"

export const metadata = {
  title: "SleighShare - Rudolph's Ride Share App",
}

export const appConfig = {
  name: "SleighShare",
  tagline: "Your nose glows brighter with every 5-star ride",
  author: "Rudolph",
  theme: "rudolph" as const,
  appType: "ride-share" as const,
}

export default function App4Layout({
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
      <ScreenNav basePath="/app4" appName={appConfig.name} />
    </div>
  )
}
