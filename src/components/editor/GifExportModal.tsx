"use client";

import { useState, useRef } from "react";
import {
  Film, X, Loader2, CheckCircle2, AlertCircle,
  Play, Settings2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/lib/store/editorStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { cn } from "@/lib/utils";
import type { TextLayer, ShapeLayer, ImageLayer } from "@/lib/types";
import { renderScreenToCanvas } from "@/lib/renderScreenToCanvas";

interface GifExportModalProps {
  projectId: string;
  onClose: () => void;
}

type Step = "config" | "exporting" | "done" | "error";

// ─── Component ─────────────────────────────────────────────────────────────────
export function GifExportModal({ projectId, onClose }: GifExportModalProps) {
  const { screenSets } = useEditorStore();
  const { projects } = useProjectStore();
  const project = projects.find((p) => p.id === projectId);
  const appName = project?.name ?? "SnapFrame";

  const [step, setStep] = useState<Step>("config");
  const [fps, setFps] = useState(1.5);
  const [scale, setScale] = useState(1);
  const [selectedSet, setSelectedSet] = useState<string>(screenSets[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const progressRef = useRef(0);

  const activeSet = screenSets.find((s) => s.id === selectedSet) || screenSets[0];
  const screens = activeSet?.screens ?? [];

  const handleExport = async () => {
    if (screens.length === 0) return;
    setStep("exporting");
    setProgress(0);

    try {
      // 1. Render each screen to a canvas → PNG blob
      setStatusMsg("Rendering screens...");
      const pngBlobs: Blob[] = [];
      for (let i = 0; i < screens.length; i++) {
        const canvas = document.createElement("canvas");
        await renderScreenToCanvas(canvas, screens[i], activeSet, { scale, isExport: true });
        const blob = await new Promise<Blob>((res) =>
          canvas.toBlob((b) => res(b!), "image/png")
        );
        pngBlobs.push(blob);
        const pct = Math.round(((i + 1) / screens.length) * 40);
        setProgress(pct);
        progressRef.current = pct;
      }

      setStatusMsg("Loading FFmpeg...");
      setProgress(45);

      // 2. Dynamically import ffmpeg (avoids SSR issues)
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { fetchFile, toBlobURL } = await import("@ffmpeg/util");

      const ffmpeg = new FFmpeg();
      ffmpeg.on("progress", ({ progress: p }) => {
        const pct = 45 + Math.round(p * 50);
        setProgress(pct);
      });
      ffmpeg.on("log", ({ message }) => setStatusMsg(message.slice(0, 80)));

      // Load ffmpeg core from CDN
      setStatusMsg("Loading FFmpeg core...");
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });

      // 3. Write PNG frames to ffmpeg virtual FS
      setStatusMsg("Processing frames...");
      const delayMs = Math.round(100 / fps); // centiseconds per frame
      const duration = delayMs / 100;

      for (let i = 0; i < pngBlobs.length; i++) {
        const frameData = await fetchFile(pngBlobs[i]);
        await ffmpeg.writeFile(`frame${String(i).padStart(3, "0")}.png`, frameData);
      }

      // 4. Run ffmpeg to create GIF
      setStatusMsg("Encoding GIF...");

      // Scale down for GIF (max 600px wide for reasonable file size)
      const gifW = Math.min(screens[0].width * scale, 600);
      await ffmpeg.exec([
        "-framerate", String(fps),
        "-i", "frame%03d.png",
        "-vf", [
          `scale=${gifW}:-1:flags=lanczos`,
          "split[s0][s1]",
          "[s0]palettegen=max_colors=256[p]",
          "[s1][p]paletteuse=dither=bayer"
        ].join(","),
        "-loop", "0",
        "output.gif",
      ]);

      // 5. Read output and download
      setStatusMsg("Saving GIF...");
      const data = await ffmpeg.readFile("output.gif");
      // Guarantee a plain (non-shared) ArrayBuffer for Blob
      const rawBytes = data instanceof Uint8Array ? data : new Uint8Array(data as unknown as ArrayBuffer);
      const plainBuf = new ArrayBuffer(rawBytes.byteLength);
      new Uint8Array(plainBuf).set(rawBytes);
      const gifBlob = new Blob([plainBuf], { type: "image/gif" });
      const url = URL.createObjectURL(gifBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${appName}_animated.gif`;
      a.click();
      URL.revokeObjectURL(url);

      setProgress(100);
      setStep("done");
    } catch (e) {
      console.error(e);
      setErrorMsg(e instanceof Error ? e.message : "Unknown error");
      setStep("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-500/15 flex items-center justify-center">
              <Film className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <h2 className="font-semibold text-base">Animated GIF Export</h2>
              <p className="text-xs text-muted-foreground">FFmpeg powered · High quality</p>
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
          {step === "config" && (
            <>
              {/* Platform picker */}
              {screenSets.length > 1 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Platform</p>
                  <div className="flex gap-2">
                    {screenSets.map((ss) => (
                      <button
                        key={ss.id}
                        type="button"
                        onClick={() => setSelectedSet(ss.id)}
                        className={cn(
                          "flex-1 py-2 rounded-xl text-xs font-medium border transition-all",
                          selectedSet === ss.id
                            ? "border-pink-500/40 bg-pink-500/10 text-pink-300"
                            : "border-border/40 bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
                        )}
                      >
                        {ss.store === "ios" ? "🍎 iOS" : "🤖 Android"}
                        <span className="block text-[10px] opacity-70 mt-0.5">{ss.screens.length} screens</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FPS */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Settings2 className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="text-xs font-medium text-muted-foreground">Frame Rate</p>
                </div>
                <div className="flex gap-1.5">
                  {[0.5, 1, 1.5, 2, 3].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFps(f)}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-xs font-medium transition-all",
                        fps === f
                          ? "bg-pink-500 text-white"
                          : "bg-secondary hover:bg-secondary/60 text-muted-foreground"
                      )}
                    >
                      {f} fps
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5">
                  Each screen shown for {(1 / fps).toFixed(1)}s · Total: {(screens.length / fps).toFixed(1)}s
                </p>
              </div>

              {/* Scale */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Resolution</p>
                <div className="flex gap-1.5">
                  {([1, 2] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setScale(s)}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-xs font-medium transition-all",
                        scale === s
                          ? "bg-pink-500 text-white"
                          : "bg-secondary hover:bg-secondary/60 text-muted-foreground"
                      )}
                    >
                      @{s}x {s === 2 ? "(HD)" : "(SD)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="px-4 py-3 rounded-xl bg-secondary/50 border border-border/40 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Screens</span>
                  <span className="font-medium">{screens.length} frames</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Output size (approx.)</span>
                  <span className="font-medium">
                    {Math.min(screens[0]?.width ?? 390, 600)}px wide
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Engine</span>
                  <span className="font-medium text-pink-400">FFmpeg WebAssembly</span>
                </div>
              </div>

              {/* Note */}
              <div className="flex gap-2 text-[11px] text-amber-400/80 bg-amber-500/5 border border-amber-500/15 rounded-xl px-3 py-2.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>First export downloads FFmpeg (~30 MB). Subsequent exports are instant.</span>
              </div>
            </>
          )}

          {/* Progress */}
          {step === "exporting" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/15 flex items-center justify-center shrink-0">
                  <Loader2 className="w-5 h-5 text-pink-400 animate-spin" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Creating your GIF...</p>
                  <p className="text-xs text-muted-foreground truncate">{statusMsg}</p>
                </div>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-center font-mono text-muted-foreground">{progress}%</p>
            </div>
          )}

          {/* Done */}
          {step === "done" && (
            <div className="flex items-center gap-3 text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-4">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <p className="text-sm font-medium">GIF exported successfully!</p>
                <p className="text-xs text-green-400/70 mt-0.5">Check your downloads folder.</p>
              </div>
            </div>
          )}

          {/* Error */}
          {step === "error" && (
            <div className="flex items-start gap-3 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-4">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Export failed</p>
                <p className="text-xs text-red-400/70 mt-1 font-mono">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onClose} disabled={step === "exporting"}>
              {step === "done" ? "Close" : "Cancel"}
            </Button>
            {step === "config" && (
              <Button
                className="flex-1 gap-2 bg-pink-600 hover:bg-pink-700 text-white"
                onClick={handleExport}
                disabled={screens.length === 0}
              >
                <Play className="w-4 h-4" />
                Export GIF
              </Button>
            )}
            {step === "error" && (
              <Button
                className="flex-1 gap-2"
                onClick={() => { setStep("config"); setProgress(0); }}
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
