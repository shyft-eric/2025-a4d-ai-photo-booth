'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { CollagePreviewLive } from '@/components/booth/collage-preview-live'
import { LayoutSelector } from '@/components/booth/layout-selector'
import { LAYOUTS, type LayoutId } from '@/lib/collage-layouts'
import { type AppInfo } from '@/app/api/apps/route'

export default function CollagePage() {
  const params = useParams()
  const folder = params.folder as string

  const [app, setApp] = useState<AppInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLayout, setSelectedLayout] = useState<LayoutId>('A')
  const [generating, setGenerating] = useState(false)

  // Fetch app metadata
  useEffect(() => {
    async function fetchApp() {
      try {
        const response = await fetch('/api/apps')
        if (!response.ok) throw new Error('Failed to fetch apps')

        const apps: AppInfo[] = await response.json()
        const foundApp = apps.find((a) => a.folder === folder)

        if (!foundApp) {
          setError('App not found')
        } else {
          setApp(foundApp)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load app')
      } finally {
        setLoading(false)
      }
    }

    fetchApp()
  }, [folder])

  const handleDownload = async () => {
    if (!app) return

    setGenerating(true)

    try {
      const response = await fetch('/api/collages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          folder: app.folder,
          layout: selectedLayout,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate collage')
      }

      // Get the blob and download it
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${app.appName.toLowerCase().replace(/\s+/g, '-')}-${selectedLayout.toLowerCase()}-collage.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to generate collage')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-3 border-neutral-300 border-t-neutral-600 rounded-full mx-auto mb-4" />
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-5xl mb-4">404</div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">App Not Found</h1>
          <p className="text-neutral-600 mb-6">{error || 'This capture folder does not exist.'}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const currentLayout = LAYOUTS[selectedLayout]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              &larr; Back
            </Link>
            <div>
              <h1 className="font-bold text-lg text-neutral-900">{app.appName}</h1>
              <p className="text-sm text-neutral-500">by {app.author}</p>
            </div>
          </div>
          <button
            onClick={handleDownload}
            disabled={generating}
            className={`
              px-6 py-2.5 rounded-xl font-medium transition-all
              ${generating
                ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow'
              }
            `}
          >
            {generating ? 'Generating...' : 'Download Collage'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Preview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 overflow-hidden">
          <CollagePreviewLive
            layout={selectedLayout}
            appNumber={app.appNumber}
            theme={app.theme}
            appName={app.appName}
            author={app.author}
          />
        </div>

        {/* Layout Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-lg text-neutral-800 mb-4">Choose Your Style</h2>
          <LayoutSelector selected={selectedLayout} onSelect={setSelectedLayout} />

          {/* Layout Description */}
          <div className="mt-4 p-4 bg-neutral-50 rounded-xl">
            <p className="text-sm text-neutral-600">
              <span className="font-medium text-neutral-800">{currentLayout.name}:</span>{' '}
              {currentLayout.description}
            </p>
          </div>
        </div>

        {/* App Info Card */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-sm text-neutral-800 mb-3">App Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <dt className="text-neutral-500">Name</dt>
              <dd className="font-medium text-neutral-800">{app.appName}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Author</dt>
              <dd className="font-medium text-neutral-800">{app.author}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Theme</dt>
              <dd className="font-medium text-neutral-800 capitalize">{app.theme}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Type</dt>
              <dd className="font-medium text-neutral-800 capitalize">
                {app.appType.replace('-', ' ')}
              </dd>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
