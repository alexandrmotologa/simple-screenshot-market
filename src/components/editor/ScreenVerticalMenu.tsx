"use client";

import { useState } from "react";
import {
  Smartphone, Palette, Type, Copy, Trash2, Plus, Minus,
  Sparkles, Check, ChevronRight, Layers, ArrowRight, Grid
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/lib/store/editorStore";
import { Screen, ScreenSet, ScreenshotLayer, TextLayer, Background, GradientDirection } from "@/lib/types";
import { nanoid, cn } from "@/lib/utils";

interface ScreenVerticalMenuProps {
  screen: Screen;
  screenSet: ScreenSet;
}

// ── Curated Solid Color Swatches ──────────────────────────────────────────────
const SOLID_SWATCHES = [
  { name: "Dark Obsidian", color: "#0b1120" },
  { name: "Pure Black", color: "#000000" },
  { name: "Midnight Purple", color: "#1e0b3a" },
  { name: "Deep Navy", color: "#012949" },
  { name: "Ocean Blue", color: "#2563eb" },
  { name: "Emerald Forest", color: "#047855" },
  { name: "Ruby Crimson", color: "#c7321a" },
  { name: "Royal Violet", color: "#5100a6" },
  { name: "Warm Matcha", color: "#f6f4e8" },
  { name: "Soft Lavender", color: "#f5e2fe" },
  { name: "Nordic Snow", color: "#f8fafc" },
  { name: "Pure White", color: "#ffffff" },
  { name: "Neon Lime", color: "#c7f54a" },
  { name: "Electric Gold", color: "#fbd855" },
  { name: "Sunset Orange", color: "#fb923c" },
  { name: "Rose Pink", color: "#f43f5e" },
];

// ── Curated Gradient Presets ──────────────────────────────────────────────────
const GRADIENT_PRESETS: { name: string; stops: { color: string; position: number }[] }[] = [
  { name: "Deep Space", stops: [{ color: "#0f172a", position: 0 }, { color: "#020617", position: 100 }] },
  { name: "Oceanic Cyan", stops: [{ color: "#32508c", position: 0 }, { color: "#4494b9", position: 100 }] },
  { name: "Vibrant Sunset", stops: [{ color: "#312e81", position: 0 }, { color: "#701a75", position: 100 }] },
  { name: "Neon Electric", stops: [{ color: "#4c0519", position: 0 }, { color: "#831843", position: 100 }] },
  { name: "Royal Purple", stops: [{ color: "#4338ca", position: 0 }, { color: "#6b21a8", position: 100 }] },
  { name: "Emerald Glow", stops: [{ color: "#064e3b", position: 0 }, { color: "#047855", position: 100 }] },
  { name: "Clean Titanium", stops: [{ color: "#18181b", position: 0 }, { color: "#27272a", position: 100 }] },
  { name: "Arctic Ice Light", stops: [{ color: "#ffffff", position: 0 }, { color: "#e2e8f0", position: 100 }] },
  { name: "Sunrise Peach", stops: [{ color: "#f43f5e", position: 0 }, { color: "#fb923c", position: 100 }] },
  { name: "Sky Blue", stops: [{ color: "#0284c7", position: 0 }, { color: "#38bdf8", position: 100 }] },
];

export function ScreenVerticalMenu({ screen, screenSet }: ScreenVerticalMenuProps) {
  const {
    updateScreen, deleteScreen, addLayer,
    updateScreenBackground, updateAllScreensBackground,
  } = useEditorStore();

  const [mockupPopoverOpen, setMockupPopoverOpen] = useState(false);
  const [bgPopoverOpen, setBgPopoverOpen] = useState(false);
  const [bgTab, setBgTab] = useState<"solid" | "gradient">("solid");

  const existingScreenshots = screen.layers.filter(
    (l) => l.type === "screenshot"
  ) as ScreenshotLayer[];

  const mockupCount = existingScreenshots.length;
  const W = screen.width;
  const H = screen.height;

  // ── Apply 1, 2, or 3 Phone Mockups ──────────────────────────────────────────
  const applyMockupLayout = (count: 1 | 2 | 3, style: "angled" | "straight" = "angled") => {
    // Keep existing non-screenshot layers (texts, shapes, flags, etc.)
    const nonScreenshotLayers = screen.layers.filter((l) => l.type !== "screenshot");

    // Preserve uploaded image sources
    const src0 = existingScreenshots[0]?.src;
    const src1 = existingScreenshots[1]?.src;
    const src2 = existingScreenshots[2]?.src;

    let newMockups: ScreenshotLayer[] = [];

    if (count === 1) {
      newMockups = [
        {
          id: existingScreenshots[0]?.id || `mockup_${nanoid()}`,
          type: "screenshot",
          src: src0,
          x: Math.round(W * 0.08),
          y: Math.round(H * 0.28),
          width: Math.round(W * 0.84),
          height: Math.round(H * 0.72),
          rotation: 0,
          opacity: 1,
          objectFit: "cover",
          cornerRadius: 54,
          showDeviceFrame: true,
          shadow: { blur: 80, spread: 0, color: "rgba(0,0,0,0.35)", offsetX: 0, offsetY: 20 },
          label: "Drop your screenshot here",
        },
      ];
    } else if (count === 2) {
      if (style === "straight") {
        newMockups = [
          {
            id: existingScreenshots[0]?.id || `mockup_${nanoid()}`,
            type: "screenshot",
            src: src0,
            x: Math.round(W * 0.06),
            y: Math.round(H * 0.32),
            width: Math.round(W * 0.52),
            height: Math.round(H * 0.66),
            rotation: 0,
            opacity: 1,
            objectFit: "cover",
            cornerRadius: 54,
            showDeviceFrame: true,
            shadow: { blur: 70, spread: 0, color: "rgba(0,0,0,0.30)", offsetX: -5, offsetY: 20 },
            label: "Screenshot 1",
          },
          {
            id: existingScreenshots[1]?.id || `mockup_${nanoid()}`,
            type: "screenshot",
            src: src1,
            x: Math.round(W * 0.42),
            y: Math.round(H * 0.35),
            width: Math.round(W * 0.52),
            height: Math.round(H * 0.66),
            rotation: 0,
            opacity: 1,
            objectFit: "cover",
            cornerRadius: 54,
            showDeviceFrame: true,
            shadow: { blur: 80, spread: 0, color: "rgba(0,0,0,0.35)", offsetX: 5, offsetY: 25 },
            label: "Screenshot 2",
          },
        ];
      } else {
        // Angled Duo
        newMockups = [
          {
            id: existingScreenshots[0]?.id || `mockup_${nanoid()}`,
            type: "screenshot",
            src: src0,
            x: Math.round(W * 0.03),
            y: Math.round(H * 0.32),
            width: Math.round(W * 0.58),
            height: Math.round(H * 0.66),
            rotation: -5,
            opacity: 1,
            objectFit: "cover",
            cornerRadius: 54,
            showDeviceFrame: true,
            shadow: { blur: 70, spread: 0, color: "rgba(0,0,0,0.30)", offsetX: -10, offsetY: 20 },
            label: "Screenshot 1",
          },
          {
            id: existingScreenshots[1]?.id || `mockup_${nanoid()}`,
            type: "screenshot",
            src: src1,
            x: Math.round(W * 0.39),
            y: Math.round(H * 0.35),
            width: Math.round(W * 0.58),
            height: Math.round(H * 0.66),
            rotation: 5,
            opacity: 1,
            objectFit: "cover",
            cornerRadius: 54,
            showDeviceFrame: true,
            shadow: { blur: 80, spread: 0, color: "rgba(0,0,0,0.35)", offsetX: 10, offsetY: 25 },
            label: "Screenshot 2",
          },
        ];
      }
    } else if (count === 3) {
      if (style === "straight") {
        newMockups = [
          {
            id: existingScreenshots[0]?.id || `mockup_${nanoid()}`,
            type: "screenshot",
            src: src0,
            x: Math.round(-W * 0.02),
            y: Math.round(H * 0.36),
            width: Math.round(W * 0.44),
            height: Math.round(H * 0.60),
            rotation: 0,
            opacity: 1,
            objectFit: "cover",
            cornerRadius: 54,
            showDeviceFrame: true,
            shadow: { blur: 60, spread: 0, color: "rgba(0,0,0,0.28)", offsetX: -6, offsetY: 18 },
            label: "Screenshot 1",
          },
          {
            id: existingScreenshots[2]?.id || `mockup_${nanoid()}`,
            type: "screenshot",
            src: src2,
            x: Math.round(W * 0.58),
            y: Math.round(H * 0.36),
            width: Math.round(W * 0.44),
            height: Math.round(H * 0.60),
            rotation: 0,
            opacity: 1,
            objectFit: "cover",
            cornerRadius: 54,
            showDeviceFrame: true,
            shadow: { blur: 60, spread: 0, color: "rgba(0,0,0,0.28)", offsetX: 6, offsetY: 18 },
            label: "Screenshot 3",
          },
          {
            id: existingScreenshots[1]?.id || `mockup_${nanoid()}`,
            type: "screenshot",
            src: src1,
            x: Math.round(W * 0.25),
            y: Math.round(H * 0.30),
            width: Math.round(W * 0.50),
            height: Math.round(H * 0.68),
            rotation: 0,
            opacity: 1,
            objectFit: "cover",
            cornerRadius: 54,
            showDeviceFrame: true,
            shadow: { blur: 90, spread: 0, color: "rgba(0,0,0,0.40)", offsetX: 0, offsetY: 25 },
            label: "Screenshot 2",
          },
        ];
      } else {
        // Angled Trio with Center Hero Elevated
        newMockups = [
          {
            id: existingScreenshots[0]?.id || `mockup_${nanoid()}`,
            type: "screenshot",
            src: src0,
            x: Math.round(-W * 0.05),
            y: Math.round(H * 0.35),
            width: Math.round(W * 0.50),
            height: Math.round(H * 0.62),
            rotation: -7,
            opacity: 1,
            objectFit: "cover",
            cornerRadius: 54,
            showDeviceFrame: true,
            shadow: { blur: 60, spread: 0, color: "rgba(0,0,0,0.28)", offsetX: -10, offsetY: 18 },
            label: "Screenshot 1",
          },
          {
            id: existingScreenshots[2]?.id || `mockup_${nanoid()}`,
            type: "screenshot",
            src: src2,
            x: Math.round(W * 0.55),
            y: Math.round(H * 0.35),
            width: Math.round(W * 0.50),
            height: Math.round(H * 0.62),
            rotation: 7,
            opacity: 1,
            objectFit: "cover",
            cornerRadius: 54,
            showDeviceFrame: true,
            shadow: { blur: 60, spread: 0, color: "rgba(0,0,0,0.28)", offsetX: 10, offsetY: 18 },
            label: "Screenshot 3",
          },
          {
            id: existingScreenshots[1]?.id || `mockup_${nanoid()}`,
            type: "screenshot",
            src: src1,
            x: Math.round(W * 0.23),
            y: Math.round(H * 0.29),
            width: Math.round(W * 0.54),
            height: Math.round(H * 0.68),
            rotation: 0,
            opacity: 1,
            objectFit: "cover",
            cornerRadius: 54,
            showDeviceFrame: true,
            shadow: { blur: 90, spread: 0, color: "rgba(0,0,0,0.40)", offsetX: 0, offsetY: 25 },
            label: "Screenshot 2",
          },
        ];
      }
    }

    updateScreen(screenSet.id, screen.id, {
      layers: [...nonScreenshotLayers, ...newMockups],
    });
    useEditorStore.getState().recordHistory();
  };

  const handleAddOneMockup = () => {
    if (mockupCount >= 3) return;
    const nextCount = (Math.min(3, mockupCount + 1)) as 1 | 2 | 3;
    applyMockupLayout(nextCount);
  };

  const handleRemoveOneMockup = () => {
    if (mockupCount <= 1) {
      // Remove all screenshot layers if 1
      const nonScreenshotLayers = screen.layers.filter((l) => l.type !== "screenshot");
      updateScreen(screenSet.id, screen.id, { layers: nonScreenshotLayers });
      useEditorStore.getState().recordHistory();
      return;
    }
    const nextCount = (mockupCount - 1) as 1 | 2;
    applyMockupLayout(nextCount);
  };

  // ── Add Text Layer ─────────────────────────────────────────────────────────
  const handleAddText = () => {
    const newText: TextLayer = {
      id: `text_${nanoid()}`,
      type: "text",
      content: "New Headline",
      x: Math.round(W * 0.08),
      y: 180,
      width: Math.round(W * 0.84),
      height: 160,
      fontSize: 100,
      fontFamily: "Inter",
      fontWeight: 800,
      color: "#ffffff",
      align: "center",
      lineHeight: 1.15,
      letterSpacing: -1,
      rotation: 0,
      opacity: 1,
    };
    addLayer(screenSet.id, screen.id, newText);
    useEditorStore.getState().recordHistory();
  };

  // ── Background Helpers ──────────────────────────────────────────────────────
  const currentBg = screen.background;
  const currentBgColor =
    currentBg.type === "solid"
      ? currentBg.color || "#0b1120"
      : currentBg.gradient?.stops?.[0]?.color || "#0b1120";

  const handleSetSolid = (color: string) => {
    updateScreenBackground(screenSet.id, screen.id, {
      type: "solid",
      color,
    });
    useEditorStore.getState().recordHistory();
  };

  const handleSetGradient = (stops: { color: string; position: number }[], direction: GradientDirection = "to-b") => {
    updateScreenBackground(screenSet.id, screen.id, {
      type: "gradient",
      gradient: {
        direction,
        stops,
      },
    });
    useEditorStore.getState().recordHistory();
  };

  const handleApplyBgToAll = () => {
    updateAllScreensBackground(screenSet.id, screen.background);
    useEditorStore.getState().recordHistory();
  };

  return (
    <TooltipProvider delay={200}>
      <div 
        className="absolute -right-11 top-4 flex flex-col gap-1.5 p-1 bg-card/95 backdrop-blur-md border border-border/70 rounded-xl shadow-xl shadow-black/25 z-40 animate-in fade-in zoom-in-95 duration-150 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── 1. MOCKUPS POPUP (1 to 3 phones) ─────────────────────────────────── */}
        <Popover open={mockupPopoverOpen} onOpenChange={setMockupPopoverOpen}>
          <Tooltip>
            <PopoverTrigger
              className={cn(
                "relative w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                mockupPopoverOpen
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Smartphone className="w-4 h-4" />
              {/* Badge showing current mockup count */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                {mockupCount}
              </span>
            </PopoverTrigger>
            <TooltipContent side="right">
              <p className="font-semibold">Mockup Layout ({mockupCount}/3 Phones)</p>
              <p className="text-[10px] text-muted-foreground">Add up to 3 phone frames</p>
            </TooltipContent>
          </Tooltip>

          <PopoverContent side="right" align="start" className="w-72 p-3 shadow-2xl z-50">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-border/50">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-foreground">Phone Mockups</span>
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                  {mockupCount} / 3 Max
                </span>
              </div>

              {/* Quick Preset Layouts */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Layout Presets
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {/* 1 Phone */}
                  <button
                    type="button"
                    onClick={() => {
                      applyMockupLayout(1);
                      setMockupPopoverOpen(false);
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all",
                      mockupCount === 1
                        ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/40"
                        : "border-border/60 hover:bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div className="w-4 h-7 border-2 border-current rounded-sm mb-1 opacity-80" />
                    <span className="text-[11px]">1 Phone</span>
                  </button>

                  {/* 2 Phones */}
                  <button
                    type="button"
                    onClick={() => {
                      applyMockupLayout(2, "angled");
                      setMockupPopoverOpen(false);
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all",
                      mockupCount === 2
                        ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/40"
                        : "border-border/60 hover:bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-0.5 mb-1 opacity-80">
                      <div className="w-3.5 h-6 border-2 border-current rounded-sm -rotate-6" />
                      <div className="w-3.5 h-6 border-2 border-current rounded-sm rotate-6" />
                    </div>
                    <span className="text-[11px]">2 Phones</span>
                  </button>

                  {/* 3 Phones */}
                  <button
                    type="button"
                    onClick={() => {
                      applyMockupLayout(3, "angled");
                      setMockupPopoverOpen(false);
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all",
                      mockupCount === 3
                        ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/40"
                        : "border-border/60 hover:bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-0.5 mb-1 opacity-80">
                      <div className="w-3 h-5 border border-current rounded-sm -rotate-6" />
                      <div className="w-3.5 h-6 border-2 border-current rounded-sm z-10 scale-105" />
                      <div className="w-3 h-5 border border-current rounded-sm rotate-6" />
                    </div>
                    <span className="text-[11px]">3 Phones</span>
                  </button>
                </div>
              </div>

              {/* Add / Remove buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  disabled={mockupCount >= 3}
                  onClick={handleAddOneMockup}
                  className="flex-1 flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Mockup
                </button>
                <button
                  type="button"
                  disabled={mockupCount <= 0}
                  onClick={handleRemoveOneMockup}
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/70 hover:bg-destructive/15 text-muted-foreground hover:text-destructive disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Remove a mockup"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Subtitle helper */}
              <p className="text-[10px] text-muted-foreground text-center">
                Tip: Drag and drop screenshots directly onto any phone frame
              </p>
            </div>
          </PopoverContent>
        </Popover>

        {/* ── 2. BACKGROUND PER SCREEN POPUP ──────────────────────────────────── */}
        <Popover open={bgPopoverOpen} onOpenChange={setBgPopoverOpen}>
          <Tooltip>
            <PopoverTrigger
              className={cn(
                "relative w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                bgPopoverOpen
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Palette className="w-4 h-4" />
              {/* Visual color indicator dot */}
              <span 
                className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full ring-1 ring-background"
                style={{ backgroundColor: currentBgColor }}
              />
            </PopoverTrigger>
            <TooltipContent side="right">
              <p className="font-semibold">Screen Background</p>
              <p className="text-[10px] text-muted-foreground">Color, gradient or mesh per screen</p>
            </TooltipContent>
          </Tooltip>

          <PopoverContent side="right" align="start" className="w-80 p-3.5 shadow-2xl z-50">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-border/50">
                <div className="flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-foreground">Screen Background</span>
                </div>
                <button
                  type="button"
                  onClick={handleApplyBgToAll}
                  className="text-[10px] text-primary hover:underline font-semibold"
                  title="Apply this background to all screens in the row"
                >
                  Apply to All
                </button>
              </div>

              {/* Tabs: Solid | Gradient */}
              <div className="flex rounded-lg bg-secondary/60 p-0.5">
                <button
                  type="button"
                  onClick={() => setBgTab("solid")}
                  className={cn(
                    "flex-1 py-1 text-xs font-medium rounded-md transition-all text-center",
                    bgTab === "solid"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Solid Color
                </button>
                <button
                  type="button"
                  onClick={() => setBgTab("gradient")}
                  className={cn(
                    "flex-1 py-1 text-xs font-medium rounded-md transition-all text-center",
                    bgTab === "gradient"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Gradient
                </button>
              </div>

              {/* Tab 1: Solid Color Swatches & Picker */}
              {bgTab === "solid" && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-8 gap-1.5">
                    {SOLID_SWATCHES.map((s) => (
                      <button
                        key={s.color}
                        type="button"
                        onClick={() => handleSetSolid(s.color)}
                        className={cn(
                          "w-7 h-7 rounded-md border transition-transform hover:scale-110 flex items-center justify-center",
                          currentBg.type === "solid" && currentBg.color?.toLowerCase() === s.color.toLowerCase()
                            ? "ring-2 ring-primary ring-offset-1 border-primary"
                            : "border-border/40"
                        )}
                        style={{ backgroundColor: s.color }}
                        title={s.name}
                      >
                        {currentBg.type === "solid" && currentBg.color?.toLowerCase() === s.color.toLowerCase() && (
                          <Check className={cn("w-3.5 h-3.5", s.color === "#ffffff" || s.color === "#f8fafc" || s.color === "#f6f4e8" ? "text-black" : "text-white")} />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Custom color input */}
                  <div className="flex items-center gap-2 pt-1 border-t border-border/40">
                    <span className="text-[11px] text-muted-foreground">Custom:</span>
                    <input
                      type="color"
                      value={currentBg.type === "solid" ? currentBg.color || "#000000" : "#0b1120"}
                      onChange={(e) => handleSetSolid(e.target.value)}
                      className="w-7 h-7 rounded border border-border cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={currentBg.type === "solid" ? currentBg.color || "#000000" : ""}
                      onChange={(e) => handleSetSolid(e.target.value)}
                      placeholder="#0b1120"
                      className="flex-1 h-7 px-2 text-xs font-mono bg-secondary rounded border border-border/60 outline-none uppercase"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Gradient Presets */}
              {bgTab === "gradient" && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {GRADIENT_PRESETS.map((g) => {
                      const gradCss = `linear-gradient(135deg, ${g.stops.map(s => `${s.color} ${s.position}%`).join(", ")})`;
                      return (
                        <button
                          key={g.name}
                          type="button"
                          onClick={() => handleSetGradient(g.stops, "to-b")}
                          className="flex items-center gap-2 p-1.5 rounded-lg border border-border/60 hover:border-primary/60 transition-all text-left group"
                        >
                          <div 
                            className="w-6 h-6 rounded-md shadow-sm shrink-0 border border-white/10"
                            style={{ background: gradCss }}
                          />
                          <span className="text-[11px] font-medium text-foreground truncate group-hover:text-primary">
                            {g.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* ── 3. ADD TEXT LAYER ──────────────────────────────────────────────── */}
        <Tooltip>
          <TooltipTrigger
            onClick={handleAddText}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Type className="w-4 h-4" />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="font-semibold">Add Text</p>
            <p className="text-[10px] text-muted-foreground">Add headline / caption</p>
          </TooltipContent>
        </Tooltip>

        <Separator className="my-0.5 bg-border/60" />

        {/* ── 4. DUPLICATE SCREEN ────────────────────────────────────────────── */}
        <Tooltip>
          <TooltipTrigger
            onClick={() => {
              if (screenSet.screens.length >= 10) return;
              const newScreen = {
                ...screen,
                id: nanoid(),
                name: `Screen ${screenSet.screens.length + 1}`,
                layers: screen.layers.map((l) => ({ ...l, id: `${l.type}_${nanoid()}` })),
              };
              const screenIndex = screenSet.screens.findIndex((s) => s.id === screen.id);
              const updatedScreens = [...screenSet.screens];
              updatedScreens.splice(screenIndex + 1, 0, newScreen);
              useEditorStore.getState().updateScreenSet(screenSet.id, { screens: updatedScreens });
              useEditorStore.getState().setActiveScreen(newScreen.id);
              useEditorStore.getState().recordHistory();
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="font-semibold">Duplicate Screen</p>
          </TooltipContent>
        </Tooltip>

        {/* ── 5. DELETE SCREEN ───────────────────────────────────────────────── */}
        <Tooltip>
          <TooltipTrigger
            onClick={() => {
              if (screenSet.screens.length <= 1) return;
              deleteScreen(screenSet.id, screen.id);
            }}
            disabled={screenSet.screens.length <= 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="font-semibold text-destructive">Delete Screen</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
