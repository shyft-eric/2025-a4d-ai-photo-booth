/**
 * Collage Generator Library
 *
 * Server-side Sharp-based collage generation with rotation and shadow support.
 * Used by both API endpoint and CLI script.
 */

import sharp from 'sharp'
import { getLayout, type LayoutId, type CollageLayout, type Position } from './collage-layouts'

export interface CollageInput {
  splashBuffer: Buffer
  screen1Buffer: Buffer
  screen2Buffer: Buffer
  appName: string
  author: string
  layout: LayoutId
}

export interface CollageResult {
  buffer: Buffer
  width: number
  height: number
  filename: string
}

/**
 * Escape special XML characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Parse hex color to RGBA
 */
function hexToRgba(hex: string): { r: number; g: number; b: number; alpha: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    return { r: 26, g: 26, b: 26, alpha: 1 } // Default dark background
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    alpha: 1,
  }
}

/**
 * Resize image to fit within target dimensions
 * Uses 'cover' to fill the target while maintaining aspect ratio (may crop edges)
 */
async function resizeToFit(
  buffer: Buffer,
  targetWidth: number,
  targetHeight: number
): Promise<Buffer> {
  return sharp(buffer)
    .resize(targetWidth, targetHeight, {
      fit: 'cover', // Fill target dimensions, cropping if needed to preserve aspect ratio
      position: 'centre',
    })
    .png()
    .toBuffer()
}

/**
 * Create a rounded rectangle mask as PNG
 */
async function createRoundedMask(
  width: number,
  height: number,
  borderRadius: number
): Promise<Buffer> {
  const svg = `
    <svg width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="white" rx="${borderRadius}" ry="${borderRadius}"/>
    </svg>
  `
  return sharp(Buffer.from(svg)).png().toBuffer()
}

/**
 * Apply rounded corners to an image
 */
async function applyRoundedCorners(
  buffer: Buffer,
  width: number,
  height: number,
  borderRadius: number
): Promise<Buffer> {
  const mask = await createRoundedMask(width, height, borderRadius)

  return sharp(buffer)
    .resize(width, height, { fit: 'fill' })
    .composite([
      {
        input: mask,
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer()
}

/**
 * Create a shadow image for a given size and rotation
 */
async function createShadow(
  width: number,
  height: number,
  borderRadius: number,
  rotation: number = 0
): Promise<Buffer> {
  // Create a larger canvas for the shadow (to account for blur spread)
  const padding = 60
  const canvasWidth = width + padding * 2
  const canvasHeight = height + padding * 2

  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  // Calculate shadow offset based on rotation
  const shadowOffsetX = 10
  const shadowOffsetY = 20

  const svg = `
    <svg width="${canvasWidth}" height="${canvasHeight}">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="${shadowOffsetX}" dy="${shadowOffsetY}" stdDeviation="15" flood-color="rgba(0,0,0,0.4)"/>
        </filter>
      </defs>
      <g transform="translate(${centerX}, ${centerY}) rotate(${rotation})">
        <rect
          x="${-width / 2}"
          y="${-height / 2}"
          width="${width}"
          height="${height}"
          rx="${borderRadius}"
          fill="white"
          filter="url(#shadow)"
        />
      </g>
    </svg>
  `

  return sharp(Buffer.from(svg)).png().toBuffer()
}

/**
 * Process a single phone screen with rotation and shadow
 */
async function processPhoneScreen(
  buffer: Buffer,
  position: Position,
  borderRadius: number = 20
): Promise<{ buffer: Buffer; left: number; top: number; width: number; height: number }> {
  const { width, height, rotation = 0, shadow = false } = position

  // Resize and apply rounded corners
  const resized = await resizeToFit(buffer, width, height)
  const rounded = await applyRoundedCorners(resized, width, height, borderRadius)

  // If there's rotation, we need to handle it
  if (rotation !== 0) {
    // Calculate rotated bounding box
    const radians = (Math.abs(rotation) * Math.PI) / 180
    const rotatedWidth = Math.ceil(
      Math.abs(width * Math.cos(radians)) + Math.abs(height * Math.sin(radians))
    )
    const rotatedHeight = Math.ceil(
      Math.abs(width * Math.sin(radians)) + Math.abs(height * Math.cos(radians))
    )

    // Create rotated image using sharp's rotate
    const rotated = await sharp(rounded)
      .rotate(rotation, {
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer()

    // Get the actual dimensions after rotation
    const metadata = await sharp(rotated).metadata()
    const actualWidth = metadata.width || rotatedWidth
    const actualHeight = metadata.height || rotatedHeight

    // Calculate where to place the rotated image so its center is at the original center
    const centerX = position.x + width / 2
    const centerY = position.y + height / 2
    const left = Math.round(centerX - actualWidth / 2)
    const top = Math.round(centerY - actualHeight / 2)

    return {
      buffer: rotated,
      left,
      top,
      width: actualWidth,
      height: actualHeight,
    }
  }

  return {
    buffer: rounded,
    left: position.x,
    top: position.y,
    width,
    height,
  }
}

/**
 * Create shadow layer for a phone screen
 */
async function createPhoneShadow(
  position: Position,
  borderRadius: number = 20
): Promise<{ buffer: Buffer; left: number; top: number } | null> {
  if (!position.shadow) return null

  const { width, height, rotation = 0 } = position
  const padding = 60

  const shadowBuffer = await createShadow(width, height, borderRadius, rotation)

  // Calculate position (shadow is centered on the original center)
  const centerX = position.x + width / 2
  const centerY = position.y + height / 2

  // Get shadow dimensions
  const metadata = await sharp(shadowBuffer).metadata()
  const shadowWidth = metadata.width || width + padding * 2
  const shadowHeight = metadata.height || height + padding * 2

  return {
    buffer: shadowBuffer,
    left: Math.round(centerX - shadowWidth / 2),
    top: Math.round(centerY - shadowHeight / 2),
  }
}

/**
 * Creates an SVG info panel with app name and author
 */
function createInfoPanelSvg(
  width: number,
  height: number,
  appName: string,
  author: string,
  background: string
): string {
  const bgColor = background === '#1a1a1a' ? '#2a2a2a' : '#e5e5e5'
  const textColor = background === '#1a1a1a' ? 'white' : '#1a1a1a'
  const fontSize = Math.min(18, Math.floor(height / 2.5))
  const text = `${appName} by ${author}`

  return `
    <svg width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="${bgColor}" rx="10"/>
      <text x="${width / 2}" y="${height / 2 + fontSize / 3}"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            font-size="${fontSize}"
            font-weight="bold"
            fill="${textColor}"
            text-anchor="middle">
        ${escapeXml(text)}
      </text>
    </svg>
  `
}

/**
 * Creates an SVG text overlay for Layout B with word wrapping
 */
function createTextOverlaySvg(
  appName: string,
  author: string,
  maxWidth: number,
  titleSize: number,
  authorSize: number
): string {
  // Estimate character width (roughly 0.6 * fontSize for most fonts)
  const charWidth = titleSize * 0.55
  const charsPerLine = Math.floor(maxWidth / charWidth)

  // Simple word wrap
  const words = appName.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    if (testLine.length <= charsPerLine) {
      currentLine = testLine
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  }
  if (currentLine) lines.push(currentLine)

  const lineHeight = titleSize * 1.2
  const titleHeight = lines.length * lineHeight
  const height = titleHeight + authorSize + 60

  const titleLines = lines.map((line, i) =>
    `<text x="0" y="${titleSize + i * lineHeight}"
           font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
           font-size="${titleSize}"
           font-weight="bold"
           fill="#1a1a1a">${escapeXml(line)}</text>`
  ).join('\n      ')

  return `
    <svg width="${maxWidth}" height="${height}">
      ${titleLines}
      <text x="0" y="${titleHeight + 30 + authorSize}"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            font-size="${authorSize}"
            fill="#666666">
        by ${escapeXml(author)}
      </text>
    </svg>
  `
}

/**
 * Clip composite operations to canvas bounds
 */
async function clipToCanvas(
  operations: Array<{ buffer: Buffer; left: number; top: number }>,
  canvasWidth: number,
  canvasHeight: number
): Promise<sharp.OverlayOptions[]> {
  const clippedOps: sharp.OverlayOptions[] = []

  for (const op of operations) {
    let { buffer, left, top } = op

    // Get buffer dimensions
    const metadata = await sharp(buffer).metadata()
    const bufWidth = metadata.width || 0
    const bufHeight = metadata.height || 0

    // Skip if entirely outside canvas
    if (left + bufWidth <= 0 || top + bufHeight <= 0 || left >= canvasWidth || top >= canvasHeight) {
      continue
    }

    // If position is negative or extends beyond canvas, we need to crop the buffer
    if (left < 0 || top < 0 || left + bufWidth > canvasWidth || top + bufHeight > canvasHeight) {
      const extractLeft = Math.max(0, -left)
      const extractTop = Math.max(0, -top)
      const extractWidth = Math.min(bufWidth - extractLeft, canvasWidth - Math.max(0, left))
      const extractHeight = Math.min(bufHeight - extractTop, canvasHeight - Math.max(0, top))

      if (extractWidth <= 0 || extractHeight <= 0) {
        continue
      }

      buffer = await sharp(buffer)
        .extract({
          left: extractLeft,
          top: extractTop,
          width: extractWidth,
          height: extractHeight,
        })
        .png()
        .toBuffer()

      left = Math.max(0, left)
      top = Math.max(0, top)
    }

    clippedOps.push({
      input: buffer,
      left,
      top,
    })
  }

  return clippedOps
}

/**
 * Generate a collage from screenshots
 */
export async function generateCollage(input: CollageInput): Promise<CollageResult> {
  const layout = getLayout(input.layout)

  if (!layout) {
    throw new Error(`Unknown layout: ${input.layout}. Use A, B, or C.`)
  }

  const rawOperations: Array<{ buffer: Buffer; left: number; top: number }> = []
  const borderRadius = 20

  // Determine drawing order based on layout
  type ScreenKey = 'splash' | 'screen1' | 'screen2'
  let drawOrder: ScreenKey[]

  if (input.layout === 'B') {
    // Layout B: back to front ordering for overlapping tilted screens
    drawOrder = ['screen2', 'screen1', 'splash']
  } else if (input.layout === 'C') {
    // Layout C: stacked showcase - draw in order for fan effect
    drawOrder = ['splash', 'screen1', 'screen2']
  } else {
    // Layout A: no overlapping, order doesn't matter
    drawOrder = ['splash', 'screen1', 'screen2']
  }

  const buffers: Record<ScreenKey, Buffer> = {
    splash: input.splashBuffer,
    screen1: input.screen1Buffer,
    screen2: input.screen2Buffer,
  }

  // First pass: add shadows
  for (const key of drawOrder) {
    const position = layout.positions[key]
    const shadow = await createPhoneShadow(position, borderRadius)
    if (shadow) {
      rawOperations.push({
        buffer: shadow.buffer,
        left: shadow.left,
        top: shadow.top,
      })
    }
  }

  // Second pass: add phone screens
  for (const key of drawOrder) {
    const position = layout.positions[key]
    const processed = await processPhoneScreen(buffers[key], position, borderRadius)
    rawOperations.push({
      buffer: processed.buffer,
      left: processed.left,
      top: processed.top,
    })
  }

  // Add text overlay if present (Layout B)
  if (layout.textOverlay) {
    const { x, y, maxWidth, titleSize, authorSize } = layout.textOverlay
    const textSvg = createTextOverlaySvg(
      input.appName,
      input.author,
      maxWidth,
      titleSize,
      authorSize
    )
    rawOperations.push({
      buffer: Buffer.from(textSvg),
      left: x,
      top: y,
    })
  }

  // Add info panel if present (Layouts A and C)
  if (layout.infoPanel) {
    const { width, height, x, y } = layout.infoPanel
    const infoPanelSvg = createInfoPanelSvg(width, height, input.appName, input.author, layout.background)
    rawOperations.push({
      buffer: Buffer.from(infoPanelSvg),
      left: x,
      top: y,
    })
  }

  // Clip all operations to canvas bounds
  const compositeOperations = await clipToCanvas(
    rawOperations,
    layout.dimensions.width,
    layout.dimensions.height
  )

  // Create the collage
  const bgColor = hexToRgba(layout.background)
  const buffer = await sharp({
    create: {
      width: layout.dimensions.width,
      height: layout.dimensions.height,
      channels: 4,
      background: bgColor,
    },
  })
    .composite(compositeOperations)
    .png()
    .toBuffer()

  // Generate filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const filename = `${input.appName.toLowerCase().replace(/\s+/g, '-')}-${input.layout.toLowerCase()}-${timestamp}.png`

  return {
    buffer,
    width: layout.dimensions.width,
    height: layout.dimensions.height,
    filename,
  }
}

/**
 * Get layout info for display purposes
 */
export function getLayoutInfo(id: LayoutId): CollageLayout | undefined {
  return getLayout(id)
}
