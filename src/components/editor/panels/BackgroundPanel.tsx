"use client";

import { useState } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GradientDirection } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ColorInput } from "@/components/ui/color-input";

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

type Tab = "color" | "gradient" | "mesh";

const MESH_PRESETS: { name: string; tl: string; tr: string; bl: string; br: string }[] = [
  { name: "Nebula",    tl: "#6d28d9", tr: "#1a56db", bl: "#ec4899", br: "#14b8a6" },
  { name: "Sunrise",   tl: "#f97316", tr: "#fbbf24", bl: "#be185d", br: "#f97316" },
  { name: "Midnight",  tl: "#1e1b4b", tr: "#0d0d0d", bl: "#134e4a", br: "#1e3a5f" },
  { name: "Forest",    tl: "#064e3b", tr: "#065f46", bl: "#6366f1", br: "#14b8a6" },
  { name: "Cotton",    tl: "#fce7f3", tr: "#ede9fe", bl: "#dbeafe", br: "#d1fae5" },
  { name: "Aurora",    tl: "#134e4a", tr: "#8b5cf6", bl: "#10b981", br: "#3b82f6" },
  { name: "Candy",     tl: "#ec4899", tr: "#f9a8d4", bl: "#a5b4fc", br: "#8b5cf6" },
  { name: "Gold",      tl: "#92400e", tr: "#f59e0b", bl: "#dc2626", br: "#fbbf24" },
  { name: "Ocean",     tl: "#1e3a5f", tr: "#1a56db", bl: "#134e4a", br: "#14b8a6" },
];

export function BackgroundPanel() {
  const { getActiveSet, getActiveScreen, updateScreenBackground, updateAllScreensBackground } = useEditorStore();
  const [tab, setTab] = useState<Tab>("color");
  const [applyAll, setApplyAll] = useState(false);
  const [patternEnabled, setPatternEnabled] = useState(false);
  const [patternType, setPatternType] = useState<"dots" | "lines" | "grid" | "noise">("dots");
  const [patternOpacity, setPatternOpacity] = useState(0.15);

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
          {(["color", "gradient", "mesh"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-all",
                tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "mesh" ? "✦ Mesh" : t === "gradient" ? "Gradient" : "Solid"}
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
                  <ColorInput
                    value={bg?.type === "solid" ? bg.color ?? "#ffffff" : "#ffffff"}
                    onColorChange={(color) =>
                      applyBg({ type: "solid", color })
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
                        onClick={() => {
                          applyBg({ type: "solid", color });
                          useEditorStore.getState().recordHistory();
                        }}
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
                    onClick={() => {
                      applyBg({
                        type: "gradient",
                        gradient: {
                          direction: gp.dir,
                          stops: [
                            { color: gp.from, position: 0 },
                            { color: gp.to, position: 100 },
                          ],
                        },
                      });
                      useEditorStore.getState().recordHistory();
                    }}
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
                        <ColorInput
                          value={stop.color}
                          className="opacity-0 w-0 h-0"
                          onColorChange={(color) => {
                            const newStops = [...(bg.gradient?.stops ?? [])];
                            newStops[i] = { ...newStops[i], color };
                            applyBg({ type: "gradient", gradient: { ...bg.gradient!, stops: newStops } });
                          }}
                        />
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

        {tab === "mesh" && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">4-corner mesh gradient presets</p>
            <div className="grid grid-cols-3 gap-2">
              {MESH_PRESETS.map((mp) => (
                <button
                  key={mp.name}
                  type="button"
                  onClick={() => {
                    applyBg({
                      type: "mesh",
                      mesh: {
                        topLeft: mp.tl,
                        topRight: mp.tr,
                        bottomLeft: mp.bl,
                        bottomRight: mp.br,
                      },
                    });
                    useEditorStore.getState().recordHistory();
                  }}
                  className={cn(
                    "rounded-xl h-14 ring-1 transition-all hover:scale-105 hover:ring-2 hover:ring-primary overflow-hidden",
                    bg?.type === "mesh" &&
                    bg.mesh?.topLeft === mp.tl
                      ? "ring-primary ring-2"
                      : "ring-border"
                  )}
                  style={{
                    background: `conic-gradient(from 135deg at 50% 50%, ${mp.tl}, ${mp.tr}, ${mp.br}, ${mp.bl}, ${mp.tl})`,
                  }}
                  title={mp.name}
                >
                  <span className="text-[9px] font-medium text-white/80 drop-shadow px-1">{mp.name}</span>
                </button>
              ))}
            </div>

            {/* Custom 4-corner pickers */}
            {bg?.type === "mesh" && bg.mesh && (
              <div className="mt-3 pt-3 border-t border-border/40 space-y-2">
                <p className="text-xs text-muted-foreground">Custom corners</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { key: "topLeft",     label: "↖ Top Left"     },
                    { key: "topRight",    label: "↗ Top Right"    },
                    { key: "bottomLeft",  label: "↙ Bottom Left"  },
                    { key: "bottomRight", label: "↘ Bottom Right" },
                  ] as const).map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <div className="w-7 h-7 rounded-lg overflow-hidden ring-1 ring-border shrink-0">
                        <ColorInput
                          value={(bg.mesh! as unknown as Record<string, string>)[key] ?? "#000000"}
                          className="opacity-0 w-0 h-0"
                          onColorChange={(color) =>
                            applyBg({
                              type: "mesh",
                              mesh: { ...bg.mesh!, [key]: color },
                            })
                          }
                        />
                        <div
                          className="w-full h-full"
                          style={{ background: (bg.mesh! as unknown as Record<string, string>)[key] ?? "#000" }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Pattern overlay (works on top of any bg) ── */}
        <div className="pt-3 border-t border-border/30 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Pattern Overlay</p>
            <Switch
              id="pattern-toggle"
              checked={patternEnabled}
              onCheckedChange={(val) => {
                setPatternEnabled(val);
                if (!set || !screen) return;
                const newBg = { ...bg };
                if (val) {
                  newBg.pattern = { type: patternType, color: "#ffffff", opacity: patternOpacity };
                } else {
                  delete newBg.pattern;
                }
                applyBg(newBg as Parameters<typeof applyBg>[0]);
                useEditorStore.getState().recordHistory();
              }}
            />
          </div>
          {patternEnabled && (
            <div className="space-y-2">
              <div className="flex gap-1">
                {(["dots", "lines", "grid", "noise"] as const).map((pt) => (
                  <button
                    key={pt}
                    type="button"
                    onClick={() => {
                      setPatternType(pt);
                      if (!bg) return;
                      applyBg({ ...bg, pattern: { type: pt, color: "#ffffff", opacity: patternOpacity } });
                      useEditorStore.getState().recordHistory();
                    }}
                    className={cn(
                      "flex-1 py-1 rounded-lg text-[10px] font-medium transition-all capitalize",
                      patternType === pt
                        ? "bg-indigo-500 text-white"
                        : "bg-secondary/60 text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    {pt}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground shrink-0">Opacity</span>
                <input
                  type="range" min="0.05" max="0.5" step="0.05"
                  value={patternOpacity}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setPatternOpacity(v);
                    if (!bg) return;
                    applyBg({ ...bg, pattern: { type: patternType, color: "#ffffff", opacity: v } });
                  }}
                  onMouseUp={() => useEditorStore.getState().recordHistory()}
                  onTouchEnd={() => useEditorStore.getState().recordHistory()}
                  className="flex-1 accent-indigo-500"
                />
                <span className="text-[10px] font-mono text-muted-foreground w-8 shrink-0">
                  {Math.round(patternOpacity * 100)}%
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </ScrollArea>
  );
}
