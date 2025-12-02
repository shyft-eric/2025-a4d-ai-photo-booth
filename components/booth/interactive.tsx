import * as React from "react"
import { cn } from "@/lib/utils"

// ============================================
// MAP PLACEHOLDER
// ============================================

interface MapPlaceholderProps {
  className?: string
  children?: React.ReactNode
  markerCount?: number
  showRoute?: boolean
}

export function MapPlaceholder({ 
  className, 
  children, 
  markerCount = 3,
  showRoute = false 
}: MapPlaceholderProps) {
  // Generate random marker positions
  const markers = React.useMemo(() => 
    [...Array(markerCount)].map((_, i) => ({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      id: i,
    })),
    [markerCount]
  )

  return (
    <div
      className={cn(
        "relative w-full h-64 rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--secondary))]",
        className
      )}
    >
      {/* Grid pattern to simulate map */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Route line */}
      {showRoute && markers.length >= 2 && (
        <svg className="absolute inset-0 w-full h-full">
          <polyline
            points={markers.map(m => `${m.x}%,${m.y}%`).join(' ')}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 4"
          />
        </svg>
      )}
      
      {/* Markers */}
      {markers.map((marker) => (
        <div
          key={marker.id}
          className="absolute w-8 h-8 -translate-x-1/2 -translate-y-full"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
        >
          <div className="w-8 h-8 bg-[hsl(var(--primary))] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <span className="text-xs font-bold text-[hsl(var(--primary-foreground))]">
              {marker.id + 1}
            </span>
          </div>
          <div className="w-2 h-2 bg-[hsl(var(--primary))] mx-auto -mt-1 rotate-45" />
        </div>
      ))}

      {children && (
        <div className="absolute inset-x-0 bottom-0 p-4">
          {children}
        </div>
      )}
    </div>
  )
}

// ============================================
// CARD STACK (for swipeable/dating style UIs)
// ============================================

interface ProfileCardProps {
  name: string
  age?: number
  tagline?: string
  image?: string
  tags?: string[]
  className?: string
  children?: React.ReactNode
}

export function ProfileCard({ 
  name, 
  age, 
  tagline, 
  image, 
  tags,
  className,
  children 
}: ProfileCardProps) {
  return (
    <div
      className={cn(
        "relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-[hsl(var(--card))] shadow-2xl",
        className
      )}
    >
      {/* Background image or gradient */}
      {image ? (
        <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 theme-gradient" />
      )}
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <div className="flex items-baseline gap-2">
          <h2 className="text-3xl font-black">{name}</h2>
          {age && <span className="text-xl font-light">{age}</span>}
        </div>
        
        {tagline && (
          <p className="mt-1 text-white/80">{tagline}</p>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-white/20 backdrop-blur-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {children}
      </div>
    </div>
  )
}

interface CardStackProps {
  children: React.ReactNode[]
  className?: string
}

export function CardStack({ children, className }: CardStackProps) {
  return (
    <div className={cn("relative w-full max-w-sm mx-auto", className)}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            transform: `scale(${1 - index * 0.05}) translateY(${index * 12}px)`,
            zIndex: children.length - index,
            opacity: index < 3 ? 1 - index * 0.2 : 0,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// ============================================
// BOTTOM SHEET
// ============================================

interface BottomSheetProps {
  children: React.ReactNode
  className?: string
  height?: "sm" | "md" | "lg" | "full"
}

export function BottomSheet({ children, className, height = "md" }: BottomSheetProps) {
  const heightClasses = {
    sm: "h-1/4",
    md: "h-1/3",
    lg: "h-1/2",
    full: "h-3/4",
  }

  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 bg-[hsl(var(--card))] rounded-t-3xl shadow-2xl",
        heightClasses[height],
        className
      )}
    >
      {/* Drag handle */}
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-10 h-1 bg-[hsl(var(--muted))] rounded-full" />
      </div>
      <div className="px-4 pb-4 overflow-auto">
        {children}
      </div>
    </div>
  )
}
