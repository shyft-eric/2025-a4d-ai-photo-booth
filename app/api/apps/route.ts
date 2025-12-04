import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export interface AppInfo {
  appNumber: number
  folder: string
  appName: string
  tagline: string
  author: string
  theme: string
  appType: string
}

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

export async function GET() {
  const appDir = path.join(process.cwd(), 'app')

  try {
    const entries = await fs.readdir(appDir, { withFileTypes: true })

    // Find all app folders (app1, app2, etc.)
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
        if (appInfo) {
          apps.push(appInfo)
        }
      } catch {
        // Skip folders without valid layout.tsx
      }
    }

    return NextResponse.json(apps)
  } catch {
    return NextResponse.json([])
  }
}
