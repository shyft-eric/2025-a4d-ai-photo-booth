import { AppShell } from "@/components/booth/app-shell"
import { ScreenNav } from "@/components/booth/screen-nav"

export const metadata = {
  title: "Boozy Reindeer - Rudolph's Ride Share App",
}

export const appConfig = {
  name: "Boozy Reindeer",
  tagline: "Navigate the party safely - avoid the wobbly ones",
  author: "Michael Morrison",
  theme: "rudolph" as const,
  appType: "ride-share" as const,
}

export default function App8Layout({
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
      <ScreenNav basePath="/app8" appName={appConfig.name} />
    </div>
  )
}
