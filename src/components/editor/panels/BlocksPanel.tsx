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
      const w = Math.round(sw * 0.78);
      const h = Math.round(sw * 0.16);
      return [{
        type: "shape",
        shape: "rating-badge",
        text: "4.9 (100k+)",
        subtext: "★★★★★",
        fill: "rgba(15,23,42,0.92)",
        stroke: "rgba(245,158,11,0.5)",
        strokeWidth: 4,
        cornerRadius: Math.round(h / 2),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
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
      const w = Math.round(sw * 0.76);
      const h = Math.round(sw * 0.16);
      return [{
        type: "shape",
        shape: "award-badge",
        text: "#1 App of the Day",
        subtext: "🏆",
        fill: "#1e1b4b",
        stroke: "rgba(251,191,36,0.6)",
        strokeWidth: 4,
        cornerRadius: Math.round(h / 2),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
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
      const w = Math.round(sw * 0.78);
      const h = Math.round(sw * 0.16);
      return [{
        type: "shape",
        shape: "users-badge",
        text: "1,000,000+ Users",
        subtext: "👥",
        fill: "rgba(6,78,59,0.85)",
        stroke: "rgba(16,185,129,0.6)",
        strokeWidth: 4,
        cornerRadius: Math.round(h / 2),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
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
      const w = Math.round(sw * 0.80);
      const h = Math.round(sw * 0.16);
      return [{
        type: "shape",
        shape: "security-badge",
        text: "100% Private & Secure",
        subtext: "🔒",
        fill: "rgba(30,58,138,0.85)",
        stroke: "rgba(59,130,246,0.6)",
        strokeWidth: 4,
        cornerRadius: Math.round(h / 2),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
];

const UI_WIDGET_PRESETS: BlockPreset[] = [
  {
    id: "notification-banner",
    name: "iOS Notification Banner",
    preview: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/60 text-white shadow-xs">
        <div className="w-5 h-5 rounded-md bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
          <Bell className="w-3 h-3 text-blue-400" />
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1 text-[9px] text-slate-400 font-medium">
            <span className="font-semibold text-slate-200">SnapFrame</span>
            <span>·</span>
            <span>now</span>
          </div>
          <span className="text-[10.5px] font-medium text-slate-100">
            Workout complete! +250 XP 🎉
          </span>
        </div>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.88);
      const h = Math.round(sw * 0.20);
      return [{
        type: "shape",
        shape: "notification-badge",
        text: "Workout complete! +250 XP earned 🎉",
        subtext: "SnapFrame · now",
        fill: "rgba(255,255,255,0.96)",
        stroke: "rgba(255,255,255,0.4)",
        strokeWidth: 3,
        cornerRadius: Math.round(sw * 0.035),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "search-widget",
    name: "iOS Spotlight Search Bar",
    preview: (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-slate-300 shadow-xs">
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[11px] font-medium text-slate-200">Search songs, artists...</span>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.86);
      const h = Math.round(sw * 0.13);
      return [{
        type: "shape",
        shape: "search-badge",
        text: "Search songs, artists, albums...",
        subtext: "🔍",
        fill: "rgba(255,255,255,0.18)",
        stroke: "rgba(255,255,255,0.35)",
        strokeWidth: 3,
        cornerRadius: Math.round(h / 2),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "glow-orb-purple",
    name: "Ambient Purple Glow Orb",
    preview: (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 shadow-xs">
        <div className="w-3.5 h-3.5 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7]" />
        <span className="text-[11px] font-bold">Ambient Purple Glow</span>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.95);
      const h = Math.round(sw * 0.95);
      return [{
        type: "shape",
        shape: "glow-orb",
        fill: "#8B5CF6",
        stroke: "transparent",
        strokeWidth: 0,
        cornerRadius: 0,
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 0.6,
      } as any];
    },
  },
  {
    id: "glow-orb-cyan",
    name: "Ambient Cyan Glow Orb",
    preview: (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-xs">
        <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
        <span className="text-[11px] font-bold">Ambient Cyan Glow</span>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.95);
      const h = Math.round(sw * 0.95);
      return [{
        type: "shape",
        shape: "glow-orb",
        fill: "#06B6D4",
        stroke: "transparent",
        strokeWidth: 0,
        cornerRadius: 0,
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 0.6,
      } as any];
    },
  },
];

const CONTAINER_PRESETS: BlockPreset[] = [
  {
    id: "glass-card",
    name: "Frosted Glass Feature Card",
    preview: (
      <div
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl backdrop-blur-md"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div className="w-5 h-5 rounded-md bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
          <Sparkles className="w-3 h-3 text-cyan-300" />
        </div>
        <div className="flex flex-col text-left">
          <div className="text-[11px] font-bold text-white leading-tight">Ultra Fast & Intuitive</div>
          <div className="text-[9px] text-slate-300/80 leading-tight">Frosted Glass Card</div>
        </div>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.88);
      const h = Math.round(sw * 0.38);
      return [{
        type: "shape",
        shape: "glass-card",
        text: "Ultra Fast & Intuitive",
        subtext: "Designed for speed, simplicity, and ease of use.",
        fill: "rgba(255,255,255,0.14)",
        stroke: "rgba(255,255,255,0.25)",
        strokeWidth: 3,
        cornerRadius: Math.round(sw * 0.04),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "dark-card",
    name: "Dark OLED Feature Card",
    preview: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white shadow-xs">
        <div className="w-5 h-5 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
          <Layers className="w-3 h-3 text-emerald-400" />
        </div>
        <div className="flex flex-col text-left">
          <div className="text-[11px] font-bold text-white leading-tight">Pro Performance</div>
          <div className="text-[9px] text-slate-400 leading-tight">Dark OLED Card</div>
        </div>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.88);
      const h = Math.round(sw * 0.38);
      return [{
        type: "shape",
        shape: "dark-card",
        text: "Pro Performance",
        subtext: "Engineered for power users who demand lightning speed.",
        fill: "rgba(10,14,23,0.90)",
        stroke: "rgba(255,255,255,0.15)",
        strokeWidth: 3,
        cornerRadius: Math.round(sw * 0.04),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "pill-pro",
    name: "PRO Feature Tag",
    preview: (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 border border-indigo-400/50 text-white shadow-xs">
        <span className="text-xs">⚡</span>
        <span className="text-[11px] font-bold">PRO FEATURE</span>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.52);
      const h = Math.round(sw * 0.14);
      return [{
        type: "shape",
        shape: "pro-tag",
        text: "⚡ PRO FEATURE",
        fill: "#6366F1",
        stroke: "rgba(255,255,255,0.3)",
        strokeWidth: 3,
        cornerRadius: Math.round(h / 2),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "pill-new",
    name: "NEW Feature Tag",
    preview: (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 border border-emerald-400/50 text-white shadow-xs">
        <span className="text-xs">✨</span>
        <span className="text-[11px] font-bold">NEW FEATURE</span>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.42);
      const h = Math.round(sw * 0.14);
      return [{
        type: "shape",
        shape: "new-tag",
        text: "✨ NEW",
        fill: "#10B981",
        stroke: "rgba(255,255,255,0.3)",
        strokeWidth: 3,
        cornerRadius: Math.round(h / 2),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "accent-bar",
    name: "Accent Line",
    preview: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-xs">
        <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        <span className="text-[11px] font-medium text-slate-300">Accent Line</span>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.40);
      const h = Math.round(sw * 0.035);
      return [{
        type: "shape",
        shape: "rectangle",
        fill: "#6366F1",
        stroke: "transparent",
        strokeWidth: 0,
        cornerRadius: Math.round(h / 2),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
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
    getLayers: (sw, sh) => {
      const size = Math.round(sw * 0.38);
      return [{
        type: "shape", shape: "star", fill: "#FBBF24", stroke: "transparent", strokeWidth: 0, cornerRadius: 0,
        width: size, height: size, x: Math.round((sw - size) / 2), y: Math.round((sh - size) / 2), rotation: 0, opacity: 1,
      } as any];
    },
  },
  {
    id: "triangle",
    name: "Triangle",
    preview: (
      <svg viewBox="0 0 48 48" className="w-8 h-8">
        <polygon points="24,4 44,44 4,44" fill="#6366F1" />
      </svg>
    ),
    getLayers: (sw, sh) => {
      const size = Math.round(sw * 0.38);
      return [{
        type: "shape", shape: "triangle", fill: "#6366F1", stroke: "transparent", strokeWidth: 0, cornerRadius: 0,
        width: size, height: size, x: Math.round((sw - size) / 2), y: Math.round((sh - size) / 2), rotation: 0, opacity: 1,
      } as any];
    },
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
    getLayers: (sw, sh) => {
      const size = Math.round(sw * 0.38);
      return [{
        type: "shape", shape: "hexagon", fill: "#14B8A6", stroke: "transparent", strokeWidth: 0, cornerRadius: 0,
        width: size, height: size, x: Math.round((sw - size) / 2), y: Math.round((sh - size) / 2), rotation: 0, opacity: 1,
      } as any];
    },
  },
  {
    id: "diamond",
    name: "Diamond",
    preview: (
      <svg viewBox="0 0 48 48" className="w-8 h-8">
        <polygon points="24,4 44,24 24,44 4,24" fill="#EC4899" />
      </svg>
    ),
    getLayers: (sw, sh) => {
      const sizeW = Math.round(sw * 0.34);
      const sizeH = Math.round(sw * 0.40);
      return [{
        type: "shape", shape: "diamond", fill: "#EC4899", stroke: "transparent", strokeWidth: 0, cornerRadius: 0,
        width: sizeW, height: sizeH, x: Math.round((sw - sizeW) / 2), y: Math.round((sh - sizeH) / 2), rotation: 0, opacity: 1,
      } as any];
    },
  },
  {
    id: "crescent",
    name: "Crescent",
    preview: (
      <svg viewBox="0 0 48 48" className="w-8 h-8">
        <path d="M 24 4 A 20 20 0 1 1 24 44 A 14 14 0 1 0 24 4 Z" fill="#F59E0B" />
      </svg>
    ),
    getLayers: (sw, sh) => {
      const size = Math.round(sw * 0.38);
      return [{
        type: "shape", shape: "crescent", fill: "#F59E0B", stroke: "transparent", strokeWidth: 0, cornerRadius: 0,
        width: size, height: size, x: Math.round((sw - size) / 2), y: Math.round((sh - size) / 2), rotation: 0, opacity: 1,
      } as any];
    },
  },
  {
    id: "arrowRight",
    name: "Arrow Callout",
    preview: (
      <svg viewBox="0 0 48 20" className="w-12 h-5">
        <polygon points="0,6 29,6 29,0 48,10 29,20 29,14 0,14" fill="#6366F1" />
      </svg>
    ),
    getLayers: (sw, sh) => {
      const sizeW = Math.round(sw * 0.55);
      const sizeH = Math.round(sw * 0.24);
      return [{
        type: "shape", shape: "arrowRight", fill: "#6366F1", stroke: "transparent", strokeWidth: 0, cornerRadius: 0,
        width: sizeW, height: sizeH, x: Math.round((sw - sizeW) / 2), y: Math.round((sh - sizeH) / 2), rotation: 0, opacity: 1,
      } as any];
    },
  },
];

const OFFER_PRESETS: BlockPreset[] = [
  {
    id: "sale-50",
    name: "50% OFF Launch Sale",
    category: "Offers & CTAs",
    preview: (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600/90 text-white border border-rose-400/40 shadow-xs">
        <span className="text-xs">🏷️</span>
        <span className="text-[11px] font-bold">50% OFF · Early Bird</span>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.78);
      const h = Math.round(sw * 0.16);
      return [{
        type: "shape",
        shape: "sale-badge",
        text: "🏷️ 50% OFF · Early Bird Special",
        fill: "#E11D48",
        stroke: "rgba(255,255,255,0.4)",
        strokeWidth: 4,
        cornerRadius: Math.round(h / 2),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "trial-cta",
    name: "Free Trial CTA",
    category: "Offers & CTAs",
    preview: (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white border border-indigo-400/40 shadow-xs">
        <span className="text-xs">🚀</span>
        <span className="text-[11px] font-bold">Try Free for 7 Days</span>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.80);
      const h = Math.round(sw * 0.16);
      return [{
        type: "shape",
        shape: "trial-badge",
        text: "🚀 Try Free for 7 Days · No Card",
        fill: "#6366F1",
        stroke: "rgba(255,255,255,0.4)",
        strokeWidth: 4,
        cornerRadius: Math.round(h / 2),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "features-checklist",
    name: "Feature Checklist Pill",
    category: "Offers & CTAs",
    preview: (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 shadow-xs">
        <span className="text-[10px] font-semibold">✓ Ad-Free · ✓ Offline · ✓ 4K</span>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.90);
      const h = Math.round(sw * 0.16);
      return [{
        type: "shape",
        shape: "checklist-badge",
        text: "✓ Ad-Free  ·  ✓ Offline Mode  ·  ✓ 4K Export",
        fill: "rgba(15,23,42,0.92)",
        stroke: "rgba(255,255,255,0.25)",
        strokeWidth: 3,
        cornerRadius: Math.round(h / 2),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
];

const PRESS_PRESETS: BlockPreset[] = [
  {
    id: "press-quote",
    name: "TechCrunch Press Quote",
    preview: (
      <div className="w-full p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-white">
        <div className="text-[9.5px] font-medium italic text-slate-200">"The fastest screenshot editor on mobile."</div>
        <div className="text-[9px] font-bold text-emerald-400 mt-1">— TechCrunch</div>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.92);
      const h = Math.round(sw * 0.30);
      return [{
        type: "shape",
        shape: "press-badge",
        text: '"The cleanest and fastest screenshot generator on mobile."',
        subtext: "— TechCrunch",
        fill: "rgba(15,23,42,0.92)",
        stroke: "rgba(16,185,129,0.5)",
        strokeWidth: 4,
        cornerRadius: Math.round(sw * 0.035),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "user-review-card",
    name: "5-Star User Testimonial",
    preview: (
      <div className="w-full p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-white">
        <div className="text-amber-400 text-xs font-bold mb-0.5">★★★★★</div>
        <div className="text-[9.5px] font-medium text-slate-200">"Boosted our App Store conversion by +40%!"</div>
        <div className="text-[8.5px] text-muted-foreground mt-0.5">@alex_dev</div>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.92);
      const h = Math.round(sw * 0.34);
      return [{
        type: "shape",
        shape: "testimonial-badge",
        text: '"Boosted our App Store conversion rate by +40% in just 1 week!"',
        subtext: "Alex Morgan · Lead iOS Developer",
        fill: "rgba(15,23,42,0.92)",
        stroke: "rgba(245,158,11,0.5)",
        strokeWidth: 4,
        cornerRadius: Math.round(sw * 0.035),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "live-counter-pill",
    name: "Live Daily Download Counter",
    preview: (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-300 shadow-xs">
        <span className="text-xs">🔥</span>
        <span className="text-[11px] font-bold">2,500+ Today</span>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.76);
      const h = Math.round(sw * 0.16);
      return [{
        type: "shape",
        shape: "live-counter-badge",
        text: "🔥 2,500+ Downloads Today",
        fill: "rgba(67,20,7,0.92)",
        stroke: "rgba(249,115,22,0.6)",
        strokeWidth: 4,
        cornerRadius: Math.round(h / 2),
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
];

const BADGE_PRESETS: BlockPreset[] = [
  {
    id: "appstore-dark",
    name: "App Store Badge (Dark)",
    category: "Store Badges",
    preview: (
      <div className="h-10 flex items-center justify-center p-1 bg-slate-900 rounded-lg border border-border/40">
        <img src="/badges/appstore-dark.svg" alt="App Store Dark" className="h-8 object-contain" />
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.72);
      const h = Math.round(w / (205 / 59));
      return [{
        type: "shape",
        shape: "appstore-dark",
        text: "App Store",
        subtext: "Download on the",
        fill: "#000000",
        width: w,
        height: h,
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "appstore-light",
    name: "App Store Badge (Light)",
    category: "Store Badges",
    preview: (
      <div className="h-10 flex items-center justify-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-border/40">
        <img src="/badges/appstore-light.svg" alt="App Store Light" className="h-8 object-contain" />
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.72);
      const h = Math.round(w / (201 / 59));
      return [{
        type: "shape",
        shape: "appstore-light",
        text: "App Store",
        subtext: "Download on the",
        fill: "#FFFFFF",
        width: w,
        height: h,
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "googleplay-dark",
    name: "Google Play Badge (Dark)",
    category: "Store Badges",
    preview: (
      <div className="h-10 flex items-center justify-center p-1 bg-slate-900 rounded-lg border border-border/40">
        <img src="/badges/googleplay-dark.svg" alt="Google Play Dark" className="h-8 object-contain" />
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.72);
      const h = Math.round(w / (204 / 59));
      return [{
        type: "shape",
        shape: "googleplay-dark",
        text: "Google Play",
        subtext: "GET IT ON",
        fill: "#000000",
        width: w,
        height: h,
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "googleplay-light",
    name: "Google Play Badge (Light)",
    category: "Store Badges",
    preview: (
      <div className="h-10 flex items-center justify-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-border/40">
        <img src="/badges/googleplay-light.svg" alt="Google Play Light" className="h-8 object-contain" />
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.72);
      const h = Math.round(w / (201 / 59));
      return [{
        type: "shape",
        shape: "googleplay-light",
        text: "Google Play",
        subtext: "GET IT ON",
        fill: "#FFFFFF",
        width: w,
        height: h,
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        rotation: 0,
        opacity: 1,
      } as any];
    },
  },
  {
    id: "rank-productivity",
    name: "#1 Top Free App Tag",
    preview: (
      <div
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-[10px] font-semibold bg-blue-950/80 border border-blue-400/40 shadow-xs"
        style={{ minWidth: 120 }}
      >
        <span className="text-sm">🏅</span>
        <div>
          <div className="text-[8px] text-blue-300 font-medium">Ranked</div>
          <div className="text-[11px] font-bold text-white">#1 Top Free App</div>
        </div>
      </div>
    ),
    getLayers: (sw, sh) => {
      const w = Math.round(sw * 0.76);
      const h = Math.round(sw * 0.18);
      return [{
        type: "shape",
        shape: "ranking-badge",
        text: "🏅 #1 Top Free App",
        fill: "#172554",
        stroke: "rgba(96,165,250,0.6)",
        strokeWidth: 4,
        cornerRadius: Math.round(sw * 0.035),
        width: w,
        height: h,
        x: Math.round((sw - w) / 2),
        y: Math.round((sh - h) / 2),
        rotation: 0,
        opacity: 1,
      } as any];
    },
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

    const rawLayers = preset.getLayers(screen.width, screen.height);
    const groupId = `group-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const layersToAdd = rawLayers.length > 1
      ? rawLayers.map((l) => ({ ...l, groupId }))
      : rawLayers;

    addLayers(set.id, screen.id, layersToAdd);
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
          <div className="grid grid-cols-1 gap-2">
            {UI_WIDGET_PRESETS.map((preset) => (
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

        {/* Cards & Glass Containers */}
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-muted-foreground" />
            Cards & Containers (With Editable Text)
          </p>
          <div className="grid grid-cols-1 gap-2">
            {CONTAINER_PRESETS.map((preset) => (
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

        {/* Offers, Sales & CTAs */}
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
            <span className="text-xs">🏷️</span>
            Offers, Sales & CTAs
          </p>
          <div className="grid grid-cols-1 gap-2">
            {OFFER_PRESETS.map((preset) => (
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

        {/* Press Mentions & User Testimonials */}
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
            <span className="text-xs">💬</span>
            Press & Testimonials
          </p>
          <div className="grid grid-cols-1 gap-2">
            {PRESS_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleAdd(preset)}
                className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/40 hover:border-primary/40 transition-all group cursor-pointer text-left"
              >
                <div className="w-full">{preset.preview}</div>
                <div className="flex items-center justify-between w-full pt-1">
                  <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground">
                    {preset.name}
                  </span>
                  <span className="text-[10.5px] font-semibold text-primary">
                    + Add
                  </span>
                </div>
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
