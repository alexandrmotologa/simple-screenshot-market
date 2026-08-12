"use client";

import { useRef } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { TextLayer, ScreenshotLayer, ShapeLayer } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bold, AlignLeft, AlignCenter, AlignRight,
  Trash2, Copy, ChevronDown, Minus, Plus,
  RotateCcw, Upload, Maximize2, Minimize2, Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";


const FONT_FAMILIES = ["Geist Sans", "Inter", "Arial", "Georgia", "Courier New", "Verdana", "Helvetica"];

export function FloatingToolbar() {
  const {
    getActiveLayer,
    getActiveScreen,
    getActiveSet,
    updateLayer,
    deleteLayer,
    duplicateLayer,
    setActiveLayer,
  } = useEditorStore();

  const layer = getActiveLayer();
  const screen = getActiveScreen();
  const set = getActiveSet();

  if (!layer || !screen || !set) return null;

  const update = (updates: Record<string, unknown>) => {
    updateLayer(set.id, screen.id, layer.id, updates as Parameters<typeof updateLayer>[3]);
  };

  const isText = layer.type === "text";
  const isScreenshot = layer.type === "screenshot";
  const tl = isText ? (layer as TextLayer) : null;
  const sl = isScreenshot ? (layer as ScreenshotLayer) : null;

  // File input ref for screenshot upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      update({ src: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <TooltipProvider>
    <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-1.5 rounded-xl bg-card/95 backdrop-blur-md border border-border/60 shadow-xl shadow-black/30">
      {/* Layer type label */}
      <span className={cn(
        "text-xs font-medium px-1 capitalize",
        isScreenshot ? "text-primary" : "text-muted-foreground"
      )}>
        {isScreenshot ? "📱 Screenshot" : `${layer.type} layer`}
      </span>

      <Separator orientation="vertical" className="h-5 mx-0.5" />

      {/* ── SCREENSHOT TOOLBAR ───────────────────────────────── */}
      {isScreenshot && sl && (
        <>
          {/* Upload new screenshot */}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleScreenshotUpload} />
          <button
            type="button"
            title="Upload screenshot"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/15 hover:bg-primary/25 text-primary text-xs font-medium transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            {sl.src ? "Change" : "Upload"}
          </button>

          <Separator orientation="vertical" className="h-5 mx-0.5" />

          {/* Object fit */}
          <button
            type="button"
            title={sl.objectFit === "cover" ? "Switch to Contain" : "Switch to Cover"}
            onClick={() => update({ objectFit: sl.objectFit === "cover" ? "contain" : "cover" })}
            className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-secondary text-xs text-foreground transition-colors"
          >
            {sl.objectFit === "cover"
              ? <><Maximize2 className="w-3.5 h-3.5" /> Cover</>
              : <><Minimize2 className="w-3.5 h-3.5" /> Contain</>}
          </button>

          {/* Corner radius */}
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => update({ cornerRadius: Math.max(0, (sl.cornerRadius ?? 0) - 10) })} className="w-6 h-6 rounded-lg hover:bg-secondary flex items-center justify-center"><Minus className="w-3 h-3" /></button>
            <span className="text-xs w-8 text-center font-mono">{sl.cornerRadius ?? 0}r</span>
            <button type="button" onClick={() => update({ cornerRadius: Math.min(100, (sl.cornerRadius ?? 0) + 10) })} className="w-6 h-6 rounded-lg hover:bg-secondary flex items-center justify-center"><Plus className="w-3 h-3" /></button>
          </div>

          {/* Device frame toggle */}
          <button
            type="button"
            title="Toggle device frame"
            onClick={() => update({ showDeviceFrame: !sl.showDeviceFrame })}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors",
              sl.showDeviceFrame ? "bg-primary/15 text-primary" : "hover:bg-secondary text-muted-foreground"
            )}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Frame
          </button>

          <Separator orientation="vertical" className="h-5 mx-0.5" />
        </>
      )}

      {isText && tl && (
        <>
          {/* Font family */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-secondary text-xs text-foreground">
              <span className="max-w-20 truncate">{tl.fontFamily}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-44 bg-popover border border-border rounded-xl shadow-xl py-1 hidden group-hover:block z-50">
              {FONT_FAMILIES.map((f) => (
                <button
                  key={f}
                  onClick={() => update({ fontFamily: f })}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-xs hover:bg-secondary transition-colors",
                    tl.fontFamily === f && "text-primary font-medium"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Color swatch */}
          <Tooltip>
            <TooltipTrigger>
              <label className="w-6 h-6 rounded-lg cursor-pointer ring-1 ring-border overflow-hidden">
                <input
                  type="color"
                  value={tl.color}
                  onChange={(e) => update({ color: e.target.value })}
                  className="opacity-0 w-0 h-0"
                />
                <div className="w-full h-full" style={{ background: tl.color }} />
              </label>
            </TooltipTrigger>
            <TooltipContent>Text color</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-5 mx-0.5" />

          {/* Bold */}
          <Tooltip>
            <TooltipTrigger>
              <button
                onClick={() => update({ fontWeight: tl.fontWeight >= 700 ? 400 : 700 })}
                className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors", tl.fontWeight >= 700 ? "bg-primary text-primary-foreground" : "hover:bg-secondary")}
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-5 mx-0.5" />

          {/* Font size */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => update({ fontSize: Math.max(8, tl.fontSize - 2) })}
              className="w-6 h-6 rounded flex items-center justify-center hover:bg-secondary text-muted-foreground"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-mono w-8 text-center">{tl.fontSize}</span>
            <button
              onClick={() => update({ fontSize: Math.min(400, tl.fontSize + 2) })}
              className="w-6 h-6 rounded flex items-center justify-center hover:bg-secondary text-muted-foreground"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <Separator orientation="vertical" className="h-5 mx-0.5" />

          {/* Alignment */}
          {(["left", "center", "right"] as const).map((a) => {
            const Icon = a === "left" ? AlignLeft : a === "center" ? AlignCenter : AlignRight;
            return (
              <Tooltip key={a}>
                <TooltipTrigger>
                  <button
                    onClick={() => update({ align: a })}
                    className={cn("w-7 h-7 rounded-lg flex items-center justify-center transition-colors", tl.align === a ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground")}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="capitalize">{a}</TooltipContent>
              </Tooltip>
            );
          })}

          <Separator orientation="vertical" className="h-5 mx-0.5" />

          {/* Opacity */}
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Opacity</span>
                <span className="text-xs font-mono w-8">{Math.round((layer.opacity ?? 1) * 100)}%</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>Opacity</TooltipContent>
          </Tooltip>
        </>
      )}

      {/* Shape color */}
      {layer.type === "shape" && (
        <>
          <Tooltip>
            <TooltipTrigger>
              <label className="w-6 h-6 rounded-lg cursor-pointer ring-1 ring-border overflow-hidden">
                <input
                  type="color"
                  value={(layer as ShapeLayer).fill}
                  onChange={(e) => update({ fill: e.target.value })}
                  className="opacity-0 w-0 h-0"
                />
                <div className="w-full h-full" style={{ background: (layer as ShapeLayer).fill }} />
              </label>
            </TooltipTrigger>
            <TooltipContent>Fill color</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="h-5 mx-0.5" />
        </>
      )}

      {/* Rotation */}
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <RotateCcw className="w-3 h-3" />
            <span className="font-mono w-8">{Math.round(layer.rotation ?? 0)}°</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>Rotation</TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className="h-5 mx-0.5" />

      {/* Duplicate */}
      <Tooltip>
        <TooltipTrigger>
          <button
            onClick={() => { if (set && screen) duplicateLayer(set.id, screen.id, layer.id); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Duplicate</TooltipContent>
      </Tooltip>

      {/* Delete */}
      <Tooltip>
        <TooltipTrigger>
          <button
            onClick={() => {
              if (set && screen) {
                deleteLayer(set.id, screen.id, layer.id);
                setActiveLayer(null);
              }
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-destructive/15 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </div>
    </TooltipProvider>
  );
}
