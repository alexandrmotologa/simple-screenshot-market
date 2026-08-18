"use client";

import { useState } from "react";
import { X, Download, Package, Loader2, CheckCircle2, Apple, Smartphone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEditorStore } from "@/lib/store/editorStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { useLanguageStore, getLang } from "@/lib/store/languageStore";
import { toast } from "@/lib/store/toastStore";
import type { TextLayer, ShapeLayer, ImageLayer } from "@/lib/types";
import { renderScreenToCanvas } from "@/lib/renderScreenToCanvas";
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

      for (const langCode of (activeLangs.length > 0 ? activeLangs : ["en"])) {
        const langFolder = activeLangs.length > 1 ? platformFolder?.folder(langCode.toUpperCase()) : platformFolder;

        for (const screen of ss.screens) {
          const canvas = document.createElement("canvas");
          await renderScreenToCanvas(canvas, screen, ss, {
            scale,
            activeLang: langCode,
            isExport: true,
          });

          // ── Generate file ─────────────────────────────────────────────────────
          const mimeType = format === "jpg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
          const quality = format === "jpg" ? 0.92 : 1;
          const screenNum = String(ss.screens.indexOf(screen) + 1).padStart(2, "0");
          const langSuffix = activeLangs.length > 1 ? `_${langCode.toUpperCase()}` : "";
          const filename = `${appName}_${platformLabel}_${screenNum}${langSuffix}@${scale}x.${format}`;

          const blob = await new Promise<Blob>((resolve) =>
            canvas.toBlob((b) => resolve(b!), mimeType, quality)
          );

          if (zip && langFolder) {
            langFolder.file(filename, blob);
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
    toast.success(`Exported ${exported} screenshots successfully!`);
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
              <p className="text-xs font-semibold text-muted-foreground mb-2">Resolution Scale</p>
              <div className="flex gap-1.5">
                {([1, 2, 3] as ScaleOption[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setScale(s)}
                    className={cn(
                      "flex-1 py-2 rounded-xl text-xs font-bold transition-all border",
                      scale === s
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-secondary/60 hover:bg-secondary border-border/40 text-muted-foreground"
                    )}
                  >
                    @{s}x
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Image Format</p>
              <div className="flex gap-1.5">
                {(["png", "jpg", "webp"] as FormatOption[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormat(f)}
                    className={cn(
                      "flex-1 py-2 rounded-xl text-xs font-bold uppercase transition-all border",
                      format === f
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-secondary/60 hover:bg-secondary border-border/40 text-muted-foreground"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Export summary */}
          <div className="px-4 py-3 rounded-2xl bg-secondary/50 border border-border/50 text-xs">
            <div className="flex items-center justify-between font-medium">
              <span className="text-foreground">
                <span className="font-bold text-primary text-sm mr-1">{totalScreens}</span> screens ready to export
              </span>
              <span className="font-mono text-muted-foreground font-semibold px-2 py-0.5 rounded-md bg-background border border-border/50">
                {((screenSets[0]?.preset?.width ?? 1290) * scale)} × {((screenSets[0]?.preset?.height ?? 2796) * scale)} px
              </span>
            </div>
            {activeLangs.length > 1 && (
              <p className="text-[11px] text-muted-foreground mt-1.5">
                {screensPerLang} screens × {activeLangs.length} languages → organized in localized ZIP subfolders
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

function drawAutoFitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  baseFontSize: number,
  fontWeight: number | string = 700,
  fontFamily: string = '"Inter", sans-serif',
  color: string = "#FFFFFF",
  align: CanvasTextAlign = "center"
) {
  let fontSize = baseFontSize;
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const measured = ctx.measureText(text).width;
  if (measured > maxWidth && maxWidth > 0) {
    fontSize = Math.max(10, fontSize * (maxWidth / measured));
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  }
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}
