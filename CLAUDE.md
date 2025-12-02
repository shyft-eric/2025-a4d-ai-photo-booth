# CLAUDE.md - Vibe Coding Photo Booth

> Agent context file for Claude Code and other AI assistants working on this project.

## Project Overview

This is a **holiday tech meetup activity** where guests create whimsical mobile app mockups in 2-3 minutes using AI-assisted coding. The system generates themed app screens that get captured and assembled into shareable photo collages.

### Tech Stack
- **Framework**: Next.js 16 with App Router, TypeScript
- **Styling**: Tailwind CSS 4 with CSS variables for theming
- **UI Components**: Custom booth components + shadcn/ui base (Button, Card)
- **Screenshot**: Playwright (headless browser capture)
- **Image Processing**: Sharp (collage generation)

### Key Directories
```
app/                    # Next.js App Router pages
├── page.tsx           # Homepage/control panel
├── preview/[theme]/   # Dynamic theme preview routes (17 themes)
├── app1/              # Example app slot (Scrooge/PennyPincher)
├── apps/example/      # Example app (Rudolph/SleighShare)
components/
├── booth/             # Photo booth UI components (AppShell, SplashHero, etc.)
├── ui/                # Base UI components (Button, Card)
lib/
├── registry.ts        # Character & app type definitions
├── utils.ts           # Utility functions (cn)
scripts/
├── capture.ts         # Playwright screenshot script
├── collage.ts         # Sharp image compositing script
public/assets/         # Static assets (icons - currently empty)
captures/              # Screenshot output directory
collages/              # Collage output directory
```

## Starting & Stopping the Project

### Start Development Server
```bash
npm run dev
```
Server runs at `http://localhost:3000`

### Stop Development Server
```bash
# If running in foreground: Ctrl+C
# If running in background:
pkill -f "next dev"
```

### Other Commands
```bash
npm run build          # Production build
npm run lint           # ESLint check
```

## Theme System

The app uses 17 character themes defined via CSS variables in `app/globals.css`. Themes are applied using the `data-theme` attribute:

```tsx
<div data-theme="santa">
  {/* Content uses theme colors */}
</div>
```

### Available Themes
| ID | Character | Holiday |
|----|-----------|---------|
| `santa` | Santa Claus | Christmas |
| `mrs-claus` | Mrs. Claus | Christmas |
| `scrooge` | Scrooge | Christmas |
| `rudolph` | Rudolph | Christmas |
| `frosty` | Frosty | Christmas |
| `jack-frost` | Jack Frost | Christmas |
| `nutcracker` | The Nutcracker | Christmas |
| `sugar-plum` | Sugar Plum Fairy | Christmas |
| `krampus` | Krampus | Christmas |
| `father-time` | Father Time | Christmas |
| `baby-new-year` | Baby New Year | Christmas |
| `polar-bear` | Polar Bear Pete | Christmas |
| `maccabee` | Judah Maccabee | Hanukkah |
| `shamash` | The Shamash | Hanukkah |
| `umoja` | Umoja (Unity) | Kwanzaa |
| `kuumba` | Kuumba (Creativity) | Kwanzaa |
| `solstice` | Winter Solstice | Winter |

### Theme CSS Variables
Each theme defines:
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--accent`, `--accent-foreground`
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--muted`, `--muted-foreground`

## Screenshot & Collage Pipeline

### 1. Capture Screenshots
```bash
npm run capture <app-number> "<AppName>" "<AuthorName>"
```

**Example:**
```bash
npm run capture 2 "SleighShare" "Jamie"
```

**What it does:**
- Launches headless Chromium via Playwright
- Navigates to `/app{N}/`, `/app{N}/screen-1`, `/app{N}/screen-2`
- Screenshots the `.phone-frame` element (or viewport fallback)
- Saves to `./captures/app{N}-{timestamp}/`
- Creates `metadata.json` with app info

**Output structure:**
```
captures/app2-2025-12-02T10-30-00-000Z/
├── splash.png
├── screen-1.png
├── screen-2.png
└── metadata.json
```

### 2. Generate Collage
```bash
npm run collage <captures-folder> <layout>
```

**Example:**
```bash
npm run collage ./captures/app2-2025-12-02T10-30-00-000Z C
```

**Layout Options:**
| Layout | Description | Best For |
|--------|-------------|----------|
| `A` | Vertical strip (3 stacked) | Apps with distinct screen types |
| `B` | 2x2 grid with info panel | Balanced, equal-weight screens |
| `C` | Hero feature (large splash + small others) | Splash screen is the star |
| `D` | Phone lineup (3 side by side) | Clean, professional presentation |

**Output:** `./collages/{app-name}-{layout}-{timestamp}.png`

### Prerequisites
Playwright browsers must be installed:
```bash
npx playwright install chromium
```

## App Slot Structure

Each generated app lives in `/app/appN/` with this structure:

```
app/app1/
├── layout.tsx         # Theme wrapper with AppShell
├── page.tsx           # Splash screen
├── screen-1/
│   └── page.tsx       # Second screen
└── screen-2/
    └── page.tsx       # Third screen
```

### Layout Pattern
```tsx
// app/appN/layout.tsx
import { AppShell } from "@/components/booth/app-shell"

export const appConfig = {
  name: "AppName",
  tagline: "App tagline",
  author: "GuestName",
  theme: "scrooge" as const,  // Theme ID
  appType: "finance" as const,
}

export default function AppLayout({ children }) {
  return (
    <div data-theme={appConfig.theme} className="...">
      <AppShell>{children}</AppShell>
    </div>
  )
}
```

## Booth Components

### `<AppShell>`
Phone frame wrapper with status bar (time, wifi, battery icons).
```tsx
<AppShell showStatusBar={true}>
  {children}
</AppShell>
```

### `<SplashHero>`
Full-screen hero for splash screens.
```tsx
<SplashHero
  title="App Name"
  tagline="Your tagline here"
  ctaText="Get Started"
  icon={<IconComponent />}
  backgroundPattern="gradient" // "gradient" | "snow" | "stars" | "none"
>
  {/* Optional children */}
</SplashHero>
```

### Other Components
- `<NavBar>` - Bottom navigation bar
- `<ListItem>`, `<ListGroup>` - List-based screens
- `<StatsCard>`, `<ProgressRing>` - Dashboard/fitness apps
- `<Avatar>`, `<Badge>` - Profile elements
- `<MapPlaceholder>` - Fake map for ride-share apps
- `<ProfileCard>`, `<CardStack>` - Dating app style
- `<BottomSheet>` - Slide-up panel

## Registry System

Character and app type metadata is defined in `lib/registry.ts`:

```typescript
import { CHARACTER_DATA, APP_TYPE_DATA, type ThemeName, type AppType } from "@/lib/registry"

// Get character info
const santa = CHARACTER_DATA["santa"]
// { name: "Santa Claus", holiday: "christmas", vibe: "Jolly & Generous", emoji: "🎅" }

// Get app type info
const rideShare = APP_TYPE_DATA["ride-share"]
// { name: "Ride Share", screens: [...], pattern: "Map-centric, bottom sheet" }
```

## Event Workflow

1. **Guest picks** character card + app type card
2. **Operator** opens Claude with `CLAUDE_PROMPT.md` system prompt
3. **Guest writes** one-shot prompt describing their app idea
4. **Claude generates** code in `/app/appN/` directory
5. **Operator runs** `npm run capture N "AppName" "AuthorName"`
6. **Guest picks** collage layout (A/B/C/D)
7. **Operator runs** `npm run collage ./captures/appN-... <layout>`
8. **Upload** collage to Miro or share with guest

## Common Tasks

### Add a New Theme
1. Add CSS variables to `app/globals.css` under `[data-theme="new-theme"]`
2. Add entry to `CHARACTER_DATA` in `lib/registry.ts`
3. Theme preview auto-generates at `/preview/new-theme`

### Create a New App Slot
1. Copy `app/app1/` to `app/appN/`
2. Update `layout.tsx` with new `appConfig`
3. Modify screen pages as needed

### Test Theme Preview
Visit `http://localhost:3000/preview/{theme-id}` (e.g., `/preview/santa`)

### Debug Screenshot Issues
- Ensure dev server is running on port 3000
- Check Playwright is installed: `npx playwright install chromium`
- Look for `.phone-frame` class on app pages
- Check `captures/` directory for output

## Files to Know

| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage with operator instructions |
| `app/globals.css` | All 17 theme definitions |
| `lib/registry.ts` | Character & app type metadata |
| `components/booth/app-shell.tsx` | Phone frame wrapper |
| `components/booth/splash-hero.tsx` | Splash screen component |
| `scripts/capture.ts` | Screenshot automation |
| `scripts/collage.ts` | Image compositing |
| `CLAUDE_PROMPT.md` | System prompt for app generation |
| `.claude/PLANNING.md` | Detailed project plan & status |
