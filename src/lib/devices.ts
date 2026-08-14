export interface DeviceModel {
  id: string;
  name: string;
  store: "ios" | "android";
  width: number;
  height: number;
  colors: string[];
  // SVG viewBox clip path for the screen area (will use CSS clip for now)
  cornerRadius: number;
}

export const COLOR_HEX_MAP: Record<string, string> = {
  black: "#1a1a1a", obsidian: "#1a1a1a", "titanium black": "#2d2d2d",
  white: "#f5f5f7", porcelain: "#f0ede8", silver: "#d1d5db", "titanium white": "#f5f5f7",
  natural: "#9a8f84", "natural titanium": "#9a8f84", snow: "#f8f8f8",
  desert: "#d4a676", "desert titanium": "#d4a676", gold: "#c9a96e",
  blue: "#2a5caf", bay: "#4a6ea8", cobalt: "#3a5a9e", "cobalt violet": "#6a4a9e",
  hazel: "#6b6b4f", green: "#4a8c72", wintergreen: "#4a7c72",
  pink: "#e8a0b0", rose: "#c8a0a0", "rose quartz": "#c8a0a0", peony: "#d080a0",
  teal: "#4a9e9a", purple: "#8b5cf6", ultramarine: "#3a4a9e",
  red: "#dc2626", yellow: "#facc15", mint: "#6ee7b7",
  "flowy emerald": "#34a86c", "silky black": "#111111",
  "titanium silver": "#b0b0b0", "titanium blue": "#4a6ea8",
  "icyblue": "#8abbe8", navy: "#1e3a5f", "silver shadow": "#aab0b8",
  "onyx black": "#111827", "marble gray": "#6b7280", "amber yellow": "#d97706",
};

export const IOS_DEVICES: DeviceModel[] = [
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    store: "ios",
    width: 1320,
    height: 2868,
    colors: ["Black", "White", "Natural", "Desert"],
    cornerRadius: 55,
  },
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    store: "ios",
    width: 1206,
    height: 2622,
    colors: ["Black", "White", "Natural", "Desert"],
    cornerRadius: 50,
  },
  {
    id: "iphone-16-plus",
    name: "iPhone 16 Plus",
    store: "ios",
    width: 1290,
    height: 2796,
    colors: ["Black", "White", "Teal", "Pink", "Ultramarine"],
    cornerRadius: 55,
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    store: "ios",
    width: 1179,
    height: 2556,
    colors: ["Black", "White", "Teal", "Pink", "Ultramarine"],
    cornerRadius: 50,
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    store: "ios",
    width: 1290,
    height: 2796,
    colors: ["Black", "White", "Natural", "Blue"],
    cornerRadius: 53,
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    store: "ios",
    width: 1179,
    height: 2556,
    colors: ["Black", "White", "Natural", "Blue"],
    cornerRadius: 48,
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    store: "ios",
    width: 1179,
    height: 2556,
    colors: ["Black", "Pink", "Yellow", "Green", "Blue"],
    cornerRadius: 48,
  },
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    store: "ios",
    width: 1290,
    height: 2796,
    colors: ["Black", "Silver", "Gold", "Purple"],
    cornerRadius: 53,
  },
  {
    id: "iphone-se-3",
    name: "iPhone SE (3rd gen)",
    store: "ios",
    width: 750,
    height: 1334,
    colors: ["Black", "White", "Red"],
    cornerRadius: 20,
  },
  {
    id: "ipad-pro-13",
    name: "iPad Pro 13\"",
    store: "ios",
    width: 2064,
    height: 2752,
    colors: ["Black", "Silver"],
    cornerRadius: 18,
  },
];

export const ANDROID_DEVICES: DeviceModel[] = [
  {
    id: "pixel-9-pro-xl",
    name: "Pixel 9 Pro XL",
    store: "android",
    width: 1344,
    height: 2992,
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose Quartz"],
    cornerRadius: 48,
  },
  {
    id: "pixel-9-pro",
    name: "Pixel 9 Pro",
    store: "android",
    width: 1080,
    height: 2424,
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose Quartz"],
    cornerRadius: 44,
  },
  {
    id: "pixel-9",
    name: "Pixel 9",
    store: "android",
    width: 1080,
    height: 2424,
    colors: ["Obsidian", "Porcelain", "Wintergreen", "Peony"],
    cornerRadius: 44,
  },
  {
    id: "pixel-8-pro",
    name: "Pixel 8 Pro",
    store: "android",
    width: 1344,
    height: 2992,
    colors: ["Obsidian", "Porcelain", "Bay"],
    cornerRadius: 46,
  },
  {
    id: "pixel-8",
    name: "Pixel 8",
    store: "android",
    width: 1080,
    height: 2400,
    colors: ["Obsidian", "Hazel", "Rose"],
    cornerRadius: 42,
  },
  {
    id: "pixel-7-pro",
    name: "Pixel 7 Pro",
    store: "android",
    width: 1440,
    height: 3120,
    colors: ["Obsidian", "Snow", "Hazel"],
    cornerRadius: 44,
  },
  {
    id: "galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    store: "android",
    width: 1440,
    height: 3088,
    colors: ["Titanium Black", "Titanium Silver", "Titanium Blue", "Titanium White"],
    cornerRadius: 46,
  },
  {
    id: "galaxy-s25",
    name: "Samsung Galaxy S25",
    store: "android",
    width: 1080,
    height: 2340,
    colors: ["Icyblue", "Mint", "Navy", "Silver Shadow"],
    cornerRadius: 48,
  },
  {
    id: "galaxy-s24",
    name: "Samsung Galaxy S24",
    store: "android",
    width: 1080,
    height: 2340,
    colors: ["Onyx Black", "Marble Gray", "Cobalt Violet", "Amber Yellow"],
    cornerRadius: 46,
  },
  {
    id: "oneplus-12",
    name: "OnePlus 12",
    store: "android",
    width: 1440,
    height: 3168,
    colors: ["Flowy Emerald", "Silky Black"],
    cornerRadius: 40,
  },
];

export const ALL_DEVICES = [...IOS_DEVICES, ...ANDROID_DEVICES];

// App Store required sizes
export const APP_STORE_SIZES = {
  ios: [
    { label: "iPhone 6.9\" (required)", width: 1320, height: 2868 },
    { label: "iPhone 6.5\"", width: 1284, height: 2778 },
    { label: "iPhone 5.5\"", width: 1242, height: 2208 },
    { label: "iPad Pro 12.9\"", width: 2048, height: 2732 },
  ],
  android: [
    { label: "Phone 9:16 (required)", width: 1080, height: 1920 },
    { label: "Phone 16:9", width: 1920, height: 1080 },
    { label: "Tablet 7\"", width: 1080, height: 1920 },
    { label: "Tablet 10\"", width: 1920, height: 1200 },
  ],
};
