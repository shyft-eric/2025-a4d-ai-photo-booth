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

// Palette variant type
export type PaletteVariant = "default" | "warm" | "cool" | "bold"

// Palette variant data - each character has 3-4 color palette options
export interface PaletteOption {
  id: PaletteVariant
  name: string
  gradientStart: string  // HSL values like "350 80% 45%"
  gradientEnd: string
  preview: [string, string, string]  // 3 hex colors for visual preview
}

// Generate palette variants for each character theme
export const PALETTE_VARIANTS: Record<ThemeName, PaletteOption[]> = {
  // Santa - warm reds and golds
  santa: [
    { id: "default", name: "Classic Red", gradientStart: "350 80% 45%", gradientEnd: "350 70% 35%", preview: ["#c91b3a", "#a8162f", "#8b1225"] },
    { id: "warm", name: "Sunset Gold", gradientStart: "25 90% 50%", gradientEnd: "350 80% 45%", preview: ["#f57c00", "#e65100", "#c91b3a"] },
    { id: "cool", name: "Candy Cane", gradientStart: "350 80% 55%", gradientEnd: "0 0% 95%", preview: ["#e53e5d", "#f5f5f5", "#ffffff"] },
    { id: "bold", name: "Deep Crimson", gradientStart: "350 90% 35%", gradientEnd: "330 80% 25%", preview: ["#9c1533", "#6d1040", "#4a0d2b"] },
  ],
  // Mrs. Claus - warm pinks and creams
  "mrs-claus": [
    { id: "default", name: "Rose & Cream", gradientStart: "350 65% 50%", gradientEnd: "30 80% 45%", preview: ["#c94d6d", "#d4874a", "#e6a34d"] },
    { id: "warm", name: "Gingerbread", gradientStart: "25 70% 45%", gradientEnd: "15 80% 35%", preview: ["#bf6930", "#a3522a", "#8b4225"] },
    { id: "cool", name: "Peppermint", gradientStart: "350 50% 60%", gradientEnd: "170 40% 70%", preview: ["#d47a8f", "#8fc9b9", "#a8d4c8"] },
    { id: "bold", name: "Berry Jam", gradientStart: "340 70% 40%", gradientEnd: "320 60% 30%", preview: ["#a33558", "#7a2d52", "#5c244a"] },
  ],
  // Scrooge - greens and golds
  scrooge: [
    { id: "default", name: "Money Green", gradientStart: "150 40% 25%", gradientEnd: "45 80% 50%", preview: ["#26593d", "#d4a84b", "#e6b84d"] },
    { id: "warm", name: "Vintage Gold", gradientStart: "45 70% 40%", gradientEnd: "30 60% 30%", preview: ["#b8922f", "#8f6b24", "#6b4f1c"] },
    { id: "cool", name: "Emerald", gradientStart: "160 50% 35%", gradientEnd: "180 40% 45%", preview: ["#2d7a5c", "#3d9e8c", "#4db8a8"] },
    { id: "bold", name: "Dark Fortune", gradientStart: "150 50% 15%", gradientEnd: "45 90% 45%", preview: ["#0f2e1f", "#d4a30a", "#e6b30a"] },
  ],
  // Rudolph - reds and blues
  rudolph: [
    { id: "default", name: "Red Nose", gradientStart: "0 85% 55%", gradientEnd: "220 40% 35%", preview: ["#e64545", "#3d5a80", "#2d4a6a"] },
    { id: "warm", name: "Sunset Flight", gradientStart: "15 80% 55%", gradientEnd: "350 70% 45%", preview: ["#e87040", "#c73e4d", "#a32d3d"] },
    { id: "cool", name: "Northern Lights", gradientStart: "0 70% 50%", gradientEnd: "200 60% 50%", preview: ["#cc4040", "#4d94b8", "#3d84a8"] },
    { id: "bold", name: "Midnight Glow", gradientStart: "0 90% 45%", gradientEnd: "240 50% 25%", preview: ["#cc1a1a", "#2d2d5c", "#1f1f4a"] },
  ],
  // Frosty - light blues and whites
  frosty: [
    { id: "default", name: "Ice Blue", gradientStart: "200 80% 55%", gradientEnd: "200 60% 75%", preview: ["#3da1d4", "#7ac4e6", "#a8d8f0"] },
    { id: "warm", name: "Warm Winter", gradientStart: "200 60% 60%", gradientEnd: "30 50% 80%", preview: ["#5aadcc", "#d9c4a8", "#e6d4b8"] },
    { id: "cool", name: "Arctic", gradientStart: "190 70% 50%", gradientEnd: "210 80% 85%", preview: ["#2d9eb8", "#b8d4e6", "#d0e6f5"] },
    { id: "bold", name: "Deep Freeze", gradientStart: "200 90% 40%", gradientEnd: "220 70% 30%", preview: ["#0a7ab8", "#2d4a6b", "#1f3a5c"] },
  ],
  // Jack Frost - cyan and purple
  "jack-frost": [
    { id: "default", name: "Frost Magic", gradientStart: "200 70% 60%", gradientEnd: "280 50% 65%", preview: ["#4db8e6", "#a67ac9", "#8f66b8"] },
    { id: "warm", name: "Aurora", gradientStart: "180 60% 55%", gradientEnd: "300 50% 60%", preview: ["#40b8b8", "#b866b8", "#a050a0"] },
    { id: "cool", name: "Ice Crystal", gradientStart: "195 80% 65%", gradientEnd: "260 60% 75%", preview: ["#5cc9e6", "#a899d4", "#c4b8e6"] },
    { id: "bold", name: "Midnight Frost", gradientStart: "210 80% 45%", gradientEnd: "270 70% 40%", preview: ["#1a6bb8", "#6b3da3", "#5c308f"] },
  ],
  // Nutcracker - purple and gold
  nutcracker: [
    { id: "default", name: "Royal Purple", gradientStart: "280 60% 40%", gradientEnd: "45 80% 50%", preview: ["#6b3d99", "#d4a84b", "#e6b84d"] },
    { id: "warm", name: "Velvet Gold", gradientStart: "300 50% 35%", gradientEnd: "40 90% 55%", preview: ["#804080", "#e6a820", "#f5b830"] },
    { id: "cool", name: "Regal Blue", gradientStart: "260 50% 45%", gradientEnd: "220 60% 50%", preview: ["#5c4d99", "#4070b8", "#3060a8"] },
    { id: "bold", name: "Midnight Kingdom", gradientStart: "280 70% 25%", gradientEnd: "320 60% 35%", preview: ["#3d1a66", "#802060", "#6b1a50"] },
  ],
  // Sugar Plum - pinks and purples
  "sugar-plum": [
    { id: "default", name: "Fairy Pink", gradientStart: "320 60% 60%", gradientEnd: "280 50% 75%", preview: ["#cc66a3", "#b899cc", "#c9add9"] },
    { id: "warm", name: "Rose Petal", gradientStart: "340 55% 65%", gradientEnd: "20 60% 75%", preview: ["#d980a3", "#e6b899", "#f0c9a8"] },
    { id: "cool", name: "Lavender Dream", gradientStart: "280 50% 65%", gradientEnd: "240 40% 80%", preview: ["#a67acc", "#b3b8d9", "#c9cce6"] },
    { id: "bold", name: "Berry Fusion", gradientStart: "320 70% 50%", gradientEnd: "280 60% 45%", preview: ["#c93d8f", "#8f4db8", "#7a3da3"] },
  ],
  // Krampus - dark reds and blacks
  krampus: [
    { id: "default", name: "Dark Fire", gradientStart: "0 80% 35%", gradientEnd: "0 50% 10%", preview: ["#991a1a", "#331010", "#1a0808"] },
    { id: "warm", name: "Ember", gradientStart: "15 80% 40%", gradientEnd: "0 70% 20%", preview: ["#b84d20", "#661515", "#4d1010"] },
    { id: "cool", name: "Shadow", gradientStart: "340 60% 30%", gradientEnd: "260 40% 15%", preview: ["#66203d", "#2d1f40", "#1f1530"] },
    { id: "bold", name: "Blood Moon", gradientStart: "350 90% 30%", gradientEnd: "330 100% 10%", preview: ["#8a0822", "#33001a", "#1a000d"] },
  ],
  // Father Time - golds and silvers
  "father-time": [
    { id: "default", name: "Antique Gold", gradientStart: "45 60% 45%", gradientEnd: "220 20% 40%", preview: ["#b89940", "#525866", "#424852"] },
    { id: "warm", name: "Bronze Age", gradientStart: "30 70% 40%", gradientEnd: "20 60% 30%", preview: ["#a67830", "#7a5020", "#664018"] },
    { id: "cool", name: "Silver Sands", gradientStart: "220 15% 60%", gradientEnd: "45 40% 55%", preview: ["#8a919e", "#c9b366", "#d4c080"] },
    { id: "bold", name: "Eternal Night", gradientStart: "45 80% 35%", gradientEnd: "240 30% 20%", preview: ["#998520", "#2d2d40", "#1f1f30"] },
  ],
  // Baby New Year - bright and cheerful
  "baby-new-year": [
    { id: "default", name: "Confetti", gradientStart: "45 90% 60%", gradientEnd: "180 70% 60%", preview: ["#e6c933", "#40b8b8", "#30a8a8"] },
    { id: "warm", name: "Sunrise", gradientStart: "40 95% 55%", gradientEnd: "350 80% 55%", preview: ["#e6a80a", "#d94060", "#c93050"] },
    { id: "cool", name: "Party Blue", gradientStart: "200 80% 55%", gradientEnd: "280 60% 60%", preview: ["#3da1d4", "#9966b8", "#8050a8"] },
    { id: "bold", name: "Celebration", gradientStart: "50 100% 50%", gradientEnd: "320 80% 50%", preview: ["#e6c700", "#cc3399", "#b82d86"] },
  ],
  // Polar Bear - icy whites and blues
  "polar-bear": [
    { id: "default", name: "Arctic Ice", gradientStart: "200 40% 85%", gradientEnd: "200 60% 70%", preview: ["#c4dae6", "#8ac4e0", "#70b8d9"] },
    { id: "warm", name: "Warm Snow", gradientStart: "30 20% 90%", gradientEnd: "200 50% 75%", preview: ["#e8e4dd", "#99c9e0", "#80bdd9"] },
    { id: "cool", name: "Glacier", gradientStart: "190 50% 80%", gradientEnd: "210 70% 60%", preview: ["#a8d9e6", "#4da3cc", "#3d93bc"] },
    { id: "bold", name: "Northern Sea", gradientStart: "195 60% 70%", gradientEnd: "220 50% 40%", preview: ["#70c4d9", "#4d6b99", "#3d5a8a"] },
  ],
  // Maccabee - blues and golds
  maccabee: [
    { id: "default", name: "Royal Blue", gradientStart: "220 70% 45%", gradientEnd: "45 90% 55%", preview: ["#2d5299", "#e6a820", "#f5b830"] },
    { id: "warm", name: "Golden Shield", gradientStart: "45 80% 50%", gradientEnd: "30 70% 40%", preview: ["#d4a830", "#b88020", "#996818"] },
    { id: "cool", name: "Ocean Star", gradientStart: "210 60% 50%", gradientEnd: "195 50% 65%", preview: ["#4080b8", "#66b8cc", "#80c9d9"] },
    { id: "bold", name: "Midnight Gold", gradientStart: "230 60% 30%", gradientEnd: "50 100% 45%", preview: ["#2d3366", "#cca300", "#e6b800"] },
  ],
  // Shamash - warm flames and gold
  shamash: [
    { id: "default", name: "Candle Flame", gradientStart: "40 100% 50%", gradientEnd: "25 90% 40%", preview: ["#e6a800", "#cc6600", "#b85500"] },
    { id: "warm", name: "Warm Glow", gradientStart: "35 95% 55%", gradientEnd: "15 85% 45%", preview: ["#e6a820", "#cc5530", "#b84525"] },
    { id: "cool", name: "Silver Light", gradientStart: "45 60% 60%", gradientEnd: "220 30% 60%", preview: ["#cca850", "#8090a8", "#7080a0"] },
    { id: "bold", name: "Sacred Fire", gradientStart: "30 100% 45%", gradientEnd: "0 80% 35%", preview: ["#cc7700", "#992020", "#801818"] },
  ],
  // Umoja - earth tones and reds
  umoja: [
    { id: "default", name: "Unity", gradientStart: "0 70% 35%", gradientEnd: "120 40% 25%", preview: ["#8f2626", "#304d30", "#264026"] },
    { id: "warm", name: "Sunset", gradientStart: "20 75% 45%", gradientEnd: "45 70% 40%", preview: ["#cc6030", "#b89930", "#a88a28"] },
    { id: "cool", name: "Earth & Sky", gradientStart: "30 50% 35%", gradientEnd: "200 40% 40%", preview: ["#735c40", "#4d7a8f", "#3d6a80"] },
    { id: "bold", name: "Heritage", gradientStart: "0 80% 30%", gradientEnd: "0 60% 15%", preview: ["#801515", "#401010", "#300808"] },
  ],
  // Kuumba - vibrant creative colors
  kuumba: [
    { id: "default", name: "Creative", gradientStart: "45 90% 50%", gradientEnd: "0 80% 45%", preview: ["#e6a808", "#cc3030", "#b82828"] },
    { id: "warm", name: "Warm Art", gradientStart: "30 85% 50%", gradientEnd: "350 70% 40%", preview: ["#d98020", "#993040", "#803038"] },
    { id: "cool", name: "Ocean Craft", gradientStart: "180 70% 40%", gradientEnd: "220 60% 45%", preview: ["#208080", "#3d5c99", "#304d8a"] },
    { id: "bold", name: "Bold Expression", gradientStart: "50 100% 45%", gradientEnd: "280 70% 40%", preview: ["#cca800", "#6b3099", "#5c288a"] },
  ],
  // Solstice - deep purples and cosmic
  solstice: [
    { id: "default", name: "Cosmic Night", gradientStart: "260 60% 25%", gradientEnd: "220 50% 15%", preview: ["#3d2666", "#1a2040", "#141830"] },
    { id: "warm", name: "Winter Fire", gradientStart: "280 50% 30%", gradientEnd: "350 60% 35%", preview: ["#4d2666", "#8f2d50", "#802848"] },
    { id: "cool", name: "Aurora Borealis", gradientStart: "180 60% 35%", gradientEnd: "260 50% 40%", preview: ["#268080", "#5c4d8f", "#4d4080"] },
    { id: "bold", name: "Deep Space", gradientStart: "270 70% 20%", gradientEnd: "240 80% 10%", preview: ["#2d1050", "#0d0d33", "#080826"] },
  ],
}
