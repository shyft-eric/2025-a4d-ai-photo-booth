'use client'

import { LAYOUTS, LAYOUT_IDS, type LayoutId } from '@/lib/collage-layouts'

interface LayoutSelectorProps {
  selected: LayoutId
  onSelect: (layout: LayoutId) => void
  className?: string
}

function LayoutThumbnail({ layoutId }: { layoutId: LayoutId }) {
  const layout = LAYOUTS[layoutId]

  // Scale down for thumbnail
  const scale = 60 / layout.dimensions.width
  const width = layout.dimensions.width * scale
  const height = layout.dimensions.height * scale

  // Simplified visual representation of each layout
  const renderLayoutPreview = () => {
    switch (layoutId) {
      case 'A':
        // Cascading Cards - 3 phones with tilts
        return (
          <>
            <g transform="rotate(-6, 14, 20)">
              <rect x="6" y="6" width="12" height="26" rx="2" fill="#60a5fa" />
            </g>
            <rect x="24" y="4" width="13" height="28" rx="2" fill="#34d399" />
            <g transform="rotate(6, 46, 20)">
              <rect x="42" y="6" width="12" height="26" rx="2" fill="#fbbf24" />
            </g>
          </>
        )
      case 'B':
        // Tilted Hero - large tilted phone with text
        return (
          <>
            <g transform="rotate(-12, 20, 20)">
              <rect x="6" y="4" width="18" height="32" rx="2" fill="#60a5fa" />
            </g>
            <rect x="35" y="12" width="20" height="3" rx="1" fill="#9ca3af" />
            <rect x="35" y="18" width="16" height="2" rx="1" fill="#d1d5db" />
          </>
        )
      case 'C':
        // Stacked Showcase - overlapping tilted screens
        return (
          <>
            <g transform="rotate(-12, 15, 20)">
              <rect x="8" y="6" width="14" height="28" rx="2" fill="#60a5fa" />
            </g>
            <rect x="22" y="4" width="16" height="32" rx="2" fill="#34d399" />
            <g transform="rotate(12, 45, 20)">
              <rect x="36" y="6" width="14" height="28" rx="2" fill="#fbbf24" />
            </g>
          </>
        )
      default:
        return null
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 40"
      className="rounded"
    >
      {/* Background */}
      <rect
        width="60"
        height="40"
        fill={layout.background}
        rx="3"
      />
      {renderLayoutPreview()}
    </svg>
  )
}

export function LayoutSelector({ selected, onSelect, className = '' }: LayoutSelectorProps) {
  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      {LAYOUT_IDS.map((layoutId) => {
        const layout = LAYOUTS[layoutId]
        const isSelected = selected === layoutId

        return (
          <button
            key={layoutId}
            onClick={() => onSelect(layoutId)}
            className={`
              flex flex-col items-center p-4 rounded-xl border-2 transition-all
              ${isSelected
                ? 'border-blue-500 bg-blue-50'
                : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
              }
            `}
          >
            <div className="mb-2">
              <LayoutThumbnail layoutId={layoutId} />
            </div>
            <div className="text-center">
              <div
                className={`font-bold text-sm ${isSelected ? 'text-blue-700' : 'text-neutral-800'}`}
              >
                {layout.name}
              </div>
              <div className="text-xs text-neutral-500 mt-0.5">{layout.description}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
