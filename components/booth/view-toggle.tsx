"use client"

import { useState, useEffect } from "react"
import { Users, Settings } from "lucide-react"

type ViewMode = "guest" | "operator"

interface ViewToggleProps {
  onChange: (mode: ViewMode) => void
  defaultMode?: ViewMode
}

export function ViewToggle({ onChange, defaultMode = "guest" }: ViewToggleProps) {
  const [mode, setMode] = useState<ViewMode>(defaultMode)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("booth-view-mode") as ViewMode | null
    if (saved && (saved === "guest" || saved === "operator")) {
      setMode(saved)
      onChange(saved)
    }
  }, [onChange])

  const handleModeChange = (newMode: ViewMode) => {
    setMode(newMode)
    localStorage.setItem("booth-view-mode", newMode)
    onChange(newMode)
  }

  return (
    <div className="inline-flex rounded-xl bg-neutral-100 p-1">
      <button
        onClick={() => handleModeChange("guest")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          mode === "guest"
            ? "bg-white text-neutral-900 shadow-sm"
            : "text-neutral-500 hover:text-neutral-700"
        }`}
      >
        <Users className="w-4 h-4" />
        Guest
      </button>
      <button
        onClick={() => handleModeChange("operator")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          mode === "operator"
            ? "bg-white text-neutral-900 shadow-sm"
            : "text-neutral-500 hover:text-neutral-700"
        }`}
      >
        <Settings className="w-4 h-4" />
        Operator
      </button>
    </div>
  )
}

// Hook version for use in page components
export function useViewMode() {
  const [mode, setMode] = useState<ViewMode>("guest")

  useEffect(() => {
    const saved = localStorage.getItem("booth-view-mode") as ViewMode | null
    if (saved && (saved === "guest" || saved === "operator")) {
      setMode(saved)
    }
  }, [])

  return mode
}
