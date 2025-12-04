"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, RotateCcw, Sparkles } from "lucide-react"
import { PaletteSelector, getPaletteGradient } from "./palette-selector"
import { PALETTE_VARIANTS, type ThemeName, type PaletteVariant } from "@/lib/registry"

interface Character {
  id: string
  name: string
  emoji: string
  vibe: string
  holiday: string
}

interface AppTypeOption {
  id: string
  name: string
  pattern: string
  screens: string[]
}

interface PromptBuilderProps {
  characters: Character[]
  appTypes: AppTypeOption[]
}

export function PromptBuilder({ characters, appTypes }: PromptBuilderProps) {
  const [appName, setAppName] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [selectedCharacter, setSelectedCharacter] = useState("")
  const [selectedAppType, setSelectedAppType] = useState("")
  const [selectedPalette, setSelectedPalette] = useState<PaletteVariant>("default")
  const [feature1, setFeature1] = useState("")
  const [feature2, setFeature2] = useState("")
  const [feature3, setFeature3] = useState("")
  const [copied, setCopied] = useState(false)

  const character = characters.find(c => c.id === selectedCharacter)
  const appType = appTypes.find(a => a.id === selectedAppType)

  // Get palette info for the prompt
  const paletteInfo = useMemo(() => {
    if (!selectedCharacter) return null
    const palettes = PALETTE_VARIANTS[selectedCharacter as ThemeName]
    const palette = palettes?.find(p => p.id === selectedPalette) || palettes?.[0]
    return palette
  }, [selectedCharacter, selectedPalette])

  const generatedPrompt = useMemo(() => {
    if (!appName || !authorName || !selectedCharacter || !selectedAppType || !feature1) {
      return null
    }

    const features = [feature1, feature2, feature3].filter(Boolean)
    const featureList = features.map((f, i) => `${i + 1}. ${f}`).join("\n")

    // Include palette override if not default
    const paletteInstructions = selectedPalette !== "default" && paletteInfo
      ? `\n\nColor Palette Override: "${paletteInfo.name}"
- Gradient Start: hsl(${paletteInfo.gradientStart})
- Gradient End: hsl(${paletteInfo.gradientEnd})
Use these colors for --theme-gradient-start and --theme-gradient-end CSS variables.`
      : ""

    return `@agent-holiday-party-vibes Please build this app: Create an app called "${appName}" by ${authorName}.

Character: ${character?.name} (${character?.vibe})
App Type: ${appType?.name}
Theme: ${selectedCharacter}${paletteInstructions}

This app should have these unique features:
${featureList}

Generate the splash screen and 2 interior screens that showcase these features.
Use the ${selectedCharacter} theme and make sure to apply data-theme="${selectedCharacter}" on the layout.

Screens to create:
1. Splash/Hero screen with the app name and a compelling tagline
2. ${appType?.screens[1] || "Main screen"} - showcasing the first feature
3. ${appType?.screens[2] || "Detail screen"} - showcasing another feature

Remember: This is for a photo booth, so make it visually striking and fun!`
  }, [appName, authorName, selectedCharacter, selectedAppType, feature1, feature2, feature3, character, appType, selectedPalette, paletteInfo])

  const isValid = appName && authorName && selectedCharacter && selectedAppType && feature1

  const handleCopy = async () => {
    if (!generatedPrompt) return

    try {
      await navigator.clipboard.writeText(generatedPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleReset = () => {
    setAppName("")
    setAuthorName("")
    setSelectedCharacter("")
    setSelectedAppType("")
    setSelectedPalette("default")
    setFeature1("")
    setFeature2("")
    setFeature3("")
    setCopied(false)
  }

  // Reset palette when character changes
  const handleCharacterChange = (value: string) => {
    setSelectedCharacter(value)
    setSelectedPalette("default")
  }

  // Group characters by holiday for the dropdown
  const groupedCharacters = useMemo(() => {
    const groups: Record<string, Character[]> = {}
    characters.forEach(char => {
      if (!groups[char.holiday]) {
        groups[char.holiday] = []
      }
      groups[char.holiday].push(char)
    })
    return groups
  }, [characters])

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-purple-500" />
        <h2 className="text-2xl font-bold">Create Your App</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="space-y-4">
          {/* App Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              App Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="e.g., FrostyFitness, SantaSnacks"
              className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Author Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Your name for the credits"
              className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Character Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Character <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedCharacter}
              onChange={(e) => handleCharacterChange(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="">Choose a character...</option>
              {Object.entries(groupedCharacters).map(([holiday, chars]) => (
                <optgroup key={holiday} label={holiday.charAt(0).toUpperCase() + holiday.slice(1)}>
                  {chars.map(char => (
                    <option key={char.id} value={char.id}>
                      {char.emoji} {char.name} - {char.vibe}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Color Palette Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Color Palette
            </label>
            <PaletteSelector
              character={selectedCharacter as ThemeName | null || null}
              selectedPalette={selectedPalette}
              onSelect={setSelectedPalette}
            />
          </div>

          {/* App Type Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              App Type <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedAppType}
              onChange={(e) => setSelectedAppType(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="">Choose an app type...</option>
              {appTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name} - {type.pattern}
                </option>
              ))}
            </select>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Feature 1 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={feature1}
              onChange={(e) => setFeature1(e.target.value)}
              placeholder="Describe a unique feature..."
              className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Feature 2 <span className="text-neutral-400">(optional)</span>
            </label>
            <input
              type="text"
              value={feature2}
              onChange={(e) => setFeature2(e.target.value)}
              placeholder="Another cool feature..."
              className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Feature 3 <span className="text-neutral-400">(optional)</span>
            </label>
            <input
              type="text"
              value={feature3}
              onChange={(e) => setFeature3(e.target.value)}
              placeholder="One more idea..."
              className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Generated Prompt
          </label>
          <div className="flex-1 bg-neutral-50 rounded-xl p-4 font-mono text-sm overflow-auto min-h-[300px] border border-neutral-200">
            {generatedPrompt ? (
              <pre className="whitespace-pre-wrap text-neutral-700">{generatedPrompt}</pre>
            ) : (
              <p className="text-neutral-400 italic">
                Fill in the required fields to generate your prompt...
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleCopy}
              disabled={!isValid}
              className="flex-1"
              variant={copied ? "secondary" : "default"}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </>
              )}
            </Button>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
