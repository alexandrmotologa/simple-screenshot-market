"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <div className="p-4 grid grid-cols-2 gap-3">
        {BLOCK_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleAdd(preset)}
            className="flex flex-col gap-2 p-3 rounded-xl bg-secondary/60 hover:bg-secondary hover:ring-1 hover:ring-primary/30 transition-all group"
          >
            <div className="flex items-center justify-center h-16">
              {preset.preview}
            </div>
            <p className="text-[10px] text-muted-foreground group-hover:text-foreground text-center capitalize">
              {preset.name}
            </p>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
