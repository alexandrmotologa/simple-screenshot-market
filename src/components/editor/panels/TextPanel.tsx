"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";

// ── Google Fonts loader ────────────────────────────────────────────────────────
const GOOGLE_FONTS = [
  "Inter", "Roboto", "Poppins", "Montserrat", "Lato", "Oswald",
  "Raleway", "Nunito", "Playfair Display", "Merriweather",
  "Ubuntu", "Quicksand", "Josefin Sans", "Barlow",
  "Exo 2", "Syne", "Space Grotesk", "DM Sans", "Plus Jakarta Sans",
  "Outfit", "Cabin", "Geist Sans", "Bebas Neue", "Anton",
];

// ── Text preset categories ─────────────────────────────────────────────────────
const PRESET_CATEGORIES = [
  {
    name: "Headlines",
    presets: [
      {
        label: "Big Title",
        preview: { text: "Big Title", fontSize: 28, fontWeight: 800, letterSpacing: -1.5 },
        layer: {
          type: "text", content: "Your Big Title",
          fontSize: 140, fontWeight: 800, fontFamily: "Geist Sans",
          color: "#ffffff", align: "left", lineHeight: 1.1,
          letterSpacing: -2, width: 1000, height: 300,
        },
      },
      {
        label: "Display XL",
        preview: { text: "DISPLAY", fontSize: 26, fontWeight: 900, letterSpacing: 2, uppercase: true },
        layer: {
          type: "text", content: "DISPLAY",
          fontSize: 200, fontWeight: 900, fontFamily: "Geist Sans",
          color: "#ffffff", align: "center", lineHeight: 1.0,
          letterSpacing: 8, width: 1290, height: 350,
        },
      },
      {
        label: "Hero Split",
        preview: { text: "Big\nHeadline", fontSize: 22, fontWeight: 800, lineHeight: 1.0 },
        layer: {
          type: "text", content: "Big\nHeadline",
          fontSize: 160, fontWeight: 800, fontFamily: "Geist Sans",
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
        preview: { text: "One clear subtitle", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.7)" },
        layer: {
          type: "text", content: "One clear subtitle",
          fontSize: 60, fontWeight: 500, fontFamily: "Geist Sans",
          color: "rgba(255,255,255,0.8)", align: "left", lineHeight: 1.3,
          letterSpacing: 0, width: 1000, height: 120,
        },
      },
      {
        label: "Description",
        preview: { text: "Describe your app\nin two short lines", fontSize: 12, fontWeight: 400, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 },
        layer: {
          type: "text", content: "Describe your app\nin two short lines",
          fontSize: 52, fontWeight: 400, fontFamily: "Geist Sans",
          color: "rgba(255,255,255,0.75)", align: "left", lineHeight: 1.5,
          letterSpacing: 0, width: 1000, height: 200,
        },
      },
      {
        label: "Eyebrow",
        preview: { text: "NEW FEATURE", fontSize: 10, fontWeight: 700, letterSpacing: 3, uppercase: true, color: "rgba(255,255,255,0.6)" },
        layer: {
          type: "text", content: "NEW FEATURE",
          fontSize: 36, fontWeight: 700, fontFamily: "Geist Sans",
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
        preview: { text: "THE APP FOR EVERYONE", fontSize: 10, fontWeight: 600, letterSpacing: 3, uppercase: true },
        layer: {
          type: "text", content: "THE APP FOR EVERYONE",
          fontSize: 44, fontWeight: 600, fontFamily: "Geist Sans",
          color: "rgba(255,255,255,0.9)", align: "center", lineHeight: 1.3,
          letterSpacing: 6, width: 1100, height: 80,
        },
      },
      {
        label: "Badge / Pill",
        preview: { text: "★ 4.9 · 10M+ Downloads", fontSize: 11, fontWeight: 600 },
        layer: {
          type: "text", content: "★ 4.9  ·  10M+ Downloads",
          fontSize: 46, fontWeight: 600, fontFamily: "Geist Sans",
          color: "rgba(255,255,255,0.85)", align: "center", lineHeight: 1.2,
          letterSpacing: 1, width: 900, height: 80,
        },
      },
      {
        label: "Fine Print",
        preview: { text: "Available on App Store & Google Play", fontSize: 10, fontWeight: 400, color: "rgba(255,255,255,0.5)" },
        layer: {
          type: "text", content: "Available on App Store & Google Play",
          fontSize: 38, fontWeight: 400, fontFamily: "Geist Sans",
          color: "rgba(255,255,255,0.55)", align: "center", lineHeight: 1.5,
          letterSpacing: 0, width: 1100, height: 70,
        },
      },
    ],
  },
  {
    name: "Combos",
    presets: [
      {
        label: "Title + Subtitle",
        preview: { text: "Heading\nOne clear subtitle", fontSize: 18, fontWeight: 700, lineHeight: 1.5 },
        layer: {
          type: "text", content: "Heading\nOne clear subtitle",
          fontSize: 100, fontWeight: 700, fontFamily: "Geist Sans",
          color: "#ffffff", align: "left", lineHeight: 1.2,
          letterSpacing: -1, width: 1000, height: 280,
        },
      },
      {
        label: "Eyebrow + Title",
        preview: { text: "FEATURE\nYour Big Title", fontSize: 18, fontWeight: 800, lineHeight: 1.1 },
        layer: {
          type: "text", content: "NEW  ·  FEATURE\nYour Big Title",
          fontSize: 110, fontWeight: 800, fontFamily: "Geist Sans",
          color: "#ffffff", align: "left", lineHeight: 1.1,
          letterSpacing: -1.5, width: 1050, height: 320,
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

  return (
    <div className="px-4 pt-3 pb-2 border-b border-border/30">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Font Family (selected layer)</p>
      <input
        type="text"
        placeholder="Search fonts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-2 px-2.5 py-1.5 rounded-lg bg-secondary/70 border border-border/30 text-xs outline-none text-foreground placeholder:text-muted-foreground"
      />
      <div className="flex flex-col gap-0.5 max-h-36 overflow-y-auto pr-1">
        {filtered.map((font) => (
          <button
            key={font}
            type="button"
            onClick={() => {
              updateLayer(set.id, screen.id, layer.id, { fontFamily: font } as Partial<import("@/lib/types").Layer>);
              useEditorStore.getState().recordHistory();
            }}
            className={cn(
              "text-left px-2.5 py-1.5 rounded-lg text-xs transition-all",
              tl.fontFamily === font
                ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                : "hover:bg-secondary text-foreground"
            )}
            style={{ fontFamily: `"${font}", sans-serif` }}
          >
            {font}
          </button>
        ))}
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
    if (font && font !== "Geist Sans") {
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
    <div className="flex flex-col h-full">
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
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <p className="px-4 text-[10px] text-muted-foreground mb-1">Click to add to active screen</p>

      <ScrollArea className="flex-1">
        <div className="px-3 pb-4 space-y-2">
          {category.presets.map((preset) => {
            const p = preset.preview as {
              text: string;
              fontSize: number;
              fontWeight: number;
              letterSpacing?: number;
              lineHeight?: number;
              uppercase?: boolean;
              color?: string;
            };
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleAdd(preset)}
                className="w-full text-left px-4 py-3.5 rounded-xl bg-secondary/50 hover:bg-secondary hover:ring-1 hover:ring-primary/30 transition-all group relative overflow-hidden"
              >
                {/* Preview text */}
                <div
                  className="text-foreground group-hover:text-white leading-tight truncate"
                  style={{
                    fontSize: p.fontSize,
                    fontWeight: p.fontWeight,
                    letterSpacing: p.letterSpacing ?? 0,
                    lineHeight: p.lineHeight ?? 1.2,
                    textTransform: p.uppercase ? "uppercase" : "none",
                    color: p.color ?? "inherit",
                    whiteSpace: "pre",
                  }}
                >
                  {p.text}
                </div>
                {/* Label */}
                <p className="text-[10px] text-muted-foreground mt-1.5 group-hover:text-primary/70 transition-colors">
                  {preset.label}
                </p>
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
