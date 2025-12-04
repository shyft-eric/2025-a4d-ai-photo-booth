import { AppCard } from "./app-card"
import type { AppInfo } from "@/app/api/apps/route"

interface AppGalleryProps {
  apps: AppInfo[]
}

export function AppGallery({ apps }: AppGalleryProps) {
  if (apps.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="text-4xl mb-3">📱</div>
        <h3 className="font-bold text-lg text-neutral-700 mb-2">No apps created yet!</h3>
        <p className="text-neutral-500">
          Use the prompt builder above to create your first app.
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map((app) => (
        <AppCard
          key={app.folder}
          folder={app.folder}
          appNumber={app.appNumber}
          appName={app.appName}
          author={app.author}
          theme={app.theme}
          appType={app.appType}
        />
      ))}
    </div>
  )
}
