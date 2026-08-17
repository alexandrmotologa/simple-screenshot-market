import { useCallback, useRef, useEffect, useState } from "react";
import { Trash2, Copy, ArrowUp, ArrowDown, Lock, RefreshCw, GripHorizontal, AlignCenter, AlignJustify, Edit3 } from "lucide-react";
import { useEditorStore } from "@/lib/store/editorStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { toast } from "@/lib/store/toastStore";
import {
  Screen, ScreenSet, TextLayer, ShapeLayer,
  ImageLayer, ScreenshotLayer, FlagLayer, Layer
} from "@/lib/types";
import { ALL_DEVICES, COLOR_HEX_MAP } from "@/lib/devices";
import { cn, loadGoogleFont } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import { ScreenVerticalMenu } from "@/components/editor/ScreenVerticalMenu";

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
  // Text inline edit state
  const [editingLayerId, setEditingLayerId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editingLayerId && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [editingLayerId]);

  // Right-click context menu
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number; layerId: string } | null>(null);
  // Smart Snapping state
  const [snapGuides, setSnapGuides] = useState<{ x?: boolean; y?: boolean } | null>(null);
  // Drag over state for images
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const [fontsLoaded, setFontsLoaded] = useState(0);

  // ── Preload Fonts ─────────────────────────────────────────────────────────
  useEffect(() => {
    let hasFonts = false;
    const fontPromises: Promise<void>[] = [];
    for (const layer of screen.layers) {
      if (layer.type === "text" && (layer as TextLayer).fontFamily) {
        fontPromises.push(loadGoogleFont((layer as TextLayer).fontFamily));
        hasFonts = true;
      }
    }
    if (hasFonts) {
      Promise.all(fontPromises).then(() => {
        // Redraw will be triggered automatically if we can force a canvas update,
        // but since `draw` is defined below, we'll just rely on the component re-rendering
        // if fonts load. Actually, `document.fonts.load` fires an event.
        // Let's use a local state to trigger a re-render once fonts are loaded.
        setFontsLoaded(prev => prev + 1);
      });
    }
  }, [screen.layers]);


  const {
    activeSetId, activeScreenId, activeLayerId, selectedLayerIds,
    setActiveSet, setActiveScreen, setActiveLayer, toggleSelectLayer, clearSelection,
    deleteScreen, deleteLayer, duplicateLayer, updateLayer, updateScreen,
    lockLayer, bringForward, sendBackward, zoom,
  } = useEditorStore();
  const { activeLang } = useLanguageStore();

  const saveCaption = () => {
    setEditingCaption(false);
    updateScreen(screenSet.id, screen.id, { caption: captionDraft.trim() });
    useEditorStore.getState().recordHistory();
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
    groupItems?: { id: string; origX: number; origY: number }[];
  } | null>(null);

  // ── Draw ───────────────────────────────────────────────────────────────────
  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = screen.width;
    const H = screen.height;
    
    const dpr = window.devicePixelRatio || 1;
    const displayW = CARD_DISPLAY_WIDTH;
    const displayH = (H / W) * displayW;
    const targetW = Math.round(displayW * dpr);
    const targetH = Math.round(displayH * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const scale = targetW / W;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, targetW, targetH);
    ctx.scale(scale, scale);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

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
    } else if (bg.type === "mesh" && bg.mesh) {
      // 4-corner mesh gradient using 4 radial gradients blended together
      const { topLeft: tl, topRight: tr, bottomLeft: bl, bottomRight: br } = bg.mesh;
      // Layer: top-left radial
      const g1 = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.hypot(W, H));
      g1.addColorStop(0, tl + "cc"); g1.addColorStop(1, tl + "00");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);
      // top-right radial
      const g2 = ctx.createRadialGradient(W, 0, 0, W, 0, Math.hypot(W, H));
      g2.addColorStop(0, tr + "cc"); g2.addColorStop(1, tr + "00");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
      // bottom-left radial
      const g3 = ctx.createRadialGradient(0, H, 0, 0, H, Math.hypot(W, H));
      g3.addColorStop(0, bl + "cc"); g3.addColorStop(1, bl + "00");
      ctx.fillStyle = g3; ctx.fillRect(0, 0, W, H);
      // bottom-right radial
      const g4 = ctx.createRadialGradient(W, H, 0, W, H, Math.hypot(W, H));
      g4.addColorStop(0, br + "cc"); g4.addColorStop(1, br + "00");
      ctx.fillStyle = g4; ctx.fillRect(0, 0, W, H);
    } else if (bg.type === "image" && bg.imageUrl) {
      try {
        const bgImg = await loadImage(bg.imageUrl);
        if (bg.imageSlice) {
          const { x, y, width, height } = bg.imageSlice;
          ctx.drawImage(bgImg, x, y, width, height, 0, 0, W, H);
        } else {
          ctx.drawImage(bgImg, 0, 0, W, H);
        }
      } catch (err) {
        console.error("Failed to load background image:", err);
      }
    } else {
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, W, H);
    }

    // ── Pattern overlay ────────────────────────────────────────────────────────
    if (bg.pattern) {
      const { type: pType, color: pColor, opacity: pOpacity, size: pSize = 20, spacing: pSpacing = 30 } = bg.pattern;
      ctx.globalAlpha = pOpacity;
      ctx.fillStyle = pColor;
      ctx.strokeStyle = pColor;

      if (pType === "dots") {
        const r = pSize / 2;
        const gap = pSpacing;
        for (let py = 0; py < H + gap; py += gap) {
          for (let px = 0; px < W + gap; px += gap) {
            ctx.beginPath();
            ctx.arc(px, py, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (pType === "lines") {
        ctx.lineWidth = pSize / 4;
        const gap = pSpacing;
        for (let py = -W; py < H + W; py += gap) {
          ctx.beginPath();
          ctx.moveTo(0, py);
          ctx.lineTo(W, py + W);
          ctx.stroke();
        }
      } else if (pType === "grid") {
        ctx.lineWidth = 1;
        const gap = pSpacing;
        for (let py = 0; py < H; py += gap) {
          ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(W, py); ctx.stroke();
        }
        for (let px = 0; px < W; px += gap) {
          ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, H); ctx.stroke();
        }
      } else if (pType === "noise") {
        // Pseudo-noise using random dots
        const seed = 42.123;
        const pseudo = (n: number) => {
          const x = Math.sin(n + seed) * 10000;
          return x - Math.floor(x);
        };
        // Reduce the number of dots for better performance (0.01 instead of 0.03)
        const dotCount = Math.floor(W * H * 0.015);
        for (let i = 0; i < dotCount; i++) {
          const px = pseudo(i * 3) * W;
          const py = pseudo(i * 3 + 1) * H;
          const pr = pseudo(i * 3 + 2) * 1.5 + 0.5;
          ctx.beginPath();
          ctx.arc(px, py, pr, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
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

        // i18n: resolve localized content for active language
        const rawContent =
          activeLang !== "en" && screen.localizations?.[activeLang]?.[tl.id]?.content != null
            ? screen.localizations[activeLang][tl.id].content!
            : tl.content;

        // Apply textCase
        let displayContent = rawContent;
        if (tl.textCase === "uppercase") displayContent = displayContent.toUpperCase();
        else if (tl.textCase === "lowercase") displayContent = displayContent.toLowerCase();
        else if (tl.textCase === "capitalize")
          displayContent = displayContent.replace(/\b\w/g, (c) => c.toUpperCase());

        ctx.font = `${tl.fontWeight} ${tl.fontSize}px "${tl.fontFamily}", -apple-system, sans-serif`;

        // Gradient text support
        if (tl.gradientColor) {
          const [c1, c2, dir] = tl.gradientColor;
          let grad: CanvasGradient;
          if (dir === "horizontal") grad = ctx.createLinearGradient(tl.x, 0, tl.x + tl.width, 0);
          else if (dir === "diagonal") grad = ctx.createLinearGradient(tl.x, tl.y, tl.x + tl.width, tl.y + tl.height);
          else grad = ctx.createLinearGradient(0, tl.y, 0, tl.y + tl.height);
          grad.addColorStop(0, c1);
          grad.addColorStop(1, c2);
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = tl.color;
        }

        ctx.textAlign = tl.align as CanvasTextAlign;
        if (tl.letterSpacing) ctx.letterSpacing = `${tl.letterSpacing}px`;

        const words = displayContent.split(/\s+/);
        let currentLine = "";
        const lines: string[] = [];

        for (let i = 0; i < words.length; i++) {
          const testLine = currentLine + words[i] + " ";
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > tl.width && i > 0) {
            lines.push(currentLine.trim());
            currentLine = words[i] + " ";
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine.trim());

        // Also split by explicit newlines if the user typed them
        const finalLines = lines.flatMap(line => line.split("\n"));

        const lineH = tl.fontSize * (tl.lineHeight ?? 1.25);
        const xPos =
          tl.align === "center" ? tl.x + tl.width / 2
          : tl.align === "right" ? tl.x + tl.width
          : tl.x;


        // Highlight background
        if (tl.highlight) {
          const { color, paddingX, paddingY, cornerRadius } = tl.highlight;
          const totalH = finalLines.length * lineH;
          ctx.fillStyle = color;
          const hx = tl.x - paddingX;
          const hy = tl.y - paddingY;
          const hw = tl.width + paddingX * 2;
          const hh = totalH + paddingY * 2;
          if (cornerRadius > 0) ctx.roundRect(hx, hy, hw, hh, cornerRadius);
          else ctx.rect(hx, hy, hw, hh);
          ctx.fill();
          // Restore fill color
          if (tl.gradientColor) {
            const [c1, c2, dir] = tl.gradientColor;
            let grad: CanvasGradient;
            if (dir === "horizontal") grad = ctx.createLinearGradient(tl.x, 0, tl.x + tl.width, 0);
            else grad = ctx.createLinearGradient(0, tl.y, 0, tl.y + tl.height);
            grad.addColorStop(0, c1);
            grad.addColorStop(1, c2);
            ctx.fillStyle = grad;
          } else {
            ctx.fillStyle = tl.color;
          }
        }

        finalLines.forEach((line, i) => {
          const yPos = tl.y + tl.fontSize + i * lineH;
          // Stroke (outline)
          if (tl.stroke && tl.stroke.width > 0) {
            ctx.strokeStyle = tl.stroke.color;
            ctx.lineWidth = tl.stroke.width * 2;
            ctx.lineJoin = "round";
            ctx.strokeText(line, xPos, yPos, tl.width);
          }
          ctx.fillText(line, xPos, yPos, tl.width);
        });

        // Indicator for missing translation
        if (activeLang !== "en" && !screen.localizations?.[activeLang]?.[tl.id]?.content) {
          ctx.strokeStyle = "rgba(251,191,36,0.6)";
          ctx.lineWidth = 3;
          ctx.setLineDash([6, 4]);
          ctx.strokeRect(tl.x - 4, tl.y - 4, tl.width + 8, tl.fontSize * lines.length * (tl.lineHeight ?? 1.25) + 8);
          ctx.setLineDash([]);
        }
      }

      // ── SCREENSHOT ZONE ───────────────────────────────────────────────────
      else if (layer.type === "screenshot") {
        const sl = layer as ScreenshotLayer;
        const mockup = screenSet.mockup;
        const hasFrame = sl.showDeviceFrame && mockup?.showFrame !== false;
        
        // Find the active device model, fallback to first iOS device if not found
        const device = ALL_DEVICES.find((d) => d.id === mockup?.device) || ALL_DEVICES[0];

        // 1. Calculate aspect-ratio perfect physical bounds
        const physicalW = device.width;
        const physicalH = device.height;
        // Assume device body is proportionally wider/taller than screen if it has a frame
        const bezelRatio = hasFrame ? (device.bezelRatio ?? 0.0373) : 0;
        const rawBezel = physicalW * bezelRatio;
        
        const frameW = physicalW + rawBezel * 2;
        const frameH = physicalH + rawBezel * 2;
        
        // Scale to fit exactly inside sl bounds
        const scale = Math.min(sl.width / frameW, sl.height / frameH);
        const w = frameW * scale;
        const h = frameH * scale;
        
        // Center inside sl bounds
        const x = sl.x + (sl.width - w) / 2;
        const y = sl.y + (sl.height - h) / 2;

        const defaultDeviceR = device.cornerRadius * scale + (hasFrame ? rawBezel * scale : 0);
        const r = (mockup?.squircle || hasFrame) ? defaultDeviceR : (sl.cornerRadius || 0);

        const bezel = hasFrame ? rawBezel * scale : 0;
        const innerX = x + bezel;
        const innerY = y + bezel;
        const innerW = w - bezel * 2;
        const innerH = h - bezel * 2;
        const innerR = Math.max(0, r - bezel);

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
          continue;
        }

        // Apply shadow parameters
        const applyShadow = () => {
          if (mockup?.showShadow !== false) {
            ctx.shadowBlur = sl.shadow?.blur ?? 80;
            ctx.shadowColor = sl.shadow?.color ?? "rgba(0,0,0,0.35)";
            ctx.shadowOffsetX = sl.shadow?.offsetX ?? 0;
            ctx.shadowOffsetY = sl.shadow?.offsetY ?? 20;
          }
        };

        const rawColorName = mockup?.color || "black";
        const baseHex = COLOR_HEX_MAP[rawColorName.toLowerCase()] || "#1a1a1c";

        // 1. Draw outer device frame OR minimal shadow
        if (hasFrame) {
          applyShadow();
          
          if (mockup.frameType === "3d" || mockup.frameType === undefined) {
            // Draw Hardware Buttons First (underneath the rim)
            if (device.buttons) {
               ctx.fillStyle = baseHex;
               device.buttons.forEach((btn) => {
                  const btnY = y + h * btn.yOffset;
                  const btnH = h * btn.height;
                  const btnW = (btn.thickness || 1) * (Math.min(w, h) * 0.008);
                  let btnX = 0;
                  const btnRadius = btnW / 2;
                  
                  if (btn.side === "left") {
                     btnX = x - btnW + 1; // +1 to overlap and hide gap
                     ctx.beginPath();
                     ctx.roundRect(btnX, btnY, btnW, btnH, [btnRadius, 0, 0, btnRadius]);
                     ctx.fill();
                     // Button highlight
                     ctx.fillStyle = "rgba(255,255,255,0.15)";
                     ctx.beginPath();
                     ctx.roundRect(btnX, btnY, btnW, btnH, [btnRadius, 0, 0, btnRadius]);
                     ctx.fill();
                  } else if (btn.side === "right") {
                     btnX = x + w - 1;
                     ctx.beginPath();
                     ctx.roundRect(btnX, btnY, btnW, btnH, [0, btnRadius, btnRadius, 0]);
                     ctx.fill();
                     ctx.fillStyle = "rgba(255,255,255,0.15)";
                     ctx.beginPath();
                     ctx.roundRect(btnX, btnY, btnW, btnH, [0, btnRadius, btnRadius, 0]);
                     ctx.fill();
                  } else if (btn.side === "top") {
                     const tBtnW = h * btn.height; 
                     const tBtnX = x + w * btn.yOffset;
                     const tBtnY = y - btnW + 1;
                     ctx.beginPath();
                     ctx.roundRect(tBtnX, tBtnY, tBtnW, btnW, [btnRadius, btnRadius, 0, 0]);
                     ctx.fill();
                     ctx.fillStyle = "rgba(255,255,255,0.15)";
                     ctx.beginPath();
                     ctx.roundRect(tBtnX, tBtnY, tBtnW, btnW, [btnRadius, btnRadius, 0, 0]);
                     ctx.fill();
                  }
               });
            }

            ctx.beginPath();
            if (r > 0) ctx.roundRect(x, y, w, h, r);
            else ctx.rect(x, y, w, h);
            
            // -- 3D Realistic Frame --
            ctx.fillStyle = baseHex;
            ctx.fill();

            // 1b. Metallic Rim Gradient
            const isDark = baseHex === "#1a1a1c" || baseHex === "#000000" || baseHex === "#111111" || baseHex === "#111827" || baseHex === "#2d2d2d";
            const rimGrad = ctx.createLinearGradient(x, y, x + w, y + h);
            if (isDark) {
              rimGrad.addColorStop(0, "rgba(255, 255, 255, 0.35)");
              rimGrad.addColorStop(0.2, "rgba(255, 255, 255, 0.05)");
              rimGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.8)");
              rimGrad.addColorStop(0.8, "rgba(255, 255, 255, 0.05)");
              rimGrad.addColorStop(1, "rgba(255, 255, 255, 0.2)");
            } else {
              rimGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
              rimGrad.addColorStop(0.2, "rgba(0, 0, 0, 0.05)");
              rimGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.15)");
              rimGrad.addColorStop(0.8, "rgba(0, 0, 0, 0.05)");
              rimGrad.addColorStop(1, "rgba(255, 255, 255, 0.8)");
            }
            
            // Draw rim outer edge
            ctx.lineWidth = bezel * 0.4;
            ctx.strokeStyle = rimGrad;
            ctx.stroke();

            // 1c. Inner screen depth shadow (glass edge)
            ctx.beginPath();
            if (r > 0) ctx.roundRect(innerX - 1, innerY - 1, innerW + 2, innerH + 2, innerR);
            else ctx.rect(innerX - 1, innerY - 1, innerW + 2, innerH + 2);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(0,0,0,0.8)";
            ctx.stroke();
            
            // 1d. Corner highlights (shiny metal reflection)
            if (r > 0) {
              ctx.beginPath();
              ctx.arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI); // Top-left
              ctx.lineWidth = 2;
              ctx.strokeStyle = "rgba(255,255,255,0.6)";
              ctx.stroke();
              
              ctx.beginPath();
              ctx.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI); // Bottom-right
              ctx.lineWidth = 1.5;
              ctx.strokeStyle = "rgba(255,255,255,0.3)";
              ctx.stroke();
            }
          } else {
            // -- 2D Flat Frame --
            ctx.beginPath();
            if (r > 0) ctx.roundRect(x, y, w, h, r);
            else ctx.rect(x, y, w, h);

            ctx.fillStyle = baseHex;
            ctx.fill();
            
            // Simple rim
            ctx.beginPath();
            if (r > 0) ctx.roundRect(x + 2, y + 2, w - 4, h - 4, r - 2);
            else ctx.rect(x + 2, y + 2, w - 4, h - 4);
            
            const isWhite = baseHex === "#f5f5f7" || baseHex === "#ffffff" || baseHex === "#f8f8f8";
            ctx.strokeStyle = isWhite ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.15)";
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          // Reset shadow after drawing frame
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        } else {
          // Minimal or Borderless: Apply shadow to the image shape itself
          applyShadow();
          ctx.beginPath();
          if (innerR > 0) ctx.roundRect(innerX, innerY, innerW, innerH, innerR);
          else ctx.rect(innerX, innerY, innerW, innerH);
          ctx.fillStyle = "#ffffff";
          ctx.fill(); // Fill shadow
          
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        }

        // Clip to inner screen rect
        ctx.save();
        ctx.beginPath();
        if (innerR > 0) {
          ctx.roundRect(innerX, innerY, innerW, innerH, innerR);
        } else {
          ctx.rect(innerX, innerY, innerW, innerH);
        }
        ctx.clip();

        let drawBaseImage: (() => void) | null = null;
        let imgObj: HTMLImageElement | null = null;

        if (sl.src) {
          try {
            imgObj = await loadImage(sl.src);
            drawBaseImage = () => {
              if (!imgObj) return;
              if (sl.objectFit === "cover") {
                const imgRatio = imgObj.width / imgObj.height;
                const zoneRatio = innerW / innerH;
                let sx = 0, sy = 0, sw = imgObj.width, sh = imgObj.height;
                if (imgRatio > zoneRatio) {
                   sw = imgObj.height * zoneRatio;
                   sx = (imgObj.width - sw) / 2;
                } else {
                   sh = imgObj.width / zoneRatio;
                   sy = (imgObj.height - sh) / 2;
                }
                ctx.drawImage(imgObj, sx, sy, sw, sh, innerX, innerY, innerW, innerH);
              } else {
                ctx.drawImage(imgObj, innerX, innerY, innerW, innerH);
              }
            };
          } catch {
            // error loading image
          }
        }

        const drawNotch = () => {
            if (hasFrame && device.notchType !== "none") {
              ctx.fillStyle = "#000000";
              if (device.notchType === "island" && mockup.dynamicIsland !== false) {
                const islandW = innerW * 0.285;
                const islandH = innerW * 0.0887;
                const islandX = innerX + (innerW - islandW) / 2;
                const islandY = innerY + innerW * 0.025; // floating a bit lower
                
                // Top Speaker Grill
                ctx.fillStyle = "#151515";
                ctx.beginPath();
                ctx.roundRect(innerX + (innerW - innerW * 0.16) / 2, innerY - bezel * 0.4, innerW * 0.16, bezel * 0.4, 2);
                ctx.fill();

                // The main black pill
                ctx.fillStyle = "#000000";
                ctx.beginPath();
                ctx.roundRect(islandX, islandY, islandW, islandH, islandH / 2);
                ctx.fill();
                // TrueDepth Camera (left)
                ctx.fillStyle = "#1e1e20";
                ctx.beginPath();
                ctx.arc(islandX + islandH * 0.8, islandY + islandH / 2, islandH * 0.22, 0, Math.PI * 2);
                ctx.fill();
                // Front Camera (right, slightly blueish reflection)
                ctx.fillStyle = "#293246";
                ctx.beginPath();
                ctx.arc(islandX + islandW - islandH * 0.7, islandY + islandH / 2, islandH * 0.22, 0, Math.PI * 2);
                ctx.fill();
                // Tiny reflection in front camera
                ctx.fillStyle = "rgba(255,255,255,0.25)";
                ctx.beginPath();
                ctx.arc(islandX + islandW - islandH * 0.7, islandY + islandH / 2.3, islandH * 0.08, 0, Math.PI * 2);
                ctx.fill();
              } else if (device.notchType === "hole" && mockup.notch !== false) {
                const holeR = innerW * 0.025;
                const holeX = innerX + innerW / 2;
                const holeY = innerY + holeR * 2.5;
                ctx.beginPath();
                ctx.arc(holeX, holeY, holeR, 0, Math.PI * 2);
                ctx.fill();
              } else if (device.notchType === "notch" && mockup.notch !== false) {
                const notchW = innerW * 0.45;
                const notchH = innerW * 0.08;
                const notchX = innerX + (innerW - notchW) / 2;
                ctx.beginPath();
                ctx.moveTo(notchX - notchH, innerY);
                ctx.quadraticCurveTo(notchX, innerY, notchX, innerY + notchH * 0.4);
                ctx.lineTo(notchX, innerY + notchH - notchH * 0.5);
                ctx.quadraticCurveTo(notchX, innerY + notchH, notchX + notchH, innerY + notchH);
                ctx.lineTo(notchX + notchW - notchH, innerY + notchH);
                ctx.quadraticCurveTo(notchX + notchW, innerY + notchH, notchX + notchW, innerY + notchH - notchH * 0.5);
                ctx.lineTo(notchX + notchW, innerY + notchH * 0.4);
                ctx.quadraticCurveTo(notchX + notchW, innerY, notchX + notchW + notchH, innerY);
                ctx.fill();
              }
            }
        };

        const drawReflection = () => {
            if (hasFrame && mockup.reflection) {
              const reflGrad = ctx.createLinearGradient(innerX, innerY, innerX + innerW, innerY + innerH);
              reflGrad.addColorStop(0, "rgba(255,255,255,0.15)");
              reflGrad.addColorStop(0.3, "rgba(255,255,255,0.05)");
              reflGrad.addColorStop(0.5, "transparent");
              reflGrad.addColorStop(1, "transparent");
              ctx.fillStyle = reflGrad;
              ctx.beginPath();
              ctx.moveTo(innerX, innerY);
              ctx.lineTo(innerX + innerW, innerY);
              ctx.lineTo(innerX, innerY + innerH);
              ctx.closePath();
              ctx.fill();
            }
        };

        const overlay = sl.focusOverlay;

        // 2. Draw base screenshot, notch, reflection (with optional blur)
        ctx.save();
        if (overlay && overlay.enabled && overlay.blurBackground) {
            ctx.filter = "blur(12px)";
        }
        
        if (drawBaseImage) {
            drawBaseImage();
        } else {
            drawPlaceholder(ctx, innerX, innerY, innerW, innerH, sl.label);
        }
        drawNotch();
        drawReflection();
        ctx.restore();

        // 3. Draw overlay tint color (if focus overlay is enabled)
        if (overlay && overlay.enabled && overlay.overlayColor) {
            ctx.save();
            ctx.fillStyle = overlay.overlayColor;
            ctx.fillRect(innerX, innerY, innerW, innerH);
            ctx.restore();
        }

        ctx.restore(); // END CLIP INNER (we can now draw outside the inner screen)

        // 3b. Draw Premium Subtle Border for Minimal/Borderless
        if (!hasFrame) {
            ctx.beginPath();
            if (innerR > 0) {
              ctx.roundRect(innerX, innerY, innerW, innerH, innerR);
            } else {
              ctx.rect(innerX, innerY, innerW, innerH);
            }
            ctx.lineWidth = 1;
            ctx.strokeStyle = "rgba(0,0,0,0.12)";
            ctx.stroke();
            // inner subtle highlight
            ctx.beginPath();
            if (innerR > 0) {
              ctx.roundRect(innerX + 1, innerY + 1, innerW - 2, innerH - 2, innerR - 1);
            } else {
              ctx.rect(innerX + 1, innerY + 1, innerW - 2, innerH - 2);
            }
            ctx.lineWidth = 1;
            ctx.strokeStyle = "rgba(255,255,255,0.15)";
            ctx.stroke();
        }

        // 4. Draw Focus Window (Pops out in front)
        if (overlay && overlay.enabled && drawBaseImage) {
            const fTop = (overlay.cropTop / 100) * innerH;
            const fBottom = (overlay.cropBottom / 100) * innerH;
            const fY = innerY + fTop;
            const fH = Math.max(0, innerH - fTop - fBottom);
            
            let fRadius = 0;
            if (overlay.roundedCorners === "sm") fRadius = innerW * 0.02;
            if (overlay.roundedCorners === "md") fRadius = innerW * 0.05;
            if (overlay.roundedCorners === "xl") fRadius = innerW * 0.1;
            
            const popScale = 1.15; // Scale up by 15% to overflow the device bezel
            const cx = innerX + innerW / 2;
            const cy = fY + fH / 2;
            
            ctx.save();
            // Translate to center, scale, translate back
            ctx.translate(cx, cy);
            ctx.scale(popScale, popScale);
            ctx.translate(-cx, -cy);
            
            ctx.beginPath();
            ctx.roundRect(innerX, fY, innerW, fH, fRadius);
            
            // Shadow
            if (overlay.overlayShadow) {
                ctx.save();
                ctx.shadowColor = "rgba(0,0,0,0.3)";
                ctx.shadowBlur = innerW * 0.08;
                ctx.shadowOffsetY = innerW * 0.03;
                ctx.fillStyle = "#ffffff"; 
                ctx.fill();
                ctx.restore();
            }
            
            ctx.clip();
            drawBaseImage();
            
            // Optional: redraw notch inside focus area? No, original app doesn't show notch in focus window
            
            if (overlay.borderWidth > 0) {
                ctx.beginPath();
                ctx.roundRect(innerX, fY, innerW, fH, fRadius);
                ctx.lineWidth = overlay.borderWidth * (innerW / 1000) / popScale;
                ctx.strokeStyle = overlay.borderColor;
                ctx.stroke();
            }
            ctx.restore();
        }
      }

      // ── SHAPE ─────────────────────────────────────────────────────────────
      else if (layer.type === "shape") {
        const sl = layer as ShapeLayer;
        ctx.fillStyle = parseColorStr(ctx, sl.fill, sl.x, sl.y, sl.width, sl.height) as string;
        const r2 = sl.cornerRadius ?? 0;
        const cx2 = sl.x + sl.width / 2;
        const cy2 = sl.y + sl.height / 2;
        const hw  = sl.width / 2;
        const hh  = sl.height / 2;

        // Apply rotation around the shape's center
        const shapeDeg = sl.rotation ?? 0;
        if (shapeDeg !== 0) {
          ctx.save();
          ctx.translate(cx2, cy2);
          ctx.rotate((shapeDeg * Math.PI) / 180);
          ctx.translate(-cx2, -cy2);
        }

        const applyStroke = () => {
          if (sl.stroke && sl.strokeWidth) {
            ctx.strokeStyle = sl.stroke;
            ctx.lineWidth = sl.strokeWidth;
            ctx.stroke();
          }
        };

        if (sl.shape === "circle") {
          ctx.beginPath();
          ctx.arc(cx2, cy2, Math.min(hw, hh), 0, Math.PI * 2);
          ctx.fill(); applyStroke();

        } else if (sl.shape === "triangle") {
          ctx.beginPath();
          ctx.moveTo(cx2, sl.y);
          ctx.lineTo(sl.x + sl.width, sl.y + sl.height);
          ctx.lineTo(sl.x, sl.y + sl.height);
          ctx.closePath();
          ctx.fill(); applyStroke();

        } else if (sl.shape === "star") {
          const pts = 5;
          const outerR = Math.min(hw, hh);
          const innerR = outerR * 0.42;
          ctx.beginPath();
          for (let i = 0; i < pts * 2; i++) {
            const angle = (i * Math.PI) / pts - Math.PI / 2;
            const r3 = i % 2 === 0 ? outerR : innerR;
            const px = cx2 + Math.cos(angle) * r3;
            const py = cy2 + Math.sin(angle) * r3;
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill(); applyStroke();

        } else if (sl.shape === "hexagon") {
          const r4 = Math.min(hw, hh);
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = cx2 + Math.cos(angle) * r4;
            const py = cy2 + Math.sin(angle) * r4;
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill(); applyStroke();

        } else if (sl.shape === "diamond") {
          ctx.beginPath();
          ctx.moveTo(cx2, sl.y);
          ctx.lineTo(sl.x + sl.width, cy2);
          ctx.lineTo(cx2, sl.y + sl.height);
          ctx.lineTo(sl.x, cy2);
          ctx.closePath();
          ctx.fill(); applyStroke();

        } else if (sl.shape === "crescent") {
          ctx.beginPath();
          ctx.arc(cx2, cy2, Math.min(hw, hh), Math.PI * 0.2, Math.PI * 1.8);
          ctx.arc(cx2 - hw * 0.3, cy2, Math.min(hw, hh) * 0.8, Math.PI * 1.8, Math.PI * 0.2, true);
          ctx.closePath();
          ctx.fill(); applyStroke();

        } else if (sl.shape === "arrowRight") {
          const aw = sl.width;
          const ah = sl.height;
          const arrowHead = aw * 0.4;
          const stemH = ah * 0.35;
          ctx.beginPath();
          ctx.moveTo(sl.x, cy2 - stemH);
          ctx.lineTo(sl.x + aw - arrowHead, cy2 - stemH);
          ctx.lineTo(sl.x + aw - arrowHead, sl.y);
          ctx.lineTo(sl.x + aw, cy2);
          ctx.lineTo(sl.x + aw - arrowHead, sl.y + ah);
          ctx.lineTo(sl.x + aw - arrowHead, cy2 + stemH);
          ctx.lineTo(sl.x, cy2 + stemH);
          ctx.closePath();
          ctx.fill(); applyStroke();

        } else if (r2 > 0) {
          ctx.beginPath();
          ctx.roundRect(sl.x, sl.y, sl.width, sl.height, r2);
          ctx.fill(); applyStroke();

        } else if (sl.shape === "appstore-badge" || sl.shape === "googleplay-badge") {
          const isApple = sl.shape === "appstore-badge";
          const bx = sl.x, by = sl.y, bw = sl.width, bh = sl.height;
          const br = bh * 0.22;

          // Background pill
          ctx.beginPath();
          ctx.roundRect(bx, by, bw, bh, br);
          ctx.fillStyle = sl.fill ?? "#000000";
          ctx.fill();
          if (sl.stroke && sl.strokeWidth) {
            ctx.strokeStyle = sl.stroke;
            ctx.lineWidth = sl.strokeWidth;
            ctx.stroke();
          }

          // Icon area (left side)
          const iconSize  = bh * 0.52;
          const iconX     = bx + bh * 0.32;
          ctx.fillStyle   = "#ffffff";
          ctx.font        = `${iconSize}px serif`;
          ctx.textAlign   = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(isApple ? "" : "▶", iconX, by + bh / 2);

          // Labels
          const labelX = bx + bw * 0.57;
          const topLabel = isApple ? "Download on the" : "GET IT ON";
          const botLabel = isApple ? "App Store" : "Google Play";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          ctx.font = `400 ${bh * 0.22}px "Inter", sans-serif`;
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.fillText(topLabel, labelX, by + bh * 0.33);

          ctx.font = `700 ${bh * 0.35}px "Inter", sans-serif`;
          ctx.fillStyle = "#ffffff";
          ctx.fillText(botLabel, labelX, by + bh * 0.65);

        } else if (sl.shape === "rating-badge") {
          const bx = sl.x, by = sl.y, bw = sl.width, bh = sl.height;
          const br = bh * 0.5;

          ctx.beginPath();
          ctx.roundRect(bx, by, bw, bh, br);
          ctx.fillStyle = sl.fill ?? "rgba(15,23,42,0.85)";
          ctx.fill();
          if (sl.stroke && sl.strokeWidth) {
            ctx.strokeStyle = sl.stroke;
            ctx.lineWidth = sl.strokeWidth;
            ctx.stroke();
          }

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          // Gold stars + rating text
          ctx.font = `700 ${bh * 0.42}px "Inter", sans-serif`;
          ctx.fillStyle = "#F59E0B";
          ctx.fillText(sl.subtext || "★★★★★", bx + bw * 0.32, by + bh / 2 + 1);

          ctx.font = `600 ${bh * 0.35}px "Inter", sans-serif`;
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(sl.text || "4.9 (100k+)", bx + bw * 0.74, by + bh / 2);

        } else if (sl.shape === "award-badge") {
          const bx = sl.x, by = sl.y, bw = sl.width, bh = sl.height;
          const br = bh * 0.5;

          ctx.beginPath();
          ctx.roundRect(bx, by, bw, bh, br);
          ctx.fillStyle = sl.fill ?? "#1e1b4b";
          ctx.fill();
          if (sl.stroke && sl.strokeWidth) {
            ctx.strokeStyle = sl.stroke;
            ctx.lineWidth = sl.strokeWidth;
            ctx.stroke();
          }

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `${bh * 0.5}px serif`;
          ctx.fillText(sl.subtext || "🏆", bx + bh * 0.45, by + bh / 2);

          ctx.font = `700 ${bh * 0.34}px "Inter", sans-serif`;
          ctx.fillStyle = "#FBBF24";
          ctx.fillText(sl.text || "#1 App of the Day", bx + bw * 0.58, by + bh / 2);

        } else if (sl.shape === "users-badge") {
          const bx = sl.x, by = sl.y, bw = sl.width, bh = sl.height;
          const br = bh * 0.5;

          ctx.beginPath();
          ctx.roundRect(bx, by, bw, bh, br);
          ctx.fillStyle = sl.fill ?? "rgba(16,185,129,0.15)";
          ctx.fill();
          if (sl.stroke && sl.strokeWidth) {
            ctx.strokeStyle = sl.stroke;
            ctx.lineWidth = sl.strokeWidth;
            ctx.stroke();
          }

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `${bh * 0.45}px serif`;
          ctx.fillText(sl.subtext || "👥", bx + bh * 0.45, by + bh / 2);

          ctx.font = `700 ${bh * 0.34}px "Inter", sans-serif`;
          ctx.fillStyle = "#10B981";
          ctx.fillText(sl.text || "1,000,000+ Users", bx + bw * 0.58, by + bh / 2);

        } else if (sl.shape === "security-badge") {
          const bx = sl.x, by = sl.y, bw = sl.width, bh = sl.height;
          const br = bh * 0.5;

          ctx.beginPath();
          ctx.roundRect(bx, by, bw, bh, br);
          ctx.fillStyle = sl.fill ?? "rgba(59,130,246,0.15)";
          ctx.fill();
          if (sl.stroke && sl.strokeWidth) {
            ctx.strokeStyle = sl.stroke;
            ctx.lineWidth = sl.strokeWidth;
            ctx.stroke();
          }

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `${bh * 0.45}px serif`;
          ctx.fillText(sl.subtext || "🔒", bx + bh * 0.45, by + bh / 2);

          ctx.font = `700 ${bh * 0.34}px "Inter", sans-serif`;
          ctx.fillStyle = "#3B82F6";
          ctx.fillText(sl.text || "100% Private & Secure", bx + bw * 0.58, by + bh / 2);

        } else if (sl.shape === "notification-badge") {
          const bx = sl.x, by = sl.y, bw = sl.width, bh = sl.height;
          const br = 28;

          ctx.beginPath();
          ctx.roundRect(bx, by, bw, bh, br);
          ctx.fillStyle = sl.fill ?? "rgba(255,255,255,0.92)";
          ctx.fill();
          if (sl.stroke && sl.strokeWidth) {
            ctx.strokeStyle = sl.stroke;
            ctx.lineWidth = sl.strokeWidth;
            ctx.stroke();
          }

          ctx.textAlign = "left";
          ctx.textBaseline = "middle";

          // Icon
          ctx.font = `${bh * 0.3}px serif`;
          ctx.fillText("⚡", bx + 24, by + bh * 0.35);

          // Header
          ctx.font = `700 ${bh * 0.18}px "Inter", sans-serif`;
          ctx.fillStyle = "#1e293b";
          ctx.fillText(sl.subtext || "SnapFrame · now", bx + 64, by + bh * 0.32);

          // Body message
          ctx.font = `500 ${bh * 0.2}px "Inter", sans-serif`;
          ctx.fillStyle = "#334155";
          ctx.fillText("Workout completed! +250 XP earned 🎉", bx + 24, by + bh * 0.7);

        } else if (sl.shape === "search-badge") {
          const bx = sl.x, by = sl.y, bw = sl.width, bh = sl.height;
          const br = bh * 0.5;

          ctx.beginPath();
          ctx.roundRect(bx, by, bw, bh, br);
          ctx.fillStyle = sl.fill ?? "rgba(255,255,255,0.18)";
          ctx.fill();
          if (sl.stroke && sl.strokeWidth) {
            ctx.strokeStyle = sl.stroke;
            ctx.lineWidth = sl.strokeWidth;
            ctx.stroke();
          }

          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.font = `${bh * 0.38}px serif`;
          ctx.fillText("🔍", bx + 24, by + bh / 2);

          ctx.font = `500 ${bh * 0.32}px "Inter", sans-serif`;
          ctx.fillStyle = "rgba(255,255,255,0.75)";
          ctx.fillText("Search songs, artists, albums...", bx + 70, by + bh / 2);

        } else if (sl.shape === "glow-orb") {
          const cx = sl.x + sl.width / 2;
          const cy = sl.y + sl.height / 2;
          const r = Math.min(sl.width, sl.height) / 2;
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          grad.addColorStop(0, sl.fill || "rgba(139,92,246,0.6)");
          grad.addColorStop(0.6, sl.fill ? `${sl.fill}44` : "rgba(139,92,246,0.2)");
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();

        } else {
          ctx.fillRect(sl.x, sl.y, sl.width, sl.height);
          if (sl.stroke && sl.strokeWidth) {
            ctx.strokeStyle = sl.stroke;
            ctx.lineWidth = sl.strokeWidth;
            ctx.strokeRect(sl.x, sl.y, sl.width, sl.height);
          }
        }

        // Restore context after rotation
        if (shapeDeg !== 0) {
          ctx.restore();
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

      // ── CHARACTER ─────────────────────────────────────────────────────────
      else if (layer.type === "character") {
        const cl = layer as import("@/lib/types").CharacterLayer;
        if (cl.svgContent) {
          try {
            let imgUrl = cl.svgContent;
            let needsRevoke = false;

            if (cl.svgContent.startsWith("<") || cl.svgContent.includes("<svg") || cl.svgContent.includes("<g")) {
              const fullSvg = cl.svgContent.startsWith("<svg")
                ? cl.svgContent
                : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">${cl.svgContent}</svg>`;
              const blob = new Blob([fullSvg], { type: "image/svg+xml" });
              imgUrl = URL.createObjectURL(blob);
              needsRevoke = true;
            } else if (cl.svgContent.startsWith("http://") || cl.svgContent.startsWith("https://")) {
              imgUrl = `/api/proxy-svg?url=${encodeURIComponent(cl.svgContent)}`;
            }

            const img = await loadImage(imgUrl);
            ctx.drawImage(img, cl.x, cl.y, cl.width, cl.height);

            if (needsRevoke) {
              URL.revokeObjectURL(imgUrl);
            }

            // Tint color overlay
            if (cl.tintColor) {
              ctx.globalCompositeOperation = "multiply";
              ctx.fillStyle = cl.tintColor;
              ctx.fillRect(cl.x, cl.y, cl.width, cl.height);
              ctx.globalCompositeOperation = "source-over";
            }
          } catch (err) {
            console.error("Failed to render character:", err);
            // Fallback placeholder
            ctx.fillStyle = "rgba(99,102,241,0.1)";
            ctx.fillRect(cl.x, cl.y, cl.width, cl.height);
            ctx.strokeStyle = "rgba(99,102,241,0.4)";
            ctx.lineWidth = 2;
            ctx.strokeRect(cl.x, cl.y, cl.width, cl.height);
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
  }, [screen, isActiveScreen, activeLayerId, activeLang, hideScreenshots, screenSet.mockup]);

  useEffect(() => {
    let animId: number;
    animId = requestAnimationFrame(() => {
      draw();
    });
    return () => cancelAnimationFrame(animId);
  }, [draw, fontsLoaded]);

  // ── Hit testing ───────────────────────────────────────────────────────────
  const hitTest = (cx: number, cy: number): string | null => {
    for (let i = screen.layers.length - 1; i >= 0; i--) {
      const l = screen.layers[i];
      let testX = cx;
      let testY = cy;
      if (l.rotation) {
        const rad = (l.rotation * Math.PI) / 180;
        const centerX = l.x + l.width / 2;
        const centerY = l.y + l.height / 2;
        const dx = cx - centerX;
        const dy = cy - centerY;
        testX = centerX + dx * Math.cos(-rad) - dy * Math.sin(-rad);
        testY = centerY + dx * Math.sin(-rad) + dy * Math.cos(-rad);
      }
      if (testX >= l.x && testX <= l.x + l.width && testY >= l.y && testY <= l.y + l.height) return l.id;
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
    // Close context menu on any click
    setCtxMenu(null);
    useEditorStore.setState({ activeSetId: screenSet.id, activeScreenId: screen.id });
    const { x, y } = getCanvasCoords(e);
    const hit = hitTest(x, y);
    if (hit) {
      if (e.shiftKey) {
        toggleSelectLayer(hit);
      } else {
        setActiveLayer(hit);
      }
      const layer = screen.layers.find((l) => l.id === hit);
      if (layer && !layer.locked) {
        const gid = (layer as any).groupId;
        const groupLayers = gid
          ? screen.layers.filter((l) => (l as any).groupId === gid && !l.locked)
          : [layer];

        dragRef.current = {
          layerId: hit,
          startX: x,
          startY: y,
          origX: layer.x,
          origY: layer.y,
          groupItems: groupLayers.map((l) => ({ id: l.id, origX: l.x, origY: l.y })),
        };
      }
    } else {
      // Clicked on empty background of screen -> clear layer selection
      clearSelection();
    }
    e.stopPropagation();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    const { x, y } = getCanvasCoords(e);
    let targetX = dragRef.current.origX + (x - dragRef.current.startX);
    let targetY = dragRef.current.origY + (y - dragRef.current.startY);

    const layer = screen.layers.find((l) => l.id === dragRef.current?.layerId);
    let snappedX = false;
    let snappedY = false;

    if (layer) {
      // Horizontal center snapping
      const layerCenterX = targetX + layer.width / 2;
      const screenCenterX = screen.width / 2;
      const SNAP_THRESHOLD = 30;

      if (Math.abs(layerCenterX - screenCenterX) < SNAP_THRESHOLD) {
        const snapDiff = Math.round(screenCenterX - layer.width / 2) - targetX;
        targetX += snapDiff;
        snappedX = true;
      }

      // Vertical center snapping
      const layerCenterY = targetY + layer.height / 2;
      const screenCenterY = screen.height / 2;
      if (Math.abs(layerCenterY - screenCenterY) < SNAP_THRESHOLD) {
        const snapDiff = Math.round(screenCenterY - layer.height / 2) - targetY;
        targetY += snapDiff;
        snappedY = true;
      }
    }

    setSnapGuides({ x: snappedX, y: snappedY });

    const finalDeltaX = targetX - dragRef.current.origX;
    const finalDeltaY = targetY - dragRef.current.origY;

    if (dragRef.current.groupItems && dragRef.current.groupItems.length > 1) {
      dragRef.current.groupItems.forEach((item) => {
        updateLayer(screenSet.id, screen.id, item.id, {
          x: Math.round(item.origX + finalDeltaX),
          y: Math.round(item.origY + finalDeltaY),
        } as Parameters<typeof updateLayer>[3]);
      });
    } else {
      updateLayer(screenSet.id, screen.id, dragRef.current.layerId, {
        x: Math.round(targetX),
        y: Math.round(targetY),
      } as Parameters<typeof updateLayer>[3]);
    }
  };

  const handleMouseUp = () => { 
    if (dragRef.current) {
      useEditorStore.getState().recordHistory();
    }
    dragRef.current = null;
    setSnapGuides(null);
  };

  // ── Double-click: inline text edit ─────────────────────────────────────────
  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);
    const hit = hitTest(x, y);
    if (!hit) return;
    const layer = screen.layers.find((l) => l.id === hit);
    if (!layer || layer.type !== "text") return;
    setEditingLayerId(hit);
    setEditText((layer as TextLayer).content);
    setActiveLayer(hit);
  };

  // ── Right-click: context menu ──────────────────────────────────────────────
  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const { x, y } = getCanvasCoords(e);
    const hit = hitTest(x, y);
    if (!hit) return;
    setActiveLayer(hit);
    setCtxMenu({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, layerId: hit });
  };

  const activeLayer = screen.layers.find(l => l.id === activeLayerId);
  const isScreenshotActive = isActiveScreen && activeLayer?.type === "screenshot";

  // ── Resize / Rotate handle drag ────────────────────────────────────────────
  const resizeRef = useRef<{
    handle: string; // "nw"|"n"|"ne"|"e"|"se"|"s"|"sw"|"w"|"rotate"
    startX: number; startY: number;
    origX: number; origY: number;
    origW: number; origH: number;
    origRot: number;
    centerX: number; centerY: number;
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
      origRot: activeLayer.rotation || 0,
      centerX: activeLayer.x + activeLayer.width / 2,
      centerY: activeLayer.y + activeLayer.height / 2,
    };

    const onMove = (ev: MouseEvent) => {
      if (!resizeRef.current || !activeLayer) return;
      const h = resizeRef.current.handle;
      
      if (h === "rotate") {
        // Calculate new rotation based on mouse position relative to center
        const rect = canvasRef.current!.getBoundingClientRect();
        // Mouse coordinate in canvas space
        const mx = ((ev.clientX - rect.left) / rect.width) * screen.width;
        const my = ((ev.clientY - rect.top) / rect.height) * screen.height;
        
        const dx = mx - resizeRef.current.centerX;
        const dy = my - resizeRef.current.centerY;
        // Angle in radians (add PI/2 so 12 o'clock is 0)
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        let deg = Math.round((angle * 180) / Math.PI);
        // Snap to 45 degree increments if shift is held
        if (ev.shiftKey) {
          deg = Math.round(deg / 45) * 45;
        }
        
        updateLayer(screenSet.id, screen.id, activeLayer.id, {
          rotation: deg,
        } as Parameters<typeof updateLayer>[3]);
        return;
      }

      const dx = (ev.clientX - resizeRef.current.startX) / scale;
      const dy = (ev.clientY - resizeRef.current.startY) / scale;
      let { origX: nx, origY: ny, origW: nw, origH: nh } = resizeRef.current;

      // Note: This simple resize logic does not perfectly handle resizing rotated elements.
      // For a basic implementation, we just resize the bounding box.
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
      if (resizeRef.current) {
        useEditorStore.getState().recordHistory();
      }
      resizeRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <Draggable draggableId={screen.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          data-screen-card="true"
          data-screen-id={screen.id}
          className="shrink-0 flex flex-col gap-1.5 group cursor-default"
          style={{
            width: CARD_DISPLAY_WIDTH,
            ...provided.draggableProps.style,
          }}
        >
          {/* Header: index + caption editable + delete */}
      <div className="flex items-center gap-1.5 px-0.5">
        <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing text-muted-foreground/60 hover:text-foreground transition-colors" title="Drag to reorder screen">
          <GripHorizontal className="w-3.5 h-3.5" />
        </div>
        <span className="text-[11px] text-foreground/80 font-mono font-semibold w-4 shrink-0">{index + 1}</span>

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
            className="flex-1 text-[11px] font-medium bg-transparent border-0 border-b border-primary/60 outline-none text-foreground py-0 px-0.5 min-w-0"
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
            className="flex-1 text-left text-[11px] text-muted-foreground hover:text-foreground font-medium truncate transition-colors px-0.5 py-0"
            title="Click to edit caption"
          >
            {screen.caption || <span className="italic opacity-60">Caption…</span>}
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

      {/* Canvas container */}
      <div
        className={cn(
          "relative rounded-2xl transition-all duration-150",
          isActiveScreen
            ? "ring-2 ring-primary shadow-lg shadow-primary/20"
            : "ring-1 ring-border/60 hover:ring-primary/30 hover:shadow-md"
        )}
        style={{ width: CARD_DISPLAY_WIDTH, height: displayH }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <canvas
          ref={canvasRef}
          width={screen.width}
          height={screen.height}
          style={{ width: CARD_DISPLAY_WIDTH, height: displayH, display: "block" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          onContextMenu={handleContextMenu}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isDraggingOver) setIsDraggingOver(true);
          }}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDraggingOver(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              const file = e.dataTransfer.files[0];
              if (!file.type.startsWith("image/")) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                const src = ev.target?.result as string;
                if (!src) return;
                const { x, y } = getCanvasCoords(e as unknown as React.MouseEvent<HTMLCanvasElement>);
                const hit = hitTest(x, y);
                if (hit) {
                  const layer = screen.layers.find((l) => l.id === hit);
                  if (layer?.type === "screenshot") {
                    updateLayer(screenSet.id, screen.id, hit, { src } as Partial<Layer>);
                    useEditorStore.getState().recordHistory();
                  } else if (layer?.type === "image") {
                    updateLayer(screenSet.id, screen.id, hit, { src } as Partial<Layer>);
                    useEditorStore.getState().recordHistory();
                  }
                } else {
                  // If dropped on empty canvas, add as new image layer
                  const layer = {
                    type: "image",
                    x: x - 250,
                    y: y - 250,
                    width: 500,
                    height: 500,
                    src,
                    rotation: 0,
                    opacity: 1,
                    cornerRadius: 0,
                  } as Omit<import("@/lib/types").ImageLayer, "id">;
                  useEditorStore.getState().addLayer(screenSet.id, screen.id, layer);
                  useEditorStore.getState().recordHistory();
                }
              };
              reader.readAsDataURL(file);
            }
          }}
          className={cn(isScreenshotActive ? "cursor-move" : "cursor-pointer", isDraggingOver ? "opacity-75" : "")}
        />

        {/* Magnetic Smart Snapping Guide Lines */}
        {snapGuides?.x && (
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-pink-500 shadow-md shadow-pink-500/50 z-20 pointer-events-none" />
        )}
        {snapGuides?.y && (
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-pink-500 shadow-md shadow-pink-500/50 z-20 pointer-events-none" />
        )}

        {/* Resize handles overlay — shown when layer is selected */}
        {isActiveScreen && activeLayer && !editingLayerId && (
          <ResizeOverlay
            layer={activeLayer}
            scale={scale}
            onResizeStart={handleResizeStart}
          />
        )}

        {/* Inline text edit overlay — shown on double-click */}
        {isActiveScreen && editingLayerId && (() => {
          const editLayer = screen.layers.find((l) => l.id === editingLayerId) as TextLayer | undefined;
          if (!editLayer) return null;
          return (
            <div
              className="absolute inset-0 z-40 bg-black/20 backdrop-blur-[2px] rounded-2xl"
              onClick={() => {
                updateLayer(screenSet.id, screen.id, editingLayerId, { content: editText } as Partial<Layer>);
                useEditorStore.getState().recordHistory();
                setEditingLayerId(null);
                toast.success("Text updated");
              }}
            >
              <textarea
                ref={textareaRef}
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setEditingLayerId(null);
                  }
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    updateLayer(screenSet.id, screen.id, editingLayerId, { content: editText } as Partial<Layer>);
                    useEditorStore.getState().recordHistory();
                    setEditingLayerId(null);
                    toast.success("Text updated");
                  }
                }}
                style={{
                  position: "absolute",
                  left: Math.max(6, Math.min(editLayer.x * scale, CARD_DISPLAY_WIDTH - 140)),
                  top: Math.max(6, Math.min(editLayer.y * scale, displayH - 60)),
                  width: Math.min(CARD_DISPLAY_WIDTH - 16, Math.max(140, editLayer.width * scale)),
                  minHeight: Math.max(48, editLayer.height * scale),
                  fontSize: Math.max(13, editLayer.fontSize * scale),
                  fontFamily: `"${editLayer.fontFamily}", sans-serif`,
                  fontWeight: editLayer.fontWeight,
                  color: editLayer.color,
                  textAlign: editLayer.align,
                  lineHeight: editLayer.lineHeight,
                  letterSpacing: `${editLayer.letterSpacing * scale}px`,
                  background: "rgba(15, 23, 42, 0.92)",
                  backdropFilter: "blur(12px)",
                  border: "2px solid #6366f1",
                  borderRadius: 8,
                  outline: "none",
                  resize: "none",
                  padding: "6px 10px",
                  boxShadow: "0 12px 30px -4px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(99, 102, 241, 0.4)",
                  zIndex: 50,
                }}
              />
              <div className="absolute bottom-2.5 inset-x-2 flex items-center justify-center pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-black/80 text-white/90 text-[10px] font-medium shadow-md">
                  ↵ Enter to save · Shift+↵ for new line · Esc to cancel
                </span>
              </div>
            </div>
          );
        })()}
        </div>

        {/* Right-click context menu (Rendered outside overflow-hidden with clamped position) */}
        {ctxMenu && isActiveScreen && (() => {
          const ctxLayer = screen.layers.find((l) => l.id === ctxMenu.layerId);
          if (!ctxLayer) return null;
          const MENU_WIDTH = 196;
          const MENU_HEIGHT = 280;
          const menuLeft = Math.max(6, Math.min(ctxMenu.x, CARD_DISPLAY_WIDTH - MENU_WIDTH - 6));
          const menuTop = Math.max(6, Math.min(ctxMenu.y, displayH - MENU_HEIGHT - 6));

          const isTextLayer = ctxLayer.type === "text";

          return (
            <div
              className="absolute z-50 min-w-48 bg-card/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl shadow-black/50 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
              style={{ left: menuLeft, top: menuTop }}
              onMouseLeave={() => setCtxMenu(null)}
            >
              {/* Layer name header */}
              <div className="px-3 py-1.5 border-b border-border/50">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider truncate">
                  {isTextLayer
                    ? (ctxLayer as TextLayer).content.slice(0, 20) || "Text"
                    : ctxLayer.type}
                </p>
              </div>

              {[
                ...(isTextLayer ? [{
                  icon: Edit3,
                  label: "Edit Text",
                  action: () => {
                    setEditingLayerId(ctxMenu.layerId);
                    setEditText((ctxLayer as TextLayer).content);
                    setCtxMenu(null);
                  }
                }] : []),
                {
                  icon: Copy, label: "Duplicate", action: () => {
                    duplicateLayer(screenSet.id, screen.id, ctxMenu.layerId);
                    setCtxMenu(null);
                    toast.success("Layer duplicated");
                  }
                },
                {
                  icon: AlignCenter, label: "Center Horizontally", action: () => {
                    updateLayer(screenSet.id, screen.id, ctxMenu.layerId, { x: Math.round(screen.width / 2 - ctxLayer.width / 2) } as Partial<Layer>);
                    useEditorStore.getState().recordHistory();
                    setCtxMenu(null);
                    toast.info("Layer centered horizontally");
                  }
                },
                {
                  icon: AlignJustify, label: "Center Vertically", action: () => {
                    updateLayer(screenSet.id, screen.id, ctxMenu.layerId, { y: Math.round(screen.height / 2 - ctxLayer.height / 2) } as Partial<Layer>);
                    useEditorStore.getState().recordHistory();
                    setCtxMenu(null);
                    toast.info("Layer centered vertically");
                  }
                },
                {
                  icon: ArrowUp, label: "Bring Forward", action: () => {
                    bringForward(screenSet.id, screen.id, ctxMenu.layerId);
                    setCtxMenu(null);
                  }
                },
                {
                  icon: ArrowDown, label: "Send Backward", action: () => {
                    sendBackward(screenSet.id, screen.id, ctxMenu.layerId);
                    setCtxMenu(null);
                  }
                },
                {
                  icon: ctxLayer.locked ? Lock : Lock,
                  label: ctxLayer.locked ? "Unlock Layer" : "Lock Layer",
                  action: () => {
                    lockLayer(screenSet.id, screen.id, ctxMenu.layerId, !ctxLayer.locked);
                    setCtxMenu(null);
                    toast.info(ctxLayer.locked ? "Layer unlocked" : "Layer locked");
                  }
                },
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  type="button"
                  onClick={action}
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs hover:bg-secondary text-foreground transition-colors text-left"
                >
                  <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  {label}
                </button>
              ))}

              <div className="border-t border-border/50 mt-1 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    deleteLayer(screenSet.id, screen.id, ctxMenu.layerId);
                    setCtxMenu(null);
                    toast.info("Layer deleted");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs hover:bg-destructive/15 text-destructive transition-colors text-left"
                >
                  <Trash2 className="w-3.5 h-3.5 shrink-0" />
                  Delete Layer
                </button>
              </div>
            </div>
          );
        })()}

        {/* Vertical Screen Context Menu (1-3 Mockups + Background) - only visible when the screen/frame itself is selected, NOT when a layer inside is selected */}
        {isActiveScreen && !activeLayerId && (!selectedLayerIds || selectedLayerIds.length === 0) && (
          <ScreenVerticalMenu screen={screen} screenSet={screenSet} />
        )}
      </div>

      {/* Screen name */}
      <p className="text-[11px] text-center text-muted-foreground font-medium truncate mt-0.5">{screen.name}</p>
        </div>
      )}
    </Draggable>
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
  const rot = layer.rotation || 0;

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
      <div 
        className="absolute inset-0"
        style={{
          transformOrigin: `${x + w/2}px ${y + h/2}px`,
          transform: rot ? `rotate(${rot}deg)` : "none"
        }}
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
        {/* Rotation handle */}
        <div
          className="absolute pointer-events-auto bg-white border-2 border-primary shadow-sm hover:bg-primary/20 transition-colors"
          style={{
            left: x + w/2 - hs/2,
            top: y - hs * 3,
            width: hs,
            height: hs,
            borderRadius: '50%',
            cursor: 'crosshair',
          }}
          onMouseDown={(e) => onResizeStart(e, "rotate")}
        />
        {/* Line connecting rotation handle to box */}
        <div
          className="absolute bg-primary/70 pointer-events-none"
          style={{
            left: x + w/2 - 1,
            top: y - hs * 3 + hs,
            width: 2,
            height: hs * 2,
          }}
        />
      </div>
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
  ctx.lineWidth = 10;
  ctx.setLineDash([30, 20]);
  ctx.strokeRect(x + 5, y + 5, w - 10, h - 10);
  ctx.setLineDash([]);

  // Phone icon (simple outline)
  const iw = w * 0.25;
  const ih = iw * 1.8;
  const ix = x + (w - iw) / 2;
  const iy = y + (h - ih) / 2 - (label ? h * 0.05 : 0);
  const ir = iw * 0.15;

  ctx.strokeStyle = "rgba(99,102,241,0.8)";
  ctx.lineWidth = Math.max(8, iw * 0.04);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.roundRect(ix, iy, iw, ih, ir);
  ctx.stroke();

  // Small home indicator
  ctx.fillStyle = "rgba(99,102,241,0.8)";
  ctx.beginPath();
  ctx.roundRect(ix + iw * 0.3, iy + ih - iw * 0.12, iw * 0.4, iw * 0.04, iw * 0.02);
  ctx.fill();

  // Upload icon (arrow up + line)
  const arrowCx = x + w / 2;
  const arrowCy = iy + ih / 2;
  const arrowSize = iw * 0.35;
  ctx.strokeStyle = "rgba(99,102,241,0.7)";
  ctx.lineWidth = Math.max(6, iw * 0.035);
  ctx.beginPath();
  ctx.moveTo(arrowCx, arrowCy - arrowSize * 0.6);
  ctx.lineTo(arrowCx, arrowCy + arrowSize * 0.4);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(arrowCx - arrowSize * 0.4, arrowCy - arrowSize * 0.2);
  ctx.lineTo(arrowCx, arrowCy - arrowSize * 0.6);
  ctx.lineTo(arrowCx + arrowSize * 0.4, arrowCy - arrowSize * 0.2);
  ctx.stroke();

  // Label text
  let instrY = iy + ih + h * 0.06;
  if (label) {
    const fontSize = Math.round(w * 0.085);
    ctx.font = `600 ${fontSize}px "Inter", sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    // Split text into lines if it's too wide
    const words = label.split(" ");
    let line = "";
    const lines: string[] = [];
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      if (ctx.measureText(testLine).width > w * 0.9 && i > 0) {
        lines.push(line.trim());
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    for (const l of lines) {
      ctx.fillText(l, x + w / 2, instrY);
      instrY += fontSize * 1.3;
    }
    instrY += h * 0.02;
  } else {
    instrY += w * 0.08 + h * 0.02;
  }

  // Tap instruction
  const instrFontSize = Math.round(w * 0.06);
  ctx.font = `500 ${instrFontSize}px "Inter", sans-serif`;
  ctx.fillStyle = "rgba(226,232,240,1)";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Click or drop image here", x + w / 2, instrY);
}
