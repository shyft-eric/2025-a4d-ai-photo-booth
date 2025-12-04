'use client'

import { Suspense, lazy, useMemo, ComponentType } from 'react'
import { LAYOUTS, type LayoutId } from '@/lib/collage-layouts'
import { PhonePreview } from './phone-preview'

interface CollagePreviewLiveProps {
  layout: LayoutId
  appNumber: number
  theme: string
  appName: string
  author: string
  className?: string
}

// Create a cache for dynamically imported components
const componentCache: Record<string, ComponentType<object>> = {}

// Dynamic import helper that caches components
function getAppScreen(appNumber: number, screen: 'splash' | 'screen1' | 'screen2') {
  const cacheKey = `app${appNumber}-${screen}`

  if (!componentCache[cacheKey]) {
    const path = screen === 'splash'
      ? `../../app/app${appNumber}/page`
      : `../../app/app${appNumber}/${screen === 'screen1' ? 'screen-1' : 'screen-2'}/page`

    componentCache[cacheKey] = lazy(() =>
      import(`../../app/app${appNumber}/${screen === 'splash' ? '' : screen === 'screen1' ? 'screen-1/' : 'screen-2/'}page`)
        .catch(() => ({ default: () => <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400">Screen not found</div> }))
    )
  }

  return componentCache[cacheKey]
}

// Pre-define lazy imports for apps 1-20 to ensure webpack can bundle them
// This is necessary because dynamic imports with variables aren't statically analyzable
const appImports: Record<number, {
  splash: ComponentType<object>
  screen1: ComponentType<object>
  screen2: ComponentType<object>
}> = {
  1: {
    splash: lazy(() => import('@/app/app1/page').catch(() => ({ default: () => null }))),
    screen1: lazy(() => import('@/app/app1/screen-1/page').catch(() => ({ default: () => null }))),
    screen2: lazy(() => import('@/app/app1/screen-2/page').catch(() => ({ default: () => null }))),
  },
  2: {
    splash: lazy(() => import('@/app/app2/page').catch(() => ({ default: () => null }))),
    screen1: lazy(() => import('@/app/app2/screen-1/page').catch(() => ({ default: () => null }))),
    screen2: lazy(() => import('@/app/app2/screen-2/page').catch(() => ({ default: () => null }))),
  },
  3: {
    splash: lazy(() => import('@/app/app3/page').catch(() => ({ default: () => null }))),
    screen1: lazy(() => import('@/app/app3/screen-1/page').catch(() => ({ default: () => null }))),
    screen2: lazy(() => import('@/app/app3/screen-2/page').catch(() => ({ default: () => null }))),
  },
  4: {
    splash: lazy(() => import('@/app/app4/page').catch(() => ({ default: () => null }))),
    screen1: lazy(() => import('@/app/app4/screen-1/page').catch(() => ({ default: () => null }))),
    screen2: lazy(() => import('@/app/app4/screen-2/page').catch(() => ({ default: () => null }))),
  },
  5: {
    splash: lazy(() => import('@/app/app5/page').catch(() => ({ default: () => null }))),
    screen1: lazy(() => import('@/app/app5/screen-1/page').catch(() => ({ default: () => null }))),
    screen2: lazy(() => import('@/app/app5/screen-2/page').catch(() => ({ default: () => null }))),
  },
  6: {
    splash: lazy(() => import('@/app/app6/page').catch(() => ({ default: () => null }))),
    screen1: lazy(() => import('@/app/app6/screen-1/page').catch(() => ({ default: () => null }))),
    screen2: lazy(() => import('@/app/app6/screen-2/page').catch(() => ({ default: () => null }))),
  },
  7: {
    splash: lazy(() => import('@/app/app7/page').catch(() => ({ default: () => null }))),
    screen1: lazy(() => import('@/app/app7/screen-1/page').catch(() => ({ default: () => null }))),
    screen2: lazy(() => import('@/app/app7/screen-2/page').catch(() => ({ default: () => null }))),
  },
  8: {
    splash: lazy(() => import('@/app/app8/page').catch(() => ({ default: () => null }))),
    screen1: lazy(() => import('@/app/app8/screen-1/page').catch(() => ({ default: () => null }))),
    screen2: lazy(() => import('@/app/app8/screen-2/page').catch(() => ({ default: () => null }))),
  },
  9: {
    splash: lazy(() => import('@/app/app9/page').catch(() => ({ default: () => null }))),
    screen1: lazy(() => import('@/app/app9/screen-1/page').catch(() => ({ default: () => null }))),
    screen2: lazy(() => import('@/app/app9/screen-2/page').catch(() => ({ default: () => null }))),
  },
  10: {
    splash: lazy(() => import('@/app/app10/page').catch(() => ({ default: () => null }))),
    screen1: lazy(() => import('@/app/app10/screen-1/page').catch(() => ({ default: () => null }))),
    screen2: lazy(() => import('@/app/app10/screen-2/page').catch(() => ({ default: () => null }))),
  },
  11: {
    splash: lazy(() => import('@/app/app11/page').catch(() => ({ default: () => null }))),
    screen1: lazy(() => import('@/app/app11/screen-1/page').catch(() => ({ default: () => null }))),
    screen2: lazy(() => import('@/app/app11/screen-2/page').catch(() => ({ default: () => null }))),
  },
  // Note: Add new apps here as they are created (apps 12+ don't exist yet)
}

function ScreenFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-100">
      <div className="animate-pulse text-neutral-400">Loading...</div>
    </div>
  )
}

export function CollagePreviewLive({
  layout,
  appNumber,
  theme,
  appName,
  author,
  className = '',
}: CollagePreviewLiveProps) {
  const layoutConfig = LAYOUTS[layout]
  const { dimensions, positions, background, textOverlay, infoPanel } = layoutConfig

  // Get the screen components for this app
  const screens = appImports[appNumber]

  // Calculate scale to fit container (we'll use CSS to scale)
  const baseScale = 0.6 // Scale down for the collage view

  // Calculate individual phone scales based on layout position widths
  const getPhoneScale = (width: number) => width / 375 // 375 is the phone width

  if (!screens) {
    return (
      <div className={`flex items-center justify-center bg-neutral-100 rounded-xl p-8 ${className}`}>
        <p className="text-neutral-500">App {appNumber} not found (supports apps 1-11)</p>
      </div>
    )
  }

  const SplashScreen = screens.splash
  const Screen1 = screens.screen1
  const Screen2 = screens.screen2

  // Determine render order based on layout
  const renderScreens = () => {
    const screenConfigs = [
      { key: 'splash', Component: SplashScreen, position: positions.splash },
      { key: 'screen1', Component: Screen1, position: positions.screen1 },
      { key: 'screen2', Component: Screen2, position: positions.screen2 },
    ]

    // For layout B, render in reverse order (back to front)
    if (layout === 'B') {
      screenConfigs.reverse()
    }

    return screenConfigs.map(({ key, Component, position }) => (
      <div
        key={key}
        className="absolute"
        style={{
          left: position.x * baseScale,
          top: position.y * baseScale,
          zIndex: key === 'splash' ? 30 : key === 'screen1' ? 20 : 10,
        }}
      >
        <PhonePreview
          theme={theme}
          scale={getPhoneScale(position.width) * baseScale}
          rotation={position.rotation}
          showShadow={position.shadow}
        >
          <Suspense fallback={<ScreenFallback />}>
            <Component />
          </Suspense>
        </PhonePreview>
      </div>
    ))
  }

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <div
        className="relative mx-auto"
        style={{
          width: dimensions.width * baseScale,
          height: dimensions.height * baseScale,
          backgroundColor: background,
        }}
      >
        {renderScreens()}

        {/* Text overlay for Layout B */}
        {textOverlay && (
          <div
            className="absolute"
            style={{
              left: textOverlay.x * baseScale,
              top: textOverlay.y * baseScale,
              maxWidth: textOverlay.maxWidth * baseScale,
            }}
          >
            <h2
              className="font-bold text-neutral-900"
              style={{ fontSize: textOverlay.titleSize * baseScale }}
            >
              {appName}
            </h2>
            <p
              className="text-neutral-500 mt-2"
              style={{ fontSize: textOverlay.authorSize * baseScale }}
            >
              by {author}
            </p>
          </div>
        )}

        {/* Info panel for Layouts A and C */}
        {infoPanel && (
          <div
            className="absolute rounded-xl flex items-center justify-center"
            style={{
              left: infoPanel.x * baseScale,
              top: infoPanel.y * baseScale,
              width: infoPanel.width * baseScale,
              height: infoPanel.height * baseScale,
              backgroundColor: background === '#1a1a1a' ? '#2a2a2a' : '#e5e5e5',
            }}
          >
            <span
              className="font-bold"
              style={{
                color: background === '#1a1a1a' ? '#ffffff' : '#1a1a1a',
                fontSize: Math.min(18, infoPanel.height / 2.5) * baseScale,
              }}
            >
              {appName} by {author}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
