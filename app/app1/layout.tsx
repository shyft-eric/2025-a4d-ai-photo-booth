import { AppShell } from "@/components/booth/app-shell"

export const metadata = {
  title: "PennyPincher - Scrooge's Investment App",
}

// App configuration - Claude should update these values
export const appConfig = {
  name: "PennyPincher",
  tagline: "Your money deserves better than you",
  author: "Demo",
  theme: "scrooge" as const,
  appType: "finance" as const,
}

export default function App1Layout({
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
    </div>
  )
}
