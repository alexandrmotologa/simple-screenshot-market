"use client";

import { useEffect, useRef, useCallback } from "react";
import { Screen, ScreenSet, TextLayer, ScreenshotLayer, ShapeLayer, ImageLayer } from "@/lib/types";
import { ALL_DEVICES, COLOR_HEX_MAP } from "@/lib/devices";

interface ScreenThumbnailCanvasProps {
  screen: Screen;
  screenSet: ScreenSet;
  width?: number;
  height?: number;
  className?: string;
}

const imageCache = new Map<string, HTMLImageElement>();

function loadCachedImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    const cached = imageCache.get(src)!;
    if (cached.complete && cached.naturalWidth > 0) {
      return Promise.resolve(cached);
    }
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
  });
}

export function ScreenThumbnailCanvas({
  screen,
  screenSet,
  width = 44,
  height = 80,
  className = "",
}: ScreenThumbnailCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawThumbnail = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = screen.width || 1290;
    const H = screen.height || 2796;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const scale = targetW / W;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, targetW, targetH);
    ctx.scale(scale, scale);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "medium";

    // ── 1. Background ──────────────────────────────────────────────────────────
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
        grad.addColorStop(Math.min(Math.max(stop.position / 100, 0), 1), stop.color);
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else if (bg.type === "mesh" && bg.mesh) {
      const { topLeft: tl, topRight: tr, bottomLeft: bl, bottomRight: br } = bg.mesh;
      const g1 = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.hypot(W, H));
      g1.addColorStop(0, tl + "cc"); g1.addColorStop(1, tl + "00");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W, 0, 0, W, 0, Math.hypot(W, H));
      g2.addColorStop(0, tr + "cc"); g2.addColorStop(1, tr + "00");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

      const g3 = ctx.createRadialGradient(0, H, 0, 0, H, Math.hypot(W, H));
      g3.addColorStop(0, bl + "cc"); g3.addColorStop(1, bl + "00");
      ctx.fillStyle = g3; ctx.fillRect(0, 0, W, H);

      const g4 = ctx.createRadialGradient(W, H, 0, W, H, Math.hypot(W, H));
      g4.addColorStop(0, br + "cc"); g4.addColorStop(1, br + "00");
      ctx.fillStyle = g4; ctx.fillRect(0, 0, W, H);
    } else if (bg.type === "image" && bg.imageUrl) {
      try {
        const bgImg = await loadCachedImage(bg.imageUrl);
        if (bg.imageSlice) {
          const { x, y, width: sw, height: sh } = bg.imageSlice;
          ctx.drawImage(bgImg, x, y, sw, sh, 0, 0, W, H);
        } else {
          ctx.drawImage(bgImg, 0, 0, W, H);
        }
      } catch {
        ctx.fillStyle = bg.backgroundColor || "#1a1a2e";
        ctx.fillRect(0, 0, W, H);
      }
    } else {
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, W, H);
    }

    // ── 2. Layers ──────────────────────────────────────────────────────────────
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

      // ── Text Layer ──
      if (layer.type === "text") {
        const tl = layer as TextLayer;
        ctx.font = `${tl.fontWeight || 500} ${tl.fontSize}px "${tl.fontFamily || "Inter"}", system-ui, sans-serif`;
        ctx.fillStyle = tl.color || "#ffffff";
        ctx.textAlign = (tl.align || "left") as CanvasTextAlign;

        const words = (tl.content || "").split(" ");
        const lines: string[] = [];
        let currentLine = "";

        for (let i = 0; i < words.length; i++) {
          const testLine = currentLine + words[i] + " ";
          const metrics = ctx.measureText(testLine);
          if (metrics.width > tl.width && i > 0) {
            lines.push(currentLine.trim());
            currentLine = words[i] + " ";
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine.trim());
        const finalLines = lines.flatMap((l) => l.split("\n"));
        const lineH = tl.fontSize * (tl.lineHeight ?? 1.25);

        const xPos =
          tl.align === "center"
            ? tl.x + tl.width / 2
            : tl.align === "right"
            ? tl.x + tl.width
            : tl.x;

        finalLines.forEach((line, i) => {
          ctx.fillText(line, xPos, tl.y + tl.fontSize + i * lineH, tl.width);
        });
      }

      // ── Screenshot / Device Mockup Layer ──
      else if (layer.type === "screenshot") {
        const sl = layer as ScreenshotLayer;
        const mockup = screenSet.mockup;
        const hasFrame = sl.showDeviceFrame && mockup?.showFrame !== false;
        const device = ALL_DEVICES.find((d) => d.id === mockup?.device) || ALL_DEVICES[0];

        const physicalW = device.width;
        const physicalH = device.height;
        const bezelRatio = hasFrame ? (device.bezelRatio ?? 0.0373) : 0;
        const rawBezel = physicalW * bezelRatio;
        const frameW = physicalW + rawBezel * 2;
        const frameH = physicalH + rawBezel * 2;

        const devScale = Math.min(sl.width / frameW, sl.height / frameH);
        const w = frameW * devScale;
        const h = frameH * devScale;
        const x = sl.x + (sl.width - w) / 2;
        const y = sl.y + (sl.height - h) / 2;

        const defaultDeviceR = device.cornerRadius * devScale + (hasFrame ? rawBezel * devScale : 0);
        const r = mockup?.squircle || hasFrame ? defaultDeviceR : sl.cornerRadius || 0;
        const bezel = hasFrame ? rawBezel * devScale : 0;

        const innerX = x + bezel;
        const innerY = y + bezel;
        const innerW = w - bezel * 2;
        const innerH = h - bezel * 2;
        const innerR = Math.max(0, r - bezel);

        const rawColorName = mockup?.color || "black";
        const baseHex = COLOR_HEX_MAP[rawColorName.toLowerCase()] || "#1a1a1c";

        // Outer Frame
        if (hasFrame) {
          ctx.beginPath();
          if (r > 0) ctx.roundRect(x, y, w, h, r);
          else ctx.rect(x, y, w, h);
          ctx.fillStyle = baseHex;
          ctx.fill();
        }

        // Inner Screen area (Device Display)
        ctx.save();
        ctx.beginPath();
        if (innerR > 0) ctx.roundRect(innerX, innerY, innerW, innerH, innerR);
        else ctx.rect(innerX, innerY, innerW, innerH);
        ctx.clip();

        if (sl.src) {
          try {
            const img = await loadCachedImage(sl.src);
            if (sl.objectFit === "cover") {
              const imgRatio = img.width / img.height;
              const zoneRatio = innerW / innerH;
              let sx = 0, sy = 0, sw = img.width, sh = img.height;
              if (imgRatio > zoneRatio) {
                sw = img.height * zoneRatio;
                sx = (img.width - sw) / 2;
              } else {
                sh = img.width / zoneRatio;
                sy = (img.height - sh) / 2;
              }
              ctx.drawImage(img, sx, sy, sw, sh, innerX, innerY, innerW, innerH);
            } else {
              ctx.drawImage(img, innerX, innerY, innerW, innerH);
            }
          } catch {
            ctx.fillStyle = "#09090b";
            ctx.fillRect(innerX, innerY, innerW, innerH);
          }
        } else {
          ctx.fillStyle = "#0c0e14";
          ctx.fillRect(innerX, innerY, innerW, innerH);
          // Subtle screen placeholder line
          ctx.strokeStyle = "rgba(255,255,255,0.15)";
          ctx.lineWidth = 4;
          ctx.strokeRect(innerX + 20, innerY + 20, innerW - 40, innerH - 40);
        }

        // Dynamic Island / Notch preview
        if (device.notchType === "island") {
          const islandW = innerW * 0.3;
          const islandH = innerH * 0.038;
          const islandX = innerX + (innerW - islandW) / 2;
          const islandY = innerY + innerH * 0.018;
          ctx.fillStyle = "#000000";
          ctx.beginPath();
          ctx.roundRect(islandX, islandY, islandW, islandH, islandH / 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // ── Shape Layer ──
      else if (layer.type === "shape") {
        const sl = layer as ShapeLayer;
        ctx.fillStyle = sl.fill || "transparent";
        const r = sl.cornerRadius ?? 0;

        ctx.beginPath();
        if (sl.shape === "circle") {
          ctx.arc(sl.x + sl.width / 2, sl.y + sl.height / 2, Math.min(sl.width, sl.height) / 2, 0, Math.PI * 2);
        } else if (r > 0) {
          ctx.roundRect(sl.x, sl.y, sl.width, sl.height, r);
        } else {
          ctx.rect(sl.x, sl.y, sl.width, sl.height);
        }
        ctx.fill();

        if (sl.stroke && sl.strokeWidth) {
          ctx.strokeStyle = sl.stroke;
          ctx.lineWidth = sl.strokeWidth;
          ctx.stroke();
        }
      }

      // ── Image / Brand / Character / Flag Layer ──
      else if (layer.type === "image" || layer.type === "brand" || layer.type === "flag" || layer.type === "character") {
        const il = layer as ImageLayer;
        if (il.src) {
          try {
            const img = await loadCachedImage(il.src);
            ctx.drawImage(img, il.x, il.y, il.width, il.height);
          } catch {}
        }
      }

      ctx.restore();
    }
  }, [screen, screenSet, width, height]);

  useEffect(() => {
    let animId: number;
    animId = requestAnimationFrame(() => {
      drawThumbnail();
    });
    return () => cancelAnimationFrame(animId);
  }, [drawThumbnail]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
      className={className}
    />
  );
}
