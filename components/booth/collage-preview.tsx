'use client'

import { useEffect, useRef, useState } from 'react'
import { LAYOUTS, type LayoutId, type Position } from '@/lib/collage-layouts'

interface CollagePreviewProps {
  layout: LayoutId
  screenshots: {
    splash: string
    screen1: string
    screen2: string
  }
  appName: string
  author: string
  className?: string
}

interface LoadedImages {
  splash: HTMLImageElement | null
  screen1: HTMLImageElement | null
  screen2: HTMLImageElement | null
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

function drawImageWithTransform(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  position: Position,
  borderRadius: number = 20
) {
  const { x, y, width, height, rotation = 0, shadow = false } = position

  ctx.save()

  // Move to center of where image will be
  const centerX = x + width / 2
  const centerY = y + height / 2
  ctx.translate(centerX, centerY)

  // Apply rotation
  if (rotation !== 0) {
    ctx.rotate((rotation * Math.PI) / 180)
  }

  // Draw shadow if enabled
  if (shadow) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
    ctx.shadowBlur = 30
    ctx.shadowOffsetX = 10
    ctx.shadowOffsetY = 20
  }

  // Create rounded rect path for clipping
  const halfWidth = width / 2
  const halfHeight = height / 2

  ctx.beginPath()
  ctx.roundRect(-halfWidth, -halfHeight, width, height, borderRadius)
  ctx.closePath()

  // Fill with a background color first (for shadow to show)
  ctx.fillStyle = '#ffffff'
  ctx.fill()

  // Reset shadow for image
  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  // Clip to rounded rect
  ctx.clip()

  // Calculate cover-fit dimensions
  const imgRatio = img.width / img.height
  const targetRatio = width / height

  let sx = 0, sy = 0, sw = img.width, sh = img.height

  if (imgRatio > targetRatio) {
    // Image is wider - crop sides
    sw = img.height * targetRatio
    sx = (img.width - sw) / 2
  } else {
    // Image is taller - crop top/bottom
    sh = img.width / targetRatio
    sy = (img.height - sh) / 2
  }

  // Draw the image centered
  ctx.drawImage(
    img,
    sx, sy, sw, sh,
    -halfWidth, -halfHeight, width, height
  )

  ctx.restore()
}

function drawTextOverlay(
  ctx: CanvasRenderingContext2D,
  appName: string,
  author: string,
  x: number,
  y: number,
  maxWidth: number,
  align: 'left' | 'center' | 'right',
  titleSize: number,
  authorSize: number
) {
  ctx.save()
  ctx.textAlign = align

  // Draw app name
  ctx.font = `bold ${titleSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  ctx.fillStyle = '#1a1a1a'

  // Word wrap the title if needed
  const words = appName.split(' ')
  let line = ''
  let lineY = y
  const lineHeight = titleSize * 1.2

  for (const word of words) {
    const testLine = line + (line ? ' ' : '') + word
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, lineY)
      line = word
      lineY += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, x, lineY)

  // Draw author
  lineY += lineHeight + 20
  ctx.font = `${authorSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  ctx.fillStyle = '#666666'
  ctx.fillText(`by ${author}`, x, lineY)

  ctx.restore()
}

function drawInfoPanel(
  ctx: CanvasRenderingContext2D,
  appName: string,
  author: string,
  x: number,
  y: number,
  width: number,
  height: number,
  background: string
) {
  ctx.save()

  // Panel background
  ctx.fillStyle = background === '#1a1a1a' ? '#2a2a2a' : '#e5e5e5'
  ctx.beginPath()
  ctx.roundRect(x, y, width, height, 10)
  ctx.fill()

  // Text
  const fontSize = Math.min(18, Math.floor(height / 2.5))
  ctx.fillStyle = background === '#1a1a1a' ? '#ffffff' : '#1a1a1a'
  ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(`${appName} by ${author}`, x + width / 2, y + height / 2)

  ctx.restore()
}

export function CollagePreview({
  layout,
  screenshots,
  appName,
  author,
  className = '',
}: CollagePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [images, setImages] = useState<LoadedImages>({
    splash: null,
    screen1: null,
    screen2: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scale, setScale] = useState(1)

  const layoutConfig = LAYOUTS[layout]

  // Load images
  useEffect(() => {
    setLoading(true)
    setError(null)

    Promise.all([
      loadImage(screenshots.splash),
      loadImage(screenshots.screen1),
      loadImage(screenshots.screen2),
    ])
      .then(([splash, screen1, screen2]) => {
        setImages({ splash, screen1, screen2 })
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [screenshots.splash, screenshots.screen1, screenshots.screen2])

  // Calculate scale to fit container
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const maxScale = containerWidth / layoutConfig.dimensions.width
        setScale(Math.min(maxScale, 1))
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [layoutConfig.dimensions.width])

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !images.splash || !images.screen1 || !images.screen2) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { dimensions, positions, background, textOverlay, infoPanel } = layoutConfig

    // Set canvas size
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Draw background
    ctx.fillStyle = background
    ctx.fillRect(0, 0, dimensions.width, dimensions.height)

    // Draw screens in order (back to front for proper layering)
    // For Layout C (stacked), draw in order: splash, screen1, screen2
    // For Layout B (tilted hero), draw in order: screen2, screen1, splash
    if (layout === 'B') {
      drawImageWithTransform(ctx, images.screen2, positions.screen2)
      drawImageWithTransform(ctx, images.screen1, positions.screen1)
      drawImageWithTransform(ctx, images.splash, positions.splash)
    } else if (layout === 'C') {
      drawImageWithTransform(ctx, images.splash, positions.splash)
      drawImageWithTransform(ctx, images.screen1, positions.screen1)
      drawImageWithTransform(ctx, images.screen2, positions.screen2)
    } else {
      // Layout A - no overlapping
      drawImageWithTransform(ctx, images.splash, positions.splash)
      drawImageWithTransform(ctx, images.screen1, positions.screen1)
      drawImageWithTransform(ctx, images.screen2, positions.screen2)
    }

    // Draw text overlay if present
    if (textOverlay) {
      drawTextOverlay(
        ctx,
        appName,
        author,
        textOverlay.x,
        textOverlay.y,
        textOverlay.maxWidth,
        textOverlay.align,
        textOverlay.titleSize,
        textOverlay.authorSize
      )
    }

    // Draw info panel if present
    if (infoPanel) {
      drawInfoPanel(
        ctx,
        appName,
        author,
        infoPanel.x,
        infoPanel.y,
        infoPanel.width,
        infoPanel.height,
        background
      )
    }
  }, [images, layoutConfig, appName, author, layout])

  if (loading) {
    return (
      <div
        ref={containerRef}
        className={`flex items-center justify-center bg-neutral-100 rounded-xl ${className}`}
        style={{
          aspectRatio: `${layoutConfig.dimensions.width} / ${layoutConfig.dimensions.height}`,
        }}
      >
        <div className="text-neutral-500 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-neutral-300 border-t-neutral-600 rounded-full mx-auto mb-2" />
          <p className="text-sm">Loading preview...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        ref={containerRef}
        className={`flex items-center justify-center bg-red-50 rounded-xl ${className}`}
        style={{
          aspectRatio: `${layoutConfig.dimensions.width} / ${layoutConfig.dimensions.height}`,
        }}
      >
        <div className="text-red-600 text-center p-4">
          <p className="font-medium">Failed to load images</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div
        className="relative mx-auto"
        style={{
          width: layoutConfig.dimensions.width * scale,
          height: layoutConfig.dimensions.height * scale,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: layoutConfig.dimensions.width * scale,
            height: layoutConfig.dimensions.height * scale,
            display: 'block',
          }}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  )
}
