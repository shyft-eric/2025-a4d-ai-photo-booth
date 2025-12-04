"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Home, ChevronLeft, ChevronRight } from "lucide-react"

interface ScreenNavProps {
  basePath: string
  appName: string
}

const screens = [
  { path: "", label: "Splash" },
  { path: "/screen-1", label: "Screen 1" },
  { path: "/screen-2", label: "Screen 2" },
]

export function ScreenNav({ basePath, appName }: ScreenNavProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Hide when in embed mode (used for collage preview iframes)
  const isEmbed = searchParams.get('embed') === 'true'
  if (isEmbed) {
    return null
  }

  // Find current screen index
  const currentIndex = screens.findIndex(
    (s) => pathname === `${basePath}${s.path}`
  )

  const prevScreen = currentIndex > 0 ? screens[currentIndex - 1] : null
  const nextScreen = currentIndex < screens.length - 1 ? screens[currentIndex + 1] : null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-neutral-200 px-2 py-2 flex items-center gap-1">
        {/* Home button */}
        <Link
          href="/"
          className="p-2 rounded-xl hover:bg-neutral-100 transition-colors text-neutral-600"
          title="Back to Home"
        >
          <Home className="w-5 h-5" />
        </Link>

        <div className="w-px h-6 bg-neutral-200 mx-1" />

        {/* Previous button */}
        <Link
          href={prevScreen ? `${basePath}${prevScreen.path}` : "#"}
          className={`p-2 rounded-xl transition-colors ${
            prevScreen
              ? "hover:bg-neutral-100 text-neutral-600"
              : "text-neutral-300 pointer-events-none"
          }`}
          title={prevScreen?.label}
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>

        {/* Screen indicators */}
        <div className="flex items-center gap-1 px-2">
          {screens.map((screen, index) => (
            <Link
              key={screen.path}
              href={`${basePath}${screen.path}`}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-neutral-800 w-6"
                  : "bg-neutral-300 hover:bg-neutral-400"
              }`}
              title={screen.label}
            />
          ))}
        </div>

        {/* Next button */}
        <Link
          href={nextScreen ? `${basePath}${nextScreen.path}` : "#"}
          className={`p-2 rounded-xl transition-colors ${
            nextScreen
              ? "hover:bg-neutral-100 text-neutral-600"
              : "text-neutral-300 pointer-events-none"
          }`}
          title={nextScreen?.label}
        >
          <ChevronRight className="w-5 h-5" />
        </Link>

        <div className="w-px h-6 bg-neutral-200 mx-1" />

        {/* App name */}
        <span className="text-sm font-medium text-neutral-600 px-2">
          {appName}
        </span>
      </div>
    </div>
  )
}
