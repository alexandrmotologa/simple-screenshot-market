"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft, Undo2, Redo2, Download,
  Share2, ZoomIn, ZoomOut, Upload
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/lib/store/editorStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { HorizontalCanvas } from "@/components/editor/HorizontalCanvas";
import { FloatingToolbar } from "@/components/editor/FloatingToolbar";
import { ScreenStrip } from "@/components/editor/ScreenStrip";
import { ExportModal } from "@/components/editor/ExportModal";
import { ScreenshotLayer } from "@/lib/types";
import { cn } from "@/lib/utils";

interface EditorLayoutProps {
  projectId: string;
}

// Simple icon button — avoids nested <button> hydration warnings
function IconBtn({
  onClick,
  disabled,
  title,
  children,
  className,
}: {
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "w-7 h-7 rounded-lg flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}

export function EditorLayout({ projectId }: EditorLayoutProps) {
  const router = useRouter();
  const project = useProjectStore((s) => s.getProject(projectId));
  const {
    zoom, setZoom, undo, redo, canUndo, canRedo,
    activeLayerId, activeSetId, activeScreenId,
    setActiveLayer, deleteLayer, duplicateLayer, updateLayer, getActiveSet, getActiveScreen,
  } = useEditorStore();
  const [showExport, setShowExport] = useState(false);
  const replaceFileRef = useRef<HTMLInputElement>(null);

  // Detect if active layer is a screenshot zone
  const activeLayer = useEditorStore((s) => s.getActiveLayer());
  const isScreenshotSelected = activeLayer?.type === "screenshot";

  const handleReplaceFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeLayer || activeLayer.type !== "screenshot") return;
    const set = getActiveSet();
    const screen = getActiveScreen();
    if (!set || !screen) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateLayer(set.id, screen.id, activeLayer.id, { src: ev.target?.result as string } as Partial<ScreenshotLayer>);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // ─── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.shiftKey && e.key === "z"))) {
        e.preventDefault();
        redo();
      }
      if ((e.key === "Delete" || e.key === "Backspace") && activeLayerId) {
        const set = getActiveSet();
        const screen = getActiveScreen();
        if (set && screen) {
          deleteLayer(set.id, screen.id, activeLayerId);
          setActiveLayer(null);
        }
      }
      if (e.key === "Escape") {
        setActiveLayer(null);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "d" && activeLayerId) {
        e.preventDefault();
        const set = getActiveSet();
        const screen = getActiveScreen();
        if (set && screen) {
          duplicateLayer(set.id, screen.id, activeLayerId);
        }
      }
      // Zoom shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === "=") {
        e.preventDefault();
        setZoom(zoom + 0.1);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        setZoom(zoom - 0.1);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault();
        setZoom(0.65);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [zoom, activeLayerId, activeSetId, activeScreenId, undo, redo, setZoom, deleteLayer, duplicateLayer, setActiveLayer, getActiveSet, getActiveScreen]);

  return (
    <div className="relative flex flex-col h-screen bg-background overflow-hidden select-none">
      {/* ── Top Navigation Bar ── */}
      <header className="h-11 border-b border-border/50 bg-card/90 backdrop-blur-sm flex items-center px-3 gap-2 shrink-0 z-40">
        {/* Back */}
        <IconBtn title="Back to Dashboard (Esc)" onClick={() => router.push("/")}>
          <ArrowLeft className="w-3.5 h-3.5" />
        </IconBtn>

        <Separator orientation="vertical" className="h-4" />

        {/* Project name */}
        <span
          className="text-sm font-medium tracking-tight truncate max-w-40"
          suppressHydrationWarning
        >
          {project?.name ?? "Untitled"}
        </span>

        <div className="flex-1" />

        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5">
          <IconBtn title="Undo (Ctrl+Z)" onClick={undo} disabled={!canUndo()}>
            <Undo2 className="w-3.5 h-3.5" />
          </IconBtn>
          <IconBtn title="Redo (Ctrl+Y)" onClick={redo} disabled={!canRedo()}>
            <Redo2 className="w-3.5 h-3.5" />
          </IconBtn>
        </div>

        <Separator orientation="vertical" className="h-4" />

        {/* Replace screenshot — appears when screenshot layer is selected */}
        {isScreenshotSelected && (
          <>
            <input ref={replaceFileRef} type="file" accept="image/*" className="hidden" onChange={handleReplaceFile} />
            <button
              type="button"
              onClick={() => replaceFileRef.current?.click()}
              className="h-7 flex items-center gap-1.5 px-3 text-xs font-semibold rounded-lg bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25 ring-1 ring-indigo-500/30 transition-all"
            >
              <Upload className="w-3 h-3" />
              Replace screenshot
            </button>
            <Separator orientation="vertical" className="h-4" />
          </>
        )}

        {/* Zoom */}
        <div className="flex items-center gap-0.5">
          <IconBtn title="Zoom Out (Ctrl+-)" onClick={() => setZoom(zoom - 0.1)}>
            <ZoomOut className="w-3.5 h-3.5" />
          </IconBtn>
          <button
            type="button"
            onClick={() => setZoom(0.65)}
            className="text-xs font-mono text-muted-foreground hover:text-foreground w-10 text-center tabular-nums hover:bg-secondary rounded-md py-0.5 transition-colors"
            title="Reset zoom (Ctrl+0)"
          >
            {Math.round(zoom * 100)}%
          </button>
          <IconBtn title="Zoom In (Ctrl+=)" onClick={() => setZoom(zoom + 0.1)}>
            <ZoomIn className="w-3.5 h-3.5" />
          </IconBtn>
        </div>

        <Separator orientation="vertical" className="h-4" />

        {/* Share */}
        <IconBtn title="Share (coming soon)">
          <Share2 className="w-3.5 h-3.5" />
        </IconBtn>

        {/* Export */}
        <button
          id="export-btn"
          type="button"
          onClick={() => setShowExport(true)}
          className="h-7 flex items-center gap-1.5 px-3 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm shadow-primary/30"
        >
          <Download className="w-3 h-3" />
          Export
        </button>
      </header>

      {/* ── Floating Toolbar (appears when a layer is selected) ── */}
      {activeLayerId && <FloatingToolbar />}

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar + slide-out panels */}
        <EditorSidebar />

        {/* Main canvas area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <HorizontalCanvas />
          {/* Bottom strip: quick screen navigation */}
          <ScreenStrip />
        </div>
      </div>

      {/* Export modal */}
      {showExport && (
        <ExportModal projectId={projectId} onClose={() => setShowExport(false)} />
      )}
    </div>
  );
}
