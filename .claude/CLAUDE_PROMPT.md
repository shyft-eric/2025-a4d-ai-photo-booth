# Claude Agent Instructions for Vibe Coding Photo Booth

You are helping create quick UI mockups for a "Vibe Coding Photo Booth" at a holiday party. This is a fun, creative activity where guests describe whimsical app concepts and you generate static screens.

## 🎯 CRITICAL CONSTRAINTS

1. **Generate ONLY static UI mockups** - No functionality, no API calls, no state management, no event handlers that do anything
2. **Create exactly**: 1 splash/hero page + 1-2 interior screens (3 screens max)
3. **Use ONLY pre-existing components** from the project
4. **Apply the character's theme** via `data-theme="{character}"` on the layout wrapper
5. **Keep code simple** - No abstractions, no complex logic
6. **Time target**: Under 90 seconds to generate all code

## 📁 File Structure

For app slot N (e.g., app2), create files at:
```
/app/app{N}/
├── layout.tsx          # Apply theme here with data-theme attribute
├── page.tsx            # Splash/Hero screen
├── screen-1/
│   └── page.tsx        # First interior screen
└── screen-2/
    └── page.tsx        # Second interior screen (optional)
```

## 🎨 Available Themes

Set via `data-theme="theme-name"` on the layout wrapper:

**Christmas**: `santa`, `mrs-claus`, `scrooge`, `rudolph`, `frosty`, `jack-frost`, `nutcracker`, `sugar-plum`, `krampus`
**New Year**: `father-time`, `baby-new-year`
**Winter**: `polar-bear`, `solstice`
**Hanukkah**: `maccabee`, `shamash`
**Kwanzaa**: `umoja`, `kuumba`

## 🧩 Available Components

### Layout Components
```tsx
import { AppShell } from "@/components/booth/app-shell"
// Wraps content in phone frame with status bar

import { NavBar } from "@/components/booth/nav-bar"
// Bottom navigation: items={[{ icon, label, active }]}

import { SplashHero } from "@/components/booth/splash-hero"
// Full-screen hero: title, tagline, ctaText, icon, backgroundPattern
// backgroundPattern options: "gradient" | "snow" | "stars" | "none"
```

### UI Components
```tsx
import { Button } from "@/components/ui/button"
// variant: "default" | "secondary" | "outline" | "ghost" | "accent"
// size: "sm" | "default" | "lg" | "xl" | "icon"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
// Standard card layout
```

### Data Display
```tsx
import { Avatar, Badge, StatsCard, ProgressRing } from "@/components/booth/data-display"

// Avatar: src?, fallback, size ("sm"|"md"|"lg"|"xl")
// Badge: variant ("default"|"secondary"|"success"|"warning"|"danger")
// StatsCard: value, label, icon?, trend? ("up"|"down"|"neutral"), trendValue?
// ProgressRing: value (0-100), size?, label?, sublabel?

import { ListItem } from "@/components/booth/list-item"
// ListItem: title, subtitle?, leftContent?, rightContent?
```

### Icons (Lucide React)
```tsx
import { Heart, Star, Gift, Snowflake, DollarSign, MapPin, User, Home, Bell, Settings, Play, Pause, Plus, Check, X, ChevronRight, TrendingUp, TrendingDown, Coffee, ShoppingCart, Utensils, Music, Calendar, Clock } from "lucide-react"
```

## 📝 Layout Template

```tsx
// /app/app{N}/layout.tsx
import { AppShell } from "@/components/booth/app-shell"
import { ScreenNav } from "@/components/booth/screen-nav"

export const metadata = {
  title: "{APP_NAME} - {CHARACTER}'s {APP_TYPE} App",
}

export const appConfig = {
  name: "{APP_NAME}",
  tagline: "{TAGLINE}",
  author: "{AUTHOR_NAME}",
  theme: "{THEME_ID}" as const,
  appType: "{APP_TYPE}" as const,
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-theme={appConfig.theme}
      className="flex items-center justify-center min-h-screen bg-zinc-900 p-8"
    >
      <AppShell>
        {children}
      </AppShell>
      <ScreenNav basePath="/app{N}" appName={appConfig.name} />
    </div>
  )
}
```

## 📱 Screen Templates

### Splash Screen (page.tsx)
```tsx
import { SplashHero } from "@/components/booth/splash-hero"
import { IconName } from "lucide-react"

export default function Splash() {
  return (
    <SplashHero
      title="App Name"
      tagline="Catchy tagline here"
      ctaText="Get Started"
      icon={<IconName className="w-12 h-12" />}
      backgroundPattern="gradient"
    >
      {/* Optional: Additional content like stats */}
    </SplashHero>
  )
}
```

### Interior Screen Template
```tsx
import { NavBar } from "@/components/booth/nav-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Home, User, Bell, Settings } from "lucide-react"

export default function Screen() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
        <h1 className="text-xl font-black text-[hsl(var(--foreground))]">Screen Title</h1>
      </div>

      {/* Content - remember pb-24 for nav clearance */}
      <div className="flex-1 p-5 overflow-auto pb-24">
        {/* Your content here */}
      </div>

      {/* Navigation */}
      <NavBar
        items={[
          { icon: <Home className="w-5 h-5" />, label: "Home", active: true },
          { icon: <User className="w-5 h-5" />, label: "Profile" },
          { icon: <Bell className="w-5 h-5" />, label: "Alerts" },
          { icon: <Settings className="w-5 h-5" />, label: "Settings" },
        ]}
      />
    </div>
  )
}
```

## 🎨 Styling Notes

### Theme Color Variables
Use HSL CSS variables for theme colors:
- `hsl(var(--background))` - Page background (usually light)
- `hsl(var(--foreground))` - Main text color (dark, for light backgrounds)
- `hsl(var(--primary))` - Primary brand color (buttons, accents)
- `hsl(var(--primary-foreground))` - Text ON primary color backgrounds
- `hsl(var(--secondary))` - Secondary color
- `hsl(var(--accent))` - Accent/highlight color
- `hsl(var(--muted))` - Muted/subtle backgrounds
- `hsl(var(--muted-foreground))` - Muted/subtle text
- `hsl(var(--card))` - Card background
- `hsl(var(--border))` - Border color

### CRITICAL: Color Contrast Rules (WCAG)
**Always ensure text is readable against its background!**

| Background | Use for Text |
|------------|--------------|
| `--background` (light) | `--foreground` or `--primary` |
| `--card` (light) | `--foreground` or `--card-foreground` |
| `--primary` (colored) | `--primary-foreground` |
| `--secondary` (varies) | `--secondary-foreground` |
| `--muted` (light) | `--foreground` or `--muted-foreground` |
| Gradient backgrounds | `--primary-foreground` (white) |

**Common Mistakes to Avoid:**
- NEVER use `--primary-foreground` (white) on `--background` (white/light)
- NEVER use `--foreground` (dark) on `--primary` (dark/colored)
- For SplashHero with `backgroundPattern="snow"` or `"stars"`, use `--foreground` for text
- For SplashHero with `backgroundPattern="gradient"`, use `--primary-foreground` for text

### Tailwind Syntax
Use Tailwind classes wrapped in brackets for CSS variables:
```tsx
// Correct contrast pairing
className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
className="bg-[hsl(var(--card))] text-[hsl(var(--foreground))]"
```

## ✅ Checklist Before Responding

1. [ ] Confirmed app concept in one sentence
2. [ ] Listed the 2-3 screens to create
3. [ ] Used correct app slot number (app2, app3, etc.)
4. [ ] Applied correct theme in layout
5. [ ] Used only available components
6. [ ] No complex logic or state
7. [ ] Mentioned which collage layout works best (A, B, C, or D)

## 🖼️ Collage Layout Recommendations

- **Layout A (Vertical Strip)**: Best for apps with distinct screen types
- **Layout B (2x2 Grid)**: Good for apps with similar-sized screens
- **Layout C (Hero Feature)**: Best when splash screen is the star
- **Layout D (Phone Mockup)**: Clean, professional look for any app

## 📌 Example Response Format

> **App Concept**: SleighShare - Rudolph's ride-sharing app for the North Pole where your driver rating affects how bright your nose glows on the map.
>
> **Screens**:
> 1. Splash - Glowing map of North Pole with sleighs
> 2. Screen 1 - Driver card for "Dasher"
> 3. Screen 2 - Trip summary
>
> **Recommended Collage**: Layout C (Hero Feature)
>
> [Generated code follows...]

---

**Remember**: This is about fun and creativity! Don't overthink it. Generate something whimsical that matches the character's vibe and makes the guest smile.
