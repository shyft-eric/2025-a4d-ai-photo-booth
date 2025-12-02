# Initial Project Review - Vibe Coding Photo Booth

**Date**: December 2, 2024
**Reviewer**: Claude Code

---

## Executive Summary

The Vibe Coding Photo Booth is a well-structured Next.js application designed for holiday party events where guests create whimsical app concepts using AI-assisted coding. The foundation is solid (~80% complete according to planning docs), with the core architecture, theme system, and components in place.

---

## Application Status

### Dev Server: Working

The Next.js development server starts successfully on port 3000:
- Next.js 16.0.6 with Turbopack
- React 19.2.0
- Server ready in ~388ms

### Build Status: Not Tested Yet

Recommend running `npm run build` before the event to verify production build works.

---

## Project Structure Overview

```
/workspaces/2025-a4d-ai-photo-booth/
├── app/                    # Next.js App Router
│   ├── app1/               # Example app (PennyPincher - Scrooge theme)
│   ├── apps/example/       # Second example app
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home/control panel
│   └── globals.css         # Theme definitions (17 themes)
├── components/
│   ├── booth/              # Photo booth specific (AppShell, SplashHero, NavBar, etc.)
│   └── ui/                 # Base UI (Button, Card)
├── lib/
│   ├── registry.ts         # 17 characters + 12 app types
│   └── utils.ts            # Utilities and theme types
├── scripts/
│   ├── capture.ts          # Playwright screenshot capture
│   └── collage.ts          # Sharp image compositing (4 layouts)
└── public/assets/icons/    # EMPTY - needs holiday icons
```

---

## What's Complete

| Component | Status | Notes |
|-----------|--------|-------|
| Next.js 16 + React 19 setup | Complete | Builds and runs |
| Tailwind CSS 4 | Complete | PostCSS configured |
| Theme System | Complete | 17 themes via CSS variables |
| Character Registry | Complete | 17 characters across holidays |
| App Type Registry | Complete | 12 app types defined |
| AppShell Component | Complete | Phone frame (390x844 iPhone 14 Pro) |
| SplashHero Component | Complete | 4 background patterns |
| NavBar Component | Complete | Bottom navigation |
| Data Display Components | Complete | Avatar, Badge, StatsCard, ProgressRing |
| Interactive Components | Complete | MapPlaceholder, ProfileCard, CardStack, BottomSheet |
| Capture Script | Complete | Playwright-based, needs testing |
| Collage Script | Complete | Sharp-based, 4 layouts |
| CLAUDE_PROMPT.md | Complete | Full agent instructions |
| Example App (app1) | Complete | PennyPincher/Scrooge |

---

## What's Missing / Needs Work

### High Priority

1. **End-to-End Pipeline Testing**
   - Capture → Collage workflow not verified
   - Need to test all 4 collage layouts

2. **Gallery Page** (`/gallery`)
   - No end-of-event view exists
   - Should display all created apps

3. **App Slots Pre-creation**
   - Only `app1` exists
   - Need `app2` through `app15` for event

### Medium Priority

4. **Holiday Assets**
   - `/public/assets/icons/` is empty
   - Lucide icons work but specific holiday icons missing

5. **Claude Prompt Testing**
   - Prompt written but not tested with actual Claude
   - Should test 2-3 sample app generations

### Low Priority

6. **Physical Event Prep**
   - Character cards for guests
   - App type cards
   - Instruction sheets

---

## Playwright MCP Server Setup

### Requirements Installed

Firefox browser for Playwright has been successfully installed:
- Firefox 144.0.2 (playwright build v1497)
- System dependencies installed via `npx playwright install-deps firefox`

### MCP Server Configuration

To use Playwright MCP with Firefox, add to your MCP client configuration:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--browser",
        "firefox",
        "--headless"
      ]
    }
  }
}
```

**Important Options:**
- `--browser firefox` - Use Firefox (required for Mac compatibility)
- `--headless` - Run without visible browser window
- `--viewport-size 390x844` - iPhone 14 Pro dimensions for consistency

### Testing the MCP Server

Run manually to verify:
```bash
npx @playwright/mcp --browser firefox --headless
```

---

## DevContainer Configuration

### Updated Files

1. **`.devcontainer/setup.sh`** - New setup script that:
   - Installs Claude Code globally
   - Installs project dependencies
   - Installs Playwright system dependencies for Firefox
   - Installs Firefox browser
   - Installs Playwright MCP server

2. **`.devcontainer/devcontainer.json`** - Updated to:
   - Run `setup.sh` as post-create command
   - Forward port 3000 for Next.js
   - Name changed to "Vibe Coding Photo Booth"

### Rebuilding the Container

After these changes, rebuild the devcontainer:
```bash
# In VS Code: Ctrl+Shift+P -> "Dev Containers: Rebuild Container"
```

---

## Capture Script Analysis

The existing `scripts/capture.ts` uses **Chromium** by default. For Mac compatibility, update to use Firefox:

**Current (line ~20-30):**
```typescript
const browser = await chromium.launch({ headless: true });
```

**Should be:**
```typescript
import { firefox } from 'playwright';
const browser = await firefox.launch({ headless: true });
```

This is a recommended change for Phase 5.6 testing.

---

## Recommendations for Next Steps

### Immediate Actions

1. **Test the capture pipeline** with Firefox:
   ```bash
   npm run dev &
   npm run capture 1 "PennyPincher" "Demo"
   npm run collage ./captures/app1-... A
   ```

2. **Update capture.ts** to use Firefox instead of Chromium

3. **Create a simple gallery page** at `/app/gallery/page.tsx`

### Before the Event

1. Run full dry run with character selection → prompt → generate → capture → collage

2. Pre-create empty app slots (`/app/app2` through `/app/app15`)

3. Test all 17 themes render correctly

4. Prepare backup example apps

---

## Technical Notes

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.0.6 | React framework |
| react | 19.2.0 | UI library |
| playwright | ^1.49.0 | Browser automation |
| sharp | ^0.33.5 | Image processing |
| lucide-react | ^0.555.0 | Icons |
| tailwindcss | ^4 | Styling |

### NPM Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| dev | `next dev` | Start dev server |
| capture | `npx tsx scripts/capture.ts` | Screenshot capture |
| collage | `npx tsx scripts/collage.ts` | Generate collage |
| booth | `npm run dev` | Alias for dev |

---

## Files Changed in This Review

1. Created: `.devcontainer/setup.sh`
2. Updated: `.devcontainer/devcontainer.json`
3. Created: `.claude/artifacts/inital-review.md` (this file)

---

## Sources

- [Playwright MCP GitHub](https://github.com/microsoft/playwright-mcp)
- [Playwright MCP NPM](https://www.npmjs.com/package/@playwright/mcp)
- [Simon Willison's TIL on Playwright MCP with Claude Code](https://til.simonwillison.net/claude-code/playwright-mcp-claude-code)
