import * as React from "react"
import { cn } from "@/lib/utils"

interface ListItemProps {
  title: string
  subtitle?: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ListItem({
  title,
  subtitle,
  leading,
  trailing,
  onClick,
  className,
}: ListItemProps) {
  const Comp = onClick ? "button" : "div"
  
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-4 w-full text-left",
        onClick && "hover:bg-[hsl(var(--muted))] active:bg-[hsl(var(--muted))] transition-colors",
        className
      )}
    >
      {leading && (
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[hsl(var(--muted))] flex items-center justify-center text-[hsl(var(--primary))]">
          {leading}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{title}</p>
        {subtitle && (
          <p className="text-sm text-[hsl(var(--muted-foreground))] truncate">
            {subtitle}
          </p>
        )}
      </div>
      {trailing && (
        <div className="flex-shrink-0 text-[hsl(var(--muted-foreground))]">
          {trailing}
        </div>
      )}
    </Comp>
  )
}

interface ListGroupProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function ListGroup({ title, children, className }: ListGroupProps) {
  return (
    <div className={cn("", className)}>
      {title && (
        <h3 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
          {title}
        </h3>
      )}
      <div className="bg-[hsl(var(--card))] rounded-2xl divide-y divide-[hsl(var(--border))] overflow-hidden">
        {children}
      </div>
    </div>
  )
}
