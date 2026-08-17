"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Apple, Play, Sparkles, Star, Award, Users, ShieldCheck, Bell, Search, Layers } from "lucide-react";
import { toast } from "@/lib/store/toastStore";
import { Layer } from "@/lib/types";

interface BlockPreset {
  id: string;
  name: string;
  category?: string;
  preview: React.ReactNode;
  getLayers: (screenW: number, screenH: number) => Array<Omit<Layer, "id">>;
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
    getLayers: (sw, sh) => {
      const w = 620, h = 110;
      const x = Math.round((sw - w) / 2);
      const y = Math.round((sh - h) / 2);
      return [
        {
          type: "shape",
          shape: "rounded-rectangle",
          fill: "rgba(15,23,42,0.92)",
          stroke: "rgba(245,158,11,0.5)",
          strokeWidth: 3,
          cornerRadius: 100,
          x, y, width: w, height: h,
          rotation: 0, opacity: 1,
        } as any,
        {
          type: "text",
          content: "★★★★★  4.9 (100k+ Reviews)",
          fontSize: 40,
          fontWeight: 700,
          fontFamily: "Inter",
          color: "#FBBF24",
          align: "center",
          x, y: y + 28, width: w, height: 60,
          rotation: 0, opacity: 1,
        } as any,
      ];
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
    getLayers: (sw, sh) => {
      const w = 580, h = 110;
      const x = Math.round((sw - w) / 2);
      const y = Math.round((sh - h) / 2);
      return [
        {
          type: "shape",
          shape: "rounded-rectangle",
          fill: "#1e1b4b",
          stroke: "rgba(251,191,36,0.6)",
          strokeWidth: 3,
          cornerRadius: 100,
          x, y, width: w, height: h,
          rotation: 0, opacity: 1,
        } as any,
        {
          type: "text",
          content: "🏆 #1 App of the Day",
          fontSize: 42,
          fontWeight: 700,
          fontFamily: "Inter",
          color: "#FBBF24",
          align: "center",
          x, y: y + 26, width: w, height: 60,
          rotation: 0, opacity: 1,
        } as any,
      ];
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
    getLayers: (sw, sh) => {
      const w = 620, h = 110;
      const x = Math.round((sw - w) / 2);
      const y = Math.round((sh - h) / 2);
      return [
        {
          type: "shape",
          shape: "rounded-rectangle",
          fill: "rgba(6,78,59,0.85)",
          stroke: "rgba(16,185,129,0.6)",
          strokeWidth: 3,
          cornerRadius: 100,
          x, y, width: w, height: h,
          rotation: 0, opacity: 1,
        } as any,
        {
          type: "text",
          content: "👥 1,000,000+ Active Users",
          fontSize: 40,
          fontWeight: 700,
          fontFamily: "Inter",
          color: "#34D399",
          align: "center",
          x, y: y + 28, width: w, height: 60,
          rotation: 0, opacity: 1,
        } as any,
      ];
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
    getLayers: (sw, sh) => {
      const w = 640, h = 110;
      const x = Math.round((sw - w) / 2);
      const y = Math.round((sh - h) / 2);
      return [
        {
          type: "shape",
          shape: "rounded-rectangle",
          fill: "rgba(30,58,138,0.85)",
          stroke: "rgba(59,130,246,0.6)",
          strokeWidth: 3,
          cornerRadius: 100,
          x, y, width: w, height: h,
          rotation: 0, opacity: 1,
        } as any,
        {
          type: "text",
          content: "🔒 End-to-End Encrypted",
          fontSize: 40,
          fontWeight: 700,
          fontFamily: "Inter",
          color: "#60A5FA",
          align: "center",
          x, y: y + 28, width: w, height: 60,
          rotation: 0, opacity: 1,
        } as any,
      ];
    },
  },
];

const UI_WIDGET_PRESETS: BlockPreset[] = [
  {
    id: "notification-banner",
    name: "iOS Notification Banner",
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
    getLayers: (sw, sh) => {
      const w = 920, h = 210;
      const x = Math.round((sw - w) / 2);
      const y = Math.round((sh - h) / 2);
      return [
        {
          type: "shape",
          shape: "rounded-rectangle",
          fill: "rgba(255,255,255,0.95)",
          stroke: "rgba(255,255,255,0.4)",
          strokeWidth: 2,
          cornerRadius: 32,
          x, y, width: w, height: h,
          rotation: 0, opacity: 1,
        } as any,
        {
          type: "text",
          content: "⚡ SnapFrame · now",
          fontSize: 34,
          fontWeight: 700,
          fontFamily: "Inter",
          color: "#475569",
          align: "left",
          x: x + 40, y: y + 30, width: w - 80, height: 45,
          rotation: 0, opacity: 1,
        } as any,
        {
          type: "text",
          content: "Workout completed! +250 XP earned 🎉",
          fontSize: 44,
          fontWeight: 600,
          fontFamily: "Inter",
          color: "#0f172a",
          align: "left",
          x: x + 40, y: y + 95, width: w - 80, height: 70,
          rotation: 0, opacity: 1,
        } as any,
      ];
    },
  },
  {
    id: "search-widget",
    name: "iOS Spotlight Search Bar",
    preview: (
      <div className="w-full flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 text-xs text-muted-foreground">
        <Search className="w-3.5 h-3.5 text-primary" />
        <span className="text-[11px]">Search songs, artists...</span>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = 840, h = 120;
      const x = Math.round((sw - w) / 2);
      const y = Math.round((sh - h) / 2);
      return [
        {
          type: "shape",
          shape: "rounded-rectangle",
          fill: "rgba(255,255,255,0.18)",
          stroke: "rgba(255,255,255,0.35)",
          strokeWidth: 2,
          cornerRadius: 100,
          x, y, width: w, height: h,
          rotation: 0, opacity: 1,
        } as any,
        {
          type: "text",
          content: "🔍  Search songs, artists, albums...",
          fontSize: 42,
          fontWeight: 500,
          fontFamily: "Inter",
          color: "#FFFFFF",
          align: "center",
          x, y: y + 30, width: w, height: 60,
          rotation: 0, opacity: 0.9,
        } as any,
      ];
    },
  },
  {
    id: "glow-orb-purple",
    name: "Ambient Purple Glow Orb",
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
    getLayers: (sw, sh) => {
      const w = 750, h = 750;
      const x = Math.round((sw - w) / 2);
      const y = Math.round((sh - h) / 2);
      return [
        {
          type: "shape",
          shape: "glow-orb",
          fill: "#8B5CF6",
          stroke: "transparent",
          strokeWidth: 0,
          cornerRadius: 0,
          x, y, width: w, height: h,
          rotation: 0, opacity: 0.6,
        } as any,
      ];
    },
  },
  {
    id: "glow-orb-cyan",
    name: "Ambient Cyan Glow Orb",
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
    getLayers: (sw, sh) => {
      const w = 750, h = 750;
      const x = Math.round((sw - w) / 2);
      const y = Math.round((sh - h) / 2);
      return [
        {
          type: "shape",
          shape: "glow-orb",
          fill: "#06B6D4",
          stroke: "transparent",
          strokeWidth: 0,
          cornerRadius: 0,
          x, y, width: w, height: h,
          rotation: 0, opacity: 0.6,
        } as any,
      ];
    },
  },
];

const CONTAINER_PRESETS: BlockPreset[] = [
  {
    id: "glass-card",
    name: "Frosted Glass Feature Card",
    preview: (
      <div
        className="w-full h-16 rounded-xl flex flex-col justify-center px-3 gap-0.5"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)" }}
      >
        <div className="text-[10px] font-bold text-white leading-tight">Ultra Fast & Intuitive</div>
        <div className="text-[8.5px] text-white/60 leading-tight truncate">Everything you need right here.</div>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = 960, h = 420;
      const x = Math.round((sw - w) / 2);
      const y = Math.round((sh - h) / 2);
      return [
        {
          type: "shape",
          shape: "rounded-rectangle",
          fill: "rgba(255,255,255,0.12)",
          stroke: "rgba(255,255,255,0.25)",
          strokeWidth: 2,
          cornerRadius: 36,
          x, y, width: w, height: h,
          rotation: 0, opacity: 1,
        } as any,
        {
          type: "text",
          content: "Ultra Fast & Intuitive",
          fontSize: 60,
          fontWeight: 700,
          fontFamily: "Inter",
          color: "#FFFFFF",
          align: "center",
          x, y: y + 60, width: w, height: 80,
          rotation: 0, opacity: 1,
        } as any,
        {
          type: "text",
          content: "Everything you need right at your fingertips with zero complexity.",
          fontSize: 38,
          fontWeight: 500,
          fontFamily: "Inter",
          color: "rgba(255,255,255,0.75)",
          align: "center",
          x: x + 40, y: y + 170, width: w - 80, height: 120,
          rotation: 0, opacity: 1,
        } as any,
      ];
    },
  },
  {
    id: "dark-card",
    name: "Dark OLED Feature Card",
    preview: (
      <div
        className="w-full h-16 rounded-xl flex flex-col justify-center px-3 gap-0.5 bg-black/80 border border-white/10"
      >
        <div className="text-[10px] font-bold text-white leading-tight">Pro Performance</div>
        <div className="text-[8.5px] text-white/60 leading-tight truncate">Engineered for speed & power.</div>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = 960, h = 420;
      const x = Math.round((sw - w) / 2);
      const y = Math.round((sh - h) / 2);
      return [
        {
          type: "shape",
          shape: "rounded-rectangle",
          fill: "rgba(0,0,0,0.82)",
          stroke: "rgba(255,255,255,0.15)",
          strokeWidth: 2,
          cornerRadius: 36,
          x, y, width: w, height: h,
          rotation: 0, opacity: 1,
        } as any,
        {
          type: "text",
          content: "Pro Performance",
          fontSize: 60,
          fontWeight: 700,
          fontFamily: "Inter",
          color: "#FFFFFF",
          align: "center",
          x, y: y + 60, width: w, height: 80,
          rotation: 0, opacity: 1,
        } as any,
        {
          type: "text",
          content: "Engineered for power users who demand lightning speed and precision.",
          fontSize: 38,
          fontWeight: 500,
          fontFamily: "Inter",
          color: "rgba(255,255,255,0.70)",
          align: "center",
          x: x + 40, y: y + 170, width: w - 80, height: 120,
          rotation: 0, opacity: 1,
        } as any,
      ];
    },
  },
  {
    id: "pill-pro",
    name: "PRO Feature Tag",
    preview: (
      <div
        className="h-8 px-4 rounded-full flex items-center justify-center text-[10.5px] text-white font-bold bg-indigo-600 shadow-xs"
      >
        ⚡ PRO FEATURE
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = 400, h = 90;
      const x = Math.round((sw - w) / 2);
      const y = Math.round((sh - h) / 2);
      return [
        {
          type: "shape",
          shape: "rounded-rectangle",
          fill: "#6366F1",
          stroke: "rgba(255,255,255,0.3)",
          strokeWidth: 2,
          cornerRadius: 100,
          x, y, width: w, height: h,
          rotation: 0, opacity: 1,
        } as any,
        {
          type: "text",
          content: "⚡ PRO FEATURE",
          fontSize: 38,
          fontWeight: 700,
          fontFamily: "Inter",
          color: "#FFFFFF",
          align: "center",
          x, y: y + 20, width: w, height: 50,
          rotation: 0, opacity: 1,
        } as any,
      ];
    },
  },
  {
    id: "pill-new",
    name: "NEW Feature Tag",
    preview: (
      <div
        className="h-8 px-4 rounded-full flex items-center justify-center text-[10.5px] text-white font-bold bg-emerald-600 shadow-xs"
      >
        ✨ NEW
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = 280, h = 90;
      const x = Math.round((sw - w) / 2);
      const y = Math.round((sh - h) / 2);
      return [
        {
          type: "shape",
          shape: "rounded-rectangle",
          fill: "#10B981",
          stroke: "rgba(255,255,255,0.3)",
          strokeWidth: 2,
          cornerRadius: 100,
          x, y, width: w, height: h,
          rotation: 0, opacity: 1,
        } as any,
        {
          type: "text",
          content: "✨ NEW",
          fontSize: 38,
          fontWeight: 700,
          fontFamily: "Inter",
          color: "#FFFFFF",
          align: "center",
          x, y: y + 20, width: w, height: 50,
          rotation: 0, opacity: 1,
        } as any,
      ];
    },
  },
  {
    id: "accent-bar",
    name: "Accent Line",
    preview: (
      <div className="w-16 h-2 rounded-full bg-indigo-500 shadow-xs" />
    ),
    getLayers: (sw, sh) => {
      const w = 260, h = 24;
      const x = Math.round((sw - w) / 2);
      const y = Math.round((sh - h) / 2);
      return [
        {
          type: "shape",
          shape: "rectangle",
          fill: "#6366F1",
          stroke: "transparent",
          strokeWidth: 0,
          cornerRadius: 12,
          x, y, width: w, height: h,
          rotation: 0, opacity: 1,
        } as any,
      ];
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
    getLayers: (sw, sh) => [{
      type: "shape", shape: "star", fill: "#FBBF24", stroke: "transparent", strokeWidth: 0, cornerRadius: 0,
      width: 220, height: 220, x: Math.round((sw - 220) / 2), y: Math.round((sh - 220) / 2), rotation: 0, opacity: 1,
    } as any],
  },
  {
    id: "triangle",
    name: "Triangle",
    preview: (
      <svg viewBox="0 0 48 48" className="w-8 h-8">
        <polygon points="24,4 44,44 4,44" fill="#6366F1" />
      </svg>
    ),
    getLayers: (sw, sh) => [{
      type: "shape", shape: "triangle", fill: "#6366F1", stroke: "transparent", strokeWidth: 0, cornerRadius: 0,
      width: 220, height: 220, x: Math.round((sw - 220) / 2), y: Math.round((sh - 220) / 2), rotation: 0, opacity: 1,
    } as any],
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
    getLayers: (sw, sh) => [{
      type: "shape", shape: "hexagon", fill: "#14B8A6", stroke: "transparent", strokeWidth: 0, cornerRadius: 0,
      width: 220, height: 220, x: Math.round((sw - 220) / 2), y: Math.round((sh - 220) / 2), rotation: 0, opacity: 1,
    } as any],
  },
  {
    id: "diamond",
    name: "Diamond",
    preview: (
      <svg viewBox="0 0 48 48" className="w-8 h-8">
        <polygon points="24,4 44,24 24,44 4,24" fill="#EC4899" />
      </svg>
    ),
    getLayers: (sw, sh) => [{
      type: "shape", shape: "diamond", fill: "#EC4899", stroke: "transparent", strokeWidth: 0, cornerRadius: 0,
      width: 200, height: 240, x: Math.round((sw - 200) / 2), y: Math.round((sh - 240) / 2), rotation: 0, opacity: 1,
    } as any],
  },
  {
    id: "crescent",
    name: "Crescent",
    preview: (
      <svg viewBox="0 0 48 48" className="w-8 h-8">
        <path d="M 24 4 A 20 20 0 1 1 24 44 A 14 14 0 1 0 24 4 Z" fill="#F59E0B" />
      </svg>
    ),
    getLayers: (sw, sh) => [{
      type: "shape", shape: "crescent", fill: "#F59E0B", stroke: "transparent", strokeWidth: 0, cornerRadius: 0,
      width: 220, height: 220, x: Math.round((sw - 220) / 2), y: Math.round((sh - 220) / 2), rotation: 0, opacity: 1,
    } as any],
  },
  {
    id: "arrowRight",
    name: "Arrow Callout",
    preview: (
      <svg viewBox="0 0 48 20" className="w-12 h-5">
        <polygon points="0,6 29,6 29,0 48,10 29,20 29,14 0,14" fill="#6366F1" />
      </svg>
    ),
    getLayers: (sw, sh) => [{
      type: "shape", shape: "arrowRight", fill: "#6366F1", stroke: "transparent", strokeWidth: 0, cornerRadius: 0,
      width: 320, height: 130, x: Math.round((sw - 320) / 2), y: Math.round((sh - 130) / 2), rotation: 0, opacity: 1,
    } as any],
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
    getLayers: (sw, sh) => [{
      type: "shape", shape: "appstore-badge", fill: "#000000", stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.5, cornerRadius: 24,
      width: 480, height: 140, x: Math.round((sw - 480) / 2), y: Math.round((sh - 140) / 2), rotation: 0, opacity: 1,
    } as any],
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
    getLayers: (sw, sh) => [{
      type: "shape", shape: "googleplay-badge", fill: "#000000", stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.5, cornerRadius: 24,
      width: 480, height: 140, x: Math.round((sw - 480) / 2), y: Math.round((sh - 140) / 2), rotation: 0, opacity: 1,
    } as any],
  },
];

export function BlocksPanel() {
  const { getActiveSet, getActiveScreen, addLayers } = useEditorStore();

  const handleAdd = (preset: BlockPreset) => {
    const set = getActiveSet();
    const screen = getActiveScreen();
    if (!set || !screen) {
      toast.error("Select a screen first on canvas");
      return;
    }

    const layersToAdd = preset.getLayers(screen.width, screen.height);
    addLayers(set.id, screen.id, layersToAdd);
    toast.success(`Added ${preset.name} with editable text to canvas!`);
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
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-muted-foreground" />
            Cards & Containers (With Editable Text)
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
