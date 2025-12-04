import { AppShell } from "@/components/booth/app-shell"
import { ScreenNav } from "@/components/booth/screen-nav"

export const metadata = {
  title: "Santa's Task Sleigher - Santa's Productivity App",
}

export const appConfig = {
  name: "Santa's Task Sleigher",
  tagline: "Making lists, checking them twice",
  author: "Eric",
  theme: "santa" as const,
  appType: "productivity" as const,
}

export default function App2Layout({
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
      <ScreenNav basePath="/app2" appName={appConfig.name} />
    </div>
  )
}
