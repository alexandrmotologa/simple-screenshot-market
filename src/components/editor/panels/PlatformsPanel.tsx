"use client";

import { useState, useMemo } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { ALL_DEVICES, isTabletDevice, IOS_DEVICES, ANDROID_DEVICES } from "@/lib/devices";
import { AppleStoreIcon, GooglePlayIcon, APP_STORE_LABEL, GOOGLE_PLAY_LABEL } from "@/components/icons/StoreIcons";
import {
  CheckCircle2, AlertTriangle, XCircle, ShieldCheck,
  Smartphone, Tablet, Info, ChevronDown, Eye, Trash2, Plus
} from "lucide-react";
import { Screen, ScreenshotLayer, ImageLayer, ScreenSet } from "@/lib/types";
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
import { StorePreviewModal } from "@/components/editor/StorePreviewModal";
import { toast } from "@/lib/store/toastStore";
import { cn } from "@/lib/utils";

export function PlatformsPanel() {
  const {
    screenSets,
    addScreenSet,
    addTabletSet,
    removeScreenSet,
    updateMockup,
    updateDevice,
    setActiveSet,
    setActiveScreen,
  } = useEditorStore();

  const [showSimulator, setShowSimulator] = useState(false);

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

  const getSetValidation = (ss: ScreenSet) => {
    const isIOS = ss.store === "ios";
    const isTablet = isTabletDevice(ss.deviceId);
    const screens = ss.screens;
    const count = screens.length;
    const uploadedCount = countScreensWithMedia(screens);
    const w = ss.preset?.width ?? (isIOS ? 1290 : 1080);
    const h = ss.preset?.height ?? (isIOS ? 2796 : 2400);

    const maxScreens = isIOS ? 10 : 8;
    const countValid = count >= 2 && count <= maxScreens;
    const countStatus =
      count < 2
        ? `Min 2 required by ${isIOS ? "Apple" : "Google"}`
        : count > maxScreens
        ? `Max ${maxScreens} allowed`
        : `${count} / ${maxScreens} screens (Valid)`;

    let resValid = false;
    let resLabel = `${w} × ${h} px`;

    if (isIOS) {
      if (isTablet) {
        resValid = (w === 2048 && h === 2732) || (w === 1668 && h === 2388) || (w === 1640 && h === 2360) || (w === 1488 && h === 2266);
        resLabel = `${w} × ${h} px (iPad Retina)`;
      } else {
        const is69 = w === 1320 && h === 2868;
        const is67 = w === 1290 && h === 2796;
        const is65 = w === 1242 && h === 2688;
        const is55 = w === 1242 && h === 2208;
        resValid = is69 || is67 || is65 || is55 || (h / w >= 1.7 && h / w <= 2.2);
        resLabel = is69 ? '6.9" Display (1320 × 2868)' : is67 ? '6.7" Display (1290 × 2796)' : `${w} × ${h} px`;
      }
    } else {
      const minSideValid = Math.min(w, h) >= 1080 || Math.max(w, h) >= 1080;
      const ratio = h / w;
      resValid = minSideValid && (isTablet ? ratio >= 1.35 && ratio <= 1.85 : ratio >= 1.5 && ratio <= 2.3);
      resLabel = isTablet ? `${w} × ${h} px (Tablet 16:10 / 4:3)` : `${w} × ${h} px (9:16 Standard)`;
    }

    const allUploaded = uploadedCount === count && count > 0;
    const mediaStatus = allUploaded
      ? `All ${count} screenshots loaded`
      : `${uploadedCount} of ${count} screenshots loaded`;

    const isReady = countValid && resValid && allUploaded;

    return {
      isIOS,
      isTablet,
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
  };

  const getFrameStyle = (ss: ScreenSet): FullBorderStyle => {
    const isFrameOn = ss.mockup?.showFrame !== false;
    const isSquircle = ss.mockup?.squircle === true;
    if (!isFrameOn) return isSquircle ? "Minimal" : "Borderless";
    const ft = ss.mockup?.frameType;
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
          {/* Header Description & Simulator button */}
          <div className="space-y-2.5">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Platforms & Store Readiness
                </h3>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Manage target devices (Phones & Tablets), frame styles, and verify App Store & Google Play pre-submission guidelines in real-time.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSimulator(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-bold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview in Live Store Simulator</span>
            </button>
          </div>

          {/* ── DYNAMIC LIST OF ACTIVE SCREEN SETS ── */}
          <div className="space-y-3">
            {screenSets.map((ss, setIdx) => {
              const validation = getSetValidation(ss);
              const isIOS = ss.store === "ios";
              const isTablet = isTabletDevice(ss.deviceId);
              const deviceObj = ALL_DEVICES.find((d) => d.id === ss.deviceId);
              const availableDevices = isIOS ? IOS_DEVICES : ANDROID_DEVICES;

              const setPlatformName = isIOS
                ? isTablet ? "App Store (iPad)" : "App Store (iPhone)"
                : isTablet ? "Google Play (Tablet)" : "Google Play (Phone)";

              return (
                <div
                  key={ss.id}
                  className="rounded-xl border border-border/60 bg-card/60 dark:bg-secondary/30 overflow-hidden transition-all shadow-xs"
                >
                  {/* Platform Card Header */}
                  <div className="p-3 flex items-center justify-between bg-secondary/70 dark:bg-secondary/50 border-b border-border/40">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-foreground shadow-xs border border-border/50 shrink-0">
                        {isIOS ? (
                          <AppleStoreIcon className="w-4 h-4" />
                        ) : (
                          <GooglePlayIcon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-foreground truncate">
                            {setPlatformName}
                          </span>
                          {isTablet && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 shrink-0">
                              Tablet
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground truncate">
                          {deviceObj?.name || ss.preset?.name}
                        </span>
                      </div>
                    </div>

                    {/* Set actions: Delete / Select */}
                    <div className="flex items-center gap-1 shrink-0">
                      {screenSets.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            removeScreenSet(ss.id);
                            toast.info(`Removed ${setPlatformName}`);
                          }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                          title={`Delete ${setPlatformName} set`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Validation Checklist */}
                  <div className="p-3 space-y-2.5 bg-card/90 dark:bg-card/40">
                    {/* Status Indicator Pill */}
                    <div
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10.5px] font-semibold border ${
                        validation.isReady
                          ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                          : "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-400"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {validation.isReady ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        )}
                        <span>
                          {validation.isReady
                            ? isIOS ? "Ready for App Store Connect" : "Ready for Play Console"
                            : "Requires Attention"}
                        </span>
                      </div>
                      <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-background/80 dark:bg-background/50 border border-current/20">
                        {isIOS ? (isTablet ? "iPadOS" : "iOS") : "Android"}
                      </span>
                    </div>

                    {/* Live Requirements Checklist */}
                    <div className="space-y-1.5 pt-0.5">
                      {/* Screen Count */}
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          {validation.countValid ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400 shrink-0" />
                          )}
                          Screen Count (2–{isIOS ? 10 : 8})
                        </span>
                        <span
                          className={`font-medium ${
                            validation.countValid
                              ? "text-foreground"
                              : "text-rose-600 dark:text-rose-400 font-semibold"
                          }`}
                        >
                          {validation.countStatus}
                        </span>
                      </div>

                      {/* Resolution */}
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          {validation.resValid ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          ) : (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          )}
                          Resolution & Ratio
                        </span>
                        <span className="text-foreground font-medium text-[10.5px]">
                          {validation.resLabel}
                        </span>
                      </div>

                      {/* Screenshot Media Uploaded */}
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          {validation.allUploaded ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          ) : (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          )}
                          Screenshots Uploaded
                        </span>
                        <span
                          className={`font-medium ${
                            validation.allUploaded
                              ? "text-foreground"
                              : "text-amber-600 dark:text-amber-400 font-semibold"
                          }`}
                        >
                          {validation.mediaStatus}
                        </span>
                      </div>

                      {/* Device Selector */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px]">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          {isTablet ? <Tablet className="w-3 h-3 text-muted-foreground shrink-0" /> : <Smartphone className="w-3 h-3 text-muted-foreground shrink-0" />}
                          Device Model
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-0.5 rounded-lg border border-border/60 bg-secondary/60 hover:bg-secondary text-[11px] font-medium text-foreground transition-colors outline-none cursor-pointer max-w-44">
                            <span className="truncate">{deviceObj?.name || "Select device"}</span>
                            <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-64 max-h-72 overflow-y-auto">
                            <DropdownMenuGroup>
                              <DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                {isIOS ? "iPhone Models" : "Android Phones"}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {availableDevices.filter((d) => !isTabletDevice(d)).map((d) => (
                                <DropdownMenuItem
                                  key={d.id}
                                  className={cn("text-xs cursor-pointer", ss.deviceId === d.id && "text-primary font-bold bg-primary/5")}
                                  onClick={() => {
                                    updateDevice(ss.id, d.id);
                                    if (ss.mockup?.color && !d.colors.includes(ss.mockup.color)) {
                                      updateMockup(ss.id, { color: d.colors[0] });
                                    }
                                    useEditorStore.getState().recordHistory();
                                  }}
                                >
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{d.name}</p>
                                    <p className="text-[10px] text-muted-foreground font-mono">{d.width} × {d.height}</p>
                                  </div>
                                  {ss.deviceId === d.id && <span className="text-primary ml-1">✓</span>}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator className="my-1.5" />
                            <DropdownMenuGroup>
                              <DropdownMenuLabel className="text-[10px] text-indigo-400 uppercase font-bold tracking-wider">
                                {isIOS ? "iPad Tablets" : "Android Tablets"}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {availableDevices.filter((d) => isTabletDevice(d)).map((d) => (
                                <DropdownMenuItem
                                  key={d.id}
                                  className={cn("text-xs cursor-pointer", ss.deviceId === d.id && "text-primary font-bold bg-primary/5")}
                                  onClick={() => {
                                    updateDevice(ss.id, d.id);
                                    if (ss.mockup?.color && !d.colors.includes(ss.mockup.color)) {
                                      updateMockup(ss.id, { color: d.colors[0] });
                                    }
                                    useEditorStore.getState().recordHistory();
                                  }}
                                >
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{d.name}</p>
                                    <p className="text-[10px] text-muted-foreground font-mono">{d.width} × {d.height}</p>
                                  </div>
                                  {ss.deviceId === d.id && <span className="text-primary ml-1">✓</span>}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Frame Style Control */}
                      <div className="flex items-center justify-between pt-1.5 text-[11px]">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Smartphone className="w-3 h-3 text-muted-foreground shrink-0" />
                          Frame Style
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-0.5 rounded-lg border border-border/60 bg-secondary/60 hover:bg-secondary text-[11px] font-medium text-foreground transition-colors outline-none cursor-pointer">
                            <span className="max-w-28 truncate">{getFrameStyle(ss)}</span>
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
                                  onClick={() => handleFrameStyleChange(ss.id, item.id)}
                                >
                                  <div className="flex flex-col min-w-0">
                                    <span className="font-medium truncate">{item.label}</span>
                                    <span className="text-[9.5px] text-muted-foreground font-normal truncate">{item.desc}</span>
                                  </div>
                                  {getFrameStyle(ss) === item.id && <span className="text-primary font-bold ml-1">✓</span>}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Clean Status Bar Toggle */}
                      <div className="flex items-center justify-between pt-1.5 text-[11px]">
                        <span className="text-muted-foreground flex items-center gap-1.5" title="9:41 AM, 100% Battery & full signal overlay">
                          <span>🧼</span>
                          Clean Status Bar
                        </span>
                        <div className="flex items-center gap-2">
                          {ss.mockup?.cleanStatusBar && (
                            <button
                              type="button"
                              onClick={() => {
                                const currentTheme = ss.mockup?.statusBarTheme || "dark";
                                updateMockup(ss.id, { statusBarTheme: currentTheme === "dark" ? "light" : "dark" });
                                useEditorStore.getState().recordHistory();
                              }}
                              className="text-[9.5px] px-1.5 py-0.5 rounded bg-secondary/80 hover:bg-secondary font-mono border border-border/50 text-foreground cursor-pointer"
                              title="Toggle status bar icon color (light/dark)"
                            >
                              {ss.mockup?.statusBarTheme === "light" ? "☀️ Light" : "🌙 Dark"}
                            </button>
                          )}
                          <Switch
                            checked={ss.mockup?.cleanStatusBar ?? false}
                            onCheckedChange={(checked) => {
                              updateMockup(ss.id, { cleanStatusBar: checked });
                              useEditorStore.getState().recordHistory();
                              toast.info(checked ? "Clean Status Bar enabled (9:41 AM · 100%)" : "Clean Status Bar disabled");
                            }}
                          />
                        </div>
                      </div>

                      {/* Store Guidelines Note */}
                      <div className="flex items-start gap-1.5 text-[10px] text-muted-foreground pt-1 bg-sky-500/5 dark:bg-sky-500/10 p-2 rounded-lg border border-sky-500/20">
                        <Info className="w-3 h-3 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                        <span>
                          {isIOS
                            ? isTablet
                              ? "App Store requires dedicated iPad (12.9\" / 13\") screenshots for universal iOS apps."
                              : "App Store requires 72 DPI RGB images without transparency."
                            : isTablet
                            ? "Google Play requires 7\" & 10\" tablet screenshots for Featured tab eligibility."
                            : "Google Play recommends 16:9 or 9:16 aspect ratio with min. 1080px."}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── ADD MORE SETS SECTION ── */}
          <div className="space-y-2.5 pt-2 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <span className="text-primary font-bold">+</span> Add Additional Device Set
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">4 platforms</span>
            </div>

            <div className="flex flex-col gap-2">
              {/* Add iPad Pro */}
              <button
                type="button"
                onClick={() => {
                  addTabletSet("ios");
                  toast.success("iPad Pro 13\" set added with proportional scaling!");
                }}
                className="flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-secondary/30 hover:bg-secondary/70 hover:border-indigo-500/40 transition-all cursor-pointer group text-left shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-indigo-500/20">
                    <AppleStoreIcon className="w-4 h-4 text-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      + Add iPad Pro Set
                    </p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      2048 × 2732 px · 4:3 Tablet
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-md bg-secondary/80 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0 ml-2">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Add Android Tablet */}
              <button
                type="button"
                onClick={() => {
                  addTabletSet("android");
                  toast.success("Android Tablet set added with proportional scaling!");
                }}
                className="flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-secondary/30 hover:bg-secondary/70 hover:border-emerald-500/40 transition-all cursor-pointer group text-left shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-emerald-500/20">
                    <GooglePlayIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground group-hover:text-emerald-400 transition-colors truncate">
                      + Add Android Tab Set
                    </p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      1848 × 2960 px · 16:10 Tablet
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-md bg-secondary/80 flex items-center justify-center text-muted-foreground group-hover:bg-emerald-500 group-hover:text-white transition-all shrink-0 ml-2">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Add iPhone Set */}
              <button
                type="button"
                onClick={() => {
                  addScreenSet("ios");
                  toast.success("iPhone 17 Pro Max set added with proportional scaling!");
                }}
                className="flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-secondary/30 hover:bg-secondary/70 hover:border-blue-500/40 transition-all cursor-pointer group text-left shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-blue-500/20">
                    <AppleStoreIcon className="w-4 h-4 text-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground group-hover:text-blue-400 transition-colors truncate">
                      + Add iPhone Set
                    </p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      1320 × 2868 px · 19.5:9 Phone
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-md bg-secondary/80 flex items-center justify-center text-muted-foreground group-hover:bg-blue-500 group-hover:text-white transition-all shrink-0 ml-2">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Add Android Phone */}
              <button
                type="button"
                onClick={() => {
                  addScreenSet("android");
                  toast.success("Pixel 10 Pro XL set added with proportional scaling!");
                }}
                className="flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-secondary/30 hover:bg-secondary/70 hover:border-teal-500/40 transition-all cursor-pointer group text-left shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-teal-500/20">
                    <GooglePlayIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground group-hover:text-teal-400 transition-colors truncate">
                      + Add Android Phone Set
                    </p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      1344 × 2992 px · 20:9 Phone
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-md bg-secondary/80 flex items-center justify-center text-muted-foreground group-hover:bg-teal-500 group-hover:text-white transition-all shrink-0 ml-2">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </ScrollArea>

      {showSimulator && (
        <StorePreviewModal open={showSimulator} onOpenChange={setShowSimulator} />
      )}
    </div>
  );
}
