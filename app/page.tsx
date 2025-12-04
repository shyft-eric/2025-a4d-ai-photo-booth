import Link from "next/link"
import fs from "fs/promises"
import path from "path"
import { CHARACTER_DATA, APP_TYPE_DATA } from "@/lib/registry"
import { HomeClient } from "@/components/booth/home-client"
import { AppGallery } from "@/components/booth/app-gallery"
import type { AppInfo } from "@/app/api/apps/route"

// Helper to extract a string field value, handling both quote types and apostrophes
function extractField(configStr: string, fieldName: string): string | null {
  // Try double quotes first: field: "value with 'apostrophes'"
  const doubleQuoteMatch = configStr.match(new RegExp(`${fieldName}:\\s*"([^"]*)"`, 's'))
  if (doubleQuoteMatch) return doubleQuoteMatch[1]

  // Try single quotes: field: 'value'
  const singleQuoteMatch = configStr.match(new RegExp(`${fieldName}:\\s*'([^']*)'`, 's'))
  if (singleQuoteMatch) return singleQuoteMatch[1]

  return null
}

// Parse appConfig from layout.tsx file content
function parseAppConfig(content: string, appNumber: number): AppInfo | null {
  try {
    // Extract the appConfig object using regex - handle nested braces by being more lenient
    const configMatch = content.match(/export const appConfig\s*=\s*\{([\s\S]*?)\n\}/m)
    if (!configMatch) return null

    const configStr = configMatch[1]

    // Parse individual fields using the helper
    const name = extractField(configStr, 'name')
    const tagline = extractField(configStr, 'tagline')
    const author = extractField(configStr, 'author')
    const theme = extractField(configStr, 'theme')
    const appType = extractField(configStr, 'appType')

    if (!name || !author || !theme) return null

    return {
      appNumber,
      folder: `app${appNumber}`,
      appName: name,
      tagline: tagline || '',
      author: author,
      theme: theme,
      appType: appType || 'social',
    }
  } catch {
    return null
  }
}

async function getApps(): Promise<AppInfo[]> {
  const appDir = path.join(process.cwd(), 'app')

  try {
    const entries = await fs.readdir(appDir, { withFileTypes: true })
    const appFolders = entries
      .filter(entry => entry.isDirectory() && /^app\d+$/.test(entry.name))
      .map(entry => ({
        name: entry.name,
        number: parseInt(entry.name.replace('app', ''), 10),
      }))
      .sort((a, b) => a.number - b.number)

    const apps: AppInfo[] = []
    for (const folder of appFolders) {
      const layoutPath = path.join(appDir, folder.name, 'layout.tsx')
      try {
        const content = await fs.readFile(layoutPath, 'utf-8')
        const appInfo = parseAppConfig(content, folder.number)
        if (appInfo) apps.push(appInfo)
      } catch {
        // Skip folders without valid layout.tsx
      }
    }
    return apps
  } catch {
    return []
  }
}

export default async function Home() {
  const characters = Object.entries(CHARACTER_DATA)
  const appTypes = Object.entries(APP_TYPE_DATA)

  // Get apps from layout configs
  const apps = await getApps()

  // Format characters for PromptBuilder
  const characterOptions = characters.map(([id, data]) => ({
    id,
    name: data.name,
    emoji: data.emoji,
    vibe: data.vibe,
    holiday: data.holiday,
  }))

  // Format app types for PromptBuilder
  const appTypeOptions = appTypes.map(([id, data]) => ({
    id,
    name: data.name,
    pattern: data.pattern,
    screens: data.screens,
  }))

  // Group characters by holiday
  const christmas = characters.filter(([, data]) => data.holiday === "christmas")
  const hanukkah = characters.filter(([, data]) => data.holiday === "hanukkah")
  const kwanzaa = characters.filter(([, data]) => data.holiday === "kwanzaa")
  const winter = characters.filter(([, data]) => data.holiday === "winter")

  const charactersByHoliday = {
    christmas: christmas.map(([key, data]) => ({ key, data })),
    hanukkah: hanukkah.map(([key, data]) => ({ key, data })),
    kwanzaa: kwanzaa.map(([key, data]) => ({ key, data })),
    winter: winter.map(([key, data]) => ({ key, data })),
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Vibe Coding Photo Booth
          </h1>
          <p className="text-lg md:text-xl text-neutral-600">
            Create holiday-themed app mockups in minutes!
          </p>
        </div>

        {/* Client-side interactive components */}
        <HomeClient
          characters={characterOptions}
          appTypes={appTypeOptions}
          charactersByHoliday={charactersByHoliday}
        />

        {/* App Gallery */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Created Apps</h2>
          <AppGallery apps={apps} />
        </div>

        {/* Theme Preview Links */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Theme Previews</h2>
          <p className="text-neutral-500 mb-4 text-sm">
            Click to preview each character&apos;s color theme:
          </p>
          <div className="flex flex-wrap gap-2">
            {characters.map(([key, data]) => (
              <Link
                key={key}
                href={`/preview/${key}`}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm transition-colors"
              >
                {data.emoji} {data.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-neutral-400 text-sm">
          <p>Made with Claude Code for A4D Holiday Tech Meetup</p>
        </footer>
      </div>
    </div>
  )
}
