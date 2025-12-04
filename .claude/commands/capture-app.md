---
description: Capture screenshots and create collage for an app
---

# Create Collage for an App

This command helps users create a collage for their photo booth app.

## Usage

This command takes the following arguments:
- `$ARGUMENTS` - Should contain: `{app-number}`

Example: `/capture-app 3`

## How it Works

The collage system now uses live iframe previews instead of screenshot capture. Simply direct the user to the collage page:

1. Navigate to `/collage/app{N}` (e.g., `/collage/app3`)
2. The page shows a live preview of all 3 app screens
3. Users can choose from different collage layouts (A, B, or C)
4. Click "Download Collage" to generate and save the image

## Available Layouts

- **A (Cascading Cards)** - Stepped phones with subtle tilts
- **B (Tilted Hero)** - Hero phone with title overlay
- **C (Stacked Showcase)** - Overlapping tilted screens

## Response

Tell the user:
- Visit `http://localhost:3000/collage/app{N}` to create their collage
- They can preview different layouts before downloading
- The download button generates a high-quality PNG image

## Arguments provided

$ARGUMENTS
