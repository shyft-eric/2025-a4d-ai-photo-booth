import { AppShell } from "@/components/booth/app-shell"
import { ScreenNav } from "@/components/booth/screen-nav"

export const metadata = {
  title: "Clara's Closet - The Nutcracker's Dating App",
}

export const appConfig = {
  name: "Clara's Closet",
  tagline: "Find your match in the most magical realms",
  author: "Eric",
  theme: "nutcracker" as const,
  appType: "dating" as const,
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-theme={appConfig.theme}
      className="flex items-center justify-center min-h-screen bg-zinc-900 p-8"
    >
      <AppShell>
        {children}
      </AppShell>
      <ScreenNav basePath="/app5" appName={appConfig.name} />
    </div>
  )
}
