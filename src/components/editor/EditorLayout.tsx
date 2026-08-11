"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Undo2, Redo2, Download, Grid3X3, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useEditorStore } from "@/lib/store/editorStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { EditorCanvas } from "@/components/editor/EditorCanvas";
import { PropertiesPanel } from "@/components/editor/PropertiesPanel";
import { ScreenStrip } from "@/components/editor/ScreenStrip";

interface EditorLayoutProps {
  projectId: string;
}

export function EditorLayout({ projectId }: EditorLayoutProps) {
  const router = useRouter();
  const project = useProjectStore((s) => s.getProject(projectId));
  const {
    zoom,
    setZoom,
    toggleGrid,
    showGrid,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useEditorStore();

  const handleZoomIn = () => setZoom(zoom + 0.1);
  const handleZoomOut = () => setZoom(zoom - 0.1);
  const handleZoomReset = () => setZoom(0.4);

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Top Navbar */}
      <header className="h-12 border-b border-border/60 bg-card/80 backdrop-blur-sm flex items-center px-3 gap-2 shrink-0 z-30">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Back to Dashboard</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-5" />

        {/* Project name */}
        <span className="text-sm font-medium text-foreground truncate max-w-48">
          {project?.name ?? "Untitled"}
        </span>

        <div className="flex-1" />

        {/* Undo / Redo */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={undo}
                disabled={!canUndo()}
              >
                <Undo2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={redo}
                disabled={!canRedo()}
              >
                <Redo2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-5" />

        {/* Grid toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showGrid ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={toggleGrid}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle Grid</TooltipContent>
        </Tooltip>

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
                <ZoomOut className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom Out</TooltipContent>
          </Tooltip>
          <button
            onClick={handleZoomReset}
            className="text-xs font-mono text-muted-foreground hover:text-foreground w-12 text-center"
          >
            {Math.round(zoom * 100)}%
          </button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
                <ZoomIn className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom In</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-5" />

        <Button size="sm" className="h-8 gap-1.5 text-xs" id="export-btn">
          <Download className="w-3.5 h-3.5" />
          Export
        </Button>
      </header>

      {/* Body: toolbar | canvas | properties */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left toolbar */}
        <EditorToolbar />

        {/* Center: canvas + screen strip */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <EditorCanvas />
          <ScreenStrip />
        </div>

        {/* Right: properties panel */}
        <PropertiesPanel />
      </div>
    </div>
  );
}
