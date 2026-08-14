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
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max (6.9\")",
    store: "ios",
    width: 1320,
    height: 2868,
    colors: ["Black", "White", "Natural", "Desert"],
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
    colors: ["Black", "White", "Natural", "Desert"],
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
    colors: ["Black", "White", "Natural", "Desert"],
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
    colors: ["Black", "White", "Natural", "Blue"],
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
    colors: ["Black", "White", "Teal", "Pink", "Ultramarine"],
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
];

export const ANDROID_DEVICES: DeviceModel[] = [
  {
    id: "pixel-10-pro-xl",
    name: "Google Pixel 10 Pro XL",
    store: "android",
    width: 1344,
    height: 2992,
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose"],
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
    name: "Google Pixel 10 Pro",
    store: "android",
    width: 1280,
    height: 2856,
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose"],
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
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose"],
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
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose"],
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
    colors: ["Obsidian", "Porcelain", "Bay"],
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
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose"],
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
    colors: ["Titanium Gray", "Titanium Black", "Silverblue", "Whitesilver"],
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
    colors: ["Titanium", "Black"],
    cornerRadius: 7,
    bezelRatio: 0.0233,
    notchType: "hole",
    buttons: [
      { side: "right", yOffset: 0.25, height: 0.08 },
      { side: "right", yOffset: 0.4, height: 0.04 },
    ],
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
