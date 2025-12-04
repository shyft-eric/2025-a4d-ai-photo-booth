// Its Cold and Dark Lets Drink Beer - Layout
import { AppShell } from "@/components/booth/app-shell"
import { ScreenNav } from "@/components/booth/screen-nav"

export const metadata = {
  title: "Its Cold and Dark Lets Drink Beer - Krampus's Fitness Tracker",
}

export const appConfig = {
  name: "Its Cold and Dark Lets Drink Beer",
  tagline: "Winter survival metrics for the damned",
  author: "Justin",
  theme: "krampus" as const,
  appType: "fitness" as const,
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
      <ScreenNav basePath="/app11" appName={appConfig.name} />
    </div>
  )
}
