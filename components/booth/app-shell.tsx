import * as React from "react"
import { cn } from "@/lib/utils"

interface AppShellProps {
  children: React.ReactNode
  className?: string
  showStatusBar?: boolean
}

export function AppShell({ children, className, showStatusBar = true }: AppShellProps) {
  return (
    <div className={cn("phone-frame screenshot-ready", className)}>
      {showStatusBar && (
        <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-6 pt-3 z-40">
          <span className="text-xs font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71s.11.53.29.71l11 11c.39.39 1.02.39 1.41 0l11-11c.18-.18.29-.43.29-.71s-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/>
            </svg>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 22h20V2z"/>
            </svg>
            <svg className="w-6 h-3" fill="currentColor" viewBox="0 0 28 14">
              <rect x="0" y="0" width="25" height="14" rx="3" stroke="currentColor" strokeWidth="1" fill="none"/>
              <rect x="2" y="2" width="20" height="10" rx="1.5" fill="currentColor"/>
              <rect x="26" y="4" width="2" height="6" rx="1" fill="currentColor"/>
            </svg>
          </div>
        </div>
      )}
      <div className="absolute inset-0 pt-12 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
