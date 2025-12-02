# 🎄 Vibe Coding Photo Booth - Project Plan

> A holiday tech meetup activity where guests create whimsical app concepts in 2-3 minutes using AI-assisted coding.

---

## 🔍 PROJECT AUDIT (December 2, 2024)

> **Status: ~80% Complete** — Foundation is solid, needs asset collection and testing

### ✅ COMPLETE & VERIFIED

| Item | Status | Notes |
|------|--------|-------|
| **Next.js 14 Project** | ✅ Done | Builds successfully, TypeScript, App Router |
| **Tailwind CSS 4** | ✅ Done | Configured with PostCSS |
| **Dependencies** | ✅ Done | Lucide, Radix, CVA, Sharp, Playwright, tsx |
| **Theme System** | ✅ Done | 17 themes in globals.css with CSS variables |
| **CLAUDE_PROMPT.md** | ✅ Done | Complete agent instructions |
| **Registry (lib/registry.ts)** | ✅ Done | 17 characters + 12 app types defined |
| **Homepage** | ✅ Done | Control panel with character/app displays |

### ✅ COMPONENTS COMPLETE

| Component | File | Props/Features |
|-----------|------|----------------|
| `AppShell` | booth/app-shell.tsx | Phone frame, status bar |
| `SplashHero` | booth/splash-hero.tsx | Title, tagline, CTA, background patterns |
| `NavBar` | booth/nav-bar.tsx | Bottom nav with icons/labels |
| `ListItem` | booth/list-item.tsx | Title, subtitle, leading/trailing slots |
| `ListGroup` | booth/list-item.tsx | Grouped list with title |
| `Avatar` | booth/data-display.tsx | Image or fallback, 4 sizes |
| `Badge` | booth/data-display.tsx | 5 variants, 2 sizes |
| `StatsCard` | booth/data-display.tsx | Value, label, trend indicator |
| `ProgressRing` | booth/data-display.tsx | SVG ring progress |
| `MapPlaceholder` | booth/interactive.tsx | Grid pattern, markers, route line |
| `ProfileCard` | booth/interactive.tsx | Dating-style card |
| `CardStack` | booth/interactive.tsx | Stacked card effect |
| `BottomSheet` | booth/interactive.tsx | Slide-up panel |
| `Button` | ui/button.tsx | 6 variants, 5 sizes |
| `Card` | ui/card.tsx | Header, Title, Description, Content, Footer |

### ✅ SCRIPTS COMPLETE

| Script | File | Status |
|--------|------|--------|
| `capture.ts` | scripts/capture.ts | ✅ Playwright screenshot capture |
| `collage.ts` | scripts/collage.ts | ✅ Sharp image compositing, 4 layouts |

### ✅ EXAMPLE APPS COMPLETE

| App | Location | Theme | Description |
|-----|----------|-------|-------------|
| `app1` | /app/app1/ | Scrooge | "PennyPincher" finance app |
| `example` | /app/apps/example/ | Unknown | Second example app |

### ⚠️ NEEDS WORK

| Item | Status | What's Missing |
|------|--------|----------------|
| **Holiday Assets** | ❌ Empty | `/public/assets/icons/` is empty |
| **Pre-created Slots** | ⚠️ Partial | Only app1 exists, need app2-app15 |
| **Gallery Page** | ❌ Missing | No `/gallery` route for end-of-event view |
| **npm Scripts** | ⚠️ Partial | capture/collage exist, may need tweaks |
| **End-to-End Test** | ❌ Not done | Full pipeline not verified |
| **Physical Cards** | ❌ Not done | Character & app type cards for guests |

---

## ✅ Confirmed Decisions

| Decision | Choice | Notes |
|----------|--------|-------|
| UI Framework | Next.js 14 + Tailwind + **shadcn/ui** | First time using shadcn |
| Holiday Scope | **Inclusive** | Christmas-heavy, plus Hanukkah & Kwanzaa |
| Expected Participation | 10-15 guests | From ~20-30 total attendees |
| Animations | **Static only** | For screenshot reliability |
| App Persistence | `/app1`, `/app2`, etc. | Live gallery view at end of event |
| Assets | Open source SVG packs | Lucide (bundled), SVG Repo, Reshot |
| Branding | Deferred | Can add meetup logo later |
| QR Codes | Deferred | Future enhancement if core works well |

---

## 📋 Task Breakdown

### Phase 1: Project Foundation ✅ COMPLETE
> Get the base Next.js + shadcn/ui project running

- [x] **1.1** Initialize Next.js 14 with TypeScript, Tailwind, App Router
- [x] **1.2** Install core dependencies (Radix, CVA, clsx, tailwind-merge)
- [x] **1.3** Add base UI components: Button, Card
- [x] **1.4** Verify dev server runs and builds successfully
- [x] **1.5** Set up folder structure

### Phase 2: Theme System ✅ COMPLETE
> Create the CSS variable-based theme system for all characters

- [x] **2.1** Define base CSS variables in `globals.css`
- [x] **2.2** Create Christmas character themes (9 characters)
- [x] **2.3** Create New Year themes (2 characters)
- [x] **2.4** Create Hanukkah themes (2 characters)
- [x] **2.5** Create Kwanzaa themes (2 characters)
- [x] **2.6** Create Winter themes (2 characters: polar-bear, solstice)
- [x] **2.7** Test theme switching via `data-theme` attribute
- [x] **2.8** Document theme usage in CLAUDE_PROMPT.md

### Phase 3: Component Library ✅ COMPLETE
> Build reusable booth components that Claude agents will combine

- [x] **3.1** `<AppShell>` - Phone frame wrapper
- [x] **3.2** `<SplashHero>` - Full-screen hero with title, tagline, CTA
- [x] **3.3** `<NavBar>` - Bottom navigation bar
- [x] **3.4** `<Card>` - shadcn-style card components
- [x] **3.5** `<ListItem>` & `<ListGroup>` - For list-based screens
- [x] **3.6** `<StatsCard>` - For dashboards/fitness apps
- [x] **3.7** `<ProgressRing>` - Circular progress indicator
- [x] **3.8** `<Avatar>` - Profile images with fallback
- [x] **3.9** `<Badge>` - Status indicators
- [x] **3.10** `<MapPlaceholder>` - Fake map for ride-share apps
- [x] **3.11** `<ProfileCard>` & `<CardStack>` - Dating app style
- [x] **3.12** `<BottomSheet>` - Slide-up panel
- [x] **3.13** Document all components in CLAUDE_PROMPT.md

### Phase 4: Asset Collection ⚠️ NEEDS WORK
> Gather copyright-free holiday icons and illustrations

- [x] **4.1** Audit Lucide icons (bundled, available immediately)
- [ ] **4.2** Download Christmas icons from SVG Repo (CC0 licensed)
- [ ] **4.3** Download Hanukkah icons (menorah, dreidel, Star of David)
- [ ] **4.4** Download Kwanzaa icons (kinara, unity cup)
- [ ] **4.5** Download general winter icons (snowman, mittens)
- [ ] **4.6** Organize in `/public/assets/icons/`
- [ ] **4.7** Create simple import system or document paths
- [ ] **4.8** Document available icons in CLAUDE_PROMPT.md

### Phase 5: Screenshot & Collage System ✅ SCRIPTS COMPLETE (needs testing)
> Automate capturing and assembling the "photo booth" output

- [x] **5.1** Install Playwright as dev dependency
- [x] **5.2** Create `capture.ts` script
- [x] **5.3** Install Sharp for image processing
- [x] **5.4** Create `collage.ts` script with 4 layouts
- [x] **5.5** Create npm scripts
- [ ] **5.6** Test full capture → collage pipeline end-to-end

### Phase 6: Claude Agent Prompt ✅ COMPLETE
> Create the instruction document that guides Claude during the event

- [x] **6.1** Write CLAUDE_PROMPT.md with all sections
- [ ] **6.2** Test prompt with Claude on 2-3 sample app concepts
- [ ] **6.3** Iterate based on generation quality/speed

### Phase 7: Gallery & Control Panel ⚠️ PARTIALLY COMPLETE
> Build the homepage and end-of-event gallery view

- [x] **7.1** Homepage (`/page.tsx`) with instructions and card displays
- [ ] **7.2** Gallery page (`/gallery/page.tsx`) for end-of-event
- [ ] **7.3** Pre-create empty app slots (`/app2` through `/app15`)

### Phase 8: Testing & Polish ❌ NOT STARTED
> Ensure everything works smoothly before the event

- [ ] **8.1** Full dry run: Pick character → prompt → generate → capture → collage
- [ ] **8.2** Test all 17 themes render correctly
- [ ] **8.3** Test all 4 collage layouts
- [ ] **8.4** Test gallery view with multiple apps
- [ ] **8.5** Time the full guest flow (target: 2-3 min)
- [ ] **8.6** Create 2-3 example apps as backup/demos
- [ ] **8.7** Document any edge cases or gotchas

### Phase 9: Event Prep ❌ NOT STARTED
> Physical and logistical preparation

- [ ] **9.1** Print character cards (laminated?)
- [ ] **9.2** Print app type cards
- [ ] **9.3** Print quick-reference instruction sheet
- [ ] **9.4** Set up Miro board with sections for collages
- [ ] **9.5** Test laptop + external monitor setup
- [ ] **9.6** Prepare "reset" workflow between guests

---

## 📊 REMAINING WORK SUMMARY

| Phase | Effort | Priority |
|-------|--------|----------|
| Phase 4: Assets | ~1 hour | Medium - Lucide works for now |
| Phase 5.6: Test pipeline | ~30 min | HIGH |
| Phase 6.2-6.3: Test prompt | ~1 hour | HIGH |
| Phase 7.2: Gallery | ~30 min | Medium |
| Phase 7.3: App slots | ~15 min | Low (can generate on-demand) |
| Phase 8: Testing | ~2 hours | HIGH |
| Phase 9: Event prep | ~1 hour | HIGH (day of event) |

**Estimated remaining work: ~6-7 hours**

---

## 🎅 Holiday Characters (16 total)

### Christmas (9)
| ID | Character | Vibe | Theme Colors |
|----|-----------|------|--------------|
| `santa` | Santa Claus | Jolly, generous, omniscient | Red, white, gold |
| `mrs-claus` | Mrs. Claus | Warm, organized, nurturing | Red, cream, warm brown |
| `scrooge` | Scrooge | Reformed miser, penny-wise | Forest green, gold, black |
| `rudolph` | Rudolph | Outcast hero, guidance | Red, silver, navy |
| `frosty` | Frosty | Carefree, temporary joy | Ice blue, white, orange |
| `jack-frost` | Jack Frost | Mischievous, artistic | Frost blue, silver, purple |
| `nutcracker` | Nutcracker | Protective, regal | Royal purple, gold, red |
| `sugar-plum` | Sugar Plum Fairy | Magical, dreamy | Pink, lavender, gold |
| `krampus` | Krampus | Anti-hero, tough love | Black, red, dark gray |

### New Year (2)
| ID | Character | Vibe | Theme Colors |
|----|-----------|------|--------------|
| `father-time` | Father Time | Wisdom, reflection | Midnight blue, silver, white |
| `baby-new-year` | Baby New Year | Fresh starts, optimism | White, gold, pastel blue |

### Hanukkah (2)
| ID | Character | Vibe | Theme Colors |
|----|-----------|------|--------------|
| `maccabee` | Maccabee | Heroic, resilient | Blue, silver, white |
| `shamash` | Shamash (Helper Candle) | Guiding light, service | Gold, blue, warm white |

### Kwanzaa (2)
| ID | Character | Vibe | Theme Colors |
|----|-----------|------|--------------|
| `umoja` | Umoja (Unity) | Community, togetherness | Red, black, green |
| `kuumba` | Kuumba (Creativity) | Artistic, expressive | Earth tones, vibrant accents |

### Winter (1)
| ID | Character | Vibe | Theme Colors |
|----|-----------|------|--------------|
| `polar-bear` | Polar Bear | Chill vibes, conservation | Arctic blue, white, green |

---

## 📱 App Types (12)

| App Type | Key Screens | UI Pattern |
|----------|-------------|------------|
| Ride Share | Map view, driver card, trip summary | Map-centric, bottom sheet |
| Food Delivery | Restaurant list, menu, cart | Cards, horizontal scroll |
| Dating/Swipe | Profile card, match screen | Card stack, swipe implied |
| Investment | Portfolio, chart, trade | Charts, numbers, indicators |
| Social Feed | Photo grid, story bar, post | Grid, stories row |
| Fitness | Today's stats, workout, achievement | Rings, large numbers |
| Music | Now playing, playlist, browse | Album art, playback bar |
| Productivity | Task list, calendar, completed | Checkboxes, clean |
| Weather | Current, hourly, weekly | Large icons, temps |
| E-commerce | Product grid, detail, cart | Product cards, CTAs |
| Meditation | Session picker, breathing, stats | Calm colors, centered |
| Recipe | Recipe card, ingredients, steps | Hero image, lists |

---

## 🖼️ Collage Layouts

### Layout A: Vertical Strip
```
┌─────────────┐
│   SPLASH    │
├─────────────┤
│   SCREEN 1  │
├─────────────┤
│   SCREEN 2  │
├─────────────┤
│ APP + AUTHOR│
└─────────────┘
```
Best for: Apps with distinct screen types

### Layout B: 2x2 Grid
```
┌──────┬──────┐
│SPLASH│SCRN 1│
├──────┼──────┤
│SCRN 2│ INFO │
└──────┴──────┘
```
Best for: Balanced, equal-weight screens

### Layout C: Hero Feature
```
┌─────────────────┐
│                 │
│     SPLASH      │
│                 │
├───────┬─────────┤
│SCRN 1 │ SCRN 2  │
└───────┴─────────┘
```
Best for: Splash screen is the star

### Layout D: Phone Lineup
```
┌─────────────────────────┐
│  ┌───┐  ┌───┐  ┌───┐   │
│  │ 1 │  │ 2 │  │ 3 │   │
│  └───┘  └───┘  └───┘   │
│     "App Name" by X     │
└─────────────────────────┘
```
Best for: Clean, professional presentation

---

## 🔄 Guest Flow (Target: 2-3 minutes)

| Step | Action | Time |
|------|--------|------|
| 1 | Guest picks character card | 15 sec |
| 2 | Guest picks app type card | 15 sec |
| 3 | Guest writes prompt (name, concept, unique feature, their name) | 60-90 sec |
| 4 | Claude generates screens | 60-90 sec |
| 5 | Operator runs capture script | 15 sec |
| 6 | Guest picks collage layout | 10 sec |
| 7 | Operator runs collage script | 10 sec |
| 8 | Upload to Miro | 15 sec |

**Total: ~3-4 minutes** (some parallel steps possible)

---

## 📦 Asset Sources (Copyright-Free)

| Source | Content | License |
|--------|---------|---------|
| [Lucide](https://lucide.dev) | General icons (bundled with shadcn) | ISC |
| [SVG Repo](https://svgrepo.com) | Holiday-specific icons | CC0 / Various |
| [Reshot](https://reshot.com/free-svg-icons/christmas/) | 92 Christmas icons | Reshot Free License |
| [FreeSVG](https://freesvg.org) | Public domain clipart | CC0 |

---

## 🚀 Quick Commands Reference

```bash
# Development
npm run dev                           # Start dev server

# After guest completes app
npm run capture 2 "SleighShare" "Jamie"   # Capture app2 screenshots
npm run collage ./captures/app2-... C      # Create Layout C collage

# Reset for next guest (if needed)
git checkout -- app/app{N}/           # Reset specific app slot
```

---

## ❓ Remaining Questions (Low Priority)

1. **Font choice**: Stick with system fonts or add a festive display font?
2. **Sound effects**: Any audio feedback during the event? (probably no)
3. **Backup plan**: What if Claude generation fails? Pre-made examples ready?
4. **Physical setup**: Tripod for phone to photograph the laptop screen for social media?

---

## 📅 Timeline Suggestion

| Day | Focus |
|-----|-------|
| Day 1 | Phases 1-2 (Foundation + Themes) |
| Day 2 | Phases 3-4 (Components + Assets) |
| Day 3 | Phases 5-6 (Scripts + Claude Prompt) |
| Day 4 | Phases 7-8 (Gallery + Testing) |
| Event Day | Phase 9 (Setup + Run) |

---

*Last updated: December 2, 2024*
