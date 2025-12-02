import * as React from "react"
import { cn } from "@/lib/utils"

// ============================================
// AVATAR
// ============================================

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
    xl: "w-24 h-24 text-xl",
  }

  return (
    <div
      className={cn(
        "rounded-full bg-[hsl(var(--muted))] flex items-center justify-center font-bold text-[hsl(var(--muted-foreground))] overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt || "Avatar"} className="w-full h-full object-cover" />
      ) : (
        <span>{fallback || "?"}</span>
      )}
    </div>
  )
}

// ============================================
// BADGE
// ============================================

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "success" | "warning" | "danger"
  size?: "sm" | "md"
  className?: string
}

export function Badge({ children, variant = "default", size = "md", className }: BadgeProps) {
  const variantClasses = {
    default: "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
    secondary: "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-black",
    danger: "bg-red-500 text-white",
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}

// ============================================
// STATS CARD
// ============================================

interface StatsCardProps {
  value: string | number
  label: string
  icon?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
}

export function StatsCard({ value, label, icon, trend, trendValue, className }: StatsCardProps) {
  const trendColors = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-[hsl(var(--muted-foreground))]",
  }

  return (
    <div
      className={cn(
        "p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-3xl font-black">{value}</p>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{label}</p>
          {trend && trendValue && (
            <p className={cn("text-sm font-medium mt-2", trendColors[trend])}>
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trend === "neutral" && "→"} {trendValue}
            </p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-[hsl(var(--muted))] flex items-center justify-center text-[hsl(var(--primary))]">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// PROGRESS RING
// ============================================

interface ProgressRingProps {
  value: number // 0-100
  size?: number
  strokeWidth?: number
  label?: string
  sublabel?: string
  className?: string
}

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
  className,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-2xl font-black">{value}%</span>
        {label && <span className="text-xs text-[hsl(var(--muted-foreground))]">{label}</span>}
      </div>
      {sublabel && (
        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{sublabel}</p>
      )}
    </div>
  )
}
