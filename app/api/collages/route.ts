import { NextRequest, NextResponse } from 'next/server'
import { generateCollage } from '@/lib/collage-generator'
import { captureAppScreenshots } from '@/lib/screenshot-capture'
import { type LayoutId, LAYOUT_IDS } from '@/lib/collage-layouts'

interface CollageRequest {
  folder: string  // e.g., "app1", "app2"
  layout: string
}

// Get app info from the /api/apps endpoint
interface AppInfo {
  appNumber: number
  folder: string
  appName: string
  tagline: string
  author: string
  theme: string
  appType: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CollageRequest = await request.json()
    const { folder, layout } = body

    // Validate layout
    const normalizedLayout = layout.toUpperCase() as LayoutId
    if (!LAYOUT_IDS.includes(normalizedLayout)) {
      return NextResponse.json(
        { error: `Invalid layout: ${layout}. Use A, B, C, or D.` },
        { status: 400 }
      )
    }

    // Extract app number from folder (e.g., "app1" -> 1)
    const appNumberMatch = folder.match(/^app(\d+)$/)
    if (!appNumberMatch) {
      return NextResponse.json(
        { error: `Invalid folder format: ${folder}. Expected format: app1, app2, etc.` },
        { status: 400 }
      )
    }
    const appNumber = parseInt(appNumberMatch[1], 10)

    // Get app info from our API
    const baseUrl = request.nextUrl.origin
    const appsResponse = await fetch(`${baseUrl}/api/apps`)
    if (!appsResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch app info' }, { status: 500 })
    }

    const apps: AppInfo[] = await appsResponse.json()
    const app = apps.find(a => a.appNumber === appNumber)

    if (!app) {
      return NextResponse.json({ error: `App ${appNumber} not found` }, { status: 404 })
    }

    // Capture live screenshots
    console.log(`Capturing screenshots for app${appNumber}...`)
    const screenshots = await captureAppScreenshots(appNumber, baseUrl)
    console.log('Screenshots captured successfully')

    // Generate collage
    const result = await generateCollage({
      splashBuffer: screenshots.splash,
      screen1Buffer: screenshots.screen1,
      screen2Buffer: screenshots.screen2,
      appName: app.appName,
      author: app.author,
      layout: normalizedLayout,
    })

    // Return PNG
    return new NextResponse(new Uint8Array(result.buffer), {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${result.filename}"`,
        'Content-Length': result.buffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Collage generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate collage' },
      { status: 500 }
    )
  }
}
