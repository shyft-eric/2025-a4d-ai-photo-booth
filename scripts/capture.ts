/**
 * Screenshot Capture Script for Vibe Coding Photo Booth
 * 
 * Usage: npx tsx scripts/capture.ts <app-number> "<app-name>" "<author-name>"
 * Example: npx tsx scripts/capture.ts 2 "SleighShare" "Jamie"
 * 
 * This will capture all screens for the app and save them to ./captures/
 */

import { firefox, type Browser, type Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const CAPTURES_DIR = './captures';
const VIEWPORT = { width: 375, height: 740 }; // Realistic phone mockup proportions

interface CaptureResult {
  appNumber: number;
  appName: string;
  author: string;
  theme: string;
  appType: string;
  screens: string[];
  timestamp: string;
}

async function ensureDir(dir: string): Promise<void> {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function captureScreen(page: Page, url: string, outputPath: string): Promise<boolean> {
  try {
    console.log(`  📸 Capturing: ${url}`);
    await page.goto(url, { 
      waitUntil: 'networkidle',
      timeout: 10000 
    });
    
    // Wait a bit for any CSS to settle
    await page.waitForTimeout(500);
    
    // Find the phone frame and screenshot just that
    const phoneFrame = await page.$('.phone-frame');
    if (phoneFrame) {
      await phoneFrame.screenshot({ path: outputPath });
    } else {
      // Fallback to viewport screenshot
      await page.screenshot({ path: outputPath });
    }
    
    console.log(`  ✅ Saved: ${outputPath}`);
    return true;
  } catch (error) {
    console.log(`  ⚠️  Skipped: ${url} (not found or error)`);
    return false;
  }
}

async function captureApp(
  appNumber: number,
  appName: string,
  author: string
): Promise<CaptureResult> {
  const timestamp = new Date().toISOString();
  // Simple folder name without timestamp - just app{N}
  const appDir = path.join(CAPTURES_DIR, `app${appNumber}`);
  await ensureDir(appDir);

  console.log(`\n🎄 Vibe Coding Photo Booth - Screen Capture`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  App: ${appName}`);
  console.log(`  Author: ${author}`);
  console.log(`  Slot: #${appNumber}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  const browser: Browser = await firefox.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page: Page = await context.newPage();

  // Try to extract theme from the app page
  let theme = 'santa';
  let appType = 'social';

  try {
    await page.goto(`${BASE_URL}/app${appNumber}`, { waitUntil: 'networkidle', timeout: 10000 });

    // Extract data-theme attribute
    const themeAttr = await page.$eval('[data-theme]', (el) => el.getAttribute('data-theme'));
    if (themeAttr) {
      theme = themeAttr;
      console.log(`  🎨 Theme detected: ${theme}`);
    }
  } catch {
    console.log(`  ⚠️  Could not detect theme, using default: ${theme}`);
  }

  const screens: string[] = [];
  const screenRoutes = [
    { route: '', name: 'splash' },
    { route: '/screen-1', name: 'screen-1' },
    { route: '/screen-2', name: 'screen-2' },
  ];

  for (const screen of screenRoutes) {
    const url = `${BASE_URL}/app${appNumber}${screen.route}`;
    const filename = `${screen.name}.png`;
    const outputPath = path.join(appDir, filename);

    const success = await captureScreen(page, url, outputPath);
    if (success) {
      screens.push(outputPath);
    }
  }

  await browser.close();

  // Try to read appType from the layout file
  try {
    const layoutPath = path.join(process.cwd(), 'app', `app${appNumber}`, 'layout.tsx');
    if (fs.existsSync(layoutPath)) {
      const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
      const appTypeMatch = layoutContent.match(/appType:\s*["']([^"']+)["']/);
      if (appTypeMatch) {
        appType = appTypeMatch[1];
        console.log(`  📱 App type detected: ${appType}`);
      }
    }
  } catch {
    console.log(`  ⚠️  Could not detect app type, using default: ${appType}`);
  }

  // Save metadata
  const metadata: CaptureResult = {
    appNumber,
    appName,
    author,
    theme,
    appType,
    screens,
    timestamp,
  };

  const metadataPath = path.join(appDir, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  console.log(`\n✨ Capture complete!`);
  console.log(`  📁 Output: ${appDir}`);
  console.log(`  🖼️  Screens: ${screens.length}`);
  console.log(`\n💡 Next: Run collage script to create photo strip\n`);

  return metadata;
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 3) {
  console.log(`
🎄 Vibe Coding Photo Booth - Screenshot Capture

Usage:
  npx tsx scripts/capture.ts <app-number> "<app-name>" "<author-name>"

Examples:
  npx tsx scripts/capture.ts 1 "PennyPincher" "Demo"
  npx tsx scripts/capture.ts 2 "SleighShare" "Jamie"
  npx tsx scripts/capture.ts 3 "NoseGlow" "Alex"

This will capture:
  - /app{N}/ (splash screen)
  - /app{N}/screen-1/ (if exists)
  - /app{N}/screen-2/ (if exists)

Output: ./captures/app{N}-{timestamp}/
  `);
  process.exit(1);
}

const [appNum, appName, author] = args;
const appNumber = parseInt(appNum, 10);

if (isNaN(appNumber) || appNumber < 1) {
  console.error('❌ Error: App number must be a positive integer');
  process.exit(1);
}

captureApp(appNumber, appName, author).catch((error) => {
  console.error('❌ Capture failed:', error);
  process.exit(1);
});
