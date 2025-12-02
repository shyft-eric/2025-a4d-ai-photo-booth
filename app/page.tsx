import Link from "next/link"
import { CHARACTER_DATA, APP_TYPE_DATA } from "@/lib/registry"

export default function Home() {
  const characters = Object.entries(CHARACTER_DATA)
  const appTypes = Object.entries(APP_TYPE_DATA)
  
  // Group characters by holiday
  const christmas = characters.filter(([, data]) => data.holiday === "christmas")
  const hanukkah = characters.filter(([, data]) => data.holiday === "hanukkah")
  const kwanzaa = characters.filter(([, data]) => data.holiday === "kwanzaa")
  const winter = characters.filter(([, data]) => data.holiday === "winter")

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4">🎄 Vibe Coding Photo Booth</h1>
          <p className="text-xl text-neutral-600">
            Create holiday-themed app mockups in 2-3 minutes!
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-4">🚀 Quick Start</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-green-50 rounded-xl">
              <span className="text-2xl">1️⃣</span>
              <p className="mt-2 font-medium">Guest picks a Character + App Type</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <span className="text-2xl">2️⃣</span>
              <p className="mt-2 font-medium">Write a one-shot prompt describing the app</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <span className="text-2xl">3️⃣</span>
              <p className="mt-2 font-medium">Claude generates screens → Screenshot → Collage!</p>
            </div>
          </div>
        </div>

        {/* Created Apps Gallery */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">📱 Created Apps</h2>
            <Link 
              href="/apps/example" 
              className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800"
            >
              View Example App →
            </Link>
          </div>
          <p className="text-neutral-500">
            Apps created during the event will appear at <code className="bg-neutral-100 px-2 py-1 rounded">/apps/app1</code>, <code className="bg-neutral-100 px-2 py-1 rounded">/apps/app2</code>, etc.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Characters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">🎭 Characters</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">Christmas</h3>
                <div className="flex flex-wrap gap-2">
                  {christmas.map(([key, data]) => (
                    <span key={key} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm">
                      {data.emoji} {data.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">Hanukkah</h3>
                <div className="flex flex-wrap gap-2">
                  {hanukkah.map(([key, data]) => (
                    <span key={key} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {data.emoji} {data.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">Kwanzaa</h3>
                <div className="flex flex-wrap gap-2">
                  {kwanzaa.map(([key, data]) => (
                    <span key={key} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm">
                      {data.emoji} {data.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">Winter</h3>
                <div className="flex flex-wrap gap-2">
                  {winter.map(([key, data]) => (
                    <span key={key} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm">
                      {data.emoji} {data.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* App Types */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">📱 App Types</h2>
            <div className="grid grid-cols-2 gap-2">
              {appTypes.map(([key, data]) => (
                <div key={key} className="p-3 bg-neutral-50 rounded-xl">
                  <p className="font-medium text-sm">{data.name}</p>
                  <p className="text-xs text-neutral-500 mt-1">{data.pattern}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Theme Preview Links */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mt-8">
          <h2 className="text-2xl font-bold mb-4">🎨 Theme Previews</h2>
          <p className="text-neutral-500 mb-4">Click to preview each character&apos;s theme:</p>
          <div className="flex flex-wrap gap-2">
            {characters.map(([key, data]) => (
              <Link
                key={key}
                href={`/preview/${key}`}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm transition-colors"
              >
                {data.emoji} {data.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-neutral-900 text-white rounded-2xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">📋 Operator Instructions</h2>
          <ol className="space-y-3 text-neutral-300">
            <li>1. Guest selects character card and app type card</li>
            <li>2. Open Claude and paste the system prompt from <code className="bg-neutral-800 px-2 py-0.5 rounded">CLAUDE_PROMPT.md</code></li>
            <li>3. Guest writes their one-shot prompt</li>
            <li>4. Claude generates code in <code className="bg-neutral-800 px-2 py-0.5 rounded">/app/appN/</code> (e.g., app2, app3...)</li>
            <li>5. Run <code className="bg-neutral-800 px-2 py-0.5 rounded">npm run capture N &quot;AppName&quot; &quot;AuthorName&quot;</code>
              <p className="text-xs text-neutral-500 mt-1">Example: <code>npm run capture 2 &quot;SleighShare&quot; &quot;Jamie&quot;</code></p>
            </li>
            <li>6. Run <code className="bg-neutral-800 px-2 py-0.5 rounded">npm run collage ./captures/appN-... A|B|C|D</code>
              <p className="text-xs text-neutral-500 mt-1">Example: <code>npm run collage ./captures/app2-2024-12-15T10-30-00 C</code></p>
            </li>
            <li>7. Upload collage from <code className="bg-neutral-800 px-2 py-0.5 rounded">./collages/</code> to Miro</li>
          </ol>

          <div className="mt-6 p-4 bg-neutral-800 rounded-xl">
            <h3 className="font-semibold mb-2">Layout Options:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><code className="text-green-400">A</code> - Vertical strip (3 stacked)</div>
              <div><code className="text-blue-400">B</code> - 2x2 grid with info panel</div>
              <div><code className="text-purple-400">C</code> - Hero feature (large splash)</div>
              <div><code className="text-orange-400">D</code> - Phone lineup (side by side)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
