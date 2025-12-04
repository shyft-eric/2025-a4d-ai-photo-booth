"use client"

import { PALETTE_VARIANTS, type ThemeName, type PaletteVariant, type PaletteOption } from "@/lib/registry"

interface PaletteSelectorProps {
  character: ThemeName | null
  selectedPalette: PaletteVariant
  onSelect: (palette: PaletteVariant) => void
}

export function PaletteSelector({ character, selectedPalette, onSelect }: PaletteSelectorProps) {
  if (!character) {
    return (
      <div className="p-3 bg-neutral-100 rounded-xl text-center text-sm text-neutral-500">
        Select a character first to see palette options
      </div>
    )
  }

  const palettes = PALETTE_VARIANTS[character]

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {palettes.map((palette) => (
          <PaletteOption
            key={palette.id}
            palette={palette}
            isSelected={selectedPalette === palette.id}
            onSelect={() => onSelect(palette.id)}
          />
        ))}
      </div>
    </div>
  )
}

interface PaletteOptionProps {
  palette: PaletteOption
  isSelected: boolean
  onSelect: () => void
}

function PaletteOption({ palette, isSelected, onSelect }: PaletteOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        relative p-2 rounded-xl border-2 transition-all text-left
        ${isSelected
          ? 'border-purple-500 ring-2 ring-purple-200 bg-purple-50'
          : 'border-neutral-200 hover:border-neutral-300 bg-white'
        }
      `}
    >
      {/* Color preview bar */}
      <div className="flex h-6 rounded-lg overflow-hidden mb-2 shadow-sm">
        <div
          className="flex-1"
          style={{ backgroundColor: palette.preview[0] }}
        />
        <div
          className="flex-1"
          style={{ backgroundColor: palette.preview[1] }}
        />
        <div
          className="flex-1"
          style={{ backgroundColor: palette.preview[2] }}
        />
      </div>

      {/* Palette name */}
      <div className="text-xs font-medium text-neutral-700 truncate">
        {palette.name}
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-1 right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  )
}

// Export a helper to get gradient CSS for a palette
export function getPaletteGradient(character: ThemeName, paletteId: PaletteVariant): { start: string; end: string } {
  const palettes = PALETTE_VARIANTS[character]
  const palette = palettes.find(p => p.id === paletteId) || palettes[0]
  return {
    start: palette.gradientStart,
    end: palette.gradientEnd
  }
}
