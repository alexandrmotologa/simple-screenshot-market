"use client";

import { useRef, useState } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { TextLayer, ScreenshotLayer, ShapeLayer, Layer } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Bold, AlignLeft, AlignCenter, AlignRight,
  Trash2, Copy, ChevronDown, Minus, Plus,
  RotateCcw, Upload, Maximize2, Minimize2, Smartphone,
  AlignCenterHorizontal, AlignCenterVertical,
  ArrowUpToLine, ArrowDownToLine, ArrowLeftToLine, ArrowRightToLine,
  MoveHorizontal, MoveVertical, RefreshCw, Type
} from "lucide-react";
import { cn, loadGoogleFont } from "@/lib/utils";

// ── Google Fonts list for dropdown ────────────────────────────────────────────
const FONT_FAMILIES = [
  "Inter", "Roboto", "Poppins", "Montserrat", "Lato",
  "Oswald", "Raleway", "Nunito", "Playfair Display", "Merriweather",
  "Space Grotesk", "DM Sans", "Plus Jakarta Sans", "Outfit",
  "Bebas Neue", "Anton", "Syne", "Barlow", "Cabin",
];

// ── Google Fonts list for dropdown ────────────────────────────────────────────
// ── Small toolbar button ──────────────────────────────────────────────────────
function Btn({
  onClick, active, title, children, danger, className,
}: {
  onClick?: () => void;
  active?: boolean;
  title?: string;
  children: React.ReactNode;
  danger?: boolean;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        onClick={onClick}
        className={cn(
          "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
          active ? "bg-primary text-primary-foreground" : "",
          danger ? "hover:bg-destructive/15 text-muted-foreground hover:text-destructive" : "hover:bg-secondary text-muted-foreground hover:text-foreground",
          className,
        )}
      >
        {children}
      </TooltipTrigger>
      {title && <TooltipContent>{title}</TooltipContent>}
    </Tooltip>
  );
}

// ── Inline number input ───────────────────────────────────────────────────────
function NumInput({
  value, onChange, min, max, unit, width = "w-10",
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  unit?: string;
  width?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState("");

  return (
    <div className="flex items-center gap-0.5">
      {editing ? (
        <input
          autoFocus
          type="number"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          onBlur={() => {
            const n = parseFloat(raw);
            if (!isNaN(n)) {
              onChange(min !== undefined ? Math.max(min, max !== undefined ? Math.min(max, n) : n) : n);
            }
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
            if (e.key === "Escape") setEditing(false);
          }}
          className={cn("bg-secondary border border-primary/40 rounded px-1 py-0.5 text-xs font-mono text-center outline-none", width)}
        />
      ) : (
        <button
          type="button"
          onClick={() => { setRaw(String(Math.round(value))); setEditing(true); }}
          className={cn("text-xs font-mono text-center hover:bg-secondary rounded px-1 py-0.5 tabular-nums", width)}
          title="Click to edit"
        >
          {Math.round(value)}{unit}
        </button>
      )}
    </div>
  );
}

// ── Main FloatingToolbar ──────────────────────────────────────────────────────
export function FloatingToolbar() {
  const {
    getActiveLayer, getActiveScreen, getActiveSet,
    updateLayer, deleteLayer, duplicateLayer, setActiveLayer,
    syncTextToScreens, updateScreen
  } = useEditorStore();

  const layer = getActiveLayer();
  const screen = getActiveScreen();
  const set = getActiveSet();

  const [fontOpen, setFontOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!layer || !screen || !set) return null;

  const update = (updates: Partial<Layer>) => {
    updateLayer(set.id, screen.id, layer.id, updates);
  };

  const isText = layer.type === "text";
  const isScreenshot = layer.type === "screenshot";
  const isShape = layer.type === "shape";
  const tl = isText ? (layer as TextLayer) : null;
  const sl = isScreenshot ? (layer as ScreenshotLayer) : null;
  const sh = isShape ? (layer as ShapeLayer) : null;

  // ── Canvas align helpers ────────────────────────────────────────────────────
  const alignLeft   = () => update({ x: 0 });
  const alignRight  = () => update({ x: screen.width - layer.width });
  const alignTop    = () => update({ y: 0 });
  const alignBottom = () => update({ y: screen.height - layer.height });
  const centerH     = () => update({ x: Math.round((screen.width - layer.width) / 2) });
  const centerV     = () => update({ y: Math.round((screen.height - layer.height) / 2) });

  // File input for screenshot
  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update({ src: ev.target?.result as string } as Partial<ScreenshotLayer>);
    reader.readAsDataURL(file);
  };

  return (
    <TooltipProvider>
      <div className="w-full h-full flex items-center gap-2 px-4 overflow-x-auto">

        {/* Layer type badge */}
        <span className={cn(
          "text-xs font-medium px-1.5 capitalize shrink-0",
          isScreenshot ? "text-primary" : "text-muted-foreground"
        )}>
          {isScreenshot ? "📱 Screenshot" : isText ? "✏️ Text" : isShape ? "⬛ Shape" : `${layer.type}`}
        </span>

        <Separator orientation="vertical" className="h-5 mx-0.5 shrink-0" />

        {/* ── POSITION X / Y ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[10px] text-muted-foreground">X</span>
          <NumInput value={layer.x} onChange={(v) => update({ x: v })} width="w-12" />
          <span className="text-[10px] text-muted-foreground">Y</span>
          <NumInput value={layer.y} onChange={(v) => update({ y: v })} width="w-12" />
        </div>

        <Separator orientation="vertical" className="h-5 mx-0.5 shrink-0" />

        {/* ── ALIGN TOOLS ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-0.5 shrink-0">
          <Btn onClick={alignLeft}   title="Align Left (to canvas)"><ArrowLeftToLine className="w-3.5 h-3.5" /></Btn>
          <Btn onClick={centerH}     title="Center Horizontally"><AlignCenterVertical className="w-3.5 h-3.5" /></Btn>
          <Btn onClick={alignRight}  title="Align Right (to canvas)"><ArrowRightToLine className="w-3.5 h-3.5" /></Btn>
          <Separator orientation="vertical" className="h-4 mx-0.5" />
          <Btn onClick={alignTop}    title="Align Top"><ArrowUpToLine className="w-3.5 h-3.5" /></Btn>
          <Btn onClick={centerV}     title="Center Vertically"><AlignCenterHorizontal className="w-3.5 h-3.5" /></Btn>
          <Btn onClick={alignBottom} title="Align Bottom"><ArrowDownToLine className="w-3.5 h-3.5" /></Btn>
        </div>

        <Separator orientation="vertical" className="h-5 mx-0.5 shrink-0" />

        {/* ── OPACITY SLIDER ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 shrink-0" title="Opacity">
          <span className="text-[10px] text-muted-foreground">Op</span>
          <input
            type="range" min={0} max={1} step={0.01}
            value={layer.opacity ?? 1}
            onChange={(e) => update({ opacity: parseFloat(e.target.value) })}
            className="w-16 h-1 accent-primary cursor-pointer"
          />
          <NumInput
            value={Math.round((layer.opacity ?? 1) * 100)}
            onChange={(v) => update({ opacity: v / 100 })}
            min={0} max={100} unit="%" width="w-9"
          />
        </div>

        <Separator orientation="vertical" className="h-5 mx-0.5 shrink-0" />

        {/* ── ROTATION ───────────────────────────────────────────────────── */}
        <div className="flex items-center gap-1 shrink-0" title="Rotation">
          <RotateCcw className="w-3 h-3 text-muted-foreground" />
          <NumInput
            value={layer.rotation ?? 0}
            onChange={(v) => update({ rotation: v })}
            min={-360} max={360} unit="°" width="w-10"
          />
        </div>

        <Separator orientation="vertical" className="h-5 mx-0.5 shrink-0" />

        {/* ── SCREENSHOT CONTROLS ────────────────────────────────────────── */}
        {isScreenshot && sl && (
          <>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleScreenshotUpload} />
            <button
              type="button"
              title="Upload screenshot"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/15 hover:bg-primary/25 text-primary text-xs font-medium transition-colors shrink-0"
            >
              <Upload className="w-3.5 h-3.5" />
              {sl.src ? "Change" : "Upload"}
            </button>

            <Btn
              onClick={() => update({ objectFit: sl.objectFit === "cover" ? "contain" : "cover" } as Partial<ScreenshotLayer>)}
              title={sl.objectFit === "cover" ? "Switch to Contain" : "Switch to Cover"}
            >
              {sl.objectFit === "cover" ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </Btn>

            {/* Corner radius */}
            <div className="flex items-center gap-0.5 shrink-0">
              <button type="button" onClick={() => update({ cornerRadius: Math.max(0, (sl.cornerRadius ?? 0) - 10) } as Partial<ScreenshotLayer>)} className="w-6 h-6 rounded hover:bg-secondary flex items-center justify-center text-muted-foreground"><Minus className="w-3 h-3" /></button>
              <NumInput value={sl.cornerRadius ?? 0} onChange={(v) => update({ cornerRadius: v } as Partial<ScreenshotLayer>)} min={0} max={200} unit="r" width="w-8" />
              <button type="button" onClick={() => update({ cornerRadius: Math.min(200, (sl.cornerRadius ?? 0) + 10) } as Partial<ScreenshotLayer>)} className="w-6 h-6 rounded hover:bg-secondary flex items-center justify-center text-muted-foreground"><Plus className="w-3 h-3" /></button>
            </div>

            <Btn
              active={!!sl.showDeviceFrame}
              onClick={() => update({ showDeviceFrame: !sl.showDeviceFrame } as Partial<ScreenshotLayer>)}
              title="Toggle device frame"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </Btn>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn("w-8 h-8 flex items-center justify-center rounded-lg transition-colors", !!sl.shadow ? "bg-secondary text-foreground" : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground")}
                  title="Shadow Settings"
                >
                  <div className="w-4 h-4 border-[1.5px] border-current rounded-[3px] drop-shadow-md" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-4 flex flex-col gap-4 rounded-xl shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Enable Shadow</span>
                  <Switch
                    checked={!!sl.shadow}
                    onCheckedChange={(checked) => {
                      if (!checked) update({ shadow: undefined } as Partial<ScreenshotLayer>);
                      else update({ shadow: { blur: 24, spread: 0, color: "rgba(0,0,0,0.3)", offsetX: 0, offsetY: 12 } } as Partial<ScreenshotLayer>);
                    }}
                  />
                </div>
                {sl.shadow && (
                  <>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-muted-foreground font-medium">Shadow Color</span>
                      <label className="w-8 h-8 rounded-md cursor-pointer ring-1 ring-border overflow-hidden block hover:ring-foreground transition-all shadow-sm">
                        <input
                          type="color"
                          value={sl.shadow.color.startsWith("rgba") ? "#000000" : sl.shadow.color}
                          onChange={(e) => update({ shadow: { ...sl.shadow!, color: e.target.value } } as Partial<ScreenshotLayer>)}
                          className="opacity-0 w-0 h-0 absolute"
                        />
                        <div className="w-full h-full" style={{ background: sl.shadow.color }} />
                      </label>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-muted-foreground font-medium">Shadow Size</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "12px", blur: 12, offset: 6 },
                          { label: "16px", blur: 16, offset: 8 },
                          { label: "24px", blur: 24, offset: 12 },
                          { label: "48px", blur: 48, offset: 24 },
                          { label: "64px", blur: 64, offset: 32 },
                          { label: "96px", blur: 96, offset: 48 },
                        ].map((sz) => (
                          <button
                            key={sz.label}
                            type="button"
                            onClick={() => update({ shadow: { ...sl.shadow!, blur: sz.blur, offsetY: sz.offset } } as Partial<ScreenshotLayer>)}
                            className={cn(
                              "text-xs py-1.5 rounded-md border transition-all font-medium",
                              sl.shadow?.blur === sz.blur
                                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:bg-secondary/50"
                            )}
                          >
                            {sz.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn("w-8 h-8 flex items-center justify-center rounded-lg transition-colors", sl.focusOverlay?.enabled ? "bg-secondary text-foreground" : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground")}
                  title="Focus Overlay Settings"
                >
                  <div className="relative w-4 h-4 rounded-[3px] border-[1.5px] border-current overflow-hidden flex items-center justify-center opacity-80">
                     <div className="w-1.5 h-1.5 bg-current rounded-[1px] opacity-100" />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-4 flex flex-col gap-5 rounded-xl shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Enable Focus Overlay</span>
                  <Switch
                    checked={sl.focusOverlay?.enabled ?? false}
                    onCheckedChange={(checked) => {
                      if (!checked) update({ focusOverlay: { ...sl.focusOverlay, enabled: false } as NonNullable<ScreenshotLayer["focusOverlay"]> } as Partial<ScreenshotLayer>);
                      else update({ focusOverlay: { enabled: true, cropTop: 0, cropBottom: 0, borderWidth: 2, borderColor: "#3b82f6", roundedCorners: "xl", blurBackground: true, overlayShadow: true, overlayColor: "#9b87f540" } } as Partial<ScreenshotLayer>);
                    }}
                  />
                </div>
                {sl.focusOverlay?.enabled && (
                  <div className="flex flex-col gap-5 border-t pt-4">
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <label className="w-16 h-10 rounded-md cursor-pointer ring-1 ring-border overflow-hidden block hover:ring-foreground transition-all shadow-sm relative group">
                        <input
                          type="color"
                          value={sl.focusOverlay.overlayColor?.slice(0, 7) || "#9b87f5"}
                          onChange={(e) => update({ focusOverlay: { ...sl.focusOverlay!, overlayColor: e.target.value + "40" } } as Partial<ScreenshotLayer>)}
                          className="opacity-0 w-0 h-0 absolute"
                        />
                        <div className="w-full h-full flex items-center justify-center bg-checkerboard">
                          <div className="w-full h-full" style={{ background: sl.focusOverlay.overlayColor || "#9b87f540" }} />
                        </div>
                      </label>
                      <span className="text-[10px] text-muted-foreground font-medium">Overlay Color</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 flex flex-col gap-2">
                        <span className="text-xs text-muted-foreground font-medium">Crop Top (%)</span>
                        <NumInput
                          value={sl.focusOverlay.cropTop}
                          onChange={(v) => update({ focusOverlay: { ...sl.focusOverlay!, cropTop: v } } as Partial<ScreenshotLayer>)}
                          min={0} max={100} width="w-full"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <span className="text-xs text-muted-foreground font-medium">Crop Bottom (%)</span>
                        <NumInput
                          value={sl.focusOverlay.cropBottom}
                          onChange={(v) => update({ focusOverlay: { ...sl.focusOverlay!, cropBottom: v } } as Partial<ScreenshotLayer>)}
                          min={0} max={100} width="w-full"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 flex flex-col gap-2">
                        <span className="text-xs text-muted-foreground font-medium">Border Width</span>
                        <NumInput
                          value={sl.focusOverlay.borderWidth}
                          onChange={(v) => update({ focusOverlay: { ...sl.focusOverlay!, borderWidth: v } } as Partial<ScreenshotLayer>)}
                          min={0} max={50} width="w-full"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <span className="text-xs text-muted-foreground font-medium">Border Color</span>
                        <label className="h-8 rounded-md cursor-pointer ring-1 ring-border overflow-hidden block hover:ring-foreground transition-all shadow-sm">
                          <input
                            type="color"
                            value={sl.focusOverlay.borderColor}
                            onChange={(e) => update({ focusOverlay: { ...sl.focusOverlay!, borderColor: e.target.value } } as Partial<ScreenshotLayer>)}
                            className="opacity-0 w-0 h-0 absolute"
                          />
                          <div className="w-full h-full" style={{ background: sl.focusOverlay.borderColor }} />
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-muted-foreground font-medium">Rounded Corners</span>
                      <div className="flex bg-secondary/50 p-1 rounded-lg">
                        {(["none", "sm", "md", "xl"] as const).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => update({ focusOverlay: { ...sl.focusOverlay!, roundedCorners: r } } as Partial<ScreenshotLayer>)}
                            className={cn(
                              "flex-1 text-[11px] py-1.5 rounded-md transition-all font-medium uppercase",
                              sl.focusOverlay?.roundedCorners === r
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Blur background</span>
                        <Switch
                          size="sm"
                          checked={sl.focusOverlay.blurBackground}
                          onCheckedChange={(c) => update({ focusOverlay: { ...sl.focusOverlay!, blurBackground: c } } as Partial<ScreenshotLayer>)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Overlay shadow</span>
                        <Switch
                          size="sm"
                          checked={sl.focusOverlay.overlayShadow}
                          onCheckedChange={(c) => update({ focusOverlay: { ...sl.focusOverlay!, overlayShadow: c } } as Partial<ScreenshotLayer>)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </PopoverContent>
            </Popover>

            <Separator orientation="vertical" className="h-5 mx-0.5 shrink-0" />
          </>
        )}

        {/* ── TEXT CONTROLS ──────────────────────────────────────────────── */}
        {isText && tl && (
          <>
            {/* Font family dropdown */}
            <Popover open={fontOpen} onOpenChange={setFontOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-secondary text-xs text-foreground transition-colors shrink-0"
                >
                  <span className="max-w-24 truncate" style={{ fontFamily: `"${tl.fontFamily}", sans-serif` }}>
                    {tl.fontFamily}
                  </span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-1 max-h-60 overflow-y-auto shadow-xl" align="start">
                {FONT_FAMILIES.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      loadGoogleFont(f);
                      update({ fontFamily: f } as Partial<TextLayer>);
                      setFontOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-xs hover:bg-secondary rounded-md transition-colors",
                      tl.fontFamily === f && "text-primary font-medium bg-primary/10"
                    )}
                    style={{ fontFamily: `"${f}", sans-serif` }}
                  >
                    {f}
                  </button>
                ))}
              </PopoverContent>
            </Popover>

            {/* Color swatch */}
            <Tooltip>
              <TooltipTrigger
                className="h-7 w-7 rounded hover:bg-secondary flex items-center justify-center transition-colors"
                style={{ color: tl.color }}
              >
                <label className="w-5 h-5 rounded cursor-pointer ring-1 ring-black/20 dark:ring-white/20 overflow-hidden shrink-0 block">
                  <input type="color" value={tl.color.startsWith("rgba") ? "#ffffff" : tl.color} onChange={(e) => update({ color: e.target.value } as Partial<TextLayer>)} className="opacity-0 w-0 h-0" />
                  <div className="w-full h-full" style={{ background: tl.gradientColor ? `linear-gradient(to right, ${tl.gradientColor[0]}, ${tl.gradientColor[1]})` : tl.color }} />
                </label>
              </TooltipTrigger>
              <TooltipContent>Text color</TooltipContent>
            </Tooltip>

            {/* Gradient text toggle */}
            <button
              type="button"
              title={tl.gradientColor ? "Remove gradient" : "Enable gradient text"}
              onClick={() => {
                if (tl.gradientColor) {
                  update({ gradientColor: undefined } as Partial<TextLayer>);
                } else {
                  update({ gradientColor: [tl.color, "#f59e0b", "vertical"] } as Partial<TextLayer>);
                }
              }}
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center transition-colors text-sm font-black",
                tl.gradientColor
                  ? "ring-1 ring-primary/40 bg-primary/10"
                  : "hover:bg-secondary text-muted-foreground"
              )}
            >
              <span style={tl.gradientColor ? { background: `linear-gradient(to right, ${tl.gradientColor[0]}, ${tl.gradientColor[1]})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : {}}>
                G
              </span>
            </button>

            {/* Gradient pickers — shown only when gradient enabled */}
            {tl.gradientColor && (
              <div className="flex items-center gap-0.5 shrink-0">
                <label className="w-5 h-5 rounded cursor-pointer ring-1 ring-border overflow-hidden block" title="Gradient start color">
                  <input type="color" value={tl.gradientColor[0]} onChange={(e) => update({ gradientColor: [e.target.value, tl.gradientColor![1], tl.gradientColor![2]] } as Partial<TextLayer>)} className="opacity-0 w-0 h-0" />
                  <div className="w-full h-full" style={{ background: tl.gradientColor[0] }} />
                </label>
                <label className="w-5 h-5 rounded cursor-pointer ring-1 ring-border overflow-hidden block" title="Gradient end color">
                  <input type="color" value={tl.gradientColor[1]} onChange={(e) => update({ gradientColor: [tl.gradientColor![0], e.target.value, tl.gradientColor![2]] } as Partial<TextLayer>)} className="opacity-0 w-0 h-0" />
                  <div className="w-full h-full" style={{ background: tl.gradientColor[1] }} />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const dirs: Array<"vertical" | "horizontal" | "diagonal"> = ["vertical", "horizontal", "diagonal"];
                    const cur = tl.gradientColor![2];
                    const next = dirs[(dirs.indexOf(cur) + 1) % 3];
                    update({ gradientColor: [tl.gradientColor![0], tl.gradientColor![1], next] } as Partial<TextLayer>);
                  }}
                  className="w-6 h-5 rounded hover:bg-secondary flex items-center justify-center"
                  title={`Direction: ${tl.gradientColor[2]}`}
                >
                  <span className="text-[8px] font-bold text-muted-foreground uppercase">{tl.gradientColor[2][0]}</span>
                </button>
              </div>
            )}

            <Separator orientation="vertical" className="h-5 mx-0.5 shrink-0" />

            {/* Font size */}
            <div className="flex items-center gap-0.5 shrink-0" title="Font Size">
              <Type className="w-3.5 h-3.5 text-muted-foreground mr-1" />
              <button type="button" onClick={() => update({ fontSize: Math.max(8, tl.fontSize - 4) } as Partial<TextLayer>)} className="w-6 h-6 rounded hover:bg-secondary flex items-center justify-center text-muted-foreground"><Minus className="w-3 h-3" /></button>
              <NumInput value={tl.fontSize} onChange={(v) => update({ fontSize: v } as Partial<TextLayer>)} min={8} max={500} width="w-10" />
              <button type="button" onClick={() => update({ fontSize: Math.min(500, tl.fontSize + 4) } as Partial<TextLayer>)} className="w-6 h-6 rounded hover:bg-secondary flex items-center justify-center text-muted-foreground"><Plus className="w-3 h-3" /></button>
            </div>

            {/* Bold */}
            <Btn
              active={tl.fontWeight >= 700}
              onClick={() => update({ fontWeight: tl.fontWeight >= 700 ? 400 : 700 } as Partial<TextLayer>)}
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </Btn>

            <Separator orientation="vertical" className="h-5 mx-0.5 shrink-0" />

            {/* Text alignment */}
            {(["left", "center", "right"] as const).map((a) => {
              const Icon = a === "left" ? AlignLeft : a === "center" ? AlignCenter : AlignRight;
              return (
                <Btn
                  key={a}
                  active={tl.align === a}
                  onClick={() => update({ align: a } as Partial<TextLayer>)}
                  title={`Align ${a}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </Btn>
              );
            })}

            {/* Letter spacing */}
            <Separator orientation="vertical" className="h-5 mx-0.5 shrink-0" />
            <div className="flex items-center gap-1 shrink-0" title="Letter spacing">
              <MoveHorizontal className="w-3 h-3 text-muted-foreground" />
              <NumInput value={tl.letterSpacing ?? 0} onChange={(v) => update({ letterSpacing: v } as Partial<TextLayer>)} min={-20} max={50} width="w-10" />
            </div>

            {/* Line height */}
            <div className="flex items-center gap-1 shrink-0" title="Line height">
              <MoveVertical className="w-3 h-3 text-muted-foreground" />
              <NumInput value={(tl.lineHeight ?? 1.2) * 10} onChange={(v) => update({ lineHeight: v / 10 } as Partial<TextLayer>)} min={5} max={30} width="w-10" />
            </div>

            <Separator orientation="vertical" className="h-5 mx-0.5 shrink-0" />
          </>
        )}

        {/* ── SHAPE COLOR ────────────────────────────────────────────────── */}
        {isShape && sh && (
          <>
            <Tooltip>
              <TooltipTrigger
                className="h-7 w-7 rounded hover:bg-secondary flex items-center justify-center transition-colors"
              >
                <label className="w-6 h-6 rounded-lg cursor-pointer ring-1 ring-border overflow-hidden shrink-0 block">
                  <input type="color" value={sh.fill} onChange={(e) => update({ fill: e.target.value } as Partial<ShapeLayer>)} className="opacity-0 w-0 h-0" />
                  <div className="w-full h-full" style={{ background: sh.fill }} />
                </label>
              </TooltipTrigger>
              <TooltipContent>Fill color</TooltipContent>
            </Tooltip>

            {/* Shape Outline (Stroke) */}
            <Tooltip>
              <TooltipTrigger
                className="h-7 w-7 rounded hover:bg-secondary flex items-center justify-center transition-colors relative"
              >
                <label className="w-6 h-6 rounded-lg cursor-pointer ring-1 ring-border overflow-hidden shrink-0 block flex items-center justify-center bg-transparent border-2 border-foreground/50">
                  <input type="color" value={sh.stroke || "#000000"} onChange={(e) => update({ stroke: e.target.value, strokeWidth: sh.strokeWidth || 4 } as Partial<ShapeLayer>)} className="opacity-0 w-0 h-0 absolute" />
                </label>
              </TooltipTrigger>
              <TooltipContent>Stroke color</TooltipContent>
            </Tooltip>

            {/* Corner radius for Shapes */}
            {sh.shape === "rounded-rectangle" && (
              <div className="flex items-center gap-0.5 shrink-0 ml-1">
                <button type="button" onClick={() => update({ cornerRadius: Math.max(0, (sh.cornerRadius ?? 0) - 5) } as Partial<ShapeLayer>)} className="w-6 h-6 rounded hover:bg-secondary flex items-center justify-center text-muted-foreground"><Minus className="w-3 h-3" /></button>
                <NumInput value={sh.cornerRadius ?? 0} onChange={(v) => update({ cornerRadius: v } as Partial<ShapeLayer>)} min={0} max={200} unit="r" width="w-8" />
                <button type="button" onClick={() => update({ cornerRadius: Math.min(200, (sh.cornerRadius ?? 0) + 5) } as Partial<ShapeLayer>)} className="w-6 h-6 rounded hover:bg-secondary flex items-center justify-center text-muted-foreground"><Plus className="w-3 h-3" /></button>
              </div>
            )}

            <Separator orientation="vertical" className="h-5 mx-0.5 shrink-0" />
          </>
        )}

        {/* ── SYNC TEXT TO ALL SCREENS ───────────────────────────────────── */}
        {isText && tl && (() => {
          const screenSet = set;
          if (!screenSet || !screen) return null;
          const layerIndex = screen.layers.findIndex((l) => l.id === layer.id);
          const hasMultipleScreens = screenSet.screens.length > 1;
          if (!hasMultipleScreens || layerIndex === -1) return null;
          return (
            <Tooltip>
              <TooltipTrigger
                onClick={() => syncTextToScreens(screenSet.id, screen.id, layerIndex)}
                className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 text-xs font-medium transition-colors shrink-0"
              >
                <RefreshCw className="w-3 h-3" />
                Sync
              </TooltipTrigger>
              <TooltipContent>Copy this text to all screens in set</TooltipContent>
            </Tooltip>
          );
        })()}

        {/* ── DUPLICATE / DELETE ─────────────────────────────────────────── */}
        <Btn onClick={() => { if (set && screen) duplicateLayer(set.id, screen.id, layer.id); }} title="Duplicate (Ctrl+D)">
          <Copy className="w-3.5 h-3.5" />
        </Btn>
        <Btn
          danger
          onClick={() => { if (set && screen) { deleteLayer(set.id, screen.id, layer.id); setActiveLayer(null); } }}
          title="Delete (Del)"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Btn>
      </div>
    </TooltipProvider>
  );
}
