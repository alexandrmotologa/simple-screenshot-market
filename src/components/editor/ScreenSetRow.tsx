"use client";

import { useRef, useState } from "react";
import {
  Plus, ChevronDown, Smartphone, Square, Circle,
  Sun, Moon, Link2, Upload, EyeOff, Eye, CopyCheck,
} from "lucide-react";
import { useEditorStore } from "@/lib/store/editorStore";
import { ScreenSet, ScreenshotLayer } from "@/lib/types";
import { ScreenCard } from "@/components/editor/ScreenCard";
import { IOS_DEVICES, ANDROID_DEVICES, COLOR_HEX_MAP } from "@/lib/devices";
import { cn } from "@/lib/utils";
import { AdvancedBackgroundPicker } from "@/components/editor/AdvancedBackgroundPicker";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

interface ScreenSetRowProps {
  screenSet: ScreenSet;
}

export function ScreenSetRow({ screenSet }: ScreenSetRowProps) {
  const {
    activeSetId, setActiveSet, setActiveScreen, addScreen, zoom,
    updateDevice, updateMockup, screenSets, updateLayer, reorderScreens,
  } = useEditorStore();

  const isActive = activeSetId === screenSet.id;
  const BASE_CARD_WIDTH = 300;
  const cardW = Math.round(BASE_CARD_WIDTH * zoom);
  const cardH = Math.round(cardW * (screenSet.preset.height / screenSet.preset.width));

  const devices = screenSet.store === "ios" ? IOS_DEVICES : ANDROID_DEVICES;
  const currentDevice = devices.find((d) => d.id === screenSet.deviceId) ?? devices[0];

  // Current color — derive from mockup.color string, matching device.colors
  const currentColorName = screenSet.mockup?.color ?? "Black";
  // Colors available for the selected device
  const availableColors = currentDevice?.colors ?? ["Black", "White"];
  // Hex approximations for swatch rendering
  const getHex = (name: string) => COLOR_HEX_MAP[name.toLowerCase()] ?? "#888";

  const isFrameOn = screenSet.mockup?.showFrame !== false;
  const isShadowOn = screenSet.mockup?.showShadow !== false;
  const isSquircle = screenSet.mockup?.squircle === true;
  const isShowingScreenshots = screenSet.mockup?.showScreenshots !== false;

  const fileRef = useRef<HTMLInputElement>(null);

  const handleAddScreen = () => {
    setActiveSet(screenSet.id);
    addScreen(screenSet.id);
  };

  const toggleFrame      = () => { updateMockup(screenSet.id, { showFrame: !isFrameOn }); useEditorStore.getState().recordHistory(); }
  const toggleShadow     = () => { updateMockup(screenSet.id, { showShadow: !isShadowOn }); useEditorStore.getState().recordHistory(); }
  const toggleSquircle   = () => { updateMockup(screenSet.id, { squircle: !isSquircle }); useEditorStore.getState().recordHistory(); }
  const toggleScreenshots = () => { updateMockup(screenSet.id, { showScreenshots: !isShowingScreenshots }); useEditorStore.getState().recordHistory(); }

  // Border style logic
  // "Borderless" = !showFrame && !squircle
  // "Minimal" = squircle && !showFrame
  // "Flat Frame" = showFrame && frameType !== "3d"
  // "3D Realistic" = showFrame && frameType === "3d"
  const borderStyle = isFrameOn 
    ? (screenSet.mockup?.frameType === "3d" ? "3D Realistic" : "Flat Frame")
    : isSquircle ? "Minimal" : "Borderless";
    
  const setBorderStyle = (style: "Borderless" | "Minimal" | "Flat Frame" | "3D Realistic") => {
    if (style === "Borderless") updateMockup(screenSet.id, { showFrame: false, squircle: false });
    else if (style === "Minimal") updateMockup(screenSet.id, { showFrame: false, squircle: true });
    else if (style === "Flat Frame") updateMockup(screenSet.id, { showFrame: true, squircle: false, frameType: "2d" });
    else if (style === "3D Realistic") updateMockup(screenSet.id, { showFrame: true, squircle: false, frameType: "3d" });
    useEditorStore.getState().recordHistory();
  };

  const isNotchOn = screenSet.mockup?.notch !== false;
  const isIslandOn = screenSet.mockup?.dynamicIsland !== false;
  const isReflectionOn = screenSet.mockup?.reflection === true;

  const toggleNotch = () => { updateMockup(screenSet.id, { notch: !isNotchOn }); useEditorStore.getState().recordHistory(); }
  const toggleIsland = () => { updateMockup(screenSet.id, { dynamicIsland: !isIslandOn }); useEditorStore.getState().recordHistory(); }
  const toggleReflection = () => { updateMockup(screenSet.id, { reflection: !isReflectionOn }); useEditorStore.getState().recordHistory(); }

  // Sync mockup settings to ALL sets
  const syncAll = () => {
    const currentMockup = screenSet.mockup || {};
    const firstBg = screenSet.screens[0]?.background;

    for (const ss of screenSets) {
      if (ss.id === screenSet.id) continue;
      
      // Sync Mockup Settings (except device model which is platform specific)
      updateMockup(ss.id, {
        showFrame: currentMockup.showFrame,
        showShadow: currentMockup.showShadow,
        color: currentMockup.color,
        frameType: currentMockup.frameType,
        squircle: currentMockup.squircle,
        notch: currentMockup.notch,
        dynamicIsland: currentMockup.dynamicIsland,
        reflection: currentMockup.reflection,
      });

      // Sync Backgrounds
      if (firstBg) {
        ss.screens.forEach(s => updateScreen(ss.id, s.id, { background: firstBg }));
      }
    }
    useEditorStore.getState().recordHistory();
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const newScreens = Array.from(screenSet.screens);
    const [moved] = newScreens.splice(result.source.index, 1);
    newScreens.splice(result.destination.index, 0, moved);

    reorderScreens(screenSet.id, newScreens.map(s => s.id));
  };

  // Replace screenshot in ALL screens of this set
  const handleReplaceScreenshot = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      for (const screen of screenSet.screens) {
        const zone = screen.layers.find((l) => l.type === "screenshot") as ScreenshotLayer | undefined;
        if (zone) {
          updateLayer(screenSet.id, screen.id, zone.id, { src } as Partial<ScreenshotLayer>);
        }
      }
      useEditorStore.getState().recordHistory();
    };
    reader.readAsDataURL(file);
  };

  const storeLabel = screenSet.store === "ios" ? "App Store (iOS)" : "Google Play (Android)";
  const storeIcon = screenSet.store === "ios" ? "🍎" : "▶";
  const storeColor = screenSet.store === "ios"
    ? "bg-blue-500/12 text-blue-400 ring-1 ring-blue-500/30"
    : "bg-green-500/12 text-green-400 ring-1 ring-green-500/30";
  const storeColorInactive = "bg-secondary/70 text-muted-foreground hover:text-foreground";

  return (
    <div className="space-y-2.5">
      {/* ── Device Controls Row ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 flex-wrap">

        {/* Store badge */}
        <button
          type="button"
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all",
            isActive ? storeColor : storeColorInactive
          )}
          onClick={() => {
            setActiveSet(screenSet.id);
            if (screenSet.screens[0]) setActiveScreen(screenSet.screens[0].id);
          }}
        >
          <span className="text-sm leading-none">{storeIcon}</span>
          {storeLabel}
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-border/50 mx-0.5" />

        {/* Device model dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-card hover:bg-secondary text-[13px] text-foreground transition-colors outline-none max-w-[280px]">
            <Smartphone className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="truncate">{currentDevice?.name ?? "Select device"} &middot; {currentDevice?.width} × {currentDevice?.height}</span>
            <ChevronDown className="w-3.5 h-3.5 shrink-0 text-muted-foreground ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60 max-h-80 overflow-y-auto">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">
                {screenSet.store === "ios" ? "iPhone Models" : "Android Devices"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {devices.map((device) => (
                <DropdownMenuItem
                  key={device.id}
                  className={cn("text-xs gap-2 cursor-pointer", screenSet.deviceId === device.id && "text-primary bg-primary/5")}
                  onClick={() => {
                    updateDevice(screenSet.id, device.id);
                    // Also check if current color is valid for new device
                    if (screenSet.mockup?.color && !device.colors.includes(screenSet.mockup.color)) {
                      updateMockup(screenSet.id, { color: device.colors[0] });
                    }
                    useEditorStore.getState().recordHistory();
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{device.name}</p>
                    <p className="text-muted-foreground">{device.width} × {device.height}</p>
                  </div>
                  {screenSet.deviceId === device.id && <span className="text-primary shrink-0">✓</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Border Style dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-card hover:bg-secondary text-[13px] text-foreground transition-colors outline-none">
            <Smartphone className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span>{borderStyle}</span>
            <ChevronDown className="w-3.5 h-3.5 shrink-0 text-muted-foreground ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">Frame Style</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(["Borderless", "Minimal", "Flat Frame", "3D Realistic"] as const).map((style) => (
                <DropdownMenuItem
                  key={style}
                  className={cn("text-xs gap-2 cursor-pointer", borderStyle === style && "text-primary bg-primary/5")}
                  onClick={() => setBorderStyle(style)}
                >
                  {style}
                  {borderStyle === style && <span className="ml-auto text-primary">✓</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Color picker dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 bg-card hover:bg-secondary text-[13px] text-foreground transition-colors outline-none">
            <span
              className="w-4 h-4 rounded-full border border-border/60 shrink-0 shadow-inner"
              style={{ background: getHex(currentColorName) }}
            />
            <span className="max-w-16 truncate capitalize">{currentColorName}</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">Device Color</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {availableColors.map((colorName) => (
                <DropdownMenuItem
                  key={colorName}
                  className={cn("text-xs gap-2 cursor-pointer", currentColorName === colorName && "text-primary bg-primary/5")}
                  onClick={() => {
                    updateMockup(screenSet.id, { color: colorName });
                    useEditorStore.getState().recordHistory();
                  }}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-border/60 shrink-0"
                    style={{ background: getHex(colorName) }}
                  />
                  <span className="capitalize">{colorName}</span>
                  {currentColorName === colorName && <span className="ml-auto text-primary">✓</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Advanced Background Picker */}
        <AdvancedBackgroundPicker 
          currentBackground={screenSet.screens[0]?.background || { type: "solid", color: "#ffffff" }}
          onSelect={(bg) => {
            // Apply background to all screens in this set
            const state = useEditorStore.getState();
            screenSet.screens.forEach(s => {
              state.updateBackground(screenSet.id, s.id, bg);
            });
            state.recordHistory();
          }}
        />

        {/* Toggles Group */}
        <div className="flex items-center gap-4 ml-2">
          {screenSet.store === "ios" && (
            <>
              {/* Notch toggle */}
              {currentDevice?.notchType === "notch" && (
                <label className="flex items-center gap-2 cursor-pointer" title="Show Notch">
                  <div className="w-5 h-5 flex items-center justify-center text-muted-foreground">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="4" />
                      <path d="M8 2v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2" />
                    </svg>
                  </div>
                  <Switch checked={isNotchOn} onCheckedChange={toggleNotch} />
                </label>
              )}

              {/* Dynamic Island toggle */}
              {currentDevice?.notchType === "island" && (
                <label className="flex items-center gap-2 cursor-pointer" title="Show Dynamic Island">
                  <div className="w-5 h-5 flex items-center justify-center text-muted-foreground">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="4" />
                      <rect x="9" y="5" width="6" height="2.5" rx="1.25" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                  <Switch checked={isIslandOn} onCheckedChange={toggleIsland} />
                </label>
              )}
            </>
          )}

          {screenSet.store === "android" && (
            <label className="flex items-center gap-2 cursor-pointer" title="Show Camera Hole">
              <div className="w-5 h-5 flex items-center justify-center text-muted-foreground">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="4" />
                  <circle cx="12" cy="6" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <Switch checked={isNotchOn} onCheckedChange={toggleNotch} />
            </label>
          )}

          {/* Reflection toggle */}
          <label className="flex items-center gap-2 cursor-pointer" title="Show Screen Reflection">
            <div className="w-5 h-5 flex items-center justify-center text-muted-foreground">
              {/* Custom SVG for reflection */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="4" />
                <path d="M6 10l8-8" opacity="0.5" />
                <path d="M4 14l12-12" opacity="0.5" />
              </svg>
            </div>
            <Switch checked={isReflectionOn} onCheckedChange={toggleReflection} />
          </label>
        </div>

        {/* Show/Hide Screenshots toggle */}
        <button
          type="button"
          title={isShowingScreenshots ? "Hide screenshots (focus on text)" : "Show screenshots"}
          onClick={toggleScreenshots}
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all",
            !isShowingScreenshots
              ? "bg-orange-500/12 text-orange-400 ring-1 ring-orange-500/30"
              : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          {isShowingScreenshots ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          {isShowingScreenshots ? "Screenshots" : "Hidden"}
        </button>

        {/* Removed Replace screenshot per user request */}

        {/* Sync to all sets */}
        {screenSets.length > 1 && (
          <button
            type="button"
            title="Apply all style and background settings to other platforms"
            onClick={syncAll}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <CopyCheck className="w-3.5 h-3.5" />
            Apply to all
          </button>
        )}


      </div>

      {/* ── Cards Row ──────────────────────────────────────────────────────── */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={screenSet.id} direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4 items-start overflow-x-auto pb-2 pl-1 pt-1"
            >
              {screenSet.screens.map((screen, idx) => (
                <ScreenCard
                  key={screen.id}
                  screen={screen}
                  screenSet={screenSet}
                  index={idx}
                  hideScreenshots={!isShowingScreenshots}
                />
              ))}
              {provided.placeholder}

              {/* Add screen button */}
              {screenSet.screens.length < 8 && (
                <div className="shrink-0 flex flex-col gap-1.5">
                  {/* Spacer to match ScreenCard header height (h-5) */}
                  <div className="h-5 pointer-events-none" />
                  <button
                    id={`add-screen-${screenSet.id}`}
                    onClick={handleAddScreen}
                    type="button"
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/50 hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
                    style={{ width: cardW, height: cardH }}
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-xs font-medium">Add</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
