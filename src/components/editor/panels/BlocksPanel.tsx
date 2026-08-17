"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Apple, Play, Sparkles, Star, Award, Users, ShieldCheck, Bell, Search } from "lucide-react";
import { toast } from "@/lib/store/toastStore";

interface BlockPreset {
  id: string;
  name: string;
  category?: string;
  preview: React.ReactNode;
  layer: Record<string, unknown>;
}

const SOCIAL_PROOF_PRESETS: BlockPreset[] = [
  {
    id: "rating-gold",
    name: "4.9★ Rating Pill",
    category: "Social Proof",
    preview: (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-white shadow-xs">
        <span className="text-amber-400 font-bold text-xs">★★★★★</span>
        <span className="text-[11px] font-semibold text-slate-100">4.9 (100k+)</span>
      </div>
    ),
    layer: {
      type: "shape",
      shape: "rating-badge",
      fill: "rgba(15,23,42,0.88)",
      stroke: "rgba(245,158,11,0.4)",
      strokeWidth: 2,
      cornerRadius: 100,
      width: 540,
      height: 110,
    },
  },
  {
    id: "award-pill",
    name: "#1 App of the Day",
    category: "Social Proof",
    preview: (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/90 border border-amber-400/40 text-amber-300 shadow-xs">
        <Award className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-[11px] font-bold">#1 App of the Day</span>
      </div>
    ),
    layer: {
      type: "shape",
      shape: "award-badge",
      fill: "#1e1b4b",
      stroke: "rgba(251,191,36,0.5)",
      strokeWidth: 2,
      cornerRadius: 100,
      width: 580,
      height: 110,
    },
  },
  {
    id: "users-pill",
    name: "1M+ Active Users",
    category: "Social Proof",
    preview: (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 shadow-xs">
        <Users className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-[11px] font-bold">1,000,000+ Users</span>
      </div>
    ),
    layer: {
      type: "shape",
      shape: "users-badge",
      fill: "rgba(6,78,59,0.7)",
      stroke: "rgba(16,185,129,0.5)",
      strokeWidth: 2,
      cornerRadius: 100,
      width: 560,
      height: 110,
    },
  },
  {
    id: "security-pill",
    name: "100% Private & Secure",
    category: "Social Proof",
    preview: (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 shadow-xs">
        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-[11px] font-bold">End-to-End Encrypted</span>
      </div>
    ),
    layer: {
      type: "shape",
      shape: "security-badge",
      fill: "rgba(30,58,138,0.7)",
      stroke: "rgba(59,130,246,0.5)",
      strokeWidth: 2,
      cornerRadius: 100,
      width: 620,
      height: 110,
    },
  },
];

const UI_WIDGET_PRESETS: BlockPreset[] = [
  {
    id: "notification-banner",
    name: "iOS Notification",
    preview: (
      <div className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-border/40 shadow-sm text-foreground">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold mb-0.5">
          <div className="flex items-center gap-1">
            <Bell className="w-2.5 h-2.5 text-primary" />
            <span>SnapFrame</span>
          </div>
          <span>now</span>
        </div>
        <div className="text-[10.5px] font-medium leading-tight truncate">
          Workout complete! +250 XP earned 🎉
        </div>
      </div>
    ),
    layer: {
      type: "shape",
      shape: "notification-badge",
      fill: "rgba(255,255,255,0.92)",
      stroke: "rgba(255,255,255,0.4)",
      strokeWidth: 1,
      cornerRadius: 28,
      width: 860,
      height: 200,
    },
  },
  {
    id: "search-widget",
    name: "iOS Spotlight Search",
    preview: (
      <div className="w-full flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 text-xs text-muted-foreground">
        <Search className="w-3.5 h-3.5 text-primary" />
        <span className="text-[11px]">Search songs, artists...</span>
      </div>
    ),
    layer: {
      type: "shape",
      shape: "search-badge",
      fill: "rgba(255,255,255,0.18)",
      stroke: "rgba(255,255,255,0.3)",
      strokeWidth: 2,
      cornerRadius: 100,
      width: 820,
      height: 110,
    },
  },
  {
    id: "glow-orb-purple",
    name: "Ambient Glow Orb",
    preview: (
      <div className="w-full h-16 rounded-2xl flex items-center justify-center">
        <div
          className="w-14 h-14 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.9) 0%, rgba(139,92,246,0) 70%)",
          }}
        />
      </div>
    ),
    layer: {
      type: "shape",
      shape: "glow-orb",
      fill: "#8B5CF6",
      stroke: "transparent",
      strokeWidth: 0,
      cornerRadius: 0,
      width: 650,
      height: 650,
    },
  },
  {
    id: "glow-orb-cyan",
    name: "Cyan Glow Backdrop",
    preview: (
      <div className="w-full h-16 rounded-2xl flex items-center justify-center">
        <div
          className="w-14 h-14 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.9) 0%, rgba(6,182,212,0) 70%)",
          }}
        />
      </div>
    ),
    layer: {
      type: "shape",
      shape: "glow-orb",
      fill: "#06B6D4",
      stroke: "transparent",
      strokeWidth: 0,
      cornerRadius: 0,
      width: 650,
      height: 650,
    },
  },
];

const CONTAINER_PRESETS: BlockPreset[] = [
  {
    id: "glass-card",
    name: "Frosted Glass Card",
    preview: (
      <div
        className="w-full h-14 rounded-xl flex items-center justify-center text-[10px] text-muted-foreground font-medium"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}
      >
        Glass Card
      </div>
    ),
    layer: {
      type: "shape",
      shape: "rectangle",
      fill: "rgba(255,255,255,0.10)",
      stroke: "rgba(255,255,255,0.22)",
      strokeWidth: 2,
      cornerRadius: 36,
      width: 960,
      height: 480,
    },
  },
  {
    id: "dark-card",
    name: "Dark OLED Card",
    preview: (
      <div
        className="w-full h-14 rounded-xl flex items-center justify-center text-[10px] text-slate-400 font-medium"
        style={{ background: "rgba(0,0,0,0.75)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        OLED Dark
      </div>
    ),
    layer: {
      type: "shape",
      shape: "rectangle",
      fill: "rgba(0,0,0,0.75)",
      stroke: "rgba(255,255,255,0.12)",
      strokeWidth: 2,
      cornerRadius: 36,
      width: 960,
      height: 480,
    },
  },
  {
    id: "pill-outline",
    name: "Outline Pill",
    preview: (
      <div
        className="h-8 px-4 rounded-full flex items-center justify-center text-[10px] text-muted-foreground font-semibold"
        style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.3)" }}
      >
        Feature Pill
      </div>
    ),
    layer: {
      type: "shape",
      shape: "rectangle",
      fill: "transparent",
      stroke: "rgba(255,255,255,0.35)",
      strokeWidth: 3,
      cornerRadius: 100,
      width: 440,
      height: 100,
    },
  },
  {
    id: "accent-bar",
    name: "Accent Line",
    preview: (
      <div className="w-16 h-2 rounded-full bg-indigo-500 shadow-xs" />
    ),
    layer: {
      type: "shape",
      shape: "rectangle",
      fill: "#6366F1",
      stroke: "transparent",
      strokeWidth: 0,
      cornerRadius: 12,
      width: 240,
      height: 24,
    },
  },
];

const SHAPE_PRESETS: BlockPreset[] = [
  {
    id: "star",
    name: "Star",
    preview: (
      <svg viewBox="0 0 48 48" className="w-8 h-8">
        <polygon
          points="24,4 29,18 44,18 32,27 36,42 24,33 12,42 16,27 4,18 19,18"
          fill="#FBBF24"
        />
      </svg>
    ),
    layer: { type: "shape", shape: "star", fill: "#FBBF24", stroke: "transparent", strokeWidth: 0, cornerRadius: 0, width: 220, height: 220 },
  },
  {
    id: "triangle",
    name: "Triangle",
    preview: (
      <svg viewBox="0 0 48 48" className="w-8 h-8">
        <polygon points="24,4 44,44 4,44" fill="#6366F1" />
      </svg>
    ),
    layer: { type: "shape", shape: "triangle", fill: "#6366F1", stroke: "transparent", strokeWidth: 0, cornerRadius: 0, width: 220, height: 220 },
  },
  {
    id: "hexagon",
    name: "Hexagon",
    preview: (
      <svg viewBox="0 0 48 48" className="w-8 h-8">
        <polygon
          points="24,4 40,14 40,34 24,44 8,34 8,14"
          fill="#14B8A6"
        />
      </svg>
    ),
    layer: { type: "shape", shape: "hexagon", fill: "#14B8A6", stroke: "transparent", strokeWidth: 0, cornerRadius: 0, width: 220, height: 220 },
  },
  {
    id: "diamond",
    name: "Diamond",
    preview: (
      <svg viewBox="0 0 48 48" className="w-8 h-8">
        <polygon points="24,4 44,24 24,44 4,24" fill="#EC4899" />
      </svg>
    ),
    layer: { type: "shape", shape: "diamond", fill: "#EC4899", stroke: "transparent", strokeWidth: 0, cornerRadius: 0, width: 200, height: 240 },
  },
  {
    id: "crescent",
    name: "Crescent",
    preview: (
      <svg viewBox="0 0 48 48" className="w-8 h-8">
        <path d="M 24 4 A 20 20 0 1 1 24 44 A 14 14 0 1 0 24 4 Z" fill="#F59E0B" />
      </svg>
    ),
    layer: { type: "shape", shape: "crescent", fill: "#F59E0B", stroke: "transparent", strokeWidth: 0, cornerRadius: 0, width: 220, height: 220 },
  },
  {
    id: "arrowRight",
    name: "Arrow Callout",
    preview: (
      <svg viewBox="0 0 48 20" className="w-12 h-5">
        <polygon points="0,6 29,6 29,0 48,10 29,20 29,14 0,14" fill="#6366F1" />
      </svg>
    ),
    layer: { type: "shape", shape: "arrowRight", fill: "#6366F1", stroke: "transparent", strokeWidth: 0, cornerRadius: 0, width: 320, height: 130 },
  },
];

const BADGE_PRESETS: BlockPreset[] = [
  {
    id: "appstore",
    name: "App Store Badge",
    preview: (
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-[10px] font-semibold bg-black border border-white/20"
        style={{ minWidth: 110 }}
      >
        <span className="text-base leading-none"><Apple className="w-4 h-4 fill-white" /></span>
        <div>
          <div className="text-[7.5px] opacity-75 font-normal">Download on the</div>
          <div className="text-xs font-bold leading-tight">App Store</div>
        </div>
      </div>
    ),
    layer: { type: "shape", shape: "appstore-badge", fill: "#000000", stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.5, cornerRadius: 24, width: 480, height: 140 },
  },
  {
    id: "googleplay",
    name: "Google Play Badge",
    preview: (
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-[10px] font-semibold bg-black border border-white/20"
        style={{ minWidth: 110 }}
      >
        <span className="text-base leading-none"><Play className="w-3.5 h-3.5 fill-white" /></span>
        <div>
          <div className="text-[7.5px] opacity-75 font-normal">GET IT ON</div>
          <div className="text-xs font-bold leading-tight">Google Play</div>
        </div>
      </div>
    ),
    layer: { type: "shape", shape: "googleplay-badge", fill: "#000000", stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.5, cornerRadius: 24, width: 480, height: 140 },
  },
];

export function BlocksPanel() {
  const { getActiveSet, getActiveScreen, addLayer } = useEditorStore();

  const handleAdd = (preset: BlockPreset) => {
    const set = getActiveSet();
    const screen = getActiveScreen();
    if (!set || !screen) {
      toast.error("Select a screen first on canvas");
      return;
    }

    const w = preset.layer.width as number;
    const h = preset.layer.height as number;

    addLayer(set.id, screen.id, {
      ...preset.layer,
      x: Math.round((screen.width - w) / 2),
      y: Math.round((screen.height - h) / 2),
      rotation: 0,
      opacity: 1,
    } as Parameters<typeof addLayer>[2]);

    useEditorStore.getState().recordHistory();
    toast.success(`Added ${preset.name} to canvas!`);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-3.5 space-y-4">
        {/* Social Proof & Ratings */}
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            Social Proof & Ratings
          </p>
          <div className="grid grid-cols-1 gap-2">
            {SOCIAL_PROOF_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleAdd(preset)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/40 hover:border-primary/40 transition-all group cursor-pointer"
              >
                <div className="shrink-0">{preset.preview}</div>
                <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground">
                  + Add
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* UI Widgets & Highlights */}
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            UI Widgets & Glows
          </p>
          <div className="grid grid-cols-2 gap-2">
            {UI_WIDGET_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleAdd(preset)}
                className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/40 hover:border-primary/40 transition-all group cursor-pointer items-center text-center"
              >
                <div className="w-full flex items-center justify-center min-h-[50px]">
                  {preset.preview}
                </div>
                <p className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground">
                  {preset.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Cards & Glass Containers */}
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Cards & Containers
          </p>
          <div className="grid grid-cols-2 gap-2">
            {CONTAINER_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleAdd(preset)}
                className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/40 hover:border-primary/40 transition-all group cursor-pointer items-center"
              >
                <div className="w-full flex items-center justify-center min-h-[48px]">
                  {preset.preview}
                </div>
                <p className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground">
                  {preset.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Store Badges */}
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            App Store & Play Store
          </p>
          <div className="grid grid-cols-1 gap-2">
            {BADGE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleAdd(preset)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/40 hover:border-primary/40 transition-all group cursor-pointer"
              >
                <div className="shrink-0">{preset.preview}</div>
                <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground">
                  + Add
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Shapes */}
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Geometric Shapes
          </p>
          <div className="grid grid-cols-3 gap-2">
            {SHAPE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleAdd(preset)}
                className="flex flex-col gap-1 p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/40 hover:border-primary/40 transition-all group cursor-pointer items-center"
              >
                <div className="flex items-center justify-center h-10">
                  {preset.preview}
                </div>
                <p className="text-[9.5px] font-medium text-muted-foreground group-hover:text-foreground">
                  {preset.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
