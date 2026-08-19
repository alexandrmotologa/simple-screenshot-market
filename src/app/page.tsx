"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Plus, Layers, Clock, Copy, Trash2, ArrowRight, Sparkles,
  Zap, Globe, Search, LayoutGrid, List, ArrowUpDown, Edit3,
  Smartphone, ExternalLink, MoreHorizontal, Calendar, X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NewProjectModal } from "@/components/dashboard/NewProjectModal";
import { RenameProjectModal } from "@/components/dashboard/RenameProjectModal";
import { useProjectStore } from "@/lib/store/projectStore";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Project, Screen } from "@/lib/types";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConfirmActionModal } from "@/components/dashboard/ConfirmActionModal";
import { Footer } from "@/components/dashboard/Footer";
import { UserMenu } from "@/components/auth/UserMenu";
import { AuthModal } from "@/components/auth/AuthModal";

// ── Mini Canvas Thumbnail with Real Screen Render & Multi-Screen Stack ────────
function ProjectThumbnail({ project }: { project: Project }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firstSet = project.screenSets[0];
  const screens = firstSet?.screens ?? [];
  const screen1 = screens[0];
  const screen2 = screens[1];

  // If we have a saved screenshot thumbnail from the editor, use it
  if (project.thumbnail) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.thumbnail}
        alt={project.name}
        className="w-full h-full object-cover object-top"
      />
    );
  }

  // Fallback: dynamic canvas rendering with realistic layered screens preview
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !screen1) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CW = 400;
    const CH = 260;
    canvas.width = CW;
    canvas.height = CH;

    // Helper: draw single screen representation
    const drawScreenAt = (
      scr: Screen,
      x: number,
      y: number,
      w: number,
      h: number,
      radius = 14,
      isBackground = false
    ) => {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, radius);
      ctx.clip();

      // Draw background
      const bg = scr.background;
      if (bg?.type === "solid" && bg.color) {
        ctx.fillStyle = bg.color;
        ctx.fillRect(x, y, w, h);
      } else if (bg?.type === "gradient" && bg.gradient) {
        const grad = ctx.createLinearGradient(x, y, x, y + h);
        for (const stop of bg.gradient.stops) {
          grad.addColorStop(stop.position / 100, stop.color);
        }
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, w, h);
      } else {
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(x, y, w, h);
      }

      // 1. Draw stylized device mockup placeholder first (at bottom/center)
      const mw = w * 0.72;
      const mh = h * 0.65;
      const mx = x + (w - mw) / 2;
      const my = y + h - mh + 6;

      ctx.save();
      // Device drop shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 6;

      // Device frame outer body
      ctx.fillStyle = isBackground ? "#111827" : "#1e293b";
      ctx.beginPath();
      ctx.roundRect(mx, my, mw, mh, [14, 14, 0, 0]);
      ctx.fill();

      // Device screen inner area
      const sm = 2.5;
      ctx.fillStyle = isBackground ? "#0b0f19" : "#0f172a";
      ctx.beginPath();
      ctx.roundRect(mx + sm, my + sm, mw - sm * 2, mh - sm * 2, [12, 12, 0, 0]);
      ctx.fill();

      // Mini mock app UI cards inside phone
      ctx.fillStyle = isBackground ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.08)";
      ctx.beginPath();
      ctx.roundRect(mx + sm + 6, my + sm + 18, mw - sm * 2 - 12, mh * 0.35, 6);
      ctx.fill();

      ctx.fillStyle = isBackground ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.06)";
      ctx.beginPath();
      ctx.roundRect(mx + sm + 6, my + sm + 24 + mh * 0.35, mw - sm * 2 - 12, mh * 0.38, 6);
      ctx.fill();

      // Device frame border
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = isBackground ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.35)";
      ctx.stroke();

      // Dynamic island / Camera notch pill
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.roundRect(mx + mw / 2 - 12, my + 4, 24, 5, 2.5);
      ctx.fill();
      ctx.restore();

      // 2. Draw text layers (headlines) ON TOP
      const scale = w / (scr.width || 1290);
      const textLayers = scr.layers.filter((l) => l.type === "text") as import("@/lib/types").TextLayer[];

      if (textLayers.length > 0) {
        for (const tl of textLayers) {
          ctx.save();
          ctx.globalAlpha = (tl.opacity ?? 1) * (isBackground ? 0.75 : 1);
          const fs = Math.max(7.5, Math.min(13, (tl.fontSize || 54) * scale * 1.3));
          ctx.font = `700 ${fs}px "${tl.fontFamily || "Inter"}", -apple-system, sans-serif`;
          ctx.fillStyle = tl.color || "#ffffff";
          ctx.textAlign = (tl.align as CanvasTextAlign) || "center";
          ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
          ctx.shadowBlur = 4;

          const lines = (tl.content || "Awesome App").split("\n");
          const lineH = fs * 1.2;
          const xPos =
            tl.align === "center"
              ? x + w / 2
              : tl.align === "right"
              ? x + w - 8
              : x + 8;
          
          const textY = Math.max(16, (tl.y || 120) * scale);
          lines.slice(0, 2).forEach((line, i) => {
            ctx.fillText(line, xPos, y + textY + i * lineH);
          });
          ctx.restore();
        }
      } else {
        // Fallback default caption if no text layer exists
        ctx.save();
        ctx.font = `700 8.5px "Inter", -apple-system, sans-serif`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.textAlign = "center";
        ctx.fillText("App Showcase", x + w / 2, y + 24);
        ctx.restore();
      }

      // Subtle outer screen glass border
      ctx.strokeStyle = isBackground ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    // Canvas background
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, CW, CH);

    // Decorative background ambient glow
    const ambientGrad = ctx.createRadialGradient(CW / 2, CH / 2, 20, CW / 2, CH / 2, 160);
    ambientGrad.addColorStop(0, "rgba(99, 102, 241, 0.15)");
    ambientGrad.addColorStop(1, "transparent");
    ctx.fillStyle = ambientGrad;
    ctx.fillRect(0, 0, CW, CH);

    if (screen2) {
      // 2-screen layered stack
      // Secondary screen (back, slightly tilted/offset right)
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 10;
      drawScreenAt(screen2, 210, 20, 125, 225, 12, true);
      ctx.restore();

      // Primary screen (front left)
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
      ctx.shadowBlur = 28;
      ctx.shadowOffsetY = 12;
      drawScreenAt(screen1, 65, 15, 132, 235, 14, false);
      ctx.restore();
    } else {
      // Single centered hero screen
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 14;
      drawScreenAt(screen1, (CW - 140) / 2, 12, 140, 240, 14, false);
      ctx.restore();
    }
  }, [screen1, screen2]);

  if (!screen1) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)" }}
      >
        <Smartphone className="w-8 h-8 text-white/30" />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-cover"
      style={{ display: "block" }}
    />
  );
}

// ── Project Card (Grid View) ──────────────────────────────────────────────────
function ProjectCard({
  project,
  onOpen,
  onDuplicate,
  onRename,
  onDelete,
  deleting,
}: {
  project: Project;
  onOpen: (id: string) => void;
  onDuplicate: (e: React.MouseEvent, id: string, name: string) => void;
  onRename: (e: React.MouseEvent, id: string, name: string) => void;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  deleting: boolean;
}) {
  const totalScreens = project.screenSets.reduce((acc, ss) => acc + ss.screens.length, 0);
  const platforms = Array.from(new Set(project.screenSets.map((ss) => ss.store)));
  const primaryPreset = project.screenSets[0]?.preset?.name || "App Store";

  return (
    <div
      onClick={() => onOpen(project.id)}
      className={`group relative flex flex-col rounded-2xl bg-card border border-border/70 hover:border-primary/50 shadow-xs hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer overflow-hidden ${
        deleting ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      {/* ── Visual Showcase Preview Window ── */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] bg-muted/40 overflow-hidden flex items-center justify-center border-b border-border/50">
        <ProjectThumbnail project={project} />

        {/* Dark gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Store / Platform Badges (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-20">
          {platforms.map((store) => (
            <span
              key={store}
              className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider flex items-center gap-1 border border-white/10"
            >
              {store === "ios" ? "🍎 iOS" : "▶ Android"}
            </span>
          ))}
        </div>

        {/* Screen Count Badge (Top Right) */}
        <div className="absolute top-2.5 right-2.5 z-20">
          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-medium border border-white/10 flex items-center gap-1">
            <Smartphone className="w-3 h-3 text-primary" />
            {totalScreens} screen{totalScreens !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Hover Quick Action Buttons */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 z-30">
          <button
            type="button"
            onClick={(e) => onRename(e, project.id, project.name)}
            className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-md hover:bg-black/90 flex items-center justify-center text-white/90 hover:text-white transition-colors border border-white/15"
            title="Rename Project"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => onDuplicate(e, project.id, project.name)}
            className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-md hover:bg-black/90 flex items-center justify-center text-white/90 hover:text-white transition-colors border border-white/15"
            title="Duplicate Project"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => onDelete(e, project.id, project.name)}
            className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-md hover:bg-destructive flex items-center justify-center text-white/90 hover:text-white transition-colors border border-white/15"
            title="Delete Project"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Open Editor Hover Action */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-lg shadow-primary/30 translate-y-2 group-hover:translate-y-0 transition-transform duration-200 pointer-events-auto">
            Open in Editor
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* ── Information Card Body ── */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-2.5">
        <div>
          <h3
            className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug"
            title={project.name}
          >
            {project.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
            <span className="truncate">{primaryPreset}</span>
            <span>•</span>
            <span>{project.screenSets.length} set{project.screenSets.length !== 1 ? "s" : ""}</span>
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-muted-foreground/70" />
            <span>{formatDate(project.updatedAt)}</span>
          </div>
          <span className="text-[10px] text-muted-foreground/60 font-mono">
            {new Date(project.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Project List Row (List View) ──────────────────────────────────────────────
function ProjectListRow({
  project,
  onOpen,
  onDuplicate,
  onRename,
  onDelete,
  deleting,
}: {
  project: Project;
  onOpen: (id: string) => void;
  onDuplicate: (e: React.MouseEvent, id: string, name: string) => void;
  onRename: (e: React.MouseEvent, id: string, name: string) => void;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  deleting: boolean;
}) {
  const totalScreens = project.screenSets.reduce((acc, ss) => acc + ss.screens.length, 0);
  const platforms = Array.from(new Set(project.screenSets.map((ss) => ss.store)));
  const primaryPreset = project.screenSets[0]?.preset?.name || "App Store";

  return (
    <div
      onClick={() => onOpen(project.id)}
      className={`group flex items-center justify-between gap-4 p-3 sm:p-4 rounded-xl bg-card border border-border/60 hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer ${
        deleting ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Mini Preview Box */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-muted/60 border border-border/50 overflow-hidden shrink-0 relative flex items-center justify-center">
          <ProjectThumbnail project={project} />
        </div>

        {/* Project Details */}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap text-xs text-muted-foreground">
            <span className="font-medium text-foreground/80">{primaryPreset}</span>
            <span>•</span>
            <span>{totalScreens} screens ({project.screenSets.length} sets)</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3" /> Updated {formatDate(project.updatedAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Platforms & Actions */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-1.5">
          {platforms.map((store) => (
            <Badge key={store} variant="secondary" className="text-[10px] font-medium px-2 py-0.5">
              {store === "ios" ? "🍎 iOS" : "▶ Android"}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => onRename(e, project.id, project.name)}
            className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground"
            title="Rename"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => onDuplicate(e, project.id, project.name)}
            className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground"
            title="Duplicate"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => onDelete(e, project.id, project.name)}
            className="w-8 h-8 rounded-lg text-muted-foreground hover:text-destructive"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={() => onOpen(project.id)}
            className="hidden md:flex gap-1 rounded-xl text-xs h-8 px-3 ml-1"
          >
            Open
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard Page ────────────────────────────────────────────────────────────
export type DashboardSortOption =
  | "updated-desc"
  | "updated-asc"
  | "name-asc"
  | "name-desc"
  | "screens-desc"
  | "screens-asc"
  | "created-desc"
  | "created-asc";

export default function DashboardPage() {
  const router = useRouter();
  const { projects, deleteProject, duplicateProject, updateProject } = useProjectStore();
  const [showNewProject, setShowNewProject] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [confirmModal, setConfirmModal] = useState<{
    type: "delete" | "duplicate";
    projectId: string;
    projectName: string;
  } | null>(null);

  const [renameModal, setRenameModal] = useState<{
    projectId: string;
    currentName: string;
  } | null>(null);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<DashboardSortOption>("updated-desc");

  const promptDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmModal({ type: "delete", projectId: id, projectName: name });
  };

  const promptDuplicate = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmModal({ type: "duplicate", projectId: id, projectName: name });
  };

  const promptRename = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setRenameModal({ projectId: id, currentName: name });
  };

  const handleConfirmAction = () => {
    if (!confirmModal) return;
    if (confirmModal.type === "delete") {
      const id = confirmModal.projectId;
      setDeletingId(id);
      setTimeout(() => {
        deleteProject(id);
        setDeletingId(null);
      }, 300);
    } else if (confirmModal.type === "duplicate") {
      duplicateProject(confirmModal.projectId);
    }
  };

  const handleRename = (newName: string) => {
    if (!renameModal) return;
    updateProject(renameModal.projectId, { name: newName });
    setRenameModal(null);
  };

  // Filter & Bidirectional Sort Logic
  const filtered = useMemo(() => {
    let list = [...projects];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.screenSets.some(
            (ss) =>
              ss.store.toLowerCase().includes(q) ||
              ss.preset?.name?.toLowerCase().includes(q)
          )
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === "updated-desc") return b.updatedAt - a.updatedAt;
      if (sortBy === "updated-asc") return a.updatedAt - b.updatedAt;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "screens-desc") {
        const countA = a.screenSets.reduce((sum, ss) => sum + ss.screens.length, 0);
        const countB = b.screenSets.reduce((sum, ss) => sum + ss.screens.length, 0);
        return countB - countA;
      }
      if (sortBy === "screens-asc") {
        const countA = a.screenSets.reduce((sum, ss) => sum + ss.screens.length, 0);
        const countB = b.screenSets.reduce((sum, ss) => sum + ss.screens.length, 0);
        return countA - countB;
      }
      if (sortBy === "created-desc") return b.createdAt - a.createdAt;
      if (sortBy === "created-asc") return a.createdAt - b.createdAt;
      return 0;
    });

    return list;
  }, [projects, search, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Header ── */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => {
              setSearch("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm shadow-primary/40 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg tracking-tight group-hover:text-primary transition-colors">
              SnapFrame
            </span>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hidden sm:flex"
              onClick={() => window.open("https://github.com/alexandrmotologa/simple-screenshot-market", "_blank")}
            >
              <Globe className="w-4 h-4 mr-1.5" />
              GitHub
            </Button>
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        {/* ── Empty state (Hallmark Premium Style) ── */}
        {projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center py-24 text-center overflow-hidden rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm px-6"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 opacity-50 blur-[100px] rounded-full"></div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="relative mb-8 group">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary to-violet-600 opacity-30 blur-lg group-hover:opacity-60 transition duration-500"></div>
                <div className="relative w-20 h-20 rounded-3xl bg-card border border-border flex items-center justify-center shadow-2xl">
                  <Sparkles className="w-9 h-9 text-primary animate-pulse" />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent max-w-2xl">
                Create stunning app screenshots in minutes
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
                Build beautiful App Store & Google Play visuals with device mockups,
                premium templates, and a powerful drag-and-drop editor.
              </p>

              <div className="flex flex-wrap gap-2.5 justify-center mb-10 max-w-2xl">
                {[
                  "📱 iOS & Android", "🎨 Premium templates", "📐 Store-ready sizes",
                  "💾 Export PNG/ZIP", "🖼️ Device mockups", "🌐 Multi-language",
                ].map((f) => (
                  <span key={f} className="px-3.5 py-1.5 rounded-full bg-secondary/60 border border-border/50 text-secondary-foreground text-xs font-medium backdrop-blur-md">
                    {f}
                  </span>
                ))}
              </div>

              <div className="relative inline-block group">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary to-violet-600 opacity-30 blur-lg group-hover:opacity-60 transition duration-500"></div>
                <Button
                  size="lg"
                  onClick={() => setShowNewProject(true)}
                  className="relative gap-2 px-8 py-6 rounded-2xl text-base font-semibold shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  Create First Screenshot Set
                </Button>
              </div>
            </motion.div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left border-t border-border/50 pt-10 max-w-4xl w-full">
              <div className="p-5 rounded-2xl bg-card/50 border border-border/40 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm">Panorama Flows</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Create continuous storytelling sets where backgrounds span seamlessly across multiple screens.</p>
              </div>
              <div className="p-5 rounded-2xl bg-card/50 border border-border/40 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Globe className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm">i18n & Localization</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Translate all captions across 30+ languages instantly with a single click.</p>
              </div>
              <div className="p-5 rounded-2xl bg-card/50 border border-border/40 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm">Instant Export</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Export perfectly sized PNGs or zip packages ready for App Store Connect & Google Play Console.</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* ── Top Header Controls Row ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
              {/* Title & Project Count Badge */}
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Your Projects</h1>
                <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-0.5 rounded-full border border-border/50">
                  {projects.length}
                </Badge>
              </div>

              {/* Action Controls (Sort, View Mode, New Project) */}
              <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap justify-between sm:justify-end w-full sm:w-auto">
                {/* Bidirectional Sort Toggle Group */}
                <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-xl border border-border/40 text-xs">
                  <span className="text-[11px] font-medium text-muted-foreground px-2 hidden sm:flex items-center gap-1">
                    <ArrowUpDown className="w-3 h-3" /> Sort:
                  </span>

                  {/* Recent Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      if (sortBy === "updated-desc") setSortBy("updated-asc");
                      else setSortBy("updated-desc");
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer select-none ${
                      sortBy === "updated-desc" || sortBy === "updated-asc"
                        ? "bg-background text-foreground shadow-xs ring-1 ring-border/50 font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title={sortBy === "updated-asc" ? "Oldest updated first (click for Newest)" : "Newest updated first (click for Oldest)"}
                  >
                    <Clock className="w-3 h-3" />
                    Recent {sortBy === "updated-asc" ? "↑" : "↓"}
                  </button>

                  {/* Name Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      if (sortBy === "name-asc") setSortBy("name-desc");
                      else setSortBy("name-asc");
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer select-none ${
                      sortBy === "name-asc" || sortBy === "name-desc"
                        ? "bg-background text-foreground shadow-xs ring-1 ring-border/50 font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title={sortBy === "name-desc" ? "Z to A (click for A to Z)" : "A to Z (click for Z to A)"}
                  >
                    Name {sortBy === "name-desc" ? "Z–A ↑" : "A–Z ↓"}
                  </button>

                  {/* Screen Count Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      if (sortBy === "screens-desc") setSortBy("screens-asc");
                      else setSortBy("screens-desc");
                    }}
                    className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer select-none ${
                      sortBy === "screens-desc" || sortBy === "screens-asc"
                        ? "bg-background text-foreground shadow-xs ring-1 ring-border/50 font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title={sortBy === "screens-asc" ? "Fewest screens first (click for Most)" : "Most screens first (click for Fewest)"}
                  >
                    <Smartphone className="w-3 h-3" />
                    Screens {sortBy === "screens-asc" ? "↑" : "↓"}
                  </button>
                </div>

                {/* View Mode Toggle (Grid / List) */}
                <div className="flex items-center gap-0.5 bg-secondary/50 p-1 rounded-xl border border-border/40 text-xs">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-background text-foreground shadow-xs ring-1 ring-border/50"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === "list"
                        ? "bg-background text-foreground shadow-xs ring-1 ring-border/50"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="List View"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* New Project Button */}
                <Button
                  id="new-project-btn-2"
                  onClick={() => setShowNewProject(true)}
                  size="sm"
                  className="gap-1.5 shadow-sm shadow-primary/20 rounded-xl font-semibold px-3.5"
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </Button>
              </div>
            </div>

            {/* ── Full Width Search Bar Row ── */}
            <div className="relative w-full mb-8">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects by name, store (iOS, Android), or device preset..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-11 pr-10 text-sm bg-secondary/40 hover:bg-secondary/60 focus:bg-secondary/80 border border-border/50 focus:border-primary/50 rounded-2xl outline-none text-foreground placeholder:text-muted-foreground transition-all shadow-xs"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* ── Content View ── */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Add New Project Card (only visible when fewer than 4 projects exist) */}
                {projects.length < 4 && (
                  <button
                    id="new-project-card"
                    type="button"
                    onClick={() => setShowNewProject(true)}
                    className="group rounded-2xl border-2 border-dashed border-border/80 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center p-6 gap-3 text-muted-foreground hover:text-primary min-h-[260px] cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-secondary group-hover:bg-primary/15 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xs">
                      <Plus className="w-7 h-7" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-semibold block text-foreground group-hover:text-primary">Create New Project</span>
                      <span className="text-xs text-muted-foreground mt-0.5 block">Start from a template or scratch</span>
                    </div>
                  </button>
                )}

                {/* Project Cards */}
                {filtered.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={(id) => router.push(`/editor/${id}`)}
                    onDuplicate={promptDuplicate}
                    onRename={promptRename}
                    onDelete={promptDelete}
                    deleting={deletingId === project.id}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((project) => (
                  <ProjectListRow
                    key={project.id}
                    project={project}
                    onOpen={(id) => router.push(`/editor/${id}`)}
                    onDuplicate={promptDuplicate}
                    onRename={promptRename}
                    onDelete={promptDelete}
                    deleting={deletingId === project.id}
                  />
                ))}
              </div>
            )}

            {/* Empty search state */}
            {filtered.length === 0 && search && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="w-12 h-12 text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground text-sm font-medium">No projects match &quot;{search}&quot;</p>
                <p className="text-xs text-muted-foreground mt-1">Try adjusting your search terms or filters.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearch("")}
                  className="mt-4 text-xs rounded-xl"
                >
                  Clear search
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <NewProjectModal
        open={showNewProject}
        onClose={() => setShowNewProject(false)}
        onCreated={(id) => router.push(`/editor/${id}`)}
      />

      {confirmModal && (
        <ConfirmActionModal
          open={!!confirmModal}
          type={confirmModal.type}
          projectName={confirmModal.projectName}
          onClose={() => setConfirmModal(null)}
          onConfirm={handleConfirmAction}
        />
      )}

      {renameModal && (
        <RenameProjectModal
          open={!!renameModal}
          currentName={renameModal.currentName}
          onClose={() => setRenameModal(null)}
          onRename={handleRename}
        />
      )}

      <AuthModal />
    </div>
  );
}
