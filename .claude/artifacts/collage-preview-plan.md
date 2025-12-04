# Collage Preview Feature - Implementation Plan

## Overview

Add an in-app collage preview and generation feature that allows users to:
1. Preview their captured app screenshots in different collage layouts
2. Select their preferred layout (A/B/C/D)
3. Generate and download the final collage PNG

This eliminates the need to run CLI commands for collage generation.

---

## Current State

### What Exists
- `scripts/capture.ts` - Playwright-based screenshot capture (Firefox)
- `scripts/collage.ts` - Sharp-based collage generation (CLI)
- `/api/captures` - Lists all captured apps with metadata
- `/api/captures/[folder]/[image]` - Serves screenshot PNGs
- `AppGallery` component on home page shows captured apps

### What's Missing
- No web UI for collage preview
- No API for collage generation (only CLI)
- No way to select layout without terminal access

---

## Proposed Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Home Page (existing)                      │
│                         AppGallery                           │
│                            │                                 │
│                   "Create Collage" button                    │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│              /collage/[folder]/page.tsx (NEW)               │
│  ┌─────────────────────┐  ┌───────────────────────────────┐ │
│  │   Layout Selector   │  │      Canvas Preview           │ │
│  │   ○ A - Vertical    │  │   ┌─────────────────────┐     │ │
│  │   ● B - Grid        │  │   │                     │     │ │
│  │   ○ C - Hero        │  │   │   Live Collage      │     │ │
│  │   ○ D - Lineup      │  │   │   Preview           │     │ │
│  └─────────────────────┘  │   │                     │     │ │
│                           │   └─────────────────────┘     │ │
│  ┌─────────────────────┐  └───────────────────────────────┘ │
│  │  [Download Collage] │                                    │
│  └─────────────────────┘                                    │
└────────────────────────────┬────────────────────────────────┘
                             │ POST /api/collages
                             ▼
┌─────────────────────────────────────────────────────────────┐
│              /api/collages/route.ts (NEW)                   │
│                                                             │
│  - Receives: { folder, layout }                             │
│  - Uses Sharp (like scripts/collage.ts)                     │
│  - Returns: PNG buffer or file path                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Steps

### Phase 1: Shared Layout Definitions

**Step 1.1: Create layout configuration file**
- [ ] Create `/lib/collage-layouts.ts`
- [ ] Extract layout dimensions from `scripts/collage.ts`
- [ ] Define TypeScript types for layouts
- [ ] Export layout configs for both client preview and server generation

```typescript
// Layout structure
interface CollageLayout {
  id: 'A' | 'B' | 'C' | 'D'
  name: string
  description: string
  dimensions: { width: number; height: number }
  positions: {
    splash: { x: number; y: number; width: number; height: number }
    screen1: { x: number; y: number; width: number; height: number }
    screen2: { x: number; y: number; width: number; height: number }
    info?: { x: number; y: number; width: number; height: number }
  }
}
```

---

### Phase 2: Collage Preview Component (Client-Side)

**Step 2.1: Create CollagePreview component**
- [ ] Create `/components/booth/collage-preview.tsx`
- [ ] Use HTML Canvas API for rendering
- [ ] Load images from `/api/captures/[folder]/[image]`
- [ ] Render based on selected layout
- [ ] Add app name/author overlay text

**Step 2.2: Create LayoutSelector component**
- [ ] Create `/components/booth/layout-selector.tsx`
- [ ] Radio button group for A/B/C/D
- [ ] Show layout name and description
- [ ] Visual thumbnail for each layout option

---

### Phase 3: Collage Builder Page

**Step 3.1: Create the collage builder page**
- [ ] Create `/app/collage/[folder]/page.tsx`
- [ ] Fetch app metadata from `/api/captures`
- [ ] Display CollagePreview and LayoutSelector
- [ ] Handle layout selection state
- [ ] Add "Download Collage" button

**Step 3.2: Add loading and error states**
- [ ] Loading skeleton while images load
- [ ] Error handling for missing captures
- [ ] Redirect if folder doesn't exist

---

### Phase 4: Collage Generation API

**Step 4.1: Create collage generation endpoint**
- [ ] Create `/app/api/collages/route.ts`
- [ ] POST handler accepts `{ folder: string, layout: 'A'|'B'|'C'|'D' }`
- [ ] Reuse Sharp logic from `scripts/collage.ts`
- [ ] Return PNG as response with appropriate headers

**Step 4.2: Refactor collage generation logic**
- [ ] Extract core collage logic from `scripts/collage.ts` to `/lib/collage-generator.ts`
- [ ] Make it work both for CLI and API usage
- [ ] Share layout definitions from Phase 1

---

### Phase 5: Integration with Existing UI

**Step 5.1: Add "Create Collage" button to AppGallery**
- [ ] Update `/components/booth/app-gallery.tsx`
- [ ] Add button/link next to "View App →"
- [ ] Link to `/collage/[folder]`

**Step 5.2: Add navigation from app pages**
- [ ] Add "Create Collage" option in ScreenNav or app layout
- [ ] Only show if captures exist for the current app

**Step 5.3: Update home page with collage access**
- [ ] Consider adding recent collages section
- [ ] Or link to collage builder from captured apps

---

### Phase 6: Polish and UX

**Step 6.1: Download experience**
- [ ] Proper filename: `{appName}-{layout}-collage.png`
- [ ] Loading state while generating
- [ ] Success feedback after download

**Step 6.2: Preview enhancements**
- [ ] Smooth transitions between layouts
- [ ] Zoom/pan for large previews
- [ ] Mobile-responsive layout

**Step 6.3: Error handling**
- [ ] Handle missing screenshots gracefully
- [ ] Validate folder exists before showing page
- [ ] API error responses with helpful messages

---

## File Changes Summary

### New Files
| File | Purpose |
|------|---------|
| `/lib/collage-layouts.ts` | Shared layout configurations |
| `/lib/collage-generator.ts` | Shared Sharp collage logic |
| `/components/booth/collage-preview.tsx` | Canvas-based preview component |
| `/components/booth/layout-selector.tsx` | Layout picker UI |
| `/app/collage/[folder]/page.tsx` | Collage builder page |
| `/app/api/collages/route.ts` | POST endpoint for generation |

### Modified Files
| File | Changes |
|------|---------|
| `/components/booth/app-gallery.tsx` | Add "Create Collage" button |
| `/scripts/collage.ts` | Refactor to use shared logic |

---

## Technical Considerations

### Canvas Preview vs Final Output
- **Preview**: HTML Canvas API (client-side, instant feedback)
- **Final**: Sharp (server-side, high quality, matches existing output)
- Layouts must be defined once and work for both

### Image Loading
- Images load from existing `/api/captures/[folder]/[image]` endpoint
- Need to handle CORS (same-origin, should be fine on localhost)
- Canvas `drawImage()` requires images to be fully loaded

### Performance
- Preview renders on layout change (debounce if needed)
- Final generation is server-side (no client CPU impact)
- Consider caching generated collages

### Mobile Considerations
- Collage preview should be responsive
- Download should work on mobile browsers
- Touch-friendly layout selector

---

## Dependencies

### Existing (No Changes)
- Sharp ^0.33.5 (server-side image processing)
- Next.js 16 (API routes, App Router)

### New Dependencies
- None required (Canvas API is browser-native)

---

## Testing Plan

1. **Unit Tests**
   - Layout configuration validity
   - Collage generator with mock images

2. **Integration Tests**
   - API endpoint returns valid PNG
   - Preview renders all layouts correctly

3. **Manual Testing**
   - Test all 4 layouts with real captures
   - Test download on multiple browsers
   - Test with missing screenshots

---

## Rollout Plan

1. Implement Phases 1-4 (core functionality)
2. Test with existing captures
3. Implement Phase 5 (integration)
4. Polish with Phase 6
5. Update documentation in CLAUDE.md

---

## Success Criteria

- [ ] User can preview collage without CLI
- [ ] All 4 layouts (A/B/C/D) work in preview
- [ ] Download produces identical output to CLI
- [ ] "Create Collage" accessible from home page gallery
- [ ] Works on localhost without external dependencies

---

## Open Questions

1. Should we save generated collages to disk (like CLI) or just stream to download?
   - Just downloading the images is fine
2. Do we want to show previously generated collages?
   - Once a collage is downloaded you don't need to show them in the UI anymore
3. Should the preview be exact pixel match or approximate?
   - As long as the preview is an accurate approximation, we want to be wary of things like word-wrap etc not impacting the resulting image
4. Add option to customize app name/author text on collage?
   - Yeah, I like the user being able to add/place a title/author on the images
