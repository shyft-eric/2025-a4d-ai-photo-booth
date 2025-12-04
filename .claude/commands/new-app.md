---
description: Create a new holiday photo booth app mockup
---

# Create New Photo Booth App

This command sets up a new app slot and invokes the Holiday Party Vibes agent to generate a whimsical holiday-themed app mockup.

## Step 1: Find the Next Available App Slot

First, check which app slots already exist:

```bash
ls -d app/app*/ 2>/dev/null | sort -V
```

Based on the output, determine the next available slot number:
- If `app1/` and `app2/` exist → use `app3`
- If only `app1/` exists → use `app2`
- If no app folders exist → use `app1`

**IMPORTANT**: Never overwrite existing apps! Always use the next sequential number.

## Step 2: Create the Directory Structure

Once you've determined the slot number N, create the directories:

```bash
mkdir -p app/app{N}/screen-1 app/app{N}/screen-2
```

## Step 3: Parse the User's Request

Extract from `$ARGUMENTS`:
- **App Name**: The name of the app (e.g., "FrostyFitness")
- **Author**: Who created it (e.g., "Jamie")
- **Character/Theme**: Which holiday character (e.g., "frosty", "santa", "rudolph")
- **App Type**: What kind of app (e.g., "fitness", "productivity", "social")
- **Features**: 1-3 unique features to showcase

## Step 4: Generate the App

Create 4 files in `/app/app{N}/`:

1. **layout.tsx** - Theme wrapper with `data-theme="{theme}"` and ScreenNav
2. **page.tsx** - Splash/Hero screen with SplashHero component
3. **screen-1/page.tsx** - First feature screen
4. **screen-2/page.tsx** - Second feature screen

Use the templates and components documented in the Holiday Party Vibes agent.

## Step 5: Verify and Report

After generating all files:

1. Confirm the app was created at `/app{N}`
2. Remind the user they can view it at `http://localhost:3000/app{N}`
3. Tell them to visit `/collage/app{N}` to create their photo collage

## Available Themes

| Theme ID | Character |
|----------|-----------|
| `santa` | Santa Claus |
| `mrs-claus` | Mrs. Claus |
| `scrooge` | Scrooge |
| `rudolph` | Rudolph |
| `frosty` | Frosty |
| `jack-frost` | Jack Frost |
| `nutcracker` | The Nutcracker |
| `sugar-plum` | Sugar Plum Fairy |
| `krampus` | Krampus |
| `father-time` | Father Time |
| `baby-new-year` | Baby New Year |
| `polar-bear` | Polar Bear Pete |
| `maccabee` | Judah Maccabee |
| `shamash` | The Shamash |
| `umoja` | Umoja (Unity) |
| `kuumba` | Kuumba (Creativity) |
| `solstice` | Winter Solstice |

## Available App Types

| Type | Pattern |
|------|---------|
| `ride-share` | Map-centric, bottom sheet |
| `food-delivery` | Cards, horizontal scroll |
| `dating` | Card stack, swipe gestures |
| `finance` | Charts, numbers, indicators |
| `social` | Grid, stories, floating action |
| `fitness` | Progress rings, large numbers |
| `music` | Album art dominant, playback bar |
| `productivity` | Checkboxes, kanban hints |
| `weather` | Large icons, temperature dominant |
| `ecommerce` | Product cards, filters, CTAs |
| `wellness` | Calm colors, centered content |
| `recipe` | Hero image, structured lists |

## Arguments Provided

$ARGUMENTS
