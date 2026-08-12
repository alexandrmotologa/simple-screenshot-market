"use client";

import { useState } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GradientDirection } from "@/lib/types";
import { cn } from "@/lib/utils";

const PRESET_COLORS = [
  // Neutrals
  ["#ffffff", "#f5f5f7", "#1a1a2e", "#0d0d0d", "#121212"],
  // Blues
  ["#1e3a5f", "#1a56db", "#3b82f6", "#93c5fd", "#dbeafe"],
  // Purples
  ["#2d1b69", "#6d28d9", "#8b5cf6", "#c4b5fd", "#ede9fe"],
  // Pinks
  ["#831843", "#be185d", "#ec4899", "#f9a8d4", "#fce7f3"],
  // Greens
  ["#064e3b", "#065f46", "#10b981", "#6ee7b7", "#d1fae5"],
  // Oranges
  ["#7c2d12", "#c2410c", "#f97316", "#fdba74", "#ffedd5"],
  // Indigos
  ["#1e1b4b", "#3730a3", "#6366f1", "#a5b4fc", "#e0e7ff"],
  // Teal
  ["#134e4a", "#0f766e", "#14b8a6", "#5eead4", "#ccfbf1"],
];

const GRADIENT_PRESETS: { name: string; from: string; to: string; dir: GradientDirection }[] = [
  { name: "Cosmic",    from: "#1a1a2e", to: "#6d28d9", dir: "to-br" },
  { name: "Sunset",    from: "#7c2d12", to: "#ec4899", dir: "to-tr" },
  { name: "Ocean",     from: "#1e3a5f", to: "#14b8a6", dir: "to-br" },
  { name: "Forest",    from: "#064e3b", to: "#6366f1", dir: "to-b"  },
  { name: "Fire",      from: "#f97316", to: "#be185d", dir: "to-bl" },
  { name: "Night Sky", from: "#0d0d0d", to: "#1e3a5f", dir: "to-b"  },
  { name: "Aurora",    from: "#134e4a", to: "#8b5cf6", dir: "to-tr" },
  { name: "Rose Gold", from: "#831843", to: "#fdba74", dir: "to-br" },
  { name: "Mint",      from: "#065f46", to: "#60a5fa", dir: "to-br" },
  { name: "Grape",     from: "#2d1b69", to: "#ec4899", dir: "to-b"  },
  { name: "Royal",     from: "#1e1b4b", to: "#14b8a6", dir: "to-br" },
  { name: "Lava",      from: "#7c2d12", to: "#f97316", dir: "to-tr" },
];

type Tab = "color" | "gradient";

export function BackgroundPanel() {
  const { getActiveSet, getActiveScreen, updateScreenBackground, updateAllScreensBackground } = useEditorStore();
  const [tab, setTab] = useState<Tab>("color");
  const [applyAll, setApplyAll] = useState(false);

  const set = getActiveSet();
  const screen = getActiveScreen();
  const bg = screen?.background;

  const applyBg = (newBg: Parameters<typeof updateScreenBackground>[2]) => {
    if (!set || !screen) return;
    if (applyAll) {
      updateAllScreensBackground(set.id, newBg);
    } else {
      updateScreenBackground(set.id, screen.id, newBg);
    }
  };

  if (!set || !screen) {
    return <div className="flex items-center justify-center h-full text-muted-foreground text-sm">No screen selected</div>;
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-5">
        {/* Apply to all toggle */}
        <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-secondary/60">
          <Label htmlFor="apply-all" className="text-xs cursor-pointer">Apply to all screens</Label>
          <Switch id="apply-all" checked={applyAll} onCheckedChange={setApplyAll} />
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-secondary p-1 gap-1">
          {(["color", "gradient"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-all",
                tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "color" && (
          <div className="space-y-4">
            {/* Custom color picker */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Custom color</Label>
              <div className="flex items-center gap-3">
                <label className="w-10 h-10 rounded-xl cursor-pointer ring-1 ring-border overflow-hidden">
                  <input
                    type="color"
                    value={bg?.type === "solid" ? bg.color ?? "#ffffff" : "#ffffff"}
                    onChange={(e) =>
                      applyBg({ type: "solid", color: e.target.value })
                    }
                    className="opacity-0 w-0 h-0"
                  />
                  <div
                    className="w-full h-full"
                    style={{ background: bg?.type === "solid" ? bg.color : "#ffffff" }}
                  />
                </label>
                <span className="text-xs font-mono text-muted-foreground">
                  {bg?.type === "solid" ? bg.color?.toUpperCase() : "#FFFFFF"}
                </span>
              </div>
            </div>

            {/* Preset palettes */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Presets</Label>
              <div className="space-y-1.5">
                {PRESET_COLORS.map((row, ri) => (
                  <div key={ri} className="flex gap-1">
                    {row.map((color) => (
                      <button
                        key={color}
                        onClick={() => applyBg({ type: "solid", color })}
                        className={cn(
                          "flex-1 h-7 rounded-lg ring-1 transition-all hover:scale-105",
                          bg?.type === "solid" && bg.color === color
                            ? "ring-primary ring-2"
                            : "ring-border"
                        )}
                        style={{ background: color }}
                        title={color}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "gradient" && (
          <div className="space-y-3">
            <Label className="text-xs text-muted-foreground block">Gradient presets</Label>
            <div className="grid grid-cols-2 gap-2">
              {GRADIENT_PRESETS.map((gp) => {
                const dirMap: Record<string, string> = {
                  "to-b": "to bottom",
                  "to-r": "to right",
                  "to-br": "to bottom right",
                  "to-bl": "to bottom left",
                  "to-tr": "to top right",
                };
                const cssDir = dirMap[gp.dir] ?? "to bottom";
                const isActive =
                  bg?.type === "gradient" &&
                  bg.gradient?.stops[0]?.color === gp.from &&
                  bg.gradient?.stops[1]?.color === gp.to;

                return (
                  <button
                    key={gp.name}
                    onClick={() =>
                      applyBg({
                        type: "gradient",
                        gradient: {
                          direction: gp.dir,
                          stops: [
                            { color: gp.from, position: 0 },
                            { color: gp.to, position: 100 },
                          ],
                        },
                      })
                    }
                    className={cn(
                      "rounded-xl h-16 flex items-end p-2 transition-all ring-1 hover:scale-[1.02]",
                      isActive ? "ring-primary ring-2" : "ring-border"
                    )}
                    style={{
                      background: `linear-gradient(${cssDir}, ${gp.from}, ${gp.to})`,
                    }}
                  >
                    <span className="text-[10px] font-medium text-white/80">{gp.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom gradient stops */}
            {bg?.type === "gradient" && (
              <div className="mt-3 pt-3 border-t border-border/40 space-y-2">
                <Label className="text-xs text-muted-foreground">Custom stops</Label>
                <div className="flex gap-3">
                  {bg.gradient?.stops.map((stop, i) => (
                    <label key={i} className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-border cursor-pointer">
                        <input type="color" value={stop.color} className="opacity-0 w-0 h-0" onChange={(e) => {
                          const newStops = [...(bg.gradient?.stops ?? [])];
                          newStops[i] = { ...newStops[i], color: e.target.value };
                          applyBg({ type: "gradient", gradient: { ...bg.gradient!, stops: newStops } });
                        }} />
                        <div className="w-full h-full" style={{ background: stop.color }} />
                      </div>
                      <span className="text-[9px] text-muted-foreground">{i === 0 ? "Start" : "End"}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
