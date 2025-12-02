// Types and registry for generated apps

export type ThemeName = 
  // Christmas
  | "santa" | "mrs-claus" | "scrooge" | "rudolph" | "frosty" 
  | "jack-frost" | "nutcracker" | "sugar-plum" | "krampus" 
  | "father-time" | "baby-new-year" | "polar-bear"
  // Hanukkah
  | "maccabee" | "shamash"
  // Kwanzaa
  | "umoja" | "kuumba"
  // Winter
  | "solstice"

export type AppType = 
  | "ride-share" | "food-delivery" | "dating" | "finance" 
  | "social" | "fitness" | "music" | "productivity" 
  | "weather" | "ecommerce" | "wellness" | "recipe"

export interface AppEntry {
  id: string              // e.g., "app1", "app2"
  name: string            // e.g., "SleighShare"
  author: string          // Guest's name
  theme: ThemeName
  appType: AppType
  tagline: string
  screens: string[]       // List of screen routes
  createdAt: string       // ISO timestamp
  collageLayout?: "A" | "B" | "C" | "D"
}

// Character/Theme metadata for display
export const CHARACTER_DATA: Record<ThemeName, {
  name: string
  holiday: "christmas" | "hanukkah" | "kwanzaa" | "winter"
  vibe: string
  emoji: string
}> = {
  // Christmas
  santa: { name: "Santa Claus", holiday: "christmas", vibe: "Jolly & Generous", emoji: "🎅" },
  "mrs-claus": { name: "Mrs. Claus", holiday: "christmas", vibe: "Warm & Organized", emoji: "🤶" },
  scrooge: { name: "Scrooge", holiday: "christmas", vibe: "Reformed Miser", emoji: "💰" },
  rudolph: { name: "Rudolph", holiday: "christmas", vibe: "Guiding Light", emoji: "🦌" },
  frosty: { name: "Frosty", holiday: "christmas", vibe: "Carefree Joy", emoji: "⛄" },
  "jack-frost": { name: "Jack Frost", holiday: "christmas", vibe: "Cool & Mischievous", emoji: "❄️" },
  nutcracker: { name: "The Nutcracker", holiday: "christmas", vibe: "Regal Protector", emoji: "🪖" },
  "sugar-plum": { name: "Sugar Plum Fairy", holiday: "christmas", vibe: "Magical & Dreamy", emoji: "🧚" },
  krampus: { name: "Krampus", holiday: "christmas", vibe: "Dark Anti-Hero", emoji: "👹" },
  "father-time": { name: "Father Time", holiday: "christmas", vibe: "Wise & Reflective", emoji: "⏳" },
  "baby-new-year": { name: "Baby New Year", holiday: "christmas", vibe: "Fresh Optimism", emoji: "👶" },
  "polar-bear": { name: "Polar Bear Pete", holiday: "christmas", vibe: "Chill Explorer", emoji: "🐻‍❄️" },
  // Hanukkah
  maccabee: { name: "Judah Maccabee", holiday: "hanukkah", vibe: "Heroic Leader", emoji: "🕎" },
  shamash: { name: "The Shamash", holiday: "hanukkah", vibe: "Helper & Guide", emoji: "🕯️" },
  // Kwanzaa
  umoja: { name: "Umoja (Unity)", holiday: "kwanzaa", vibe: "Community Strength", emoji: "✊" },
  kuumba: { name: "Kuumba (Creativity)", holiday: "kwanzaa", vibe: "Vibrant Creator", emoji: "🎨" },
  // Winter
  solstice: { name: "Winter Solstice", holiday: "winter", vibe: "Cosmic Wonder", emoji: "🌙" },
}

export const APP_TYPE_DATA: Record<AppType, {
  name: string
  screens: string[]
  pattern: string
}> = {
  "ride-share": { 
    name: "Ride Share", 
    screens: ["Map View", "Driver Card", "Trip Summary"],
    pattern: "Map-centric, bottom sheet"
  },
  "food-delivery": { 
    name: "Food Delivery", 
    screens: ["Restaurant List", "Menu", "Cart"],
    pattern: "Cards, horizontal scroll"
  },
  dating: { 
    name: "Dating / Swipe", 
    screens: ["Profile Card", "Match Screen", "Chat Preview"],
    pattern: "Card stack, swipe gestures"
  },
  finance: { 
    name: "Investment / Finance", 
    screens: ["Portfolio Dashboard", "Stock Chart", "Trade"],
    pattern: "Charts, numbers, indicators"
  },
  social: { 
    name: "Social Feed", 
    screens: ["Photo Grid", "Story Bar", "Post Detail"],
    pattern: "Grid, stories row, floating action"
  },
  fitness: { 
    name: "Fitness Tracker", 
    screens: ["Today's Stats", "Workout List", "Achievement"],
    pattern: "Progress rings, large numbers"
  },
  music: { 
    name: "Music Streaming", 
    screens: ["Now Playing", "Playlist", "Browse"],
    pattern: "Album art dominant, playback bar"
  },
  productivity: { 
    name: "Task / Productivity", 
    screens: ["Task List", "Calendar View", "Completed"],
    pattern: "Checkboxes, kanban hints"
  },
  weather: { 
    name: "Weather", 
    screens: ["Current Conditions", "Hourly", "Weekly"],
    pattern: "Large icons, temperature dominant"
  },
  ecommerce: { 
    name: "E-commerce / Shop", 
    screens: ["Product Grid", "Detail Page", "Cart"],
    pattern: "Product cards, filters, CTA buttons"
  },
  wellness: { 
    name: "Meditation / Wellness", 
    screens: ["Session Picker", "Breathing", "Stats"],
    pattern: "Calm colors, centered content"
  },
  recipe: { 
    name: "Recipe / Cooking", 
    screens: ["Recipe Card", "Ingredients", "Steps"],
    pattern: "Hero image, structured lists"
  },
}

// Registry file path (would be written to disk)
export const REGISTRY_PATH = "./app-registry.json"
