/**
 * Collage Generator for Vibe Coding Photo Booth
 * 
 * Usage: npx tsx scripts/collage.ts <captures-folder> <layout>
 * Example: npx tsx scripts/collage.ts ./captures/app1-2024-12-15 A
 * 
 * Layouts:
 *   A - Vertical strip (3 stacked)
 *   B - 2x2 grid with info panel
 *   C - Hero feature (large splash, small others)
 *   D - Phone mockup lineup
 */

import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

const COLLAGES_DIR = './collages';
const PHONE_WIDTH = 390;
const PHONE_HEIGHT = 844;

interface CollageConfig {
  width: number;
  height: number;
  background: string;
  positions: { x: number; y: number; width: number; height: number }[];
  infoPanel?: { x: number; y: number; width: number; height: number };
}

const LAYOUTS: Record<string, CollageConfig> = {
  // Layout A: Vertical Strip
  A: {
    width: 450,
    height: 1400,
    background: '#1a1a1a',
    positions: [
      { x: 30, y: 30, width: 390, height: 400 },
      { x: 30, y: 450, width: 390, height: 400 },
      { x: 30, y: 870, width: 390, height: 400 },
    ],
    infoPanel: { x: 30, y: 1290, width: 390, height: 80 },
  },
  // Layout B: 2x2 Grid
  B: {
    width: 840,
    height: 900,
    background: '#1a1a1a',
    positions: [
      { x: 30, y: 30, width: 380, height: 400 },
      { x: 430, y: 30, width: 380, height: 400 },
      { x: 30, y: 450, width: 380, height: 400 },
    ],
    infoPanel: { x: 430, y: 450, width: 380, height: 400 },
  },
  // Layout C: Hero Feature
  C: {
    width: 860,
    height: 700,
    background: '#1a1a1a',
    positions: [
      { x: 30, y: 30, width: 500, height: 640 },
      { x: 550, y: 30, width: 280, height: 300 },
      { x: 550, y: 350, width: 280, height: 300 },
    ],
  },
  // Layout D: Phone Lineup
  D: {
    width: 1200,
    height: 500,
    background: '#1a1a1a',
    positions: [
      { x: 50, y: 30, width: 350, height: 420 },
      { x: 420, y: 30, width: 350, height: 420 },
      { x: 790, y: 30, width: 350, height: 420 },
    ],
    infoPanel: { x: 50, y: 460, width: 1100, height: 30 },
  },
};

interface CaptureMetadata {
  appNumber: number;
  appName: string;
  author: string;
  screens: string[];
  timestamp: string;
}

async function ensureDir(dir: string): Promise<void> {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function createCollage(
  capturesFolder: string,
  layoutKey: string
): Promise<string> {
  // Read metadata
  const metadataPath = path.join(capturesFolder, 'metadata.json');
  if (!fs.existsSync(metadataPath)) {
    throw new Error(`Metadata not found at ${metadataPath}`);
  }
  
  const metadata: CaptureMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
  const layout = LAYOUTS[layoutKey.toUpperCase()];
  
  if (!layout) {
    throw new Error(`Unknown layout: ${layoutKey}. Use A, B, C, or D.`);
  }

  console.log(`\n🎄 Vibe Coding Photo Booth - Collage Generator`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  App: ${metadata.appName}`);
  console.log(`  Author: ${metadata.author}`);
  console.log(`  Layout: ${layoutKey.toUpperCase()}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  await ensureDir(COLLAGES_DIR);

  // Create base canvas
  const compositeOperations: sharp.OverlayOptions[] = [];

  // Process each screen
  for (let i = 0; i < Math.min(metadata.screens.length, layout.positions.length); i++) {
    const screenPath = metadata.screens[i];
    const pos = layout.positions[i];
    
    if (fs.existsSync(screenPath)) {
      console.log(`  📸 Adding screen ${i + 1}: ${path.basename(screenPath)}`);
      
      // Resize screen to fit position
      const resizedBuffer = await sharp(screenPath)
        .resize(pos.width, pos.height, { 
          fit: 'cover',
          position: 'top'
        })
        .png()
        .toBuffer();

      compositeOperations.push({
        input: resizedBuffer,
        left: pos.x,
        top: pos.y,
      });
    }
  }

  // Add info panel with app name and author
  if (layout.infoPanel) {
    const { width, height, x, y } = layout.infoPanel;
    const infoPanelSvg = `
      <svg width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="#2a2a2a" rx="10"/>
        <text x="${width/2}" y="${height/2 + 6}" 
              font-family="Arial, sans-serif" 
              font-size="18" 
              font-weight="bold"
              fill="white" 
              text-anchor="middle">
          ${metadata.appName} by ${metadata.author}
        </text>
      </svg>
    `;
    
    compositeOperations.push({
      input: Buffer.from(infoPanelSvg),
      left: x,
      top: y,
    });
  }

  // Create final collage
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const outputFilename = `${metadata.appName.toLowerCase().replace(/\s+/g, '-')}-${layoutKey.toLowerCase()}-${timestamp}.png`;
  const outputPath = path.join(COLLAGES_DIR, outputFilename);

  await sharp({
    create: {
      width: layout.width,
      height: layout.height,
      channels: 4,
      background: { r: 26, g: 26, b: 26, alpha: 1 },
    },
  })
    .composite(compositeOperations)
    .png()
    .toFile(outputPath);

  console.log(`\n✨ Collage created!`);
  console.log(`  📁 Output: ${outputPath}`);
  console.log(`\n💡 Upload to Miro or share with guest!\n`);

  return outputPath;
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(`
🎄 Vibe Coding Photo Booth - Collage Generator

Usage:
  npx tsx scripts/collage.ts <captures-folder> <layout>

Layouts:
  A - Vertical strip (3 screens stacked)
  B - 2x2 grid with info panel
  C - Hero feature (large splash + small screens)
  D - Phone lineup (3 side by side)

Examples:
  npx tsx scripts/collage.ts ./captures/app1-2024-12-15T10-30-00 A
  npx tsx scripts/collage.ts ./captures/app2-2024-12-15T10-45-00 C

Output: ./collages/{app-name}-{layout}-{timestamp}.png
  `);
  process.exit(1);
}

const [capturesFolder, layout] = args;

if (!fs.existsSync(capturesFolder)) {
  console.error(`❌ Error: Captures folder not found: ${capturesFolder}`);
  process.exit(1);
}

if (!['A', 'B', 'C', 'D', 'a', 'b', 'c', 'd'].includes(layout)) {
  console.error(`❌ Error: Invalid layout "${layout}". Use A, B, C, or D.`);
  process.exit(1);
}

createCollage(capturesFolder, layout).catch((error) => {
  console.error('❌ Collage generation failed:', error);
  process.exit(1);
});
