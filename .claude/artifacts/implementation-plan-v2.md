# Implementation Plan: Photo Booth Polish & Guest Experience

**Date**: December 2, 2025
**Status**: Ready for Implementation
**Approach**: Option B - Full Dynamic System

---

## Overview

This plan adds three major features to transform the photo booth from an operator-focused tool into a guest-friendly experience:

1. **Prompt Builder Form** - Guest-facing form to construct their app idea
2. **Dynamic App Gallery** - Auto-discovers and displays created apps with screenshots
3. **Improved Navigation** - Separates guest and operator views

---

## Architecture Decisions

### Why Option B (Full Dynamic)?

- **Real-time updates**: Gallery refreshes automatically as apps are created
- **No manual updates**: Operators don't need to edit code to add apps
- **Better event flow**: Screenshots appear in gallery immediately after capture
- **Metadata-driven**: Uses existing `metadata.json` from capture script

### Technical Stack Additions

- **API Routes**: Next.js Route Handlers for server-side file system access
- **Server Components**: For gallery data fetching
- **Client Components**: For interactive prompt builder form

---

## Task Breakdown

### Phase 1: API Infrastructure

#### Task 1.1: Create Captures API Route

**File**: `/app/api/captures/route.ts`

**Purpose**: Returns list of all captured apps with metadata

**Implementation**:
```typescript
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  const capturesDir = path.join(process.cwd(), 'captures')

  try {
    const folders = await fs.readdir(capturesDir)
    const apps = await Promise.all(
      folders
        .filter(f => f.startsWith('app'))
        .map(async (folder) => {
          const metadataPath = path.join(capturesDir, folder, 'metadata.json')
          try {
            const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf-8'))
            return {
              folder,
              ...metadata,
              screenshots: {
                splash: `/api/captures/${folder}/splash.png`,
                screen1: `/api/captures/${folder}/screen-1.png`,
                screen2: `/api/captures/${folder}/screen-2.png`,
              }
            }
          } catch {
            return null
          }
        })
    )

    return NextResponse.json(apps.filter(Boolean))
  } catch {
    return NextResponse.json([])
  }
}
```

**Acceptance Criteria**:
- [ ] Returns JSON array of app objects
- [ ] Each object includes: folder, appName, author, theme, appType, timestamp
- [ ] Each object includes screenshot URLs
- [ ] Returns empty array if no captures exist
- [ ] Handles missing metadata.json gracefully

---

#### Task 1.2: Create Screenshot Serving Route

**File**: `/app/api/captures/[folder]/[image]/route.ts`

**Purpose**: Serves screenshot images from captures directory

**Implementation**:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ folder: string; image: string }> }
) {
  const { folder, image } = await params
  const imagePath = path.join(process.cwd(), 'captures', folder, image)

  try {
    const imageBuffer = await fs.readFile(imagePath)
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch {
    return new NextResponse('Image not found', { status: 404 })
  }
}
```

**Acceptance Criteria**:
- [ ] Serves PNG images with correct content type
- [ ] Returns 404 for missing images
- [ ] Includes cache headers for performance
- [ ] Validates folder/image params to prevent path traversal

---

### Phase 2: Prompt Builder Component

#### Task 2.1: Create PromptBuilder Client Component

**File**: `/components/booth/prompt-builder.tsx`

**Purpose**: Interactive form for guests to build their app prompt

**Props Interface**:
```typescript
interface PromptBuilderProps {
  characters: Array<{ id: string; name: string; emoji: string; vibe: string }>
  appTypes: Array<{ id: string; name: string; pattern: string }>
}
```

**Form Fields**:
1. **App Name** (text input)
   - Placeholder: "e.g., FrostyFitness, SantaSnacks"
   - Required field

2. **Your Name** (text input)
   - Placeholder: "Your name for the credits"
   - Required field

3. **Character** (select dropdown)
   - Options from CHARACTER_DATA
   - Shows emoji + name + vibe

4. **App Type** (select dropdown)
   - Options from APP_TYPE_DATA
   - Shows name + pattern hint

5. **Feature 1** (text input)
   - Placeholder: "Describe a unique feature..."
   - Required field

6. **Feature 2** (text input)
   - Placeholder: "Another cool feature..."
   - Optional field

7. **Feature 3** (text input)
   - Placeholder: "One more idea..."
   - Optional field

**Generated Prompt Format**:
```
Create an app called "{appName}" by {authorName}.

Character: {characterName} ({characterVibe})
App Type: {appTypeName}

This app should have these unique features:
1. {feature1}
2. {feature2}
3. {feature3}

Generate the splash screen and 2 interior screens that showcase these features.
Use the {characterId} theme.
```

**UI Requirements**:
- Copy button that copies the full prompt to clipboard
- Visual feedback when copied (toast or button state change)
- Live preview of the generated prompt
- Clear/reset button
- Mobile-friendly layout

**Acceptance Criteria**:
- [ ] All form fields validate correctly
- [ ] Generated prompt includes all filled fields
- [ ] Copy to clipboard works across browsers
- [ ] Shows success feedback after copy
- [ ] Form is responsive on mobile
- [ ] Optional fields (feature 2, 3) are excluded if empty

---

#### Task 2.2: Add Prompt Builder to Home Page

**File**: `/app/page.tsx` (modify)

**Changes**:
1. Import the PromptBuilder component
2. Add new section titled "Create Your App"
3. Position prominently at top of page (after header)
4. Pass character and app type data as props

**Section Layout**:
```
┌─────────────────────────────────────────┐
│  ✨ Create Your App                     │
│                                         │
│  [PromptBuilder Component]              │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Generated Prompt Preview        │   │
│  │ ─────────────────────────────── │   │
│  │ Create an app called...         │   │
│  │                                 │   │
│  │ [Copy to Clipboard] [Reset]     │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] Prompt builder is visible immediately on page load
- [ ] Responsive grid layout for form fields
- [ ] Generated prompt preview updates in real-time
- [ ] Matches existing page styling

---

### Phase 3: App Gallery Component

#### Task 3.1: Create AppGallery Server Component

**File**: `/components/booth/app-gallery.tsx`

**Purpose**: Displays grid of created apps with screenshots

**Data Fetching**:
```typescript
async function getCaptures() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/captures`, {
    cache: 'no-store' // Always fresh data
  })
  return res.json()
}
```

**Gallery Item Display**:
Each app card shows:
- App name (from metadata)
- Author name
- Character theme badge (with emoji)
- App type badge
- 3 screenshot thumbnails in a row
- "View App" link to `/app{N}`
- Timestamp (relative, e.g., "5 min ago")

**Empty State**:
- Show friendly message: "No apps created yet!"
- Show example app link

**Card Layout**:
```
┌─────────────────────────────────────────┐
│  PennyPincher                    5m ago │
│  by Jamie                               │
│  ┌────────┐ ┌────────┐ ┌────────┐      │
│  │ splash │ │screen-1│ │screen-2│      │
│  └────────┘ └────────┘ └────────┘      │
│                                         │
│  🤑 Scrooge  •  Finance                 │
│                                         │
│  [View App →]                           │
└─────────────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] Fetches data from API on render
- [ ] Displays all captured apps in grid
- [ ] Shows screenshot thumbnails
- [ ] Links to live app pages
- [ ] Shows appropriate empty state
- [ ] Handles loading state
- [ ] Handles error state

---

#### Task 3.2: Create AppScreenshot Component

**File**: `/components/booth/app-screenshot.tsx`

**Purpose**: Displays a screenshot thumbnail with lazy loading

**Props**:
```typescript
interface AppScreenshotProps {
  src: string
  alt: string
  label?: string // "Splash", "Screen 1", "Screen 2"
}
```

**Features**:
- Lazy loading with blur placeholder
- Aspect ratio maintained (9:19.5 for phone screens)
- Click to view full size (modal or new tab)
- Loading skeleton while image loads

**Acceptance Criteria**:
- [ ] Images lazy load on scroll
- [ ] Maintains phone aspect ratio
- [ ] Shows loading skeleton
- [ ] Handles broken image gracefully
- [ ] Click opens larger view

---

#### Task 3.3: Integrate Gallery into Home Page

**File**: `/app/page.tsx` (modify)

**Changes**:
1. Replace static "Created Apps" section with AppGallery
2. Add refresh button to manually refresh gallery
3. Position after Prompt Builder section

**Acceptance Criteria**:
- [ ] Gallery displays below prompt builder
- [ ] Shows all captured apps dynamically
- [ ] Updates when page is refreshed
- [ ] Maintains responsive layout

---

### Phase 4: Navigation & Layout Improvements

#### Task 4.1: Create View Toggle Component

**File**: `/components/booth/view-toggle.tsx`

**Purpose**: Toggle between Guest View and Operator View

**Implementation**:
- Client component with useState
- Two buttons/tabs: "Guest" and "Operator"
- Controls visibility of sections on home page

**Guest View Shows**:
- Header
- Prompt Builder
- App Gallery
- Character/App Type reference cards (collapsible)

**Operator View Shows**:
- Everything in Guest View
- Operator Instructions section
- Theme Preview links
- CLI command reference

**Acceptance Criteria**:
- [ ] Smooth toggle between views
- [ ] Persists preference in localStorage
- [ ] Defaults to Guest view
- [ ] Clear visual indicator of current view

---

#### Task 4.2: Make Operator Instructions Collapsible

**File**: `/app/page.tsx` (modify)

**Changes**:
- Wrap operator instructions in collapsible component
- Default collapsed in Guest view
- Default expanded in Operator view
- Add expand/collapse icon and animation

**Acceptance Criteria**:
- [ ] Instructions can be collapsed/expanded
- [ ] State persists with view toggle
- [ ] Smooth animation on toggle
- [ ] Accessible keyboard navigation

---

#### Task 4.3: Add App Quick Links Navigation

**File**: `/components/booth/app-nav.tsx`

**Purpose**: Quick navigation to created apps

**Features**:
- Horizontal scrollable list of app pills/chips
- Each chip: App name + character emoji
- Links to `/app{N}`
- "Example" link always visible
- Sticky positioned at top of page

**Layout**:
```
┌──────────────────────────────────────────────────────────────┐
│  Apps: [🦌 SleighShare] [🤑 PennyPincher] [❄️ FrostyFitness] │
└──────────────────────────────────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] Shows all created apps
- [ ] Horizontally scrollable on mobile
- [ ] Sticky at top when scrolling
- [ ] Updates dynamically with new apps

---

### Phase 5: Polish & UX Improvements

#### Task 5.1: Add Toast Notifications

**File**: `/components/ui/toast.tsx`

**Purpose**: Feedback for copy actions and other events

**Usage**:
- "Prompt copied to clipboard!"
- "App gallery refreshed"
- Error messages

**Acceptance Criteria**:
- [ ] Toast appears in corner of screen
- [ ] Auto-dismisses after 3 seconds
- [ ] Can be manually dismissed
- [ ] Accessible (aria-live region)

---

#### Task 5.2: Add Loading States

**Files**: Multiple components

**Requirements**:
- Skeleton loaders for gallery images
- Loading spinner for API fetches
- Disabled state for buttons during actions

**Acceptance Criteria**:
- [ ] All async operations show loading state
- [ ] Skeletons match final content layout
- [ ] No layout shift when content loads

---

#### Task 5.3: Mobile Responsiveness Audit

**Files**: All new components

**Requirements**:
- Test all components at 375px, 768px, 1024px, 1440px
- Prompt builder stacks vertically on mobile
- Gallery uses 1-2-3 column grid based on width
- Touch-friendly tap targets (min 44px)

**Acceptance Criteria**:
- [ ] No horizontal scroll on mobile
- [ ] All buttons easily tappable
- [ ] Text readable without zooming
- [ ] Forms usable on mobile keyboard

---

## File Summary

### New Files to Create

| File | Type | Purpose |
|------|------|---------|
| `/app/api/captures/route.ts` | API Route | List all captures |
| `/app/api/captures/[folder]/[image]/route.ts` | API Route | Serve screenshots |
| `/components/booth/prompt-builder.tsx` | Client Component | Form for guests |
| `/components/booth/app-gallery.tsx` | Server Component | Display captured apps |
| `/components/booth/app-screenshot.tsx` | Component | Screenshot thumbnail |
| `/components/booth/view-toggle.tsx` | Client Component | Guest/Operator toggle |
| `/components/booth/app-nav.tsx` | Component | Quick app navigation |
| `/components/ui/toast.tsx` | Component | Notification toasts |

### Files to Modify

| File | Changes |
|------|---------|
| `/app/page.tsx` | Add PromptBuilder, AppGallery, ViewToggle, reorganize layout |
| `/lib/registry.ts` | Possibly add helper functions for data access |

---

## Environment Variables

Add to `.env.local`:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production, update to actual URL.

---

## Testing Checklist

### API Routes
- [ ] `/api/captures` returns correct JSON structure
- [ ] `/api/captures` handles empty captures directory
- [ ] `/api/captures/[folder]/[image]` serves images correctly
- [ ] `/api/captures/[folder]/[image]` returns 404 for missing images
- [ ] Path traversal attacks are blocked

### Prompt Builder
- [ ] All form fields accept input
- [ ] Validation prevents empty required fields
- [ ] Generated prompt is correctly formatted
- [ ] Copy to clipboard works in Chrome, Firefox, Safari
- [ ] Reset button clears all fields
- [ ] Form is keyboard navigable

### App Gallery
- [ ] Gallery loads on page visit
- [ ] Shows correct number of apps
- [ ] Screenshot thumbnails load correctly
- [ ] Links to apps work
- [ ] Empty state displays correctly
- [ ] Error state displays correctly

### Navigation
- [ ] View toggle switches content visibility
- [ ] Operator instructions collapse/expand
- [ ] App nav shows all created apps
- [ ] All links navigate correctly

### Mobile
- [ ] All features work on iPhone SE (375px)
- [ ] All features work on iPad (768px)
- [ ] Touch targets are 44px minimum
- [ ] No horizontal scrolling issues

---

## Implementation Order

**Recommended sequence for implementation:**

1. **Phase 1**: API routes (foundation for gallery)
2. **Phase 3.1-3.2**: Gallery components (depends on API)
3. **Phase 2**: Prompt builder (independent, can parallel)
4. **Phase 4.1**: View toggle (controls layout)
5. **Phase 4.2-4.3**: Navigation improvements
6. **Phase 5**: Polish and UX
7. **Phase 3.3 + Page Integration**: Final assembly

---

## Notes for Implementing Agent

### Key Files to Reference

Before starting, read these files to understand existing patterns:

1. `/app/page.tsx` - Current home page structure
2. `/lib/registry.ts` - Character and app type data
3. `/components/booth/splash-hero.tsx` - Example booth component
4. `/components/ui/button.tsx` - Button component patterns
5. `/captures/app1-*/metadata.json` - Metadata structure
6. `/.claude/CLAUDE_PROMPT.md` - Prompt format to match

### Styling Guidelines

- Use Tailwind CSS classes exclusively
- Follow existing color patterns (neutral-*, green-50, blue-50, etc.)
- Use `rounded-2xl` for cards, `rounded-xl` for buttons
- Use `shadow-sm` for card elevation
- Font weights: `font-bold` for headings, `font-medium` for emphasis

### Component Patterns

- Use `"use client"` directive for interactive components
- Export named components (not default) for utilities
- Include TypeScript interfaces for all props
- Handle loading and error states in async components

### Testing During Development

After each phase, run:
```bash
npm run dev
# Visit http://localhost:3000
# Test the new features manually
```

After all phases:
```bash
npm run build
# Verify no build errors
```

---

## Success Criteria

The implementation is complete when:

1. A guest can fill out the prompt builder form and copy a formatted prompt
2. The gallery automatically shows all captured apps with screenshots
3. Operators can toggle to see additional instructions
4. The page is fully responsive on mobile devices
5. All navigation works correctly
6. The build passes without errors

---

## Appendix: Metadata.json Structure

Reference for API implementation:

```json
{
  "appNumber": 1,
  "appName": "PennyPincher",
  "author": "Demo",
  "theme": "scrooge",
  "appType": "finance",
  "timestamp": "2025-12-02T22:11:15.439Z",
  "screens": ["splash", "screen-1", "screen-2"]
}
```

---

*End of Implementation Plan*
