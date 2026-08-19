"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import { toast } from "@/lib/store/toastStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";

// ── Google Fonts loader ────────────────────────────────────────────────────────
const GOOGLE_FONTS = [
  "Inter", "Roboto", "Poppins", "Montserrat", "Lato", "Oswald",
  "Raleway", "Nunito", "Playfair Display", "Merriweather",
  "Ubuntu", "Quicksand", "Josefin Sans", "Barlow",
  "Exo 2", "Syne", "Space Grotesk", "DM Sans", "Plus Jakarta Sans",
  "Outfit", "Cabin", "Bebas Neue", "Anton",
];

// ── Text preset categories ─────────────────────────────────────────────────────
interface TextPresetItem {
  label: string;
  preview?: {
    text: string;
    fontSize: number;
    fontWeight: number;
    letterSpacing?: number;
    lineHeight?: number;
    uppercase?: boolean;
    isMuted?: boolean;
  };
  customPreview?: React.ReactNode;
  layer: Record<string, any>;
}

interface PresetCategory {
  name: string;
  presets: TextPresetItem[];
}

const PRESET_CATEGORIES: PresetCategory[] = [
  {
    name: "Niche Copy (AI)",
    presets: [
      {
        label: "Fitness & Gym",
        preview: { text: "Crush Every Workout", fontSize: 16, fontWeight: 800 },
        layer: {
          type: "text", content: "Crush Every Workout",
          fontSize: 130, fontWeight: 800, fontFamily: "Inter",
          color: "#ffffff", align: "center", lineHeight: 1.1,
          letterSpacing: -1, width: 1100, height: 280,
        },
      },
      {
        label: "Finance & Wealth",
        preview: { text: "Grow Wealth Automatically", fontSize: 16, fontWeight: 800 },
        layer: {
          type: "text", content: "Grow Wealth Automatically",
          fontSize: 125, fontWeight: 800, fontFamily: "Inter",
          color: "#ffffff", align: "center", lineHeight: 1.1,
          letterSpacing: -1, width: 1100, height: 280,
        },
      },
      {
        label: "AI Productivity",
        preview: { text: "10x Your Productivity", fontSize: 16, fontWeight: 800 },
        layer: {
          type: "text", content: "10x Your Productivity",
          fontSize: 130, fontWeight: 800, fontFamily: "Inter",
          color: "#ffffff", align: "center", lineHeight: 1.1,
          letterSpacing: -1, width: 1100, height: 280,
        },
      },
      {
        label: "Sleep & Calm",
        preview: { text: "Fall Asleep Faster", fontSize: 16, fontWeight: 800 },
        layer: {
          type: "text", content: "Fall Asleep Faster",
          fontSize: 135, fontWeight: 800, fontFamily: "Inter",
          color: "#ffffff", align: "center", lineHeight: 1.1,
          letterSpacing: -1, width: 1100, height: 280,
        },
      },
      {
        label: "Dating & Meet",
        preview: { text: "Meet Someone Real", fontSize: 16, fontWeight: 800 },
        layer: {
          type: "text", content: "Meet Someone Real",
          fontSize: 130, fontWeight: 800, fontFamily: "Inter",
          color: "#ffffff", align: "center", lineHeight: 1.1,
          letterSpacing: -1, width: 1100, height: 280,
        },
      },
      {
        label: "Travel & Stays",
        preview: { text: "Book Dream Getaways", fontSize: 16, fontWeight: 800 },
        layer: {
          type: "text", content: "Book Dream Getaways",
          fontSize: 125, fontWeight: 800, fontFamily: "Inter",
          color: "#ffffff", align: "center", lineHeight: 1.1,
          letterSpacing: -1, width: 1100, height: 280,
        },
      },
    ],
  },
  {
    name: "Headlines",
    presets: [
      {
        label: "Big Title",
        preview: { text: "Big Title", fontSize: 24, fontWeight: 800, letterSpacing: -1 },
        layer: {
          type: "text", content: "Your Big Title",
          fontSize: 140, fontWeight: 800, fontFamily: "Inter",
          color: "#ffffff", align: "left", lineHeight: 1.1,
          letterSpacing: -2, width: 1000, height: 300,
        },
      },
      {
        label: "Display XL",
        preview: { text: "DISPLAY XL", fontSize: 22, fontWeight: 900, letterSpacing: 2, uppercase: true },
        layer: {
          type: "text", content: "DISPLAY",
          fontSize: 200, fontWeight: 900, fontFamily: "Inter",
          color: "#ffffff", align: "center", lineHeight: 1.0,
          letterSpacing: 8, width: 1290, height: 350,
        },
      },
      {
        label: "Hero Split",
        preview: { text: "Hero\nHeadline", fontSize: 20, fontWeight: 800, lineHeight: 1.05 },
        layer: {
          type: "text", content: "Big\nHeadline",
          fontSize: 160, fontWeight: 800, fontFamily: "Inter",
          color: "#ffffff", align: "left", lineHeight: 1.0,
          letterSpacing: -3, width: 1000, height: 480,
        },
      },
    ],
  },
  {
    name: "Subtitles",
    presets: [
      {
        label: "Subtitle",
        preview: { text: "One clear subtitle for your app", fontSize: 13, fontWeight: 500, isMuted: true },
        layer: {
          type: "text", content: "One clear subtitle",
          fontSize: 60, fontWeight: 500, fontFamily: "Inter",
          color: "rgba(255,255,255,0.8)", align: "left", lineHeight: 1.3,
          letterSpacing: 0, width: 1000, height: 120,
        },
      },
      {
        label: "Description",
        preview: { text: "Describe your key features\nin two short clear lines", fontSize: 12, fontWeight: 400, isMuted: true, lineHeight: 1.4 },
        layer: {
          type: "text", content: "Describe your app\nin two short lines",
          fontSize: 52, fontWeight: 400, fontFamily: "Inter",
          color: "rgba(255,255,255,0.75)", align: "left", lineHeight: 1.5,
          letterSpacing: 0, width: 1000, height: 200,
        },
      },
      {
        label: "Eyebrow",
        preview: { text: "NEW FEATURE", fontSize: 10, fontWeight: 700, letterSpacing: 2.5, uppercase: true, isMuted: true },
        layer: {
          type: "text", content: "NEW FEATURE",
          fontSize: 36, fontWeight: 700, fontFamily: "Inter",
          color: "rgba(255,255,255,0.65)", align: "left", lineHeight: 1.2,
          letterSpacing: 6, width: 800, height: 80,
        },
      },
    ],
  },
  {
    name: "Labels",
    presets: [
      {
        label: "Tagline",
        preview: { text: "THE APP FOR EVERYONE", fontSize: 11, fontWeight: 600, letterSpacing: 2, uppercase: true },
        layer: {
          type: "text", content: "THE APP FOR EVERYONE",
          fontSize: 44, fontWeight: 600, fontFamily: "Inter",
          color: "rgba(255,255,255,0.9)", align: "center", lineHeight: 1.3,
          letterSpacing: 6, width: 1100, height: 80,
        },
      },
      {
        label: "Rating / Proof Pill",
        preview: { text: "★ 4.9 · 10M+ Downloads", fontSize: 11, fontWeight: 600 },
        layer: {
          type: "text", content: "★ 4.9  ·  10M+ Downloads",
          fontSize: 46, fontWeight: 600, fontFamily: "Inter",
          color: "rgba(255,255,255,0.85)", align: "center", lineHeight: 1.2,
          letterSpacing: 1, width: 900, height: 80,
        },
      },
      {
        label: "Store Availability",
        preview: { text: "Available on App Store & Google Play", fontSize: 10, fontWeight: 400, isMuted: true },
        layer: {
          type: "text", content: "Available on App Store & Google Play",
          fontSize: 38, fontWeight: 400, fontFamily: "Inter",
          color: "rgba(255,255,255,0.55)", align: "center", lineHeight: 1.5,
          letterSpacing: 0, width: 1100, height: 70,
        },
      },
    ],
  },
  {
    name: "Styles",
    presets: [
      {
        label: "Pill Tag",
        customPreview: (
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-[11px] font-bold tracking-wider uppercase">
            NEW · FEATURE
          </div>
        ),
        layer: {
          type: "text", content: "NEW  ·  FEATURE",
          fontSize: 40, fontWeight: 700, fontFamily: "Inter",
          color: "#ffffff", align: "center", lineHeight: 1.2,
          letterSpacing: 4, width: 800, height: 100,
          highlight: { color: "rgba(255,255,255,0.15)", paddingX: 30, paddingY: 15, cornerRadius: 50 },
        },
      },
      {
        label: "Card Container",
        customPreview: (
          <div className="w-full px-3 py-2 rounded-xl bg-card border border-border/80 shadow-xs text-foreground text-xs font-semibold text-center">
            Important Message Card
          </div>
        ),
        layer: {
          type: "text", content: "Important Message",
          fontSize: 70, fontWeight: 600, fontFamily: "Inter",
          color: "#111827", align: "center", lineHeight: 1.3,
          letterSpacing: 0, width: 1000, height: 160,
          highlight: { color: "#ffffff", paddingX: 40, paddingY: 30, cornerRadius: 24 },
        },
      },
      {
        label: "Highlight Badge",
        customPreview: (
          <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-400/25 border border-amber-400/50 text-amber-800 dark:text-amber-300 text-xs font-bold">
            Stand Out!
          </div>
        ),
        layer: {
          type: "text", content: "Stand Out!",
          fontSize: 90, fontWeight: 800, fontFamily: "Inter",
          color: "#1a1a2e", align: "center", lineHeight: 1.2,
          letterSpacing: -1, width: 900, height: 150,
          highlight: { color: "#fbbf24", paddingX: 20, paddingY: 10, cornerRadius: 8 },
        },
      },
      {
        label: "Outline Headline",
        customPreview: (
          <div
            className="text-lg font-black uppercase tracking-wider text-foreground"
            style={{
              WebkitTextStroke: "1px currentColor",
              WebkitTextFillColor: "transparent",
            }}
          >
            OUTLINE
          </div>
        ),
        layer: {
          type: "text", content: "OUTLINE",
          fontSize: 160, fontWeight: 900, fontFamily: "Inter",
          color: "transparent", align: "center", lineHeight: 1.0,
          letterSpacing: 4, width: 1100, height: 250,
          stroke: { color: "#ffffff", width: 4 },
        },
      },
      {
        label: "Neon Glow",
        customPreview: (
          <div className="text-sm font-bold text-violet-600 dark:text-violet-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]">
            Glowing Title
          </div>
        ),
        layer: {
          type: "text", content: "Glowing Title",
          fontSize: 120, fontWeight: 700, fontFamily: "Inter",
          color: "#ffffff", align: "center", lineHeight: 1.2,
          letterSpacing: 0, width: 1100, height: 200,
          shadow: { color: "#8b5cf6", blur: 40, offsetX: 0, offsetY: 0 },
        },
      },
    ],
  },
];

// ── Font selector row ─────────────────────────────────────────────────────────
function FontRow() {
  const { getActiveSet, getActiveScreen, getActiveLayer, updateLayer } = useEditorStore();
  const layer = getActiveLayer();
  const set = getActiveSet();
  const screen = getActiveScreen();
  const [search, setSearch] = useState("");

  if (!layer || layer.type !== "text" || !set || !screen) return null;

  const tl = layer as import("@/lib/types").TextLayer;
  const filtered = GOOGLE_FONTS.filter((f) => f.toLowerCase().includes(search.toLowerCase()));

  const loadFont = (fontName: string) => {
    if (fontName === "Inter") return;
    const href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;600;800&display=swap`;
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  };

  return (
    <div className="px-4 pt-3 pb-3 border-b border-border/40 bg-card/40">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Font Family</p>
        <span className="text-[10px] text-primary font-medium">{tl.fontFamily || "Inter"}</span>
      </div>
      <input
        type="text"
        placeholder="Search 20+ Google fonts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-2 px-2.5 py-1.5 rounded-lg bg-secondary/80 border border-border/40 text-xs outline-none text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/40"
      />
      <div className="flex flex-col gap-1 max-h-44 overflow-y-auto pr-1">
        {filtered.map((font) => {
          loadFont(font);
          const isSelected = (tl.fontFamily || "Inter") === font;
          return (
            <button
              key={font}
              type="button"
              onClick={() => {
                loadFont(font);
                updateLayer(set.id, screen.id, layer.id, { fontFamily: font } as Partial<import("@/lib/types").Layer>);
                useEditorStore.getState().recordHistory();
                toast.info(`Font set to ${font}`);
              }}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-left",
                isSelected
                  ? "bg-primary/20 text-primary ring-1 ring-primary/40 font-semibold"
                  : "hover:bg-secondary/80 text-foreground"
              )}
            >
              <span style={{ fontFamily: `"${font}", sans-serif` }} className="text-sm">
                {font}
              </span>
              <span className="text-[10px] opacity-60 font-mono" style={{ fontFamily: `"${font}", sans-serif` }}>
                Aa 123
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main TextPanel ─────────────────────────────────────────────────────────────
export function TextPanel() {
  const { getActiveSet, getActiveScreen, addLayer, getActiveLayer } = useEditorStore();
  const [activeCategory, setActiveCategory] = useState("Headlines");
  const activeLayer = getActiveLayer();
  const hasTextLayer = activeLayer?.type === "text";

  const handleAdd = (preset: (typeof PRESET_CATEGORIES)[0]["presets"][0]) => {
    const set = getActiveSet();
    const screen = getActiveScreen();
    if (!set || !screen) return;

    // Load Google Font if needed
    const font = (preset.layer as { fontFamily?: string }).fontFamily;
    if (font && font !== "Inter") {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;500;600;700;800;900&display=swap`;
      if (!document.querySelector(`link[href="${link.href}"]`)) {
        document.head.appendChild(link);
      }
    }

    addLayer(set.id, screen.id, {
      ...preset.layer,
      x: Math.round(screen.width / 2 - ((preset.layer as { width: number }).width ?? 1000) / 2),
      y: Math.round(screen.height * 0.22),
      rotation: 0,
      opacity: 1,
    } as Parameters<typeof addLayer>[2]);
  };

  const category = PRESET_CATEGORIES.find((c) => c.name === activeCategory) ?? PRESET_CATEGORIES[0];

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* Font selector — shown when text layer is active */}
      {hasTextLayer && <FontRow />}

      {/* Category tabs */}
      <div className="flex gap-1 px-3 pt-3 pb-2 shrink-0 overflow-x-auto">
        {PRESET_CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            type="button"
            onClick={() => setActiveCategory(cat.name)}
            className={cn(
              "shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all",
              activeCategory === cat.name
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <p className="px-4 text-[10px] text-muted-foreground mb-1">Click to add to active screen</p>

      <ScrollArea className="flex-1 min-h-0 overflow-hidden">
        <div className="px-3 pb-16 space-y-2">
          {category.presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handleAdd(preset)}
              className="w-full text-left px-4 py-3.5 rounded-xl bg-secondary/50 hover:bg-secondary/90 border border-border/50 hover:border-primary/40 hover:ring-1 hover:ring-primary/30 transition-all group relative overflow-hidden cursor-pointer"
            >
              {/* Custom Preview or theme-adaptive text preview */}
              {preset.customPreview ? (
                <div className="w-full flex items-center justify-start py-0.5">
                  {preset.customPreview}
                </div>
              ) : preset.preview ? (
                <div
                  className={cn(
                    "leading-tight truncate transition-colors",
                    preset.preview.isMuted
                      ? "text-muted-foreground group-hover:text-foreground"
                      : "text-foreground group-hover:text-primary"
                  )}
                  style={{
                    fontSize: preset.preview.fontSize,
                    fontWeight: preset.preview.fontWeight,
                    letterSpacing: preset.preview.letterSpacing ?? 0,
                    lineHeight: preset.preview.lineHeight ?? 1.2,
                    textTransform: preset.preview.uppercase ? "uppercase" : "none",
                    whiteSpace: "pre",
                  }}
                >
                  {preset.preview.text}
                </div>
              ) : null}

              {/* Label */}
              <p className="text-[10px] font-medium text-muted-foreground mt-1.5 group-hover:text-primary transition-colors">
                {preset.label}
              </p>
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
