/**
 * Screenshot Capture Utility
 *
 * Uses Playwright to capture screenshots of app screens on-the-fly.
 */

import { firefox, Browser, Page } from 'playwright'

interface ScreenshotResult {
  splash: Buffer
  screen1: Buffer
  screen2: Buffer
}

let browser: Browser | null = null

async function getBrowser(): Promise<Browser> {
  if (!browser) {
    browser = await firefox.launch({
      headless: true,
    })
  }
  return browser
}

/**
 * Capture a screenshot of a specific element on a page
 */
async function captureScreen(page: Page, url: string): Promise<Buffer> {
  await page.goto(url, { waitUntil: 'networkidle' })

  // Wait a bit for any animations to settle
  await page.waitForTimeout(500)

  // Try to find the phone frame element, fall back to viewport
  const phoneFrame = page.locator('.phone-frame').first()
  const hasPhoneFrame = await phoneFrame.count() > 0

  if (hasPhoneFrame) {
    return await phoneFrame.screenshot({ type: 'png' })
  }

  // Fallback: screenshot the main content area
  const appShell = page.locator('[data-theme]').first()
  const hasAppShell = await appShell.count() > 0

  if (hasAppShell) {
    return await appShell.screenshot({ type: 'png' })
  }

  // Last resort: full page screenshot
  return await page.screenshot({ type: 'png' })
}

/**
 * Capture screenshots for all screens of an app
 */
export async function captureAppScreenshots(
  appNumber: number,
  baseUrl: string = 'http://localhost:3000'
): Promise<ScreenshotResult> {
  const browserInstance = await getBrowser()
  const context = await browserInstance.newContext({
    viewport: { width: 430, height: 932 }, // iPhone 14 Pro Max size
  })

  try {
    const page = await context.newPage()

    // Capture all three screens
    const splash = await captureScreen(page, `${baseUrl}/app${appNumber}`)
    const screen1 = await captureScreen(page, `${baseUrl}/app${appNumber}/screen-1`)
    const screen2 = await captureScreen(page, `${baseUrl}/app${appNumber}/screen-2`)

    return { splash, screen1, screen2 }
  } finally {
    await context.close()
  }
}

/**
 * Close the browser instance (call on shutdown)
 */
export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close()
    browser = null
  }
}
