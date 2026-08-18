"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditorStore } from "@/lib/store/editorStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { AppleStoreIcon, GooglePlayIcon, APP_STORE_LABEL, GOOGLE_PLAY_LABEL } from "@/components/icons/StoreIcons";
import {
  Smartphone, Share2, Star, Download, Sparkles,
  ChevronLeft, ChevronRight, Moon, Sun, ArrowLeft, MoreVertical,
  CheckCircle2, ShieldCheck, Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScreenThumbnailCanvas } from "@/components/editor/ScreenThumbnailCanvas";

interface StorePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appName?: string;
}

export function StorePreviewModal({ open, onOpenChange, appName = "My Awesome App" }: StorePreviewModalProps) {
  const { screenSets, activeSetId } = useEditorStore();

  const [platform, setPlatform] = useState<"ios" | "android">("ios");
  const [storeTheme, setStoreTheme] = useState<"dark" | "light">("dark");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Derive active set matching selected platform
  const activeSet = screenSets.find((s) => s.store === platform) || screenSets[0];
  const screens = activeSet?.screens || [];

  // Sync initial platform from active set
  useEffect(() => {
    const current = screenSets.find((s) => s.id === activeSetId);
    if (current) {
      setPlatform(current.store);
    }
  }, [activeSetId, screenSets, open]);

  const appSubtitle = platform === "ios" ? "Productivity & Design Tools" : "Top Rated • Tools & Design";
  const developerName = "NextGen Studio LLC";

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[92vh] flex flex-col p-0 overflow-hidden border border-border/70 rounded-2xl bg-card shadow-2xl">
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-secondary/60 shrink-0">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" />
            <DialogTitle className="text-sm font-bold text-foreground">
              Live Store Listing Simulator
            </DialogTitle>
          </div>

          <div className="flex items-center gap-2">
            {/* Platform Toggle */}
            <div className="flex items-center p-0.5 rounded-xl bg-background border border-border/50 shadow-xs">
              <button
                type="button"
                onClick={() => setPlatform("ios")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  platform === "ios"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <AppleStoreIcon className="w-3.5 h-3.5" />
                <span>App Store</span>
              </button>
              <button
                type="button"
                onClick={() => setPlatform("android")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  platform === "android"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <GooglePlayIcon className="w-3.5 h-3.5" />
                <span>Google Play</span>
              </button>
            </div>

            {/* Store Theme Toggle */}
            <button
              type="button"
              onClick={() => setStoreTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="w-8 h-8 rounded-xl border border-border/50 bg-background hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title={`Switch to ${storeTheme === "dark" ? "Light" : "Dark"} Store Mode`}
            >
              {storeTheme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Store Frame Container */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 flex justify-center bg-muted/20">
          <div
            className={cn(
              "w-full max-w-2xl rounded-3xl border overflow-hidden shadow-2xl transition-colors duration-200 flex flex-col",
              storeTheme === "dark"
                ? "bg-[#000000] text-white border-zinc-800"
                : "bg-[#ffffff] text-zinc-900 border-zinc-200"
            )}
          >
            {/* iOS App Store Layout */}
            {platform === "ios" ? (
              <div className="flex flex-col p-4 sm:p-6 space-y-5">
                {/* Store Top Bar */}
                <div className="flex items-center justify-between text-sky-500 text-xs font-medium pb-2">
                  <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Search</span>
                  </div>
                  <div className="flex items-center gap-3 text-sky-500">
                    <Share2 className="w-4 h-4 cursor-pointer hover:opacity-80" />
                  </div>
                </div>

                {/* App Header Info */}
                <div className="flex gap-4 items-start">
                  {/* App Icon */}
                  <div className="w-24 h-24 rounded-[22px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md p-0.5 shrink-0 flex items-center justify-center text-white font-black text-2xl tracking-tighter">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>

                  {/* App Metadata */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h2 className="text-xl font-bold tracking-tight truncate leading-tight">
                      {appName}
                    </h2>
                    <p className={cn("text-xs font-medium truncate", storeTheme === "dark" ? "text-zinc-400" : "text-zinc-500")}>
                      {appSubtitle}
                    </p>
                    <p className="text-[11px] text-sky-500 font-medium">{developerName}</p>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        className="px-6 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all uppercase tracking-wide cursor-pointer shadow-sm"
                      >
                        GET
                      </button>
                      <span className={cn("text-[9px]", storeTheme === "dark" ? "text-zinc-500" : "text-zinc-400")}>
                        In-App Purchases
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Rating & Stats Badges */}
                <div className={cn("grid grid-cols-3 py-2.5 px-3 rounded-xl border text-center", storeTheme === "dark" ? "bg-zinc-900/60 border-zinc-800" : "bg-zinc-100/70 border-zinc-200")}>
                  <div className="flex flex-col items-center justify-center border-r border-border/40">
                    <span className={cn("text-[9.5px] font-semibold uppercase", storeTheme === "dark" ? "text-zinc-400" : "text-zinc-500")}>
                      128K RATINGS
                    </span>
                    <span className="text-sm font-bold flex items-center gap-1 mt-0.5">
                      4.9 <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center border-r border-border/40">
                    <span className={cn("text-[9.5px] font-semibold uppercase", storeTheme === "dark" ? "text-zinc-400" : "text-zinc-500")}>
                      AGE
                    </span>
                    <span className="text-sm font-bold mt-0.5">4+</span>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <span className={cn("text-[9.5px] font-semibold uppercase", storeTheme === "dark" ? "text-zinc-400" : "text-zinc-500")}>
                      CHART
                    </span>
                    <span className="text-sm font-bold flex items-center gap-0.5 mt-0.5 text-sky-500">
                      #1 Top
                    </span>
                  </div>
                </div>

                {/* Screenshot Carousel Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold tracking-tight">Screenshots</h3>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => scrollBy(-260)}
                        className="w-7 h-7 rounded-full border border-border/40 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollBy(260)}
                        className="w-7 h-7 rounded-full border border-border/40 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scrollable Carousel */}
                  <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-thin"
                  >
                    {screens.map((screen) => (
                      <div
                        key={screen.id}
                        className="snap-start shrink-0 rounded-2xl overflow-hidden border border-zinc-800 shadow-md transition-transform hover:scale-[1.01]"
                        style={{ width: "200px", aspectRatio: "9/19.5" }}
                      >
                        <ScreenThumbnailCanvas
                          screen={screen}
                          screenSet={activeSet}
                          width={200}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* What's New Section */}
                <div className={cn("p-3.5 rounded-2xl border space-y-1.5", storeTheme === "dark" ? "bg-zinc-900/40 border-zinc-800" : "bg-zinc-50 border-zinc-200")}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">What&apos;s New</span>
                    <span className="text-[10px] text-sky-500 font-medium">Version 2.4.0</span>
                  </div>
                  <p className={cn("text-[11px] leading-relaxed", storeTheme === "dark" ? "text-zinc-400" : "text-zinc-600")}>
                    • Added ultra-wide panoramic continuous carousel support.<br />
                    • Enhanced high-resolution export for iPhone 17 Pro Max.<br />
                    • Performance and smoothness improvements.
                  </p>
                </div>
              </div>
            ) : (
              /* Google Play Store Layout */
              <div className="flex flex-col p-4 sm:p-6 space-y-5">
                {/* Play Store Top Bar */}
                <div className="flex items-center justify-between text-xs font-medium pb-2">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-bold text-sm">Google Play</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Share2 className="w-4 h-4 cursor-pointer hover:opacity-80" />
                    <MoreVertical className="w-4 h-4 cursor-pointer hover:opacity-80" />
                  </div>
                </div>

                {/* App Header Info */}
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-md shrink-0 flex items-center justify-center text-white">
                    <Sparkles className="w-9 h-9" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h2 className="text-xl font-bold tracking-tight truncate leading-tight">
                      {appName}
                    </h2>
                    <p className="text-xs font-medium text-emerald-500 truncate">
                      {developerName}
                    </p>
                    <p className={cn("text-[10px]", storeTheme === "dark" ? "text-zinc-400" : "text-zinc-500")}>
                      Contains ads • In-app purchases
                    </p>
                  </div>
                </div>

                {/* Google Play Metrics Bar */}
                <div className="flex items-center justify-between px-2 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold flex items-center gap-1">
                      4.9 <Star className="w-2.5 h-2.5 fill-current text-emerald-500" />
                    </span>
                    <span className={cn("text-[9px]", storeTheme === "dark" ? "text-zinc-400" : "text-zinc-500")}>
                      120K reviews
                    </span>
                  </div>
                  <div className="h-6 w-px bg-border/40" />
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold">1M+</span>
                    <span className={cn("text-[9px]", storeTheme === "dark" ? "text-zinc-400" : "text-zinc-500")}>
                      Downloads
                    </span>
                  </div>
                  <div className="h-6 w-px bg-border/40" />
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold border border-current px-1 py-0.2 rounded text-[9px]">3+</span>
                    <span className={cn("text-[9px]", storeTheme === "dark" ? "text-zinc-400" : "text-zinc-500")}>
                      Rated for 3+
                    </span>
                  </div>
                </div>

                {/* Google Play Install Button */}
                <button
                  type="button"
                  className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all uppercase tracking-wide cursor-pointer shadow-md"
                >
                  Install
                </button>

                {/* Screenshots Carousel */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">Phone</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => scrollBy(-260)}
                        className="w-7 h-7 rounded-full border border-border/40 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollBy(260)}
                        className="w-7 h-7 rounded-full border border-border/40 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scrollable Carousel */}
                  <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-thin"
                  >
                    {screens.map((screen) => (
                      <div
                        key={screen.id}
                        className="snap-start shrink-0 rounded-2xl overflow-hidden border border-zinc-800 shadow-md transition-transform hover:scale-[1.01]"
                        style={{ width: "200px", aspectRatio: "9/19.5" }}
                      >
                        <ScreenThumbnailCanvas
                          screen={screen}
                          screenSet={activeSet}
                          width={200}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* About this app */}
                <div className="space-y-1">
                  <span className="text-xs font-bold">About this app</span>
                  <p className={cn("text-[11px] leading-relaxed", storeTheme === "dark" ? "text-zinc-400" : "text-zinc-600")}>
                    Create stunning screenshots, mockups, and store listing visuals in seconds with native 3D device frames and panoramic flow.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
