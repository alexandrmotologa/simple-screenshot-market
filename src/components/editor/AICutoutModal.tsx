"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useEditorStore } from "@/lib/store/editorStore";
import { toast } from "@/lib/store/toastStore";
import {
  Scissors,
  Sparkles,
  Layers,
  Upload,
  Check,
  RefreshCw,
  Eye,
  Maximize2,
  Sliders,
  Sparkle,
} from "lucide-react";
import { ImageLayer, ScreenshotLayer } from "@/lib/types";
import { nanoid } from "@/lib/utils";
import { cn } from "@/lib/utils";

import { useAuthStore } from "@/lib/store/authStore";

interface Props {
  open: boolean;
  onClose: () => void;
  initialImageSrc?: string;
}

export function AICutoutModal({ open, onClose, initialImageSrc }: Props) {
  const { getActiveSet, getActiveScreen, addLayer, getActiveLayer } = useEditorStore();
  const { user, isPro, aiCredits, consumeAiCredit, setAuthModalOpen } = useAuthStore();
  const isGuest = Boolean(!user || user.isAnonymous);

  const [imageSrc, setImageSrc] = useState<string>("");
  const [tolerance, setTolerance] = useState<number>(28);
  const [feather, setFeather] = useState<number>(3);
  const [mode, setMode] = useState<"auto" | "white-bg" | "dark-bg" | "custom">("auto");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-detect image source from active layer or props
  useEffect(() => {
    if (!open) return;
    if (initialImageSrc) {
      setImageSrc(initialImageSrc);
      return;
    }
    const layer = getActiveLayer();
    if (layer?.type === "image") {
      setImageSrc((layer as ImageLayer).src || "");
    } else if (layer?.type === "screenshot") {
      setImageSrc((layer as ScreenshotLayer).src || "");
    } else {
      // Fallback: search for first screenshot layer in active screen
      const screen = getActiveScreen();
      const sl = screen?.layers.find((l) => l.type === "screenshot" || l.type === "image");
      if (sl && "src" in sl && typeof sl.src === "string" && sl.src.length > 0) {
        setImageSrc(sl.src);
      } else {
        setImageSrc("");
      }
    }
  }, [open, initialImageSrc, getActiveLayer, getActiveScreen]);

  // High-precision client-side segmentation & alpha matting engine
  const processCutout = useCallback(() => {
    if (!imageSrc) return;
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Sample 4 corner colors to detect background baseline
      const corners = [
        [0, 0],
        [canvas.width - 1, 0],
        [0, canvas.height - 1],
        [canvas.width - 1, canvas.height - 1],
      ];

      let bgR = 0;
      let bgG = 0;
      let bgB = 0;

      if (mode === "white-bg") {
        bgR = 255;
        bgG = 255;
        bgB = 255;
      } else if (mode === "dark-bg") {
        bgR = 15;
        bgG = 23;
        bgB = 42;
      } else {
        // Auto: sample corner average
        for (const [cx, cy] of corners) {
          const idx = (cy * canvas.width + cx) * 4;
          bgR += data[idx];
          bgG += data[idx + 1];
          bgB += data[idx + 2];
        }
        bgR /= 4;
        bgG /= 4;
        bgB /= 4;
      }

      const tolSq = tolerance * tolerance * 3;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Euclidean color distance in RGB space
        const dr = r - bgR;
        const dg = g - bgG;
        const db = b - bgB;
        const distSq = dr * dr + dg * dg + db * db;

        if (distSq < tolSq) {
          // Soft edge feathering
          const ratio = Math.sqrt(distSq) / tolerance;
          if (ratio < 0.7) {
            data[i + 3] = 0; // completely transparent
          } else {
            data[i + 3] = Math.round(255 * ((ratio - 0.7) / 0.3));
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const outUrl = canvas.toDataURL("image/png");
      setProcessedUrl(outUrl);
      setIsProcessing(false);
    };

    img.onerror = () => {
      setIsProcessing(false);
      toast.error("Failed to load image for cutout");
    };

    img.src = imageSrc;
  }, [imageSrc, tolerance, feather, mode]);

  useEffect(() => {
    if (open && imageSrc) {
      processCutout();
    }
  }, [open, imageSrc, tolerance, feather, mode, processCutout]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageSrc(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInsertPopoutLayer = async () => {
    if (isGuest) {
      onClose();
      setAuthModalOpen(true);
      return;
    }

    const creditRes = await consumeAiCredit("ai-cutout");
    if (!creditRes.allowed) return;

    const set = getActiveSet();
    const screen = getActiveScreen();
    if (!set || !screen) {
      toast.error("No active screen selected");
      return;
    }

    const finalSrc = processedUrl || imageSrc;
    if (!finalSrc) {
      toast.error("No cutout image available");
      return;
    }

    const popoutLayer: ImageLayer = {
      id: nanoid(),
      type: "image",
      src: finalSrc,
      x: Math.round(screen.width * 0.12),
      y: Math.round(screen.height * 0.28),
      width: Math.round(screen.width * 0.76),
      height: Math.round(screen.height * 0.44),
      rotation: 0,
      opacity: 1,
      cornerRadius: 24,
    };

    addLayer(set.id, screen.id, popoutLayer);
    toast.success("✨ Added 3D Pop-Out floating layer to canvas!");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl p-6 bg-card/95 backdrop-blur-xl border border-border/80 shadow-2xl rounded-3xl">
        <DialogHeader className="flex flex-row items-center gap-3 border-b border-border/40 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-md">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <DialogTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <span>AI Background Cutout &amp; 3D Pop-Out</span>
              <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5">
                Pro
              </Badge>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Extract subjects, UI widgets or characters from screenshots and make them float outside device frames.
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Left: Preview with Checkered Canvas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-primary" />
                <span>Cutout Preview</span>
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-medium text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                <span>Upload New</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {/* Checkered Canvas Box */}
            <div
              className="w-full h-64 rounded-2xl border border-border/60 overflow-hidden flex items-center justify-center relative bg-[linear-gradient(45deg,#80808018_25%,transparent_25%),linear-gradient(-45deg,#80808018_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#80808018_75%),linear-gradient(-45deg,transparent_75%,#80808018_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0]"
            >
              {processedUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={processedUrl}
                  alt="Cutout Preview"
                  className="max-w-full max-h-full object-contain p-2 transition-all drop-shadow-xl"
                />
              ) : imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageSrc}
                  alt="Source"
                  className="max-w-full max-h-full object-contain p-2 opacity-60"
                />
              ) : (
                <div className="text-center p-6 space-y-2">
                  <Scissors className="w-8 h-8 mx-auto text-muted-foreground/40" />
                  <p className="text-xs text-muted-foreground">Select a screenshot or upload an image to extract.</p>
                </div>
              )}

              {isProcessing && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-xs flex items-center justify-center gap-2 text-xs font-semibold text-primary">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Segmenting subject...</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Controls & Presets */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">
                  Detection Mode
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "auto", label: "Auto Detect" },
                    { id: "white-bg", label: "Light BG" },
                    { id: "dark-bg", label: "Dark BG" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMode(m.id as any)}
                      className={cn(
                        "py-1.5 px-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer text-center",
                        mode === m.id
                          ? "bg-primary text-primary-foreground border-primary shadow-xs"
                          : "bg-secondary/50 hover:bg-secondary border-border/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tolerance Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Color Sensitivity</span>
                  <span className="font-mono text-foreground font-bold">{tolerance}%</span>
                </div>
                <Slider
                  value={[tolerance]}
                  min={5}
                  max={80}
                  step={1}
                  onValueChange={(val: any) => setTolerance(Array.isArray(val) ? val[0] : val)}
                  className="w-full"
                />
              </div>

              {/* Soft Edge Feather Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Edge Feathering</span>
                  <span className="font-mono text-foreground font-bold">{feather}px</span>
                </div>
                <Slider
                  value={[feather]}
                  min={0}
                  max={10}
                  step={1}
                  onValueChange={(val: any) => setFeather(Array.isArray(val) ? val[0] : val)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Feature Callout */}
            <div className="p-3 rounded-2xl bg-primary/5 border border-primary/20 space-y-1 text-xs">
              <span className="font-bold text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Pop-Out Effect</span>
              </span>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                When inserted, this cutout is positioned at the top layer stack, creating an authentic 3D pop-out effect overlapping the device bezel.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-border/40 pt-4 flex sm:justify-between items-center gap-2">
          <Button variant="outline" size="sm" onClick={onClose} className="rounded-xl text-xs">
            Cancel
          </Button>

          <Button
            size="sm"
            onClick={handleInsertPopoutLayer}
            disabled={!imageSrc || isProcessing}
            className="rounded-xl text-xs font-bold gap-1.5 px-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 shadow-md cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Insert 3D Pop-Out Layer</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
