import * as React from "react"
import { cn } from "@/lib/utils"

interface NavItem {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  return (
    <nav
      className={cn(
        "absolute bottom-0 left-0 right-0 h-20 bg-[hsl(var(--card))] border-t border-[hsl(var(--border))] flex items-center justify-around px-4 pb-4",
        className
      )}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={cn(
            "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors",
            item.active
              ? "text-[hsl(var(--primary))]"
              : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          )}
        >
          <span className="w-6 h-6">{item.icon}</span>
          <span className="text-xs font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
