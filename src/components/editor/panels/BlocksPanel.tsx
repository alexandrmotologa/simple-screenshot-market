"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Apple, Play } from "lucide-react";

interface BlockPreset {
  id: string;
  name: string;
  preview: React.ReactNode;
  layer: Record<string, unknown>;
}

const BLOCK_PRESETS: BlockPreset[] = [
  {
    id: "pill",
    name: "Pill",
    preview: (
      <div
        className="h-8 px-5 rounded-full flex items-center justify-center text-xs font-semibold"
        style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
      >
        Tag
      </div>
    ),
    layer: {
      type: "shape",
      shape: "rectangle",
      fill: "rgba(255,255,255,0.15)",
      stroke: "rgba(255,255,255,0.25)",
      strokeWidth: 2,
      cornerRadius: 100,
      width: 320,
      height: 80,
    },
  },
  {
    id: "card",
    name: "Card",
    preview: (
      <div
        className="w-full h-16 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
      />
    ),
    layer: {
      type: "shape",
      shape: "rectangle",
      fill: "rgba(255,255,255,0.08)",
      stroke: "rgba(255,255,255,0.12)",
      strokeWidth: 1,
      cornerRadius: 32,
      width: 900,
      height: 400,
    },
  },
  {
    id: "dark",
    name: "Dark Card",
    preview: (
      <div
        className="w-full h-16 rounded-2xl"
        style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
      />
    ),
    layer: {
      type: "shape",
      shape: "rectangle",
      fill: "rgba(0,0,0,0.6)",
      stroke: "rgba(255,255,255,0.08)",
      strokeWidth: 1,
      cornerRadius: 32,
      width: 900,
      height: 400,
    },
  },
  {
    id: "highlight",
    name: "Highlight",
    preview: (
      <div
        className="h-8 px-4 rounded-lg flex items-center"
        style={{ background: "rgba(99,102,241,0.3)", border: "1px solid rgba(99,102,241,0.5)" }}
      >
        <div className="h-2 w-24 rounded-full bg-white/40" />
      </div>
    ),
    layer: {
      type: "shape",
      shape: "rectangle",
      fill: "rgba(99,102,241,0.3)",
      stroke: "rgba(99,102,241,0.5)",
      strokeWidth: 2,
      cornerRadius: 12,
      width: 700,
      height: 60,
    },
  },
  {
    id: "glow",
    name: "Glow",
    preview: (
      <div className="w-full h-20 rounded-2xl flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(139,92,246,0) 70%)",
          }}
        />
      </div>
    ),
    layer: {
      type: "shape",
      shape: "circle",
      fill: "rgba(139,92,246,0.4)",
      stroke: "transparent",
      strokeWidth: 0,
      cornerRadius: 0,
      width: 400,
      height: 400,
    },
  },
  {
    id: "outline",
    name: "Outline",
    preview: (
      <div
        className="w-full h-12 rounded-2xl"
        style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.3)" }}
      />
    ),
    layer: {
      type: "shape",
      shape: "rectangle",
      fill: "transparent",
      stroke: "rgba(255,255,255,0.3)",
      strokeWidth: 3,
      cornerRadius: 24,
      width: 900,
      height: 100,
    },
  },
  {
    id: "accent",
    name: "Accent Bar",
    preview: (
      <div
        className="w-12 h-2 rounded-full"
        style={{ background: "#6366f1" }}
      />
    ),
    layer: {
      type: "shape",
      shape: "rectangle",
      fill: "#6366f1",
      stroke: "transparent",
      strokeWidth: 0,
      cornerRadius: 8,
      width: 120,
      height: 16,
    },
  },
  {
    id: "badge",
    name: "Badge",
    preview: (
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
        style={{ background: "#6366f1", color: "#fff" }}
      >
        <span>⭐</span>
        <span>4.9</span>
      </div>
    ),
    layer: {
      type: "shape",
      shape: "rectangle",
      fill: "#6366f1",
      stroke: "transparent",
      strokeWidth: 0,
      cornerRadius: 100,
      width: 200,
      height: 70,
    },
  },
];

const SHAPE_PRESETS: BlockPreset[] = [
  {
    id: "star",
    name: "Star",
    preview: (
      <svg viewBox="0 0 48 48" className="w-10 h-10">
        <polygon
          points="24,4 29,18 44,18 32,27 36,42 24,33 12,42 16,27 4,18 19,18"
          fill="rgba(251,191,36,0.9)"
        />
      </svg>
    ),
    layer: { type: "shape", shape: "star", fill: "#FBBF24", stroke: "transparent", strokeWidth: 0, cornerRadius: 0, width: 200, height: 200 },
  },
  {
    id: "triangle",
    name: "Triangle",
    preview: (
      <svg viewBox="0 0 48 48" className="w-10 h-10">
        <polygon points="24,4 44,44 4,44" fill="rgba(99,102,241,0.9)" />
      </svg>
    ),
    layer: { type: "shape", shape: "triangle", fill: "#6366f1", stroke: "transparent", strokeWidth: 0, cornerRadius: 0, width: 200, height: 200 },
  },
  {
    id: "hexagon",
    name: "Hexagon",
    preview: (
      <svg viewBox="0 0 48 48" className="w-10 h-10">
        <polygon
          points="24,4 40,14 40,34 24,44 8,34 8,14"
          fill="rgba(20,184,166,0.9)"
        />
      </svg>
    ),
    layer: { type: "shape", shape: "hexagon", fill: "#14B8A6", stroke: "transparent", strokeWidth: 0, cornerRadius: 0, width: 200, height: 200 },
  },
  {
    id: "diamond",
    name: "Diamond",
    preview: (
      <svg viewBox="0 0 48 48" className="w-10 h-10">
        <polygon points="24,4 44,24 24,44 4,24" fill="rgba(236,72,153,0.9)" />
      </svg>
    ),
    layer: { type: "shape", shape: "diamond", fill: "#EC4899", stroke: "transparent", strokeWidth: 0, cornerRadius: 0, width: 180, height: 220 },
  },
  {
    id: "crescent",
    name: "Crescent",
    preview: (
      <svg viewBox="0 0 48 48" className="w-10 h-10">
        <path d="M 24 4 A 20 20 0 1 1 24 44 A 14 14 0 1 0 24 4 Z" fill="rgba(251,191,36,0.9)"/>
      </svg>
    ),
    layer: { type: "shape", shape: "crescent", fill: "#FBBF24", stroke: "transparent", strokeWidth: 0, cornerRadius: 0, width: 200, height: 200 },
  },
  {
    id: "arrowRight",
    name: "Arrow",
    preview: (
      <svg viewBox="0 0 48 20" className="w-14 h-6">
        <polygon points="0,6 29,6 29,0 48,10 29,20 29,14 0,14" fill="rgba(99,102,241,0.9)" />
      </svg>
    ),
    layer: { type: "shape", shape: "arrowRight", fill: "#6366f1", stroke: "transparent", strokeWidth: 0, cornerRadius: 0, width: 300, height: 120 },
  },
];

const BADGE_PRESETS: BlockPreset[] = [
  {
    id: "appstore",
    name: "App Store",
    preview: (
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-[10px] font-semibold"
        style={{ background: "#000", minWidth: 100 }}
      >
        <span className="text-base leading-none"><Apple className="w-5 h-5 fill-white" /></span>
        <div>
          <div className="text-[8px] opacity-75 font-normal">Download on the</div>
          <div className="text-sm font-bold leading-tight">App Store</div>
        </div>
      </div>
    ),
    layer: { type: "shape", shape: "appstore-badge", fill: "#000000", stroke: "rgba(255,255,255,0.2)", strokeWidth: 1, cornerRadius: 24, width: 480, height: 140 },
  },
  {
    id: "googleplay",
    name: "Google Play",
    preview: (
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-[10px] font-semibold"
        style={{ background: "#000", minWidth: 100 }}
      >
        <span className="text-base leading-none"><Play className="w-4 h-4 fill-white" /></span>
        <div>
          <div className="text-[8px] opacity-75 font-normal">GET IT ON</div>
          <div className="text-sm font-bold leading-tight">Google Play</div>
        </div>
      </div>
    ),
    layer: { type: "shape", shape: "googleplay-badge", fill: "#000000", stroke: "rgba(255,255,255,0.2)", strokeWidth: 1, cornerRadius: 24, width: 480, height: 140 },
  },
];

export function BlocksPanel() {
  const { getActiveSet, getActiveScreen, addLayer } = useEditorStore();

  const handleAdd = (preset: BlockPreset) => {
    const set = getActiveSet();
    const screen = getActiveScreen();
    if (!set || !screen) return;

    const w = preset.layer.width as number;
    const h = preset.layer.height as number;

    addLayer(set.id, screen.id, {
      ...preset.layer,
      x: Math.round((screen.width - w) / 2),
      y: Math.round((screen.height - h) / 2),
      rotation: 0,
      opacity: 1,
    } as Parameters<typeof addLayer>[2]);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">Blocks</p>
          <div className="grid grid-cols-2 gap-2">
            {BLOCK_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleAdd(preset)}
                className="flex flex-col gap-2 p-3 rounded-xl bg-secondary/60 hover:bg-secondary hover:ring-1 hover:ring-primary/30 transition-all group"
              >
                <div className="flex items-center justify-center h-14">
                  {preset.preview}
                </div>
                <p className="text-[10px] text-muted-foreground group-hover:text-foreground text-center capitalize">
                  {preset.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">Shapes</p>
          <div className="grid grid-cols-3 gap-2">
            {SHAPE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleAdd(preset)}
                className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-secondary/60 hover:bg-secondary hover:ring-1 hover:ring-primary/30 transition-all group items-center"
              >
                <div className="flex items-center justify-center h-12">
                  {preset.preview}
                </div>
                <p className="text-[10px] text-muted-foreground group-hover:text-foreground text-center">
                  {preset.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">Store Badges</p>
          <div className="flex flex-col gap-2">
            {BADGE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleAdd(preset)}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary/60 hover:bg-secondary hover:ring-1 hover:ring-primary/30 transition-all group"
              >
                <div className="flex items-center justify-center shrink-0">
                  {preset.preview}
                </div>
                <p className="text-[11px] text-muted-foreground group-hover:text-foreground font-medium">
                  {preset.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
