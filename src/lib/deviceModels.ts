// Device model definitions for iOS and Android
// Used in ScreenSetRow for the device model dropdown

export interface DeviceModel {
  id: string;
  name: string;
  shortName: string;
  platform: "ios" | "android";
  year: number;
  /** Aspect ratio category for frame rendering */
  aspectCategory: "tall" | "standard" | "wide";
}

export const IOS_MODELS: DeviceModel[] = [
  { id: "iphone-13",          name: "iPhone 13",         shortName: "13",      platform: "ios", year: 2021, aspectCategory: "tall"     },
  { id: "iphone-13-pro",      name: "iPhone 13 Pro",     shortName: "13P",     platform: "ios", year: 2021, aspectCategory: "tall"     },
  { id: "iphone-13-pro-max",  name: "iPhone 13 Pro Max", shortName: "13PM",    platform: "ios", year: 2021, aspectCategory: "tall"     },
  { id: "iphone-14",          name: "iPhone 14",         shortName: "14",      platform: "ios", year: 2022, aspectCategory: "tall"     },
  { id: "iphone-14-plus",     name: "iPhone 14 Plus",    shortName: "14+",     platform: "ios", year: 2022, aspectCategory: "tall"     },
  { id: "iphone-14-pro",      name: "iPhone 14 Pro",     shortName: "14P",     platform: "ios", year: 2022, aspectCategory: "tall"     },
  { id: "iphone-14-pro-max",  name: "iPhone 14 Pro Max", shortName: "14PM",    platform: "ios", year: 2022, aspectCategory: "tall"     },
  { id: "iphone-15",          name: "iPhone 15",         shortName: "15",      platform: "ios", year: 2023, aspectCategory: "tall"     },
  { id: "iphone-15-plus",     name: "iPhone 15 Plus",    shortName: "15+",     platform: "ios", year: 2023, aspectCategory: "tall"     },
  { id: "iphone-15-pro",      name: "iPhone 15 Pro",     shortName: "15P",     platform: "ios", year: 2023, aspectCategory: "tall"     },
  { id: "iphone-15-pro-max",  name: "iPhone 15 Pro Max", shortName: "15PM",    platform: "ios", year: 2023, aspectCategory: "tall"     },
  { id: "iphone-16",          name: "iPhone 16",         shortName: "16",      platform: "ios", year: 2024, aspectCategory: "tall"     },
  { id: "iphone-16-plus",     name: "iPhone 16 Plus",    shortName: "16+",     platform: "ios", year: 2024, aspectCategory: "tall"     },
  { id: "iphone-16-pro",      name: "iPhone 16 Pro",     shortName: "16P",     platform: "ios", year: 2024, aspectCategory: "tall"     },
  { id: "iphone-16-pro-max",  name: "iPhone 16 Pro Max", shortName: "16PM",    platform: "ios", year: 2024, aspectCategory: "tall"     },
  { id: "iphone-17",          name: "iPhone 17",         shortName: "17",      platform: "ios", year: 2025, aspectCategory: "tall"     },
  { id: "iphone-17-plus",     name: "iPhone 17 Plus",    shortName: "17+",     platform: "ios", year: 2025, aspectCategory: "tall"     },
  { id: "iphone-17-pro",      name: "iPhone 17 Pro",     shortName: "17P",     platform: "ios", year: 2025, aspectCategory: "tall"     },
  { id: "iphone-17-pro-max",  name: "iPhone 17 Pro Max", shortName: "17PM",    platform: "ios", year: 2025, aspectCategory: "tall"     },
  { id: "ipad-pro-11",        name: "iPad Pro 11\"",     shortName: "iPad 11", platform: "ios", year: 2024, aspectCategory: "standard" },
  { id: "ipad-pro-13",        name: "iPad Pro 13\"",     shortName: "iPad 13", platform: "ios", year: 2024, aspectCategory: "standard" },
];

export const ANDROID_MODELS: DeviceModel[] = [
  { id: "pixel-7",           name: "Pixel 7",           shortName: "P7",       platform: "android", year: 2022, aspectCategory: "tall" },
  { id: "pixel-7-pro",       name: "Pixel 7 Pro",       shortName: "P7P",      platform: "android", year: 2022, aspectCategory: "tall" },
  { id: "pixel-8",           name: "Pixel 8",           shortName: "P8",       platform: "android", year: 2023, aspectCategory: "tall" },
  { id: "pixel-8-pro",       name: "Pixel 8 Pro",       shortName: "P8P",      platform: "android", year: 2023, aspectCategory: "tall" },
  { id: "pixel-9",           name: "Pixel 9",           shortName: "P9",       platform: "android", year: 2024, aspectCategory: "tall" },
  { id: "pixel-9-pro",       name: "Pixel 9 Pro",       shortName: "P9P",      platform: "android", year: 2024, aspectCategory: "tall" },
  { id: "pixel-9-pro-xl",    name: "Pixel 9 Pro XL",    shortName: "P9PXL",    platform: "android", year: 2024, aspectCategory: "tall" },
  { id: "pixel-fold",        name: "Pixel Fold",        shortName: "P Fold",   platform: "android", year: 2023, aspectCategory: "wide" },
  { id: "samsung-s23",       name: "Samsung S23",       shortName: "S23",      platform: "android", year: 2023, aspectCategory: "tall" },
  { id: "samsung-s23-plus",  name: "Samsung S23+",      shortName: "S23+",     platform: "android", year: 2023, aspectCategory: "tall" },
  { id: "samsung-s23-ultra", name: "Samsung S23 Ultra", shortName: "S23U",     platform: "android", year: 2023, aspectCategory: "tall" },
  { id: "samsung-s24",       name: "Samsung S24",       shortName: "S24",      platform: "android", year: 2024, aspectCategory: "tall" },
  { id: "samsung-s24-plus",  name: "Samsung S24+",      shortName: "S24+",     platform: "android", year: 2024, aspectCategory: "tall" },
  { id: "samsung-s24-ultra", name: "Samsung S24 Ultra", shortName: "S24U",     platform: "android", year: 2024, aspectCategory: "tall" },
  { id: "samsung-s25",       name: "Samsung S25",       shortName: "S25",      platform: "android", year: 2025, aspectCategory: "tall" },
  { id: "samsung-s25-ultra", name: "Samsung S25 Ultra", shortName: "S25U",     platform: "android", year: 2025, aspectCategory: "tall" },
  { id: "oneplus-12",        name: "OnePlus 12",        shortName: "OP12",     platform: "android", year: 2024, aspectCategory: "tall" },
];

export const ALL_MODELS: DeviceModel[] = [...IOS_MODELS, ...ANDROID_MODELS];

export function getModelsForPlatform(platform: "ios" | "android"): DeviceModel[] {
  return platform === "ios" ? IOS_MODELS : ANDROID_MODELS;
}

export function findModel(id: string): DeviceModel | undefined {
  return ALL_MODELS.find((m) => m.id === id);
}

// Device frame colors by platform
export interface DeviceColor {
  id: string;
  name: string;
  hex: string;
  platform: "ios" | "android" | "all";
}

export const IOS_COLORS: DeviceColor[] = [
  { id: "black",              name: "Black",              hex: "#1a1a1a", platform: "ios" },
  { id: "white",              name: "White",              hex: "#f5f5f7", platform: "ios" },
  { id: "titanium-natural",   name: "Natural Titanium",   hex: "#9a8f84", platform: "ios" },
  { id: "titanium-desert",    name: "Desert Titanium",    hex: "#d4a676", platform: "ios" },
  { id: "titanium-black",     name: "Black Titanium",     hex: "#2d2d2d", platform: "ios" },
  { id: "titanium-white",     name: "White Titanium",     hex: "#e8e8e8", platform: "ios" },
  { id: "blue",               name: "Blue",               hex: "#2a5caf", platform: "ios" },
  { id: "pink",               name: "Pink",               hex: "#e8a0b0", platform: "ios" },
  { id: "teal",               name: "Teal",               hex: "#4a9e9a", platform: "ios" },
  { id: "ultramarine",        name: "Ultramarine",        hex: "#3a4a9e", platform: "ios" },
];

export const ANDROID_COLORS: DeviceColor[] = [
  { id: "black",       name: "Obsidian",   hex: "#1a1a1a", platform: "android" },
  { id: "white",       name: "Porcelain",  hex: "#f0ede8", platform: "android" },
  { id: "hazel",       name: "Hazel",      hex: "#6b6b4f", platform: "android" },
  { id: "rose",        name: "Rose Quartz",hex: "#c8a0a0", platform: "android" },
  { id: "sage",        name: "Sage",       hex: "#7a8c72", platform: "android" },
  { id: "coral",       name: "Coral",      hex: "#d4785a", platform: "android" },
];
