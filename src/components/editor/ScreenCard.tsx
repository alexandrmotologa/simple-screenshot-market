"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useEditorStore } from "@/lib/store/editorStore";
import {
  Screen, ScreenSet, TextLayer, ShapeLayer,
  ImageLayer, ScreenshotLayer, FlagLayer, Layer
} from "@/lib/types";
import { cn } from "@/lib/utils";

interface ScreenCardProps {
  screen: Screen;
  screenSet: ScreenSet;
  index: number;
  /** When true, screenshot zones are hidden to focus on text/design */
  hideScreenshots?: boolean;
}

const BASE_CARD_WIDTH = 300;

// ── Image cache ───────────────────────────────────────────────────────────────
const imgCache = new Map<string, HTMLImageElement>();
function loadImage(src: string): Promise<HTMLImageElement> {
  if (imgCache.has(src)) return Promise.resolve(imgCache.get(src)!);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => { imgCache.set(src, img); resolve(img); };
    img.onerror = reject;
    img.src = src;
  });
}

// ── Draw gradient string helper ────────────────────────────────────────────────
function parseColorStr(ctx: CanvasRenderingContext2D, fill: string, x: number, y: number, w: number, h: number): string | CanvasGradient {
  if (fill.startsWith("linear-gradient")) {
    // Simple top-to-bottom gradient fallback
    const g = ctx.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "#000000");
    return g;
  }
  return fill;
}

export function ScreenCard({ screen, screenSet, index, hideScreenshots }: ScreenCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [editingCaption, setEditingCaption] = useState(false);
  const [captionDraft, setCaptionDraft] = useState(screen.caption ?? "");
  const captionRef = useRef<HTMLInputElement>(null);
  const {
    activeSetId, activeScreenId, activeLayerId,
    setActiveSet, setActiveScreen, setActiveLayer,
    deleteScreen, updateLayer, updateScreen, zoom,
  } = useEditorStore();

  const saveCaption = () => {
    setEditingCaption(false);
    updateScreen(screenSet.id, screen.id, { caption: captionDraft.trim() });
  };

  const isActiveScreen = activeSetId === screenSet.id && activeScreenId === screen.id;
  const CARD_DISPLAY_WIDTH = Math.round(BASE_CARD_WIDTH * zoom);
  const scale = CARD_DISPLAY_WIDTH / screen.width;
  const displayH = Math.round(screen.height * scale);

  // ── Drag state ─────────────────────────────────────────────────────────────
  const dragRef = useRef<{
    layerId: string;
    startX: number; startY: number;
    origX: number; origY: number;
  } | null>(null);

  // ── Draw ───────────────────────────────────────────────────────────────────
  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = screen.width;
    const H = screen.height;
    canvas.width = W;
    canvas.height = H;

    // ── Background ────────────────────────────────────────────────────────────
    const bg = screen.background;
    if (bg.type === "solid" && bg.color) {
      ctx.fillStyle = bg.color;
      ctx.fillRect(0, 0, W, H);
    } else if (bg.type === "gradient" && bg.gradient) {
      const dirs: Record<string, [number, number, number, number]> = {
        "to-b":  [0, 0, 0, H], "to-r":  [0, 0, W, 0],
        "to-br": [0, 0, W, H], "to-bl": [W, 0, 0, H],
        "to-tr": [0, H, W, 0], "to-tl": [W, H, 0, 0],
      };
      const [x0, y0, x1, y1] = dirs[bg.gradient.direction] ?? [0, 0, 0, H];
      const grad = ctx.createLinearGradient(x0, y0, x1, y1);
      for (const stop of bg.gradient.stops) {
        grad.addColorStop(stop.position / 100, stop.color);
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else {
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, W, H);
    }

    // ── Layers ────────────────────────────────────────────────────────────────
    for (const layer of screen.layers) {
      ctx.save();
      ctx.globalAlpha = layer.opacity ?? 1;

      if (layer.rotation) {
        const cx = layer.x + layer.width / 2;
        const cy = layer.y + layer.height / 2;
        ctx.translate(cx, cy);
        ctx.rotate((layer.rotation * Math.PI) / 180);
        ctx.translate(-cx, -cy);
      }

      // ── TEXT ──────────────────────────────────────────────────────────────
      if (layer.type === "text") {
        const tl = layer as TextLayer;
        ctx.font = `${tl.fontWeight} ${tl.fontSize}px "${tl.fontFamily}", -apple-system, sans-serif`;
        ctx.fillStyle = tl.color;
        ctx.textAlign = tl.align as CanvasTextAlign;
        if (tl.letterSpacing) ctx.letterSpacing = `${tl.letterSpacing}px`;
        const lines = tl.content.split("\n");
        const lineH = tl.fontSize * (tl.lineHeight ?? 1.25);
        const xPos =
          tl.align === "center" ? tl.x + tl.width / 2
          : tl.align === "right" ? tl.x + tl.width
          : tl.x;
        lines.forEach((line, i) => {
          ctx.fillText(line, xPos, tl.y + tl.fontSize + i * lineH, tl.width);
        });
      }

      // ── SCREENSHOT ZONE ───────────────────────────────────────────────────
      else if (layer.type === "screenshot") {
        const sl = layer as ScreenshotLayer;
        const { x, y, width: w, height: h, cornerRadius: r = 0 } = sl;

        // When hideScreenshots is active, show a subtle dimmed placeholder instead
        if (hideScreenshots) {
          ctx.beginPath();
          if (r > 0) ctx.roundRect(x, y, w, h, r);
          else ctx.rect(x, y, w, h);
          ctx.fillStyle = "rgba(99,102,241,0.08)";
          ctx.fill();
          ctx.strokeStyle = "rgba(99,102,241,0.25)";
          ctx.lineWidth = 2;
          ctx.setLineDash([8, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
          continue;
        }

        // Drop shadow
        if (sl.shadow) {
          ctx.shadowBlur = sl.shadow.blur;
          ctx.shadowColor = sl.shadow.color;
          ctx.shadowOffsetX = sl.shadow.offsetX;
          ctx.shadowOffsetY = sl.shadow.offsetY;
        }

        // Clip to rounded rect
        ctx.beginPath();
        if (r > 0) {
          ctx.roundRect(x, y, w, h, r);
        } else {
          ctx.rect(x, y, w, h);
        }
        ctx.clip();

        // Reset shadow after clip path
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";

        if (sl.src) {
          // Has image — draw it
          try {
            const img = await loadImage(sl.src);
            if (sl.objectFit === "cover") {
              const imgRatio = img.width / img.height;
              const zoneRatio = w / h;
              let sx = 0, sy = 0, sw = img.width, sh = img.height;
              if (imgRatio > zoneRatio) {
                sw = img.height * zoneRatio;
                sx = (img.width - sw) / 2;
              } else {
                sh = img.width / zoneRatio;
                sy = (img.height - sh) / 2;
              }
              ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
            } else {
              ctx.drawImage(img, x, y, w, h);
            }
          } catch {
            drawPlaceholder(ctx, x, y, w, h, sl.label);
          }
        } else {
          // No image yet — show premium placeholder
          drawPlaceholder(ctx, x, y, w, h, sl.label);
        }
      }

      // ── SHAPE ─────────────────────────────────────────────────────────────
      else if (layer.type === "shape") {
        const sl = layer as ShapeLayer;
        ctx.fillStyle = parseColorStr(ctx, sl.fill, sl.x, sl.y, sl.width, sl.height) as string;
        const r2 = sl.cornerRadius ?? 0;
        if (sl.shape === "circle") {
          ctx.beginPath();
          ctx.arc(sl.x + sl.width / 2, sl.y + sl.height / 2, Math.min(sl.width, sl.height) / 2, 0, Math.PI * 2);
          ctx.fill();
          if (sl.stroke && sl.strokeWidth) { ctx.strokeStyle = sl.stroke; ctx.lineWidth = sl.strokeWidth; ctx.stroke(); }
        } else if (r2 > 0) {
          ctx.beginPath(); ctx.roundRect(sl.x, sl.y, sl.width, sl.height, r2); ctx.fill();
          if (sl.stroke && sl.strokeWidth) { ctx.strokeStyle = sl.stroke; ctx.lineWidth = sl.strokeWidth; ctx.stroke(); }
        } else {
          ctx.fillRect(sl.x, sl.y, sl.width, sl.height);
          if (sl.stroke && sl.strokeWidth) { ctx.strokeStyle = sl.stroke; ctx.lineWidth = sl.strokeWidth; ctx.strokeRect(sl.x, sl.y, sl.width, sl.height); }
        }
      }

      // ── FLAG / EMOJI / BRAND ─────────────────────────────────────────────
      else if (layer.type === "flag" || layer.type === "emoji" || layer.type === "brand") {
        const fl = layer as FlagLayer;
        ctx.font = `${layer.height * 0.75}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(fl.content, layer.x + layer.width / 2, layer.y + layer.height / 2);
      }

      // ── IMAGE ─────────────────────────────────────────────────────────────
      else if (layer.type === "image") {
        const il = layer as ImageLayer;
        if (il.src) {
          try {
            const img = await loadImage(il.src);
            if (il.cornerRadius > 0) {
              ctx.beginPath();
              ctx.roundRect(il.x, il.y, il.width, il.height, il.cornerRadius);
              ctx.clip();
            }
            ctx.drawImage(img, il.x, il.y, il.width, il.height);
          } catch {
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.fillRect(il.x, il.y, il.width, il.height);
          }
        }
      }

      // ── Selection outline ─────────────────────────────────────────────────
      if (isActiveScreen && layer.id === activeLayerId) {
        ctx.restore(); // restore before drawing outline (no clip)
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "#6366f1";
        ctx.lineWidth = 6;
        ctx.setLineDash([14, 6]);
        ctx.strokeRect(layer.x - 4, layer.y - 4, layer.width + 8, layer.height + 8);
        ctx.setLineDash([]);
        // Corner handles
        ctx.fillStyle = "#6366f1";
        [[layer.x - 4, layer.y - 4], [layer.x + layer.width - 4, layer.y - 4],
         [layer.x - 4, layer.y + layer.height - 4], [layer.x + layer.width - 4, layer.y + layer.height - 4]
        ].forEach(([hx, hy]) => ctx.fillRect(hx, hy, 8, 8));
      }

      ctx.restore();
    }
  }, [screen, isActiveScreen, activeLayerId]);

  useEffect(() => { draw(); }, [draw]);

  // ── Hit testing ───────────────────────────────────────────────────────────
  const hitTest = (cx: number, cy: number): string | null => {
    for (let i = screen.layers.length - 1; i >= 0; i--) {
      const l = screen.layers[i];
      if (cx >= l.x && cx <= l.x + l.width && cy >= l.y && cy <= l.y + l.height) return l.id;
    }
    return null;
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * screen.width,
      y: ((e.clientY - rect.top) / rect.height) * screen.height,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setActiveSet(screenSet.id);
    setActiveScreen(screen.id);
    const { x, y } = getCanvasCoords(e);
    const hit = hitTest(x, y);
    setActiveLayer(hit);
    if (hit) {
      const layer = screen.layers.find((l) => l.id === hit);
      if (layer) dragRef.current = { layerId: hit, startX: x, startY: y, origX: layer.x, origY: layer.y };
    }
    e.stopPropagation();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    const { x, y } = getCanvasCoords(e);
    const dx = x - dragRef.current.startX;
    const dy = y - dragRef.current.startY;
    updateLayer(screenSet.id, screen.id, dragRef.current.layerId, {
      x: Math.round(dragRef.current.origX + dx),
      y: Math.round(dragRef.current.origY + dy),
    } as Parameters<typeof updateLayer>[3]);
  };

  const handleMouseUp = () => { dragRef.current = null; };

  const activeLayer = screen.layers.find(l => l.id === activeLayerId);
  const isScreenshotActive = isActiveScreen && activeLayer?.type === "screenshot";

  // ── Resize handle drag ─────────────────────────────────────────────────────
  const resizeRef = useRef<{
    handle: string; // "nw"|"n"|"ne"|"e"|"se"|"s"|"sw"|"w"
    startX: number; startY: number;
    origX: number; origY: number;
    origW: number; origH: number;
  } | null>(null);

  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (!activeLayer) return;
    resizeRef.current = {
      handle,
      startX: e.clientX, startY: e.clientY,
      origX: activeLayer.x, origY: activeLayer.y,
      origW: activeLayer.width, origH: activeLayer.height,
    };

    const onMove = (ev: MouseEvent) => {
      if (!resizeRef.current || !activeLayer) return;
      const dx = (ev.clientX - resizeRef.current.startX) / scale;
      const dy = (ev.clientY - resizeRef.current.startY) / scale;
      const h = resizeRef.current.handle;
      let { origX: nx, origY: ny, origW: nw, origH: nh } = resizeRef.current;

      if (h.includes("e")) nw = Math.max(50, nw + dx);
      if (h.includes("s")) nh = Math.max(50, nh + dy);
      if (h.includes("w")) { nx = nx + dx; nw = Math.max(50, nw - dx); }
      if (h.includes("n")) { ny = ny + dy; nh = Math.max(50, nh - dy); }

      updateLayer(screenSet.id, screen.id, activeLayer.id, {
        x: Math.round(nx), y: Math.round(ny),
        width: Math.round(nw), height: Math.round(nh),
      } as Parameters<typeof updateLayer>[3]);
    };

    const onUp = () => {
      resizeRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div className="shrink-0 flex flex-col gap-1.5 group" style={{ width: CARD_DISPLAY_WIDTH }}>
      {/* Header: index + caption editable + delete */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-muted-foreground font-mono w-4 shrink-0">{index + 1}</span>

        {/* Caption — editable inline */}
        {editingCaption ? (
          <input
            ref={captionRef}
            value={captionDraft}
            onChange={(e) => setCaptionDraft(e.target.value)}
            onBlur={saveCaption}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); saveCaption(); }
              if (e.key === "Escape") { setEditingCaption(false); setCaptionDraft(screen.caption ?? ""); }
            }}
            className="flex-1 text-[10px] font-medium bg-transparent border-0 border-b border-primary/50 outline-none text-foreground/80 py-0 px-0.5 min-w-0"
            placeholder="Add caption…"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCaptionDraft(screen.caption ?? "");
              setEditingCaption(true);
              setTimeout(() => captionRef.current?.focus(), 0);
            }}
            className="flex-1 text-left text-[10px] text-muted-foreground/60 hover:text-muted-foreground truncate transition-colors px-0.5 py-0"
            title="Click to edit caption"
          >
            {screen.caption || <span className="italic opacity-50">Caption…</span>}
          </button>
        )}

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); deleteScreen(screenSet.id, screen.id); }}
          className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-destructive shrink-0"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {/* Canvas */}
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden transition-all duration-150",
          isActiveScreen
            ? "ring-2 ring-primary shadow-lg shadow-primary/20"
            : "ring-1 ring-border/60 hover:ring-primary/30 hover:shadow-md"
        )}
        style={{ width: CARD_DISPLAY_WIDTH, height: displayH }}
      >
        <canvas
          ref={canvasRef}
          width={screen.width}
          height={screen.height}
          style={{ width: CARD_DISPLAY_WIDTH, height: displayH, display: "block" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={dragRef.current || isScreenshotActive ? "cursor-move" : "cursor-pointer"}
        />

        {/* Resize handles overlay — shown when layer is selected */}
        {isActiveScreen && activeLayer && (
          <ResizeOverlay
            layer={activeLayer}
            scale={scale}
            onResizeStart={handleResizeStart}
          />
        )}
      </div>

      {/* Screen name */}
      <p className="text-[10px] text-center text-muted-foreground/50 truncate">{screen.name}</p>
    </div>
  );
}

// ── Resize handles overlay ─────────────────────────────────────────────────────
function ResizeOverlay({
  layer, scale, onResizeStart,
}: {
  layer: Layer;
  scale: number;
  onResizeStart: (e: React.MouseEvent, handle: string) => void;
}) {
  const x = layer.x * scale;
  const y = layer.y * scale;
  const w = layer.width * scale;
  const h = layer.height * scale;
  const hs = 8; // handle size px

  const handles: { id: string; cx: number; cy: number; cursor: string }[] = [
    { id: "nw", cx: x,       cy: y,       cursor: "nwse-resize" },
    { id: "n",  cx: x + w/2, cy: y,       cursor: "ns-resize" },
    { id: "ne", cx: x + w,   cy: y,       cursor: "nesw-resize" },
    { id: "e",  cx: x + w,   cy: y + h/2, cursor: "ew-resize" },
    { id: "se", cx: x + w,   cy: y + h,   cursor: "nwse-resize" },
    { id: "s",  cx: x + w/2, cy: y + h,   cursor: "ns-resize" },
    { id: "sw", cx: x,       cy: y + h,   cursor: "nesw-resize" },
    { id: "w",  cx: x,       cy: y + h/2, cursor: "ew-resize" },
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {/* Selection box */}
      <div
        className="absolute border-2 border-primary/70"
        style={{ left: x, top: y, width: w, height: h }}
      />
      {/* Handles */}
      {handles.map(({ id, cx, cy, cursor }) => (
        <div
          key={id}
          className="absolute pointer-events-auto bg-white border-2 border-primary rounded-sm shadow-sm hover:bg-primary/20 transition-colors"
          style={{
            left: cx - hs / 2,
            top: cy - hs / 2,
            width: hs,
            height: hs,
            cursor,
          }}
          onMouseDown={(e) => onResizeStart(e, id)}
        />
      ))}
    </div>
  );
}

// ── Placeholder drawing ────────────────────────────────────────────────────────
function drawPlaceholder(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  label?: string,
) {
  // Dark translucent fill
  ctx.fillStyle = "rgba(15,23,42,0.55)";
  ctx.fillRect(x, y, w, h);

  // Dashed border
  ctx.strokeStyle = "rgba(99,102,241,0.55)";
  ctx.lineWidth = 6;
  ctx.setLineDash([24, 12]);
  ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
  ctx.setLineDash([]);

  // Phone icon (simple outline)
  const iw = Math.min(w * 0.22, 130);
  const ih = iw * 1.75;
  const ix = x + (w - iw) / 2;
  const iy = y + (h - ih) / 2 - (label ? 60 : 0);
  const ir = iw * 0.12;

  ctx.strokeStyle = "rgba(99,102,241,0.8)";
  ctx.lineWidth = 5;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.roundRect(ix, iy, iw, ih, ir);
  ctx.stroke();

  // Small home indicator
  ctx.fillStyle = "rgba(99,102,241,0.8)";
  ctx.beginPath();
  ctx.roundRect(ix + iw * 0.3, iy + ih - iw * 0.08, iw * 0.4, iw * 0.04, 2);
  ctx.fill();

  // Upload icon (arrow up + line)
  const arrowCx = x + w / 2;
  const arrowCy = iy + ih / 2;
  const arrowSize = iw * 0.35;
  ctx.strokeStyle = "rgba(99,102,241,0.7)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(arrowCx, arrowCy - arrowSize * 0.6);
  ctx.lineTo(arrowCx, arrowCy + arrowSize * 0.3);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(arrowCx - arrowSize * 0.4, arrowCy - arrowSize * 0.15);
  ctx.lineTo(arrowCx, arrowCy - arrowSize * 0.6);
  ctx.lineTo(arrowCx + arrowSize * 0.4, arrowCy - arrowSize * 0.15);
  ctx.stroke();

  // Label text
  if (label) {
    ctx.font = `500 ${Math.max(32, w * 0.04)}px -apple-system, sans-serif`;
    ctx.fillStyle = "rgba(199,210,254,0.85)";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(label, x + w / 2, iy + ih + 30);
  }

  // Tap instruction
  const instrFontSize = Math.max(28, w * 0.034);
  ctx.font = `400 ${instrFontSize}px -apple-system, sans-serif`;
  ctx.fillStyle = "rgba(148,163,184,0.65)";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Tap to add screenshot", x + w / 2, y + h - instrFontSize * 2 - 30);
}
