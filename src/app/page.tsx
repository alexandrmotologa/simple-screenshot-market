"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Plus, Layers, Clock, Copy, Trash2, ArrowRight, Sparkles,
  Zap, Globe, Search, LayoutGrid, List, SortAsc,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NewProjectModal } from "@/components/dashboard/NewProjectModal";
import { useProjectStore } from "@/lib/store/projectStore";
import { formatDate, backgroundToCSS } from "@/lib/utils";
import { Project } from "@/lib/types";

// ── Mini canvas thumbnail ─────────────────────────────────────────────────────
function ProjectThumbnail({ project }: { project: Project }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firstScreen = project.screenSets[0]?.screens[0];
  const bg = firstScreen?.background;

  // If we have a saved thumbnail (from auto-save in editor), use it
  if (project.thumbnail) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.thumbnail}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  // Fallback: render live via canvas
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !firstScreen) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 270, H = 480;
    canvas.width = W;
    canvas.height = H;

    if (bg?.type === "solid" && bg.color) {
      ctx.fillStyle = bg.color;
      ctx.fillRect(0, 0, W, H);
    } else if (bg?.type === "gradient" && bg.gradient) {
      const dirs: Record<string, [number, number, number, number]> = {
        "to-b":  [0, 0, 0, H], "to-r":  [0, 0, W, 0],
        "to-br": [0, 0, W, H], "to-bl": [W, 0, 0, H],
        "to-tr": [0, H, W, 0], "to-tl": [W, H, 0, 0],
      };
      const [x0, y0, x1, y1] = dirs[bg.gradient.direction] ?? [0, 0, 0, H];
      const grad = ctx.createLinearGradient(x0, y0, x1, y1);
      for (const stop of bg.gradient.stops) {
        grad.addColorStop(stop.position / 100, stop.color);
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else {
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, W, H);
    }

    const scale = W / (firstScreen.width ?? 1290);
    for (const layer of firstScreen.layers) {
      if (layer.type !== "text") continue;
      const tl = layer as import("@/lib/types").TextLayer;
      ctx.save();
      ctx.globalAlpha = layer.opacity ?? 1;
      const fs = Math.max(6, tl.fontSize * scale);
      ctx.font = `${tl.fontWeight} ${fs}px "${tl.fontFamily}", -apple-system, sans-serif`;
      ctx.fillStyle = tl.color;
      ctx.textAlign = tl.align as CanvasTextAlign;
      const lines = tl.content.split("\n");
      const lineH = fs * (tl.lineHeight ?? 1.25);
      const xPos = tl.align === "center"
        ? tl.x * scale + tl.width * scale / 2
        : tl.align === "right" ? tl.x * scale + tl.width * scale
        : tl.x * scale;
      lines.forEach((line, i) => {
        ctx.fillText(line, xPos, tl.y * scale + fs + i * lineH);
      });
      ctx.restore();
    }
  }, [firstScreen, bg]);

  if (!firstScreen) {
    return (
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ display: "block" }}
    />
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({
  project, onOpen, onDuplicate, onDelete, deleting,
}: {
  project: Project;
  onOpen: (id: string) => void;
  onDuplicate: (e: React.MouseEvent, id: string) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
  deleting: boolean;
}) {
  const totalScreens = project.screenSets.reduce((acc, ss) => acc + ss.screens.length, 0);

  return (
    <div
      onClick={() => onOpen(project.id)}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ring-1 ring-border hover:ring-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 ${
        deleting ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
      style={{ aspectRatio: "9/16", maxHeight: 280 }}
    >
      {/* Thumbnail */}
      <ProjectThumbnail project={project} />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {/* Store badges */}
      <div className="absolute top-3 left-3 flex gap-1.5">
        {project.screenSets.map((ss) => (
          <span
            key={ss.id}
            className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wide"
          >
            {ss.store === "ios" ? "🍎 iOS" : "▶ Android"}
          </span>
        ))}
      </div>

      {/* Hover actions */}
      <div 
        className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-20"
      >
        <button
          type="button"
          onClick={(e) => onDuplicate(e, project.id)}
          className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center text-white transition-colors"
          title="Duplicate"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={(e) => onDelete(e, project.id)}
          className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm hover:bg-destructive/80 flex items-center justify-center text-white transition-colors"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Info footer */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white font-semibold text-sm truncate">{project.name}</p>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-white/60 text-xs flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(project.updatedAt)}
          </p>
          <p className="text-white/50 text-xs">{totalScreens} screen{totalScreens !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Open button on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-10">
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/40 translate-y-2 group-hover:translate-y-0 transition-transform duration-200 pointer-events-auto">
          Open Editor
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}

// ── Dashboard Page ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const { projects, deleteProject, duplicateProject } = useProjectStore();
  const [showNewProject, setShowNewProject] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"updated" | "created" | "name">("updated");

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDeletingId(id);
    setTimeout(() => { deleteProject(id); setDeletingId(null); }, 300);
  };

  const handleDuplicate = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    duplicateProject(id);
  };

  const filtered = useMemo(() => {
    let list = [...projects];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sortBy === "updated") list.sort((a, b) => b.updatedAt - a.updatedAt);
    else if (sortBy === "created") list.sort((a, b) => b.createdAt - a.createdAt);
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [projects, search, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ── */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm shadow-primary/40">
              <Layers className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg tracking-tight">SnapFrame</span>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => window.open("https://github.com/alexandrmotologa/simple-screenshot-market", "_blank")}
            >
              <Globe className="w-4 h-4 mr-1.5" />
              GitHub
            </Button>
            <Button
              id="new-project-btn"
              onClick={() => setShowNewProject(true)}
              className="gap-2 shadow-sm shadow-primary/20"
              size="sm"
            >
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* ── Empty state ── */}
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center ring-1 ring-primary/20">
                <Zap className="w-12 h-12 text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/15 blur-lg" />
            </div>

            <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Create stunning<br />app screenshots
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mb-10 leading-relaxed">
              Build beautiful App Store & Google Play screenshots with device mockups,
              templates, and a powerful drag-and-drop editor.
            </p>

            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {[
                "📱 iOS & Android", "🎨 Premium templates", "📐 Store-ready sizes",
                "💾 Export PNG/ZIP", "🔄 Undo / Redo", "🖼️ Device mockups",
                "✏️ Text presets", "😊 Stickers & emojis",
              ].map((f) => (
                <span key={f} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                  {f}
                </span>
              ))}
            </div>

            <Button
              id="get-started-btn"
              size="lg"
              onClick={() => setShowNewProject(true)}
              className="gap-2 text-base px-8 h-13 rounded-2xl shadow-lg shadow-primary/25"
            >
              <Sparkles className="w-5 h-5" />
              Get Started — It&apos;s Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <>
            {/* ── Projects header + search + sort ── */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className="flex-1">
                <h1 className="text-2xl font-bold tracking-tight">Your Projects</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {filtered.length} of {projects.length} project{projects.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/70 border border-border/30 w-52">
                  <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Search projects…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/70 border border-border/30">
                  {(["updated", "name"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSortBy(s)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        sortBy === s
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s === "updated" ? <Clock className="w-3 h-3" /> : <SortAsc className="w-3 h-3" />}
                      {s === "updated" ? "Recent" : "Name"}
                    </button>
                  ))}
                </div>

                <Button id="new-project-btn-2" onClick={() => setShowNewProject(true)} size="sm" className="gap-1.5">
                  <Plus className="w-4 h-4" />
                  New
                </Button>
              </div>
            </div>

            {/* ── Grid ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {/* Add new card */}
              <button
                id="new-project-card"
                type="button"
                onClick={() => setShowNewProject(true)}
                style={{ aspectRatio: "9/16", maxHeight: 280 }}
                className="group rounded-2xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-primary"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">New Project</span>
              </button>

              {/* Project cards */}
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={(id) => router.push(`/editor/${id}`)}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                  deleting={deletingId === project.id}
                />
              ))}
            </div>

            {/* Empty search state */}
            {filtered.length === 0 && search && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="w-12 h-12 text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground text-sm">No projects match &quot;{search}&quot;</p>
                <button type="button" onClick={() => setSearch("")} className="mt-2 text-xs text-primary hover:underline">
                  Clear search
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <NewProjectModal
        open={showNewProject}
        onClose={() => setShowNewProject(false)}
        onCreated={(id) => router.push(`/editor/${id}`)}
      />
    </div>
  );
}
