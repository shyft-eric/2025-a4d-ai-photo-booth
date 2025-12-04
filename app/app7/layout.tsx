import { AppShell } from "@/components/booth/app-shell"
import { ScreenNav } from "@/components/booth/screen-nav"

export const metadata = {
  title: "Santa's Swap Meet - Santa's E-commerce App",
}

export const appConfig = {
  name: "Santa's Swap Meet",
  tagline: "Trade the gifts you got for the gifts you want!",
  author: "Aaron Lightfoot",
  theme: "santa" as const,
  appType: "ecommerce" as const,
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
      <ScreenNav basePath="/app7" appName={appConfig.name} />
    </div>
  )
}
