"use client";

import { useMemo } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { findModel } from "@/lib/deviceModels";
import { ALL_DEVICES } from "@/lib/devices";
import { AppleStoreIcon, GooglePlayIcon, APP_STORE_LABEL, GOOGLE_PLAY_LABEL } from "@/components/icons/StoreIcons";
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck, Smartphone, Info, ChevronDown } from "lucide-react";
import { Screen, ScreenshotLayer, ImageLayer, FrameType } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { FRAME_STYLES_LIST, FullBorderStyle } from "@/components/editor/ScreenSetRow";

export function PlatformsPanel() {
  const { screenSets, addScreenSet, removeScreenSet, updateMockup } = useEditorStore();

  const iosSet = screenSets.find((s) => s.store === "ios");
  const androidSet = screenSets.find((s) => s.store === "android");

  const hasIOS = !!iosSet;
  const hasAndroid = !!androidSet;

  const handleToggle = (platform: "ios" | "android", currentStatus: boolean) => {
    if (currentStatus) {
      if (screenSets.length <= 1) {
        alert("You must have at least one platform active.");
        return;
      }
      const setToRemove = screenSets.find((s) => s.store === platform);
      if (setToRemove) {
        removeScreenSet(setToRemove.id);
      }
    } else {
      addScreenSet(platform);
    }
  };

  // Helper to count screens with actual screenshot media uploaded
  const countScreensWithMedia = (screens: Screen[]) => {
    return screens.filter((screen) => {
      return screen.layers.some((l) => {
        if (l.type === "screenshot") {
          const sl = l as ScreenshotLayer;
          return typeof sl.src === "string" && sl.src.trim().length > 0;
        }
        if (l.type === "image") {
          const il = l as ImageLayer;
          return typeof il.src === "string" && il.src.trim().length > 0;
        }
        return false;
      });
    }).length;
  };

  // iOS App Store Validation Metrics
  const iosValidation = useMemo(() => {
    if (!iosSet) return null;
    const screens = iosSet.screens;
    const count = screens.length;
    const uploadedCount = countScreensWithMedia(screens);
    const w = iosSet.preset?.width ?? 1290;
    const h = iosSet.preset?.height ?? 2796;

    // Screen count: min 2, max 10
    const countValid = count >= 2 && count <= 10;
    const countStatus =
      count < 2
        ? "Min 2 required by Apple"
        : count > 10
        ? "Max 10 allowed by Apple"
        : `${count} / 10 screens (Valid)`;

    // Resolution check
    const is69 = w === 1320 && h === 2868;
    const is67 = w === 1290 && h === 2796;
    const is65 = w === 1242 && h === 2688;
    const is55 = w === 1242 && h === 2208;
    const isIPad = (w === 2048 && h === 2732) || (w === 1668 && h === 2388);
    const resValid = is69 || is67 || is65 || is55 || isIPad || (h / w >= 1.7 && h / w <= 2.2);

    const resLabel = is69
      ? '6.9" Display (1320 × 2868)'
      : is67
      ? '6.7" Display (1290 × 2796)'
      : `${w} × ${h} px`;

    // Upload status
    const allUploaded = uploadedCount === count && count > 0;
    const mediaStatus = allUploaded
      ? `All ${count} screenshots loaded`
      : `${uploadedCount} of ${count} screenshots loaded`;

    const isReady = countValid && resValid && allUploaded;

    return {
      count,
      uploadedCount,
      countValid,
      countStatus,
      resValid,
      resLabel,
      allUploaded,
      mediaStatus,
      isReady,
    };
  }, [iosSet]);

  // Google Play Validation Metrics
  const androidValidation = useMemo(() => {
    if (!androidSet) return null;
    const screens = androidSet.screens;
    const count = screens.length;
    const uploadedCount = countScreensWithMedia(screens);
    const w = androidSet.preset?.width ?? 1080;
    const h = androidSet.preset?.height ?? 2400;

    // Screen count: min 2, max 8 per device
    const countValid = count >= 2 && count <= 8;
    const countStatus =
      count < 2
        ? "Min 2 required by Google"
        : count > 8
        ? "Max 8 per device form"
        : `${count} / 8 screens (Valid)`;

    // Aspect ratio & resolution check: min 1080px & 9:16 portrait
    const minSideValid = Math.min(w, h) >= 1080 || Math.max(w, h) >= 1080;
    const ratio = h / w;
    const aspectValid = ratio >= 1.5 && ratio <= 2.3;
    const resValid = minSideValid && aspectValid;

    const resLabel = `${w} × ${h} px (9:16 Standard)`;

    // Upload status
    const allUploaded = uploadedCount === count && count > 0;
    const mediaStatus = allUploaded
      ? `All ${count} screenshots loaded`
      : `${uploadedCount} of ${count} screenshots loaded`;

    const isReady = countValid && resValid && allUploaded;

    return {
      count,
      uploadedCount,
      countValid,
      countStatus,
      resValid,
      resLabel,
      allUploaded,
      mediaStatus,
      isReady,
    };
  }, [androidSet]);

  const getFrameStyle = (set: typeof iosSet): FullBorderStyle => {
    if (!set) return "3D Realistic";
    const isFrameOn = set.mockup?.showFrame !== false;
    const isSquircle = set.mockup?.squircle === true;
    if (!isFrameOn) return isSquircle ? "Minimal" : "Borderless";
    const ft = set.mockup?.frameType;
    if (ft === "titanium") return "Titanium Precision";
    if (ft === "clay") return "Clay Matte";
    if (ft === "glass") return "Liquid Glass";
    if (ft === "neon") return "Neon Glow";
    if (ft === "wireframe") return "Minimal Wireframe";
    if (ft === "2d") return "Flat Frame";
    return "3D Realistic";
  };

  const handleFrameStyleChange = (setId: string, style: FullBorderStyle) => {
    if (style === "Borderless") updateMockup(setId, { showFrame: false, squircle: false });
    else if (style === "Minimal") updateMockup(setId, { showFrame: false, squircle: true });
    else if (style === "Flat Frame") updateMockup(setId, { showFrame: true, squircle: false, frameType: "2d" });
    else if (style === "3D Realistic") updateMockup(setId, { showFrame: true, squircle: false, frameType: "3d" });
    else if (style === "Titanium Precision") updateMockup(setId, { showFrame: true, squircle: false, frameType: "titanium" });
    else if (style === "Clay Matte") updateMockup(setId, { showFrame: true, squircle: false, frameType: "clay" });
    else if (style === "Liquid Glass") updateMockup(setId, { showFrame: true, squircle: false, frameType: "glass" });
    else if (style === "Neon Glow") updateMockup(setId, { showFrame: true, squircle: false, frameType: "neon" });
    else if (style === "Minimal Wireframe") updateMockup(setId, { showFrame: true, squircle: false, frameType: "wireframe" });
    useEditorStore.getState().recordHistory();
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-3.5 space-y-4">
          {/* Header Description */}
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Platforms & Store Readiness
              </h3>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Manage target platforms, frame styles, and verify App Store & Google Play pre-submission guidelines in real-time.
            </p>
          </div>

          {/* Platform 1: App Store (iOS) */}
          <div className="rounded-xl border border-border/60 bg-card/60 dark:bg-secondary/30 overflow-hidden transition-all shadow-xs">
            {/* Platform Toggle Header */}
            <div className="p-3 flex items-center justify-between bg-secondary/70 dark:bg-secondary/50 border-b border-border/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-foreground shadow-xs border border-border/50 shrink-0">
                  <AppleStoreIcon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">{APP_STORE_LABEL}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {iosSet?.mockup?.device
                      ? ALL_DEVICES.find((d) => d.id === iosSet.mockup!.device)?.name
                      : findModel(iosSet?.deviceId || "")?.name || "iPhone 17 Pro Max"}
                  </span>
                </div>
              </div>
              <Switch
                checked={hasIOS}
                onCheckedChange={() => handleToggle("ios", hasIOS)}
              />
            </div>

            {/* Validation Checklist if Active */}
            {hasIOS && iosValidation && (
              <div className="p-3 space-y-2.5 bg-card/90 dark:bg-card/40">
                {/* Status Indicator Pill */}
                <div
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10.5px] font-semibold border ${
                    iosValidation.isReady
                      ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                      : "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-400"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {iosValidation.isReady ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    )}
                    <span>{iosValidation.isReady ? "Ready for App Store Connect" : "Requires Attention"}</span>
                  </div>
                  <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-background/80 dark:bg-background/50 border border-current/20">
                    iOS
                  </span>
                </div>

                {/* Live Requirements Checklist */}
                <div className="space-y-1.5 pt-0.5">
                  {/* Screen Count */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      {iosValidation.countValid ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400 shrink-0" />
                      )}
                      Screen Count (2–10)
                    </span>
                    <span className={`font-medium ${iosValidation.countValid ? "text-foreground" : "text-rose-600 dark:text-rose-400 font-semibold"}`}>
                      {iosValidation.countStatus}
                    </span>
                  </div>

                  {/* Resolution */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      {iosValidation.resValid ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                      )}
                      Resolution & Ratio
                    </span>
                    <span className="text-foreground font-medium text-[10.5px]">
                      {iosValidation.resLabel}
                    </span>
                  </div>

                  {/* Screenshot Media Uploaded */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      {iosValidation.allUploaded ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      )}
                      App Screenshots
                    </span>
                    <span className={`font-medium ${iosValidation.allUploaded ? "text-foreground" : "text-amber-600 dark:text-amber-400 font-semibold"}`}>
                      {iosValidation.mediaStatus}
                    </span>
                  </div>

                  {/* Frame Style Control */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px]">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Smartphone className="w-3 h-3 text-muted-foreground shrink-0" />
                      Frame Style
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-0.5 rounded-lg border border-border/60 bg-secondary/60 hover:bg-secondary text-[11px] font-medium text-foreground transition-colors outline-none cursor-pointer">
                        <span className="max-w-28 truncate">{getFrameStyle(iosSet)}</span>
                        <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel className="text-xs">Frame Style</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {FRAME_STYLES_LIST.map((item) => (
                            <DropdownMenuItem
                              key={item.id}
                              className="text-xs cursor-pointer flex items-center justify-between py-1.5"
                              onClick={() => handleFrameStyleChange(iosSet.id, item.id)}
                            >
                              <div className="flex flex-col min-w-0">
                                <span className="font-medium truncate">{item.label}</span>
                                <span className="text-[9.5px] text-muted-foreground font-normal truncate">{item.desc}</span>
                              </div>
                              {getFrameStyle(iosSet) === item.id && <span className="text-primary font-bold ml-1">✓</span>}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Apple Guidelines Note */}
                  <div className="flex items-start gap-1.5 text-[10px] text-muted-foreground pt-1 bg-sky-500/5 dark:bg-sky-500/10 p-2 rounded-lg border border-sky-500/20">
                    <Info className="w-3 h-3 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                    <span>App Store requires 72 DPI RGB images without transparency.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Platform 2: Google Play (Android) */}
          <div className="rounded-xl border border-border/60 bg-card/60 dark:bg-secondary/30 overflow-hidden transition-all shadow-xs">
            {/* Platform Toggle Header */}
            <div className="p-3 flex items-center justify-between bg-secondary/70 dark:bg-secondary/50 border-b border-border/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-foreground shadow-xs border border-border/50 shrink-0">
                  <GooglePlayIcon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">{GOOGLE_PLAY_LABEL}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {androidSet?.mockup?.device
                      ? ALL_DEVICES.find((d) => d.id === androidSet.mockup!.device)?.name
                      : findModel(androidSet?.deviceId || "")?.name || "Google Pixel 9 Pro XL"}
                  </span>
                </div>
              </div>
              <Switch
                checked={hasAndroid}
                onCheckedChange={() => handleToggle("android", hasAndroid)}
              />
            </div>

            {/* Validation Checklist if Active */}
            {hasAndroid && androidValidation && (
              <div className="p-3 space-y-2.5 bg-card/90 dark:bg-card/40">
                {/* Status Indicator Pill */}
                <div
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10.5px] font-semibold border ${
                    androidValidation.isReady
                      ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                      : "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-400"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {androidValidation.isReady ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    )}
                    <span>{androidValidation.isReady ? "Ready for Google Play Console" : "Requires Attention"}</span>
                  </div>
                  <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-background/80 dark:bg-background/50 border border-current/20">
                    Android
                  </span>
                </div>

                {/* Live Requirements Checklist */}
                <div className="space-y-1.5 pt-0.5">
                  {/* Screen Count */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      {androidValidation.countValid ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400 shrink-0" />
                      )}
                      Screen Count (2–8)
                    </span>
                    <span className={`font-medium ${androidValidation.countValid ? "text-foreground" : "text-rose-600 dark:text-rose-400 font-semibold"}`}>
                      {androidValidation.countStatus}
                    </span>
                  </div>

                  {/* Resolution */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      {androidValidation.resValid ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      )}
                      Resolution & Ratio
                    </span>
                    <span className="text-foreground font-medium text-[10.5px]">
                      {androidValidation.resLabel}
                    </span>
                  </div>

                  {/* Screenshot Media Uploaded */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      {androidValidation.allUploaded ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      )}
                      App Screenshots
                    </span>
                    <span className={`font-medium ${androidValidation.allUploaded ? "text-foreground" : "text-amber-600 dark:text-amber-400 font-semibold"}`}>
                      {androidValidation.mediaStatus}
                    </span>
                  </div>

                  {/* Frame Style Control */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px]">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Smartphone className="w-3 h-3 text-muted-foreground shrink-0" />
                      Frame Style
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-0.5 rounded-lg border border-border/60 bg-secondary/60 hover:bg-secondary text-[11px] font-medium text-foreground transition-colors outline-none cursor-pointer">
                        <span className="max-w-28 truncate">{getFrameStyle(androidSet)}</span>
                        <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel className="text-xs">Frame Style</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {FRAME_STYLES_LIST.map((item) => (
                            <DropdownMenuItem
                              key={item.id}
                              className="text-xs cursor-pointer flex items-center justify-between py-1.5"
                              onClick={() => handleFrameStyleChange(androidSet.id, item.id)}
                            >
                              <div className="flex flex-col min-w-0">
                                <span className="font-medium truncate">{item.label}</span>
                                <span className="text-[9.5px] text-muted-foreground font-normal truncate">{item.desc}</span>
                              </div>
                              {getFrameStyle(androidSet) === item.id && <span className="text-primary font-bold ml-1">✓</span>}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Google Play Guidelines Note */}
                  <div className="flex items-start gap-1.5 text-[10px] text-muted-foreground pt-1 bg-sky-500/5 dark:bg-sky-500/10 p-2 rounded-lg border border-sky-500/20">
                    <Info className="w-3 h-3 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                    <span>Google Play recommends 16:9 or 9:16 aspect ratio with min. 1080px.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
