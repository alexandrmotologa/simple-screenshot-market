"use client";

import { useEffect, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/lib/store/projectStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { useEditorStore } from "@/lib/store/editorStore";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { backgroundToCSS } from "@/lib/utils";
import { TextLayer } from "@/lib/types";

interface EditorPageProps {
  params: Promise<{ projectId: string }>;
}

/** Generates a small thumbnail for the project from the first screen */
function generateThumbnail(screenSets: ReturnType<typeof useEditorStore.getState>["screenSets"]): string | null {
  if (typeof window === "undefined") return null;
  const firstScreen = screenSets[0]?.screens[0];
  if (!firstScreen) return null;

  const W = 270, H = 480;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const bg = firstScreen.background;
  const scale = W / firstScreen.width;

  // Draw background
  if (bg?.type === "solid" && bg.color) {
    ctx.fillStyle = bg.color;
    ctx.fillRect(0, 0, W, H);
  } else if (bg?.type === "gradient" && bg.gradient) {
    const dirs: Record<string, [number, number, number, number]> = {
      "to-b":  [0, 0, 0, H], "to-r": [0, 0, W, 0],
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

  // Draw text layers
  for (const layer of firstScreen.layers) {
    if (layer.type !== "text") continue;
    const tl = layer as TextLayer;
    ctx.save();
    ctx.globalAlpha = tl.opacity ?? 1;
    const fs = Math.max(6, tl.fontSize * scale);
    ctx.font = `${tl.fontWeight} ${fs}px "${tl.fontFamily}", sans-serif`;
    ctx.fillStyle = tl.color;
    ctx.textAlign = tl.align as CanvasTextAlign;
    const lines = tl.content.split("\n");
    const lineH = fs * (tl.lineHeight ?? 1.25);
    const xPos = tl.align === "center"
      ? tl.x * scale + (tl.width * scale) / 2
      : tl.align === "right" ? tl.x * scale + tl.width * scale
      : tl.x * scale;
    lines.forEach((line, i) => {
      ctx.fillText(line, xPos, tl.y * scale + fs + i * lineH);
    });
    ctx.restore();
  }

  return canvas.toDataURL("image/webp", 0.7);
}

export default function EditorPage({ params }: EditorPageProps) {
  const { projectId } = use(params);
  const router = useRouter();
  const getProject = useProjectStore((s) => s.getProject);
  const updateProject = useProjectStore((s) => s.updateProject);
  const saveProjectThumbnail = useProjectStore((s) => s.saveProjectThumbnail);
  const { loadProject, screenSets, hiddenScreenSets, themeId, projectId: editorProjectId } = useEditorStore();
  const { projectLanguages, setProjectLanguages } = useLanguageStore();

  useEffect(() => {
    const project = getProject(projectId);
    if (!project) {
      router.replace("/");
      return;
    }
    loadProject(projectId, project.themeId, project.screenSets, project.hiddenScreenSets);
    if (project.languages && project.languages.length > 0) {
      setProjectLanguages(project.languages);
    }
  }, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save projectLanguages back to project store
  useEffect(() => {
    if (editorProjectId === projectId) {
      updateProject(projectId, { languages: projectLanguages });
    }
  }, [projectLanguages, projectId, editorProjectId, updateProject]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save screenSets back to project store whenever they change
  useEffect(() => {
    if (screenSets.length > 0 && editorProjectId === projectId) {
      updateProject(projectId, { screenSets, hiddenScreenSets, themeId });
    }
  }, [screenSets, hiddenScreenSets, themeId, projectId, editorProjectId, updateProject]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save thumbnail (debounced — fires 2s after last change)
  useEffect(() => {
    if (screenSets.length === 0) return;
    const timer = setTimeout(() => {
      const thumb = generateThumbnail(screenSets);
      if (thumb) saveProjectThumbnail(projectId, thumb);
    }, 2000);
    return () => clearTimeout(timer);
  }, [screenSets, projectId, saveProjectThumbnail]);

  return <EditorLayout projectId={projectId} />;
}
