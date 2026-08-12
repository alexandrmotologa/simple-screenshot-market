"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { nanoid } from "@/lib/utils";

interface TextPreset {
  label: string;
  preview: React.ReactNode;
  layer: Record<string, unknown>;
}

const TEXT_PRESETS: TextPreset[] = [
  {
    label: "Big Title",
    preview: <span style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.1 }}>Your Big Title</span>,
    layer: {
      type: "text",
      content: "Your Big Title",
      fontSize: 140,
      fontWeight: 800,
      fontFamily: "Geist Sans",
      color: "#ffffff",
      align: "left",
      lineHeight: 1.1,
      letterSpacing: -2,
      width: 1000,
      height: 300,
    },
  },
  {
    label: "Subtitle",
    preview: <span style={{ fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>One clear subtitle</span>,
    layer: {
      type: "text",
      content: "One clear subtitle",
      fontSize: 60,
      fontWeight: 500,
      fontFamily: "Geist Sans",
      color: "rgba(255,255,255,0.8)",
      align: "left",
      lineHeight: 1.3,
      letterSpacing: 0,
      width: 1000,
      height: 120,
    },
  },
  {
    label: "Heading + Subtitle",
    preview: (
      <div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Heading</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>One clear subtitle</div>
      </div>
    ),
    layer: {
      type: "text",
      content: "Heading\nOne clear subtitle",
      fontSize: 100,
      fontWeight: 700,
      fontFamily: "Geist Sans",
      color: "#ffffff",
      align: "left",
      lineHeight: 1.2,
      letterSpacing: -1,
      width: 1000,
      height: 280,
    },
  },
  {
    label: "Body Text",
    preview: <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Fine print or legal line here</span>,
    layer: {
      type: "text",
      content: "Fine print or legal line here",
      fontSize: 40,
      fontWeight: 400,
      fontFamily: "Geist Sans",
      color: "rgba(255,255,255,0.6)",
      align: "center",
      lineHeight: 1.5,
      letterSpacing: 0,
      width: 1000,
      height: 80,
    },
  },
  {
    label: "Stand Out Badge",
    preview: (
      <div className="flex items-center gap-2">
        <span style={{ fontSize: 16, fontWeight: 800 }}>Stand out on the store</span>
        <span style={{ fontSize: 11, border: "1px solid rgba(255,255,255,0.5)", borderRadius: 20, padding: "2px 8px" }}>100M+ Downloads</span>
      </div>
    ),
    layer: {
      type: "text",
      content: "Stand out on the store",
      fontSize: 90,
      fontWeight: 800,
      fontFamily: "Geist Sans",
      color: "#ffffff",
      align: "left",
      lineHeight: 1.1,
      letterSpacing: -2,
      width: 900,
      height: 220,
    },
  },
  {
    label: "App Tagline",
    preview: <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>THE APP FOR EVERYONE</span>,
    layer: {
      type: "text",
      content: "THE APP FOR EVERYONE",
      fontSize: 44,
      fontWeight: 600,
      fontFamily: "Geist Sans",
      color: "rgba(255,255,255,0.9)",
      align: "center",
      lineHeight: 1.3,
      letterSpacing: 4,
      width: 1100,
      height: 80,
    },
  },
];

export function TextPanel() {
  const { getActiveSet, getActiveScreen, addLayer } = useEditorStore();

  const handleAdd = (preset: TextPreset) => {
    const set = getActiveSet();
    const screen = getActiveScreen();
    if (!set || !screen) return;

    addLayer(set.id, screen.id, {
      ...preset.layer,
      x: Math.round(screen.width / 2 - (preset.layer.width as number) / 2),
      y: Math.round(screen.height * 0.25),
      rotation: 0,
      opacity: 1,
    } as Parameters<typeof addLayer>[2]);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-3">
        <p className="text-xs text-muted-foreground mb-4">
          Click a preset to add it to the active screen
        </p>

        {TEXT_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handleAdd(preset)}
            className="w-full text-left px-4 py-3 rounded-xl bg-secondary hover:bg-secondary/60 hover:ring-1 hover:ring-primary/30 transition-all group"
          >
            <div className="text-foreground group-hover:text-primary">
              {preset.preview}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">{preset.label}</p>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
