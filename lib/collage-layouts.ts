/**
 * Collage Layout Configurations
 *
 * Three focused layouts:
 * A: Phone Lineup - 3 full-height phones side by side (classic)
 * B: Tilted Hero - Single tilted phone with title text
 * C: Stacked Showcase - 3 overlapping tilted screens
 */

export type LayoutId = 'A' | 'B' | 'C'

export interface Position {
  x: number
  y: number
  width: number
  height: number
  rotation?: number // degrees
  shadow?: boolean
}

export interface TextOverlay {
  x: number
  y: number
  maxWidth: number
  align: 'left' | 'center' | 'right'
  titleSize: number
  authorSize: number
}

export interface CollageLayout {
  id: LayoutId
  name: string
  description: string
  dimensions: { width: number; height: number }
  background: string
  positions: {
    splash: Position
    screen1: Position
    screen2: Position
  }
  textOverlay?: TextOverlay
  infoPanel?: Position
}

// Phone aspect ratio: 430x932 = 0.461 (matches iPhone 14 Pro Max viewport used for screenshots)
const PHONE_RATIO = 430 / 932

// Helper to calculate height from width using phone ratio
const phoneHeight = (width: number) => Math.round(width / PHONE_RATIO)

export const LAYOUTS: Record<LayoutId, CollageLayout> = {
  // Layout A: Cascading Cards - 3 phones with subtle tilts in a stepped arrangement
  // Modern, dynamic take on the classic lineup
  A: {
    id: 'A',
    name: 'Cascading Cards',
    description: 'Stepped phones with subtle tilts',
    dimensions: { width: 1200, height: 750 },
    background: '#1a1a1a',
    positions: {
      // Left phone - tilted left, positioned higher
      splash: { x: 120, y: 50, width: 240, height: phoneHeight(240), rotation: -8, shadow: true },
      // Center phone - straight, slightly lower and larger
      screen1: { x: 460, y: 30, width: 280, height: phoneHeight(280), rotation: 0, shadow: true },
      // Right phone - tilted right, positioned higher
      screen2: { x: 820, y: 50, width: 240, height: phoneHeight(240), rotation: 8, shadow: true },
    },
    infoPanel: { x: 100, y: 680, width: 1000, height: 50 },
  },

  // Layout B: Tilted Hero - Large tilted splash with text overlay
  // Modern marketing-style with prominent title
  B: {
    id: 'B',
    name: 'Tilted Hero',
    description: 'Hero phone with title overlay',
    dimensions: { width: 1200, height: 750 },
    background: '#f5f5f5',
    positions: {
      // Large hero phone, tilted
      splash: { x: 80, y: 40, width: 280, height: phoneHeight(280), rotation: -10, shadow: true },
      // Smaller screens peeking behind/beside
      screen1: { x: 300, y: 100, width: 220, height: phoneHeight(220), rotation: -5, shadow: true },
      screen2: { x: 470, y: 160, width: 180, height: phoneHeight(180), rotation: 0, shadow: true },
    },
    textOverlay: {
      x: 700,
      y: 260,
      maxWidth: 420,
      align: 'left',
      titleSize: 48,
      authorSize: 20,
    },
  },

  // Layout C: Stacked Showcase - 3 overlapping tilted screens
  // Dynamic, portfolio-style with fanned card effect
  C: {
    id: 'C',
    name: 'Stacked Showcase',
    description: 'Overlapping tilted screens',
    dimensions: { width: 1200, height: 750 },
    background: '#1a1a1a',
    positions: {
      // Back screen (left tilt)
      splash: { x: 220, y: 50, width: 240, height: phoneHeight(240), rotation: -12, shadow: true },
      // Middle screen (straight, larger)
      screen1: { x: 460, y: 30, width: 280, height: phoneHeight(280), rotation: 0, shadow: true },
      // Front screen (right tilt)
      screen2: { x: 720, y: 50, width: 240, height: phoneHeight(240), rotation: 12, shadow: true },
    },
    infoPanel: { x: 100, y: 680, width: 1000, height: 50 },
  },
}

export const LAYOUT_IDS: LayoutId[] = ['A', 'B', 'C']

export function getLayout(id: string): CollageLayout | undefined {
  const normalized = id.toUpperCase() as LayoutId
  return LAYOUTS[normalized]
}
