export interface TextGradientPreset {
  id: string;
  name: string;
  category: "metallic" | "neon" | "aesthetic" | "clean";
  gradientStops: Array<{ color: string; position: number }>;
  direction: "horizontal" | "vertical" | "diagonal";
  glow?: {
    color: string;
    blur: number;
  };
  textColor: string;
  previewBg: string;
}

export const TEXT_GRADIENT_PRESETS: TextGradientPreset[] = [
  {
    id: "gold-luxury",
    name: "Gold Luxury",
    category: "metallic",
    gradientStops: [
      { color: "#FFE259", position: 0 },
      { color: "#FFA751", position: 100 },
    ],
    direction: "diagonal",
    glow: {
      color: "rgba(255, 175, 60, 0.45)",
      blur: 18,
    },
    textColor: "#FFE259",
    previewBg: "linear-gradient(135deg, #FFE259 0%, #FFA751 100%)",
  },
  {
    id: "silver-chrome",
    name: "Silver Chrome",
    category: "metallic",
    gradientStops: [
      { color: "#FFFFFF", position: 0 },
      { color: "#CBD5E1", position: 50 },
      { color: "#94A3B8", position: 100 },
    ],
    direction: "diagonal",
    glow: {
      color: "rgba(255, 255, 255, 0.35)",
      blur: 14,
    },
    textColor: "#F8FAFC",
    previewBg: "linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 50%, #94A3B8 100%)",
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    category: "metallic",
    gradientStops: [
      { color: "#FEE140", position: 0 },
      { color: "#FA709A", position: 100 },
    ],
    direction: "diagonal",
    glow: {
      color: "rgba(250, 112, 154, 0.45)",
      blur: 16,
    },
    textColor: "#FEE140",
    previewBg: "linear-gradient(135deg, #FEE140 0%, #FA709A 100%)",
  },
  {
    id: "neon-cyberpunk",
    name: "Neon Cyberpunk",
    category: "neon",
    gradientStops: [
      { color: "#00F2FE", position: 0 },
      { color: "#4FACFE", position: 100 },
    ],
    direction: "horizontal",
    glow: {
      color: "rgba(0, 242, 254, 0.65)",
      blur: 22,
    },
    textColor: "#00F2FE",
    previewBg: "linear-gradient(90deg, #00F2FE 0%, #4FACFE 100%)",
  },
  {
    id: "sunset-glow",
    name: "Sunset Glow",
    category: "aesthetic",
    gradientStops: [
      { color: "#FF0844", position: 0 },
      { color: "#FFB199", position: 100 },
    ],
    direction: "diagonal",
    glow: {
      color: "rgba(255, 8, 68, 0.45)",
      blur: 18,
    },
    textColor: "#FF0844",
    previewBg: "linear-gradient(135deg, #FF0844 0%, #FFB199 100%)",
  },
  {
    id: "emerald-matrix",
    name: "Emerald Matrix",
    category: "neon",
    gradientStops: [
      { color: "#4E65FF", position: 0 },
      { color: "#92EFFD", position: 100 },
    ],
    direction: "diagonal",
    glow: {
      color: "rgba(78, 101, 255, 0.5)",
      blur: 20,
    },
    textColor: "#92EFFD",
    previewBg: "linear-gradient(135deg, #4E65FF 0%, #92EFFD 100%)",
  },
  {
    id: "electric-violet",
    name: "Electric Violet",
    category: "neon",
    gradientStops: [
      { color: "#C471ED", position: 0 },
      { color: "#F64F59", position: 100 },
    ],
    direction: "diagonal",
    glow: {
      color: "rgba(196, 113, 237, 0.55)",
      blur: 20,
    },
    textColor: "#C471ED",
    previewBg: "linear-gradient(135deg, #C471ED 0%, #F64F59 100%)",
  },
  {
    id: "oled-pure-glow",
    name: "OLED Ice Glow",
    category: "clean",
    gradientStops: [
      { color: "#FFFFFF", position: 0 },
      { color: "#E0F2FE", position: 100 },
    ],
    direction: "vertical",
    glow: {
      color: "rgba(56, 189, 248, 0.6)",
      blur: 24,
    },
    textColor: "#FFFFFF",
    previewBg: "linear-gradient(180deg, #FFFFFF 0%, #E0F2FE 100%)",
  },
  {
    id: "midnight-titanium",
    name: "Dark Titanium",
    category: "metallic",
    gradientStops: [
      { color: "#94A3B8", position: 0 },
      { color: "#475569", position: 100 },
    ],
    direction: "vertical",
    glow: {
      color: "rgba(148, 163, 184, 0.3)",
      blur: 12,
    },
    textColor: "#CBD5E1",
    previewBg: "linear-gradient(180deg, #94A3B8 0%, #475569 100%)",
  },
  {
    id: "solid-white",
    name: "Solid White (Clean)",
    category: "clean",
    gradientStops: [
      { color: "#FFFFFF", position: 0 },
      { color: "#FFFFFF", position: 100 },
    ],
    direction: "horizontal",
    textColor: "#FFFFFF",
    previewBg: "#FFFFFF",
  },
];

export function getTextGradientPreset(id: string): TextGradientPreset | undefined {
  return TEXT_GRADIENT_PRESETS.find((p) => p.id === id);
}
