'use client'

import Link from 'next/link'
import { CHARACTER_DATA, APP_TYPE_DATA, type ThemeName, type AppType } from '@/lib/registry'

interface AppCardProps {
  folder: string
  appNumber: number
  appName: string
  author: string
  theme: string
  appType: string
}

export function AppCard({
  folder,
  appNumber,
  appName,
  author,
  theme,
  appType,
}: AppCardProps) {
  const character = CHARACTER_DATA[theme as ThemeName]
  const appTypeInfo = APP_TYPE_DATA[appType as AppType]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow overflow-hidden">
      {/* Themed Header - styled like the app */}
      <div
        data-theme={theme}
        className="p-6 relative overflow-hidden"
        style={{ minHeight: '140px' }}
      >
        {/* Background gradient matching the app theme */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--theme-gradient-start)) 0%, hsl(var(--theme-gradient-end)) 100%)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between">
            {/* Character emoji as icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm"
              style={{
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))'
              }}
            >
              {character?.emoji || '📱'}
            </div>
            <span className="text-xs text-neutral-500 bg-white/80 px-2 py-1 rounded-full">
              App {appNumber}
            </span>
          </div>

          <div className="mt-4">
            <h3
              className="font-bold text-lg leading-tight"
              style={{ color: 'hsl(var(--primary-foreground))' }}
            >
              {appName}
            </h3>
            <p
              className="text-sm mt-0.5 opacity-80"
              style={{ color: 'hsl(var(--primary-foreground))' }}
            >
              by {author}
            </p>
          </div>
        </div>
      </div>

      {/* Info and Actions */}
      <div className="p-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {character && (
            <span className="px-2.5 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-700">
              {character.name}
            </span>
          )}
          {appTypeInfo && (
            <span className="px-2.5 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-600">
              {appTypeInfo.name}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/app${appNumber}`}
            className="flex-1 text-center px-4 py-2 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            View App
          </Link>
          <Link
            href={`/collage/${folder}`}
            className="flex-1 text-center px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Create Collage
          </Link>
        </div>
      </div>
    </div>
  )
}
