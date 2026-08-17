"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Plus, Layers, Clock, Copy, Trash2, ArrowRight, Sparkles,
  Zap, Globe, Search, LayoutGrid, List, SortAsc,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NewProjectModal } from "@/components/dashboard/NewProjectModal";
import { useProjectStore } from "@/lib/store/projectStore";
import Link from "next/link";
import { formatDate, backgroundToCSS } from "@/lib/utils";
import { Project } from "@/lib/types";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConfirmActionModal } from "@/components/dashboard/ConfirmActionModal";
import { Footer } from "@/components/dashboard/Footer";

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
  onDuplicate: (e: React.MouseEvent, id: string, name: string) => void;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
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
          onClick={(e) => onDuplicate(e, project.id, project.name)}
          className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center text-white transition-colors"
          title="Duplicate"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={(e) => onDelete(e, project.id, project.name)}
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
  const [confirmModal, setConfirmModal] = useState<{
    type: "delete" | "duplicate";
    projectId: string;
    projectName: string;
  } | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"updated" | "created" | "name">("updated");

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
              className="text-muted-foreground"
              onClick={() => window.open("https://github.com/alexandrmotologa/simple-screenshot-market", "_blank")}
            >
              <Globe className="w-4 h-4 mr-1.5" />
              GitHub
            </Button>
            <ThemeToggle />
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
            {/* ── Dashboard controls ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Your Projects</h1>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {projects.length} screenshot project{projects.length !== 1 ? "s" : ""}
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
                  onDuplicate={promptDuplicate}
                  onDelete={promptDelete}
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
    </div>
  );
}
