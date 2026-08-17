"use client";

import { useState } from "react";
import { X, Download, Package, Loader2, CheckCircle2, Apple, Smartphone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEditorStore } from "@/lib/store/editorStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { useLanguageStore, getLang } from "@/lib/store/languageStore";
import type { TextLayer, ShapeLayer, ImageLayer } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AppleStoreIcon, GooglePlayIcon, APP_STORE_LABEL, GOOGLE_PLAY_LABEL } from "@/components/icons/StoreIcons";

interface ExportModalProps {
  projectId: string;
  onClose: () => void;
}

type ScaleOption = 1 | 2 | 3;
type FormatOption = "png" | "jpg" | "webp";

export function ExportModal({ projectId, onClose }: ExportModalProps) {
  const { screenSets } = useEditorStore();
  const { projects } = useProjectStore();
  const { projectLanguages } = useLanguageStore();
  const project = projects.find((p) => p.id === projectId);
  const appName = project?.name ?? "SnapFrame";

  const [scale, setScale] = useState<ScaleOption>(1);
  const [format, setFormat] = useState<FormatOption>("png");
  const [selectedSets, setSelectedSets] = useState<Set<string>>(
    new Set(screenSets.map((ss) => ss.id))
  );
  const [selectedLangs, setSelectedLangs] = useState<Set<string>>(
    new Set(projectLanguages)
  );
  const [progress, setProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [done, setDone] = useState(false);
  const [exportedCount, setExportedCount] = useState(0);

  const activeSets = screenSets.filter((ss) => selectedSets.has(ss.id));
  const activeLangs = Array.from(selectedLangs);
  const screensPerLang = activeSets.reduce((acc, ss) => acc + ss.screens.length, 0);
  const totalScreens = screensPerLang * Math.max(activeLangs.length, 1);

  const toggleSet = (id: string) => {
    setSelectedSets((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleLang = (code: string) => {
    setSelectedLangs((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        if (next.size > 1) next.delete(code); // keep at least 1
      } else {
        next.add(code);
      }
      return next;
    });
  };

  const handleExport = async () => {
    if (typeof window === "undefined") return;
    setIsExporting(true);
    setProgress(0);
    setDone(false);
    setExportedCount(0);

    // Dynamically import JSZip
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let JSZipClass: any = null;
    try {
      const mod = await import("jszip");
      JSZipClass = mod.default;
    } catch {
      // JSZip not available
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const zip: any = JSZipClass ? new JSZipClass() : null;
    let exported = 0;

    for (const ss of activeSets) {
      const platformLabel = ss.store === "ios" ? "iOS" : "Android";
      const platformFolder = zip?.folder(platformLabel);

      for (const screen of ss.screens) {
        const canvas = document.createElement("canvas");
        canvas.width = screen.width * scale;
        canvas.height = screen.height * scale;
        const ctx = canvas.getContext("2d")!;
        ctx.scale(scale, scale);

        // ── Background ───────────────────────────────────────────────────────
        const bg = screen.background;
        if (bg.type === "solid" && bg.color) {
          ctx.fillStyle = bg.color;
          ctx.fillRect(0, 0, screen.width, screen.height);
        } else if (bg.type === "gradient" && bg.gradient) {
          const dirs: Record<string, [number, number, number, number]> = {
            "to-b":  [0, 0, 0, screen.height],
            "to-r":  [0, 0, screen.width, 0],
            "to-br": [0, 0, screen.width, screen.height],
            "to-bl": [screen.width, 0, 0, screen.height],
            "to-tr": [0, screen.height, screen.width, 0],
            "to-tl": [screen.width, screen.height, 0, 0],
          };
          const [x0, y0, x1, y1] = dirs[bg.gradient.direction] ?? [0, 0, 0, screen.height];
          const grad = ctx.createLinearGradient(x0, y0, x1, y1);
          for (const stop of bg.gradient.stops) {
            grad.addColorStop(stop.position / 100, stop.color);
          }
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, screen.width, screen.height);
        } else if (bg.type === "image" && bg.imageUrl) {
          try {
            const img = await new Promise<HTMLImageElement>((resolve, reject) => {
              const i = new Image();
              i.crossOrigin = "anonymous";
              i.onload = () => resolve(i);
              i.onerror = reject;
              i.src = bg.imageUrl!;
            });
            if (bg.imageSlice) {
              const { x, y, width, height } = bg.imageSlice;
              ctx.drawImage(img, x, y, width, height, 0, 0, screen.width, screen.height);
            } else {
              ctx.drawImage(img, 0, 0, screen.width, screen.height);
            }
          } catch {
            ctx.fillStyle = "#1a1a2e";
            ctx.fillRect(0, 0, screen.width, screen.height);
          }
        } else {
          ctx.fillStyle = "#1a1a2e";
          ctx.fillRect(0, 0, screen.width, screen.height);
        }

        // ── Layers ───────────────────────────────────────────────────────────
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

          if (layer.type === "text") {
            const tl = layer as TextLayer;
            ctx.font = `${tl.fontWeight} ${tl.fontSize}px "${tl.fontFamily}", -apple-system, sans-serif`;
            ctx.fillStyle = tl.color;
            ctx.textAlign = tl.align as CanvasTextAlign;
            const lines = tl.content.split("\n");
            const lineH = tl.fontSize * (tl.lineHeight ?? 1.25);
            const xPos = tl.align === "center" ? tl.x + tl.width / 2
              : tl.align === "right" ? tl.x + tl.width
              : tl.x;
            lines.forEach((line, i) => {
              ctx.fillText(line, xPos, tl.y + tl.fontSize + i * lineH, tl.width);
            });
          } else if (layer.type === "screenshot") {
            const sl = layer as import("@/lib/types").ScreenshotLayer;
            const { x, y, width: w, height: h, cornerRadius: r = 0 } = sl;
            ctx.beginPath();
            if (r > 0) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h);
            ctx.clip();
            if (sl.src) {
              try {
                const img = await new Promise<HTMLImageElement>((resolve, reject) => {
                  const i = new Image();
                  i.crossOrigin = "anonymous";
                  i.onload = () => resolve(i);
                  i.onerror = reject;
                  i.src = sl.src!;
                });
                if (sl.objectFit === "cover") {
                  const ir = img.width / img.height, zr = w / h;
                  let sx = 0, sy = 0, sw = img.width, sh = img.height;
                  if (ir > zr) { sw = img.height * zr; sx = (img.width - sw) / 2; }
                  else { sh = img.width / zr; sy = (img.height - sh) / 2; }
                  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
                } else {
                  ctx.drawImage(img, x, y, w, h);
                }
              } catch {
                ctx.fillStyle = "rgba(99,102,241,0.15)";
                ctx.fill();
              }
            } else {
              ctx.fillStyle = "rgba(99,102,241,0.15)";
              ctx.fill();
            }
          } else if (layer.type === "shape") {
            const sl = layer as ShapeLayer;
            ctx.fillStyle = sl.fill;
            const r2 = sl.cornerRadius ?? 0;
            ctx.beginPath();
            if (sl.shape === "circle") {
              ctx.ellipse(sl.x + sl.width / 2, sl.y + sl.height / 2, sl.width / 2, sl.height / 2, 0, 0, Math.PI * 2);
            } else if (r2 > 0) {
              ctx.roundRect(sl.x, sl.y, sl.width, sl.height, r2);
            } else {
              ctx.rect(sl.x, sl.y, sl.width, sl.height);
            }
            ctx.fill();
          } else if (layer.type === "image") {
            const il = layer as ImageLayer;
            try {
              const img = await new Promise<HTMLImageElement>((resolve, reject) => {
                const i = new Image();
                i.crossOrigin = "anonymous";
                i.onload = () => resolve(i);
                i.onerror = reject;
                i.src = il.src;
              });
              ctx.drawImage(img, il.x, il.y, il.width, il.height);
            } catch { /* skip */ }
          } else if (layer.type === "character") {
            const cl = layer as import("@/lib/types").CharacterLayer;
            if (cl.svgContent) {
              try {
                const blob = new Blob([cl.svgContent], { type: "image/svg+xml" });
                const blobUrl = URL.createObjectURL(blob);
                const img = await new Promise<HTMLImageElement>((resolve, reject) => {
                  const i = new Image();
                  i.onload = () => resolve(i);
                  i.onerror = reject;
                  i.src = blobUrl;
                });
                ctx.drawImage(img, cl.x, cl.y, cl.width, cl.height);
                URL.revokeObjectURL(blobUrl);
              } catch { /* skip */ }
            }
          }
          ctx.restore();
        }

        // ── Generate file ─────────────────────────────────────────────────────
        const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
        const quality = format === "jpg" ? 0.92 : 1;
        const screenNum = String(ss.screens.indexOf(screen) + 1).padStart(2, "0");
        const filename = `${appName}_${platformLabel}_${screenNum}@${scale}x.${format}`;

        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => resolve(b!), mimeType, quality)
        );

        if (zip && platformFolder) {
          platformFolder.file(filename, blob);
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          a.click();
          URL.revokeObjectURL(url);
        }

        exported++;
        setExportedCount(exported);
        setProgress(Math.round((exported / totalScreens) * 100));
        await new Promise((r) => setTimeout(r, 30));
      }
    }

    if (zip) {
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${appName}_screenshots_@${scale}x.zip`;
      a.click();
      URL.revokeObjectURL(url);
    }

    setDone(true);
    setIsExporting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Download className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-base">Export Screenshots</h2>
              <p className="text-xs text-muted-foreground">{appName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Platform selection */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2.5">Platform</p>
            <div className="space-y-2">
              {screenSets.map((ss) => {
                const isSelected = selectedSets.has(ss.id);
                const isIOS = ss.store === "ios";
                return (
                  <button
                    key={ss.id}
                    onClick={() => toggleSet(ss.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border text-sm transition-all text-left",
                      isSelected
                        ? isIOS
                          ? "border-blue-500/40 bg-blue-500/8 text-blue-300"
                          : "border-green-500/40 bg-green-500/8 text-green-300"
                        : "border-border/50 bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
                    )}
                  >
                    {isIOS ? (
                      <AppleStoreIcon className="w-4 h-4 shrink-0 text-foreground" />
                    ) : (
                      <GooglePlayIcon className="w-4 h-4 shrink-0" />
                    )}
                    <span className="flex-1 font-medium">
                      {isIOS ? APP_STORE_LABEL : GOOGLE_PLAY_LABEL}
                    </span>
                    <span className="text-xs opacity-70">{ss.screens.length} screens</span>
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center",
                      isSelected ? (isIOS ? "border-blue-400 bg-blue-400" : "border-green-400 bg-green-400") : "border-border"
                    )}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language selection — shown only when project has multiple languages */}
          {projectLanguages.length > 1 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                <p className="text-xs font-medium text-muted-foreground">Languages</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {projectLanguages.map((code) => {
                  const lang = getLang(code);
                  const isSelected = selectedLangs.has(code);
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => toggleLang(code)}
                      className={cn(
                        "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all",
                        isSelected
                          ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300"
                          : "bg-secondary/30 border-border/40 text-muted-foreground hover:bg-secondary/60"
                      )}
                    >
                      <span>{lang?.flag ?? "🌐"}</span>
                      <span className="uppercase">{code}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Scale + Format row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Resolution</p>
              <div className="flex gap-1.5">
                {([1, 2, 3] as ScaleOption[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setScale(s)}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                      scale === s
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/60 text-muted-foreground"
                    )}
                  >
                    @{s}x
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Format</p>
              <div className="flex gap-1.5">
                {(["png", "jpg", "webp"] as FormatOption[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-xs font-medium uppercase transition-all",
                      format === f
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/60 text-muted-foreground"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Export summary */}
          <div className="px-4 py-3 rounded-xl bg-secondary/50 border border-border/40 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">{totalScreens}</span> screenshots to export
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {screenSets[0]?.preset?.width ?? "—"} × {screenSets[0]?.preset?.height ?? "—"} px
              </span>
            </div>
            {activeLangs.length > 1 && (
              <p className="text-[11px] text-muted-foreground mt-1">
                {screensPerLang} screens × {activeLangs.length} languages → organized in subfolders
              </p>
            )}
          </div>

          {/* Progress */}
          {isExporting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Exporting {exportedCount} / {totalScreens}...</span>
                <span className="font-mono tabular-nums">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {done && (
            <div className="flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">Export complete! Check your downloads folder.</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="flex-1" onClick={onClose} disabled={isExporting}>
              {done ? "Close" : "Cancel"}
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={handleExport}
              disabled={isExporting || totalScreens === 0}
            >
              {isExporting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Exporting...</>
              ) : (
                <><Package className="w-4 h-4" /> Export ZIP</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
