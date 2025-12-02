import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Theme types
export type ThemeId = 
  | 'santa' | 'mrs-claus' | 'scrooge' | 'rudolph' | 'frosty' 
  | 'jack-frost' | 'nutcracker' | 'sugar-plum' | 'krampus'
  | 'father-time' | 'baby-new-year' | 'polar-bear'
  | 'maccabee' | 'shamash' | 'umoja' | 'kuumba' | 'solstice';

export type AppType = 
  | 'rideshare' | 'food-delivery' | 'dating' | 'finance'
  | 'social' | 'fitness' | 'music' | 'productivity'
  | 'weather' | 'ecommerce' | 'wellness' | 'recipe';

export interface AppConfig {
  id: number;
  name: string;
  tagline: string;
  author: string;
  theme: ThemeId;
  appType: AppType;
  createdAt?: string;
}

// Character metadata
export const characters: Record<ThemeId, { name: string; vibe: string; holiday: string }> = {
  santa: { name: "Santa Claus", vibe: "Jolly, generous, knows everything about you", holiday: "Christmas" },
  'mrs-claus': { name: "Mrs. Claus", vibe: "Warm, organized, nurturing, runs operations", holiday: "Christmas" },
  scrooge: { name: "Scrooge", vibe: "Reformed miser, values transformation", holiday: "Christmas" },
  rudolph: { name: "Rudolph", vibe: "Outcast turned hero, guidance, standing out", holiday: "Christmas" },
  frosty: { name: "Frosty", vibe: "Carefree, temporary joy, childlike wonder", holiday: "Christmas" },
  'jack-frost': { name: "Jack Frost", vibe: "Mischievous, artistic, cool sophistication", holiday: "Christmas" },
  nutcracker: { name: "The Nutcracker", vibe: "Protective, regal, transforms at night", holiday: "Christmas" },
  'sugar-plum': { name: "Sugar Plum Fairy", vibe: "Magical, dreamy, delightful experiences", holiday: "Christmas" },
  krampus: { name: "Krampus", vibe: "Anti-hero, accountability, tough love", holiday: "Christmas" },
  'father-time': { name: "Father Time", vibe: "Wisdom, reflection, transitions", holiday: "New Year" },
  'baby-new-year': { name: "Baby New Year", vibe: "Fresh starts, optimism, new beginnings", holiday: "New Year" },
  'polar-bear': { name: "Polar Bear Pete", vibe: "Chill vibes, arctic explorer", holiday: "Winter" },
  maccabee: { name: "Judah Maccabee", vibe: "Brave leader, perseverance, lighting the way", holiday: "Hanukkah" },
  shamash: { name: "The Shamash", vibe: "Helper candle, service-minded, guiding light", holiday: "Hanukkah" },
  umoja: { name: "Mama Mkeka", vibe: "Foundation builder, community wisdom", holiday: "Kwanzaa" },
  kuumba: { name: "The Kinara Keeper", vibe: "Illumination, daily principles, unity", holiday: "Kwanzaa" },
  solstice: { name: "Winter Solstice Spirit", vibe: "Longest night, returning light, cosmic", holiday: "Solstice" },
};

// App type metadata
export const appTypes: Record<AppType, { name: string; pattern: string; screens: string[] }> = {
  rideshare: { name: "Ride Share", pattern: "Map-centric, bottom sheet", screens: ["Map View", "Driver Card", "Trip Summary"] },
  'food-delivery': { name: "Food Delivery", pattern: "Cards, horizontal scroll", screens: ["Restaurant List", "Menu", "Cart"] },
  dating: { name: "Dating/Swipe", pattern: "Card stack, swipe UI", screens: ["Profile Card", "Match Screen", "Chat"] },
  finance: { name: "Investment/Finance", pattern: "Charts, numbers, indicators", screens: ["Portfolio", "Stock Chart", "Trade"] },
  social: { name: "Social Feed", pattern: "Grid, stories, floating action", screens: ["Feed", "Stories", "Post Detail"] },
  fitness: { name: "Fitness Tracker", pattern: "Rings/progress, large numbers", screens: ["Today Stats", "Workout List", "Achievement"] },
  music: { name: "Music Streaming", pattern: "Album art, playback bar", screens: ["Now Playing", "Playlist", "Browse"] },
  productivity: { name: "Task/Productivity", pattern: "Checkboxes, clean lists", screens: ["Task List", "Calendar", "Completed"] },
  weather: { name: "Weather", pattern: "Large icons, temperature", screens: ["Current", "Hourly", "Weekly"] },
  ecommerce: { name: "E-commerce/Shop", pattern: "Product cards, filters", screens: ["Product Grid", "Detail", "Cart"] },
  wellness: { name: "Meditation/Wellness", pattern: "Calm colors, centered", screens: ["Session Picker", "Breathing", "Stats"] },
  recipe: { name: "Recipe/Cooking", pattern: "Hero image, lists", screens: ["Recipe Card", "Ingredients", "Steps"] },
};

// Get all theme IDs as array
export const themeIds = Object.keys(characters) as ThemeId[];
export const appTypeIds = Object.keys(appTypes) as AppType[];
