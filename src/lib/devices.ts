export type NotchType = "island" | "notch" | "hole" | "none";

export interface HardwareButton {
  side: "left" | "right" | "top";
  yOffset: number; // Percentage from top (0 to 1)
  height: number; // Percentage of device height (0 to 1)
  thickness?: number; // Optional thickness multiplier
}

export interface DeviceModel {
  id: string;
  name: string;
  store: "ios" | "android";
  width: number;
  height: number;
  colors: string[];
  cornerRadius: number;
  bezelRatio?: number;
  notchType: NotchType;
  buttons: HardwareButton[];
}

export const COLOR_HEX_MAP: Record<string, string> = {
  // ── Apple iPhone Titanium Colors ──
  "black titanium": "#1f1f20",
  "white titanium": "#e8e8ea",
  "natural titanium": "#9e9891",
  "desert titanium": "#c6a992",
  "blue titanium": "#343b47",
  "titanium": "#9e9891",

  // ── Apple iPhone Standard Colors ──
  black: "#242527",
  white: "#fbfbfb",
  silver: "#e2e4e6",
  gold: "#f5e7c8",
  pink: "#f1b6c4",
  teal: "#7ebcb5",
  ultramarine: "#425e9e",
  blue: "#cbdbe6",
  green: "#d2e2d4",
  yellow: "#f4ecc4",
  purple: "#d1cdda",
  red: "#e23636",
  midnight: "#191f28",
  starlight: "#f0ece4",

  // ── Google Pixel Official Colors ──
  obsidian: "#202124",
  porcelain: "#f0ede6",
  hazel: "#62665a",
  "rose quartz": "#e5beba",
  rose: "#e4b8b2",
  bay: "#7fa6cc",
  mint: "#c0e1cd",
  peony: "#e88d9c",
  wintergreen: "#c2dad3",
  coral: "#f37a6b",
  lemongrass: "#d6e0aa",
  snow: "#f8f9fa",

  // ── Samsung Galaxy Official Colors ──
  "titanium black": "#2b2b2d",
  "titanium gray": "#7a7978",
  "titanium violet": "#5b586d",
  "titanium yellow": "#e8dbaa",
  "titanium silver": "#d6d8da",
  "titanium silverblue": "#788ba3",
  "titanium whitesilver": "#e5e7eb",
  silverblue: "#788ba3",
  whitesilver: "#e5e7eb",
  "onyx black": "#18181b",
  "marble gray": "#71717a",
  "amber yellow": "#d97706",
  "cobalt violet": "#6366f1",
  "flowy emerald": "#34a86c",
  "silky black": "#111111",
  "silver shadow": "#aab0b8",
  navy: "#1e3a5f",
  // ── Apple iPad Official Colors ──
  "space black": "#1c1d1f",
  "space gray": "#535458",

  // ── Samsung Tablet Official Colors ──
  "moonstone gray": "#4d4e52",
  "platinum silver": "#d2d4d8",
  graphite: "#28292d",
  beige: "#e8e1d5",
  "mystic black": "#1f1f21",
  "mystic silver": "#d8dade",
  "mystic bronze": "#a07869",
  "mystic navy": "#29384d",
  "midnight blue": "#1a2332",
};

export const IOS_DEVICES: DeviceModel[] = [
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max (6.9\")",
    store: "ios",
    width: 1320,
    height: 2868,
    colors: ["Black Titanium", "White Titanium", "Natural Titanium", "Desert Titanium"],
    cornerRadius: 186,
    bezelRatio: 0.0429,
    notchType: "island",
    buttons: [
      { side: "left", yOffset: 0.22, height: 0.03 }, // Action
      { side: "left", yOffset: 0.28, height: 0.05 }, // Vol Up
      { side: "left", yOffset: 0.35, height: 0.05 }, // Vol Down
      { side: "right", yOffset: 0.28, height: 0.07 }, // Power
      { side: "right", yOffset: 0.6, height: 0.06, thickness: 0.6 }, // Camera Control
    ],
  },
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro (6.3\")",
    store: "ios",
    width: 1179,
    height: 2556,
    colors: ["Black Titanium", "White Titanium", "Natural Titanium", "Desert Titanium"],
    cornerRadius: 166,
    bezelRatio: 0.0429,
    notchType: "island",
    buttons: [
      { side: "left", yOffset: 0.22, height: 0.03 }, // Action
      { side: "left", yOffset: 0.28, height: 0.05 }, // Vol Up
      { side: "left", yOffset: 0.35, height: 0.05 }, // Vol Down
      { side: "right", yOffset: 0.28, height: 0.07 }, // Power
      { side: "right", yOffset: 0.6, height: 0.06, thickness: 0.6 }, // Camera Control
    ],
  },
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max (6.9\")",
    store: "ios",
    width: 1320,
    height: 2868,
    colors: ["Black Titanium", "White Titanium", "Natural Titanium", "Desert Titanium"],
    cornerRadius: 186,
    bezelRatio: 0.0429,
    notchType: "island",
    buttons: [
      { side: "left", yOffset: 0.22, height: 0.03 }, // Action
      { side: "left", yOffset: 0.28, height: 0.05 }, // Vol Up
      { side: "left", yOffset: 0.35, height: 0.05 }, // Vol Down
      { side: "right", yOffset: 0.28, height: 0.07 }, // Power
      { side: "right", yOffset: 0.6, height: 0.06, thickness: 0.6 }, // Camera Control
    ],
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max (6.7\")",
    store: "ios",
    width: 1290,
    height: 2796,
    colors: ["Black Titanium", "White Titanium", "Natural Titanium", "Blue Titanium"],
    cornerRadius: 182,
    bezelRatio: 0.0429,
    notchType: "island",
    buttons: [
      { side: "left", yOffset: 0.22, height: 0.03 }, // Action
      { side: "left", yOffset: 0.28, height: 0.05 }, // Vol Up
      { side: "left", yOffset: 0.35, height: 0.05 }, // Vol Down
      { side: "right", yOffset: 0.28, height: 0.07 }, // Power
    ],
  },
  {
    id: "iphone-16",
    name: "iPhone 16 (6.1\")",
    store: "ios",
    width: 1179,
    height: 2556,
    colors: ["Black", "White", "Pink", "Teal", "Ultramarine"],
    cornerRadius: 166,
    bezelRatio: 0.0429,
    notchType: "island",
    buttons: [
      { side: "left", yOffset: 0.22, height: 0.03 }, // Action
      { side: "left", yOffset: 0.28, height: 0.05 }, // Vol Up
      { side: "left", yOffset: 0.35, height: 0.05 }, // Vol Down
      { side: "right", yOffset: 0.28, height: 0.07 }, // Power
      { side: "right", yOffset: 0.6, height: 0.06, thickness: 0.6 }, // Camera Control
    ],
  },
  {
    id: "iphone-15",
    name: "iPhone 15 (6.1\")",
    store: "ios",
    width: 1179,
    height: 2556,
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
    cornerRadius: 166,
    bezelRatio: 0.0429,
    notchType: "island",
    buttons: [
      { side: "left", yOffset: 0.22, height: 0.03 }, // Mute switch
      { side: "left", yOffset: 0.28, height: 0.05 }, // Vol Up
      { side: "left", yOffset: 0.35, height: 0.05 }, // Vol Down
      { side: "right", yOffset: 0.28, height: 0.07 }, // Power
    ],
  },
  {
    id: "ipad-pro-13",
    name: "iPad Pro 13\" (M4 / 12.9\")",
    store: "ios",
    width: 2048,
    height: 2732,
    colors: ["Space Black", "Silver"],
    cornerRadius: 82,
    bezelRatio: 0.024,
    notchType: "none",
    buttons: [
      { side: "top", yOffset: 0.82, height: 0.05 }, // Power button
      { side: "right", yOffset: 0.12, height: 0.04 }, // Vol Up
      { side: "right", yOffset: 0.18, height: 0.04 }, // Vol Down
    ],
  },
  {
    id: "ipad-pro-11",
    name: "iPad Pro 11\" (M4)",
    store: "ios",
    width: 1668,
    height: 2388,
    colors: ["Space Black", "Silver"],
    cornerRadius: 76,
    bezelRatio: 0.026,
    notchType: "none",
    buttons: [
      { side: "top", yOffset: 0.82, height: 0.05 },
      { side: "right", yOffset: 0.12, height: 0.04 },
      { side: "right", yOffset: 0.18, height: 0.04 },
    ],
  },
  {
    id: "ipad-mini",
    name: "iPad mini (8.3\")",
    store: "ios",
    width: 1488,
    height: 2266,
    colors: ["Space Gray", "Starlight", "Purple", "Blue"],
    cornerRadius: 70,
    bezelRatio: 0.028,
    notchType: "none",
    buttons: [
      { side: "top", yOffset: 0.82, height: 0.05 }, // Power
      { side: "top", yOffset: 0.12, height: 0.04 }, // Vol Up
      { side: "top", yOffset: 0.18, height: 0.04 }, // Vol Down
    ],
  },
  {
    id: "ipad-air-11",
    name: "iPad Air 11\" (M2)",
    store: "ios",
    width: 1640,
    height: 2360,
    colors: ["Space Gray", "Starlight", "Blue", "Purple"],
    cornerRadius: 74,
    bezelRatio: 0.027,
    notchType: "none",
    buttons: [
      { side: "top", yOffset: 0.82, height: 0.05 },
      { side: "right", yOffset: 0.12, height: 0.04 },
      { side: "right", yOffset: 0.18, height: 0.04 },
    ],
  },
];

export const ANDROID_DEVICES: DeviceModel[] = [
  {
    id: "pixel-10-pro-xl",
    name: "Google Pixel 10/11 Pro XL",
    store: "android",
    width: 1344,
    height: 2992,
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose Quartz"],
    cornerRadius: 215,
    bezelRatio: 0.0201,
    notchType: "hole",
    buttons: [
      { side: "right", yOffset: 0.25, height: 0.04 },
      { side: "right", yOffset: 0.35, height: 0.08 },
    ],
  },
  {
    id: "pixel-10-pro",
    name: "Google Pixel 10/11 Pro",
    store: "android",
    width: 1280,
    height: 2856,
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose Quartz"],
    cornerRadius: 205,
    bezelRatio: 0.0201,
    notchType: "hole",
    buttons: [
      { side: "right", yOffset: 0.25, height: 0.04 },
      { side: "right", yOffset: 0.35, height: 0.08 },
    ],
  },
  {
    id: "pixel-9-pro-xl",
    name: "Google Pixel 9 Pro XL",
    store: "android",
    width: 1344,
    height: 2992,
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose Quartz"],
    cornerRadius: 215,
    bezelRatio: 0.0224,
    notchType: "hole",
    buttons: [
      { side: "right", yOffset: 0.25, height: 0.04 },
      { side: "right", yOffset: 0.35, height: 0.08 },
    ],
  },
  {
    id: "pixel-9-pro",
    name: "Google Pixel 9 Pro",
    store: "android",
    width: 1280,
    height: 2856,
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose Quartz"],
    cornerRadius: 205,
    bezelRatio: 0.0224,
    notchType: "hole",
    buttons: [
      { side: "right", yOffset: 0.25, height: 0.04 },
      { side: "right", yOffset: 0.35, height: 0.08 },
    ],
  },
  {
    id: "pixel-8-pro",
    name: "Google Pixel 8 Pro",
    store: "android",
    width: 1344,
    height: 2992,
    colors: ["Obsidian", "Porcelain", "Bay", "Mint"],
    cornerRadius: 94,
    bezelRatio: 0.0327,
    notchType: "hole",
    buttons: [
      { side: "right", yOffset: 0.25, height: 0.04 },
      { side: "right", yOffset: 0.35, height: 0.08 },
    ],
  },
  {
    id: "pixel-8",
    name: "Google Pixel 8",
    store: "android",
    width: 1280,
    height: 2856,
    colors: ["Obsidian", "Hazel", "Rose", "Mint"],
    cornerRadius: 88,
    bezelRatio: 0.0327,
    notchType: "hole",
    buttons: [
      { side: "right", yOffset: 0.25, height: 0.04 },
      { side: "right", yOffset: 0.35, height: 0.08 },
    ],
  },
  {
    id: "samsung-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    store: "android",
    width: 1440,
    height: 3120,
    colors: ["Titanium Black", "Titanium Gray", "Titanium Silverblue", "Titanium Whitesilver"],
    cornerRadius: 77,
    bezelRatio: 0.0147,
    notchType: "hole",
    buttons: [
      { side: "right", yOffset: 0.25, height: 0.08 },
      { side: "right", yOffset: 0.4, height: 0.04 },
    ],
  },
  {
    id: "galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    store: "android",
    width: 1440,
    height: 3120,
    colors: ["Titanium Black", "Titanium Gray", "Titanium Violet", "Titanium Yellow"],
    cornerRadius: 7,
    bezelRatio: 0.0233,
    notchType: "hole",
    buttons: [
      { side: "right", yOffset: 0.25, height: 0.08 },
      { side: "right", yOffset: 0.4, height: 0.04 },
    ],
  },
  {
    id: "samsung-tab-s9-ultra",
    name: "Samsung Galaxy Tab S9 Ultra (14.6\")",
    store: "android",
    width: 1848,
    height: 2960,
    colors: ["Graphite", "Beige"],
    cornerRadius: 60,
    bezelRatio: 0.018,
    notchType: "notch",
    buttons: [
      { side: "top", yOffset: 0.12, height: 0.04 },
      { side: "top", yOffset: 0.18, height: 0.04 },
    ],
  },
  {
    id: "samsung-tab-s7-plus",
    name: "Samsung Galaxy Tab S7+ (12.4\")",
    store: "android",
    width: 1752,
    height: 2800,
    colors: ["Mystic Black", "Mystic Silver", "Mystic Bronze", "Mystic Navy"],
    cornerRadius: 64,
    bezelRatio: 0.024,
    notchType: "none",
    buttons: [
      { side: "top", yOffset: 0.15, height: 0.04 },
      { side: "top", yOffset: 0.22, height: 0.04 },
    ],
  },
  {
    id: "samsung-tab-a",
    name: "Samsung Galaxy Tab A (10.4\")",
    store: "android",
    width: 1200,
    height: 1920,
    colors: ["Graphite", "Silver", "Navy"],
    cornerRadius: 68,
    bezelRatio: 0.034,
    notchType: "none",
    buttons: [
      { side: "right", yOffset: 0.15, height: 0.04 },
      { side: "right", yOffset: 0.22, height: 0.04 },
    ],
  },
  {
    id: "samsung-tab-s10-ultra",
    name: "Samsung Galaxy Tab S10 Ultra (14.6\")",
    store: "android",
    width: 1848,
    height: 2960,
    colors: ["Moonstone Gray", "Platinum Silver"],
    cornerRadius: 62,
    bezelRatio: 0.020,
    notchType: "notch",
    buttons: [
      { side: "top", yOffset: 0.15, height: 0.04 },
      { side: "top", yOffset: 0.22, height: 0.04 },
    ],
  },
  {
    id: "pixel-slate",
    name: "Google Pixel Slate (12.3\")",
    store: "android",
    width: 2000,
    height: 3000,
    colors: ["Midnight Blue", "Obsidian"],
    cornerRadius: 68,
    bezelRatio: 0.028,
    notchType: "none",
    buttons: [
      { side: "top", yOffset: 0.85, height: 0.04 },
      { side: "left", yOffset: 0.15, height: 0.06 },
    ],
  },
  {
    id: "pixel-tablet",
    name: "Google Pixel Tablet (11\")",
    store: "android",
    width: 1600,
    height: 2560,
    colors: ["Porcelain", "Hazel", "Rose"],
    cornerRadius: 78,
    bezelRatio: 0.032,
    notchType: "none",
    buttons: [
      { side: "top", yOffset: 0.82, height: 0.05 },
      { side: "right", yOffset: 0.15, height: 0.04 },
    ],
  },
];

export const ALL_DEVICES = [...IOS_DEVICES, ...ANDROID_DEVICES];

export const isTabletDevice = (device?: DeviceModel | string | null): boolean => {
  if (!device) return false;
  const id = typeof device === "string" ? device : device.id;
  const lower = (id || "").toLowerCase();
  return lower.includes("ipad") || lower.includes("tab") || lower.includes("slate");
};

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
