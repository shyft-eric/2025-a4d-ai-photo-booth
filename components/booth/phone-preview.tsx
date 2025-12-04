'use client'

import { ReactNode } from 'react'
import { AppShell } from './app-shell'

interface PhonePreviewProps {
  children: ReactNode
  theme: string
  scale?: number
  className?: string
  rotation?: number
  showShadow?: boolean
}

/**
 * PhonePreview renders content inside a scaled phone frame.
 * Used for collage previews to show app screens as live components.
 */
export function PhonePreview({
  children,
  theme,
  scale = 1,
  className = '',
  rotation = 0,
  showShadow = true,
}: PhonePreviewProps) {
  // Phone dimensions match .phone-frame in globals.css
  const phoneWidth = 375
  const phoneHeight = 740

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: phoneWidth * scale,
        height: phoneHeight * scale,
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        transformOrigin: 'center center',
      }}
    >
      {/* Shadow layer */}
      {showShadow && (
        <div
          className="absolute inset-0 rounded-[40px] bg-black/20 blur-xl"
          style={{
            transform: 'translate(8px, 16px) scale(0.98)',
          }}
        />
      )}

      {/* Phone frame container - scales down the full-size phone */}
      <div
        data-theme={theme}
        className="absolute inset-0 origin-top-left"
        style={{
          width: phoneWidth,
          height: phoneHeight,
          transform: `scale(${scale})`,
        }}
      >
        <AppShell>
          {children}
        </AppShell>
      </div>
    </div>
  )
}
